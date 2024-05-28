import{r as m,a as r,j as e,d as v}from"./app-80d7f38d.js";import{C as s}from"./Navbar-c15fffa2.js";import{D as t}from"./DefaultTable-0d2c3cf2.js";import{F as T}from"./FilterBox-bcc0bbdb.js";import{P as C}from"./PrimaryButton-4e1f76cb.js";import{S as F}from"./Search-e67ecb0a.js";import{u as j}from"./useFilter-dcb718a1.js";import{A as Y}from"./AuthenticatedLayout-68da6f5c.js";import{d as h}from"./dayjs.min-0d14d287.js";import{N as l}from"./react-number-format.es-54631598.js";import D from"./Create-a4fb1600.js";import"./index.esm-c12926dd.js";import"./iconBase-b11e7b39.js";import"./index.esm-8607bf00.js";import"./transition-2bc3fe83.js";import"./index.esm-22a394bb.js";import"./InputLabel-9f21d199.js";import"./SelectList-0c5ae4ac.js";import"./TextInput-63fb0233.js";import"./useServerFilter-fbd363eb.js";import"./Loading-6e06328d.js";import"./InputError-5c6efaae.js";import"./index.esm-37d45db7.js";const de=({branch:M,server_filters:P,datas:u,...A})=>{const[i,y]=m.useState(!1),{showFilter:b,setShowFilter:f,filter:x,whenFilterrAdding:g,addFilter:w,setAddFilter:N,removeFilter:_,returnedData:d,currentPage:B,totalPages:K,handlePageChange:R,totals:o}=j(u,100,"sksw_dashboard"),S=[{type:"nested",sticky:!0,headers:[{name:"No",filterable:"no"},{name:"Nama",filterable:"yes",column:"nama",type_date:"text"}]},{type:"default",headers:{name:"Wilayah",filterable:"yes",column:"wilayah",type_date:"number"}},{type:"default",headers:{name:"Unit",filterable:"yes",column:"unit",type_date:"text"}},{type:"default",headers:{name:"Status Karyawan",filterable:"no",column:"status_karyawan"}},{type:"default",headers:{name:"Tanggal Masuk",filterable:"yes",column:"hiredate",type_date:"date"}},{type:"default",headers:{name:"Jabatan",filterable:"yes",column:"jabatan",type_date:"date"}},{type:"default",headers:{name:"Tanggal Tabungan",filterable:"yes",column:"tanggal_tabungan",type_date:"date"}},{type:"default",headers:{name:"Simpanan Wajib",filterable:"yes",column:"saldo_sw",type_date:"number"}},{type:"default",headers:{name:"Simpanan Sukarela",filterable:"yes",column:"saldo_sk",type_date:"number"}},{type:"default",headers:{name:"Total Simpanan",filterable:"yes",column:"total_saldo",type_date:"number"}}],[p,k]=m.useState(!1),c=a=>{k(!p)};return r(Y,{loading:i,children:[e(T,{show:b,setShow:f,whenFilterrAdding:g,addFilter:w,setAddFilter:N}),r(s,{judul:"SKSW Karyawan",children:[e(s.subTitle,{children:r("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[e(s.startContent,{className:"flex-wrap mb-3 lg:mb-0",children:e(s.filterItem,{filter:x,removeFilter:_})}),r(s.endContent,{className:"flex-wrap",children:[e(F,{loading:i,setLoading:y,urlLink:route("sksw.dashboard"),localState:"sksw_dashboard",availableBranch:!0}),e(C,{onClick:c,className:"block",title:"Tambah Baru"})]})]})}),r(t,{children:[e(t.thead,{children:S.map((a,n)=>e(t.th,{type:a.type,headers:a.headers},n))}),e(t.tbody,{children:d==null?void 0:d.map((a,n)=>r(t.tr,{children:[r(t.td,{nested:!0,children:[e("div",{className:"col-span-1 px-3 py-1.5 whitespace-nowrap text-center ",children:r(v,{href:route("sksw.transaksi",a.id),className:"text-blue-500 hover:bg-blue-500 hover:text-white  focus:bg-blue-500 focus:text-white text-center px-1 py-0.5 rounded",children:[e("span",{children:n+1}),e("span",{className:"hidden lg:inline-block ml-2",children:"Edit"})]})}),e("div",{className:"col-span-4 px-3 py-1.5 whitespace-nowrap",children:a.nama})]}),e(t.td,{className:"text-center",children:a.wilayah}),e(t.td,{className:"text-center",children:a.unit}),e(t.td,{className:"text-center",children:a.status_karyawan}),e(t.td,{className:"text-center",children:h(a.hiredate).format("DD/MM/YYYY")}),e(t.td,{className:"text-center",children:a.jabatan}),e(t.td,{className:"text-center",children:h(a.tanggal_tabungan).format("DD/MM/YYYY")}),e(t.td,{className:"text-end bg-green-200 border",children:e(l,{value:a.saldo_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-200 border",children:e(l,{value:a.saldo_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-200 border",children:e(l,{value:a.total_saldo,displayType:"text",thousandSeparator:","})})]},n))}),e("tfoot",{className:"sticky bottom-0 left-0 w-full bg-gray-300 shadow border-t border-t-white",children:r("tr",{children:[e("td",{className:"px-2 py-1.5 text-center font-bold",colSpan:7,children:"Total"}),e("td",{className:"px-2 py-1.5 text-end bg-green-300 border",children:e(l,{value:o.saldo_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),e("td",{className:"px-2 py-1.5 text-end bg-green-300 border",children:e(l,{value:o.saldo_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),e("td",{className:"px-2 py-1.5 text-end text-white font-semibold bg-green-600 border",children:e(l,{value:o.total_saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})})]})]}),e(D,{show:p,showHandler:c}),";"]})};export{de as default};