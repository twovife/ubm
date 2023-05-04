import{r as c,a as e,j as r,F as g,d as x}from"./app-b1e3a402.js";import{t as b}from"./transition-a48afc42.js";import{M as w}from"./index.esm-36f8410e.js";import{G as p}from"./iconBase-0e10d113.js";import{e as N}from"./index.esm-3fa4ad04.js";const f=c.createContext(),u=({children:t})=>{const[a,n]=c.useState(!1),i=()=>{n(l=>!l)};return e(f.Provider,{value:{open:a,setOpen:n,toggleOpen:i},children:e("div",{className:"relative",children:t})})},k=({children:t})=>{const{open:a,setOpen:n,toggleOpen:i}=c.useContext(f);return r(g,{children:[e("div",{onClick:i,children:t}),a&&e("div",{className:"fixed inset-0 z-40",onClick:()=>n(!1)})]})},y=({align:t="right",width:a="48",contentClasses:n="py-1 bg-white",children:i})=>{const{open:l,setOpen:d}=c.useContext(f);let s="origin-top";t==="left"?s="origin-top-left left-0":t==="right"&&(s="origin-top-right right-0");let o="";return a==="48"&&(o="w-48"),e(g,{children:e(b,{as:c.Fragment,show:l,enter:"transition ease-out duration-200",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:e("div",{className:`absolute z-50 mt-2 rounded-md shadow-lg ${s} ${o}`,onClick:()=>d(!1),children:e("div",{className:"rounded-md ring-1 ring-black ring-opacity-5 "+n,children:i})})})})},C=({className:t="",children:a,...n})=>e(x,{...n,className:"block w-full px-4 py-2 text-left text-sm leading-5 text-main-700 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition duration-150 ease-in-out "+t,children:a});u.Trigger=k;u.Content=y;u.Link=C;const h=u;function z(t){return p({tag:"svg",attr:{fill:"currentColor",viewBox:"0 0 16 16"},child:[{tag:"path",attr:{d:"M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z"}}]})(t)}function D(t){return p({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{fill:"none",stroke:"#000",strokeWidth:"2",d:"M3,3 L21,21 M3,21 L21,3"}}]})(t)}function M(t){return p({tag:"svg",attr:{viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"m9 19 8-7-8-7z"}}]})(t)}function B({title:t,active:a=!1,lists:n,icon:i,colapse:l,dropdownId:d=0,...s}){return e("div",{className:"relative",children:r("div",{children:[r("button",{...s,type:"button",className:`w-full flex justify-between items-center text-lg flex-nowrap gap-2 text-main-800 hover:text-main-200 hover:bg-main-600 px-4 py-3 font-semibold ${a&&"text-main-200 bg-main-600"}`,children:[e("span",{"sidebar-toggle-item":"",children:t??"none"}),r("div",{className:"ml-auto flex gap-1",children:[e(M,{className:`ml-auto duration-200 ${l==d||a?"rotate-90":""}`}),i||e(N,{})]})]}),e("ul",{className:`${l==d||a?"block":"hidden"} space-y-2`,children:n?n.map(o=>e("li",{children:e(x,{href:o.href,className:`first:mt-2 flex items-center w-full py-2 pl-10 ${o.active?"text-main-900 font-bold hover:bg-main-500 hover:text-black ":"text-gray-800 font-thin hover:bg-main-500 hover:text-black "}`,children:o.name})},o.id)):e("li",{children:"none"})})]})})}function O({auth:t,header:a,children:n}){c.useState(!1);const[i,l]=c.useState(!1),[d,s]=c.useState(),o=m=>{m==d?s(0):s(m)},v=m=>{m.preventDefault(),l(!1)};return r("div",{className:"min-h-screen relative",children:[e("nav",{className:"bg-white border-b border-main-100 sticky top-0 z-50",children:e("div",{className:"mx-auto px-4 sm:px-6 lg:px-8 text-main-800",children:r("div",{className:"flex items-center justify-between h-16",children:[e(z,{className:"text-2xl hover:text-main-500 hover:scale-110 hover:cursor-pointer duration-300 ease-linear",onClick:()=>l(!0)}),r("div",{className:"font-semibold flex",children:[e("span",{className:"hidden lg:block",children:"Portal Data "}),"UBM"]}),e("div",{className:"flex items-center",children:e("div",{className:"relative",children:r(h,{children:[e(h.Trigger,{children:e("span",{className:"inline-flex rounded-md",children:r("button",{type:"button",className:"inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-main-500 bg-white hover:text-main-700 focus:outline-none transition ease-in-out duration-150",children:[e(w,{className:"text-2xl"}),e("span",{className:"hidden lg:block ml-2",children:t.user.username}),e("svg",{className:"ml-2 -mr-0.5 h-4 w-4",xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 20 20",fill:"currentColor",children:e("path",{fillRule:"evenodd",d:"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z",clipRule:"evenodd"})})]})})}),r(h.Content,{children:[e(h.Link,{href:route("profile.edit"),children:"Profile"}),e(h.Link,{href:route("logout"),method:"post",as:"button",children:"Log Out"})]})]})})})]})})}),e("aside",{className:`${i?"translate-x-0":"-translate-x-full"} fixed top-0 z-[51] bg-white/10 backdrop-blur-[.8px] w-full duration-150`,onClick:()=>l(!1),children:r("div",{className:"bg-main-400 w-72 h-screen duration-150",onClick:m=>m.stopPropagation(),children:[r("div",{className:"flex justify-between items-center p-4",children:[e("h1",{className:"text-3xl font-semibold",children:"UBM"}),e(D,{className:"text-main-800 text-2xl hover:rotate-180 hover:cursor-pointer duration-500 ease-in-out",onClick:v})]}),e("div",{className:"mt-3",children:e(B,{onClick:()=>o(1),title:"Data Karyawan",active:route().current("cabang-utama.*"),colapse:d,dropdownId:1,lists:[{id:1,href:route("employee.index"),name:"Data Karyawan",active:route().current("employee.*")}]})})]})}),a&&e("header",{className:"bg-white",children:e("div",{className:"mx-auto py-6 px-4 sm:px-6 lg:px-8 flex items-center",children:a})}),e("main",{children:n})]})}export{O as A};
