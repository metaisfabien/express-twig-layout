/*!
 * express-twig-layout
 *
 * Copyright(c) 2018 Metais Fabien
 * MIT Licensed
 */
let options = {}
//Layout object
const Layout = require('twig-layout')
module.exports = function (opts) {
  options = opts || {}
  return async function (req, res, next) {

    //warn
    if (req.layout) {
      next()
      return
    }
    if (!options.views) {
      options.views = req.app.get('views')
    }

    //add a new instance of Layout on the request object
    req.layout = new Layout(options)
    await req.layout.init()
    req.layout.req = req
    next()
  }
}
