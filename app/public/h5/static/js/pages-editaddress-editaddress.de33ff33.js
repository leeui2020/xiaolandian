(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-editaddress-editaddress"],{"29f1":function(e,t,n){"use strict";var r=n("767c"),a=n.n(r);a.a},"4c2d":function(e,t,n){"use strict";var r=n("ee27");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("96cf");var a=r(n("c964")),s={data:function(){return{address:null}},created:function(){var e=this;return(0,a.default)(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getAddressDetail(e.$route.query._id);case 2:case"end":return t.stop()}}),t)})))()},methods:{getAddressDetail:function(e){var t=this;return(0,a.default)(regeneratorRuntime.mark((function n(){var r,a;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e){n.next=2;break}return n.abrupt("return");case 2:return uni.showLoading({title:"正在加载"}),n.next=5,t.$http.post("/address/detail",{_id:e});case 5:r=n.sent,a=r.data,uni.hideLoading(),"ok"===a.status&&(t.address=a.data);case 9:case"end":return n.stop()}}),n)})))()},submitHandler:function(e){var t=this,n=e.detail;this.$utils.checkUser(function(){var e=(0,a.default)(regeneratorRuntime.mark((function e(r){var a,s;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return uni.showLoading({title:"正在保存"}),e.next=3,t.$http.post("/address/edit",{_id:t.$route.query._id,modify:n});case 3:if(a=e.sent,s=a.data,uni.hideLoading(),"ok"===s.status){e.next=9;break}return uni.showToast({icon:"none",title:s.errmsg}),e.abrupt("return");case 9:uni.showToast({title:"保存成功"}),uni.navigateBack(),t.$store.dispatch("getAddress");case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}())},removeAddress:function(){var e=this,t=function(){var t=(0,a.default)(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return uni.showLoading({title:"正在删除"}),t.next=3,e.$http.post("/address/remove",{_id:e.address._id});case 3:if(n=t.sent,r=n.data,uni.hideLoading(),"ok"===r.status){t.next=9;break}return uni.showToast({icon:"none",title:r.errmsg}),t.abrupt("return");case 9:uni.navigateBack(),e.$store.dispatch("getAddress");case 11:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}}();uni.showModal({title:"删除提示",content:"确定删除此地址吗？",success:function(e){var n=e.confirm;n&&t()}})}}};t.default=s},"767c":function(e,t,n){var r=n("cc46");"string"===typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);var a=n("4f06").default;a("9b61b0d8",r,!0,{sourceMap:!1,shadowMode:!1})},"7bd0":function(e,t,n){"use strict";n.r(t);var r=n("4c2d"),a=n.n(r);for(var s in r)"default"!==s&&function(e){n.d(t,e,(function(){return r[e]}))}(s);t["default"]=a.a},"7fed":function(e,t,n){"use strict";var r={"lee-address-form":n("df22").default},a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.address?n("v-uni-view",[n("lee-address-form",{attrs:{defaults:e.address},on:{submit:function(t){arguments[0]=t=e.$handleEvent(t),e.submitHandler.apply(void 0,arguments)}}},[n("v-uni-button",{staticClass:"btn",attrs:{type:"warn"},on:{click:function(t){arguments[0]=t=e.$handleEvent(t),e.removeAddress.apply(void 0,arguments)}}},[e._v("删除")])],1)],1):e._e()},s=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"a",(function(){return r}))},cc46:function(e,t,n){var r=n("24fb");t=r(!1),t.push([e.i,'@charset "UTF-8";\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 自定义变量 */\n/* 字体 */.btn[data-v-427639a2]{margin:%?30?%}',""]),e.exports=t},f9c6:function(e,t,n){"use strict";n.r(t);var r=n("7fed"),a=n("7bd0");for(var s in a)"default"!==s&&function(e){n.d(t,e,(function(){return a[e]}))}(s);n("29f1");var i,u=n("f0c5"),d=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,"427639a2",null,!1,r["a"],i);t["default"]=d.exports}}]);