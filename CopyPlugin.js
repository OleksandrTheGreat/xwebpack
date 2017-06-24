const copy = require('xfs/copy.js');

function CopyPlugin(options) {
  this.options = options;
}

CopyPlugin.prototype.apply = function (compiler) {

  var options = this.options;

  compiler.plugin('done', function () {

    copy.sync(options.from, options.to);
  });
};

module.exports = CopyPlugin;
