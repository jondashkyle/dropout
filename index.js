var xtend = require('xtend')
var path = require('path')
var fs = require('./utils/fs')

var template = '<main class="markdown-body" style="max-width: 888px; margin: 60px auto;"><h1>{{TITLE}}</h1>{{CONTENT}}</main>'
var style = fs.readFileSync(path.join(__dirname, '/node_modules/github-markdown-css/github-markdown.css'), 'utf8')

var libSave = require('./lib/save')
var libGet = require('./lib/get')

module.exports = {
  get: function (urlPage, opts, callback) {
    var options = xtend({ }, opts)
    return libGet(urlPage, options, callback)
  },
  save: function (urlPage, opts) {
    var options = xtend({
      template: template,
      style: style,
      fs: fs
    }, opts)
    return libSave(urlPage, options)
  }
}