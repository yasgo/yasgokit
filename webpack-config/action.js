const mkdirp = require('mkdirp');
const fs = require('fs');

const htmlFormat = require('html-formatter');
const jsFormat = require('js-beautify');

const template = {
    scss: require('./template/scss-template').template,
    js: require('./template/js-template').template,
    component: require('./template/component-template').template,
    page: require('./template/page-template').template
}

const typeCollection = {
    component: 'components',
    page: 'pages'
}

create = (type, name) => {
    mkdirp(`./src/${typeCollection[type]}/${name}`)

    fs.appendFile(`./src/${typeCollection[type]}/${name}/${name}.html`, htmlFormat.render(template[type](name)));
    fs.appendFile(`./src/${typeCollection[type]}/${name}/${name}.scss`, template.scss(name));
    fs.appendFile(`./src/${typeCollection[type]}/${name}/${name}.js`, jsFormat(template.js(name)));
}

module.exports = {
    create: (type, name) => create(type, name)
};