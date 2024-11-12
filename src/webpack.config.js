const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.tsx', // Your entry point (adjust if necessary)
    output: {
        path: path.resolve(__dirname, 'dist'), // Output folder
        filename: 'bundle.js', // Output file name
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // Resolve TypeScript and JavaScript extensions
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, // Match .ts and .tsx files
                use: 'ts-loader', // Use ts-loader for TypeScript files
                exclude: /node_modules/,
            },
            {
                test: /\.js|\.jsx$/, // Match JavaScript and JSX files
                use: {
                    loader: 'babel-loader', // Use babel-loader for JS/JSX files
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                    },
                },
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // Handle CSS files
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    devtool: 'source-map', // Optional: Useful for debugging (optional)
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        port: 3000, // Development server port
        open: true, // Open the browser automatically
        hot: true, // Hot module replacement (optional)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html', // HTML template to inject the bundle
        }),
    ],
};
