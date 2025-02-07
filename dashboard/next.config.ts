import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['cdn.sanity.io'], // Add 'cdn.sanity.io' to the list of allowed domains
},
remotePatterns: [
  {
    protocol: 'https',
    hostname: 'cdn.sanity.io',
    port: '',
    pathname: '**',
    search: '',
  },
  {
    protocol: 'https',
    hostname: 'randomuser.me',
    port: '',
    pathname: '**',
    search: '',
  }
],
eslint:{
  ignoreDuringBuilds:true
}
};

export default nextConfig;
