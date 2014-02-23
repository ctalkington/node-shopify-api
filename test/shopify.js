/*global before,describe,it */
var assert = require('chai').assert;
var mkdir = require('mkdirp');
var nock = require('nock');

var shopify = require('../lib/shopify');

var instance;
var mockApi;

var themeId = 828155753;

describe('shopify', function() {

  before(function() {
    mkdir.sync('tmp');

    mockApi = nock('https://test.myshopify.com');
    instance = shopify({
      host: 'test.myshopify.com',
      auth: 'key:passwd'
    });
  });

  describe('general', function() {
    it('should catch api errors', function(done) {
      mockApi.get('/admin/themes.json').reply(500);

      instance.theme.list(function(err, data) {
        assert.propertyVal(err, 'type', 'ShopifyAPIError');
        assert.isNull(data);
        done();
      });
    });

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
        'X-Shopify-Shop-Api-Call-Limit': '50/50'
      });

      instance.theme.list(function(err, data) {
        assert.propertyVal(err, 'type', 'ShopifyCallLimitError');
        assert.deepProperty(err, 'detail.called');
        assert.deepProperty(err, 'detail.limit');
        assert.isNull(data);
        done();
      });
    });

    it('should catch errors passed via JSON', function(done) {
      mockApi.put('/admin/themes/828155753/assets.json').reply(200, {
        "errors": [{
          "key": "is already taken",
        }]
      });

      var props = {
        key: 'assets/empty.gif',
        attachment: "R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
      };

      instance.asset.create(themeId, props, function(err, data) {
        assert.propertyVal(err, 'type', 'ShopifyInvalidRequest');
        assert.property(err, 'detail');
        assert.isArray(err.detail);
        assert.isNull(data);
        done();
      });
    });

  });

  describe('asset', function() {

    it('should retrieve a list of assets', function(done) {
      mockApi.get('/admin/themes/828155753/assets.json').reply(200, {
        "assets": [{
          "key": "assets/bg-body-green.gif",
          "public_url": "http://cdn.shopify.com/s/files/1/0006/9093/3842/t/1/assets/bg-body-green.gif?1",
          "created_at": "2010-07-12T15:31:50-04:00",
          "updated_at": "2010-07-12T15:31:50-04:00",
          "content_type": "image/gif",
          "size": 1542,
          "theme_id": 828155753
        }]
      });

      instance.asset.list(themeId, function(err, data) {
        assert.isArray(data.assets);
        assert.isObject(data.assets[0]);
        done();
      });
    });

    it('should retrieve a single asset', function(done) {
      mockApi.get('/admin/themes/828155753/assets.json?asset[key]=templates/index.liquid&theme_id=828155753').reply(200, {
        "asset": [{
          "key": "templates/index.liquid",
          "public_url": null,
          "value": "<!-- LIST 3 PER ROW -->\n<h2>Featured Products</h2>\n<table id=\"products\" cellspacing=\"0\" cellpadding=\"0\">\n\n</table>\n<!-- /LIST 3 PER ROW  -->\n\n  <div id=\"articles\">\n  \t\n\n    <div class=\"article\">\n    \n      <div class=\"article-body textile\">\n  \t  In <em>Admin &gt; Blogs &amp; Pages</em>, create a page with the handle <strong><code>frontpage</code></strong> and it will show up here.<br />\n  \t  \n      </div>\n  \t\n    </div>\n\n  </div>\n\n",
          "created_at": "2010-07-12T15:31:50-04:00",
          "updated_at": "2010-07-12T15:31:50-04:00",
          "content_type": "text/x-liquid",
          "size": 1068,
          "theme_id": 828155753
        }]
      });

      instance.asset.retrieve(themeId, 'templates/index.liquid', function(err, data) {
        assert.isArray(data.asset);
        assert.isObject(data.asset[0]);
        done();
      });
    });

    it('should create a new asset', function(done) {
      mockApi.put('/admin/themes/828155753/assets.json').reply(200, {
        "asset": [{
          "key": "assets/empty.gif",
          "public_url": "http://cdn.shopify.com/s/files/1/0006/9093/3842/t/1/assets/empty.gif?2",
          "created_at": "2014-02-21T14:48:38-05:00",
          "updated_at": "2014-02-21T14:48:38-05:00",
          "content_type": "image/gif",
          "size": 43,
          "theme_id": 828155753
        }]
      });

      var props = {
        key: 'assets/empty.gif',
        attachment: "R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==\n"
      };

      instance.asset.create(themeId, props, function(err, data) {
        assert.isArray(data.asset);
        assert.isObject(data.asset[0]);
        done();
      });
    });

    it('should update an existing asset', function(done) {
      mockApi.put('/admin/themes/828155753/assets.json').reply(200, {
        "asset": [{
          "key": "templates/index.liquid",
          "public_url": null,
          "created_at": "2010-07-12T15:31:50-04:00",
          "updated_at": "2014-02-21T14:48:38-05:00",
          "content_type": "text/x-liquid",
          "size": 110,
          "theme_id": 828155753
        }]
      });

      var props = {
        key: 'templates/index.liquid',
        value: "<img src='backsoon-postit.png'><p>We are busy updating the store for you and will be back within the hour.</p>"
      };

      instance.asset.update(themeId, props, function(err, data) {
        assert.isArray(data.asset);
        assert.isObject(data.asset[0]);
        done();
      });
    });

  });

  describe('theme', function() {

    it('should retrieve a list of themes', function(done) {
      mockApi.get('/admin/themes.json').reply(200, {
        "themes": [{
          "created_at": "2014-02-21T14:52:02-05:00",
          "id": themeId,
          "name": "Comfort",
          "role": "main",
          "theme_store_id": null,
          "updated_at": "2014-02-21T14:52:02-05:00",
          "previewable": true
        }]
      });

      instance.theme.list(function(err, data) {
        assert.isArray(data.themes);
        assert.isObject(data.themes[0]);
        done();
      });
    });

  });

});