var StaticServer = require('static-server');
var gutil = require('gulp-util');

var server = new StaticServer({
    rootPath: './jasmine',
    port: 3010,
    templates: {
    index: 'SpecRunner.html',
    }
});

server.start(function () {
    gutil.log('[SS] Server started on port: ' + server.port);
});