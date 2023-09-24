/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  env: {
    DEPLOYDOMAIN: process.env.DEPLOYDOMAIN,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
    AWS_REGION: process.env.AWS_REGION,
    AWS_BUCKET_NAME: process.env.AWS_BUCKET_NAME,
  },
  images: {
    domains: [
      'olimpsport.com',
      'upload.wikimedia.org',
      'tailwindui.com',
      'images.unsplash.com',
    ],
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
