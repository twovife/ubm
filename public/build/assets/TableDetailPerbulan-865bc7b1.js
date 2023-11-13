import{r as i,j as r,F as v,a as t,d as M}from"./app-74115d92.js";import{L as I}from"./LinkButton-7ed25237.js";import{P as O}from"./PrimaryButton-8497ebed.js";import{u as E}from"./useFilteredComplains-3432ba1c.js";import{B}from"./SweetAlert-1d21bf1f.js";import{d as R,e as T,f as _,g as z,a as Y}from"./index.esm-b88708b1.js";import"./Loading-d1f3b166.js";import{d as L}from"./dayjs.min-e1496186.js";import{I as $}from"./index.esm-18304a2b.js";import{N as G}from"./react-number-format.es-4b5af035.js";import"./transition-1f17abed.js";import"./iconBase-ccb78d59.js";const ce=({data:w,branch:N,loading:J,setLoading:b})=>{const k=w.data,p=50,{filters:n,setFilters:u,orderData:g,setOrderData:m,currentPage:F,setCurrentPage:U,displayData:h,totalPages:V,handlePageChange:q}=E({},p,k),[s,S]=i.useState(""),[o,d]=i.useState({column:"",operators:"1",values:""}),f=(e,a="text")=>{S({column:e,format:a})};i.useEffect(()=>{const e=JSON.parse(localStorage.getItem("detail_perbulan"));e&&Object.keys(e).length>0&&u(e)},[]),i.useEffect(()=>{localStorage.setItem("detail_perbulan",JSON.stringify(n))},[n]),i.useEffect(()=>{const e=a=>{a.target.tagName=="TH"?(f(a.target.getAttribute("data-item"),a.target.getAttribute("data-format")),d({...o,column:a.target.getAttribute("data-item")})):f("")};return window.addEventListener("click",e),()=>{window.removeEventListener("click",e)}}),N.map(e=>({id:e.wilayah,value:e.wilayah,display:`wilayah ${e.wilayah}`}));const C=()=>{const e=[...n],a=e.findIndex(l=>l.column===o.column);a!==-1?e[a]=o:e.push(o),u(e)},D=e=>{const a=[...n];console.log(a);const l=n.filter(c=>c.column!==e);u(l)},P=e=>{const{name:a,value:l,type:c}=e.target;let y=l;c==="number"&&(y=parseInt(l)),d({...o,[a]:y})},j=()=>{b(!0),localStorage.setItem("detail_perbulan",null),u([{column:"",operators:"1",values:""}]),m({column:"",orderby:""}),setTimeout(()=>{b(!1)},500)},A=()=>t("div",{className:"fixed text-white top-1/2 left-1/2 -translate-x-1/2",onClick:e=>e.stopPropagation(),children:t("div",{className:"bg-white border border-gray-300 rounded-lg shadow-lg",children:r("div",{className:"flex justify-end items-center text-2xl px-2 py-4",children:[r("div",{className:"flex flex-col-reverse",children:[t("input",{name:"column",value:o.column,onChange:e=>d({...o,column:e.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/column"}),t("label",{className:"text-gray-400 text-xs font-semibold peer-focus/column:text-blue-500",children:"Column"})]}),r("div",{className:"flex flex-col-reverse",children:[r("select",{name:"operators",value:o.operators,onChange:e=>d({...o,operators:e.target.value}),className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:outline-none focus:border-b-2 focus:border-b-blue-500 focus:ring-0 peer/operator",children:[t("option",{value:"1",children:"contains"}),t("option",{value:"2",children:"equal"})]}),t("label",{className:"text-gray-400 text-xs font-semibold peer-focus/operator:text-blue-500",children:"Operator"})]}),r("div",{className:"flex flex-col-reverse",children:[t("input",{value:o.values,type:s.format=="number"?"number":s.format=="date"?"date":s.format=="currency"?"number":"text",onChange:P,name:"values",className:"border-0 border-b border-b-gray-400 text-black font-light text-sm px-1.5 py-1.5 focus:bg-gray-100 focus:outline-none focus:border-b-2 focus:border-b-blue-500 peer/value"}),t("label",{className:"text-gray-400 text-xs font-semibold peer-focus/value:text-blue-500",children:"Value"})]}),r("div",{className:"flex items-center justify-center",children:[t("button",{onClick:C,className:"text-black text-xs border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-2 rounded-lg",children:"Go"}),t("button",{onClick:()=>m({column:s.column,orderby:"asc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-3",children:t(_,{})}),t("button",{onClick:()=>m({column:s.column,orderby:"desc"}),className:"text-black border border-main-500 hover:bg-main-500 hover:text-white focus:bg-main-500 focus:text-white p-1 rounded-lg ml-1",children:t(z,{})})]})]})})}),x=[{title:"Wilayah",column:"wilayah"},{title:"Unit",column:"unit",nowrap:!0},{title:"Bulan",column:"bulan",nowrap:!0},{title:"Nama Karyawan",column:"nama_karyawan"},{title:"Saldo Sebelumnya",column:"balance_before",format:"currency",backgroundcolumn:"bg-gray-100"},{title:"Debit",column:"debit",format:"currency",backgroundcolumn:"bg-green-200"},{title:"Kredit",column:"kredit",format:"currency",backgroundcolumn:"bg-red-200"},{title:"Saldo",column:"balance",format:"currency",backgroundcolumn:"bg-green-200"},{title:"Setoran (D)",column:"D",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Debit Mutasi (D)",column:"DM",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Pengambilan (K)",column:"K",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Kredit Mutasi (K)",column:"KM",format:"currency",backgroundcolumn:"bg-yellow-100"},{title:"Kredit Resigm / MD (K)",column:"KRMD",format:"currency",backgroundcolumn:"bg-yellow-100"}],K=()=>h.length===0?t(v,{children:t("tbody",{children:t("tr",{children:t("td",{colSpan:"2",children:"Data Not Found"})})})}):t("tbody",{children:h.map((e,a)=>r("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-xs",children:[t("th",{className:"px-6 py-1",children:r("div",{className:"flex justify-around items-center gap-3",children:[(F-1)*p+a+1,t(M,{href:route("simpanan.transaksi",e.id_tabungan),children:t(Y,{className:"text-blue-500 hover:cursor-pointer"})})]})}),x.map((l,c)=>l.format=="date"?t("td",{className:"px-6 py-1",children:t("div",{className:"whitespace-pre-wrap",children:e[l.column]!=="-"?L(e[l.column]).format("DD-MM-YYYY"):"-"})},c):l.format=="currency"?t("td",{className:`px-6 py-1 ${l.backgroundcolumn?l.backgroundcolumn:""}`,children:t("div",{className:"whitespace-nowrap",children:t(G,{value:e[l.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})})},c):t("td",{className:"px-6 py-1",children:t("div",{className:`${l.nowrap?"whitespace-nowrap":"whitespace-pre-wrap"} `,children:e[l.column]})},c))]},a))});return r(v,{children:[r("div",{className:"p-3 bg-white rounded shadow",children:[r("div",{className:"flex flex-col lg:flex-row lg:justify-between justify-center items-center mt-3 gap-3",children:[t("div",{}),r("div",{className:"flex items-center gap-3",children:[t(O,{onClick:j,size:"sm",theme:"other",icon:t(B,{}),title:"Reset"}),t(I,{as:"button",href:route("simpanan.create"),icon:t($,{}),size:"md",title:"Tambah"})]})]}),n&&t("div",{className:"inline-block mt-3",children:n.map(e=>e.column==""?null:r("div",{className:"flex items-center justify-start space-y-2",children:[r("div",{className:"border rounded flex items-center",children:[t("div",{className:"p-2 text-lg bg-green-400 text-white",children:t(R,{})}),r("div",{className:"px-3 text-sm text-main-500",children:[t("span",{className:"mr-1 capitalize ",children:e.column}),t("span",{className:"mr-1 capitalize ",children:e.operators==1?"Contains":"="}),r("span",{children:["'",e.values,"'"]})]})]}),t("div",{className:"hover:border hover:bg-gray-300 hover:cursor-pointer rounded p-1 ml-2",onClick:()=>D(e.column),children:t(T,{})})]}))})]}),t("div",{className:"h-[70vh] p-3 mt-3 bg-white rounded shadow overflow-auto",children:r("table",{className:"w-full text-sm text-left text-gray-500",children:[t("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:r("tr",{children:[t("th",{className:"px-6 py-4",children:"Nomor"}),x.map((e,a)=>r("th",{"data-item":e.column,"data-format":e.format??"text",scope:"col",className:"px-6 py-4 hover:bg-main-500 hover:text-white hover:cursor-pointer",children:[e.title,g.column==e.column&&t("span",{className:"ml-1 text-blue-400 italic",children:g.orderby}),s.column==e.column&&A()]},a))]})}),K()]})})]})};export{ce as default};
