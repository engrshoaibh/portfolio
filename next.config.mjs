/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: '/about',
          destination: '/',
          permanent: true, 
        },
       
      ];
    },
  };
  
  export default nextConfig;
  