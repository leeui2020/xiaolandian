(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-login-login"],{"3abb":function(t,n,e){"use strict";var i=e("ee27");Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,e("96cf");var r=i(e("c964")),a={data:function(){return Object.assign({email:"",password:""},uni.getStorageSync("lastLogin"))},methods:{gotoRegistPage:function(){uni.navigateTo({url:"/pages/regist/regist"})},loginBtnHandler:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function n(){var e,i,r,a,o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e=t.email,i=t.password,r=function(t){return uni.showToast({title:t,icon:"none"})},e){n.next=4;break}return n.abrupt("return",r("请填写邮箱"));case 4:if(t.$utils.checkEmail(e)){n.next=6;break}return n.abrupt("return",r("请使用QQ邮箱"));case 6:if(i){n.next=8;break}return n.abrupt("return",r("请填写密码"));case 8:return uni.showLoading({title:"正在登录"}),n.next=11,t.$http.post("/user/login",{email:e,password:i});case 11:if(a=n.sent,o=a.data,uni.hideLoading(),"ok"===o.status){n.next=16;break}return n.abrupt("return",r(o.errmsg));case 16:uni.showToast({title:"登录成功"}),t.loginSuccess(o.data);case 18:case"end":return n.stop()}}),n)})))()},youkeLogin:function(){var t=this;return(0,r.default)(regeneratorRuntime.mark((function n(){var e,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return uni.showLoading({title:"正在登录"}),n.next=3,t.$http.post("/user/youkeLogin");case 3:if(e=n.sent,i=e.data,uni.hideLoading(),"ok"===i.status){n.next=9;break}return uni.showToast({icon:"none",title:i.errmsg}),n.abrupt("return");case 9:uni.showToast({title:"登录成功"}),t.loginSuccess(i.data);case 11:case"end":return n.stop()}}),n)})))()},loginSuccess:function(t){this.$store.commit("setUser",t);var n=this.$route.query.from?decodeURI(this.$route.query.from):"pages/index/index";uni.redirectTo({url:"/"+n}),uni.setStorageSync("lastLogin",{email:this.email,password:this.password})}}};n.default=a},"3b57":function(t,n,e){"use strict";e.r(n);var i=e("3abb"),r=e.n(i);for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);n["default"]=r.a},"6d10":function(t,n,e){"use strict";var i=e("abde"),r=e.n(i);r.a},"977e":function(t,n,e){var i=e("24fb");n=i(!1),n.push([t.i,'@charset "UTF-8";\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 自定义变量 */\n/* 字体 */.input-control[data-v-7ffb3634]{text-align:right}.options[data-v-7ffb3634]{padding:%?50?% %?30?%}.options > uni-button + uni-button[data-v-7ffb3634]{margin-top:%?30?%}',""]),t.exports=n},abde:function(t,n,e){var i=e("977e");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=e("4f06").default;r("46d744ce",i,!0,{sourceMap:!1,shadowMode:!1})},ae70:function(t,n,e){"use strict";e.r(n);var i=e("c4a7"),r=e("3b57");for(var a in r)"default"!==a&&function(t){e.d(n,t,(function(){return r[t]}))}(a);e("6d10");var o,s=e("f0c5"),u=Object(s["a"])(r["default"],i["b"],i["c"],!1,null,"7ffb3634",null,!1,i["a"],o);n["default"]=u.exports},c4a7:function(t,n,e){"use strict";var i={"uni-list":e("2b9e").default,"uni-list-item":e("4497").default},r=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-uni-view",[e("uni-list",[e("uni-list-item",{attrs:{title:"邮箱",showArrow:!1}},[e("v-uni-input",{staticClass:"input-control",attrs:{slot:"right",type:"text",placeholder:"请填写邮箱"},slot:"right",model:{value:t.email,callback:function(n){t.email=n},expression:"email"}})],1),e("uni-list-item",{attrs:{title:"密码",showArrow:!1}},[e("v-uni-input",{staticClass:"input-control",attrs:{slot:"right",type:"password",placeholder:"请填写密码"},slot:"right",model:{value:t.password,callback:function(n){t.password=n},expression:"password"}})],1)],1),e("v-uni-view",{staticClass:"options"},[e("v-uni-button",{attrs:{type:"primary"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.loginBtnHandler.apply(void 0,arguments)}}},[t._v("登录")]),e("v-uni-button",{attrs:{type:"default"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.youkeLogin.apply(void 0,arguments)}}},[t._v("游客登录")]),e("v-uni-button",{attrs:{type:"warn"},on:{click:function(n){arguments[0]=n=t.$handleEvent(n),t.gotoRegistPage.apply(void 0,arguments)}}},[t._v("注册")])],1)],1)},a=[];e.d(n,"b",(function(){return r})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return i}))}}]);