const path = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
module.exports = [
    {
        entry: {
            bundle: ['babel-polyfill', './src/index.js']
        },
        output: {
            path: path.join(__dirname, './src/build'),
            name: '[name].js'
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
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
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
        ],
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        devtool: "source-map",
        externals: {
            "react": "React",
            "react-dom": "ReactDOM"
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 9000
        }
    }
]
