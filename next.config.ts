import type { NextConfig } from "next";
// https://spaceomid.com/assets/images/common/logo.svg
// https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Brad_Pitt-69858.jpg/960px-Brad_Pitt-69858.jpg

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["spaceomid.com", "upload.wikimedia.org", "reqres.in"],
  },
};

export default nextConfig;
