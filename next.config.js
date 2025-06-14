/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    domains: ['firebasestorage.googleapis.com'],
  },
  output: 'export',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/duyt2iykf/**',
      },
    ],
    minimumCacheTTL: 60,
  },
  experimental: {
    optimizeCss: true,
  },
  // Configuração para páginas estáticas
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
}

module.exports = nextConfig 