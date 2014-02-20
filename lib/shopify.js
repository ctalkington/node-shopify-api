/**
 * node-shopify-api
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-shopify-api/blob/master/LICENSE-MIT
 */
var resources = {
  asset: require('./resources/asset'),
  assetLegacy: require('./resources/assetLegacy'),
  theme: require('./resources/theme')
};

function Shopify(options) {
  if (!(this instanceof Shopify)) {
    return new Shopify(options);
  }

  options = options || {};

  this._api = {
    auth: options.auth || null,
    host: options.host || Shopify.DEFAULT_HOST,
    port: options.port || Shopify.DEFAULT_PORT,
    timeout: options.timeout || Shopify.DEFAULT_TIMEOUT
  };

  this._initResources();
}

Shopify.DEFAULT_HOST = null;
Shopify.DEFAULT_PORT = 443;
Shopify.DEFAULT_TIMEOUT = 120000;

Shopify.prototype._initResources = function() {
  for (var name in resources) {
    this[name] = new resources[name](this);
  }
};

Shopify.prototype._setApiField = function(key, value) {
  this._api[key] = value;
};

Shopify.prototype.getApiField = function(key) {
  return this._api[key];
};

Shopify.prototype.setAuth = function(key, passwd) {
  if (key && passwd) {
    this._setApiField('auth', key + ':' + passwd);
  }
};

Shopify.prototype.setHost = function(host, port) {
  this._setApiField('host', host);
  if (port) {
    this.setPort(port);
  }
};

Shopify.prototype.setPort = function(port) {
  this._setApiField('port', port);
};

Shopify.prototype.setTimeout = function(timeout) {
  this._setApiField(
    'timeout',
    timeout === null ? Shopify.DEFAULT_TIMEOUT : timeout
  );
};

module.exports = Shopify;