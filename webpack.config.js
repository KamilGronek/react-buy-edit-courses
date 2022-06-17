const { merge } = require('webpack-merge');

const commonConfiguration = require('./webpack/common');

module.exports = (env, { mode }) => {
    const properlyConfig = require(`./webpack/${mode}`);
    const mergedConfig = merge(commonConfiguration, properlyConfig);

    return mergedConfig;
}