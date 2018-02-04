
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import config from './config.js';


const assetPath = _path => {
    return path.resolve(__dirname, '../', config.build.assetsDirectory);
};

const excludeInject = obj => {
    for ( let i in obj ) {
        if ( obj[i].toString().toLowerCase() == '[object object]' && undefined == obj[i].exclude ) {
            obj[i].exclude = /node_modules/;
        }
    }
    return obj;
};

const objToArray = obj => {
    let idx = 0,
        arr = [];
    for ( let props in obj ) {
        arr[idx++] = obj[props];
    }
    return arr;
};


const extractCSS = new ExtractTextPlugin({
    filename: 'static/style/app.css',
    allChunks: true
});

const loaderRules = {
    jsOrjsxLoader: {
        test: /\.jsx?$/,
        use: ['babel-loader']
    },
    cssLoader : {
        test: /\.s?css$/,
        use: extractCSS.extract({
            fallback: 'style-loader',
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        importLoaders: 1,
                        moduleimports: true,
                        localIdentName: '[local]'
                    },
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: () => [
                            require('postcss-flexbugs-fixes'),
                            autoprefixer({
                                // browsers: browserlist,
                                flexbox: true, // false, 'no-2009',
                            }),
                        ],
                    },
                },
                'sass-loader'
            ],
        }),
    },
};

const getRules = ((rules) => objToArray(excludeInject(rules)) )(loaderRules);

export default {
    getRules,
    loaderRules,
    extractCSS,
    assetPath
};