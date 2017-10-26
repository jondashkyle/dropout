module.exports = {
  sanitize: sanitize
}

function sanitize (str) {
  return str.replace(/\s+/g, '-').toLowerCase()
}
