import{r as _,a as r,j as e}from"./app-9ebf769c.js";import{A as g,C as d}from"./AuthenticatedLayout-24a86f0d.js";import{u as S,D as t}from"./useFilter-eb84ef94.js";import{F as N}from"./FilterBox-18c80f5e.js";import{S as v}from"./Search-c8f48bb6.js";import{d as k}from"./dayjs.min-312ec6ad.js";import{N as a}from"./react-number-format.es-5b2e0b92.js";import"./transition-0247d4df.js";import"./Loading-d148a701.js";import"./iconBase-65420739.js";import"./index.esm-248cfe20.js";import"./index.esm-28d8e751.js";import"./InputLabel-47189f62.js";import"./PrimaryButton-29581f6d.js";import"./SelectList-714b7fc3.js";import"./TextInput-5c77428e.js";import"./useServerFilter-fa43e14d.js";import"./ButtonWrapper-a1f738f6.js";const U=({server_filters:T,datas:o,...K})=>{const i=[{type:"default",headers:{filterable:"no",name:"Wilayah",column:"wilayah",type_date:"text"}},{type:"default",headers:{filterable:"no",name:"Bulan",column:"bulan",class_name:"whitespace-nowrap",type_date:"text"}},{type:"default",headers:{filterable:"no",name:"Simpanan SW",column:"balance_before_sw",format:"currency",class_name:"bg-gray-100 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Simpanan SK",column:"balance_before_sk",format:"currency",class_name:"bg-gray-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Debit SW",column:"debit_sw",format:"currency",class_name:"bg-green-100 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Debit SK",column:"debit_sk",format:"currency",class_name:"bg-green-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Kredit SW",column:"kredit_sw",format:"currency",class_name:"bg-red-100 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Kredit SK",column:"kredit_sk",format:"currency",class_name:"bg-red-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Saldo SW",column:"balance_sw",format:"currency",class_name:"bg-green-100 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Saldo SK",column:"balance_sk",format:"currency",class_name:"bg-green-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Saldo Global",column:"saldo_global",format:"currency",class_name:"bg-blue-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Setoran SW (D)",column:"D_sw",format:"currency",class_name:"bg-emerald-50"}},{type:"default",headers:{filterable:"no",name:"Setoran SK (D)",column:"D_sk",format:"currency",class_name:"bg-emerald-50"}},{type:"default",headers:{filterable:"no",name:"Debit Mutasi SW (D)",column:"DM_sw",format:"currency",class_name:"bg-emerald-50"}},{type:"default",headers:{filterable:"no",name:"Debit Mutasi SK (D)",column:"DM_sk",format:"currency",class_name:"bg-emerald-50"}},{type:"default",headers:{filterable:"no",name:"Pengambilan SW (K)",column:"K_sw",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Pengambilan SK (K)",column:"K_sk",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Kredit Mutasi SW (K)",column:"KM_sw",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Kredit Mutasi SK (K)",column:"KM_sk",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Kredit Resign / M SW (K)",column:"KRMD_sw",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Kredit Resign / MD SK (K)",column:"KRMD_sk",format:"currency",class_name:"bg-rose-50"}}],[c,m]=_.useState(!1),{showFilter:h,setShowFilter:u,filter:y,whenFilterrAdding:b,addFilter:x,setAddFilter:f,removeFilter:w,returnedData:n,currentPage:D,totalPages:R,handlePageChange:M,totals:s}=S(o,100,"sksw_global");return r(g,{loading:c,children:[e(N,{show:h,setShow:u,whenFilterrAdding:b,addFilter:x,setAddFilter:f}),r(d,{judul:"Saldo Global SKSW",children:[e(d.subTitle,{children:r("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[e(d.startContent,{className:"flex-wrap mb-3 lg:mb-0",children:e(d.filterItem,{filter:y,removeFilter:w})}),e(d.endContent,{className:"flex-wrap",children:e(v,{loading:c,setLoading:m,urlLink:route("sksw.global"),localState:"sksw_global",availableMonth:!0})})]})}),r(t,{children:[e(t.thead,{children:i.map((l,p)=>e(t.th,{type:l.type,headers:l.headers},p))}),e(t.tbody,{children:n==null?void 0:n.map((l,p)=>r(t.tr,{children:[e(t.td,{className:"text-center",children:l.wilayah}),e(t.td,{className:"text-center",children:k(l.bulan).format("MMM/YYYY")}),e(t.td,{className:"text-end bg-yellow-100",children:e(a,{value:l.balance_before_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-yellow-200",children:e(a,{value:l.balance_before_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-100",children:e(a,{value:l.debit_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-200",children:e(a,{value:l.debit_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-red-100",children:e(a,{value:l.kredit_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-red-200",children:e(a,{value:l.kredit_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-100",children:e(a,{value:l.balance_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-200",children:e(a,{value:l.balance_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-200",children:e(a,{value:l.saldo_global,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.D_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.D_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.DM_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.DM_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.K_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.K_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.K_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.K_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.KRMD_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-50",children:e(a,{value:l.KRMD_sk,displayType:"text",thousandSeparator:","})})]},p))}),e("tfoot",{className:"sticky bottom-0 left-0 w-full bg-gray-300 shadow border-t border-t-white text-end",children:r("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-3 py-1",colSpan:2,children:"TOTAL"}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.balance_before_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.balance_before_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-400 text-white",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.debit_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.debit_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.kredit_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.kredit_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.balance_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.balance_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.saldo_global,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.D_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.D_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.DM_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.DM_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.K_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.K_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.KM_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.KM_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.KRMD_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap",children:e(a,{value:s.KRMD_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})})]})})]})]})]})};export{U as default};
