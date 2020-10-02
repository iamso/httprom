/*!
 * httprom - version 0.6.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2020 Steve Ottoz
 */
"use strict";function e(t){const r={},o=r.xhr=new XMLHttpRequest;return["get","post","put","patch","delete","head","options"].forEach((n=>{r[n]=(r=null,s={})=>new Promise(((a,p)=>{if("get"===n&&(t=e.gettify(t,r)),o.open(n.toUpperCase(),t),"get"!==n&&!(r instanceof FormData))try{r=JSON.stringify(r),o.setRequestHeader("Content-type","application/json")}catch(e){o.setRequestHeader("Content-type","text/plain")}for(let e of Object.keys(s))o.setRequestHeader(e,s[e]);o.onload=()=>{200===o.status?a(e.parse(o.response)):p(Error(o.statusText))},o.onerror=()=>{p(Error("Network Error"))},o.send(r)}))})),r}e.parse=function(e){try{return JSON.parse(e)}catch(t){return e}},e.param=function e(t,r){if(!/^o/.test(typeof t))return t;let o=[];for(let n in t){let s=r?r+"["+n+"]":n,a=t[n];t.hasOwnProperty(n)&&o.push("object"==typeof a?e(a,s):encodeURIComponent(s)+"="+encodeURIComponent(a))}return o.join("&")},e.gettify=function(e,t){return e+(e.match(/\?/gi)?"&":"?")+(this.param(t)||"")},module.exports=e;
