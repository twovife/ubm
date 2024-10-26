import{W as v,j as a,a as r,F as x}from"./app-df871abb.js";import{I as d}from"./InputError-27d9f13a.js";import{I as s}from"./InputLabel-506b9b72.js";import{L as w}from"./LinkButton-334e3c1e.js";import{P as j}from"./PrimaryButton-2e9f3eea.js";import{S as y}from"./SelectList-d2279005.js";import{T as _}from"./TextInput-6df0972b.js";import{A as C}from"./AuthenticatedLayout-ddac043c.js";import{C as I}from"./index.esm-67de2cc5.js";import"./Navbar-88a283a0.js";import"./iconBase-6f294e2e.js";import"./index.esm-6eb99c1e.js";import"./transition-0c33212e.js";import"./index.esm-a32ba1d8.js";import"./Loading-0b0ba1ff.js";const O=({employees:p,curent_unit:m,...l})=>{const{data:o,setData:i,post:b,processing:f,errors:u}=v({employee_id:"",besar_pinjaman:1e6,transaction_date:""}),h=p.map(({id:e,nama_karyawan:t,jabatan:n})=>({id:e,display:`${t} - ${n}`,value:e})),c=e=>{const{value:t,name:n}=e.target;i(n,t)},g=(e,t)=>{i(t,e)},N=e=>{e.preventDefault(),b(route("bonpriv.store"))};return a(C,{loading:f,auth:l.auth,errors:l.errors,header:r(x,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Buat Bon Prive Baru"}),a("div",{className:"ml-auto flex items-center",children:a(w,{href:route("bonpanjer.bon_panjer"),title:"Halaman Utama"})})]}),children:a("div",{className:"sm:px-6 lg:px-8",children:a("div",{className:"p-3 bg-white rounded shadow lg:w-1/2 mx-auto",children:r("form",{onSubmit:N,className:"w-full",children:[r("div",{className:"lg:flex gap-3 w-full",children:[r("div",{className:"mb-2 flex-1",children:[a(s,{value:"Nama Karawan",className:"mb-1"}),a(y,{onChange:c,name:"employee_id",nullValue:!0,options:h,className:"w-full"}),a(d,{message:u.employee_id,className:"mt-2"})]}),r("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Bulan",className:"mb-1"}),a(_,{className:"block w-full",type:"date",required:!0,name:"transaction_date",max:m.akhirbulan,min:m.awalbulan,value:o.transaction_date,onChange:c})]}),r("div",{className:"mb-2 flex-1",children:[a(s,{value:"Pinjaman BON Prive",className:"mb-1"}),a(I,{name:"besar_pinjaman",id:"besar_pinjaman",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:g,value:o.besar_pinjaman,placeholder:"Inputkan angka tanpa sparator"}),a(d,{message:u.besar_pinjaman,className:"mt-2"})]})]}),a(j,{type:"submit",title:"submit"})]})})})})};export{O as default};