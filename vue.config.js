
module.exports = {
    devServer: {
        port: 8000,
        proxy: {
            '/service': {
                target: 'https://m.zbj.com'
            }
        }
    }
}