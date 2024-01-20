import{r as m,a as e,j as t,F as S,d as E}from"./app-8b2c8f5a.js";import{L}from"./LinkButton-98fabd78.js";import{P as I}from"./PrimaryButton-33b1c72b.js";import{S as k}from"./SelectList-592557ae.js";import{u as z}from"./useBulanFilter-099c1a8d.js";import{u as G}from"./useFilteredComplains-54c225a1.js";import{A as V}from"./AuthenticatedLayout-818e74d5.js";import{d as Y}from"./dayjs.min-eb231bb4.js";import{d as J,e as $,f as q,g as H,a as U}from"./index.esm-58292b62.js";import{B as Q}from"./index.esm-e8f97965.js";import{N as r}from"./react-number-format.es-fe0672b4.js";import"./SweetAlert-e0eb17e7.js";import"./transition-9291623c.js";import"./index.esm-d939975b.js";import"./iconBase-65c2d3e9.js";import"./Loading-e3459361.js";const ve=({server_filters:K,datas:D,...h})=>{const{tahunAngka:R,bulanAngka:T,serverFilter:b,setServerFilter:X,onServerFilterChange:x,onBranchChange:F,loading:M,setLoading:Z,handleTabClick:ee}=z(K,route("sksw.skswglobal"),null,D,"unit"),f=100,{filters:o,setFilters:u,orderData:y,setOrderData:g,currentPage:C,setCurrentPage:ae,displayData:v,totalPages:te,handlePageChange:re,totals:l}=G({},f),[i,A]=m.useState(""),[c,p]=m.useState({column:"",operators:"1",values:""}),w=(a,s="text")=>{A({column:a,format:s})};m.useEffect(()=>{const a=JSON.parse(localStorage.getItem("dashboard_sksw"));a&&Object.keys(a).length>0&&u(a)},[]),m.useEffect(()=>{localStorage.setItem("dashboard_sksw",JSON.stringify(o))},[o]),m.useEffect(()=>{const a=s=>{s.target.tagName=="TH"?(w(s.target.getAttribute("data-item"),s.target.getAttribute("data-format")),p({...c,column:s.target.getAttribute("data-item")})):w("")};return window.addEventListener("click",a),()=>{window.removeEventListener("click",a)}});const P=()=>{const a=[...o],s=a.findIndex(n=>n.column===c.column);s!==-1?a[s]=c:a.push(c),u(a)},j=a=>{[...o];const s=o.filter(n=>n.column!==a);u(s)},W=a=>{const{name:s,value:n,type:d}=a.target;let _=n;d==="number"&&(_=parseInt(n)),p({...c,[s]:_})},B=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:a=>a.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:t("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[t("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:c.column,onChange:a=>p({...c,column:a.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),t("div",{className:"flex flex-col-reverse",children:[t("select",{name:"operators",value:c.operators,onChange:a=>p({...c,operators:a.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),t("div",{className:"flex flex-col-reverse",children:[e("input",{value:c.values,type:i.format=="number"?"number":i.format=="date"?"date":i.format=="currency"?"number":"text",onChange:W,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),t("div",{className:"flex items-center justify-center",children:[e("button",{onClick:P,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>g({column:i.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(q,{})}),e("button",{onClick:()=>g({column:i.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(H,{})})]})]})})}),N=[{title:"Wilayah",column:"wilayah"},{title:"Bulan",column:"bulan",class_name:"whitespace-nowrap"},{title:"Simpanan SW",column:"balance_before_sw",format:"currency",class_name:"bg-gray-100 text-black font-semibold"},{title:"Simpanan SK",column:"balance_before_sk",format:"currency",class_name:"bg-gray-200 text-black font-semibold"},{title:"Debit SW",column:"debit_sw",format:"currency",class_name:"bg-green-100 text-black font-semibold"},{title:"Debit SK",column:"debit_sk",format:"currency",class_name:"bg-green-200 text-black font-semibold"},{title:"Kredit SW",column:"kredit_sw",format:"currency",class_name:"bg-red-100 text-black font-semibold"},{title:"Kredit SK",column:"kredit_sk",format:"currency",class_name:"bg-red-200 text-black font-semibold"},{title:"Saldo SW",column:"balance_sw",format:"currency",class_name:"bg-green-100 text-black font-semibold"},{title:"Saldo SK",column:"balance_sk",format:"currency",class_name:"bg-green-200 text-black font-semibold"},{title:"Saldo Global",column:"saldo_global",format:"currency",class_name:"bg-blue-200 text-black font-semibold"},{title:"Setoran SW (D)",column:"D_sw",format:"currency",class_name:"bg-emerald-50"},{title:"Setoran SK (D)",column:"D_sk",format:"currency",class_name:"bg-emerald-50"},{title:"Debit Mutasi SW (D)",column:"DM_sw",format:"currency",class_name:"bg-emerald-50"},{title:"Debit Mutasi SK (D)",column:"DM_sk",format:"currency",class_name:"bg-emerald-50"},{title:"Pengambilan SW (K)",column:"K_sw",format:"currency",class_name:"bg-rose-50"},{title:"Pengambilan SK (K)",column:"K_sk",format:"currency",class_name:"bg-rose-50"},{title:"Kredit Mutasi SW (K)",column:"KM_sw",format:"currency",class_name:"bg-rose-50"},{title:"Kredit Mutasi SK (K)",column:"KM_sk",format:"currency",class_name:"bg-rose-50"},{title:"Kredit Resign / M SW (K)",column:"KRMD_sw",format:"currency",class_name:"bg-rose-50"},{title:"Kredit Resign / MD SK (K)",column:"KRMD_sk",format:"currency",class_name:"bg-rose-50"}],O=()=>v.length===0?e(S,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:v.map((a,s)=>t("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-xs",children:[e("th",{className:"px-6 py-1",children:t("div",{className:"flex justify-around items-center gap-3",children:[(C-1)*f+s+1,e(E,{href:"#",children:e(U,{className:"text-blue-500 hover:cursor-pointer"})})]})}),N.map((n,d)=>n.format=="date"?e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-pre-wrap",children:a[n.column]!=="-"?Y(a[n.column]).format("DD-MM-YYYY"):"-"})},d):n.format=="currency"?e("td",{className:`px-6 py-1 ${n.class_name}`,children:e("div",{className:"whitespace-nowrap",children:e(r,{value:a[n.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},d):e("td",{className:"px-6 py-1",children:e("div",{className:`${n.class_name} `,children:a[n.column]})},d))]},s))});return e(V,{loading:M,auth:h.auth,errors:h.errors,header:t(S,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Wajib Karyawan"}),e("div",{className:"ml-auto flex items-center"})]}),children:t("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:[t("div",{className:"p-3 bg-white rounded shadow",children:[e("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:t("form",{onSubmit:F,className:"ml-auto flex gap-3 items-center",children:[e(k,{value:b.transaction_month,options:T,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:x}),e(k,{value:b.transaction_year,options:R,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:x}),e(I,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),e(L,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:e(Q,{})})]})}),o&&e("div",{className:"inline-block mt-3",children:o.map(a=>a.column==""?null:t("div",{className:"flex items-center justify-start space-y-2",children:[t("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(J,{})}),t("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:a.column}),e("span",{className:"mr-1 capitalize ",children:a.operators==1?"Contains":"="}),t("span",{children:["'",a.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>j(a.column),children:e($,{})})]}))})]}),e("div",{className:"h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto",children:t("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:t("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),N.map((a,s)=>t("th",{"data-item":a.column,"data-format":a.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[a.title,y.column==a.column&&e("span",{className:"ml-1 text-blue-400 italic",children:y.orderby}),i.column==a.column&&B()]},s))]})}),O(),e("tfoot",{children:t("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-6 py-1",colSpan:3,children:"TOTAL"}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.balance_before_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.balance_before_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.debit_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.debit_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.kredit_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.kredit_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.balance_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.balance_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.saldo_global,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.D_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.D_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.DM_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.DM_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.K_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.K_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.KM_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.KM_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.KRMD_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(r,{value:l.KRMD_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})})]})})]})})]})})};export{ve as default};
