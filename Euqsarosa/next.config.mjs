/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.brandfetch.io",
      },
    ],
  },
};

export default nextConfig;
