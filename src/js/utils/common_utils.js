// Mobile Simple REST Call - A simpler way to call HTTP REST endpoints on Apache
// Cordova mobile applications.
// Copyright (C) 2018  Glauber M. Dantas (opensource@glauber.me)

// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


// Utilities

'use strict';

// Following the 'module' pattern
var common_utils = (function () {

    var isNull = function (obj) {
        var _r = false;
        if (typeof obj === 'undefined' || obj === null) {
            _r = true;
        }
        return _r;
    };
    
    var isString = function (obj) {
        var _r = false;
        if (!isNull(obj) && typeof obj === 'string') {
            _r = true;
        }
        return _r;
    };
    
    var isNumber = function (obj) {
        var _r = false;
        if (!isNull(obj) && typeof obj === 'number') {
            _r = true;
        }
        return _r;
    };
    
    var log = function (text) {
        if(isNull(text)) {
            return;
        }

        var maxLen = 256;
        if (text.length > maxLen) {
            text = text.substring(0, maxLen) + '/!/TEXT_WAS_TRUNCATED/!/';
        }

        var _msg = new Date().toJSON() + ' - ' + text;
        console.log(_msg);
    };
    
    var alert = function (title, msg) {
        if (navigator.notification) {
            navigator.notification.alert(
                msg,
                null,
                title,
                'OK'
            );
        } else {
            alert(msg);
        }
    };
    
    // Public API
    return {
        isNull: isNull,
        isString: isString,
        isNumber: isNumber,
        log: log,
        alert: alert
    };

})();