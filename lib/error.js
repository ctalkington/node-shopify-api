/**
 * node-shopify-api
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-shopify-api/blob/master/LICENSE-MIT
 */
var util = require('./util');

module.exports = _Error = function(raw) {
  this.populate.apply(this, arguments);
};

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = util.extend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Stripe's REST API)
 */
var ShopifyError = _Error.ShopifyError = _Error.extend({
  type: 'ShopifyError',
  populate: function(raw) {
    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;

    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.message = raw.message;
    this.detail = raw.detail;
  }
});

ShopifyError.generate = function(err) {
  switch (err.type) {
    case 'invalid_request_error':
      return new _Error.ShopifyInvalidRequestError(err);
    case 'api_error':
      return new _Error.ShopifyAPIError(err);
  }

  return new _Error('Generic', 'Unknown Error');
};

_Error.ShopifyInvalidRequestError = ShopifyError.extend({ type: 'ShopifyInvalidRequest' });
_Error.ShopifyAPIError = ShopifyError.extend({ type: 'ShopifyAPIError' });
_Error.ShopifyAuthenticationError = ShopifyError.extend({ type: 'ShopifyAuthenticationError' });
_Error.ShopifyConnectionError = ShopifyError.extend({ type: 'ShopifyConnectionError' });