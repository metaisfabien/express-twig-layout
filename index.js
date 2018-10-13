/*!
 * express-twig-layout
 *
 * Copyright(c) 2018 Metais Fabien
 * MIT Licensed
 */
var options = {}
//Layout object
const Layout = require('twig-layout')
module.exports = function (options) {
  var opts = options || {}
  return function (req, res, next) {
    function createInstance (options) {
      //add a new instance of Layout on the request object
      req.layout = new Layout(options)
      req.layout.req = req
      next()
    }

    //warn
    if (req.layout) {
      next()
      return
    }

    var options = {
      //views directory
      views: req.app.get('views'),
      blocks: req.app.get('blocks'),
    }

    if (opts.extend) {
      opts.extend(req, res, (extendBlock, extendTemplate) => {
        //object to extend the block Object
        options.extendBlock = extendBlock || {}
        //object to extend the data template Object
        options.extendTemplate = extendTemplate || {}
        createInstance(options)
      })
    } else {
      createInstance(options)
    }
  }
}
