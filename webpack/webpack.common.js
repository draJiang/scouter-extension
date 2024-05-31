const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

const DotenvWebpackPlugin = require('dotenv-webpack');


module.exports = {
    entry: {
        popup: path.join(srcDir, '/popup/index.tsx'),
        options: path.join(srcDir, '/Options/index.tsx'),
        background: path.join(srcDir, '/background/index.ts'),
        content_script: path.join(srcDir, '/contentScript/index.tsx'),
        welcome: path.join(srcDir, '/welcome/index.tsx')
    },
    output: {
        path: path.join(__dirname, "../dist/js"),
        filename: "[name].js",
        publicPath: "/"
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.css$/i,
                use: [{
                    loader: 'style-loader',
                },
                {
                    loader: 'css-loader',
                },
                {
                    loader: 'postcss-loader',
                },
                ],
            }, {
                test: /\.(png|jpe?g|gif)$/i,
                use: 'url-loader'
            },

        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
        fallback: {
            "path": require.resolve("path-browserify")
        }
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: "../", context: "public" }
                , { from: "src/assets", to: "../images" }],
            options: {},
        }),
        new DotenvWebpackPlugin({
            path: './.env'
        }),
    ],
};
