const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://127.0.0.1:8888',
            changeOrigin: true,
            pathRewrite: {
                '^/': '',
            }
        })
    );
    app.use(
        '/api1',
        createProxyMiddleware({
            target: 'http://localhost:8082',
            changeOrigin: true,
            pathRewrite: {
                '^/api1': '',
            }
        })
    );
};