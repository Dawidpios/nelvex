/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    FILESTACK_API: process.env.FILESTACK_API
  },
  compiler: {
    // Enables the styled-components SWC transform
    styledComponents: true
  },
  images: {
    domains: ['https://cdn.filestackcontent.com/*', 'i.dummyjson.com'],
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
