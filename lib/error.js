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
 */
var ShopifyError = _Error.ShopifyError = _Error.extend({
  type: 'ShopifyError',
  populate: function(raw) {
    this.type = this.type;

    this.message = raw.message;
    this.detail = raw.detail;
    this.raw = raw;
  }
});

_Error.ShopifyInvalidRequestError = ShopifyError.extend({ type: 'ShopifyInvalidRequestError' });
_Error.ShopifyAPIError = ShopifyError.extend({ type: 'ShopifyAPIError' });
_Error.ShopifyAuthenticationError = ShopifyError.extend({ type: 'ShopifyAuthenticationError' });
_Error.ShopifyCallLimitError = ShopifyError.extend({ type: 'ShopifyCallLimitError' });
_Error.ShopifyConnectionError = ShopifyError.extend({ type: 'ShopifyConnectionError' });