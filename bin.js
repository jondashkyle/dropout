#!/usr/bin/env node
var yargs = require('yargs')
var lib = require('.')

yargs
  .usage('$0 <cmd> [args]')
  .command('save [url]', 'save a url', function (yargs) {
    yargs
      .positional('url', {
        type: 'string',
        describe: 'the url to save'
      })
      .option('output', {
        alias: 'o',
        describe: 'output directory',
        default: process.cwd()
      })
  }, function (argv) {
    if (!argv.url) {
      return console.log('Please provide a URL: drop save [url]')
    }

    try {
      return lib.save(argv.url, argv)
    } catch (err) {
      return console.log('Can not save: ' + err.message)
    }
  })
  .help()
  .argv
