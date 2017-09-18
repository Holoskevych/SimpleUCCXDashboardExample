'use strict';

var _this = this;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var http = require("http");

var index = require('./routes/index');
var users = require('./routes/users');
var VoiceCSQDetailsStats = require('./routes/VoiceCSQDetailsStats');
var VoiceIAQStats = require('./routes/VoiceIAQStats');
var settings = require('./routes/Settings');

var config = require('./config.json');
var port = process.env.PORT || config.serverport;
var api = require('./api');

var app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server.listen(port, function () {
    console.log("Server started: http://" + require('os').hostname() + ":" + port + "/");
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express['static'](path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/VoiceCSQDetailsStats', VoiceCSQDetailsStats);
app.use('/VoiceIAQStats', VoiceIAQStats);
app.use('/Settings', settings);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render('error');
});
var interval = undefined;

io.on('connection', function (socket) {
    console.log('New client connected');
    //if (interval) {
    //console.log(interval);
    //clearInterval(interval);
    //}
    interval = setInterval(function () {
        return getApiAndEmit(socket);
    }, 1000);

    socket.on('disconnect', function () {
        console.log('Client disconnected');
    });
});
var getApiAndEmit = function getApiAndEmit(socket) {
    return regeneratorRuntime.async(function getApiAndEmit$(context$1$0) {
        while (1) switch (context$1$0.prev = context$1$0.next) {
            case 0:
                try {
                    api.apiGetVoiceCSQDetailsStats(function (data) {
                        socket.emit("FromAPI", data); // Emitting a new message. It will be consumed by the client
                    });
                    api.apiGetVoiceIAQStats(function (data) {
                        socket.emit("FromAPIGetVoiceIAQStats", data); // Emitting a new message. It will be consumed by the client
                    });
                } catch (error) {
                    console.error('Error: ' + error.code);
                }

            case 1:
            case 'end':
                return context$1$0.stop();
        }
    }, null, _this);
};
module.exports = app;
//# sourceMappingURL=app.js.map