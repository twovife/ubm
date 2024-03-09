import{r as c,j as a,F as _,a as e,d as F}from"./app-2105943b.js";import{L as h}from"./LinkButton-4c068354.js";import{P as Y}from"./PrimaryButton-8a51b27c.js";import{S as j}from"./SelectList-5e4f4a20.js";import{u as G}from"./useBulanFilter-54d92bea.js";import{u as K}from"./useFilteredComplains-a99b2e80.js";import{A as M}from"./AuthenticatedLayout-a565c4a1.js";import{d as U}from"./dayjs.min-0b859a16.js";import{a as $,b as q,c as H,d as W,e as Q}from"./index.esm-79173287.js";import{B as X}from"./index.esm-725ce04c.js";import{N as m}from"./react-number-format.es-2c8c16c1.js";import"./SweetAlert-e405589c.js";import"./transition-d0a752ef.js";import"./index.esm-81b8f329.js";import"./iconBase-19493090.js";import"./Loading-a05b5559.js";const Ce=({branch:A,server_filters:T,datas:b,saldo_akhir:B,...x})=>{const{tahunAngka:P,bulanAngka:D,serverFilter:g,setServerFilter:Z,onServerFilterChange:f,onBranchChange:ee,branchess:te,loading:O,setLoading:ae,activeTab:re,setActiveTab:le,handleTabClick:ne}=G(T,route("unitsaving.index"),A,b,"wilayah"),y=1e3,{filters:s,setFilters:u,orderData:v,setOrderData:N,currentPage:L,setCurrentPage:se,displayData:w,totalPages:oe,handlePageChange:ie,totals:p}=K({},y,b),[o,R]=c.useState(""),[n,d]=c.useState({column:"",operators:"1",values:""}),k=(t,r="text")=>{R({column:t,format:r})};c.useEffect(()=>{const t=JSON.parse(localStorage.getItem("bonpanjer_1"));t&&Object.keys(t).length>0&&u(t)},[]),c.useEffect(()=>{localStorage.setItem("bonpanjer_1",JSON.stringify(s))},[s]),c.useEffect(()=>{const t=r=>{r.target.tagName=="TH"?(k(r.target.getAttribute("data-item"),r.target.getAttribute("data-format")),d({...n,column:r.target.getAttribute("data-item")})):k("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const z=()=>{const t=[...s],r=t.findIndex(l=>l.column===n.column);r!==-1?t[r]=n:t.push(n),u(t)},E=t=>{[...s];const r=s.filter(l=>l.column!==t);u(r)},I=t=>{const{name:r,value:l,type:i}=t.target;let C=l;i==="number"&&(C=parseInt(l)),d({...n,[r]:C})},S=[{title:"Bulan",column:"bulan"},{title:"Tanggal",column:"transaction_date",class_name:"whitespace-nowrap",format:"date"},{title:"Keterangan",column:"type_transaksi",class_name:"whitespace-nowrap"},{title:"Wilayah",column:"wilayah"},{title:"Unit",column:"unit"},{title:"Nama Karyawan",column:"nama_karyawan"},{title:"Saldo Sebelumnya",column:"saldo_sebelumya",format:"currency",class_name:"whitespace-nowrap bg-gray-100"},{title:"Debit",column:"debit",format:"currency",class_name:"whitespace-nowrap bg-green-100"},{title:"Kredit",column:"kredit",format:"currency",class_name:"whitespace-nowrap bg-red-100"},{title:"Saldo",column:"saldo",format:"currency",class_name:"whitespace-nowrap bg-blue-100"}],J=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2 ",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:a("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[a("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:n.column,onChange:t=>d({...n,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),a("div",{className:"flex flex-col-reverse",children:[a("select",{name:"operators",value:n.operators,onChange:t=>d({...n,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),a("div",{className:"flex flex-col-reverse",children:[e("input",{value:n.values,type:o.format=="number"?"number":o.format=="date"?"date":o.format=="currency"?"number":"text",onChange:I,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),a("div",{className:"flex items-center justify-center",children:[e("button",{onClick:z,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>N({column:o.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(H,{})}),e("button",{onClick:()=>N({column:o.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(W,{})})]})]})})}),V=()=>w.length===0?e(_,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:w.map((t,r)=>a("tr",{className:"bg-white border-b hover:bg-blue-50 text-xs even:bg-gray-100",children:[a("th",{className:"px-6 flex items-center justify-start gap-3",children:[(L-1)*y+r+1,t.keterangan=="unpaid"?e(F,{href:route("bonpanjer.bon_panjer_show",t.id),className:"px-2 py-1 rounded-lg bg-red-500 text-white",children:"Bayar"}):e(F,{as:"button",disabled:!0,className:"px-2 py-1 rounded-lg bg-white text-green-500",children:e(Q,{})})]}),S.map((l,i)=>l.format=="date"?e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-pre-wrap",children:t[l.column]!=="-"?U(t[l.column]).format("DD-MM-YYYY"):"-"})},i):l.format=="currency"?e("td",{className:`px-6 py-1 ${l.class_name}`,children:e("div",{className:"whitespace-nowrap text-right",children:e(m,{value:t[l.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},i):e("td",{className:"px-6 py-1",children:e("div",{className:`${l.class_name} `,children:t[l.column]})},i))]},r))});return a(M,{loading:O,auth:x.auth,errors:x.errors,header:a(_,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Dashboard Simpanan 1Jt"}),a("form",{className:"ml-auto flex gap-3 items-center",children:[e(j,{value:g.transaction_month,options:D,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:f}),e(j,{value:g.transaction_year,options:P,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:f}),e(Y,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),e(h,{href:route("unitsaving.index"),title:"Simpanan 1JT",size:"sm",type:"button",theme:"yellow"}),e(h,{href:route("bonpanjer.bon_panjer"),title:"Bon Panjer",size:"sm",type:"button",theme:"yellow"}),e(h,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:e(X,{})})]})]}),children:[e("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:s&&e("div",{className:"inline-block mt-3",children:s.map(t=>t.column==""?null:a("div",{className:"flex items-center justify-start space-y-2",children:[a("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e($,{})}),a("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),a("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>E(t.column),children:e(q,{})})]}))})}),e("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6 overflow-auto",children:a("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:a("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),S.map((t,r)=>a("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,v.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:v.orderby}),o.column==t.column&&J()]},r))]})}),V(),e("tfoot",{children:a("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-6 py-1",colSpan:"7",children:"TOTAL"}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap text-right",children:e(m,{value:p.saldo_sebelumya,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap text-right",children:e(m,{value:p.debit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap text-right",children:e(m,{value:p.kredit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap text-right",children:e(m,{value:B,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})})]})})]})})]})};export{Ce as default};
