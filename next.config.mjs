import nextMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["md", "mdx", "tsx", "ts", "jsx", "js"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "gmri4o54mi.ufs.sh",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
};

const withMDX = nextMDX({
  extension: /\.mdx?$/,
});

export default withMDX(nextConfig);
