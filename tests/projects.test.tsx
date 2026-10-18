import React from "react";
import { test } from "node:test";
import assert from "node:assert/strict";
import { renderToStaticMarkup } from "react-dom/server";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { featuredProjects, getProjectBySlug, projects, type ProjectMedia } from "../lib/projects";
import { ProjectGallery } from "../components/project-gallery";
import { ProjectListItem } from "../components/project-list-item";
import { ProjectLinks } from "../components/project-links";
import ProjectPage, { generateMetadata, generateStaticParams } from "../app/projects/[slug]/page";
import sitemap from "../app/sitemap";
import { TimeCounter } from "../components/time-counter";

test("live clock starts with stable markup before client effects", () => {
  assert.equal(renderToStaticMarkup(<TimeCounter />), "<span>--:--:--</span>");
});

test("home selection and full catalog have the requested order", () => {
  assert.deepEqual(featuredProjects.map(p => p.title), ["AI Teammates", "Excalidraw", "Habitly"]);
  assert.deepEqual(projects.map(p => p.slug), ["ai-teammates", "excalidraw", "habitly", "aurora-ui", "devconnect"]);
  assert.equal(new Set(projects.map(p => p.slug)).size, 5);
  assert.equal(getProjectBySlug("missing"), undefined);
  assert.equal(getProjectBySlug("ai-teammates")?.live?.href, "https://ai-teammates.lakshyakumar.in");
  for (const project of projects) assert.equal(getProjectBySlug(project.slug), project);
});

test("all projects have architecture and all default local media exists", () => {
  for (const project of projects) {
    assert.ok(project.media.some(item => item.type === "diagram" && item.nodes.length > 1));
    assert.equal(new Set(project.media.map(item => item.id)).size, project.media.length);
    for (const item of [...project.media, ...(project.cover ? [project.cover] : [])]) {
      if (item.type !== "diagram" && item.src.startsWith("/")) assert.ok(existsSync(join(process.cwd(), "public", item.src)), item.src);
    }
  }
});

test("media accepts empty, single, and arbitrarily mixed ordered entries", () => {
  assert.equal(renderToStaticMarkup(<ProjectGallery items={[]} />), "");
  const image: ProjectMedia = { id: "image", type: "image", src: "https://example.com/screen.png", alt: "A useful screenshot", heading: "Screen", caption: "Image caption" };
  const video: ProjectMedia = { id: "video", type: "video", src: "/demo.mp4", heading: "Demo", caption: "Video caption", captionTrack: { src: "/demo.vtt", language: "en", label: "English" } };
  const diagram: ProjectMedia = { id: "diagram", type: "diagram", heading: "Architecture", caption: "Diagram caption", nodes: [{ id: "client", title: "Client", detail: "Browser", column: 0, row: 0 }, { id: "data", title: "Data", detail: "Database", column: 1, row: 1 }], edges: [{ from: "client", to: "data", label: "request" }], notes: [] };
  const single = renderToStaticMarkup(<ProjectGallery items={[image]} />);
  assert.equal((single.match(/<figure/g) ?? []).length, 1);
  const items = [image, video, diagram, { ...image, id: "image-2" }, { ...video, id: "video-2" }];
  const html = renderToStaticMarkup(<ProjectGallery items={items} />);
  assert.equal((html.match(/<figure/g) ?? []).length, 5);
  assert.ok(html.indexOf("Image caption") < html.indexOf("Video caption"));
  assert.ok(html.indexOf("Video caption") < html.indexOf("Diagram caption"));
  assert.match(html, /alt="A useful screenshot"/);
  assert.match(html, /preload="metadata"/);
  assert.match(html, /kind="captions"/);
  assert.doesNotMatch(html, /autoPlay/i);
});

