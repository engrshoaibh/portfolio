/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  
    async redirects() {
      return [
        {
          source: '/:path*', // Matches all routes
          destination: '/',  // Redirects to the homepage
          permanent: true,   // Indicates a permanent redirect (status 308)
        },
      ];
    },
  }
  
  export default nextConfig;
  