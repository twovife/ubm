import{r as c,j as e,a,F as w,g as J,d as K}from"./app-80d7f38d.js";import{L}from"./LinkButton-f129c0f5.js";import{P as M}from"./Paginasi-4b6abbfb.js";import{P as R}from"./PrimaryButton-4e1f76cb.js";import{S as z}from"./SelectList-0c5ae4ac.js";import{u as Y}from"./useFilteredComplains-8d828802.js";import{A as V}from"./AuthenticatedLayout-68da6f5c.js";import{d as G}from"./dayjs.min-0d14d287.js";import{b as H,e as U,h as W,i as q,a as $}from"./index.esm-c12926dd.js";import{c as Q}from"./Navbar-c15fffa2.js";import{I as X}from"./index.esm-8607bf00.js";import{N as Z}from"./react-number-format.es-54631598.js";import"./Loading-6e06328d.js";import"./transition-2bc3fe83.js";import"./iconBase-b11e7b39.js";import"./index.esm-22a394bb.js";const xe=({datas:ee,branch:_,server_filters:k,...h})=>{const P=_.map(t=>({id:t.id,value:t.id,display:t.unit})),g=20,{filters:o,setFilters:m,orderData:b,setOrderData:u,currentPage:f,setCurrentPage:te,displayData:x,totalPages:S,handlePageChange:j}=Y({},g),[s,C]=c.useState(""),[l,d]=c.useState({column:"",operators:"1",values:""}),[F,p]=c.useState(!1),v=(t,r="text")=>{C({column:t,format:r})};c.useEffect(()=>{const t=JSON.parse(localStorage.getItem("complainfilter"));t&&Object.keys(t).length>0&&m(t)},[]),c.useEffect(()=>{localStorage.setItem("complainfilter",JSON.stringify(o))},[o]),c.useEffect(()=>{const t=r=>{r.target.tagName=="TH"?(v(r.target.getAttribute("data-item"),r.target.getAttribute("data-format")),d({...l,column:r.target.getAttribute("data-item")})):v("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const A=()=>{const t=[...o],r=t.findIndex(n=>n.column===l.column);r!==-1?t[r]=l:t.push(l),m(t)},T=t=>{const r=[...o];console.log(r);const n=o.filter(i=>i.column!==t);m(n)},I=t=>{const{name:r,value:n,type:i}=t.target;let N=n;i==="number"&&(N=parseInt(n)),d({...l,[r]:N})},D=t=>{t.preventDefault(),p(!0),J.visit(route("employee.index"),{data:{branch_id:t.target.value}})},O=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:a("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[a("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:l.column,onChange:t=>d({...l,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),a("div",{className:"flex flex-col-reverse",children:[a("select",{name:"operators",value:l.operators,onChange:t=>d({...l,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),a("div",{className:"flex flex-col-reverse",children:[e("input",{value:l.values,type:s.format=="number"?"number":s.format=="date"?"date":s.format=="currency"?"number":"text",onChange:I,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),a("div",{className:"flex items-center justify-center",children:[e("button",{onClick:A,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>u({column:s.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(W,{})}),e("button",{onClick:()=>u({column:s.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(q,{})})]})]})})}),y=[{title:"Nama Karyawan",column:"nama"},{title:"Status",column:"status_karyawan"},{title:"NIK",column:"nik"},{title:"Alamat",column:"alamat"},{title:"Tanggal Masuk",column:"hire_date",format:"date"},{title:"Masa Kerja",column:"masa_kerja",format:"number"},{title:"Jabatan",column:"jabatan"},{title:"Area",column:"area",format:"number"},{title:"Unit",column:"unit"},{title:"Wilayah",column:"wilayah"},{title:"Jenis Jaminan",column:"janis_jaminan"},{title:"Tanggal Perpindahan",column:"tanggal_perpindahan",format:"date"},{title:"History Perpindahan",column:"history_perpindahan"},{title:"Keterangan Perpindahan",column:"keterangan_perpindahan"},{title:"Tanggal Berhenti",column:"date_resign",format:"date"},{title:"Keterangan Berhenti",column:"resign_status"},{title:"Tgl Pencairan SS",column:"pencairan_simpanan_date",format:"date"},{title:"Petugas",column:"pencairan_simpanan_by"},{title:"Tgl. Pencairan SW",column:"pencairan_simpanan_w_date",format:"date"},{title:"Petugas",column:"pencairan_simpanan_w_by"},{title:"Tgl Pengambilan Jaminan",column:"handover_jaminan",format:"date"},{title:"Petugas",column:"handover_jaminan_by"}],B=()=>x.length===0?e(w,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:x.map((t,r)=>a("tr",{className:`${t.resign_status=="Pecat"?"bg-red-200":t.resign_status=="Resign"?"bg-yellow-200":t.janis_jaminan=="-"?"bg-blue-200":"bg-white"} border-b hover:bg-gray-50 text-xs`,children:[e("th",{className:"px-6 py-1",children:a("div",{className:"flex justify-around items-center gap-3",children:[(f-1)*g+r+1,e(K,{href:route("employee.action",t.id),children:e($,{className:"text-blue-500 hover:cursor-pointer"})})]})}),y.map((n,i)=>n.format=="date"?e("td",{className:"px-6 py-1",children:e("div",{className:"w-64 white whitespace-pre-wrap",children:t[n.column]!=="-"?G(t[n.column]).format("DD-MM-YYYY"):"-"})},i):n.format=="currency"?e("td",{className:"px-6 py-1",children:e("div",{className:"w-64 white whitespace-pre-wrap",children:e(Z,{value:t[n.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},i):e("td",{className:"px-6 py-1",children:e("div",{className:"w-64 white whitespace-pre-wrap",children:t[n.column]})},i))]},r))}),E=()=>{p(!0),localStorage.setItem("complainfilter",null),m([{column:"",operators:"1",values:""}]),u({column:"",orderby:""}),setTimeout(()=>{p(!1)},500)};return e(V,{loading:F,auth:h.auth,errors:h.errors,header:a(w,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Karyawan"}),e("div",{className:"ml-auto flex items-center"})]}),children:e("div",{className:"py-3",children:e("div",{className:"mx-auto sm:px-6 lg:px-8",children:a("div",{className:"bg-white relative shadow-sm",children:[e("div",{className:"p-3",children:a("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:[e("div",{children:e(z,{value:k,options:P,nullValue:!0,onChange:D})}),a("div",{className:"flex items-center gap-3",children:[e(R,{onClick:E,size:"sm",theme:"other",icon:e(Q,{}),title:"Reset"}),e(L,{as:"a",href:route("employee.create"),icon:e(X,{}),size:"md",title:"Tambah"})]})]})}),a("div",{className:"h-[70vh] overflow-auto relative",children:[e("div",{className:"mb-3 inline-block",children:o&&o.map(t=>t.column==""?null:a("div",{className:"flex items-center justify-start mb-2",children:[a("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(H,{})}),a("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),a("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>T(t.column),children:e(U,{})})]}))}),a("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:a("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),y.map((t,r)=>a("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,b.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:b.orderby}),s.column==t.column&&O()]},r))]})}),B()]})]}),e(M,{currentPage:f,totalPages:S,onPageChange:j})]})})})})};export{xe as default};