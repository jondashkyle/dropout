var normalizeUrl = require('normalize-url')
var objectValues = require('object-values')
var createHTML = require('create-html')
var read = require('node-readability')
var timestamp = require('time-stamp')
var assert = require('assert')
var xtend = require('xtend')
var path = require('path')
var mkdirp = require("mkdirp")

var libGet = require('./get')
var utilText = require('../utils/text')
var defaults = require('./defaults.json')

module.exports = save

function save (url, opts) {
  assert.equal(typeof url, 'string', 'drop/save: arg1 url must be type string')
  assert.equal(typeof opts, 'object', 'drop/save: arg2 opts must be type string')
  assert.equal(typeof opts.fs, 'object', 'drop/save: arg2 opts.fs must be type object')
  assert.equal(typeof opts.output, 'string', 'drop/save: arg2 opts.output must be type string')
  assert.equal(typeof opts.fs.mkdirSync, 'function', 'drop/save: arg2 opts.fs.mkdirSync must be type function')

  var fs = opts.fs
  var options = xtend(defaults, opts)
  var urlPage = normalizeUrl(url)

  libGet(urlPage, options, function (err, page) {
    if (err) throw err.message

    var pageContent = getPageContent(options.template, page)
    if (options.root) {
      if (!options.output) {
        throw new Error("options.root requires options.output")
      }
      var dirOutput = path.join(options.output)
    } else {
      var dirOutput = path.join(options.output, page.basename)
    }

    var outputContent = createHTML({
      head: '<style>' + options.style + '</style>',
      title: page.title,
      body: pageContent
    })

    return new Promise((resolve, reject) => {
      mkdirp(dirOutput, (err) => {
        if (err) { console.error(err); return reject(err) }
        resolve()
      })
    }).then(() => {
      try {
        fs.writeFileSync(path.join(dirOutput, 'index.html'), outputContent)
        fs.writeFileSync(path.join(dirOutput, 'index.json'), JSON.stringify(page, { }, 2))
      } catch (err) {
        console.error(err)
        throw new Error('page has already been saved')
      }
    })
  })
}

function getPageContent (template, page) {
  assert.equal(typeof page, 'object', 'arg2 page must be type object')
  if (!template) return content
  else return template
    .replace('{{CONTENT}}', page.content)
    .replace('{{TITLE}}', page.title)
}

function getPageImages (pageDocument) {
  try {
    var images = pageDocument.querySelectorAll('img')
    return objectValues(images).map(function (image) {
      return image.getAttribute('src')
    })
  } catch (err) {
    return [ ]
  }
}
