import{r as c,a as e,j as a,F as y,g as E,d as L}from"./app-fdf32284.js";import{L as B}from"./LinkButton-e69c67f9.js";import{P as R}from"./PrimaryButton-fbe0e362.js";import{S as z}from"./SelectList-d5ab8794.js";import{u as M}from"./useFilteredComplains-6097cd28.js";import{A as Y}from"./AuthenticatedLayout-be8fc0da.js";import{d as $}from"./dayjs.min-31ed4c85.js";import{h as J,e as K,i as V,j as G,a as U}from"./index.esm-c6a4065a.js";import{c as W}from"./SweetAlert-b7460ca0.js";import{I as q}from"./index.esm-7701bb31.js";import{N}from"./react-number-format.es-0e05323f.js";import"./index.esm-b765cddd.js";import"./iconBase-e489749e.js";import"./Loading-ca7ddf5b.js";import"./transition-d829c033.js";const fe=({branch:w,server_filters:k,datas:H,...h})=>{const{filters:o,setFilters:d,orderData:b,setOrderData:u,currentPage:S,setCurrentPage:X,displayData:f,totalPages:Z,handlePageChange:ee}=M({},20),[s,C]=c.useState(""),[n,m]=c.useState({column:"",operators:"1",values:""}),[F,p]=c.useState(!1),g=(t,l="text")=>{C({column:t,format:l})};c.useEffect(()=>{const t=JSON.parse(localStorage.getItem("dashboard_simpanan_karyawan"));t&&Object.keys(t).length>0&&d(t)},[]),c.useEffect(()=>{localStorage.setItem("dashboard_simpanan_karyawan",JSON.stringify(o))},[o]),c.useEffect(()=>{const t=l=>{l.target.tagName=="TH"?(g(l.target.getAttribute("data-item"),l.target.getAttribute("data-format")),m({...n,column:l.target.getAttribute("data-item")})):g("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const j=w.map(t=>({id:t.id,value:t.id,display:t.unit})),P=()=>{const t=[...o],l=t.findIndex(r=>r.column===n.column);l!==-1?t[l]=n:t.push(n),d(t)},A=t=>{[...o];const l=o.filter(r=>r.column!==t);d(l)},_=t=>{const{name:l,value:r,type:i}=t.target;let v=r;i==="number"&&(v=parseInt(r)),m({...n,[l]:v})},D=t=>{t.preventDefault(),p(!0),E.visit(route("simpanan.index"),{data:{branch_id:t.target.value}})},I=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:a("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[a("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:n.column,onChange:t=>m({...n,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),a("div",{className:"flex flex-col-reverse",children:[a("select",{name:"operators",value:n.operators,onChange:t=>m({...n,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),a("div",{className:"flex flex-col-reverse",children:[e("input",{value:n.values,type:s.format=="number"?"number":s.format=="date"?"date":s.format=="currency"?"number":"text",onChange:_,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),a("div",{className:"flex items-center justify-center",children:[e("button",{onClick:P,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>u({column:s.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(V,{})}),e("button",{onClick:()=>u({column:s.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(G,{})})]})]})})}),x=[{title:"Wilayah",column:"wilayah"},{title:"Unit",column:"unit",nowrap:!0,className:"whitespace-nowrap"},{title:"Nama Karyawan",column:"nama",nowrap:!0},{title:"Jabatan",column:"jabatan"},{title:"Tanggal Tabungan",column:"tanggal_tabungan",format:"date"},{title:"Simpanan Wajib",column:"saldo_sw",format:"currency",className:"bg-green-200 font-semibold"},{title:"Simpanan Sukarela",column:"saldo_sk",format:"currency",className:"bg-green-200 font-semibold"},{title:"Status Karyawan",column:"status_karyawan"}],O=()=>f.length===0?e(y,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:f.map((t,l)=>a("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-sm",children:[e("th",{className:"px-6 py-1",children:a("div",{className:"flex justify-around items-center gap-3",children:[(S-1)*20+l+1,e(L,{href:route("simpanan.transaksi",t.id),children:e(U,{className:"text-blue-500 hover:cursor-pointer"})})]})}),x.map((r,i)=>r.format=="date"?e("td",{className:`px-6 py-1 ${r.className} `,children:e("div",{children:t[r.column]!=="-"?$(t[r.column]).format("DD-MM-YYYY"):"-"})},i):r.format=="currency"?r.column==="saldo_akhir"?e("td",{className:`bg-green-200 px-6 py-1 ${r.className}`,children:e("div",{children:e(N,{value:t[r.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},i):e("td",{className:`px-6 py-1 ${r.className} `,children:e("div",{children:e(N,{value:t[r.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},i):e("td",{className:`px-6 py-1 ${r.className} `,children:e("div",{children:t[r.column]})},i))]},l))}),T=()=>{p(!0),localStorage.setItem("dashboard_simpanan_karyawan",null),d([{column:"",operators:"1",values:""}]),u({column:"",orderby:""}),setTimeout(()=>{p(!1)},500)};return e(Y,{loading:F,auth:h.auth,errors:h.errors,header:a(y,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Karyawan"}),e("div",{className:"ml-auto flex items-center"})]}),children:a("div",{className:"mx-auto sm:px-6 lg:px-8",children:[a("div",{className:"p-3 bg-white rounded shadow",children:[a("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:[e("div",{children:e(z,{value:k,options:j,nullValue:!0,onChange:D})}),a("div",{className:"flex items-center gap-3",children:[e(R,{onClick:T,size:"sm",theme:"other",icon:e(W,{}),title:"Reset"}),e(B,{as:"button",href:route("simpanan.create"),icon:e(q,{}),size:"md",title:"Tambah"})]})]}),o&&e("div",{className:"inline-block mt-3",children:o.map(t=>t.column==""?null:a("div",{className:"flex items-center justify-start space-y-2",children:[a("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(J,{})}),a("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),a("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>A(t.column),children:e(K,{})})]}))})]}),e("div",{className:"h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto",children:a("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:a("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),x.map((t,l)=>a("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,b.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:b.orderby}),s.column==t.column&&I()]},l))]})}),O()]})})]})})};export{fe as default};