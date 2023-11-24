import{r as o,a as e,j as s,F as y,d as J,g as K}from"./app-b2b4d377.js";import{L as w}from"./LinkButton-b95a4f1a.js";import{P as Y}from"./Paginasi-41f65414.js";import{P as k}from"./PrimaryButton-351f95ff.js";import{S as G}from"./SelectList-494142a1.js";import{u as V}from"./useFilteredComplains-df23abb8.js";import{A as U}from"./AuthenticatedLayout-7b953ffa.js";import{d as q}from"./dayjs.min-e79e6e0f.js";import{d as H,e as W,f as Q,g as X,a as Z}from"./index.esm-40b1f9f4.js";import{B as S}from"./SweetAlert-d37b63f1.js";import{I as ee}from"./index.esm-c97d9ba4.js";import{N as F}from"./react-number-format.es-9d9abed1.js";import"./index.esm-d19fb327.js";import"./iconBase-aadd6417.js";import"./Loading-56d50c57.js";import"./transition-58578fc4.js";const Ne=({branch:C,datas:te,server_filters:A,...p})=>{const{filters:n,setFilters:d,orderData:h,setOrderData:b,currentPage:f,setCurrentPage:re,displayData:g,totalPages:P,handlePageChange:_}=V({},20),[i,j]=o.useState(""),[l,m]=o.useState({column:"",operators:"1",values:""}),[I,D]=o.useState(!1),x=(t,r="text")=>{j({column:t,format:r})};o.useEffect(()=>{const t=JSON.parse(localStorage.getItem("dashboard_aset"));t&&Object.keys(t).length>0&&d(t)},[]),o.useEffect(()=>{localStorage.setItem("dashboard_aset",JSON.stringify(n))},[n]),o.useEffect(()=>{const t=r=>{r.target.tagName=="TH"?(x(r.target.getAttribute("data-item"),r.target.getAttribute("data-format")),m({...l,column:r.target.getAttribute("data-item")})):x("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const T=C.map(t=>({id:t.id,value:t.id,display:t.unit})),O=()=>{const t=[...n],r=t.findIndex(a=>a.column===l.column);r!==-1?t[r]=l:t.push(l),d(t)},B=t=>{[...n];const r=n.filter(a=>a.column!==t);d(r)},E=t=>{const{name:r,value:a,type:c}=t.target;let N=a;c==="number"&&(N=parseInt(a)),m({...l,[r]:N})},z=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:s("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[s("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:l.column,onChange:t=>m({...l,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),s("div",{className:"flex flex-col-reverse",children:[s("select",{name:"operators",value:l.operators,onChange:t=>m({...l,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),s("div",{className:"flex flex-col-reverse",children:[e("input",{value:l.values,type:i.format=="number"?"number":i.format=="date"?"date":i.format=="currency"?"number":"text",onChange:E,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),s("div",{className:"flex items-center justify-center",children:[e("button",{onClick:O,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>b({column:i.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(Q,{})}),e("button",{onClick:()=>b({column:i.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(X,{})})]})]})})}),v=[{title:"Wilayah",column:"wilayah"},{title:"Unit",column:"unit",nowrap:!0,className:"whitespace-nowrap"},{title:"Jabatan",column:"pengguna",nowrap:!0,className:"whitespace-nowrap"},{title:"Jenis Aset",column:"type_aset",className:"whitespace-nowrap"},{title:"Nama Aset",column:"nama_aset",className:"whitespace-nowrap"},{title:"Nopol",column:"plat_nomor",className:"whitespace-nowrap"},{title:"Status Aset",column:"is_inplace",className:"whitespace-nowrap"},{title:"Keterangan",column:"keterangan_keluar",className:"whitespace-nowrap"},{title:"Masa Berlaku STNK",column:"tanggal_stnk",format:"date",className:"whitespace-nowrap"},{title:"Tanggal Pajak Tahunan",column:"tax_expired",format:"date",className:"whitespace-nowrap"},{title:"Atas Nama STNK",column:"nama_stnk",className:"whitespace-nowrap"}],L=()=>g.length===0?e(y,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:g.map((t,r)=>s("tr",{className:`${t.is_inplace=="inactive"?"bg-red-200 hover:bg-red-300":"bg-white hover:bg-gray-50"}  border-b  text-sm`,children:[e("th",{className:"px-6 py-1",children:s("div",{className:"flex justify-around items-center gap-3",children:[(f-1)*20+r+1,e(J,{href:route("aset.show",t.inventory_id),children:e(Z,{className:"text-blue-500 hover:cursor-pointer"})})]})}),v.map((a,c)=>a.format=="date"?e("td",{className:`px-6 py-1 ${a.className} `,children:e("div",{children:t[a.column]!=="-"?q(t[a.column]).format("DD-MM-YYYY"):"-"})},c):a.format=="currency"?a.column==="saldo_akhir"?e("td",{className:`bg-green-200 px-6 py-1 ${a.className}`,children:e("div",{children:e(F,{value:t[a.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},c):e("td",{className:`px-6 py-1 ${a.className} `,children:e("div",{children:e(F,{value:t[a.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},c):e("td",{className:`px-6 py-1 ${a.className} `,children:e("div",{children:t[a.column]})},c))]},r))}),[u,M]=o.useState({branch_id:parseInt(A.branch_id)??null}),R=t=>{const{value:r,name:a}=t.target;M({...u,[a]:r})},$=t=>{t.preventDefault(),D(!0),K.visit(route("aset.index"),{data:{...u}})};return e(U,{loading:I,auth:p.auth,errors:p.errors,header:s(y,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Inventaris Motor Kantor"}),s("form",{onSubmit:$,className:"ml-auto flex gap-3 items-center",children:[e(G,{value:u.branch_id,name:"branch_id",options:T,nullValue:!0,className:"text-sm",onChange:R}),e(k,{title:"Go",size:"sm",type:"submit",theme:"green"}),e(w,{href:route("aset.index"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:e(S,{})})]})]}),children:s("div",{className:"mx-auto sm:px-6 lg:px-8",children:[s("div",{className:"p-3 bg-white rounded shadow",children:[e("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:s("div",{className:"flex items-center gap-3",children:[e(k,{size:"sm",theme:"other",icon:e(S,{}),title:"Reset"}),e(w,{as:"button",href:route("aset.create"),icon:e(ee,{}),size:"md",title:"Tambah"})]})}),n&&e("div",{className:"inline-block mt-3",children:n.map(t=>t.column==""?null:s("div",{className:"flex items-center justify-start space-y-2",children:[s("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(H,{})}),s("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),s("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>B(t.column),children:e(W,{})})]}))})]}),e("div",{className:"h-[70vh] p-3 my-3 bg-white rounded shadow overflow-auto",children:s("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:s("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),v.map((t,r)=>s("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,h.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:h.orderby}),i.column==t.column&&z()]},r))]})}),L()]})}),e(Y,{currentPage:f,totalPages:P,onPageChange:_})]})})};export{Ne as default};
