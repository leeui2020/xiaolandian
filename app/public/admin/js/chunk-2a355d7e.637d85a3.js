(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2a355d7e"],{"57a3":function(e,t,n){"use strict";var i=n("e9d9"),a=n.n(i);a.a},bf0a:function(e,t,n){"use strict";var i=n("fae3"),a=n.n(i);a.a},e9d9:function(e,t,n){},fae3:function(e,t,n){},fb4d:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("el-container",{staticClass:"frame"},[n("el-aside",{attrs:{width:"220px"}},[n("section",{staticClass:"user"},[n("el-row",{attrs:{type:"flex",align:"middle"}},[n("div",{staticClass:"user-email"},[e._v(e._s(e.email))]),n("div",{staticClass:"user-logout fa fa-sign-out",on:{click:e.logoutHandler}})])],1),n("el-menu",{attrs:{"background-color":"#545c64","text-color":"#fff","active-text-color":"#409EFF","default-active":e.activeMenu,"unique-opened":"",router:""}},e._l(e.menu,(function(e,t){return n("lee-menu-item",{key:t,attrs:{item:e}})})),1)],1),n("el-main",[e.title?n("h1",{staticClass:"caption"},[e._v(e._s(e.title))]):e._e(),n("router-view")],1)],1)},a=[],s=n("5530"),c=n("2f62"),l=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.hasChild?n("el-submenu",{attrs:{index:e.item.id}},[n("template",{slot:"title"},[e.item.icon?n("span",{staticClass:"menuicon",class:e.item.icon}):e._e(),n("span",[e._v(e._s(e.item.name))])]),e._l(e.item.children,(function(e,t){return n("lee-menu-item",{key:t,attrs:{item:e}})}))],2):n("el-menu-item",{attrs:{index:e.item.id}},[e.item.icon?n("span",{staticClass:"menuicon",class:e.item.icon}):e._e(),n("span",{attrs:{slot:"title"},slot:"title"},[e._v(e._s(e.item.name))])])},u=[],o={name:"LeeMenuItem",props:{item:{type:Object,default:function(){}}},computed:{hasChild:function(){var e=this.item.children;return e&&e.length}}},r=o,m=(n("bf0a"),n("2877")),f=Object(m["a"])(r,l,u,!1,null,"26995f08",null),d=f.exports,p={name:"LeeFrame",components:{LeeMenuItem:d},computed:Object(s["a"])({title:function(){return this.$route.meta.title},activeMenu:function(){return this.$route.path}},Object(c["d"])(["menu"]),{},Object(c["d"])("user",["email"])),methods:Object(s["a"])({logoutHandler:function(){var e=this;this.$confirm("确定要退出登录吗？","退出登录",{type:"warning",callback:function(t){"confirm"===t&&e.logout()}})}},Object(c["b"])("user",["logout"]))},h=p,v=(n("57a3"),Object(m["a"])(h,i,a,!1,null,"7745687e",null));t["default"]=v.exports}}]);
//# sourceMappingURL=chunk-2a355d7e.637d85a3.js.map