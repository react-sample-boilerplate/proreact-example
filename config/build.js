import webpack from 'webpack';
import ora from 'ora';
import rm from 'rimraf';
import chalk from 'chalk';
import webpackConfig from './webpack.build.config.babel.js';

const log = console.log;

const spinner = ora(" building for PRODUCTION...");
spinner.start();

rm('build', err => {

    if ( err ) throw err;
    
    webpack(webpackConfig, function(err, stats){
        spinner.stop();

        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        log(chalk.yellow.bgRed("Success build!"));
    });

});