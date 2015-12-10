# React Demo

[React Starter kit](https://github.com/wbkd/react-starterkit) is used for generating the repo.
This [Ui](http://material-ui.com/#/home) frame work is used.

## To Run

```
$ git clone https://github.com/sandyjoshi/react_simple.git && cd react_simple
```

## Installation

Install all dependencies.

```
$ npm install
```


## Development

Builds the application and starts a webserver with livereload. By default the webserver starts at port 1337.
You can define a port with `$ gulp --port 3333`.

```
$ npm start
```

## Build

Builds a minified version of the application in the dist folder.

```
$ gulp build --type production
```

## Testing

We use [Mocha](https://mochajs.org/) to test our application.<br />
You can run the tests that are defined under [test](./test) with

```
$ mocha --compilers js:babel-core/register

```

## Javascript

Javascript entry file: `app/scripts/main.js` <br />

