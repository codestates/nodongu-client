const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/nod',
    createProxyMiddleware({
      target: 'http://ec2-3-133-155-148.us-east-2.compute.amazonaws.com',
      changeOrigin: true,
    })
  );
};
