'use strict';

const EventEmitter = require('events').EventEmitter;

const socketio = require('socket.io');

const HuglaLogger = require('hugla-logger');

/**
 * HuglaSocketIO - Hugla web framework's socket.io module
 */
class HuglaSocketIO extends EventEmitter {

  /**
   * Class constructor
   * @param {object} app Hugla app
   */
  constructor(app) {
    super();

    this.config = app.config.socketio || {};
    this.log = new HuglaLogger({ module: 'socket.io' });

    const http = app.getModule('hugla-http');
    http.addMiddlewareSetupAction(this.middlewareSetup.bind(this));
  }

  middlewareSetup(app, http) {
    const $this = this;
    const log = this.log;
    const io = this.io = socketio(http);

    io.on('connection', function(socket) {
      log.info('new socket connection');

      $this.emit('connection', socket);

      socket.on('disconnect', function() {
        log.info('socket disconnected');

        $this.emit('disconnect', socket);
      });
    });
  }
}

module.exports = HuglaSocketIO;
