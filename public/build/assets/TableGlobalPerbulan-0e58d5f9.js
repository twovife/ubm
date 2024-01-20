import{r as i,j as a,F as N,a as e}from"./app-8b2c8f5a.js";import{L as K}from"./LinkButton-98fabd78.js";import{P as M}from"./PrimaryButton-33b1c72b.js";import{u as I}from"./useFilteredComplains-54c225a1.js";import"./SweetAlert-e0eb17e7.js";import{d as O,e as B,f as E,g as R}from"./index.esm-58292b62.js";import{B as T}from"./index.esm-e8f97965.js";import"./Loading-e3459361.js";import{d as z}from"./dayjs.min-eb231bb4.js";import{I as Y}from"./index.esm-30b91dde.js";import{N as G}from"./react-number-format.es-fe0672b4.js";import"./transition-9291623c.js";import"./iconBase-65c2d3e9.js";const le=({data:w,loading:L,setLoading:b})=>{const p=w.data;console.log(p);const g=50,{filters:n,setFilters:m,orderData:f,setOrderData:d,currentPage:k,setCurrentPage:J,displayData:h,totalPages:U,handlePageChange:V}=I({},g,p),[s,S]=i.useState(""),[l,u]=i.useState({column:"",operators:"1",values:""}),x=(t,r="text")=>{S({column:t,format:r})};i.useEffect(()=>{const t=JSON.parse(localStorage.getItem("complainfilter"));t&&Object.keys(t).length>0&&m(t)},[]),i.useEffect(()=>{localStorage.setItem("complainfilter",JSON.stringify(n))},[n]),i.useEffect(()=>{const t=r=>{r.target.tagName=="TH"?(x(r.target.getAttribute("data-item"),r.target.getAttribute("data-format")),u({...l,column:r.target.getAttribute("data-item")})):x("")};return window.addEventListener("click",t),()=>{window.removeEventListener("click",t)}});const F=()=>{const t=[...n],r=t.findIndex(o=>o.column===l.column);r!==-1?t[r]=l:t.push(l),m(t)},C=t=>{const r=[...n];console.log(r);const o=n.filter(c=>c.column!==t);m(o)},D=t=>{const{name:r,value:o,type:c}=t.target;let v=o;c==="number"&&(v=parseInt(o)),u({...l,[r]:v})},P=()=>{b(!0),localStorage.setItem("complainfilter",null),m([{column:"",operators:"1",values:""}]),d({column:"",orderby:""}),setTimeout(()=>{b(!1)},500)},j=()=>e("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:t=>t.stopPropagation(),children:e("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:a("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[a("div",{className:"flex flex-col-reverse",children:[e("input",{name:"column",value:l.column,onChange:t=>u({...l,column:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),a("div",{className:"flex flex-col-reverse",children:[a("select",{name:"operators",value:l.operators,onChange:t=>u({...l,operators:t.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[e("option",{value:"1",children:"contains"}),e("option",{value:"2",children:"equal"})]}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),a("div",{className:"flex flex-col-reverse",children:[e("input",{value:l.values,type:s.format=="number"?"number":s.format=="date"?"date":s.format=="currency"?"number":"text",onChange:D,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),e("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),a("div",{className:"flex items-center justify-center",children:[e("button",{onClick:F,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),e("button",{onClick:()=>d({column:s.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:e(E,{})}),e("button",{onClick:()=>d({column:s.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:e(R,{})})]})]})})}),y=[{title:"Wilayah",column:"wilayah"},{title:"Unit",column:"unit",nowrap:!0},{title:"Bulan",column:"bulan",nowrap:!0},{title:"Nama Karyawan",column:"nama_karyawan"},{title:"Saldo Sebelumnya",column:"balance_before",format:"currency",backgroundcolumn:"bg-gray-100"},{title:"Debit",column:"debit",format:"currency",backgroundcolumn:"bg-green-200"},{title:"Kredit",column:"kredit",format:"currency",backgroundcolumn:"bg-red-200"},{title:"Saldo",column:"balance",format:"currency",backgroundcolumn:"bg-green-200"},{title:"Setoran (D)",column:"D",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Debit Mutasi (D)",column:"DM",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Pengambilan (K)",column:"K",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Kredit Mutasi (K)",column:"KM",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Kredit Resigm / MD (K)",column:"KRMD",format:"currency",backgroundcolumn:"bg-yellow-100"}],A=()=>h.length===0?e(N,{children:e("tbody",{children:e("tr",{children:e("td",{colSpan:"2",children:"Data Not Found"})})})}):e("tbody",{children:h.map((t,r)=>a("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-xs",children:[e("th",{className:"px-6 py-1",children:e("div",{className:"flex justify-around items-center gap-3",children:(k-1)*g+r+1})}),y.map((o,c)=>o.format=="date"?e("td",{className:"px-6 py-1",children:e("div",{className:"whitespace-pre-wrap",children:t[o.column]!=="-"?z(t[o.column]).format("DD-MM-YYYY"):"-"})},c):o.format=="currency"?e("td",{className:`px-6 py-1 ${o.backgroundcolumn?o.backgroundcolumn:""}`,children:e("div",{className:"whitespace-nowrap",children:e(G,{value:t[o.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},c):e("td",{className:"px-6 py-1",children:e("div",{className:`${o.nowrap?"whitespace-nowrap":"whitespace-pre-wrap"} `,children:t[o.column]})},c))]},r))});return a(N,{children:[a("div",{className:"p-3 bg-white rounded shadow",children:[a("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:[e("div",{}),a("div",{className:"flex items-center gap-3",children:[e(M,{onClick:P,size:"sm",theme:"other",icon:e(T,{}),title:"Reset"}),e(K,{as:"button",href:route("simpanan.create"),icon:e(Y,{}),size:"md",title:"Tambah"})]})]}),n&&e("div",{className:"inline-block mt-3",children:n.map(t=>t.column==""?null:a("div",{className:"flex items-center justify-start space-y-2",children:[a("div",{className:"border rounded flex items-center",children:[e("div",{className:"p-2 text-lg bg-green-400 text-white",children:e(O,{})}),a("div",{className:"px-3 text-sm text-main-500",children:[e("span",{className:"mr-1 capitalize ",children:t.column}),e("span",{className:"mr-1 capitalize ",children:t.operators==1?"Contains":"="}),a("span",{children:["'",t.values,"'"]})]})]}),e("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>C(t.column),children:e(B,{})})]}))})]}),e("div",{className:"h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto",children:a("table",{className:"w-full text-sm text-left text-gray-500",children:[e("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:a("tr",{children:[e("th",{className:"px-6 py-4",children:"Nomor"}),y.map((t,r)=>a("th",{"data-item":t.column,"data-format":t.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[t.title,f.column==t.column&&e("span",{className:"ml-1 text-blue-400 italic",children:f.orderby}),s.column==t.column&&j()]},r))]})}),A()]})})]})};export{le as default};
