import{_ as N,a,j as l,F as y}from"./app-a206987f.js";import{I as v}from"./InputError-441a3d95.js";import{I as s}from"./InputLabel-ddb501e2.js";import{L as f}from"./LinkButton-8d5cff8f.js";import{P as g}from"./PrimaryButton-a4f911ea.js";import{T as o}from"./TextInput-fdef636a.js";import{A as w}from"./AuthenticatedLayout-74846704.js";import{C as k}from"./index.esm-0291112f.js";import{N as c}from"./react-number-format.es-ccba1cf8.js";import"./SweetAlert-a4451a4d.js";import"./transition-788d1030.js";import"./index.esm-889ceb70.js";import"./iconBase-b0730096.js";import"./index.esm-8767219a.js";import"./index.esm-91820154.js";import"./Loading-48188ad0.js";const q=({details:n,curent_unit:r,...i})=>{const{data:m,setData:d,post:p,processing:h,errors:b}=N({debit:1e4,transaction_date:r.now}),x=(e,t)=>{d(t,e)},u=e=>{e.preventDefault(),p(route("bonpanjer.bon_panjer_post",r.id))};return a(w,{loading:h,auth:i.auth,errors:i.errors,header:l(y,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Detail Bon"}),a("div",{className:"ml-auto flex items-center",children:a(f,{as:"button",href:route("bonpanjer.bon_panjer"),title:"Back"})})]}),children:l("div",{className:"sm:px-6 lg:px-8",children:[a("div",{className:"p-3 bg-white rounded shadow max-w-6xl mx-auto mb-3",children:l("table",{className:"w-full text-left text-gray-500 text-xs",children:[a("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:l("tr",{children:[a("th",{className:"px-3 py-1",children:"Nomor"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Tanggal"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Wilayah"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Unit"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Nama Karyawan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Jabatan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo Sebelum"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Angsuran"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Pinjaman"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo"})]})}),a("tbody",{children:n?n.map((e,t)=>l("tr",{className:"even:bg-gray-100",children:[a("th",{className:"px-3 py-1",children:a("td",{colSpan:"2",children:t+1})},t),a("td",{className:"px-3 py-1",children:e.transaction_date}),a("td",{className:"px-3 py-1",children:e.wilayah}),a("td",{className:"px-3 py-1",children:e.unit}),a("td",{className:"px-3 py-1",children:e.nama_karyawan}),a("td",{className:"px-3 py-1",children:e.jabatan}),a("td",{className:"px-3 py-1",children:a(c,{value:e.saldo_sebelum,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(c,{value:e.angsuran,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(c,{value:e.pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(c,{value:e.saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})):a("tr",{children:a("td",{colSpan:"2",children:"Data Not Found"})})})]})}),r.editable&&a("div",{className:"p-3 bg-white rounded shadow max-w-6xl mx-auto",children:l("form",{onSubmit:u,className:"w-full",children:[l("div",{className:"lg:flex gap-2 w-full",children:[l("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Wilayah",className:"mb-1"}),a(o,{className:"block w-full",disabled:!0,value:r.wilayah})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Unit",className:"mb-1"}),a(o,{className:"block w-full",disabled:!0,value:r.unit})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Nama Karyawan",className:"mb-1"}),a(o,{className:"block w-full",type:"text",disabled:!0,value:r.nama_karyawan})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Bulan",className:"mb-1"}),a(o,{className:"block w-full",type:"month",disabled:!0,value:r.now})]})]}),l("div",{className:"mb-2",children:[a(s,{value:"Angsur",className:"mb-1"}),a(k,{name:"debit",id:"debit",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:x,value:m.debit,placeholder:"Inputkan angka tanpa sparator"}),a(v,{message:b.debit,className:"mt-2"})]}),a(g,{type:"submit",title:"submit"})]})})]})})};export{q as default};
