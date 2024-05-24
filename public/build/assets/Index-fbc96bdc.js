import{r as d,j as n,F as k,a as e,d as S}from"./app-577095aa.js";import{L as T}from"./LinkButton-c41e9ed7.js";import{P as V}from"./PrimaryButton-e87527a9.js";import{S as C}from"./SelectList-2f891eca.js";import{u as Y}from"./useBulanFilter-932b4e08.js";import{u as $}from"./useFilteredComplains-cf78722e.js";import{A as G}from"./AuthenticatedLayout-9a50dbde.js";import{d as J}from"./dayjs.min-a735f434.js";import{a as U,b as q,c as H,d as W}from"./index.esm-40d2e5fe.js";import{B as K}from"./index.esm-b887299b.js";import{N as c}from"./react-number-format.es-1fd40bc0.js";import"./Card-298928cd.js";import"./iconBase-0c341566.js";import"./transition-89244925.js";import"./index.esm-0a08b294.js";import"./index.esm-6cd27bff.js";import"./Loading-c8b73d4d.js";const je=({branch:F,server_filters:P,datas:h,...b})=>{const{tahunAngka:A,bulanAngka:O,serverFilter:f,setServerFilter:Q,onServerFilterChange:g,onBranchChange:X,branchess:Z,loading:B,setLoading:ee,activeTab:ae,setActiveTab:te,handleTabClick:re}=Y(P,route("pinjamanmodal.pinjaman_modal_store"),F,h,"wilayah"),x=100,{filters:o,setFilters:u,orderData:y,setOrderData:w,currentPage:R,setCurrentPage:ne,displayData:v,totalPages:le,handlePageChange:oe,totals:m}=$({},x,h),[s,D]=d.useState(""),[l,p]=d.useState({column:"",operators:"1",values:""}),N=(a,r="text")=>{D({column:a,format:r})};d.useEffect(()=>{const a=JSON.parse(localStorage.getItem("bonpanjer_1"));a&&Object.keys(a).length>0&&u(a)},[]),d.useEffect(()=>{localStorage.setItem("bonpanjer_1",JSON.stringify(o))},[o]),d.useEffect(()=>{const a=r=>{r.target.tagName=="TH"?(N(r.target.getAttribute("data-item"),r.target.getAttribute("data-format")),p({...l,column:r.target.getAttribute("data-item")})):N("")};return window.addEventListener("click",a),()=>{window.removeEventListener("click",a)}});const L=()=>{const a=[...o],r=a.findIndex(t=>t.column===l.column);r!==-1?a[r]=l:a.push(l),u(a)},E=a=>{[...o];const r=o.filter(t=>t.column!==a);u(r)},I=a=>{const{name:r,value:t,type:i}=a.target;let j=t;i==="number"&&(j=parseInt(t)),p({...l,[r]:j})},_=[{title:"Wilayah",column:"wilayah"},{title:"Unit",column:"branch",class_name:"whitespace-nowrap"},{title:"Action",column:"id_pinjaman_owner",class_name:"bg-green-100/80 whitespace-nowrap",format:"action"},{title:"Tanggal Transaksi Terakhir",column:"transaksi_terakhir_owner",class_name:"bg-green-100/80 whitespace-nowrap",format:"date"},{title:"Total Pinjaman",column:"nominal_pinjaman_owner",class_name:"bg-green-100/80 whitespace-nowrap",format:"currency"},{title:"Total Setoran Pinjaman",column:"total_setoran_pinjaman_owner",class_name:"bg-green-100/80 whitespace-nowrap",format:"currency"},{title:"Saldo Pinjaman",column:"saldo_pinjaman_owner",class_name:"bg-green-100/80 whitespace-nowrap",format:"currency"},{title:"Action",column:"id_pinjaman_pusat",class_name:"bg-yellow-100/60 whitespace-nowrap",format:"action"},{title:"Tanggal Transaksi Terakhir",column:"transaksi_terakhir_pusat",class_name:"bg-yellow-100/60 whitespace-nowrap",format:"date"},{title:"Total Pinjaman",column:"nominal_pinjaman_pusat",class_name:"bg-yellow-100/60 whitespace-nowrap",format:"currency"},{title:"Total Setoran Pinjaman",column:"total_setoran_pinjaman_pusat",class_name:"bg-yellow-100/60 whitespace-nowrap",format:"currency"},{title:"Saldo Pinjaman",column:"saldo_pinjaman_pusat",class_name:"bg-yellow-100/60 whitespace-nowrap",format:"currency"},{title:"Total Pinjaman",column:"total_pinjaman",class_name:"bg-blue-100 whitespace-nowrap",format:"currency"},{title:"Total Saldo Pinjaman",column:"total_saldo_pinjaman",class_name:"bg-blue-100 whitespace-nowrap",format:"currency"},{title:"Total Jasa Modala",column:"jasa_modal_owner",class_name:"bg-blue-100 whitespace-nowrap",format:"currency"}],z=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2 ",onClick:a=>a.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:n("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[n("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:l.column,onChange:a=>p({...l,column:a.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),n("div",{className:"flex flex-col-reverse",children:[n("select",{name:"operators",value:l.operators,onChange:a=>p({...l,operators:a.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),n("div",{className:"flex flex-col-reverse",children:[e("input",{value:l.values,type:s.format=="number"?"number":s.format=="date"?"date":s.format=="currency"?"number":"text",onChange:I,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),n("div",{className:"flex items-center justify-center",children:[e("button",{onClick:L,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>w({column:s.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(H,{})}),e("button",{onClick:()=>w({column:s.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(W,{})})]})]})})}),M=()=>v.length===0?e(k,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:v.map((a,r)=>n("tr",{className:"bg-white border-b hover:bg-blue-50 text-xs even:bg-gray-100",children:[e("th",{className:"px-6 py-1",children:(R-1)*x+r+1}),_.map((t,i)=>t.format=="action"?e("td",{className:`px-6 py-1  ${t.class_name}`,children:e("div",{className:"px-6 py-1",children:a[t.column]=="-"?e(S,{href:route("pinjamanmodal.pinjaman_modal_create"),className:"px-2 py-1 rounded-lg bg-red-500 text-white",children:"Pinjam"}):e(S,{href:route("pinjamanmodal.pinjaman_modal_show",a[t.column]),className:"px-2 py-1 rounded-lg bg-blue-500 text-white",children:"Bayar"})})},i):t.format=="date"?e("td",{className:`px-6 py-1 ${t.class_name}`,children:e("div",{className:"px-6 py-1 ",children:a[t.column]!=="-"?J(a[t.column]).format("DD-MM-YYYY"):"-"})},i):t.format=="currency"?e("td",{className:`px-6 py-1 ${t.class_name}`,children:e("div",{className:"whitespace-nowrap",children:e(c,{value:a[t.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},i):e("td",{className:"px-6 py-1",children:e("div",{className:`${t.class_name} `,children:a[t.column]})},i))]},r))});return n(G,{loading:B,auth:b.auth,errors:b.errors,header:n(k,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Pinjaman Modal"}),n("form",{className:"ml-auto flex gap-3 items-center",children:[e(C,{value:f.transaction_month,options:O,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:g}),e(C,{value:f.transaction_year,options:A,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:g}),e(V,{href:route("pinjamanmodal.pinjaman_modal"),title:"Go",size:"sm",type:"submit",theme:"green"}),e(T,{href:route("pinjamanmodal.pinjaman_modal_create"),title:"+ New",size:"sm",type:"button",theme:"yellow"}),e(T,{href:route("pinjamanmodal.pinjaman_modal"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:e(K,{})})]})]}),children:[e("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:o&&e("div",{className:"inline-block mt-3",children:o.map(a=>a.column==""?null:n("div",{className:"flex items-center justify-start space-y-2",children:[n("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(U,{})}),n("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:a.column}),e("span",{className:"mr-1 capitalize ",children:a.operators==1?"Contains":"="}),n("span",{children:["'",a.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>E(a.column),children:e(q,{})})]}))})}),e("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6 overflow-auto",children:n("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:n("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),_.map((a,r)=>n("th",{"data-item":a.column,"data-format":a.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[a.title,y.column==a.column&&e("span",{className:"ml-1 text-blue-400 italic",children:y.orderby}),s.column==a.column&&z()]},r))]})}),M(),e("tfoot",{children:n("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-6 py-1",colSpan:"5",children:"TOTAL"}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(c,{value:m.nominal_pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(c,{value:m.saldo_bulan_lalu,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(c,{value:m.setoran_bulan_ini,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(c,{value:m.total_setoran,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-nowrap",children:e(c,{value:m.saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})})]})})]})})]})};export{je as default};
