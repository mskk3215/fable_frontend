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
        pathname: "/uploads/*",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
};
