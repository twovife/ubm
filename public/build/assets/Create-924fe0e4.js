import{_ as E,r as g,j as a,a as s}from"./app-0b5f1112.js";import{A as L,C as o}from"./AuthenticatedLayout-76bbb813.js";import{I as y}from"./InputError-8fa33d66.js";import{I as r}from"./InputLabel-c173db8f.js";import{L as T}from"./LinkButton-7d61b3bc.js";import{P as U}from"./PrimaryButton-15ae1d1a.js";import{S as i}from"./SelectList-a39251a6.js";import{T as V}from"./TextInput-67fb2e62.js";import{C as D}from"./index.esm-5915bcd6.js";import"./transition-7051d0f9.js";import"./Loading-9e25d30e.js";import"./iconBase-88429f7d.js";import"./index.esm-873aad8d.js";import"./index.esm-ad7e6b0e.js";const X=({branch:u,employees:N,...P})=>{const{data:v,setData:c,post:w,processing:j,errors:p}=E({employee_id:"",besar_pinjaman:1e6}),[d,C]=g.useState(),[b,f]=g.useState(),x=Object.values(u.reduce((e,n)=>{const t=n.wilayah;return e[t]={id:t,value:t,display:`wilayah ${t}`},e},{})),_=e=>{const{value:n}=e.target,t=u.filter(l=>l.wilayah==n).map(({id:l,unit:m})=>({id:l,display:m,value:l}));C(t),f(null)},I=e=>{const{value:n}=e.target,t=N.filter(l=>l.branch_id==n).map(({id:l,nama_karyawan:m,jabatan:k})=>({id:l,display:`${m} - ${k}`,value:l}));f(t)},h=e=>{const{value:n,name:t}=e.target;c(t,n)},B=(e,n)=>{c(n,e)},S=e=>{e.preventDefault(),w(route("bonpanjer.bon_panjer_store"))};return a(L,{loading:j,children:s(o,{judul:"Bon Panjer Baru",children:[a(o.subTitle,{children:s("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[a(o.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),a(o.endContent,{className:"flex-wrap",children:a(T,{href:route("bonpanjer.bon_panjer"),title:"Halaman Utama"})})]})}),s("form",{onSubmit:S,className:"mb-2 max-w-lg mx-auto",children:[s("div",{className:"w-full",children:[s("div",{className:"mb-2",children:[a(r,{value:"Wilayah",className:"mb-1"}),a(i,{onChange:_,options:x,nullValue:!0,className:"w-full"})]}),d&&s("div",{className:"mb-2",children:[a(r,{value:"Unit",className:"mb-1"}),a(i,{onChange:I,nullValue:!0,options:d,className:"w-full"})]}),b&&s("div",{className:"mb-2",children:[a(r,{value:"Nama Karawan",className:"mb-1"}),a(i,{onChange:h,name:"employee_id",nullValue:!0,options:b,className:"w-full"}),a(y,{message:p.employee_id,className:"mt-2"})]})]}),s("div",{className:"mb-2",children:[a(r,{value:"Tanggal Bon",className:"mb-1"}),a(V,{name:"transaction_date",type:"date",className:"w-full",onChange:h,required:!0})]}),s("div",{className:"mb-2",children:[a(r,{value:"Nominal Bon",className:"mb-1"}),a(D,{name:"besar_pinjaman",id:"besar_pinjaman",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block text-sm mt-2 w-full",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:B,value:v.besar_pinjaman,placeholder:"Inputkan angka tanpa sparator"}),a(y,{message:p.besar_pinjaman,className:"mt-2"})]}),a("div",{className:"flex justify-end",children:a(U,{type:"submit",title:"submit"})})]})]})})};export{X as default};
