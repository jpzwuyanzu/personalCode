const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://172.28.113.248:8066',
        changeOrigin: true,
        })
    );
    };