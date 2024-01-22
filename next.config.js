module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        // hostname: "localhost",
        hostname: "host.docker.internal",
        // production環境で最適化されないバグががある
        // https://github.com/vercel/next.js/issues/58248
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
  output: "standalone",
};
