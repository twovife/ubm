import{_ as A,r as w,j as a,a as l,F as D}from"./app-de2cccc6.js";import{I as i}from"./InputError-6382fce3.js";import{I as r}from"./InputLabel-a516d818.js";import{L as E}from"./LinkButton-8e8f7c8e.js";import{P as L}from"./PrimaryButton-8c482837.js";import{S as c}from"./SelectList-cf0dcf63.js";import{T}from"./TextInput-37d8c38c.js";import{A as U}from"./AuthenticatedLayout-120287b2.js";import{C as y}from"./index.esm-92bc8704.js";import"./transition-ea63980f.js";import"./index.esm-dac3b13c.js";const J=({branch:u,employees:x,...d})=>{const{data:p,setData:b,post:_,processing:k,errors:m}=A({employee_id:"",sw_balance:0,sk_balance:0,tgl_tabugan:""}),[h,S]=w.useState(),[g,f]=w.useState(),C=Object.values(u.reduce((e,t)=>{const s=t.wilayah;return e[s]={id:s,value:s,display:`wilayah ${s}`},e},{})),I=e=>{const{value:t}=e.target,s=u.filter(n=>n.wilayah==t).map(({id:n,unit:o})=>({id:n,display:o,value:n}));S(s),f(null)},j=e=>{const{value:t}=e.target,s=x.filter(n=>n.branch_id==t).map(({id:n,nama_karyawan:o,jabatan:V})=>({id:n,display:`${o} - ${V}`,value:n}));f(s)},v=e=>{const{value:t,name:s}=e.target;b(s,t)},N=(e,t)=>{b(t,e)},q=e=>{e.preventDefault(),_(route("sksw.store"))};return a(U,{loading:k,auth:d.auth,errors:d.errors,header:l(D,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Tambah Baru Simpanan Sukarela"}),a("div",{className:"ml-auto flex items-center",children:a(E,{href:route("simpanan.index"),title:"Halaman Utama"})})]}),children:a("div",{className:"mx-auto sm:px-6 lg:px-8",children:a("div",{className:"p-3 bg-white rounded shadow",children:l("form",{onSubmit:q,className:"lg:grid lg:grid-cols-2 gap-3",children:[l("div",{className:"col-span-1 w-full",children:[l("div",{className:"mb-2",children:[a(r,{value:"Wilayah",className:"mb-1"}),a(c,{onChange:I,options:C,nullValue:!0,required:!0})]}),h&&l("div",{className:"mb-2",children:[a(r,{value:"Unit",className:"mb-1"}),a(c,{onChange:j,nullValue:!0,options:h,required:!0})]}),g&&l("div",{className:"mb-2",children:[a(r,{value:"Nama Karawan",className:"mb-1"}),a(c,{onChange:v,name:"employee_id",nullValue:!0,options:g,className:"w-full",required:!0}),a(i,{message:m.employee_id,className:"mt-2"})]})]}),l("div",{className:"col-span-1 w-full",children:[l("div",{className:"mb-2",children:[a(r,{value:"Tanggal Setor",className:"mb-1"}),a(T,{type:"month",onChange:v,name:"tgl_tabugan",required:!0}),a(i,{message:m.tgl_tabugan,className:"mt-2"})]}),l("div",{className:"mb-2",children:[a(r,{value:"Setor Awal Simpanan Wajib",className:"mb-1"}),a(y,{name:"sw_balance",id:"sw_balance",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:N,value:p.sw_balance,placeholder:"Inputkan angka tanpa sparator"}),a(i,{message:m.sw_balance,className:"mt-2"})]}),l("div",{className:"mb-2",children:[a(r,{value:"Setor Awal Simpanan Sukarela",className:"mb-1"}),a(y,{name:"sk_balance",id:"sk_balance",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:N,value:p.sk_balance,placeholder:"Inputkan angka tanpa sparator"}),a(i,{message:m.sk_balance,className:"mt-2"})]}),a("div",{className:"mb-2 flex items-end justify-end",children:a(L,{type:"submit",title:"Submit"})})]})]})})})})};export{J as default};
