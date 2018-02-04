/* 
 * Utilities
 * Author: Glauber M. Dantas (projetos@glauber.me)
 * Date  : 2016-09-19
 */

'use strict';

// Following the 'module' pattern
var format_utils = (function () {

    // Private variables and functions
    
    var toDecimal = function (num, precision) {
        var _r = num;
        var defPrecision = 6;
        var _p = defPrecision;
        if (!common_utils.isNull(precision)) {
            _p = precision;
        }
        if (common_utils.isNumber(num)) {
            if (!Number.isInteger(num)) {
                _r = num.toPrecision(_p);
            }
        } else if (common_utils.isString(num)) {
            var separator = '.';
            var str = num;
            var dotPos = str.search(separator);
            if (dotPos > -1 ) {
                var _tmp = str.split(separator);
                var aLen = _tmp[0].length;
                var bLen = _tmp[1].length;
                if ((aLen + bLen) > defPrecision) {
                    var str2 = (_tmp[0]+_tmp[1]).substr(0, _p);
                    if (str2.length > aLen) {
                    	_r = str2.substr(0, aLen) + separator + str2.substr(aLen, (str2.length - aLen));
                    } else {
                    	_r = _tmp[0];
                    }
                }
            }
        }
        return _r;
    };

    // Public API
    return {
        toDecimal: toDecimal
    };

})();
