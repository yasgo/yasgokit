const glob = require("glob");
const config = require('../config');
const helper = require('../helper');

const collection = [...config.primary.js];

Object.keys(config.path).forEach(item =>
    collection.push(...glob.sync(`${config.path[item]}/**/*.js`).filter(globItem => collection.indexOf(globItem) === -1))
)

module.exports = {
    collection: collection
};