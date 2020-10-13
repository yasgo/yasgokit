const HtmlWebpackPlugin = require('html-webpack-plugin');
const glob = require("glob");
const config = require('../config');
const helper = require('../helper');

module.exports = {
    pages: glob.sync(`${config.path.pages}/**/*.html`, { ignore: `${config.path.pages}/index.html` }).map(page => (
        new HtmlWebpackPlugin({
            filename: helper.deleteFilePathSingle(page),
            template: page
        })
    )),
    components: glob.sync(`${config.path.components}/**/*.html`).map(component => (
        new HtmlWebpackPlugin({
            filename: 'component-' + helper.deleteFilePathSingle(component),
            template: component
        })
    ))
}