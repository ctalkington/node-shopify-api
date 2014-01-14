/**
 * node-shopify-api
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-shopify-api/blob/master/LICENSE-MIT
 */
var util = module.exports = {};
util.extend = require('class-extend').extend;

util.isFunction = function(fn) {
  return typeof fn === 'function';
};

util.isObject = function(o) {
  return toString.call(o) === '[object Object]';
};

util.isString = function(str) {
  return typeof str === 'string';
};

// https://gist.github.com/padolsey/6008842
util.makeInterpolator = (function() {
  var rc = {
    '\n': '\\n', '\"': '\\\"',
    '\u2028': '\\u2028', '\u2029': '\\u2029'
  };
  return function makeInterpolator(str) {
    return new Function(
      'o',
      'return "' + (
        str
        .replace(/["\n\r\u2028\u2029]/g, function($0) {
          return rc[$0];
        })
        .replace(/\{([\s\S]+?)\}/g, '" + o["$1"] + "')
      ) + '";'
    );
  };
}());

util.stringifyRequestData = function(data) {
  if (typeof data === 'object' && Object.keys(data).length === 0) {
    data = '';
  } else {
    data = JSON.stringify(data);
  }

  return data;
};