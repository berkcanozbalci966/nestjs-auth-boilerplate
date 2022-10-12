/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["flowbite.com"],
  },
  i18n: {
    locales: ["en-US", "tr"],
    defaultLocale: "tr",
  },
};

module.exports = nextConfig;
