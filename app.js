var path = require('path');
var loopback = require('loopback');
var loopbackJsonSchema = require('loopback-jsonschema');

var app = module.exports = loopback();

app.boot(__dirname);

loopbackJsonSchema.initLoopbackJsonSchema(app);

app.on('middleware:handlers', function() {
    // API explorer (if present)
    try {
        var explorer = require('loopback-explorer')(app);
        app.use('/explorer', explorer);
        app.once('started', function(baseUrl) {
            console.log('Browse your REST API at %s%s', baseUrl, explorer.route);
        });
    } catch(e) {
        console.log('Run `npm install loopback-explorer` to enable the LoopBack explorer');
    }
});

app.installMiddleware();

app.get('/', loopback.status());

app.start = function() {
    return app.listen(function() {
        var baseUrl = 'http://' + app.get('host') + ':' + app.get('port');
        app.emit('started', baseUrl);
        console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    });
};

app.start();
