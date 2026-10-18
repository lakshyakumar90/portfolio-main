import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";

const titles = { "ai-teammates": "AI Teammates", excalidraw: "Excalidraw", habitly: "Habitly", "aurora-ui": "Aurora UI", devconnect: "DevConnect" };
const assets = {};
const videoFiles = readdirSync("public/project-videos");
for (const [slug, title] of Object.entries(titles)) {
  const files = readdirSync(`public/project-images/${slug}`).filter(file => file.endsWith(".png")).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const images = files.map((file, index) => {
    const src = `/project-images/${slug}/${file}`;
    const bytes = readFileSync(`public${src}`);
    const screen = slug === "habitly" ? file.replace(/^\d+-/, "").replace(/\.png$/, "") : `screenshot ${index + 1}`;
    return { id: `screen-${index + 1}`, type: "image", src, alt: `${title} — ${screen}`, heading: slug === "habitly" ? screen.charAt(0).toUpperCase() + screen.slice(1) : undefined, caption: `${title} — ${screen}`, width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
  });
  const videoFile = videoFiles.find(file => file.toLowerCase().startsWith(slug));
  if (!videoFile) throw new Error(`Missing video: ${slug}`);
  const metadata = JSON.parse(execFileSync("ffprobe", ["-v", "error", "-select_streams", "v:0", "-show_entries", "stream=width,height:stream_side_data=rotation", "-of", "json", `public/project-videos/${videoFile}`], { encoding: "utf8" }));
  const stream = metadata.streams[0];
  const rotation = stream.side_data_list?.find(data => data.rotation !== undefined)?.rotation ?? 0;
  const rotated = Math.abs(rotation) % 180 === 90;
  assets[slug] = { images, video: { id: "demo", type: "video", src: `/project-videos/${videoFile}`, heading: "Product walkthrough", caption: `${title} — product walkthrough`, width: rotated ? stream.height : stream.width, height: rotated ? stream.width : stream.height } };
}
writeFileSync("lib/project-assets.json", JSON.stringify(assets, null, 2) + "\n");
