/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.resolve.alias.canvas = false;
        config.resolve.alias.encoding = false;
        config.module.rules.push({
            test: /\.(pdf)$/,
            type: "asset/resource",
          });
        return config;
      },
};

export default nextConfig;
