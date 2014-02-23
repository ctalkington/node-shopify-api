/*global before,describe,it */
var assert = require('chai').assert;
var mkdir = require('mkdirp');
var nock = require('nock');

var shopify = require('../lib/shopify');

var instance;
var mockApi;

describe('shopify', function() {

  before(function() {
    mkdir.sync('tmp');

    mockApi = nock('https://test.myshopify.com');
    instance = shopify({
      host: 'test.myshopify.com',
      auth: 'key:passwd',
      timeout: 500
    });
  });

  describe('general', function() {
    it('should catch auth failures', function(done) {
      mockApi.get('/admin/themes.json').reply(401);

      instance.theme.list(function(err, data) {
        assert.propertyVal(err, 'type', 'ShopifyAuthenticationError');
        assert.isNull(data);
        done();
      });
    });

    it('should catch and parse api call limits', function(done) {
      mockApi.get('/admin/themes.json').reply(429, '', {
        'X-Shopify-Shop-Api-Call-Limit': '52/50'
      });

      instance.theme.list(function(err, data) {
        assert.propertyVal(err, 'type', 'ShopifyCallLimitError');
        assert.deepPropertyVal(err, 'detail.called', 52);
        assert.deepPropertyVal(err, 'detail.limit', 50);
        assert.isNull(data);
        done();
      });
    });

  });

  describe('theme', function() {

    it('should retrieve a list of themes', function(done) {
      mockApi.get('/admin/themes.json').reply(200, {
        "themes": [{
          "created_at": "2014-02-21T14:52:02-05:00",
          "id": 828155753,
          "name": "Comfort",
          "role": "main",
          "theme_store_id": null,
          "updated_at": "2014-02-21T14:52:02-05:00",
          "previewable": true
        }]
      });

      instance.theme.list(function(err, data) {
        assert.isArray(data.themes);
        done();
      });
    });

  });

});