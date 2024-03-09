import{r as d,j as a,F as j,a as e,d as S}from"./app-90631d09.js";import{L as C}from"./LinkButton-bfacd230.js";import{P as Y}from"./PrimaryButton-50389d65.js";import{S as F}from"./SelectList-77cca460.js";import{u as G}from"./useBulanFilter-3ee556ca.js";import{u as J}from"./useFilteredComplains-6fa4e42b.js";import{A as M}from"./AuthenticatedLayout-d5c13c4c.js";import{d as K}from"./dayjs.min-48e23f7d.js";import{a as U,b as $,c as q,d as H,e as W}from"./index.esm-690d9f86.js";import{B as Q}from"./index.esm-8fb11c33.js";import{N as i}from"./react-number-format.es-6f4dce8b.js";import"./SweetAlert-e42335c9.js";import"./transition-7939fb1d.js";import"./index.esm-2baad7d0.js";import"./iconBase-642f6200.js";import"./Loading-fb469740.js";const ke=({branch:A,server_filters:T,datas:h,...b})=>{const{tahunAngka:P,bulanAngka:B,serverFilter:x,setServerFilter:X,onServerFilterChange:f,onBranchChange:Z,branchess:ee,loading:O,setLoading:te,activeTab:ae,setActiveTab:re,handleTabClick:ne}=G(T,route("unitsaving.index"),A,h,"wilayah"),g=100,{filters:o,setFilters:p,orderData:y,setOrderData:v,currentPage:R,setCurrentPage:le,displayData:N,totalPages:oe,handlePageChange:se,totals:c}=J({},g,h),[s,D]=d.useState(""),[l,u]=d.useState({column:"",operators:"1",values:""}),w=(t,r="text")=>{D({column:t,format:r})};d.useEffect(()=>{const t=JSON.parse(localStorage.getItem("bonpanjer_1"));t&&Object.keys(t).length>0&&p(t)},[]),d.useEffect(()=>{localStorage.setItem("bonpanjer_1",JSON.stringify(o))},[o]),d.useEffect(()=>{const t=r=>{r.target.tagName=="TH"?(w(r.target.getAttribute("data-item"),r.target.getAttribute("data-format")),u({...l,column:r.target.getAttribute("data-item")})):w("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const L=()=>{const t=[...o],r=t.findIndex(n=>n.column===l.column);r!==-1?t[r]=l:t.push(l),p(t)},E=t=>{[...o];const r=o.filter(n=>n.column!==t);p(r)},I=t=>{const{name:r,value:n,type:m}=t.target;let k=n;m==="number"&&(k=parseInt(n)),u({...l,[r]:k})},_=[{title:"Wilayah",column:"wilayah"},{title:"Unit",column:"branch",class_name:"whitespace-nowrap"},{title:"Nama Karyawan",column:"nama_karyawan",class_name:"whitespace-nowrap"},{title:"Jabatan",column:"jabatan"},{title:"Tanggal Pinjam",column:"tanggal_pinjaman",format:"date"},{title:"Keterangan",column:"keterangan"},{title:"Nominal Bon",column:"nominal_pinjaman",format:"currency"},{title:"Saldo Terakhir",column:"saldo_bulan_lalu",format:"currency"},{title:"Angsuran",column:"setoran_bulan_ini",format:"currency"},{title:"Total Angsuran",column:"total_setoran",format:"currency"},{title:"Saldo",column:"saldo",format:"currency"}],z=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2 ",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:a("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[a("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:l.column,onChange:t=>u({...l,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),a("div",{className:"flex flex-col-reverse",children:[a("select",{name:"operators",value:l.operators,onChange:t=>u({...l,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),a("div",{className:"flex flex-col-reverse",children:[e("input",{value:l.values,type:s.format=="number"?"number":s.format=="date"?"date":s.format=="currency"?"number":"text",onChange:I,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),a("div",{className:"flex items-center justify-center",children:[e("button",{onClick:L,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>v({column:s.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(q,{})}),e("button",{onClick:()=>v({column:s.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(H,{})})]})]})})}),V=()=>N.length===0?e(j,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:N.map((t,r)=>a("tr",{className:"bg-white border-b hover:bg-blue-50 text-xs even:bg-gray-100",children:[a("th",{className:"px-6 flex items-center justify-between gap-3",children:[(R-1)*g+r+1,t.keterangan=="unpaid"?e(S,{href:route("bonpanjer.bon_panjer_show",t.id),className:"px-2 py-1 rounded-lg bg-red-500 text-white",children:"Bayar"}):e(S,{as:"button",disabled:!0,className:"px-2 py-1 rounded-lg bg-white text-green-500",children:e(W,{})})]}),_.map((n,m)=>n.format=="date"?e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-pre-wrap",children:t[n.column]!=="-"?K(t[n.column]).format("DD-MM-YYYY"):"-"})},m):n.format=="currency"?e("td",{className:`px-6 py-1 ${n.class_name}`,children:e("div",{className:"whitespace-nowrap",children:e(i,{value:t[n.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},m):e("td",{className:"px-6 py-1",children:e("div",{className:`${n.class_name} `,children:t[n.column]})},m))]},r))});return a(M,{loading:O,auth:b.auth,errors:b.errors,header:a(j,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Bon Panjer"}),a("form",{className:"ml-auto flex gap-3 items-center",children:[e(F,{value:x.transaction_month,options:B,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:f}),e(F,{value:x.transaction_year,options:P,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:f}),e(Y,{href:route("bonpanjer.bon_panjer"),title:"Go",size:"sm",type:"submit",theme:"green"}),e(C,{href:route("bonpanjer.bon_panjer_create"),title:"+ New",size:"sm",type:"button",theme:"yellow"}),e(C,{href:route("bonpanjer.bon_panjer"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:e(Q,{})})]})]}),children:[e("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:o&&e("div",{className:"inline-block mt-3",children:o.map(t=>t.column==""?null:a("div",{className:"flex items-center justify-start space-y-2",children:[a("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(U,{})}),a("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),a("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>E(t.column),children:e($,{})})]}))})}),e("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6 overflow-auto",children:a("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:a("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),_.map((t,r)=>a("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,y.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:y.orderby}),s.column==t.column&&z()]},r))]})}),V(),e("tfoot",{children:a("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-6 py-1",colSpan:"7",children:"TOTAL"}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(i,{value:c.nominal_pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(i,{value:c.saldo_bulan_lalu,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(i,{value:c.setoran_bulan_ini,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(i,{value:c.total_setoran,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(i,{value:c.saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})})]})})]})})]})};export{ke as default};
