import{_ as f,a as l,j as a}from"./app-a2b587a6.js";import{A as v,C as c}from"./AuthenticatedLayout-c900e453.js";import{I as g}from"./InputError-e2739dde.js";import{I as t}from"./InputLabel-583a0765.js";import{L as w}from"./LinkButton-f31eb3b2.js";import{P as k}from"./PrimaryButton-3e6865f8.js";import{T as n}from"./TextInput-d297890b.js";import{d as j}from"./dayjs.min-902dd2c5.js";import{C as S}from"./index.esm-675ffb5f.js";import{N as o}from"./react-number-format.es-3b3c9504.js";import"./transition-5456f04c.js";import"./Loading-803d8939.js";import"./iconBase-5265f4a5.js";import"./index.esm-092c351d.js";import"./index.esm-db9384a5.js";const W=({details:i,curent_unit:s,...C})=>{const{data:d,setData:p,post:m,processing:h,errors:u}=f({debit:1e4,transaction_date:""}),b=e=>{const{value:r,name:N}=e.target;p(N,r)},x=(e,r)=>{p(r,e)},y=e=>{e.preventDefault(),m(route("bonpanjer.bon_panjer_post",s.id))};return l(v,{loading:h,children:[l(c,{judul:"Detail Bon Panjer",children:[a(c.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:a(c.endContent,{className:"flex-wrap",children:a("div",{className:"flex justify-end w-full",children:a(w,{as:"button",href:route("bonpanjer.bon_panjer"),title:"Back"})})})})}),a("div",{className:"overflow-auto w-full",children:l("table",{className:"w-full text-left text-gray-500 text-xs",children:[a("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:l("tr",{children:[a("th",{className:"px-3 py-1",children:"Nomor"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Tanggal"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Wilayah"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Unit"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Nama Karyawan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Jabatan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo Sebelum"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Angsuran"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Pinjaman"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo"})]})}),a("tbody",{children:i?i.map((e,r)=>l("tr",{className:"even:bg-gray-100",children:[a("th",{className:"px-3 py-1",children:a("td",{colSpan:"2",children:r+1})},r),a("td",{className:"px-3 py-1 whitespace-nowrap",children:j(e.transaction_date).format("DD/MM/YYYY")}),a("td",{className:"px-3 py-1",children:e.wilayah}),a("td",{className:"px-3 py-1 whitespace-nowrap",children:e.unit}),a("td",{className:"px-3 py-1",children:e.nama_karyawan}),a("td",{className:"px-3 py-1",children:e.jabatan}),a("td",{className:"px-3 py-1",children:a(o,{value:e.saldo_sebelum,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(o,{value:e.angsuran,displayType:"text",thousandSeparator:","})}),a("td",{className:"px-3 py-1",children:a(o,{value:e.pinjaman,displayType:"text",thousandSeparator:","})}),a("td",{className:"px-3 py-1",children:a(o,{value:e.saldo,displayType:"text",thousandSeparator:","})})]})):a("tr",{children:a("td",{colSpan:"2",children:"Data Not Found"})})})]})})]}),s.editable&&a("div",{className:"p-3 bg-white rounded shadow max-w-6xl mx-auto",children:l("form",{onSubmit:y,className:"w-full",children:[l("div",{className:"lg:flex gap-2 w-full",children:[l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Wilayah",className:"mb-1"}),a(n,{className:"block w-full",disabled:!0,value:s.wilayah})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Unit",className:"mb-1"}),a(n,{className:"block w-full",disabled:!0,value:s.unit})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Nama Karyawan",className:"mb-1"}),a(n,{className:"block w-full",type:"text",disabled:!0,value:s.nama_karyawan})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Tanggal Transaksi",className:"mb-1"}),a(n,{className:"block w-full",type:"date",required:!0,name:"transaction_date",min:s.awalbulan,max:s.akhirbulan,value:d.transaction_date,onChange:b})]})]}),l("div",{className:"mb-2",children:[a(t,{value:"Angsur",className:"mb-1"}),a(S,{name:"debit",id:"debit",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:x,value:d.debit,placeholder:"Inputkan angka tanpa sparator"}),a(g,{message:u.debit,className:"mt-2"})]}),a(k,{type:"submit",title:"submit"})]})})]})};export{W as default};
