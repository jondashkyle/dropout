var normalizeUrl = require('normalize-url')
var objectValues = require('object-values')
var read = require('node-readability')
var timestamp = require('time-stamp')
var assert = require('assert')
var xtend = require('xtend')
var path = require('path')

var utilText = require('../utils/text')
var defaults = require('./defaults.json')

module.exports = save

function save (url, opts, callback) {
  assert.equal(typeof url, 'string', 'drop/save: arg1 url must be type string')
  assert.equal(typeof opts, 'object', 'drop/save: arg2 opts must be type string')
  assert.equal(typeof callback, 'function', 'drop/get: arg3 opts must be type function')

  var options = xtend(defaults, opts)
  var urlPage = normalizeUrl(url)

  read(urlPage, function (err, page, meta) {
    if (err) throw err.message
    var pageBasename = timestamp(options.prepend) + '-' + utilText.sanitize(page.title)

    callback(err, {
      basename: pageBasename,
      content: page.content,
      title: page.title,
      date: Date.now(),
      url: urlPage,
      source: url
    })

    page.close()
  })
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
