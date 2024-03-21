import{r as n,j as l,a as e,F as v}from"./app-0a1a056b.js";import{P as y}from"./PrimaryButton-cdff6b9c.js";import{u as M}from"./useFilteredComplains-bae9962c.js";import{A as O}from"./AuthenticatedLayout-82c12c12.js";import{d as E}from"./dayjs.min-47fbaa5e.js";import{a as B,b as I,c as J,d as K,f as R}from"./index.esm-893fc784.js";import{B as Y}from"./index.esm-8cc1223b.js";import{N as w}from"./react-number-format.es-1d060f3b.js";import{ModalHer as $}from"./ModalHer-4a32e84d.js";import"./SweetAlert-9a4afb76.js";import"./transition-d63cfb93.js";import"./index.esm-33e5d14f.js";import"./iconBase-359f7aca.js";import"./Loading-319b2562.js";import"./InputError-9141874c.js";import"./InputLabel-472e2c98.js";import"./Modal-d9e932ee.js";import"./SelectList-e1ad1c48.js";const he=({datas:z,...u})=>{const{filters:s,setFilters:d,orderData:p,setOrderData:h,currentPage:k,setCurrentPage:G,displayData:b,totalPages:U,handlePageChange:V}=M({},1e3),[c,S]=n.useState(""),[o,m]=n.useState({column:"",operators:"1",values:""}),[C,q]=n.useState(!1),f=(t,r="text")=>{S({column:t,format:r})};n.useEffect(()=>{const t=JSON.parse(localStorage.getItem("dashboard_aset"));t&&Object.keys(t).length>0&&d(t)},[]),n.useEffect(()=>{localStorage.setItem("dashboard_aset",JSON.stringify(s))},[s]),n.useEffect(()=>{const t=r=>{r.target.tagName=="TH"?(f(r.target.getAttribute("data-item"),r.target.getAttribute("data-format")),m({...o,column:r.target.getAttribute("data-item")})):f("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const F=()=>{const t=[...s],r=t.findIndex(a=>a.column===o.column);r!==-1?t[r]=o:t.push(o),d(t)},A=t=>{[...s];const r=s.filter(a=>a.column!==t);d(r)},P=t=>{const{name:r,value:a,type:i}=t.target;let N=a;i==="number"&&(N=parseInt(a)),m({...o,[r]:N})},[j,g]=n.useState({show:!1,tax:""}),H=(t,r)=>{g({show:!0,tax:r})},T=()=>{g({show:!1,tax:""})},_=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:l("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[l("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:o.column,onChange:t=>m({...o,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),l("div",{className:"flex flex-col-reverse",children:[l("select",{name:"operators",value:o.operators,onChange:t=>m({...o,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),l("div",{className:"flex flex-col-reverse",children:[e("input",{value:o.values,type:c.format=="number"?"number":c.format=="date"?"date":c.format=="currency"?"number":"text",onChange:P,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),l("div",{className:"flex items-center justify-center",children:[e("button",{onClick:F,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>h({column:c.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(J,{})}),e("button",{onClick:()=>h({column:c.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(K,{})})]})]})})}),x=[{title:"Wilayah",column:"wilayah"},{title:"Unit",column:"unit",nowrap:!0,className:"whitespace-nowrap"},{title:"Jabatan",column:"pengguna",nowrap:!0},{title:"Jenis Aset",column:"type_aset",className:"whitespace-nowrap"},{title:"Nama Aset",column:"nama_aset",className:"whitespace-nowrap"},{title:"Nopol",column:"plat_nomor",className:"whitespace-nowrap"},{title:"Masa Berlaku STNK ( Her 5 Tahun )",column:"tanggal_stnk",format:"date",className:"whitespace-nowrap"},{title:"Tanggal Berlaku Pajak ( Her 1 Tahun )",column:"tax_expired",format:"date",className:"whitespace-nowrap"},{title:"Atas Nama STNK",column:"nama_stnk",className:"whitespace-nowrap"}],D=()=>b.length===0?e(v,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:b.map((t,r)=>l("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm",children:[e("th",{className:"px-6 py-1",children:l("div",{className:"flex justify-around items-center gap-3",children:[(k-1)*1e3+r+1,e(y,{theme:"other",onClick:a=>H(a,t),icon:e(R,{className:"text-blue-500 hover:cursor-pointer"})})]})}),x.map((a,i)=>a.format=="date"?e("td",{className:`px-6 py-1 ${a.className} `,children:e("div",{children:t[a.column]!=="-"?E(t[a.column]).format("DD-MM-YYYY"):"-"})},i):a.format=="currency"?a.column==="saldo_akhir"?e("td",{className:`bg-green-200 px-6 py-1 ${a.className}`,children:e("div",{children:e(w,{value:t[a.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},i):e("td",{className:`px-6 py-1 ${a.className} `,children:e("div",{children:e(w,{value:t[a.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},i):e("td",{className:`px-6 py-1 ${a.className} `,children:e("div",{children:t[a.column]})},i))]},r))});return l(O,{loading:C,auth:u.auth,errors:u.errors,header:e(v,{children:e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Karyawan"})}),children:[l("div",{className:"mx-auto sm:px-6 lg:px-8",children:[l("div",{className:"p-3 bg-white rounded shadow",children:[e("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:e("div",{className:"flex items-center gap-3",children:e(y,{size:"sm",theme:"other",icon:e(Y,{}),title:"Reset"})})}),s&&e("div",{className:"inline-block mt-3",children:s.map(t=>t.column==""?null:l("div",{className:"flex items-center justify-start space-y-2",children:[l("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(B,{})}),l("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),l("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>A(t.column),children:e(I,{})})]}))})]}),e("div",{className:"h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto",children:l("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:l("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor / Her"}),x.map((t,r)=>l("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,p.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:p.orderby}),c.column==t.column&&_()]},r))]})}),D()]})})]}),e($,{datas:j,onClose:T})]})};export{he as default};
