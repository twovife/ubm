import{_ as p,a,j as e,F as f,n as v}from"./app-5e7661cb.js";import{A as b}from"./AuthenticatedLayout-42ba98f1.js";import{C as g}from"./ContentWrap-c40a73c6.js";import{I as n}from"./InputLabel-5429deb7.js";import{T as r}from"./TextInput-77673762.js";import{P as k}from"./PrimaryButton-e2cf4c95.js";import{I as o}from"./InputError-0f81902a.js";import"./transition-cce791be.js";import"./index.esm-6abcaf5f.js";import"./iconBase-80e24d07.js";import"./index.esm-f5f9a13d.js";const F=({customer:t,...u})=>{const{data:m,setData:c,put:d,processing:h,errors:i,reset:x}=p({nama:t.nama??"",nik:t.nik??"",no_kk:t.no_kk??"",alamat:t.alamat??""}),s=l=>{c(l.target.name,l.target.value)},N=l=>{l.preventDefault(),d(route("unit.customer.update",t.id))};return a(b,{auth:u.auth,errors:u.errors,header:e(f,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Edit Nasabah"}),a(v,{title:"Management User"}),a("div",{className:"ml-auto flex items-center"})]}),children:a("div",{className:"p-4",children:a(g,{children:e("form",{className:"max-w-xl mx-auto",onSubmit:N,children:[e("div",{className:"mb-3",children:[a(n,{value:"Nama Nasabah"}),a(r,{name:"nama",value:m.nama,onChange:s,className:"w-full",required:!0}),a(o,{message:i.nama,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(n,{value:"NIK"}),a(r,{name:"nik",value:m.nik,onChange:s,className:"w-full",required:!0}),a(o,{message:i.nik,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(n,{value:"Nomor KK"}),a(r,{name:"no_kk",value:m.no_kk,onChange:s,className:"w-full"})]}),e("div",{className:"mb-3",children:[a(n,{value:"Alamat"}),a(r,{name:"alamat",value:m.alamat,onChange:s,className:"w-full"}),a(o,{message:i.alamat,className:"mt-2"})]}),a(k,{disabled:h,type:"submit",title:"submit",className:"ml-auto"})]})})})})};export{F as default};
