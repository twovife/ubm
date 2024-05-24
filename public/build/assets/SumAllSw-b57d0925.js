import{r as s,a as e,j as a,F as w,g as I,d as L}from"./app-577095aa.js";import{L as R}from"./LinkButton-c41e9ed7.js";import{P as z}from"./PrimaryButton-e87527a9.js";import{S as k}from"./SelectList-2f891eca.js";import{u as V}from"./useBulanFilter-932b4e08.js";import{u as Y}from"./useFilteredComplains-cf78722e.js";import{A as G}from"./AuthenticatedLayout-9a50dbde.js";import{d as T}from"./dayjs.min-a735f434.js";import{a as J,b as W,c as $,d as q,f as H}from"./index.esm-40d2e5fe.js";import{B as U}from"./index.esm-b887299b.js";import{N as Q}from"./react-number-format.es-1fd40bc0.js";import"./Card-298928cd.js";import"./iconBase-0c341566.js";import"./transition-89244925.js";import"./index.esm-0a08b294.js";import"./index.esm-6cd27bff.js";import"./Loading-c8b73d4d.js";const ve=({server_filters:b,datas:X,...p})=>{const{filters:l,setFilters:d,orderData:h,setOrderData:g,currentPage:S,setCurrentPage:ee,displayData:f,totalPages:te,handlePageChange:re}=Y({},100),[c,F]=s.useState(""),[o,u]=s.useState({column:"",operators:"1",values:""}),[C,D]=s.useState(!1),x=(t,r="text")=>{F({column:t,format:r})};s.useEffect(()=>{const t=JSON.parse(localStorage.getItem("dashboard_simpanan_karyawan"));t&&Object.keys(t).length>0&&d(t)},[]),s.useEffect(()=>{localStorage.setItem("dashboard_simpanan_karyawan",JSON.stringify(l))},[l]),s.useEffect(()=>{const t=r=>{r.target.tagName=="TH"?(x(r.target.getAttribute("data-item"),r.target.getAttribute("data-format")),u({...o,column:r.target.getAttribute("data-item")})):x("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const P=()=>{const t=[...l],r=t.findIndex(n=>n.column===o.column);r!==-1?t[r]=o:t.push(o),d(t)},A=t=>{[...l];const r=l.filter(n=>n.column!==t);d(r)},j=t=>{const{name:r,value:n,type:m}=t.target;let N=n;m==="number"&&(N=parseInt(n)),u({...o,[r]:N})},{bulanAngka:_,tahunAngka:B}=V(),[i,K]=s.useState({transaction_month:parseInt(b.transaction_month)??null,transaction_year:parseInt(b.transaction_year)??null}),y=t=>{const{value:r,name:n}=t.target;K({...i,[n]:r})},M=t=>{t.preventDefault(),console.log(i),D(!0),I.visit(route("simpanan.sumallsw"),{data:{...i}})},O=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:a("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[a("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:o.column,onChange:t=>u({...o,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),a("div",{className:"flex flex-col-reverse",children:[a("select",{name:"operators",value:o.operators,onChange:t=>u({...o,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),a("div",{className:"flex flex-col-reverse",children:[e("input",{value:o.values,type:c.format=="number"?"number":c.format=="date"?"date":c.format=="currency"?"number":"text",onChange:j,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),a("div",{className:"flex items-center justify-center",children:[e("button",{onClick:P,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>g({column:c.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e($,{})}),e("button",{onClick:()=>g({column:c.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(q,{})})]})]})})}),v=[{title:"Wilayah",column:"wilayah"},{title:"Bulan",column:"bulan"},{title:"Saldo Sebelumnya",column:"balance_before",format:"currency",backgroundcolumn:"bg-gray-100"},{title:"Debit",column:"debit",format:"currency",backgroundcolumn:"bg-green-200"},{title:"Kredit",column:"kredit",format:"currency",backgroundcolumn:"bg-red-200"},{title:"Saldo",column:"balance",format:"currency",backgroundcolumn:"bg-green-200"},{title:"Setoran (D)",column:"D",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Debit Mutasi (D)",column:"DM",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Pengambilan (K)",column:"K",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Kredit Mutasi (K)",column:"KM",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Kredit Resigm / MD (K)",column:"KRMD",format:"currency",backgroundcolumn:"bg-yellow-100"}],E=()=>f.length===0?e(w,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:f.map((t,r)=>a("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-xs",children:[e("th",{className:"px-6 py-1",children:a("div",{className:"flex justify-around items-center gap-3",children:[(S-1)*100+r+1,e(L,{href:"#",children:e(H,{className:"text-blue-500 hover:cursor-pointer"})})]})}),v.map((n,m)=>n.format=="date"?e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-pre-wrap",children:t[n.column]!=="-"?T(t[n.column]).format("DD-MM-YYYY"):"-"})},m):n.format=="currency"?e("td",{className:`px-6 py-1 ${n.backgroundcolumn?n.backgroundcolumn:""}`,children:e("div",{className:"whitespace-nowrap",children:e(Q,{value:t[n.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},m):e("td",{className:"px-6 py-1",children:e("div",{className:`${n.nowrap?"whitespace-nowrap":"whitespace-pre-wrap"} `,children:t[n.column]})},m))]},r))});return e(G,{loading:C,auth:p.auth,errors:p.errors,header:a(w,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Wajib Karyawan"}),e("div",{className:"ml-auto flex items-center"})]}),children:a("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:[a("div",{className:"p-3 bg-white rounded shadow",children:[e("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:a("form",{onSubmit:M,className:"ml-auto flex gap-3 items-center",children:[e(k,{value:i.transaction_month,options:_,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:y}),e(k,{value:i.transaction_year,options:B,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:y}),e(z,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),e(R,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:e(U,{})})]})}),l&&e("div",{className:"inline-block mt-3",children:l.map(t=>t.column==""?null:a("div",{className:"flex items-center justify-start space-y-2",children:[a("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(J,{})}),a("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),a("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>A(t.column),children:e(W,{})})]}))})]}),e("div",{className:"h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto",children:a("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:a("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),v.map((t,r)=>a("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,h.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:h.orderby}),c.column==t.column&&O()]},r))]})}),E()]})})]})})};export{ve as default};
