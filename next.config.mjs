/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/(.*)',
        destination: '/',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;