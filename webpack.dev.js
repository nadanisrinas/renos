var webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
    entry: ["./src/index.js", "./src/style.scss"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: [/\.s[ac]ss$/i,/\.css$/i],
                use: [
                    {
                        loader: "style-loader"
                    },
                    // MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader"
                    },
                    {
                        // Loader for webpack to process CSS with PostCSS
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('autoprefixer'),
                                ];
                            }
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: { implementation: require("sass") }
                    },
                    
                ]
            },
            {
                test: /\.html$/,
                use : ['html-loader']
            },
            
            {
                test: /\.(gif|png|jpe?g)$/i,
                exclude: [/node_modules/],
                use : [
                    {
                        loader: 'file-loader',
                        options : {
                            name: '[name].[ext]',
                            outputPath : 'img/',
                            publicPath : 'img/',
                            esModule: false
                        }
                    }
                ]
                
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                exclude: "/node_modules/",
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[hash].[ext]",
                        outputPath: "fonts",
                        esModule: false
                    }
                }
            }
            
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new CleanWebpackPlugin({
            cleanAfterEveryBuildPatterns: ['dist']
        }),
        // new MiniCssExtractPlugin({
        //     filename: 'bundle.css'
        // })
        
    ]
}