/* 
 * DB Manager
 * Author: Glauber M. Dantas (projetos@glauber.me)
 * Date  : 2016-09-16
 */

'use strict';

// Following the 'module' pattern
var dbmgr = (function (config) {

    // Private variables and functions
    var _config = null;
    if (common_utils.isNull(config)) {
        var _config = {
            db_name: "app-web-core.db",
            db_engine: 'SQLITE',
            db_transIntervalMs: 200
        };
    } else {
        _config = config;
    }
    var _cmds = {
        SEL: 'SELECT',
        INS: 'INSERT',
        UPD: 'UPDATE',
        DEL: 'DELETE'
    };
    
    var _getDbConnection = function (success, failure) {
        if (window.sqlitePlugin) {
            window.sqlitePlugin.openDatabase({
                name: _config.db_name,
                iosDatabaseLocation: 'default'
            },
            function (db) {
                common_utils.log('[DB] Opening OK');
                success(db);
            },
            function (error) {
                common_utils.log('[DB] Opening ERROR: ' + error.message);
                failure(error);
            });
        }
    };
    
    var _releaseDbConnection = function (dbInstance) {
        dbInstance.close(function () {
            common_utils.log("[DB] Closed OK");
        }, function (error) {
            common_utils.log("[DB] Closing ERROR:" + error.message);
        });
    };
    
    /*
     * Basic statements
     */

    var _select = function (table, where, success, failure) {
        common_utils.log('[DB] Executing SELECT');
        setTimeout(function () {
            var _query = 'SELECT * FROM ' + table;
            //indexOf instead startWith, not supported in all browsers
            if (common_utils.isString(where) && where.toLowerCase().indexOf('where') == 0) {
                _query += ' ' + where;
            }
            _getDbConnection(
                function (_db) {
                    _db.executeSql(_query, [], function (rs) {
                        var _data = [];
                        for (var x = 0; x < rs.rows.length; x++) {
                            _data.push(rs.rows.item(x));
                        }
                        success(_data);
                    }, function (error) {
                        common_utils.log('[DB] SELECT statement ERROR: ' + error.message);
                        failure(error);
                    });
                }, 
                failure
            );
        }, _config.db_transIntervalMs * 2);
    };

    var _insert = function (table, newdata, success, failure) {
        common_utils.log('[DB] Executing INSERT');
        if (common_utils.isNull(newdata) || Object.keys(newdata).length <= 0) {
            throw 'You must provide data to INSERT';
        }
        setTimeout(function () {
            _getDbConnection(
                function (_db) {
                    var _ks = Object.keys(newdata);
                    var _query = 'INSERT INTO ' + table + ' (' + _ks.join() + ') ';
                    var _p = [];
                    var _vs = [];
                    _ks.forEach(function (item, idx) {
                        _p.push('?');
                        _vs.push(newdata[item]);
                    });
                    _query += 'VALUES (' + _p.join() + ')';
                    _db.executeSql(_query, _vs, function (rs) {
                        var _data = rs.rowsAffected;
                        common_utils.log("[DB] INSERT rowsAffected: " + _data);
                        success(_data);
                    }, function(error) {
                        common_utils.log('[DB] INSERT statement ERROR: ' + error.message);
                        failure(error);
                    });
                }, 
                failure
            );
        }, _config.db_transIntervalMs);
    };

    var _update = function (table, newdata, where, success, failure) {
        common_utils.log('[DB] Executing UPDATE');
        setTimeout(function () {
            var _query = 'UPDATE ' + table + ' SET ';
            var _qs = [];
            var _vs = [];
            var _ks = Object.keys(newdata);
            _ks.forEach(function (item, idx) {
                _qs.push(item + ' = ?');
                _vs.push(newdata[item]);
            });
            _query += ' ' + _qs.join();
            if (common_utils.isString(where) && where.toLowerCase().indexOf('where') == 0) {
                _query += ' ' + where;
            }
            _getDbConnection(
                function (_db) {
                    _db.executeSql(_query, _vs, function (rs) {
                        var _data = rs.rowsAffected;
                        common_utils.log("[DB] UPDATE rowsAffected: " + _data);
                        success(_data);
                    }, function(error) {
                        common_utils.log('[DB] UPDATE statement ERROR: ' + error.message);
                        failure(error);
                    });
                }, 
                failure
            );
        }, _config.db_transIntervalMs);
    };

    var _delete = function (table, where, success, failure) {
        common_utils.log('[DB] Executing DELETE');
        setTimeout(function () {
            var _query = 'DELETE FROM ' + table;
            if (common_utils.isString(where) && where.toLowerCase().indexOf('where') == 0) {
                _query += ' ' + where;
            } else {
                throw 'You must provide a WHERE clause';
            }
            _getDbConnection(
                function (_db) {
                    _db.executeSql(_query, [], function (rs) {
                        var _data = rs.rowsAffected;
                        common_utils.log("[DB] DELETE rowsAffected: " + _data);
                        success(_data);
                    }, function(error) {
                        common_utils.log('[DB] DELETE statement ERROR: ' + error.message);
                        failure(error);
                    });
                }, 
                failure
            );
        }, _config.db_transIntervalMs);
    };

    var _init = function () {
        common_utils.log('[DB] Executing initialization scripts');
        document.addEventListener('deviceready', function () {
            _getDbConnection(
                function (_db) {
                    _db.sqlBatch([
                        'PRAGMA auto_vacuum = FULL',
                        'CREATE TABLE IF NOT EXISTS Parameter( key VARCHAR2(50), value TEXT, date TIMESTAMP DEFAULT CURRENT_TIMESTAMP )',
                        'CREATE UNIQUE INDEX IF NOT EXISTS paramKeyIdx ON Parameter( key ASC )',
                        'CREATE TABLE IF NOT EXISTS BrowserCache( etag VARCHAR2(50), resource VARCHAR2(255), payload TEXT, lastModified VARCHAR2(50), date TIMESTAMP DEFAULT CURRENT_TIMESTAMP )',
                        'CREATE UNIQUE INDEX IF NOT EXISTS cacheUrlIdx ON BrowserCache( resource ASC )'
                    ], function () {
                        common_utils.log('[DB] Initialization OK');
                    }, function (error) {
                        common_utils.log('[DB] Initialization ERROR: ' + error.message);
                    });
                }
            );
        });
    };

    var _test = function () {
        common_utils.log('[DB] Executing test scripts');
        document.addEventListener('deviceready', function () {
            window.sqlitePlugin.echoTest(function () {
                common_utils.log('[DB] ECHO test OK');
            });
            window.sqlitePlugin.selfTest(function () {
                common_utils.log('[DB] SELF test OK');
            });
        });
    };
    
    var _count = function (table, where, success, failure) {
        common_utils.log('[DB] Executing COUNT');
        setTimeout(function () {
            var _query = 'SELECT COUNT(*) AS count FROM ' + table;
            if (common_utils.isString(where) && where.toLowerCase().indexOf('where') == 0) {
                _query += ' ' + where;
            }
            _getDbConnection(
                function (_db) {
                    _db.executeSql(_query, [], function (rs) {
                        var _data = rs.rows.item(0).count;
                        common_utils.log("[DB] count: " + _data);
                        success(_data);
                    }, function(error) {
                        common_utils.log('[DB] COUNT statement ERROR: ' + error.message);
                        failure(error);
                    });
                }, 
                failure
            );
        }, _config.db_transIntervalMs);
    };

    // Public API
    return {
        select: _select,
        insert: _insert,
        update: _update,
        delete: _delete,
        count: _count,
        init: _init,
        test: _test
    };

})();