module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // protocol: "http",
        hostname: "fablesearch.com",
        // hostname: "d358fosu4otc8s.cloudfront.net",
        // hostname: "localhost",
        pathname: "/uploads/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  env: {
    NEXT_PUBLIC_GOOGLE_MAP_API: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
  },
  output: "standalone",
};
