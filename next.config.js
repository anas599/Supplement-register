/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['olimpsport.com', 'upload.wikimedia.org'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'olimpsport.com',
        port: '',
        pathname: '/eu/**',
      },
    ],
  },
};

module.exports = nextConfig;
