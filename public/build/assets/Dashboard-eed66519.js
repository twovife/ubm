import{r as y,j as e,a as l}from"./app-35486303.js";import{C as n}from"./Navbar-694f7b74.js";import{D as a}from"./DefaultTable-00d965de.js";import{L as p}from"./LinkButton-4aba18f0.js";import{S as x}from"./Search-f5b399be.js";import{u as w}from"./useFilter-e53f77ee.js";import{A as g}from"./AuthenticatedLayout-2f8adbdf.js";import{d as N}from"./dayjs.min-8d593140.js";import{N as r}from"./react-number-format.es-a9d2bbc7.js";import"./index.esm-6eda1847.js";import"./iconBase-3e359bc1.js";import"./index.esm-4e58b8d4.js";import"./transition-2adfecdb.js";import"./index.esm-f3c4def6.js";import"./PrimaryButton-c89a07da.js";import"./SelectList-e48d4d18.js";import"./useServerFilter-e7013701.js";import"./TextInput-ba3a0fa1.js";import"./Loading-2bf0e064.js";const I=({server_filter:v,datas:c,saldo_akhir:m,...k})=>{const[o,h]=y.useState(!1),{filter:u,removeFilter:f,returnedData:s,totals:i}=w(c,100,"1juta_transaksi"),b=[{type:"default",headers:{filterable:"no",name:"Bulan",column:"bulan"}},{type:"default",headers:{filterable:"no",name:"Tanggal",column:"transaction_date",class_name:"whitespace-nowrap",format:"date"}},{type:"default",headers:{filterable:"no",name:"Keterangan",column:"type_transaksi",class_name:"whitespace-nowrap"}},{type:"default",headers:{filterable:"no",name:"Wilayah",column:"wilayah"}},{type:"default",headers:{filterable:"no",name:"Unit",column:"unit"}},{type:"default",headers:{filterable:"no",name:"Nama Karyawan",column:"nama_karyawan"}},{type:"default",headers:{filterable:"no",name:"BOP",column:"bop",format:"currency",class_name:"whitespace-nowrap bg-gray-100"}},{type:"default",headers:{filterable:"no",name:"Debit",column:"debit",format:"currency",class_name:"whitespace-nowrap bg-green-100"}},{type:"default",headers:{filterable:"no",name:"Kredit",column:"kredit",format:"currency",class_name:"whitespace-nowrap bg-red-100"}},{type:"default",headers:{filterable:"no",name:"Saldo",column:"saldo",format:"currency",class_name:"whitespace-nowrap bg-blue-100"}}];return e(g,{loading:o,children:l(n,{judul:"Buku Transaksi 1JT",children:[e(n.subTitle,{children:l("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[e(n.startContent,{className:"flex-wrap mb-3 lg:mb-0",children:e(n.filterItem,{filter:u,removeFilter:f})}),e(n.endContent,{className:"flex-wrap",children:l(x,{loading:o,setLoading:h,urlLink:route("unitsaving.dashboard"),localState:"1juta_transaksi",availableMonth:!0,children:[e(p,{href:route("unitsaving.index"),title:"Simpanan 1JT",size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"}),e(p,{href:route("bonpanjer.bon_panjer"),title:"Bon Panjer",size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"})]})})]})}),l(a,{children:[e(a.thead,{children:b.map((t,d)=>e(a.th,{type:t.type,headers:t.headers},d))}),e(a.tbody,{children:s==null?void 0:s.map((t,d)=>l(a.tr,{children:[e(a.td,{className:"text-center",children:t.bulan}),e(a.td,{className:"text-center",children:N(t.transaction_date).format("DD/MM/YYYY")}),e(a.td,{className:"text-center",children:t.type_transaksi}),e(a.td,{className:"text-center",children:t.wilayah}),e(a.td,{className:"text-center",children:t.unit}),e(a.td,{className:"text-center",children:t.nama_karyawan}),e(a.td,{className:"text-end bg-green-200",children:e(r,{value:t.bop,displayType:"text",thousandSeparator:","})}),e(a.td,{className:"text-end bg-emerald-300",children:e(r,{value:t.debit,displayType:"text",thousandSeparator:","})}),e(a.td,{className:"text-end bg-red-200",children:e(r,{value:t.kredit,displayType:"text",thousandSeparator:","})}),e(a.td,{className:"text-end bg-blue-200",children:e(r,{value:t.saldo,displayType:"text",thousandSeparator:","})})]},d))}),e("tfoot",{children:l("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-3 py-1",colSpan:"6",children:"TOTAL"}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:i.bop,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:i.debit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-red-600 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(r,{value:i.kredit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-blue-600 text-white",children:e("div",{className:"whitespace-nowrap text-right ",children:e(r,{value:m,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})})]})})]})]})})};export{I as default};
