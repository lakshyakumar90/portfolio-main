"use client";

import { useEffect, useRef, useState } from "react";

type DiagramImage = { src: string; alt: string; width: number; height: number };

export function ProjectDiagramImage({ image, heading }: { image: DiagramImage; heading: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!open) return;
    const element = dialog.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    element?.showModal();
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  if (failed) return <p role="status" className="py-6 text-sm text-neutral-600 dark:text-neutral-300">This diagram could not be loaded. Please try again later. The text version is available below.</p>;

  return <>
    <button type="button" onClick={() => setOpen(true)} aria-label={`Open ${heading} in full screen`} aria-haspopup="dialog" className="block w-full cursor-zoom-in p-0 text-left focus-visible:outline-2 focus-visible:outline-offset-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img {...image} loading="lazy" decoding="async" onError={() => setFailed(true)} className="block h-auto w-full max-w-full" />
    </button>
    <dialog ref={dialog} aria-label={`${heading} — full screen`} onCancel={() => setOpen(false)} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) setOpen(false); }} className="fixed inset-0 m-0 h-dvh max-h-none w-screen max-w-none border-0 bg-neutral-950/95 p-4 text-white backdrop:bg-black/80 sm:p-8">
      {open && <>
        <button type="button" autoFocus onClick={() => setOpen(false)} aria-label="Close full-screen diagram" className="absolute right-4 top-4 z-10 rounded-md border border-white/30 bg-neutral-900 px-4 py-2 text-sm hover:bg-neutral-800 focus-visible:outline-2 focus-visible:outline-offset-4">Close <span aria-hidden="true">×</span></button>
        <div className="pointer-events-none flex h-full w-full items-center justify-center pt-12">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img {...image} className="pointer-events-auto block h-auto max-h-full w-auto max-w-full object-contain" />
        </div>
      </>}
    </dialog>
  </>;
}
