/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this with your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
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
      "olimpsport.com",
      "upload.wikimedia.org",
      "tailwindui.com",
      "images.unsplash.com",
      `${process.env.BUCKET_NAME}.s3.${process.env.REGION}.amazonaws.com`,
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "olimpsport.com",
        port: "",
        pathname: "/eu/**",
      },
    ],
  },
};

module.exports = nextConfig;
