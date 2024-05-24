module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        // protocol: "http",
        hostname: "fablesearch.com",
        // hostname: "localhost",
        pathname: "/uploads/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
};
