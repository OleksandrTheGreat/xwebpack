const fs = require('fs');

function DTSBundlePlugin(options) {
  this.options = options;
}

//TODO: cut "import {...} ..."
function bundle(targetDirPath, dtsBundlePath) {

  var items = fs.readdirSync(targetDirPath);

  items.forEach((item) => {

    var
      itemPath = targetDirPath + '/' + item,
      stat = fs.statSync(itemPath);

    if (stat.isDirectory())
      bundle(itemPath, distPath);

    if (item.indexOf('.d.ts') < 0 || item == 'index.d.ts')
      return;

    fs.appendFileSync(dtsBundlePath, fs.readFileSync(itemPath));
  });
};

DTSBundlePlugin.prototype.apply = function (compiler) {

  var options = this.options;

  compiler.plugin('done', function () {

    bundle(options.targetDirPath, options.dtsBundlePath);
  });
};

module.exports = DTSBundlePlugin;
