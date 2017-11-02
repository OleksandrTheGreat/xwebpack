const fs = require('fs');

function DTSBundlePlugin(options) {
    this.options = options;
}

function bundle(targetDirPath, dtsBundlePath) {

    var items = fs.readdirSync(targetDirPath);

    items.forEach((item) => {

        var
            itemPath = targetDirPath + '/' + item,
            stat = fs.statSync(itemPath);

        if (stat.isDirectory())
            bundle(itemPath, dtsBundlePath);

        if (item.indexOf('.d.ts') < 0 || item == 'index.d.ts')
            return;

        let content = fs.readFileSync(itemPath, 'utf8');
        content = content.replace(/import .*/, '');

        fs.appendFileSync(dtsBundlePath, content, 'utf8');
    });
};

DTSBundlePlugin.prototype.apply = function(compiler) {

    var options = this.options;

    compiler.plugin('done', function() {

        bundle(options.targetDirPath, options.dtsBundlePath);
    });
};

module.exports = DTSBundlePlugin;