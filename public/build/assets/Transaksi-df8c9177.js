import{r as N,a as n,j as e}from"./app-df871abb.js";import{C as s}from"./Navbar-88a283a0.js";import{D as t}from"./DefaultTable-0fb01719.js";import{F as P}from"./FilterBox-19a992b0.js";import{S as v}from"./Search-4a1b8990.js";import{u as T}from"./useFilter-f1dac9b7.js";import{A as _}from"./AuthenticatedLayout-ddac043c.js";import{d as o}from"./dayjs.min-c46c4501.js";import{N as r}from"./react-number-format.es-cf93bc84.js";import"./iconBase-6f294e2e.js";import"./index.esm-6eb99c1e.js";import"./transition-0c33212e.js";import"./index.esm-a32ba1d8.js";import"./InputLabel-506b9b72.js";import"./PrimaryButton-2e9f3eea.js";import"./SelectList-d2279005.js";import"./TextInput-6df0972b.js";import"./useServerFilter-a6266122.js";import"./ButtonWrapper-424887ee.js";import"./Loading-0b0ba1ff.js";const Z=({server_filter:k,datas:c,saldo_akhir:S,...j})=>{const[p,h]=N.useState(!1),{showFilter:m,setShowFilter:u,filter:x,whenFilterrAdding:y,addFilter:f,setAddFilter:w,removeFilter:g,returnedData:d,currentPage:K,totalPages:D,handlePageChange:F,totals:l}=T(c,1e4,"pinjamanmodal_pinjaman_modal_transaksi"),b=[{type:"default",headers:{filterable:"no",name:"Bulan",column:"bulan"}},{type:"default",headers:{filterable:"no",name:"Tanggal",column:"transaction_date",class_name:"whitespace-nowrap",format:"date"}},{type:"default",headers:{filterable:"no",name:"Keterangan",column:"type_transaksi",class_name:"whitespace-nowrap"}},{type:"default",headers:{filterable:"yes",name:"Wilayah",column:"wilayah",type_date:"number"}},{type:"default",headers:{filterable:"no",name:"Unit",column:"unit"}},{type:"default",headers:{filterable:"no",name:"Keluar Pak Hertawan",column:"nama_karyawan"}},{type:"default",headers:{filterable:"no",name:"Masuk Pak Hertawan",column:"nama_karyawan"}},{type:"default",headers:{filterable:"no",name:"Keluar Pusat",column:"nama_karyawan"}},{type:"default",headers:{filterable:"no",name:"Masuk Pusat",column:"nama_karyawan"}},{type:"default",headers:{filterable:"no",name:"Total Keluar",column:"nama_karyawan"}},{type:"default",headers:{filterable:"no",name:"Total Masuk",column:"nama_karyawan"}},{type:"default",headers:{filterable:"no",name:"Jasa Modal",column:"nama_karyawan"}}];return n(_,{loading:p,children:[e(P,{show:m,setShow:u,whenFilterrAdding:y,addFilter:f,setAddFilter:w}),n(s,{judul:"Buku Transaksi 1JT",children:[e(s.subTitle,{children:n("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[e(s.startContent,{className:"flex-wrap mb-3 lg:mb-0",children:e(s.filterItem,{filter:x,removeFilter:g})}),e(s.endContent,{className:"flex-wrap",children:e(v,{loading:p,setLoading:h,urlLink:route("pinjamanmodal.pinjaman_modal_transaksi"),localState:"pinjamanmodal_pinjaman_modal_transaksi",availableMonth:!0})})]})}),n(t,{children:[e(t.thead,{children:b.map((a,i)=>e(t.th,{type:a.type,headers:a.headers},i))}),e(t.tbody,{children:d==null?void 0:d.map((a,i)=>n(t.tr,{children:[e(t.td,{className:"text-center",children:o(a.transaction_date).format("MMM/YYYY")}),e(t.td,{className:"text-center",children:o(a.transaction_date).format("DD/MM/YYYY")}),e(t.td,{className:"text-center",children:a.keterangan}),e(t.td,{className:"text-center",children:a.wilayah}),e(t.td,{className:"text-center",children:a.branch}),e(t.td,{className:"text-end bg-red-200",children:e(r,{value:a.KPO,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-300",children:e(r,{value:a.DPO,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-red-200",children:e(r,{value:a.KPP,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-300",children:e(r,{value:a.DPP,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-red-200",children:e(r,{value:a.KPP+a.KPO,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-green-300",children:e(r,{value:a.DPP+a.DPO,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-end bg-blue-300",children:e(r,{value:a.jasamodal,displayType:"text",thousandSeparator:","})})]},i))}),e("tfoot",{children:n("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-3 py-1",colSpan:"5",children:"TOTAL"}),e("td",{className:"px-3 py-1 bg-red-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:l.KPO,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:l.DPO,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-red-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:l.KPP,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:l.DPP,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-red-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:l.KPO+l.KPP,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:l.DPO+l.DPP,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-blue-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:l.jasamodal,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})})]})})]})]})]})};export{Z as default};