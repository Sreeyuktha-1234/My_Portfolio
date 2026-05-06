/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['your-image-domain.com'], // Add your image domains here
  },
  // Optimize for Vercel deployment
  output: 'standalone',
}

module.exports = nextConfig
