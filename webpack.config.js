const path = require('path');
const fs = require('fs');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const ClosureCompilerPlugin = require('google-closure-compiler-js').webpack;

const env = process.env.NODE_ENV || 'development';
const dev = env === 'development';
const plugins = [
    new NodemonPlugin(),
    new ClosureCompilerPlugin({options: {
        languageIn: 'ECMASCRIPT6',
        languageOut: 'ECMASCRIPT5',
        compilationLevel: 'SIMPLE'
    }})
];

// TODO: add plugins

module.exports = {
    entry: path.resolve(__dirname, "./server/bin/www.ts"),
    output: {
        path: path.resolve(__dirname, "./bin"), 
        filename: "server.bundle.js"
    },
    plugins: dev ? plugins : [],
    target: "node",
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ["ts-loader"],
                exclude: /node_modules/
            },
            {
                enforce: "pre",
                test: /\.tsx?$/,
                use: "tslint-loader",
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [ ".ts", ".tsx" ]
    }
}