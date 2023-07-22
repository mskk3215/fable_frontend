import { Application } from "express";
const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app: Application) {
  app.use(
    "/api/v1",
    createProxyMiddleware({
      target: "http://localhost:3001",
      changeOrigin: true,
    })
  );
};
