import { getProjectBySlug } from "@/lib/projects";
import { renderDiagramSvg } from "@/lib/diagram-svg";

export const dynamic = "force-static";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; diagram: string }> }) {
  const { slug, diagram } = await params;
  const project = getProjectBySlug(slug);
  const id = diagram.endsWith(".svg") ? diagram.slice(0, -4) : undefined;
  const item = project?.media.find((media) => media.type === "diagram" && media.id === id);
  if (!project || !item || item.type !== "diagram") return new Response("Diagram not found", { status: 404 });
  return new Response(renderDiagramSvg(item, `${slug}-${item.id}`), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Content-Disposition": `inline; filename="${slug}-${item.id}.svg"`,
      "Cache-Control": "public, max-age=3600",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
    },
  });
}
