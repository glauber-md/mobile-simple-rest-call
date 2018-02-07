# mobile-simple-web-call
A simple API to speed up mobile Cordova development. The goal is to provide a stable and simple API to call HTTP REST endpoints and implement local caching according to HTTP server's response (as implemented by web browsers).
The library will take care of caching the server's response when required, avoiding unnecessary trafic and data plan costs apart from speeding up the App.

## First steps

Install Cordova (https://cordova.apache.org/docs/en/latest/guide/cli/#installing-the-cordova-cli). It depends on NodeJS and NPM.

To start a new project, execute (as per documentation at https://cordova.apache.org/#getstarted):

```
cordova create MyApp

cd MyApp

cordova platform add <platform name e.g. ios, android>
```

## Dependencies

This library currently depends on jQuery. You can get it from https://jquery.com/download/ .

It also depends on the following cordova libraries:

```cordova-sqlite-storage```

Then you can install it by invoking:

```
cordova plugin add cordova-sqlite-storage --save
```

## Using this library

You'll need to import the required libraries on your `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="lib/jquery/jquery.min.js"></script>
        <!-- mobile-simple-web-call library -->
        <script type="text/javascript" src="lib/mobile-simple-web-call/core.js"></script>
        <script type="text/javascript">
            // Initializing the database for local caching and parameters
            dbmgr.init();
        </script>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>
```

The library supports the following HTTP operations (the most common for the purpose of mobile development):
- GET
- POST
- PUT
- DELETE

To call a REST `GET` endpoint, you'll need just to call `wscall.get(...)` and the library will take care of caching the server response when needed, avoiding unnecessary network traffic and extra data usage. The most common errors (e.g. timeout, server error) are already handled; you just need to implement the callbacks where applicable.

```javascript
wscall.get(
    'http://myserver.org/users/1234',
    // (Optional) query strings
    null,
    function(responseData) {
        // Do something when the response is successful
    },
    function(error) {
        // Do something when an error happens
    }
);
```

Similarly, to call a REST `POST` endpoint you'd invoke:
```javascript
wscall.post(
    'http://myserver.org/users/1234',
    // Data to be sent
    {
        "some_data": {
            "foo": "bar",
            "baz": 0.0,
            "nil": null
        }
    },
    function(responseData) {
        // Do something when the response is successful
    },
    function(error) {
        // Do something when an error happens
    }
);
```
