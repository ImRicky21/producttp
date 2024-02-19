/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tp.fkip.ulm.ac.id",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
