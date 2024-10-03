/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/about',
          destination: '/',
          permanent: true,  // redirects /about to /
        },
        // No need to redirect '/' to '/'
      ];
    },
  };
  
  module.exports = nextConfig;
  