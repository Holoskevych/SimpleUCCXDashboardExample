const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const http = require("http");

const index = require('./routes/index');
const users = require('./routes/users');
const VoiceCSQDetailsStats = require('./routes/VoiceCSQDetailsStats');
const VoiceIAQStats = require('./routes/VoiceIAQStats');

const config = require('./config.json');
const port = process.env.PORT || config.serverport;
const api = require('./api');

const app = express(),
    server = http.createServer(app),
    io = require('socket.io').listen(server.listen(port,
        function(){
            console.log("Server started: http://"+ require('os').hostname()+ ":" + port + "/");
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
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/VoiceCSQDetailsStats', VoiceCSQDetailsStats);
app.use('/VoiceIAQStats', VoiceIAQStats);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
let interval;

io.on('connection', socket => {
    console.log('New client connected');
    //if (interval) {
        //console.log(interval);
        //clearInterval(interval);
    //}
        interval = setInterval(() => getApiAndEmit(socket), 1000);

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
const getApiAndEmit = async socket => {
    try {
        api.apiGetVoiceCSQDetailsStats(function (data)
        {
            socket.emit("FromAPI", data); // Emitting a new message. It will be consumed by the client
        });
        api.apiGetVoiceIAQStats(function (data)
        {
            socket.emit("FromAPIGetVoiceIAQStats", data); // Emitting a new message. It will be consumed by the client
        });
    } catch (error) {
        console.error(`Error: ${error.code}`);
    }
};
module.exports = app;
