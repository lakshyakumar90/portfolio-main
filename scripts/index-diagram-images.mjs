import { readFileSync, writeFileSync } from "node:fs";
const assets = JSON.parse(readFileSync("docs/diagrams/generated-assets.json", "utf8"));
const images = {};
for (const asset of assets) {
 const src = `/diagrams/${asset.slug}/${asset.id}.png`;
 const bytes = readFileSync(`public${src}`);
 images[`${asset.slug}/${asset.id}`] = {src, width:bytes.readUInt32BE(16),height:bytes.readUInt32BE(20)};
}
writeFileSync("lib/diagram-images.json", JSON.stringify(images,null,2)+"\n");
