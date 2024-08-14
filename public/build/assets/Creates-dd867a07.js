import{W as A,r as w,j as a,a as l,F as D}from"./app-02daae82.js";import{I as i}from"./InputError-4b2065f7.js";import{I as n}from"./InputLabel-cf4d0354.js";import{L as E}from"./LinkButton-4f75e48b.js";import{P as L}from"./PrimaryButton-766ea5f3.js";import{S as c}from"./SelectList-2b8f6e47.js";import{T}from"./TextInput-0be98de0.js";import{A as U}from"./AuthenticatedLayout-50b04756.js";import{C as y}from"./index.esm-4764c0db.js";import"./Navbar-25c622c5.js";import"./iconBase-29f29ecf.js";import"./index.esm-b32c738a.js";import"./transition-de6f9320.js";import"./index.esm-21f6a8e9.js";import"./Loading-5377d93d.js";const Y=({branch:u,employees:x,...d})=>{const{data:p,setData:b,post:k,processing:_,errors:m}=A({employee_id:"",sw_balance:0,sk_balance:0,tgl_tabugan:""}),[h,S]=w.useState(),[g,f]=w.useState(),C=Object.values(u.reduce((e,t)=>{const s=t.wilayah;return e[s]={id:s,value:s,display:`wilayah ${s}`},e},{})),I=e=>{const{value:t}=e.target,s=u.filter(r=>r.wilayah==t).map(({id:r,unit:o})=>({id:r,display:o,value:r}));S(s),f(null)},j=e=>{const{value:t}=e.target,s=x.filter(r=>r.branch_id==t).map(({id:r,nama_karyawan:o,jabatan:V})=>({id:r,display:`${o} - ${V}`,value:r}));f(s)},v=e=>{const{value:t,name:s}=e.target;b(s,t)},N=(e,t)=>{b(t,e)},q=e=>{e.preventDefault(),k(route("sksw.store"))};return a(U,{loading:_,auth:d.auth,errors:d.errors,header:l(D,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Tambah Baru Simpanan Sukarela"}),a("div",{className:"ml-auto flex items-center",children:a(E,{href:route("simpanan.index"),title:"Halaman Utama"})})]}),children:a("div",{className:"mx-auto sm:px-6 lg:px-8",children:a("div",{className:"p-3 bg-white rounded shadow",children:l("form",{onSubmit:q,className:"lg:grid lg:grid-cols-2 gap-3",children:[l("div",{className:"col-span-1 w-full",children:[l("div",{className:"mb-2",children:[a(n,{value:"Wilayah",className:"mb-1"}),a(c,{onChange:I,options:C,nullValue:!0,required:!0})]}),h&&l("div",{className:"mb-2",children:[a(n,{value:"Unit",className:"mb-1"}),a(c,{onChange:j,nullValue:!0,options:h,required:!0})]}),g&&l("div",{className:"mb-2",children:[a(n,{value:"Nama Karawan",className:"mb-1"}),a(c,{onChange:v,name:"employee_id",nullValue:!0,options:g,className:"w-full",required:!0}),a(i,{message:m.employee_id,className:"mt-2"})]})]}),l("div",{className:"col-span-1 w-full",children:[l("div",{className:"mb-2",children:[a(n,{value:"Tanggal Setor",className:"mb-1"}),a(T,{type:"month",onChange:v,name:"tgl_tabugan",required:!0}),a(i,{message:m.tgl_tabugan,className:"mt-2"})]}),l("div",{className:"mb-2",children:[a(n,{value:"Setor Awal Simpanan Wajib",className:"mb-1"}),a(y,{name:"sw_balance",id:"sw_balance",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:N,value:p.sw_balance,placeholder:"Inputkan angka tanpa sparator"}),a(i,{message:m.sw_balance,className:"mt-2"})]}),l("div",{className:"mb-2",children:[a(n,{value:"Setor Awal Simpanan Sukarela",className:"mb-1"}),a(y,{name:"sk_balance",id:"sk_balance",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:N,value:p.sk_balance,placeholder:"Inputkan angka tanpa sparator"}),a(i,{message:m.sk_balance,className:"mt-2"})]}),a("div",{className:"mb-2 flex items-end justify-end",children:a(L,{type:"submit",title:"Submit"})})]})]})})})})};export{Y as default};