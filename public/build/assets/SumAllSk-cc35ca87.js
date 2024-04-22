import{r as s,a as e,j as a,F as w,y as I,d as L}from"./app-a86ff94c.js";import{L as R}from"./LinkButton-903c4220.js";import{P as z}from"./PrimaryButton-a1b6d89e.js";import{S as k}from"./SelectList-ef2030b8.js";import{u as V}from"./useBulanFilter-7c17b2fa.js";import{u as Y}from"./useFilteredComplains-0daa81dc.js";import{A as G}from"./AuthenticatedLayout-3c3f3c2c.js";import{d as T}from"./dayjs.min-b7533f5b.js";import{a as J,b as $,c as q,d as H,f as U}from"./index.esm-4e8063f2.js";import{B as W}from"./index.esm-37669fbb.js";import{N as Q}from"./react-number-format.es-9e01e43a.js";import"./SweetAlert-0c43b2c9.js";import"./transition-044c5b3f.js";import"./index.esm-ea7ea92e.js";import"./iconBase-d95b3d95.js";import"./Loading-831c0ccb.js";const ye=({server_filters:b,datas:X,...h})=>{const{filters:o,setFilters:d,orderData:p,setOrderData:g,currentPage:S,setCurrentPage:ee,displayData:f,totalPages:te,handlePageChange:re}=Y({},100),[c,F]=s.useState(""),[l,m]=s.useState({column:"",operators:"1",values:""}),[C,D]=s.useState(!1),x=(t,r="text")=>{F({column:t,format:r})};s.useEffect(()=>{const t=JSON.parse(localStorage.getItem("dashboard_simpanan_karyawan"));t&&Object.keys(t).length>0&&d(t)},[]),s.useEffect(()=>{localStorage.setItem("dashboard_simpanan_karyawan",JSON.stringify(o))},[o]),s.useEffect(()=>{const t=r=>{r.target.tagName=="TH"?(x(r.target.getAttribute("data-item"),r.target.getAttribute("data-format")),m({...l,column:r.target.getAttribute("data-item")})):x("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const P=()=>{const t=[...o],r=t.findIndex(n=>n.column===l.column);r!==-1?t[r]=l:t.push(l),d(t)},A=t=>{[...o];const r=o.filter(n=>n.column!==t);d(r)},_=t=>{const{name:r,value:n,type:i}=t.target;let N=n;i==="number"&&(N=parseInt(n)),m({...l,[r]:N})},{bulanAngka:j,tahunAngka:B}=V(),[u,K]=s.useState({transaction_month:parseInt(b.transaction_month)??null,transaction_year:parseInt(b.transaction_year)??null}),y=t=>{const{value:r,name:n}=t.target;K({...u,[n]:r})},M=t=>{t.preventDefault(),D(!0),I.visit(route("simpanan.sumallsk"),{data:{...u}})},O=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:a("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[a("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:l.column,onChange:t=>m({...l,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),a("div",{className:"flex flex-col-reverse",children:[a("select",{name:"operators",value:l.operators,onChange:t=>m({...l,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),a("div",{className:"flex flex-col-reverse",children:[e("input",{value:l.values,type:c.format=="number"?"number":c.format=="date"?"date":c.format=="currency"?"number":"text",onChange:_,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),a("div",{className:"flex items-center justify-center",children:[e("button",{onClick:P,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>g({column:c.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(q,{})}),e("button",{onClick:()=>g({column:c.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(H,{})})]})]})})}),v=[{title:"Wilayah",column:"wilayah"},{title:"Bulan",column:"bulan"},{title:"Saldo Sebelumnya",column:"balance_before",format:"currency",backgroundcolumn:"bg-gray-100"},{title:"Debit",column:"debit",format:"currency",backgroundcolumn:"bg-green-200"},{title:"Kredit",column:"kredit",format:"currency",backgroundcolumn:"bg-red-200"},{title:"Saldo",column:"balance",format:"currency",backgroundcolumn:"bg-green-200"},{title:"Setoran (D)",column:"D",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Debit Mutasi (D)",column:"DM",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Pengambilan (K)",column:"K",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Kredit Mutasi (K)",column:"KM",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Kredit Resigm / MD (K)",column:"KRMD",format:"currency",backgroundcolumn:"bg-yellow-100"}],E=()=>f.length===0?e(w,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:f.map((t,r)=>a("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-xs",children:[e("th",{className:"px-6 py-1",children:a("div",{className:"flex justify-around items-center gap-3",children:[(S-1)*100+r+1,e(L,{href:"#",children:e(U,{className:"text-blue-500 hover:cursor-pointer"})})]})}),v.map((n,i)=>n.format=="date"?e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-pre-wrap",children:t[n.column]!=="-"?T(t[n.column]).format("DD-MM-YYYY"):"-"})},i):n.format=="currency"?e("td",{className:`px-6 py-1 ${n.backgroundcolumn?n.backgroundcolumn:""}`,children:e("div",{className:"whitespace-nowrap",children:e(Q,{value:t[n.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},i):e("td",{className:"px-6 py-1",children:e("div",{className:`${n.nowrap?"whitespace-nowrap":"whitespace-pre-wrap"} `,children:t[n.column]})},i))]},r))});return e(G,{loading:C,auth:h.auth,errors:h.errors,header:a(w,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Sukarela Karyawan"}),e("div",{className:"ml-auto flex items-center"})]}),children:a("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:[a("div",{className:"p-3 bg-white rounded shadow",children:[e("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:a("form",{onSubmit:M,className:"ml-auto flex gap-3 items-center",children:[e(k,{value:u.transaction_month,options:j,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:y}),e(k,{value:u.transaction_year,options:B,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:y}),e(z,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),e(R,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:e(W,{})})]})}),o&&e("div",{className:"inline-block mt-3",children:o.map(t=>t.column==""?null:a("div",{className:"flex items-center justify-start space-y-2",children:[a("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(J,{})}),a("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),a("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>A(t.column),children:e($,{})})]}))})]}),e("div",{className:"h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto",children:a("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:a("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),v.map((t,r)=>a("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,p.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:p.orderby}),c.column==t.column&&O()]},r))]})}),E()]})})]})})};export{ye as default};
