var path = require('path')
var { CheckerPlugin } = require('awesome-typescript-loader')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')

var pathsToClean = [
    './src/dist',
    './src/build'
  ]
  
  // the clean options to use
var cleanOptions = {
    root:    __dirname,
    verbose:  true,
    dry:      false
  }
  


module.exports =
{
    entry: {
        bundle: ['babel-polyfill', './src/index.tsx']
    },
    output: {
        path: path.join(__dirname, './src/build'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|sass|less)$/,
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    'postcss-loader'
                ]
            },    
            {
                test: /\.tsx$/,
                exclude: /(node_modules|bower_components)/,
                use: [
                    'awesome-typescript-loader'
                ]
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader'
            // },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                    loader: 'file-loader' 
                    }
                ]
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ]
    },
    plugins: [
        new CheckerPlugin(),
        new HtmlWebpackPlugin({  // Also generate a test.html 
            filename: 'index.html',
            template: './index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    watch: true,
    watchOptions: {
        poll:1000,
        aggregateTimeout: 500, 
        ignored:/node_modules/,
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx']
    },
    devtool: "source-map",
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    // },
    devServer: {
        contentBase: path.join(__dirname, "./src/dist"),
        compress: true,
        hot: true,
        port: 9000
    }
}

if (process.env.NODE_ENV == 'production') {
    module.exports.plugins = (module.exports.plugins || []).concat([
        new CleanWebpackPlugin(pathsToClean, cleanOptions),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new webpack.optimize.UglifyJsPlugin()
    ])
}