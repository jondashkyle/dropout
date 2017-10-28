module.exports = {
  sanitize: sanitize
}

function sanitize (str) {
  return str
    .replace(/[^\w\s]|_/g, '')
    .replace(/\s+/g, ' ')
    .replace(/\s+/g, '-')
    .toLowerCase()
}
