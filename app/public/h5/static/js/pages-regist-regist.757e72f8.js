(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-regist-regist"],{"0ca2":function(t,e,n){"use strict";var i={"uni-list":n("9cc5").default,"uni-list-item":n("e5ca").default},r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",[n("uni-list",[n("uni-list-item",{attrs:{title:"邮箱",showArrow:!1}},[n("v-uni-input",{staticClass:"input-control",attrs:{slot:"right",type:"text",placeholder:"请使用QQ邮箱"},slot:"right",model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})],1),n("uni-list-item",{attrs:{title:"密码",showArrow:!1}},[n("v-uni-input",{staticClass:"input-control",attrs:{slot:"right",type:"password",placeholder:"设置登录密码"},slot:"right",model:{value:t.password,callback:function(e){t.password=e},expression:"password"}})],1),n("uni-list-item",{attrs:{title:"确认密码",showArrow:!1}},[n("v-uni-input",{staticClass:"input-control",attrs:{slot:"right",type:"password",placeholder:"确认登录密码"},slot:"right",model:{value:t.repassword,callback:function(e){t.repassword=e},expression:"repassword"}})],1),n("uni-list-item",{attrs:{title:"验证码",showArrow:!1}},[n("v-uni-view",{staticClass:"flex",attrs:{slot:"right"},slot:"right"},[n("v-uni-input",{staticClass:"input-control",attrs:{type:"text",placeholder:"邮箱验证码"},model:{value:t.code,callback:function(e){t.code=e},expression:"code"}}),n("v-uni-button",{attrs:{size:"mini"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.codeButtonHandler.apply(void 0,arguments)}}},[t._v("发送验证码")])],1)],1)],1),n("v-uni-view",{staticClass:"options"},[n("v-uni-button",{attrs:{type:"primary"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.registBtnHandler.apply(void 0,arguments)}}},[t._v("注册")])],1)],1)},a=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return i}))},"0fb9":function(t,e,n){"use strict";var i=n("308dc"),r=n.n(i);r.a},"308dc":function(t,e,n){var i=n("b9ad");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var r=n("4f06").default;r("5f94c644",i,!0,{sourceMap:!1,shadowMode:!1})},"7a6c":function(t,e,n){"use strict";n.r(e);var i=n("e68f"),r=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(e,t,(function(){return i[t]}))}(a);e["default"]=r.a},b9ad:function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\n/* 行为相关颜色 */\n/* 文字基本颜色 */\n/* 背景颜色 */\n/* 边框颜色 */\n/* 尺寸变量 */\n/* 文字尺寸 */\n/* 图片尺寸 */\n/* Border Radius */\n/* 水平间距 */\n/* 垂直间距 */\n/* 透明度 */\n/* 文章场景相关 */\n/* 自定义变量 */\n/* 字体 */.input-control[data-v-d7bb7902]{text-align:right;display:inline-block}.flex[data-v-d7bb7902]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;width:%?400?%}.flex > .input-control[data-v-d7bb7902]{-webkit-box-flex:1;-webkit-flex:1;flex:1;width:0}.flex > uni-button[data-v-d7bb7902]{display:inline-block;margin-left:%?20?%}.options[data-v-d7bb7902]{padding:%?50?% %?30?%}',""]),t.exports=e},d4d0:function(t,e,n){"use strict";n.r(e);var i=n("0ca2"),r=n("7a6c");for(var a in r)"default"!==a&&function(t){n.d(e,t,(function(){return r[t]}))}(a);n("0fb9");var s,o=n("f0c5"),u=Object(o["a"])(r["default"],i["b"],i["c"],!1,null,"d7bb7902",null,!1,i["a"],s);e["default"]=u.exports},e68f:function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,n("96cf");var r=i(n("3b8d")),a={data:function(){return{email:"",password:"",repassword:"",code:""}},methods:{sendCode:function(){var t=(0,r.default)(regeneratorRuntime.mark((function t(e,n){var i,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return uni.showLoading({title:"正在发送"}),t.next=3,this.$http.post("/code/send",{type:e,email:n});case 3:if(i=t.sent,r=i.data,uni.hideLoading(),"ok"===r.status){t.next=9;break}return uni.showToast({icon:"none",title:r.errmsg}),t.abrupt("return");case 9:uni.showToast({title:"验证码已发送"});case 10:case"end":return t.stop()}}),t,this)})));function e(e,n){return t.apply(this,arguments)}return e}(),codeButtonHandler:function(){this.email?this.$utils.checkEmail(this.email)?this.sendCode("注册",this.email):uni.showToast({icon:"none",title:"请使用QQ邮箱"}):uni.showToast({icon:"none",title:"请输入邮箱"})},registBtnHandler:function(){var t=(0,r.default)(regeneratorRuntime.mark((function t(){var e,n,i,r,a,s,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e=this.email,n=this.password,i=this.repassword,r=this.code,a=function(t){return uni.showToast({title:t,icon:"none"})},e){t.next=4;break}return t.abrupt("return",a("请填写邮箱"));case 4:if(this.$utils.checkEmail(e)){t.next=6;break}return t.abrupt("return",a("请使用QQ邮箱"));case 6:if(n){t.next=8;break}return t.abrupt("return",a("请填写密码"));case 8:if(!(n.length<6)){t.next=10;break}return t.abrupt("return",a("密码不安全"));case 10:if(i===n){t.next=12;break}return t.abrupt("return",a("确认密码不匹配"));case 12:if(r&&6===r.length){t.next=14;break}return t.abrupt("return",a("验证码错误"));case 14:return uni.showLoading({title:"正在注册"}),t.next=17,this.$http.post("/user/regist",{email:e,password:n,code:r});case 17:if(s=t.sent,o=s.data,uni.hideLoading(),"ok"===o.status){t.next=22;break}return t.abrupt("return",a(o.errmsg));case 22:uni.showToast({title:"注册成功"}),uni.navigateBack({});case 24:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}()}};e.default=a}}]);