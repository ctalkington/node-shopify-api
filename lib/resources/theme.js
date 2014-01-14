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
    method: 'POST',
    path: '/themes.json'
  }),

  destroy: Resource.method({
    method: 'DELETE',
    path: '/themes/{id}.json',
    urlParams: ['id']
  }),

  list: Resource.method({
    method: 'GET',
    path: '/themes.json'
  }),

  retrieve: Resource.method({
    method: 'GET',
    path: '/themes/{id}.json',
    urlParams: ['id']
  }),

  update: Resource.method({
    method: 'PUT',
    path: '/themes/{id}.json',
    urlParams: ['id']
  })
});