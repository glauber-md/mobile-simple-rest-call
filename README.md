# mobile-simple-rest-call
A simple API to speed up mobile Cordova development. The goal is to provide a stable and simple API to call HTTP REST endpoints and implement local caching according to HTTP server's response (as implemented by web browsers).
The library will take care of caching the server's response when required, avoiding unnecessary trafic and data plan costs apart from speeding up the App.

![Sonarcloud](https://sonarcloud.io/api/project_badges/measure?project=cordova-simplerestcall&metric=alert_status)

## Licence

[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0) This work is licenced by GPL v3. You can copy, modify and distribute this software even for commercial purposes; however you must include the reference to the original author and if you modify this software, you must re-distribute it using the same permissive licence.

## First steps

### Start a new Cordova project
Install Cordova (https://cordova.apache.org/docs/en/latest/guide/cli/#installing-the-cordova-cli). It depends on NodeJS and NPM.

To start a new Cordova project, execute (as per documentation at https://cordova.apache.org/#getstarted):

```
cordova create MyApp

cd MyApp

cordova platform add <platform name e.g. ios, android>
```

### Get this library
Download [build/cordova-simplerestcall.min.js](cordova-simplerestcall.min.js) and put it on your newly created project (e.g. move it to folder ```www/js``` inside your project root).

### Get the dependencies

This library currently depends on jQuery. You can get it from https://jquery.com/download/ . After downloading, copy jQuery's library file to ```www/js``` inside your project root.

It also depends on the following Cordova library:

```cordova-sqlite-storage```

You can install it by simply invoking:

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
        <script type="text/javascript" src="js/jquery.min.js"></script>
        <!-- mobile-simple-web-call library -->
        <script type="text/javascript" src="js/cordova-simplerestcall.min.js"></script>
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

## Contributions

Contributions are welcome! If you find a bug, or want to suggest an improvement please send me an email at ```opensource (at) glauber.me```. You can also fill a bug report on Github and I'll work on it on my free time.

## Donation 

[![Donate](https://img.shields.io/badge/Donate-PayPal-green.svg)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=FNS4EKFJHJNA4&lc=BR&item_name=Opensource%20Glauber%20ME&item_number=cordova%2dsimplewebcall%20library&currency_code=USD&bn=PP%2dDonationsBF%3abtn_donateCC_LG%2egif%3aNonHosted) You can pay me a coffee (:coffee:) or a beer (:beers:) :) I'll be more than happy with your contribution as humble as it is.
