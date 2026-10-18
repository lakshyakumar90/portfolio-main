"use client";

import { useState } from "react";
import type { ProjectMedia } from "@/lib/projects";

export function ProjectMediaAsset({ item }: { item: Exclude<ProjectMedia, { type: "diagram" }> }) {
  const [failed, setFailed] = useState(false);
  if (failed) {
    return <div role="status" className="rounded-xl bg-neutral-100 px-5 py-10 text-center text-sm text-neutral-600 dark:bg-neutral-900 dark:text-neutral-300">
      This {item.type} could not be loaded. Please try again later.
    </div>;
  }
  if (item.type === "image") {
    // Plain images accept future HTTPS hosts without a hardcoded Next image allowlist.
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={item.src} alt={item.alt} width={item.width} height={item.height} loading="lazy" decoding="async" onError={() => setFailed(true)} className={`mx-auto block h-auto w-full object-contain ${item.width && item.height && item.height > item.width ? "max-w-[360px]" : "max-w-full"}`} />;
  }
  return <video src={item.src} poster={item.poster} width={item.width} height={item.height} style={item.width && item.height ? { aspectRatio: `${item.width} / ${item.height}` } : undefined} crossOrigin={item.captionTrack ? "anonymous" : undefined} controls playsInline preload="metadata" onError={() => setFailed(true)} aria-label={item.heading ?? "Project video"} className={`mx-auto block h-auto w-full bg-neutral-950 object-contain ${item.width && item.height && item.height > item.width ? "max-w-[360px]" : "max-w-full"}`}>
    {item.captionTrack && <track kind="captions" src={item.captionTrack.src} srcLang={item.captionTrack.language} label={item.captionTrack.label} default />}
    Your browser does not support embedded video.
  </video>;
}
