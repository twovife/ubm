import{_ as j,r as I,a,j as l,F as S}from"./app-577095aa.js";import{I as m}from"./InputError-2e7ccf90.js";import{I as i}from"./InputLabel-324b8a32.js";import{L as k}from"./LinkButton-c41e9ed7.js";import{P as B}from"./PrimaryButton-e87527a9.js";import{S as o}from"./SelectList-2f891eca.js";import"./TextInput-f601cbff.js";import{A as P}from"./AuthenticatedLayout-9a50dbde.js";import{C as D}from"./index.esm-c639fe91.js";import"./Card-298928cd.js";import"./index.esm-40d2e5fe.js";import"./iconBase-0c341566.js";import"./index.esm-b887299b.js";import"./transition-89244925.js";import"./index.esm-0a08b294.js";import"./index.esm-6cd27bff.js";import"./Loading-c8b73d4d.js";const Q=({branch:u,employees:L,...c})=>{const{data:d,setData:p,post:g,processing:b,errors:r}=j({branch_id:"",setoran_awal:1e6,source:""}),[h,w]=I.useState(),v=Object.values(u.reduce((e,s)=>{const t=s.wilayah;return e[t]={id:t,value:t,display:`wilayah ${t}`},e},{})),N=e=>{const{value:s}=e.target,t=u.filter(n=>n.wilayah==s).map(({id:n,unit:_})=>({id:n,display:_,value:n}));w(t)},f=e=>{const{value:s,name:t}=e.target;p(t,s)},y=(e,s)=>{p(s,e)},x=[{id:1,value:"PM",display:"TB 1 Juta"},{id:2,value:"PO",display:"Bpk Hartawan"}],C=e=>{e.preventDefault(),g(route("pinjamanmodal.pinjaman_modal_store"))};return a(P,{loading:b,auth:c.auth,errors:c.errors,header:l(S,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Buat Pinjaman Baru"}),a("div",{className:"ml-auto flex items-center",children:a(k,{href:route("unitsaving.index"),title:"Halaman Utama"})})]}),children:a("div",{className:"sm:px-6 lg:px-8",children:a("div",{className:"p-3 bg-white rounded shadow w-1/2 mx-auto",children:l("form",{onSubmit:C,className:"w-full",children:[l("div",{className:"lg:flex gap-3 w-full",children:[l("div",{className:"mb-2 flex-1",children:[a(i,{value:"Sumber Dana",className:"mb-1"}),a(o,{onChange:f,options:x,nullValue:!0,required:!0,name:"source",className:"w-full",value:d.source}),a(m,{message:r.wilayah,className:"mt-2"})]}),l("div",{className:"mb-2 flex-1",children:[a(i,{value:"Wilayah",className:"mb-1"}),a(o,{onChange:N,options:v,nullValue:!0,required:!0,className:"w-full"}),a(m,{message:r.wilayah,className:"mt-2"})]}),h&&l("div",{className:"mb-2 flex-1",children:[a(i,{value:"Unit",className:"mb-1"}),a(o,{name:"branch_id",onChange:f,nullValue:!0,options:h,className:"w-full"}),a(m,{message:r.branch_id,className:"mt-2"})]})]}),l("div",{className:"mb-2",children:[a(i,{value:"Nomonal Pinjaman",className:"mb-1"}),a(D,{name:"setoran_awal",id:"setoran_awal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:y,value:d.setoran_awal,placeholder:"Inputkan angka tanpa sparator"}),a(m,{message:r.setoran_awal,className:"mt-2"})]}),a(B,{type:"submit",title:"submit"})]})})})})};export{Q as default};
