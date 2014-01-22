/**
 * node-shopify-api
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-shopify-api/blob/master/LICENSE-MIT
 */
var Resource = require('../resource');

module.exports = Resource.extend({
  path: '/admin/themes/',

  create: Resource.method({
    method: 'PUT',
    path: '/{themeid}/assets.json',
    urlParams: ['themeid']
  }),

  destroy: Resource.method({
    method: 'DELETE',
    path: '/{themeid}/assets.json?asset[key]={key}',
    urlParams: ['themeid', 'key']
  }),

  list: Resource.method({
    method: 'GET',
    path: '/{themeid}/assets.json',
    urlParams: ['themeid']
  }),

  retrieve: Resource.method({
    method: 'GET',
    path: '/{themeid}/assets.json?asset[key]={key}&theme_id={themeid}',
    urlParams: ['themeid', 'key']
  }),

  update: Resource.method({
    method: 'PUT',
    path: '/{themeid}/assets.json',
    urlParams: ['themeid']
  }),
});