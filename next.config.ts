import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    /* config options here */
    reactStrictMode: true,
    images: {
        domains: [ 'via.placeholder.com', 'lh3.googleusercontent.com', 'github.com', 'drive.google.com' ],
    },
};

export default nextConfig;
