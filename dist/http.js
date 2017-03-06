/*!
 * httprom - version 0.4.1
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2017 Steve Ottoz
 */
(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'exports'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, mod.exports);
    global.http = mod.exports;
  }
})(this, function (module, exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
  };

  function http(url) {
    var methods = {};
    var xhr = methods.xhr = new XMLHttpRequest();

    ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].forEach(function (method) {
      methods[method] = function () {
        var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
        var headers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return new Promise(function (resolve, reject) {
          if (method === 'get') {
            url = http.gettify(url, data);
          }
          xhr.open(method.toUpperCase(), url);
          if (method !== 'get' && !(data instanceof FormData)) {
            try {
              data = JSON.stringify(data);
              xhr.setRequestHeader('Content-type', 'application/json');
            } catch (e) {
              xhr.setRequestHeader('Content-type', 'text/plain');
            }
          }
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = Object.keys(headers)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var key = _step.value;

              xhr.setRequestHeader(key, headers[key]);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          xhr.onload = function () {
            if (xhr.status === 200) {
              resolve(http.parse(xhr.response));
            } else {
              reject(Error(xhr.statusText));
            }
          };
          xhr.onerror = function () {
            reject(Error("Network Error"));
          };
          xhr.send(data);
        });
      };
    });

    return methods;
  }

  http.parse = function parse(obj) {
    try {
      return JSON.parse(obj);
    } catch (ex) {
      return obj;
    }
  };

  http.param = function param(obj, prefix) {
    if (!/^o/.test(typeof obj === 'undefined' ? 'undefined' : _typeof(obj))) {
      return obj;
    }
    var str = [];
    for (var p in obj) {
      var k = prefix ? prefix + "[" + p + "]" : p,
          v = obj[p];
      if (obj.hasOwnProperty(p)) {
        str.push((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === "object" ? param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
      }
    }
    return str.join("&");
  };

  http.gettify = function gettify(url, data) {
    return url += (url.match(/\?/ig) ? '&' : '?') + (this.param(data) || '');
  };

  exports.default = http;
  module.exports = exports['default'];
});