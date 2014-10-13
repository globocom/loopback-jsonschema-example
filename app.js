var boot = require('loopback-boot');
var loopback = require('loopback');
var loopbackJsonSchema = require('loopback-jsonschema');

var app = module.exports = loopback();

app.set('port', process.env.PORT || 5000);
app.set('host', '0.0.0.0');

boot(app, __dirname);

loopbackJsonSchema.init(app);

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

loopbackJsonSchema.enableJsonSchemaMiddleware(app);

var restApiRoot = app.get('restApiRoot') || '/api';

app.get('/', loopback.status());
app.use(restApiRoot, loopback.rest());

app.start = function() {
    return app.listen(function() {
        var baseUrl = 'http://' + app.get('host') + ':' + app.get('port');
        app.emit('started', baseUrl);
        console.log('LoopBack server listening @ %s%s', baseUrl, '/');
    });
};

app.start();
