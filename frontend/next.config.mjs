/** @type {import('next').NextConfig} */

import configs from "./configs.json" assert { type: "json" };

const nextConfig = {
    images: {
        domains: [configs.STRAPI_DOMAIN],
    },
};

export default nextConfig;