test("cards and optional links render usable destinations without nested anchors", () => {
  for (const project of projects) {
    const html = renderToStaticMarkup(<ProjectListItem project={project} />);
    assert.ok(html.includes(`/projects/${project.slug}`));
    assert.ok(html.includes(project.github));
  }
  const withoutLive = { ...projects[0], live: undefined };
  const html = renderToStaticMarkup(<ProjectLinks project={withoutLive} />);
  assert.match(html, /GitHub/);
  assert.doesNotMatch(html, /Live project/);
});

test("detail metadata, static routes, sitemap, and unknown slugs stay consistent", async () => {
  assert.deepEqual(generateStaticParams(), projects.map(({ slug }) => ({ slug })));
  const urls = sitemap().map(item => item.url);
  assert.ok(urls.includes("https://lakshyakumar.in/projects"));
  for (const project of projects) {
    const params = Promise.resolve({ slug: project.slug });
    const metadata = await generateMetadata({ params });
    assert.equal(metadata.title, `${project.title} | Lakshya Kumar`);
    assert.equal(metadata.description, project.summary);
    assert.equal(metadata.alternates?.canonical, `https://lakshyakumar.in/projects/${project.slug}`);
    assert.ok(urls.includes(`https://lakshyakumar.in/projects/${project.slug}`));
    const html = renderToStaticMarkup(await ProjectPage({ params }));
    assert.match(html, /Architectural Diagram/);
    assert.ok(html.includes(project.summary));
  }
  await assert.rejects(ProjectPage({ params: Promise.resolve({ slug: "unknown" }) }), (error: unknown) => {
    return error instanceof Error && "digest" in error && String(error.digest).includes("404");
  });
});

test("all 15 dark diagram PNGs exist and render within responsive image elements", () => {
  let count = 0;
  for (const project of projects) {
    const diagrams = project.media.filter(item => item.type === "diagram");
    assert.equal(diagrams.length, 3);
    const html = renderToStaticMarkup(<ProjectGallery items={diagrams} projectSlug={project.slug} />);
    for (const diagram of diagrams) {
      assert.ok(diagram.image);
      const bytes = readFileSync(join(process.cwd(), "public", diagram.image.src));
      assert.equal(bytes.toString("hex", 0, 8), "89504e470d0a1a0a");
      assert.equal(bytes.readUInt32BE(16), diagram.image.width);
      assert.equal(bytes.readUInt32BE(20), diagram.image.height);
      assert.ok(html.includes(`src="${diagram.image.src}"`));
      assert.ok(html.includes(`alt="${diagram.image.alt.replaceAll("&", "&amp;")}"`));
      count++;
    }
    assert.match(html, /Read diagram as text/);
    assert.doesNotMatch(html, /class="diagram-canvas/);
  }
  assert.equal(count, 15);
});

test("supplied screenshots and videos retain native proportions for all five projects", () => {
  let screenshots = 0;
  for (const project of projects) {
    const images = project.media.filter(item => item.type === "image");
    const videos = project.media.filter(item => item.type === "video");
    assert.equal(images.length, project.slug === "habitly" ? 5 : 4);
    assert.equal(videos.length, 1);
    for (const image of images) {
      assert.ok(image.src.startsWith(`/project-images/${project.slug}/`));
      const bytes = readFileSync(join(process.cwd(), "public", image.src));
      assert.equal(image.width, bytes.readUInt32BE(16));
      assert.equal(image.height, bytes.readUInt32BE(20));
      screenshots++;
    }
    const video = videos[0];
    assert.ok(existsSync(join(process.cwd(), "public", video.src)));
    assert.ok(video.width && video.height);
    const html = renderToStaticMarkup(<ProjectGallery items={[video, ...images]} />);
    assert.ok(html.includes(`aspect-ratio:${video.width} / ${video.height}`));
    assert.doesNotMatch(html, /aspect-video|object-cover|max-h-\[80vh\]/);
    assert.match(html, /controls=""/);
    if (project.slug === "habitly") {
      assert.ok(images.every(image => image.height! > image.width!));
      assert.ok(video.height! > video.width!);
      assert.match(html, /max-w-\[360px\]/);
    }
  }
  assert.equal(screenshots, 21);
});
