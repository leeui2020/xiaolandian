(function(e){function t(t){for(var r,i,s=t[0],d=t[1],u=t[2],c=0,g=[];c<s.length;c++)i=s[c],a[i]&&g.push(a[i][0]),a[i]=0;for(r in d)Object.prototype.hasOwnProperty.call(d,r)&&(e[r]=d[r]);l&&l(t);while(g.length)g.shift()();return o.push.apply(o,u||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,i=1;i<n.length;i++){var d=n[i];0!==a[d]&&(r=!1)}r&&(o.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={index:0},o=[];function i(e){return s.p+"static/js/"+({"pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029":"pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029","pages-addaddress-addaddress~pages-editaddress-editaddress~pages-login-login~pages-order-order~pages-~2511625c":"pages-addaddress-addaddress~pages-editaddress-editaddress~pages-login-login~pages-order-order~pages-~2511625c","pages-addaddress-addaddress~pages-editaddress-editaddress~pages-order-order":"pages-addaddress-addaddress~pages-editaddress-editaddress~pages-order-order","pages-addaddress-addaddress~pages-editaddress-editaddress":"pages-addaddress-addaddress~pages-editaddress-editaddress","pages-addaddress-addaddress":"pages-addaddress-addaddress","pages-editaddress-editaddress":"pages-editaddress-editaddress","pages-order-order":"pages-order-order","pages-login-login":"pages-login-login","pages-regist-regist":"pages-regist-regist","pages-index-index":"pages-index-index","pages-order-list-order-list":"pages-order-list-order-list","pages-payment-payment":"pages-payment-payment","pages-wuliu-wuliu":"pages-wuliu-wuliu"}[e]||e)+"."+{"pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029":"dab430c3","pages-addaddress-addaddress~pages-editaddress-editaddress~pages-login-login~pages-order-order~pages-~2511625c":"150e2fe6","pages-addaddress-addaddress~pages-editaddress-editaddress~pages-order-order":"90e54f7c","pages-addaddress-addaddress~pages-editaddress-editaddress":"d9b184ec","pages-addaddress-addaddress":"2a675ca8","pages-editaddress-editaddress":"74f5e499","pages-order-order":"fcec1717","pages-login-login":"953825ef","pages-regist-regist":"757e72f8","pages-index-index":"7c2600d5","pages-order-list-order-list":"7069fbd5","pages-payment-payment":"f51b7553","pages-wuliu-wuliu":"8750ae53"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n=a[e];if(0!==n)if(n)t.push(n[2]);else{var r=new Promise((function(t,r){n=a[e]=[t,r]}));t.push(n[2]=r);var o,d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=i(e),o=function(t){d.onerror=d.onload=null,clearTimeout(u);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src,i=new Error("Loading chunk "+e+" failed.\n("+r+": "+o+")");i.type=r,i.request=o,n[1](i)}a[e]=void 0}};var u=setTimeout((function(){o({type:"timeout",target:d})}),12e4);d.onerror=d.onload=o,document.head.appendChild(d)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/h5/",s.oe=function(e){throw console.error(e),e};var d=window["webpackJsonp"]=window["webpackJsonp"]||[],u=d.push.bind(d);d.push=t,d=d.slice();for(var c=0;c<d.length;c++)t(d[c]);var l=u;o.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("e281")},"0911":function(e,t,n){"use strict";var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;r(n("0b16"));var a=r(n("c609")),o={post:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return new Promise((function(r,o){a.default.state.user&&(n.token=a.default.state.user.token),uni.request({url:e,method:"POST",data:Object.assign({},t),header:Object.assign({},n),success:function(e){e.data.token&&a.default.commit("setToken",e.data.token),403===e.data.errcode&&a.default.dispatch("logout"),r(e)},fail:o})}))}};t.default=o},"0c06":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={pages:{"pages/index/index":{navigationStyle:"custom",navigationBarTitleText:"小蓝店"},"pages/login/login":{navigationBarTitleText:"登录"},"pages/regist/regist":{navigationBarTitleText:"注册"},"pages/order/order":{navigationBarTitleText:"确认订单"},"pages/addaddress/addaddress":{navigationBarTitleText:"添加新地址"},"pages/editaddress/editaddress":{navigationBarTitleText:"编辑地址"},"pages/order-list/order-list":{navigationStyle:"custom",navigationBarTitleText:"订单中心",enablePullDownRefresh:!0},"pages/payment/payment":{navigationBarTitleText:"收银台"},"pages/wuliu/wuliu":{navigationBarTitleText:"物流跟踪"}},globalStyle:{navigationBarTextStyle:"white",navigationBarTitleText:"抢免单",navigationBarBackgroundColor:"#007aff",backgroundColor:"#F8F8F8"}};t.default=r},"366e":function(e,t,n){"use strict";var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.checkUser=d,t.checkEmail=u,t.checkPhone=c,t.gotoPayment=l,n("96cf");var a=r(n("3b8d")),o=r(n("b383")),i=r(n("c609")),s=r(n("0911"));function d(e){if(i.default.state.user)e(i.default.state.user);else{var t=getCurrentPages(),n=t[t.length-1],r=encodeURI([n.route,o.default.stringify(n.$route.query)].join("?"));uni.redirectTo({url:"/pages/login/login?from=".concat(r)})}}function u(e){return/^[a-zA-Z0-9_-]+@qq(\.[a-zA-Z0-9_-]+)+$/.test(e)}function c(e){return/^1[3456789]\d{9}$/.test(e)}function l(e){return g.apply(this,arguments)}function g(){return g=(0,a.default)(regeneratorRuntime.mark((function e(t){var n,r,a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"加载中"}),e.next=3,s.default.post("/paycode/canUse");case 3:if(n=e.sent,r=n.data,uni.hideLoading(),"ok"===r.status){e.next=9;break}return uni.showToast({icon:"none",title:r.errmsg}),e.abrupt("return");case 9:a=function(e){uni.navigateTo({url:"/pages/payment/payment?action=".concat(e._id,"&order=").concat(t)})},1===r.data.length?a(r.data[0]):uni.showActionSheet({itemList:r.data.map((function(e){return e.title})),success:function(e){var t=e.tapIndex;a(r.data[t])}});case 11:case"end":return e.stop()}}),e)}))),g.apply(this,arguments)}},"5c30":function(e,t,n){"use strict";n("28a5"),n("6b54"),n("ac6a"),n("fd24"),n("ac4d"),n("8a81"),function(t,n){try{window.ClipboardJS=n()}catch(n){}e.exports=n()}(0,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=d(n(1)),i=d(n(3)),s=d(n(4));function d(e){return e&&e.__esModule?e:{default:e}}var u=function(e){function t(e,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t);var r=function(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,(t.__proto__||Object.getPrototypeOf(t)).call(this));return r.resolveOptions(n),r.listenClick(e),r}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(t,i.default),a(t,[{key:"resolveOptions",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===r(e.container)?e.container:document.body}},{key:"listenClick",value:function(e){var t=this;this.listener=(0,s.default)(e,"click",(function(e){return t.onClick(e)}))}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget;this.clipboardAction&&(this.clipboardAction=null),this.clipboardAction=new o.default({action:this.action(t),target:this.target(t),text:this.text(t),container:this.container,trigger:t,emitter:this})}},{key:"defaultAction",value:function(e){return c("action",e)||"copy"}},{key:"defaultTarget",value:function(e){var t=c("target",e);if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return c("text",e)||this.text}},{key:"destroy",value:function(){this.listener.destroy(),this.clipboardAction&&(this.clipboardAction.destroy(),this.clipboardAction=null)}}],[{key:"isSupported",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"==typeof e?[e]:e,n=!!document.queryCommandSupported;return t.forEach((function(e){n=n&&!!document.queryCommandSupported(e)})),n}}]),t}();function c(e,t){var n="data-clipboard-"+e,r=t&&"function"===typeof t.hasAttribute;if(r&&t.hasAttribute(n))return t.getAttribute(n)}e.exports=u},function(e,t,n){var r,a="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=n(2),s=(r=i)&&r.__esModule?r:{default:r},d=function(){function t(e){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),this.resolveOptions(e),this.initSelection()}return o(t,[{key:"resolveOptions",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};this.action=e.action,this.container=e.container,this.emitter=e.emitter,this.target=e.target,this.text=e.text,this.trigger=e.trigger,this.selectedText=""}},{key:"initSelection",value:function(){this.text?this.selectFake():this.target&&this.selectTarget()}},{key:"selectFake",value:function(){var e=this,t="rtl"==document.documentElement.getAttribute("dir");this.removeFake(),this.fakeHandlerCallback=function(){return e.removeFake()},this.fakeHandler=this.container.addEventListener("click",this.fakeHandlerCallback)||!0,this.fakeElem=document.createElement("textarea"),this.fakeElem.style.fontSize="12pt",this.fakeElem.style.border="0",this.fakeElem.style.padding="0",this.fakeElem.style.margin="0",this.fakeElem.style.position="absolute",this.fakeElem.style[t?"right":"left"]="-9999px";var n=window.pageYOffset||document.documentElement.scrollTop;this.fakeElem.style.top=n+"px",this.fakeElem.setAttribute("readonly",""),this.fakeElem.value=this.text,this.container.appendChild(this.fakeElem),this.selectedText=(0,s.default)(this.fakeElem),this.copyText()}},{key:"removeFake",value:function(){this.fakeHandler&&(this.container.removeEventListener("click",this.fakeHandlerCallback),this.fakeHandler=null,this.fakeHandlerCallback=null),this.fakeElem&&(this.container.removeChild(this.fakeElem),this.fakeElem=null)}},{key:"selectTarget",value:function(){this.selectedText=(0,s.default)(this.target),this.copyText()}},{key:"copyText",value:function(){var t=void 0;try{t=document.execCommand(this.action)}catch(e){t=!1}this.handleResult(t)}},{key:"handleResult",value:function(e){this.emitter.emit(e?"success":"error",{action:this.action,text:this.selectedText,trigger:this.trigger,clearSelection:this.clearSelection.bind(this)})}},{key:"clearSelection",value:function(){this.trigger&&this.trigger.focus(),window.getSelection().removeAllRanges()}},{key:"destroy",value:function(){this.removeFake()}},{key:"action",set:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:"copy";if(this._action=e,"copy"!==this._action&&"cut"!==this._action)throw new Error('Invalid "action" value, use either "copy" or "cut"')},get:function(){return this._action}},{key:"target",set:function(e){if(void 0!==e){if(!e||"object"!==(void 0===e?"undefined":a(e))||1!==e.nodeType)throw new Error('Invalid "target" value, use a valid Element');if("copy"===this.action&&e.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');if("cut"===this.action&&(e.hasAttribute("readonly")||e.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');this._target=e}},get:function(){return this._target}}]),t}();e.exports=d},function(e,t){e.exports=function(e){var t;if("SELECT"===e.nodeName)e.focus(),t=e.value;else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var n=e.hasAttribute("readonly");n||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),n||e.removeAttribute("readonly"),t=e.value}else{e.hasAttribute("contenteditable")&&e.focus();var r=window.getSelection(),a=document.createRange();a.selectNodeContents(e),r.removeAllRanges(),r.addRange(a),t=r.toString()}return t}},function(e,t){function n(){}n.prototype={on:function(e,t,n){var r=this.e||(this.e={});return(r[e]||(r[e]=[])).push({fn:t,ctx:n}),this},once:function(e,t,n){var r=this;function a(){r.off(e,a),t.apply(n,arguments)}return a._=t,this.on(e,a,n)},emit:function(e){for(var t=[].slice.call(arguments,1),n=((this.e||(this.e={}))[e]||[]).slice(),r=0,a=n.length;r<a;r++)n[r].fn.apply(n[r].ctx,t);return this},off:function(e,t){var n=this.e||(this.e={}),r=n[e],a=[];if(r&&t)for(var o=0,i=r.length;o<i;o++)r[o].fn!==t&&r[o].fn._!==t&&a.push(r[o]);return a.length?n[e]=a:delete n[e],this}},e.exports=n},function(e,t,n){var r=n(5),a=n(6);e.exports=function(e,t,n){if(!e&&!t&&!n)throw new Error("Missing required arguments");if(!r.string(t))throw new TypeError("Second argument must be a String");if(!r.fn(n))throw new TypeError("Third argument must be a Function");if(r.node(e))return g=t,p=n,(l=e).addEventListener(g,p),{destroy:function(){l.removeEventListener(g,p)}};if(r.nodeList(e))return d=e,u=t,c=n,Array.prototype.forEach.call(d,(function(e){e.addEventListener(u,c)})),{destroy:function(){Array.prototype.forEach.call(d,(function(e){e.removeEventListener(u,c)}))}};if(r.string(e))return o=e,i=t,s=n,a(document.body,o,i,s);throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList");var o,i,s,d,u,c,l,g,p}},function(e,t){t.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},t.nodeList=function(e){var n=Object.prototype.toString.call(e);return void 0!==e&&("[object NodeList]"===n||"[object HTMLCollection]"===n)&&"length"in e&&(0===e.length||t.node(e[0]))},t.string=function(e){return"string"==typeof e||e instanceof String},t.fn=function(e){return"[object Function]"===Object.prototype.toString.call(e)}},function(e,t,n){var r=n(7);function a(e,t,n,a,o){var i=function(e,t,n,a){return function(n){n.delegateTarget=r(n.target,t),n.delegateTarget&&a.call(e,n)}}.apply(this,arguments);return e.addEventListener(n,i,o),{destroy:function(){e.removeEventListener(n,i,o)}}}e.exports=function(e,t,n,r,o){return"function"==typeof e.addEventListener?a.apply(null,arguments):"function"==typeof n?a.bind(null,document).apply(null,arguments):("string"==typeof e&&(e=document.querySelectorAll(e)),Array.prototype.map.call(e,(function(e){return a(e,t,n,r,o)})))}},function(e,t){if("undefined"!=typeof Element&&!Element.prototype.matches){var n=Element.prototype;n.matches=n.matchesSelector||n.mozMatchesSelector||n.msMatchesSelector||n.oMatchesSelector||n.webkitMatchesSelector}e.exports=function(e,t){for(;e&&9!==e.nodeType;){if("function"==typeof e.matches&&e.matches(t))return e;e=e.parentNode}}}])}));var r={isFunction:function(e){var t=Object.prototype.toString.call(e);return"[object Function]"==t},isObject:function(e){var t=Object.prototype.toString.call(e);return"[object Object]"==t},isString:function(e){var t=Object.prototype.toString.call(e);return"[object String]"==t}};function a(e){var t=document.createElement("a");t.setAttribute("href",e.blob),t.setAttribute("downLoad",e.name),t.click()}uni.setClipboardData=function(e){var t=function(){},n={data:null,event:null,success:t,fail:t,complete:t};e&&r.isObject(e)&&(n=Object.assign({},n,e)),e&&r.isString(e)&&(n=Object.assign({},n,{data:e}));var a=n.data,o=n.success||t,i=n.fail||t,s=n.complete||t,d=n.event||window.event||{},u=new ClipboardJS(".null",{text:function(){return a}});u.on("success",(function(e){window.__clipboard__=a,o&&r.isFunction(o)&&o({data:e.text}),s&&r.isFunction(s)&&s(),u.off("error"),u.off("success"),u.destroy()})),u.on("error",(function(e){i&&r.isFunction(i)&&i(e),s&&r.isFunction(s)&&s(),u.off("error"),u.off("success"),u.destroy()})),u.onClick(d)},uni.getClipboardData=function(e){var t=function(){},n={data:null,event:null,success:t,fail:t,complete:t};e&&r.isObject(e)&&(n=Object.assign({},n,e));var a=n.success||t,o=n.fail||t,i=n.complete||t;void 0!==window.__clipboard__?a&&r.isFunction(a)&&a({data:window.__clipboard__}):o&&r.isFunction(o)&&o({data:null}),i&&r.isFunction(i)&&i()},uni.saveImageToPhotosAlbum=uni.saveVideoToPhotosAlbum=function(e){var t=function(){},n={filePath:null,success:t,fail:t,complete:t};e&&r.isObject(e)&&(n=Object.assign({},n,e)),e&&r.isString(e)&&(n=Object.assign({},n,{filePath:e}));var o=n.filePath,i=n.success||t,s=n.fail||t,d=n.complete||t;if(!o)return s&&r.isFunction(s)&&s({msg:"no File"}),void(d&&r.isFunction(d)&&d());var u=o.split("/"),c=u[u.length-1];uni.downloadFile({url:o,success:function(e){var t=e.tempFilePath;a({name:c,blob:t}),i&&r.isFunction(i)&&i({filePath:o})},fail:function(e){s&&r.isFunction(s)&&s({msg:e})},complete:function(){d&&r.isFunction(d)&&d()}})}},"76b9":function(e,t,n){"use strict";var r,a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("App",{attrs:{keepAliveInclude:e.keepAliveInclude}})},o=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}))},"77dc":function(e,t,n){"use strict";n.r(t);var r=n("76b9"),a=n("7e19");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("f8f7");var i,s=n("f0c5"),d=Object(s["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);t["default"]=d.exports},"7e19":function(e,t,n){"use strict";n.r(t);var r=n("dbc7"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},8528:function(e,t,n){var r=n("ee1b");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=n("4f06").default;a("031a8d33",r,!0,{sourceMap:!1,shadowMode:!1})},c609:function(e,t,n){"use strict";var r=n("4ea4");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("7514"),n("96cf");var a=r(n("3b8d")),o=r(n("e143")),i=r(n("2f62")),s=r(n("0911")),d=n("366e");o.default.use(i.default);var u=new i.default.Store({state:{cart:[],user:uni.getStorageSync("user")||null,address:[]},getters:{cartCount:function(e){return e.cart.reduce((function(e,t){return e+t.count}),0)}},actions:{getAddress:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(t){var n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"正在加载"}),e.next=3,s.default.post("/address/list");case 3:n=e.sent,r=n.data,uni.hideLoading(),"ok"===r.status&&t.commit("updateAddress",r.data);case 7:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),logout:function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.commit("setUser",null),(0,d.checkUser)((function(){}));case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},mutations:{addToCart:function(e,t){var n=e.cart.find((function(e){return e._id===t._id}));n?n.count++:e.cart.push({_id:t._id,count:1,goods:t})},setUser:function(e,t){e.user=t,uni.setStorageSync("user",t)},setToken:function(e,t){e.user&&(e.user.token=t,uni.setStorageSync("user",e.user))},updateAddress:function(e,t){e.address=t}}}),c=u;t.default=c},d260:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={appid:"__UNI__A5E485E"};t.default=r},dbc7:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r={onLaunch:function(){console.log("App Launch")},onShow:function(){console.log("App Show")},onHide:function(){console.log("App Hide")}};t.default=r},e281:function(e,t,n){"use strict";var r=n("dbce"),a=n("4ea4");n("8e6e"),n("ac6a"),n("456d");var o=a(n("bd86"));n("cadf"),n("551c"),n("f751"),n("097d"),n("fbdd"),n("1c31"),n("921b");var i=a(n("e143")),s=a(n("77dc")),d=a(n("c609")),u=a(n("0911")),c=r(n("366e"));function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function g(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,o.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}n("5c30"),i.default.config.productionTip=!1,i.default.prototype.$http=u.default,i.default.prototype.$store=d.default,i.default.prototype.$utils=c,s.default.mpType="app";var p=new i.default(g({},s.default));p.$mount()},ee1b:function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,'@charset "UTF-8";\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 自定义变量 */\n/* 字体 */\n/*每个页面公共css */uni-page-body{font-size:%?32?%;background-color:#f2f2f2}.popup-content{padding:%?40?% %?30?%;background-color:#fff;border-radius:%?10?% %?10?% 0 0}.popup-content > .caption{font-weight:600;padding-bottom:%?20?%;margin-bottom:%?20?%;position:relative}.popup-content > .caption::after{content:"";left:0;bottom:0;width:%?100?%;height:%?8?%;position:absolute;background-color:#007aff;border-radius:%?8?%}.nomore{text-align:center;line-height:%?60?%;color:#999;font-size:%?24?%}body.?%PAGE?%{background-color:#f2f2f2}',""]),e.exports=t},f8f7:function(e,t,n){"use strict";var r=n("8528"),a=n.n(r);a.a},fbdd:function(e,t,n){"use strict";(function(e){var t=n("4ea4"),r=t(n("e143"));e["____A5E485E____"]=!0,delete e["____A5E485E____"],e.__uniConfig={globalStyle:{navigationBarTextStyle:"white",navigationBarTitleText:"抢免单",navigationBarBackgroundColor:"#007aff",backgroundColor:"#F8F8F8"}},e.__uniConfig.router={mode:"history",base:"/h5/"},e.__uniConfig["async"]={loading:"AsyncLoading",error:"AsyncError",delay:200,timeout:6e4},e.__uniConfig.debug=!1,e.__uniConfig.networkTimeout={request:6e4,connectSocket:6e4,uploadFile:6e4,downloadFile:6e4},e.__uniConfig.sdkConfigs={},e.__uniConfig.qqMapKey="XVXBZ-NDMC4-JOGUS-XGIEE-QVHDZ-AMFV2",e.__uniConfig.nvue={"flex-direction":"column"},r.default.component("pages-index-index",(function(e){var t={component:Promise.all([n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029"),n.e("pages-index-index")]).then(function(){return e(n("0867"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-login-login",(function(e){var t={component:Promise.all([n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-login-login~pages-order-order~pages-~2511625c"),n.e("pages-login-login")]).then(function(){return e(n("16a8"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-regist-regist",(function(e){var t={component:Promise.all([n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-login-login~pages-order-order~pages-~2511625c"),n.e("pages-regist-regist")]).then(function(){return e(n("d4d0"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-order-order",(function(e){var t={component:Promise.all([n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-login-login~pages-order-order~pages-~2511625c"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-order-order"),n.e("pages-order-order")]).then(function(){return e(n("7d29"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-addaddress-addaddress",(function(e){var t={component:Promise.all([n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-login-login~pages-order-order~pages-~2511625c"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-order-order"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress"),n.e("pages-addaddress-addaddress")]).then(function(){return e(n("86dc"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-editaddress-editaddress",(function(e){var t={component:Promise.all([n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-login-login~pages-order-order~pages-~2511625c"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-order-order"),n.e("pages-addaddress-addaddress~pages-editaddress-editaddress"),n.e("pages-editaddress-editaddress")]).then(function(){return e(n("0b35"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-order-list-order-list",(function(e){var t={component:Promise.all([n.e("pages-addaddress-addaddress~pages-editaddress-editaddress~pages-index-index~pages-login-login~pages-~75532029"),n.e("pages-order-list-order-list")]).then(function(){return e(n("1ea0"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-payment-payment",(function(e){var t={component:n.e("pages-payment-payment").then(function(){return e(n("2e0b"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),r.default.component("pages-wuliu-wuliu",(function(e){var t={component:n.e("pages-wuliu-wuliu").then(function(){return e(n("79b5"))}.bind(null,n)).catch(n.oe),delay:__uniConfig["async"].delay,timeout:__uniConfig["async"].timeout};return __uniConfig["async"]["loading"]&&(t.loading={name:"SystemAsyncLoading",render:function(e){return e(__uniConfig["async"]["loading"])}}),__uniConfig["async"]["error"]&&(t.error={name:"SystemAsyncError",render:function(e){return e(__uniConfig["async"]["error"])}}),t})),e.__uniRoutes=[{path:"/",alias:"/pages/index/index",component:{render:function(e){return e("Page",{props:Object.assign({isQuit:!0,isEntry:!0},__uniConfig.globalStyle,{navigationStyle:"custom",navigationBarTitleText:"小蓝店"})},[e("pages-index-index",{slot:"page"})])}},meta:{id:1,name:"pages-index-index",isNVue:!1,pagePath:"pages/index/index",isQuit:!0,isEntry:!0,windowTop:0}},{path:"/pages/login/login",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"登录"})},[e("pages-login-login",{slot:"page"})])}},meta:{name:"pages-login-login",isNVue:!1,pagePath:"pages/login/login",windowTop:44}},{path:"/pages/regist/regist",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"注册"})},[e("pages-regist-regist",{slot:"page"})])}},meta:{name:"pages-regist-regist",isNVue:!1,pagePath:"pages/regist/regist",windowTop:44}},{path:"/pages/order/order",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"确认订单"})},[e("pages-order-order",{slot:"page"})])}},meta:{name:"pages-order-order",isNVue:!1,pagePath:"pages/order/order",windowTop:44}},{path:"/pages/addaddress/addaddress",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"添加新地址"})},[e("pages-addaddress-addaddress",{slot:"page"})])}},meta:{name:"pages-addaddress-addaddress",isNVue:!1,pagePath:"pages/addaddress/addaddress",windowTop:44}},{path:"/pages/editaddress/editaddress",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"编辑地址"})},[e("pages-editaddress-editaddress",{slot:"page"})])}},meta:{name:"pages-editaddress-editaddress",isNVue:!1,pagePath:"pages/editaddress/editaddress",windowTop:44}},{path:"/pages/order-list/order-list",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationStyle:"custom",navigationBarTitleText:"订单中心",enablePullDownRefresh:!0})},[e("pages-order-list-order-list",{slot:"page"})])}},meta:{name:"pages-order-list-order-list",isNVue:!1,pagePath:"pages/order-list/order-list",windowTop:0}},{path:"/pages/payment/payment",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"收银台"})},[e("pages-payment-payment",{slot:"page"})])}},meta:{name:"pages-payment-payment",isNVue:!1,pagePath:"pages/payment/payment",windowTop:44}},{path:"/pages/wuliu/wuliu",component:{render:function(e){return e("Page",{props:Object.assign({},__uniConfig.globalStyle,{navigationBarTitleText:"物流跟踪"})},[e("pages-wuliu-wuliu",{slot:"page"})])}},meta:{name:"pages-wuliu-wuliu",isNVue:!1,pagePath:"pages/wuliu/wuliu",windowTop:44}},{path:"/preview-image",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-preview-image",{slot:"page"})])}},meta:{name:"preview-image",pagePath:"/preview-image"}},{path:"/choose-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-choose-location",{slot:"page"})])}},meta:{name:"choose-location",pagePath:"/choose-location"}},{path:"/open-location",component:{render:function(e){return e("Page",{props:{navigationStyle:"custom"}},[e("system-open-location",{slot:"page"})])}},meta:{name:"open-location",pagePath:"/open-location"}}]}).call(this,n("c8ba"))}});