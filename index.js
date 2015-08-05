'use strict';
var util = require('util');
var EventEmitter = require('events').EventEmitter;
var debug = require('debug')('meshblu-mailgun');
var client = require('swagger-client');
var swaggerJson = require('./swagger.json');


var MESSAGE_SCHEMA = {
  type: 'object',
  properties: {
    actions : {
      type : 'string',
      required : true,
      enum : ['getDomains', 'sendMessage']
    }
  }
};

var OPTIONS_SCHEMA = {
  type: 'object',
  properties: {
    privateKey: {
      type: 'string',
      required: true,
      "x-schema-form" : {
        type : "password"
      }
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
   var self = this;
   console.log('message received', message);
   var action = message.actions || message.payload.actions;
  if(action && self.swagger){
    if(action === 'getDomains'){
      console.log('calling out to getDomains', self.swagger);
      self.swagger.Domains.getDomains({}, function(response){
        console.log('response received', response);
        self.emit('message', {
          devices : ["*"],
          payload : response
        });
      });
    }else if(action === 'sendMessage'){
      self.swagger.Messages.sendMessage({body : message.payload.body}, function(response){
        self.emit('message', {
          devices : ["*"],
          payload : response
        });
      });
    }
  }
};

Plugin.prototype.onConfig = function(device){
  this.setOptions(device.options||{});
};

Plugin.prototype.setOptions = function(options){
  console.log('setOptions called', options);
  var self = this;
  self.options = options;
  if(options.privateKey){
    self.swagger = new client({
      spec: swaggerJson,
      success : function(){
        self.swagger.clientAuthorizations.add("apikey", new client.PasswordAuthorization("api", self.options.privateKey));
        
      }
    });
  } else {
    self.emit('error', new Error('Private key is required to connect to MailGun API'));
  }
};

module.exports = {
  messageSchema: MESSAGE_SCHEMA,
  optionsSchema: OPTIONS_SCHEMA,
  Plugin: Plugin
};
