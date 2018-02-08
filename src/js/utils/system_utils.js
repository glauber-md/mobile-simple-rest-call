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


// System utilities

'use strict';

// Following the 'module' pattern
var system_utils = (function () {

    // Private variables and functions
    var nw_states = null;
    var _sysinfo = null;
    
    var _init = function () {
        if (navigator.connection) {
            try {
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
            } catch(e) {
                common_utils.log(e);
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