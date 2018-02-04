/* 
 * Local params utility
 * Author: Glauber M. Dantas (projetos@glauber.me)
 * Date  : 2016-09-27
 */

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