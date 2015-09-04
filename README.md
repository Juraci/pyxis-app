# pyxis-app

Web interface for visualizing test results using a RESTful API on top of [subunit2sql](https://github.com/openstack-infra/subunit2sql).

## Requirements

* node.js

## Getting Started

1. Clone [pyxis-api-django](https://github.com/dhiana/pyxis-api-django)

  ```
  $ git clone git@github.com:dhiana/pyxis-api-django.git
  ```
2. Follow its README

3. Install dependencies

  ```
  $ npm install
  ```

4. Run server!

  ```
  $ npm start
  ```

## Testing

1. Install development dependencies

```
$ ./node_modules/webdriver-manager/bin/webdriver-manager update --standalone
```

2. Run tests!

```
# Unit tests
$ npm run karma
# Acceptance tests with Protractor
$ npm start # keep a tab opened for that
$ ./node_modules/webdriver-manager/bin/webdriver-manager start # keep a tab opened for that
$ npm run protractor
# Or simply... (runs both)
$ npm test
```

## Developing

To refresh scss to css generation during development:

```
$ npm watch-css # keep a tab opened for that
```

## Authors

[Dhiana Deva](https://github.com/dhiana)

[Juraci Vieira](https://github.com/Juraci)

[Rafael Portela](https://github.com/rafaelportela)
