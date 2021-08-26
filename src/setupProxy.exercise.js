function proxy(app) {
  app.get(/^\/$/, function (req, res) {
    res.redirect('/discover')
  })
}

module.exports = proxy
