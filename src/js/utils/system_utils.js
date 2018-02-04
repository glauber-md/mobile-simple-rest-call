/* 
 * System utilities
 * Author: Glauber M. Dantas (projetos@glauber.me)
 * Date  : 2016-10-05
 */

'use strict';

// Following the 'module' pattern
var system_utils = (function () {

    // Private variables and functions
    var nw_states = null;
    var _sysinfo = null;
    
    var _init = function () {
        if (navigator.connection) {
            try{
                if (common_utils.isNull(nw_states)) {
                    nw_states = {};
                    nw_states[Connection.UNKNOWN]  = 'Unknown';
                    nw_states[Connection.ETHERNET] = 'Ethernet';
                    nw_states[Connection.WIFI]     = 'WiFi';
                    nw_states[Connection.CELL_2G]  = 'Cell 2G';
                    nw_states[Connection.CELL_3G]  = 'Cell 3G';
                    nw_states[Connection.CELL_4G]  = 'Cell 4G';
                    nw_states[Connection.CELL]     = 'Cell';
                    nw_states[Connection.NONE]     = 'Not connected'; 
                }
            }
            catch(e){
                //nothing...
                common_utils.log(e);
                console.log(e);
            }
        }
        if (device) {
            if (common_utils.isNull(_sysinfo)) {
                _sysinfo = {};
                _sysinfo['platform'] = device.platform + ' ' + device.version + '/' + device.model;
                _sysinfo['id'] = device.uuid;
                _sysinfo['imei'] = device.serial;
                _sysinfo['emulated'] = device.isVirtual;
            }
        }
    };
    
    var getPlatformName = function () {
        var _p = 'UNKNOWN';
        if(device) {
            _p = device.platform;
        }
        return String(_p).toLowerCase();
    };
    
    var getAppInfo = function () {
        var _info = {
            version: 'UNKNOWN',
            name: 'UNKNOWN',
            bundle: 'UNKNOWN'
        };
        if (cordova.getAppVersion) {
            cordova.getAppVersion.getVersionNumber(function (version) {
                _info.version = version;
            });
            cordova.getAppVersion.getAppName(function (name) {
                _info.name = name;
            });
            cordova.getAppVersion.getPackageName(function (bundle) {
                _info.bundle = bundle;
            });
        }
        return _info;
    };
    
    var getNetworkState = function () {
        _init();
        var _state = 'UNKNOWN';
        if (navigator.connection) {
            _state = nw_states[navigator.connection.type];
        }
        return _state;
    };
    
    var getInfo = function () {
        _init();
        var _app = getAppInfo();
        return _app.bundle + ' ' + _app.version + ' (' + _sysinfo.platform + ') ' + '[' + getNetworkState() + ']';
    };
    
    var getUniqueId = function () {
        _init();
        return _sysinfo.platform + '#' + _sysinfo.id;
    };
    
    // Public API
    return {
        getAppInfo: getAppInfo,
        getInfo: getInfo,
        getPlatformName: getPlatformName,
        getUniqueId: getUniqueId
    };

})();