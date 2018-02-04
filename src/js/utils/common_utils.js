/* 
 * Utilities
 * Author: Glauber M. Dantas (projetos@glauber.me)
 * Date  : 2016-09-19
 */

'use strict';

// Following the 'module' pattern
var common_utils = (function () {

    // Private variables and functions
    var _config = app_config;

    var isNull = function (obj) {
        var _r = false;
        if (typeof obj === 'undefined' || obj === null || obj === undefined) {
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
        if(_config.log.enable) {
            if(typeof text != "undefined"){
                var maxLen = 256;
                if (text.length > maxLen) {
                    text = text.substring(0,maxLen) + '/!/TEXT_WAS_TRUNCATED/!/';
                }
                var _msg = new Date().toJSON() + ' - ' + text;
                console.log(_msg);
            }
        }
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