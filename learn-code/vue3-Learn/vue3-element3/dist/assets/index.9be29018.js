import{p as e,i as t,u as a,j as s,k as n,l,w as o,r as i,o as c,c as d,m as u,F as r,n as m,t as p,q as h,s as f,v as y,x as g,y as v,z as _,A as k,B as b}from"./vendor.5284dd5b.js";import{r as x,s as C,g as F}from"./index.8d8c1ec1.js";const I=f();e("data-v-5749cd87");const L={class:"breadCrum"},w={key:0,class:"no-redirect"};t();const E={expose:[],setup(e){const t=a(),f=s(),y=n(null);l([{name:"系统首页",redirectPath:"/home"},{name:"系统管理",redirectPath:"/sys-mannage/sysInfo"},{name:"系统信息",redirectPath:"/sys-mannage/sysInfo"}]);const g=()=>{let e=f.matched.filter((e=>e.meta&&e.meta.breadCrum_title));const t=e[0];t&&t.path&&"/"!==t.path&&"/home"!==t.path&&t.meta&&(e=[{path:"/home",meta:{title:"系统首页",breadCrum_title:[{name:"系统首页",redirectPath:"/home"}]}}].concat(e));let a=e.filter((e=>e.meta&&e.meta.breadCrum_title&&!1!==e.meta.breadcrumb)),s=[];a.forEach((e=>{s=[...s,...e.meta.breadCrum_title]})),y.value=l(s)};return g(),o(f,g),(e,a)=>{const s=i("el-breadcrumb-item"),n=i("el-breadcrumb");return c(),d("div",L,[u(n,{separator:"/"},{default:I((()=>[(c(!0),d(r,null,m(y.value,((e,a)=>(c(),d(s,{key:e.path},{default:I((()=>["noRedirect"===e.redirect||a==y.value.length-1?(c(),d("span",w,p(e.name),1)):(c(),d("a",{key:1,onClick:h((a=>(e=>{const{redirectPath:a}=e;t.push(a)})(e)),["prevent"])},p(e.name),9,["onClick"]))])),_:2},1024)))),128))])),_:1})])}},__scopeId:"data-v-5749cd87"};const M=f();e("data-v-40534c99");const P={style:{"font-size":"15px"}},S=u("i",{class:"el-icon-message-solid",size:"small"},null,-1),j=u("span",{class:"el-dropdown-link"},[u("i",{class:"el-icon-user-solid"})],-1),z=u("i",{class:"el-icon-setting"}," 个人设置",-1),A=u("i",{class:"el-icon-right"}," 退出登录",-1);t();const B={expose:[],setup(e){const t=y(),s=a(),n=()=>{x("token"),C("loginState",!1),t.dispatch("loginOutStateAction",{}),s.push({name:"login"})};return(e,t)=>{const a=i("el-badge"),l=i("el-dropdown-item"),o=i("el-dropdown-menu"),r=i("el-dropdown");return c(),d("div",null,[u("span",P,[u(a,{value:1,class:"item"},{default:M((()=>[S])),_:1})]),u(r,null,{default:M((()=>[j,u(o,{slot:"dropdown"},{default:M((()=>[u(l,{onClick:t[1]||(t[1]=()=>g(s).push("/setting"))},{default:M((()=>[z])),_:1}),u(l,{onClick:n},{default:M((()=>[A])),_:1})])),_:1})])),_:1})])}},__scopeId:"data-v-40534c99"};e("data-v-73493e6e");const q={class:"navBar"},O={key:0,class:"el-icon-s-fold"},N={key:1,class:"el-icon-s-unfold"};t();const R={expose:[],setup(e){const t=y();function a(){t.dispatch("changeFloadStateAction",!t.state.isFload)}return(e,s)=>(c(),d("div",q,[u("div",{class:"flodbtn",onClick:a},[g(t).state.isFload?v("",!0):(c(),d("i",O)),g(t).state.isFload?(c(),d("i",N)):v("",!0)]),u(E,{class:"breadCrum"}),u(B,{class:"login-out"})]))},__scopeId:"data-v-73493e6e"};const T=f();e("data-v-56790cce");const U={class:"side-logo"},V=u("img",{src:"/assets/logo.03d6d6da.png",alt:""},null,-1),D={key:0},G={key:0},H=u("i",{class:"el-icon-menu"},null,-1);t();const J={expose:[],setup(e){const t=y(),h=a(),f=s(),{state:k}=function(){const e=F("role"),t={sideMenus:l([])};return"1"===e&&(t.sideMenus=l([{path:"/home",key:"1",title:"系统首页",icon:"el-icon-location"},{path:"/sys-mannage",redirect:"/sys-mannage/sysLog",key:"2",title:"系统管理",icon:"el-icon-s-management",children:[{path:"/sys-mannage/sysLog",key:"2-1",title:"系统日志",icon:"el-icon-location"},{path:"/sys-mannage/sysInfo",key:"2-2",title:"系统信息",icon:"el-icon-location"}]},{path:"/user-mannage",redirect:"/user-mannage/userList",key:"3",title:"用户管理",icon:"el-icon-s-custom",children:[{path:"/user-mannage/userList",key:"3-1",title:"用户列表",icon:"el-icon-location"},{path:"/user-mannage/adminList",key:"3-2",title:"员工列表",icon:"el-icon-location"}]}])),"2"===e&&(t.sideMenus=l([{path:"/home",key:"1",title:"系统首页",icon:"el-icon-location"},{path:"/sys-mannage",redirect:"/sys-mannage/sysLog",key:"2",title:"系统管理",icon:"el-icon-s-management",children:[{path:"/sys-mannage/sysLog",key:"2-1",title:"系统日志",icon:"el-icon-location"},{path:"/sys-mannage/sysInfo",key:"2-2",title:"系统信息",icon:"el-icon-location"}]}])),{state:t}}(),b=n(null);function x(e,t){h.push(e),b.value=e}function C(e,t){h.push(e),b.value=e}function I(e,t){b.value=e}return o(f,((e,t)=>{b.value=e.path})),(e,a)=>{const s=i("el-menu-item"),n=i("el-menu-item-group"),l=i("el-submenu"),o=i("el-menu");return c(),d("div",{class:["sideBar",{unfloadSide:!g(t).state.isFload}]},[u("div",U,[V,g(t).state.isFload?v("",!0):(c(),d("span",D,"VUE3-ELEMENT3"))]),u(o,{"unique-opened":!0,router:!0,"default-active":b.value,class:"el-menu-vertical-demo",onOpen:x,onClose:C,onSelect:I,collapse:g(t).state.isFload,"background-color":"#545c64","text-color":"#fff","active-text-color":"#ffd04b"},{default:T((()=>[(c(!0),d(r,null,m(g(k).sideMenus,((e,a)=>(c(),d(r,null,[e.children?(c(),d(l,{key:a,index:e.redirect},{title:T((()=>[u("i",{class:e.icon},null,2),g(t).state.isFload?v("",!0):(c(),d("span",G,p(e.title),1))])),default:T((()=>[(c(!0),d(r,null,m(e.children,((e,t)=>(c(),d(n,{key:t},{default:T((()=>[u(s,{index:e.path},{default:T((()=>[_(p(e.title),1)])),_:2},1032,["index"])])),_:2},1024)))),128))])),_:2},1032,["index"])):(c(),d(s,{key:a,index:e.path},{title:T((()=>[_(p(e.title),1)])),default:T((()=>[H])),_:2},1032,["index"]))],64)))),256))])),_:1},8,["default-active","collapse"])],2)}},__scopeId:"data-v-56790cce"};const K=f(),Q={expose:[],setup(e){const t=y(),a=n(t.state.isFload);return k((()=>{a.value=t.state.isFload})),b((()=>{})),(e,t)=>{const a=i("el-aside"),s=i("el-header"),n=i("router-view"),l=i("el-main"),o=i("el-container");return c(),d(o,{class:"layout-box"},{default:K((()=>[u(a,{class:"unfload"},{default:K((()=>[u(J)])),_:1}),u(o,null,{default:K((()=>[u(s,null,{default:K((()=>[u(R)])),_:1}),u(l,null,{default:K((()=>[u(n)])),_:1})])),_:1})])),_:1})}},__scopeId:"data-v-7335478b"};export default Q;
