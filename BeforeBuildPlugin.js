function BeforeBuildPlugin(run) {
    this.run = run;
}

BeforeBuildPlugin.prototype.apply = function(compiler) {

    var run = this.run;

    compiler.plugin('run', function() {
        run();
    });
};

module.exports = BeforeBuildPlugin;