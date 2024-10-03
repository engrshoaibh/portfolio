/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        // Basic redirect
        {
          source: '/about',
          destination: '/',
          permanent: true,
        },
        // Wildcard path matching
        {
          source: '/blog/:slug',
          destination: '/news/:slug',
          permanent: true,
        },
        // Catch-all redirect for undefined routes
        {
          source: '/:path*',
          destination: '/',
          permanent: false, // Can be true if you want it as a permanent redirect (301)
        },
      ];
    },
  };
  
  export default nextConfig;
  