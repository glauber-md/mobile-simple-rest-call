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
// 


// Local params utility

'use strict';

// Following the 'module' pattern
var params = (function () {

    // Private variables and functions
    var _table = 'Parameter';
    
    var set = function (key, value, success, failure) {
        exists(key, function (found) {
            if (found) {
                common_utils.log('[Params] Updating param ' + key);   
                dbmgr.update(_table, {
                    value: value,
                    date: new Date().toJSON()
                },
                'WHERE key = \'' + key + '\''),
                success,
                failure;
            } else {
                common_utils.log('[Params] Adding param ' + key);
                dbmgr.insert(_table, {
                    key: key,
                    value: value
                },
                success,
                failure);
            }
        });
    };
    
    var get = function (key, success, failure) {
        common_utils.log('[Params] Getting param ' + key);
        dbmgr.select(_table, 
            'WHERE key = \'' + key + '\' ORDER BY date DESC', 
            function (data) {
                success(data[0]);
            },
            failure
        );
    };
    
    var exists = function (key, success, failure) {
        dbmgr.count(_table, 'WHERE key = \'' + key + '\'', 
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