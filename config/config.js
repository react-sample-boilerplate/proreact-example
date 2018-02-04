export default {

    dev: {
        devServer: {
            publicPath: '/',
            port: 1234,
        },
        devtool: '#inline-sourcemap',
        entry: {
            vendor: [
                'react',
                'react-dom',
                'babel-polyfill',
            ],
            app: './src/index.js'
        },
    },

    build: {

        entry: {
            vendor: [
                'react',
                'react-dom',
                'babel-polyfill',
            ],
            app: './src/index.js'
        },

        assetsDirectory: 'build',
        assetsSubDirectory: '/static',
        
    },


}