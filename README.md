# mobile-simple-web-call
A simple API to speed up mobile Cordova development. The goal is to provide a stable and simple API to call HTTP REST endpoints and implement local caching according to HTTP server's response (as implemented by web browsers).

## First steps

Install Cordova (https://cordova.apache.org/docs/en/latest/guide/cli/#installing-the-cordova-cli).

To start a new project, execute (as per documentation at https://cordova.apache.org/#getstarted):

```
cordova create MyApp

cd MyApp

cordova platform add <platform name e.g. ios, android>
```

## Dependencies

This library currently depends on jQuery. You can get it from https://jquery.com/download/ .

It also depends on the following cordova libraries:

```cordova-sqlite-storage-dependencies```

If you're using `npm` then you can just:

```
cordova plugin add cordova-sqlite-storage --save
```

## Using this library

You'll need to import the required libraries on your `index.html` file:

```
<!DOCTYPE html>
<html lang="en">
    <head>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="lib/jquery/jquery.min.js"></script>
        <!-- mobile-simple-web-call library -->
        <script type="text/javascript" src="js/mswc.js"></script>
        <script type="text/javascript">
            dbmgr.init();
        </script>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>
```
