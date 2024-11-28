import{W as v,j as a,a as l,F as g}from"./app-9ebf769c.js";import{I as f}from"./InputError-efb1c53f.js";import{I as s}from"./InputLabel-47189f62.js";import{L as w}from"./LinkButton-1bb7ab33.js";import{P as k}from"./PrimaryButton-29581f6d.js";import{T as c}from"./TextInput-5c77428e.js";import{A as S}from"./AuthenticatedLayout-24a86f0d.js";import{C as j}from"./index.esm-7b87d996.js";import{N as n}from"./react-number-format.es-5b2e0b92.js";import"./transition-0247d4df.js";import"./Loading-d148a701.js";import"./iconBase-65420739.js";import"./index.esm-248cfe20.js";import"./index.esm-28d8e751.js";const _=({details:o,curent_unit:t,...i})=>{const{data:d,setData:m,post:p,processing:h,errors:u}=v({debit:1e4,transaction_date:""}),b=e=>{const{value:r,name:y}=e.target;m(y,r)},x=(e,r)=>{m(r,e)},N=e=>{e.preventDefault(),p(route("bonpriv.update",t.id))};return a(S,{loading:h,auth:i.auth,errors:i.errors,header:l(g,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Detail Bon Prive"}),a("div",{className:"ml-auto flex items-center",children:a(w,{as:"button",href:route("bonpanjer.bon_panjer"),title:"Back"})})]}),children:l("div",{className:"sm:px-6 lg:px-8",children:[a("div",{className:"p-3 bg-white rounded shadow max-w-6xl mx-auto mb-3",children:l("table",{className:"w-full text-left text-gray-500 text-xs",children:[a("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:l("tr",{children:[a("th",{className:"px-3 py-1",children:"Nomor"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Tanggal"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Wilayah"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Unit"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Nama Karyawan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Jabatan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo Sebelum"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Angsuran"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Pinjaman"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo"})]})}),a("tbody",{children:o?o.map((e,r)=>l("tr",{className:"even:bg-gray-100",children:[a("td",{className:"px-3 py-1",children:a("p",{children:r+1})}),a("td",{className:"px-3 py-1",children:e.transaction_date}),a("td",{className:"px-3 py-1",children:e.wilayah}),a("td",{className:"px-3 py-1",children:e.unit}),a("td",{className:"px-3 py-1",children:e.nama_karyawan}),a("td",{className:"px-3 py-1",children:e.jabatan}),a("td",{className:"px-3 py-1",children:a(n,{value:e.saldo_sebelum,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(n,{value:e.angsuran,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(n,{value:e.pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(n,{value:e.saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]},r)):a("tr",{children:a("td",{colSpan:"2",children:"Data Not Found"})})})]})}),t.editable&&a("div",{className:"p-3 bg-white rounded shadow max-w-6xl mx-auto",children:l("form",{onSubmit:N,className:"w-full",children:[l("div",{className:"lg:flex gap-2 w-full",children:[l("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Wilayah",className:"mb-1"}),a(c,{className:"block w-full",disabled:!0,value:t.wilayah})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Unit",className:"mb-1"}),a(c,{className:"block w-full",disabled:!0,value:t.unit})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Nama Karyawan",className:"mb-1"}),a(c,{className:"block w-full",type:"text",disabled:!0,value:t.nama_karyawan})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Bulan",className:"mb-1"}),a(c,{className:"block w-full",type:"date",required:!0,name:"transaction_date",min:t.awalbulan,max:t.akhirbulan,value:d.transaction_date,onChange:b})]})]}),l("div",{className:"mb-2",children:[a(s,{value:"Angsur",className:"mb-1"}),a(j,{name:"debit",id:"debit",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:x,value:d.debit,placeholder:"Inputkan angka tanpa sparator"}),a(f,{message:u.debit,className:"mt-2"})]}),a(k,{type:"submit",title:"submit"})]})})]})})};export{_ as default};