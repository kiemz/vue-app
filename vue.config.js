
module.exports = {
    devServer: {
        port: 8000,
        proxy: {
            '/api': {
                target: 'https://m.zbj.com'
            }
        }
    }
}