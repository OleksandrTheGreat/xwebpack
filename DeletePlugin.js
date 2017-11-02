const rmdir = require('xfs/rmdir.js');

function DeletePlugin(options) {
    this.options = options;
}

DeletePlugin.prototype.apply = function(compiler) {

    var options = this.options;

    compiler.plugin('done', function() {

        rmdir.sync(options);
    });
};

module.exports = DeletePlugin;