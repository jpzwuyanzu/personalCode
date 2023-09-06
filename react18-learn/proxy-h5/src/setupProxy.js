const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
    app.use(
        '/chat',
        createProxyMiddleware({
        // target: 'http://172.28.113.248:8067', // 本地
        target: 'http://api.agentfff.xyz', //测试
        changeOrigin: true,
        })
    );
    app.use(
        '/api',
        createProxyMiddleware({
            // target: 'http://172.28.113.248:8066', //本地
            target: 'http://api.agentfff.xyz', //测试
            changeOrigin: true,
            })
    )
    };