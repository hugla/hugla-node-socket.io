'use strict';

const socketio = require('socket.io');

const HuglaLogger = require('hugla-logger');

/**
 * HuglaSocketIO - Hugla web framework's socket.io module
 */
class HuglaSocketIO {

  /**
   * Class constructor
   */
  constructor(app) {
    this.config = app.config.socketio || {};
    this.log = new HuglaLogger({ module: 'socket.io' });

    const http = app.getModule('hugla-http');
    http.addMiddlewareSetupAction(this.middlewareSetup.bind(this));
  }

  middlewareSetup(app, http) {
    const log = this.log;
    const io = this.io = socketio(http);

    io.on('connection', function(socket) {
      log.info('static route [%s : %s]', uri, dir);
    });
  }
}

module.exports = HuglaSocketIO;
