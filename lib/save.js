var normalizeUrl = require('normalize-url')
var objectValues = require('object-values')
var createHTML = require('create-html')
var read = require('node-readability')
var timestamp = require('time-stamp')
var assert = require('assert')
var xtend = require('xtend')
var path = require('path')

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
  var urlPage = normalizeUrl(options.url)

  read(urlPage, function (err, page, meta) {
    if (err) throw err.message

    var pageBasename = timestamp(options.prepend) + '-' + utilText.sanitize(page.title)
    var pageContent = getPageContent(options.template, page)
    var dirOutput = path.join(options.output, pageBasename)

    var outputContent = createHTML({
      head: '<style>' + options.style + '</style>',
      title: page.title,
      body: pageContent
    })

    var outputJson = {
      basename: pageBasename,
      content: page.content,
      title: page.title,
      date: Date.now(),
      url: urlPage,
      source: url
    }

    try {
      fs.mkdirSync(dirOutput)
      fs.writeFileSync(path.join(dirOutput, 'index.html'), outputContent)
      fs.writeFileSync(path.join(dirOutput, 'index.json'), JSON.stringify(outputJson, { }, 2))
    } catch (err) {
      throw new Error('page has already been saved')
    }

    // var images = getPageImages(page.document)
    page.close()
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
