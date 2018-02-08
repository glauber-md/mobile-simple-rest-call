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


// Local cache utility

'use strict';

// Following the 'module' pattern
var local_cache = (function () {

    // Private variables and functions
    var _table = 'BrowserCache';
    
    var set = function (url, data, etag, lastmod, success, failure) {
        exists(url, function (found) {
            if (found) {
                common_utils.log('[Cache] Updating URL ' + url);   
                dbmgr.update(_table, {
                    etag: etag,
                    payload: data,
                    lastModified: lastmod
                },
                'WHERE resource = \'' + url + '\''),
                success,
                failure;
            } else {
                common_utils.log('[Cache] Adding URL ' + url);
                dbmgr.insert(_table, {
                    etag: etag,
                    resource: url,
                    payload: data,
                    lastModified: lastmod
                },
                success,
                failure);
            }
        });
    };
    
    var get = function (url, success, failure) {
        common_utils.log('[Cache] Getting URL ' + url);
        dbmgr.select(_table, 
            'WHERE resource = \'' + url + '\'', 
            function (data) {
                success(data[0]);
            },
            failure
        );
    };
    
    var exists = function (url, success, failure) {
        dbmgr.count(_table, 
            'WHERE resource = \'' + url + '\'', 
            function (qty) {
                var _r = false;
                if (qty > 0) {
                    _r = true;
                }
                success(_r);
            },
            failure
        );
    };

    // Public API
    return {
        set: set,
        get: get,
        exists: exists
    };

})();