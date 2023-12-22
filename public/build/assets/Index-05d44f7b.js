import{r as i,a as e,j as r,F as _,g as E,d as L}from"./app-d71c6101.js";import{L as z}from"./LinkButton-2cdce50a.js";import{P as G}from"./PrimaryButton-f52b8872.js";import{S as K}from"./SelectList-f83eb57c.js";import{u as V}from"./useBulanFilter-da86b8d7.js";import{u as Y}from"./useFilteredComplains-bdf97fbe.js";import{A as J}from"./AuthenticatedLayout-8a2ef509.js";import{d as $}from"./dayjs.min-f6759978.js";import{d as q,e as H,f as U,g as Q,a as X}from"./index.esm-9942305e.js";import{B as Z}from"./SweetAlert-678decaf.js";import{N as o}from"./react-number-format.es-619b41b3.js";import"./index.esm-df6317a3.js";import"./iconBase-d91bd46f.js";import"./Loading-5a6b19aa.js";import"./transition-eef42358.js";const ye=({server_filters:b,datas:ee,global_data:l,...f})=>{console.log(l);const x=100,{filters:c,setFilters:h,orderData:g,setOrderData:y,currentPage:D,setCurrentPage:te,displayData:v,totalPages:ae,handlePageChange:re}=Y({},x),[m,F]=i.useState(""),[n,p]=i.useState({column:"",operators:"1",values:""}),[C,R]=i.useState(!1),N=(t,a="text")=>{F({column:t,format:a})};i.useEffect(()=>{const t=JSON.parse(localStorage.getItem("dashboard_sksw"));t&&Object.keys(t).length>0&&h(t)},[]),i.useEffect(()=>{localStorage.setItem("dashboard_sksw",JSON.stringify(c))},[c]),i.useEffect(()=>{const t=a=>{a.target.tagName=="TH"?(N(a.target.getAttribute("data-item"),a.target.getAttribute("data-format")),p({...n,column:a.target.getAttribute("data-item")})):N("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const A=()=>{const t=[...c],a=t.findIndex(s=>s.column===n.column);a!==-1?t[a]=n:t.push(n),h(t)},M=t=>{[...c];const a=c.filter(s=>s.column!==t);h(a)},T=t=>{const{name:a,value:s,type:u}=t.target;let k=s;u==="number"&&(k=parseInt(s)),p({...n,[a]:k})},{bulanAngka:P,tahunAngka:j}=V(),[d,W]=i.useState({transaction_month:parseInt(b.transaction_month)??null,transaction_year:parseInt(b.transaction_year)??null}),w=t=>{const{value:a,name:s}=t.target;W({...d,[s]:a})},B=t=>{t.preventDefault(),console.log(d),R(!0),E.visit(route("sksw.skswglobal"),{data:{...d}})},O=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:r("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[r("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:n.column,onChange:t=>p({...n,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),r("div",{className:"flex flex-col-reverse",children:[r("select",{name:"operators",value:n.operators,onChange:t=>p({...n,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),r("div",{className:"flex flex-col-reverse",children:[e("input",{value:n.values,type:m.format=="number"?"number":m.format=="date"?"date":m.format=="currency"?"number":"text",onChange:T,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),r("div",{className:"flex items-center justify-center",children:[e("button",{onClick:A,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>y({column:m.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(U,{})}),e("button",{onClick:()=>y({column:m.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(Q,{})})]})]})})}),S=[{title:"Wilayah",column:"wilayah"},{title:"Bulan",column:"bulan",class_name:"whitespace-nowrap"},{title:"Simpanan SW",column:"balance_before_sw",format:"currency",class_name:"bg-gray-100 text-black font-semibold"},{title:"Simpanan SK",column:"balance_before_sk",format:"currency",class_name:"bg-gray-200 text-black font-semibold"},{title:"Debit SW",column:"debit_sw",format:"currency",class_name:"bg-green-100 text-black font-semibold"},{title:"Debit SK",column:"debit_sk",format:"currency",class_name:"bg-green-200 text-black font-semibold"},{title:"Kredit SW",column:"kredit_sw",format:"currency",class_name:"bg-red-100 text-black font-semibold"},{title:"Kredit SK",column:"kredit_sk",format:"currency",class_name:"bg-red-200 text-black font-semibold"},{title:"Saldo SW",column:"balance_sw",format:"currency",class_name:"bg-green-100 text-black font-semibold"},{title:"Saldo SK",column:"balance_sk",format:"currency",class_name:"bg-green-200 text-black font-semibold"},{title:"Saldo Global",column:"saldo_global",format:"currency",class_name:"bg-blue-200 text-black font-semibold"},{title:"Setoran SW (D)",column:"D_sw",format:"currency",class_name:"bg-emerald-50"},{title:"Setoran SK (D)",column:"D_sk",format:"currency",class_name:"bg-emerald-50"},{title:"Debit Mutasi SW (D)",column:"DM_sw",format:"currency",class_name:"bg-emerald-50"},{title:"Debit Mutasi SK (D)",column:"DM_sk",format:"currency",class_name:"bg-emerald-50"},{title:"Pengambilan SW (K)",column:"K_sw",format:"currency",class_name:"bg-rose-50"},{title:"Pengambilan SK (K)",column:"K_sk",format:"currency",class_name:"bg-rose-50"},{title:"Kredit Mutasi SW (K)",column:"KM_sw",format:"currency",class_name:"bg-rose-50"},{title:"Kredit Mutasi SK (K)",column:"KM_sk",format:"currency",class_name:"bg-rose-50"},{title:"Kredit Resign / M SW (K)",column:"KRMD_sw",format:"currency",class_name:"bg-rose-50"},{title:"Kredit Resign / MD SK (K)",column:"KRMD_sk",format:"currency",class_name:"bg-rose-50"}],I=()=>v.length===0?e(_,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:v.map((t,a)=>r("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-xs",children:[e("th",{className:"px-6 py-1",children:r("div",{className:"flex justify-around items-center gap-3",children:[(D-1)*x+a+1,e(L,{href:"#",children:e(X,{className:"text-blue-500 hover:cursor-pointer"})})]})}),S.map((s,u)=>s.format=="date"?e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-pre-wrap",children:t[s.column]!=="-"?$(t[s.column]).format("DD-MM-YYYY"):"-"})},u):s.format=="currency"?e("td",{className:`px-6 py-1 ${s.class_name}`,children:e("div",{className:"whitespace-nowrap",children:e(o,{value:t[s.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},u):e("td",{className:"px-6 py-1",children:e("div",{className:`${s.class_name} `,children:t[s.column]})},u))]},a))});return e(J,{loading:C,auth:f.auth,errors:f.errors,header:r(_,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Wajib Karyawan"}),e("div",{className:"ml-auto flex items-center"})]}),children:r("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:[r("div",{className:"p-3 bg-white rounded shadow",children:[e("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:r("form",{onSubmit:B,className:"ml-auto flex gap-3 items-center",children:[e(K,{value:d.transaction_month,options:P,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:w}),e(K,{value:d.transaction_year,options:j,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:w}),e(G,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),e(z,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:e(Z,{})})]})}),c&&e("div",{className:"inline-block mt-3",children:c.map(t=>t.column==""?null:r("div",{className:"flex items-center justify-start space-y-2",children:[r("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(q,{})}),r("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),r("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>M(t.column),children:e(H,{})})]}))})]}),e("div",{className:"h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto",children:r("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:r("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),S.map((t,a)=>r("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,g.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:g.orderby}),m.column==t.column&&O()]},a))]})}),I(),e("tfoot",{children:r("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-6 py-1",colSpan:3,children:"TOTAL"}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(o,{value:l.balance_before_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(o,{value:l.balance_before_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(o,{value:l.debit_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(o,{value:l.debit_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(o,{value:l.kredit_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(o,{value:l.kredit_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(o,{value:l.balance_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(o,{value:l.balance_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(o,{value:l.saldo_global,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",colSpan:10})]})})]})})]})})};export{ye as default};
