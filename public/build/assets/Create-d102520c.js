import{_ as v,j as a,a as r,F as x}from"./app-cc2d0faa.js";import{I as d}from"./InputError-1e381684.js";import{I as s}from"./InputLabel-d5eaf328.js";import{L as w}from"./LinkButton-fd0e3a74.js";import{P as _}from"./PrimaryButton-9f9cb87e.js";import{S as j}from"./SelectList-4b0a20ad.js";import{T as y}from"./TextInput-05a72ba0.js";import{A as C}from"./AuthenticatedLayout-12fa7b7b.js";import{C as I}from"./index.esm-42375017.js";import"./transition-94c7ea81.js";import"./Loading-7a3b1e6a.js";import"./iconBase-5713534a.js";import"./index.esm-96da7d57.js";import"./index.esm-db5342d1.js";const K=({employees:p,curent_unit:m,...l})=>{const{data:o,setData:i,post:b,processing:f,errors:u}=v({employee_id:"",besar_pinjaman:1e6,transaction_date:""}),h=p.map(({id:e,nama_karyawan:t,jabatan:n})=>({id:e,display:`${t} - ${n}`,value:e})),c=e=>{const{value:t,name:n}=e.target;i(n,t)},g=(e,t)=>{i(t,e)},N=e=>{e.preventDefault(),b(route("bonpriv.store"))};return a(C,{loading:f,auth:l.auth,errors:l.errors,header:r(x,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Buat Bon Prive Baru"}),a("div",{className:"ml-auto flex items-center",children:a(w,{href:route("bonpanjer.bon_panjer"),title:"Halaman Utama"})})]}),children:a("div",{className:"sm:px-6 lg:px-8",children:a("div",{className:"p-3 bg-white rounded shadow lg:w-1/2 mx-auto",children:r("form",{onSubmit:N,className:"w-full",children:[r("div",{className:"lg:flex gap-3 w-full",children:[r("div",{className:"mb-2 flex-1",children:[a(s,{value:"Nama Karawan",className:"mb-1"}),a(j,{onChange:c,name:"employee_id",nullValue:!0,options:h,className:"w-full"}),a(d,{message:u.employee_id,className:"mt-2"})]}),r("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Bulan",className:"mb-1"}),a(y,{className:"block w-full",type:"date",required:!0,name:"transaction_date",max:m.akhirbulan,min:m.awalbulan,value:o.transaction_date,onChange:c})]}),r("div",{className:"mb-2 flex-1",children:[a(s,{value:"Pinjaman BON Prive",className:"mb-1"}),a(I,{name:"besar_pinjaman",id:"besar_pinjaman",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:g,value:o.besar_pinjaman,placeholder:"Inputkan angka tanpa sparator"}),a(d,{message:u.besar_pinjaman,className:"mt-2"})]})]}),a(_,{type:"submit",title:"submit"})]})})})})};export{K as default};