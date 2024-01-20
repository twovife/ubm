import{r as o,W as T,j as a,a as t,g as h,F as b,d as v}from"./app-8b2c8f5a.js";import{e as I}from"./index.esm-58292b62.js";import{b as w,c as y}from"./index.esm-e8f97965.js";import{a as O}from"./index.esm-8bf58678.js";import{L as A}from"./Loading-e3459361.js";import{T as N}from"./TextInput-d6cefbdd.js";import{P as M}from"./PrimaryButton-33b1c72b.js";const J=({header:g,link:i,datefilter:n=!1,...k})=>{const[j,u]=o.useState(!1),{filters:l}=T().props,[c,U]=o.useState(l),[x,F]=o.useState(""),[d,S]=o.useState({startfrom:n&&l[n]?l[n].startfrom:"",thru:n&&l[n]?l[n].thru:""}),p=e=>{S({...d,[e.target.name]:e.target.value})},f=e=>{F(e)};o.useEffect(()=>{const e=r=>{r.target.tagName=="TH"?f(r.target.getAttribute("data-item")):f("")};return window.addEventListener("click",e),()=>{window.removeEventListener("click",e)}});const L=e=>{e.preventDefault(),u(!0);const r=document.getElementById("filterinput"),s={[r.name]:r.value};h.visit(window.location.href,{data:s})},P=e=>{u(!0);const r=c;delete r[e];const s=window.location.href.split("?")[0];h.visit(s,{data:r})},D=e=>{e.preventDefault(),h.visit(window.location.href,{data:{[n]:d}})},_=(e,r=!1,s=!0)=>t("div",{className:"absolute h-full text-white -bottom-full left-0",onClick:m=>m.stopPropagation(),children:a("div",{className:"bg-main-900",children:[a("div",{className:"flex justify-end items-center text-2xl",children:[t("div",{className:"text-sm font-light px-4 py-2 mr-4",children:"Filters"}),r?a(b,{children:[t(v,{as:"a",method:"get",href:window.location.href,data:{sort:{0:e,1:"asc"}},className:"text-xl py-2 px-4 hover:bg-black focus:border focus:border-blue-500",children:t(w,{})}),t(v,{as:"a",method:"get",href:window.location.href,data:{sort:{0:e,1:"desc"}},className:"text-xl py-2 px-4 hover:bg-black focus:border focus:border-blue-500",children:t(y,{})})]}):a(b,{children:[t("button",{disabled:!0,className:"text-xl py-2 px-4 hover:bg-black focus:border focus:border-blue-500 disabled:cursor-not-allowed",children:t(w,{})}),t("button",{disabled:!0,className:"text-xl py-2 px-4 hover:bg-black focus:border focus:border-blue-500 disabled:cursor-not-allowed",children:t(y,{})})]})]}),t("form",{onSubmit:L,children:t("input",{disabled:!s,id:"filterinput",name:e,className:"w-full font-light text-white bg-main-700 py-2 px-4 disabled:cursor-not-allowed"})})]})}),B=()=>t("thead",{className:"text-xs text-gray-700 bg-main-100 border-b border-b-main-300 dark:border-b-main-600 dark:bg-main-700 dark:text-gray-400",children:a("tr",{className:"text-center",children:[t("th",{className:"px-6 py-1",children:"No"}),g.map((e,r)=>a("th",{scope:"col","data-item":e.column,className:`border-l border-l-main-300 dark:border-l-main-600 hover:cursor-pointer relative py-3 px-6 whitespace-nowrap ${x==e.column?"bg-main-900 text-white":"bg-transparent"}`,children:[e.title,x==e.column&&_(e.column,e.sortable,e.filterable)]},r))]})}),C=()=>a(b,{children:[t(A,{show:j}),t("div",{className:"inline-block lg:w-72 mb-2",children:Object.entries(c).map(([e,r])=>{if(e!="sort"&&e!="page"&&e!=n){const s=g.find(m=>m.column==e).title;return a("div",{className:"flex justify-start items-center gap-3 border hover:bg-green-100 mb-1",children:[t("div",{className:"p-1.5 bg-green-400 text-white text-xl",children:t(O,{})}),a("p",{className:"text-sm text-blue-500",children:[s," = ",r]}),t("button",{onClick:()=>P(e),className:"flex items-center justify-center ml-auto mr-2 focus:border-blue-500 hover:bg-main-300 p-1 text-xs",children:t(I,{})})]},e)}})})]}),E=()=>{const e=i.next_page?new URL(i.next_page).searchParams.get("page"):null,r=i.previous_page?new URL(i.previous_page).searchParams.get("page"):null;return t("nav",{"aria-label":"Page navigation example",children:a("ul",{className:"inline-flex -space-x-px text-sm",children:[t("li",{children:t("a",{href:i.first_page,className:"flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-main-300 rounded-l-lg hover:bg-main-100 hover:text-gray-700 dark:bg-main-800 dark:border-main-700 dark:text-gray-400 dark:hover:bg-main-700 dark:hover:text-white",children:"First"})}),r&&t("li",{children:t("a",{href:i.previous_page,className:"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-main-300 hover:bg-main-100 hover:text-gray-700 dark:bg-main-800 dark:border-main-700 dark:text-gray-400 dark:hover:bg-main-700 dark:hover:text-white",children:r})}),t("li",{children:t("a",{href:"#",className:"flex items-center justify-center px-3 h-8 text-blue-600 border border-main-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-main-700 dark:bg-main-700 dark:text-white",children:r?parseInt(r)+1:e?parseInt(e)-1:1})}),e&&t("li",{children:t("a",{href:i.next_page,"aria-current":"page",className:"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-main-300 hover:bg-main-100 hover:text-gray-700 dark:bg-main-800 dark:border-main-700 dark:text-gray-400 dark:hover:bg-main-700 dark:hover:text-white",children:e})}),t("li",{children:t("a",{href:i.last,className:"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-main-300 rounded-r-lg hover:bg-main-100 hover:text-gray-700 dark:bg-main-800 dark:border-main-700 dark:text-gray-400 dark:hover:bg-main-700 dark:hover:text-white",children:"Last"})})]})})};return a("div",{className:"relative",children:[n&&a("form",{onSubmit:D,className:"flex items-center gap-4 mb-3",children:[t("p",{children:"Tanggal Drop"}),t(N,{name:"startfrom",onChange:p,className:"text-xs",type:"date",value:d.startfrom}),t("p",{children:"Sampai Dengan"}),t(N,{name:"thru",onChange:p,className:"text-xs",type:"date",value:d.thru}),t(M,{title:"submit",type:"submit",padding:"px-3 py-2"})]}),c&&C(),t("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg mb-3 h-[70vh]",children:a("table",{className:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[B(),k.children]})}),E()]})};export{J as M};
