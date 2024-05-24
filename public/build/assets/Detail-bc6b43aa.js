import{_ as v,a,j as l,F as w}from"./app-577095aa.js";import{I as u}from"./InputError-2e7ccf90.js";import{I as t}from"./InputLabel-324b8a32.js";import{L as k}from"./LinkButton-c41e9ed7.js";import{P as j}from"./PrimaryButton-e87527a9.js";import{T as n}from"./TextInput-f601cbff.js";import{A as S}from"./AuthenticatedLayout-9a50dbde.js";import{C as b}from"./index.esm-c639fe91.js";import{N as m}from"./react-number-format.es-1fd40bc0.js";import"./Card-298928cd.js";import"./index.esm-40d2e5fe.js";import"./iconBase-0c341566.js";import"./index.esm-b887299b.js";import"./transition-89244925.js";import"./index.esm-0a08b294.js";import"./index.esm-6cd27bff.js";import"./Loading-c8b73d4d.js";const W=({details:c,curent_unit:s,...d})=>{const{data:o,setData:i,post:x,processing:N,errors:p}=v({debit:0,jasa:s.max_payment*2/100,transaction_date:""}),y=e=>{const{value:r,name:g}=e.target;i(g,r)},h=(e,r)=>{i(r,parseInt(e))},f=e=>{e.preventDefault(),x(route("pinjamanmodal.pinjaman_modal_post",s.id))};return a(S,{loading:N,auth:d.auth,errors:d.errors,header:l(w,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Detail Pinjaman Modal"}),a("div",{className:"ml-auto flex items-center",children:a(k,{as:"button",href:route("pinjamanmodal.pinjaman_modal"),title:"Back"})})]}),children:l("div",{className:"sm:px-6 lg:px-8",children:[a("div",{className:"p-3 bg-white rounded shadow max-w-6xl mx-auto mb-3",children:l("table",{className:"w-full text-left text-gray-500 text-xs",children:[a("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:l("tr",{children:[a("th",{className:"px-3 py-1",children:"Nomor"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Tanggal"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Wilayah"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Unit"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Nama Karyawan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Jabatan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo Sebelum"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Angsuran"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Pinjaman"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo"})]})}),a("tbody",{children:c?c.map((e,r)=>l("tr",{className:"even:bg-gray-100",children:[a("th",{className:"px-3 py-1",children:a("td",{colSpan:"2",children:r+1})},r),a("td",{className:"px-3 py-1",children:e.transaction_date}),a("td",{className:"px-3 py-1",children:e.wilayah}),a("td",{className:"px-3 py-1",children:e.unit}),a("td",{className:"px-3 py-1",children:e.nama_karyawan}),a("td",{className:"px-3 py-1",children:e.jabatan}),a("td",{className:"px-3 py-1",children:a(m,{value:e.saldo_sebelum,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(m,{value:e.angsuran,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(m,{value:e.pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-1",children:a(m,{value:e.saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})):a("tr",{children:a("td",{colSpan:"2",children:"Data Not Found"})})})]})}),a("div",{className:"p-3 bg-white rounded shadow max-w-6xl mx-auto",children:l("form",{onSubmit:f,className:"w-full",children:[l("div",{className:"lg:flex gap-2 w-full",children:[l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Wilayah",className:"mb-1"}),a(n,{className:"block w-full",disabled:!0,value:s.wilayah})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Unit",className:"mb-1"}),a(n,{className:"block w-full",disabled:!0,value:s.unit})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Nama Karyawan",className:"mb-1"}),a(n,{className:"block w-full",type:"text",disabled:!0,value:s.nama_karyawan})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Bulan",className:"mb-1"}),a(n,{className:"block w-full",type:"date",required:!0,name:"transaction_date",min:s.awalbulan,max:s.akhirbulan,value:o.transaction_date,onChange:y})]})]}),l("div",{className:"lg:flex gap-2 w-full",children:[l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Angsur",className:"mb-1"}),a(b,{name:"debit",id:"debit",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,max:s.max_payment,required:!0,onValueChange:h,value:o.debit,placeholder:"Inputkan angka tanpa sparator"}),a(u,{message:p.debit,className:"mt-2"})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(t,{value:"Jasa Modal 2%",className:"mb-1"}),a(b,{name:"jasa",id:"jasa",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:0,onValueChange:h,value:o.jasa,placeholder:"Inputkan angka tanpa sparator"}),a(u,{message:p.debit,className:"mt-2"})]})]}),a(j,{type:"submit",title:"submit"})]})})]})})};export{W as default};
