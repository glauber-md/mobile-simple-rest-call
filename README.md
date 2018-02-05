# mobile-simple-web-call
A simple API to speed up mobile Cordova development. The goal is to provide a stable and simple API to call HTTP REST endpoints and implement local caching according to HTTP server's response (as implemented by web browsers).

## First steps

To start a new project, execute (as per documentation at https://cordova.apache.org/#getstarted):

```
npm install -g cordova

cordova create MyApp

cd MyApp

cordova platform add <platform name e.g. ios, android>
```

## Dependencies

This library currently depends on jQuery (I'll plan a future version without that dependency). You can get it from https://jquery.com/download/ .

It also depends on the following cordova libraries:

```cordova-sqlite-storage-dependencies```

If you're using `npm` then you can just:

```
npm install jquery

cordova plugin add cordova-sqlite-storage --save
```
