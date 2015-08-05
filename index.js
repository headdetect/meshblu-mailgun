'use strict';
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('meshblu-mailgun');
var swag = require('./swagger.json');

var MESSAGE_SCHEMA = {
  type: 'object',
  properties: {
    to: {
      type: 'string',
      required: true
    },
    subject: {
      type: 'string',
      required: false
    },
    message: {
      type: 'string',
      required: true
    }
  }
};

var OPTIONS_SCHEMA = {
  type: 'object',
  properties: {
    privateKey: {
      type: 'string',
      required: true
    }
  }
};

function Plugin(){
  this.options = {};
  this.messageSchema = MESSAGE_SCHEMA;
  this.optionsSchema = OPTIONS_SCHEMA;
  return this;
}
util.inherits(Plugin, EventEmitter);

Plugin.prototype.onMessage = function(message){
  var payload = message.payload;

  // do stuff here

  this.emit('message', {devices: ['*'], topic: 'echo', payload: payload});
};

Plugin.prototype.onConfig = function(device){
  this.setOptions(device.options||{});
};

Plugin.prototype.setOptions = function(options){
  this.options = options;
};

module.exports = {
  messageSchema: MESSAGE_SCHEMA,
  optionsSchema: OPTIONS_SCHEMA,
  Plugin: Plugin
};
