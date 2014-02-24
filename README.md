# shopify-api v0.2.2 [![Build Status](https://secure.travis-ci.org/ctalkington/node-shopify-api.png?branch=master)](http://travis-ci.org/ctalkington/node-shopify-api)

shopify-api is a node library for working with the [Shopify API](http://docs.shopify.com/api). It is designed to abstract away requests while returning unmodified responses. It should be used as a building block for other modules/packages which can handle any additional abstraction needed based on the API resource that they are working with.

### Install

```bash
npm install shopify-api --save
```

You can also use `npm install https://github.com/ctalkington/node-shopify-api/archive/master.tar.gz` to test upcoming versions.

### Usage

This module is meant to be wrapped internally by other modules and therefore lacks any frontend interface.

Every resource is accessed via your `shopify` instance:

```js
var shopify = require('shopify-api')(options);
// shopify.{ RESOURCE_NAME }.{ METHOD_NAME }
```

Every resource method accepts an optional callback as the last argument:

```js
shopify.asset.create(
  { key: '...', value: '...' },
  function(err, asset) {
    if (err) {
      throw err;
    }
    console.log(asset);
  }
);
```

Additionally, every resource method returns a promise, so you don't have to use the regular callback. E.g.

```js
shopify.asset.create({
  key: '...',
  value: '...'
}).then(function(customer) {
  // do something
}, function(err) {
  // Deal with an error
});
```
### Instance Options

#### auth

The auth for requests to use.

*This must be set either via option or setter method.*

#### host

The host for requests to use.

*This must be set either via option or setter method.*

#### port

The port for requests to use. Default: 443

#### timeout

The time in `ms` to wait for requests before timing out. Default: 120000ms (2 minutes)

### Instance Methods

#### setAuth(key, passwd)

Sets the internal `auth` property.

#### setHost(host[, port])

Sets the internal `host`/`port` properties.

#### setPort(port)

Sets the internal `port` property.

#### setTimeout(msec)

Sets the internal `timeout` property.

### Resources

The resources that are currently supported by this library. Please submit PR if your need others.

#### asset

##### create(themeid, props)

##### destroy(themeid, key)

##### list(themeid)

##### retrieve(themeid, key)

##### update(themeid, props)

#### assetLegacy

##### create(props)

##### destroy(key)

##### list()

##### retrieve(key)

##### update(props)

#### theme

##### create(props)

##### destroy(id)

##### list()

##### retrieve(id)

##### update(id, props)

## Things of Interest

- [Changelog](https://github.com/ctalkington/node-shopify-api/releases)
- [Contributing](https://github.com/ctalkington/node-shopify-api/blob/master/CONTRIBUTING.md)
- [MIT License](https://github.com/ctalkington/node-shopify-api/blob/master/LICENSE-MIT)

## Credits

Structured after the [stripe](https://npmjs.org/package/stripe) package.