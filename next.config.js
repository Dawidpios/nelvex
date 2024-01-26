/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: true,
  },
  reactStrictMode: true,
  env: {
    FILESTACK_API: process.env.FILESTACK_API
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
    domains: ['cdn.filestackcontent.com/*', 'fakestoreapi.com', 'placehold.co', 'firebasestorage.googleapis.com'],
  },
  async headers() {
    return [
      {
        source: '/api/getProducts',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: "true",
          },
        ],
      },
      {
        source: '/api/getUser',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Credentials',
            value: "true",
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig
