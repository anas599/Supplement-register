/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  env: {
    DEPLOYDOMAIN: process.env.DEPLOYDOMAIN,
    DATABASE_URL: process.env.DATABASE_URL,
    ACCESS_KEY_ID: process.env.ACCESS_KEY_ID,
    SECRET_ACCESS_KEY: process.env.SECRET_ACCESS_KEY,
    REGION: process.env.REGION,
    BUCKET_NAME: process.env.BUCKET_NAME,
  },
  images: {
    domains: [
      'olimpsport.com',
      'upload.wikimedia.org',
      'tailwindui.com',
      'images.unsplash.com',
      `${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com`,
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
