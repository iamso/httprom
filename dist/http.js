/*!
 * httpromise - version 0.1.1
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2016 Steve Ottoz
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
  exports.default = http;
  function http(url) {
    var xhr = new XMLHttpRequest();
    var methods = {};

    function parse(obj) {
      try {
        return JSON.parse(obj);
      } catch (ex) {
        return obj;
      }
    }

    ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].forEach(function (method) {
      methods[method] = function () {
        var data = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
        var headers = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        return new Promise(function (resolve, reject) {
          xhr.open(method.toUpperCase(), url);
          if (!(data instanceof FormData)) {
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
              resolve(parse(xhr.response));
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
  module.exports = exports['default'];
});