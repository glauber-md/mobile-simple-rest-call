/* 
 * WS Calls
 * Author: Glauber M. Dantas (projetos@glauber.me)
 * Date  : 2016-09-21
 */

'use strict';

// Following the 'module' pattern
var wscall = (function (config) {

    // Private variables and functions
    var _config = null;
    if (common_utils.isNull(config)) {
        _config = {
            timeout: 60 * 1000,
            xsdomain: true,
            cacheable: true,
            contentType: 'application/json; charset=UTF-8',
            dataType: 'json'
        };
    } else {
        _config = config;
    }

    var ajax_options = {
        crossDomain: _config.xsdomain,	// Additional config on server applied
        timeout: _config.timeout,
        jsonp: false,
        dataType: _config.dataType,
        contentType: _config.contentType,
        async: true,
        cache: _config.cacheable,
        statusCode: {
            500: function(xhr, status, error) {
              common_utils.log('The operation could not be completed due to an error. Please try again later. ' + JSON.stringify(xhr));
            },
            504: function(xhr, status, error) {
              common_utils.log('The operation could not be completed due to an issue communicating with server. Please try again later. ' + JSON.stringify(xhr));
            }
        }
    };

    var _get = function (url, data, success, failure) {
        var strData = JSON.stringify(data);
        common_utils.log('[WS] GET -> URL: ' + url + '; Data: ' + strData);
        var resource = url + strData;
        // Checks if a given URL is cached before calling the WS
        if (_config.cacheable === true) {
            local_cache.exists(resource, function (found) {
                if (found) {
                    local_cache.get(resource, function (cached) {
                        $.ajax($.extend(ajax_options, {
                            type: 'GET',
                            url: url,
                            data: data,
                            beforeSend: function (xhr) {
                                xhr.setRequestHeader('If-Modified-Since', cached.lastModified);
                                xhr.setRequestHeader('If-None-Match', cached.etag);
                                return true;
                            },
                            complete: function(xhr, status) {
                                common_utils.log('GET result: (' + status + ') ' + xhr.responseText);
                                if (status === 'notmodified') {
                                    local_cache.exists(resource, function (found) {
                                        if (found) {
                                            local_cache.get(resource, function (cached) {
                                                success(cached.payload);
                                            });
                                        } else {
                                            success(xhr.responseText);
                                        }
                                    }, function (error) {
                                        failure(error);
                                    });
                                } else {
                                    var _etag = xhr.getResponseHeader('ETag');
                                    var _lastmod = xhr.getResponseHeader('Last-Modified');
                                    if (!common_utils.isNull(_etag) && !common_utils.isNull(_lastmod)) {    // TODO Change to 'OR' when upgrade to Apache 2.4 has been completed
                                        local_cache.set(
                                            resource, 
                                            xhr.responseText,
                                            _etag,
                                            _lastmod
                                        );
                                    }
                                    success(xhr.responseText);
                                }
                            }
                        }));
                    }, function (error) {
                        failure(error);
                    });
                } else {
                    $.ajax($.extend(ajax_options, {
                        type: 'GET',
                        url: url,
                        data: data,
                        beforeSend: function (xhr) {
                            return true;
                        },
                        complete: function(xhr, status) {
                            common_utils.log('GET result: (' + status + ') ' + xhr.responseText);
                            var _etag = xhr.getResponseHeader('ETag');
                            var _lastmod = xhr.getResponseHeader('Last-Modified');
                            if (!common_utils.isNull(_etag) && !common_utils.isNull(_lastmod)) {    // TODO Change to 'OR' when upgrade to Apache 2.4 has been completed
                                local_cache.set(
                                    resource, 
                                    xhr.responseText,
                                    _etag,
                                    _lastmod
                                );
                            }
                            success(xhr.responseText);
                        }
                    }));
                }
            }, function (error) {
                failure(error);
            });
        } else {
            $.ajax($.extend(ajax_options, {
                type: 'GET',
                url: url,
                data: data,
                beforeSend: function (xhr) {
                    return true;
                },
                complete: function(xhr, status) {
                    common_utils.log('GET result (not cached): (' + status + ') ' + xhr.responseText);
                    success(xhr.responseText);
                }
            }));
        }
    };

    var _post = function (url, data, success, failure) {
        var strData = JSON.stringify(data);
        common_utils.log('[WS] POST -> URL: ' + url + '; Data: ' + strData);
        $.ajax($.extend(ajax_options, {
            type: 'POST',
            url: url,
            data: data,
            beforeSend: function (xhr) {
                return true;
            },
            complete: function(xhr, status) {
                common_utils.log('POST result: (' + status + ') ' + xhr.responseText);
                success(xhr.responseText);
            }
        }));
    };
    
    var _put = function (url, data, success, failure) {
        var strData = JSON.stringify(data);
        common_utils.log('[WS] PUT -> URL: ' + url + '; Data: ' + strData);
        $.ajax($.extend(ajax_options, {
            type: 'PUT',
            url: url,
            data: data,
            beforeSend: function (xhr) {
                return true;
            },
            complete: function(xhr, status) {
                common_utils.log('PUT result: (' + status + ') ' + xhr.responseText);
                success(xhr.responseText);
            }
        }));
    };

    var _delete = function (url, data, success, failure) {
        var strData = JSON.stringify(data);
        common_utils.log('[WS] DELETE -> URL: ' + url + '; Data: ' + strData);
        var _url = url;
        if (!common_utils.isNull(data)) {
            _url = url + '?' + $.param(data);
        }
        $.ajax($.extend(ajax_options, {
            type: 'DELETE',
            url: _url,
            beforeSend: function (xhr) {
                return true;
            },
            complete: function(xhr, status) {
                common_utils.log('DELETE result: (' + status + ') ' + xhr.responseText);
                success(xhr.responseText);
            }
        }));
    };

    // Public API
    return {
        get: _get,
        post: _post,
        delete: _delete,
        put: _put
    };

})();
