# mobile-simple-web-call
A simple API to speed up mobile Cordova development. The goal is to provide a stable and simple API to call HTTP REST endpoints and implement local caching according to HTTP server's response (as implemented by web browsers).

It currently depends on jquery (I'll plan a future version without that dependency).

It also depends on the following cordova libraries:

```cordova-sqlite-storage-dependencies```

To start a new project, execute (as per documentation at https://cordova.apache.org/#getstarted):

```
npm install -g cordova

cordova create MyApp

cd MyApp

cordova platform add <platform name e.g. ios, android>
```
