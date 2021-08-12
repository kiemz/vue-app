
module.exports = {
    devServer: {
        port: 8000,
        disableHostCheck: true,
        proxy: {
            '/service': {
                target: 'https://m.zbj.com'
            },
            '/api': {
                target: 'https://m.zbj.com'
            }
        }
    }
}