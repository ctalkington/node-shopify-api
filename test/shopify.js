/*global before,describe,it */
var assert = require('chai').assert;
var mkdir = require('mkdirp');

describe('shopify', function() {

  before(function() {
    mkdir.sync('tmp');
  });

  it.skip('should do something at some point', function() {

  });

});