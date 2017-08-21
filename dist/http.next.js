/*!
 * httprom - version 0.4.2
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2017 Steve Ottoz
 */
'use strict';

function http(url) {
  const methods = {};
  const xhr = methods.xhr = new XMLHttpRequest();

  ['get', 'post', 'put', 'patch', 'delete', 'head', 'options'].forEach(method => {
    methods[method] = (data = null, headers = {}) => {
      return new Promise((resolve, reject) => {
        if (method === 'get') {
          url = http.gettify(url, data);
        }
        xhr.open(method.toUpperCase(), url);
        if (method !== 'get' && !(data instanceof FormData)) {
          try {
            data = JSON.stringify(data);
            xhr.setRequestHeader('Content-type', 'application/json');
          }
          catch(e) {
            xhr.setRequestHeader('Content-type', 'text/plain');
          }
        }
        for (let key of Object.keys(headers)) {
          xhr.setRequestHeader(key, headers[key]);
        }
        xhr.onload = () => {
          if (xhr.status === 200) {
            resolve(http.parse(xhr.response));
          }
          else {
            reject(Error(xhr.statusText));
          }
        };
        xhr.onerror = () => {
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
  }
  catch(ex) {
    return obj;
  }
};

http.param = function param(obj, prefix) {
  if (!/^o/.test(typeof obj)) {
    return obj;
  }
  let str = [];
  for(let p in obj) {
    let k = prefix ? prefix + "[" + p + "]" : p,
    v = obj[p];
    if (obj.hasOwnProperty(p)) {
      str.push(typeof v === "object" ? param(v, k) : encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
};

http.gettify = function gettify(url, data) {
  return url += (url.match(/\?/ig) ? '&' : '?') + (this.param(data) || '');
};

export default http;
