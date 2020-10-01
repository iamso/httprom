/*!
 * httprom - version 0.5.0
 *
 * Made with ❤ by Steve Ottoz so@dev.so
 *
 * Copyright (c) 2020 Steve Ottoz
 */
function e(t){const r={},n=r.xhr=new XMLHttpRequest;return["get","post","put","patch","delete","head","options"].forEach((o=>{r[o]=(r=null,s={})=>new Promise(((a,p)=>{if("get"===o&&(t=e.gettify(t,r)),n.open(o.toUpperCase(),t),"get"!==o&&!(r instanceof FormData))try{r=JSON.stringify(r),n.setRequestHeader("Content-type","application/json")}catch(e){n.setRequestHeader("Content-type","text/plain")}for(let e of Object.keys(s))n.setRequestHeader(e,s[e]);n.onload=()=>{200===n.status?a(e.parse(n.response)):p(Error(n.statusText))},n.onerror=()=>{p(Error("Network Error"))},n.send(r)}))})),r}e.parse=function(e){try{return JSON.parse(e)}catch(t){return e}},e.param=function e(t,r){if(!/^o/.test(typeof t))return t;let n=[];for(let o in t){let s=r?r+"["+o+"]":o,a=t[o];t.hasOwnProperty(o)&&n.push("object"==typeof a?e(a,s):encodeURIComponent(s)+"="+encodeURIComponent(a))}return n.join("&")},e.gettify=function(e,t){return e+(e.match(/\?/gi)?"&":"?")+(this.param(t)||"")};export default e;
