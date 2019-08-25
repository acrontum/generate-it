module.exports = (value) => {
  const headers = Object.keys(value).filter((key) => key.startsWith('apiKey')).map((key) => {
    return `req.headers['${value[key].name.toLowerCase()}']`
  })
  return (headers.length === 0) ? 'false' : headers.join(' || ')
}