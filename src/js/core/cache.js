/* 
 * Local cache utility
 * Author: Glauber M. Dantas (projetos@glauber.me)
 * Date  : 2016-09-21
 */

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