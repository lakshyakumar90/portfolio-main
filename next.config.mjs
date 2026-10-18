/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep verification builds isolated when the local dev server is running.
  distDir: process.env.PORTFOLIO_BUILD_DIR || ".next",
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
