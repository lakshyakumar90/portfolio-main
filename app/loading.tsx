export default function Loading() {
  return <main className="home-page" aria-busy="true" aria-label="Loading page"><div className="home-column page-loading" role="status">
    <span className="sr-only">Loading portfolio…</span>
    <div className="loading-portrait" /><div className="loading-heading" /><div className="loading-line" /><div className="loading-line loading-short" />
  </div></main>;
}
