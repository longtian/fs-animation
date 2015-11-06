/**
 * Created by yan on 15-11-6.
 */

/**
 * this file will read from command line options or environment variables
 */

var yargs = require('yargs');
var dotFilesRegExp = /[\/\\]\./;

yargs
  .example('$0 /var/lib/docker/containers', 'Watch docker containers directory change')
  .epilog('MIT Licensed 2015 <wangyan@oneapm.com>');

yargs
  .help('h')
  .usage('Usage: $0 [[[dir1] dir2] dir3 ...]')
  .version(function () {
    return require('./package').version;
  });

yargs
  .default('port', process.env.PORT || 8001)
  .default('hostname', process.env.HOSTNAME || '127.0.0.1');

yargs
  .boolean('ignoreInitial')
  .default('ignoreInitial', true);

yargs
  .boolean('ignoredDotFiles')
  .default('ignoredDotFiles', true);

yargs
  .default('ignore', null);


yargs
  .default('throttle', 100);

yargs
  .count('v')
  .alias('v', 'verbose');

var argv = yargs.argv;

if (argv._.length === 0) {
  argv._.push(process.cwd());
}

if (argv.ignoredDotFiles) {
  if (argv.ignore) {
    if (argv.ignore.length) {
      argv.ignore.push(dotFilesRegExp);
    } else {
      argv.ignore = [argv.ignore, dotFilesRegExp];
    }
  } else {
    argv.ignore = [dotFilesRegExp];
  }
}

// @link https://www.npmjs.com/package/bunyan#levels
var LOG_LEVEL = ['warn', 'info', 'debug', 'trace'];
argv.logLevel = process.env.LOG_LEVEL || LOG_LEVEL[argv.v] || 'warn';

module.exports = argv;
