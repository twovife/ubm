import{r as d,a as r,j as e,b as F}from"./app-4f05f94d.js";import{A as j,C as s}from"./AuthenticatedLayout-4d3d24c0.js";import{D as t}from"./DefaultTable-1c49f161.js";import{F as C}from"./FilterBox-e586a792.js";import{P as Y}from"./PrimaryButton-98ce0df1.js";import{S as D}from"./Search-fff9f1bb.js";import{u as A}from"./useFilter-f9e59ffc.js";import{d as u}from"./dayjs.min-65dd6782.js";import{N as l}from"./react-number-format.es-386b16ca.js";import M from"./Create-8d6173ba.js";import"./transition-cc305502.js";import"./Loading-f0e3f8f8.js";import"./iconBase-41b361e6.js";import"./index.esm-1b68e9a9.js";import"./index.esm-ee5137ef.js";import"./InputLabel-64407202.js";import"./SelectList-e6bf5ee2.js";import"./TextInput-a0b3ec1e.js";import"./useServerFilter-43a566ce.js";import"./ButtonWrapper-e9d9afef.js";import"./InputError-57bfbd48.js";import"./index.esm-7f00a46f.js";const se=({branch:B,server_filters:E,datas:c,...R})=>{const[p,b]=d.useState(!1),[y,f]=d.useState([]);d.useEffect(()=>{f(c)},[c]);const{showFilter:x,setShowFilter:w,filter:g,whenFilterrAdding:N,addFilter:_,setAddFilter:S,removeFilter:k,returnedData:o,totals:i}=A(y,100,"sksw_dashboardnon"),T=[{type:"nested",sticky:!0,headers:[{name:"No",filterable:"no"},{name:"Nama",filterable:"yes",column:"nama",type_date:"text"}]},{type:"default",headers:{name:"Wilayah",filterable:"yes",column:"wilayah",type_date:"number"}},{type:"default",headers:{name:"Unit",filterable:"yes",column:"unit",type_date:"text"}},{type:"default",headers:{name:"Status Karyawan",filterable:"no",column:"status_karyawan"}},{type:"default",headers:{name:"Tanggal Masuk",filterable:"yes",column:"hiredate",type_date:"date"}},{type:"default",headers:{name:"Jabatan",filterable:"yes",column:"jabatan",type_date:"date"}},{type:"default",headers:{name:"Tanggal Tabungan",filterable:"yes",column:"tanggal_tabungan",type_date:"date"}},{type:"default",headers:{name:"Simpanan Wajib Terakhir",filterable:"yes",column:"saldo_sw",type_date:"number"}},{type:"default",headers:{name:"Simpanan Sukarela Terakhir",filterable:"yes",column:"saldo_sk",type_date:"number"}},{type:"default",headers:{name:"Total Simpanan Terakhir",filterable:"yes",column:"total_saldo",type_date:"number"}}],[h,v]=d.useState(!1),m=a=>{v(!h)};return r(j,{loading:p,children:[e(C,{show:x,setShow:w,whenFilterrAdding:N,addFilter:_,setAddFilter:S}),r(s,{judul:"SKSW Non Aktif",children:[e(s.subTitle,{children:r("div",{className:"flex flex-col items-center gap-3 lg:flex-row lg:justify-between",children:[e(s.startContent,{className:"flex-wrap mb-3 lg:mb-0",children:e(s.filterItem,{filter:g,removeFilter:k})}),e(s.endContent,{className:"flex-wrap",children:e(D,{loading:p,setLoading:b,urlLink:route("sksw.dashboard_nonaktif"),localState:"sksw_dashboardnon",availableBranch:!0,children:e(Y,{onClick:m,className:"block",title:"Tambah Baru"})})})]})}),r(t,{children:[e(t.thead,{children:T.map((a,n)=>e(t.th,{type:a.type,headers:a.headers},n))}),e(t.tbody,{children:o==null?void 0:o.map((a,n)=>r(t.tr,{children:[r(t.td,{nested:!0,children:[e("div",{className:"col-span-1 px-3 py-1.5 whitespace-nowrap text-center ",children:r(F,{href:route("sksw.transaksi",a.id),className:"text-blue-500 hover:bg-blue-500 hover:text-white  focus:bg-blue-500 focus:text-white text-center px-1 py-0.5 rounded",children:[e("span",{children:n+1}),e("span",{className:"hidden ml-2 lg:inline-block",children:"Edit"})]})}),e("div",{className:"col-span-4 px-3 py-1.5 whitespace-nowrap",children:a.nama})]}),e(t.td,{className:"text-center",children:a.wilayah}),e(t.td,{className:"text-center",children:a.unit}),e(t.td,{className:"text-center",children:a.status_karyawan}),e(t.td,{className:"text-center",children:u(a.hiredate).format("DD/MM/YYYY")}),e(t.td,{className:"text-center",children:a.jabatan}),e(t.td,{className:"text-center",children:u(a.tanggal_tabungan).format("DD/MM/YYYY")}),e(t.td,{className:"text-end bg-green-200 border",children:e(l,{value:a.saldo_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-200 border",children:e(l,{value:a.saldo_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-200 border",children:e(l,{value:a.total_saldo,displayType:"text",thousandSeparator:","})})]},n))}),e("tfoot",{className:"sticky bottom-0 left-0 w-full bg-gray-300 border-t shadow border-t-white",children:r("tr",{children:[e("td",{className:"px-2 py-1.5 text-center font-bold",colSpan:7,children:"Total"}),e("td",{className:"px-2 py-1.5 text-end bg-green-300 border",children:e(l,{value:i.saldo_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),e("td",{className:"px-2 py-1.5 text-end bg-green-300 border",children:e(l,{value:i.saldo_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),e("td",{className:"px-2 py-1.5 text-end text-white font-semibold bg-green-600 border",children:e(l,{value:i.total_saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})})]})]}),e(M,{show:h,showHandler:m}),";"]})};export{se as default};
