import merge from 'webpack-merge';
import baseConfig from './base.config.js';
import config from './config.js';

export default merge(baseConfig, {
    entry: config.build.entry
});