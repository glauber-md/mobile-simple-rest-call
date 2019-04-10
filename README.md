# mobile-simple-rest-call
A simple API to speed up mobile Cordova development. The goal is to provide a stable and simple API to call HTTP REST endpoints and implement local caching according to HTTP server's response (as implemented by web browsers).
The library will take care of caching the server's response when required, avoiding unnecessary trafic and data plan costs apart from speeding up the App.

It uses the best supported database for Cordova, which runs on Android, iOS and Windows platforms (see [Cordova Storage](http://cordova.apache.org/docs/en/7.x/cordova/storage/storage.html#sqlite-plugin) documentation for further details).

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=cordova-simplerestcall&metric=alert_status)](https://sonarcloud.io/dashboard?id=cordova-simplerestcall)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=cordova-simplerestcall&metric=security_rating)](https://sonarcloud.io/dashboard?id=cordova-simplerestcall)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=cordova-simplerestcall&metric=reliability_rating)](https://sonarcloud.io/dashboard?id=cordova-simplerestcall)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=cordova-simplerestcall&metric=vulnerabilities)](https://sonarcloud.io/dashboard?id=cordova-simplerestcall)

## License

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) This work is Licensed under GPL v3. You can copy, modify and distribute this software even for commercial purposes; however you must include the reference to the original author and if you modify this software, you must re-distribute it using the same permissive License.

## Features

The advantage of this library is having the same behavior across the supoprted platforms and the use of SQLite database. I was motivated to develop this lib due to the inconsistent behavior when communicating with one of our customer's backend as the cache was triggered sometimes in one platform and not in another and the quirks when saving simple key/value data on local database.

### Simple REST operations
The library supports common HTTP operations for the purpose of mobile development. The most common errors (e.g. timeout, server error) are already handled; you just need to implement the callbacks where applicable.

HTTP operations:

- GET
- POST
- PUT
- DELETE

### Local key/value and cache database
Implemented using SQLite database, supported on iOS, Android and Windows platforms. 

For ```GET``` operations, the library will take care of caching the server response when needed, avoiding unnecessary network traffic and calls to backend processing routines and extra data usage. 

## First steps

### Start a new Cordova project
Install Cordova (https://cordova.apache.org/docs/en/latest/guide/cli/#installing-the-cordova-cli). It depends on NodeJS and NPM.

To start a new Cordova project, execute (see https://cordova.apache.org/#getstarted):

```
cordova create MyApp

cd MyApp

cordova platform add <platform name e.g. ios, android>
```

### Get this library and its dependencies

```
npm install mobile-simple-rest-call --save
```

Then copy ```node_modules/mobile-simple-rest-call/dist/cordova-simplerestcall.min.js``` and ```node_modules/jquery/dist/jquery.min.js```  to your newly created project under ```www/js``` directory.

## Using this library

You'll need to import the required libraries on your `index.html` file and initialize the database:

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com 'unsafe-eval'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:; script-src * data: https://ssl.gstatic.com 'unsafe-inline' 'unsafe-eval';">
        <meta name="format-detection" content="telephone=no">
        <meta name="msapplication-tap-highlight" content="no">
        <meta name="viewport" content="user-scalable=no, initial-scale=1, maximum-scale=1, minimum-scale=1, width=device-width">
        <script type="text/javascript" src="cordova.js"></script>
        <script type="text/javascript" src="js/jquery.min.js"></script> <!-- here... -->
        <script type="text/javascript" src="js/cordova-simplerestcall.min.js"></script> <!-- ...and here -->
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

> IMPORTANT NOTE: as this library is still being developed, the build is broken right now; I plan to fix the minified file in a couple of days.

To call a REST `GET` endpoint, you'll need just to call `wscall.get(...)`:

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
    'http://myserver.org/users',
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

The same applies to ```PUT``` and ```DELETE```operations: 

```javascript
wscall.put(
    'http://myserver.org/users/1234',
    // Data to be updated
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

```javascript
wscall.delete(
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

## Contributions

Contributions are welcome! If you find a bug, or want to suggest an improvement please send me an email at ```opensource (at) glauber.me```. You can also fill a bug report on Github and I'll work on it on my free time.

## Donation 

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FNS4EKFJHJNA4&lc=BR&item_name=Opensource%20Glauber%20ME&item_number=cordova%2dsimplewebcall%20library&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted) You can pay me a coffee (:coffee:) or a beer (:beers:) :) I'll be more than happy with your contribution as humble as it is.
