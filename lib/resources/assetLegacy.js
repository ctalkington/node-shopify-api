/**
 * node-shopify-api
 *
 * Copyright (c) 2014 Chris Talkington, contributors.
 * Licensed under the MIT license.
 * https://github.com/ctalkington/node-shopify-api/blob/master/LICENSE-MIT
 */
var Resource = require('../resource');

module.exports = Resource.extend({
  path: '/admin/',

  create: Resource.method({
    method: 'PUT',
    path: '/assets.json'
  }),

  destroy: Resource.method({
    method: 'DELETE',
    path: '/assets.json?asset[key]={key}',
    urlParams: ['key']
  }),

  list: Resource.method({
    method: 'GET',
    path: '/assets.json'
  }),

  retrieve: Resource.method({
    method: 'GET',
    path: '/assets.json?asset[key]={key}',
    urlParams: ['key']
  }),

  update: Resource.method({
    method: 'PUT',
    path: '/assets.json'
  }),
});