module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.cloudfront.net",
        pathname: "/uploads/**",
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
};
