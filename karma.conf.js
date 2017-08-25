module.exports = function (config) {
  config.set({
    basePath      : '',
    socketioServer: {
      port     : 1811,
      onConnect: function (socket) {
        socket.on('message', function (msg) {
          // Echoing everything
          socket.send(msg)
        })
      },
      ready: function (io) {
        io.use((socket, next) => {
          const token = socket.handshake.query.token
          const appkey = '123456789'

          if (token !== appkey)
            return next(new Error('Not Authorized'))

          return next()
        })
      },
    },
    frameworks: ['mocha', 'chai', 'socketio-server'],
    files     : [
      'dist/*.js',
      'test/*.js',
    ],
    exclude                 : [],
    preprocessors           : {},
    reporters               : ['mocha'],
    port                    : 9876,
    colors                  : true,
    logLevel                : config.LOG_INFO,
    autoWatch               : true,
    browsers                : ['Chrome', 'Firefox'],
    singleRun               : false,
    concurrency             : Infinity,
    browserNoActivityTimeout: 30000,
  })
}
