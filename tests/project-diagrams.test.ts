import { test } from "node:test";
import assert from "node:assert/strict";
import { projectDiagrams } from "../lib/project-diagrams";
import { renderDiagramSvg, validateDiagram } from "../lib/diagram-svg";
import { GET } from "../app/projects/[slug]/diagrams/[diagram]/route";

test("all five projects contain architecture, workflow, and a distinct feature diagram", () => {
  assert.equal(Object.keys(projectDiagrams).length, 5);
  const featureIds = new Set<string>();
  for (const [slug, diagrams] of Object.entries(projectDiagrams)) {
    assert.equal(diagrams.length, 3, slug);
    assert.deepEqual(diagrams.slice(0, 2).map(diagram => diagram.id), ["architecture", "workflow"]);
    featureIds.add(diagrams[2].id);
    for (const diagram of diagrams) {
      validateDiagram(diagram);
      assert.ok(diagram.nodes.length >= 6);
      assert.ok(diagram.edges.length >= 5);
      assert.ok(diagram.notes.length);
      const svg = renderDiagramSvg(diagram, `${slug}-${diagram.id}`);
      assert.match(svg, /^<svg xmlns="http:\/\/www.w3.org\/2000\/svg"/);
      assert.match(svg, /role="img" aria-labelledby=/);
      assert.match(svg, /<title /);
      assert.match(svg, /<desc /);
      assert.match(svg, /marker-end=/);
      assert.doesNotMatch(svg, /undefined|NaN|<script|<foreignObject/);
      const compact = renderDiagramSvg(diagram, `${slug}-${diagram.id}-compact`, true);
      assert.match(compact, /viewBox="0 0 360 /);
      assert.equal((compact.match(/class="dg-node /g) ?? []).length, diagram.nodes.length);
      assert.doesNotMatch(compact, /undefined|NaN|<script|<foreignObject/);
    }
  }
  assert.equal(featureIds.size, 5);
});

test("diagram validation catches missing endpoints, overlapping nodes, and clipped text", () => {
  const valid = projectDiagrams.habitly[0];
  assert.throws(() => validateDiagram({ ...valid, edges: [{ from: "missing", to: valid.nodes[0].id, label: "bad" }] }), /Unknown diagram endpoint/);
  assert.throws(() => validateDiagram({ ...valid, nodes: [...valid.nodes, { ...valid.nodes[0], id: "overlap" }] }), /Overlapping diagram node/);
  assert.throws(() => validateDiagram({ ...valid, nodes: [{ ...valid.nodes[0], detail: "too much text ".repeat(20) }] }), /too long/);
});

test("SVG output escapes content and namespaces markers for each figure", () => {
  const diagram = projectDiagrams.habitly[0];
  const svg = renderDiagramSvg({ ...diagram, heading: '<script>alert("x")</script>', nodes: diagram.nodes.map((node, index) => index ? node : { ...node, title: "A < B & C" }) }, "safe-one");
  assert.match(svg, /&lt;script&gt;/);
  assert.match(svg, /A &lt; B &amp; C/);
  assert.doesNotMatch(svg, /<script>/);
  assert.match(svg, /diagram-safe-one-arrow/);
});

test("all 15 SVG endpoints serve the matching graph with safe headers", async () => {
  for (const [slug, diagrams] of Object.entries(projectDiagrams)) {
    for (const diagram of diagrams) {
      const response = await GET(new Request(`http://localhost/projects/${slug}/diagrams/${diagram.id}.svg`), { params: Promise.resolve({ slug, diagram: `${diagram.id}.svg` }) });
      assert.equal(response.status, 200);
      assert.match(response.headers.get("content-type")!, /image\/svg\+xml/);
      assert.match(response.headers.get("content-security-policy")!, /default-src 'none'/);
      const svg = await response.text();
      assert.ok(svg.includes(diagram.heading.replaceAll("&", "&amp;")));
      assert.ok(svg.includes(`diagram-${slug}-${diagram.id}-title`));
    }
  }
  for (const params of [{ slug: "missing", diagram: "architecture.svg" }, { slug: "habitly", diagram: "missing.svg" }, { slug: "habitly", diagram: "architecture" }]) {
    assert.equal((await GET(new Request("http://localhost"), { params: Promise.resolve(params) })).status, 404);
  }
});
