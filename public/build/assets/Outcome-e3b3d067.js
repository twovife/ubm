import{_ as N,j as a,a as e}from"./app-a2b587a6.js";import{A as x,C as o}from"./AuthenticatedLayout-c900e453.js";import{I as n}from"./InputError-e2739dde.js";import{I as r}from"./InputLabel-583a0765.js";import{L as v}from"./LinkButton-f31eb3b2.js";import{P as w}from"./PrimaryButton-3e6865f8.js";import{S as k}from"./SelectList-3ef59407.js";import{T as d}from"./TextInput-d297890b.js";import{C as y}from"./index.esm-675ffb5f.js";import"./transition-5456f04c.js";import"./Loading-803d8939.js";import"./iconBase-5265f4a5.js";import"./index.esm-092c351d.js";import"./index.esm-db9384a5.js";const E=({curent_unit:u,...C})=>{const{data:l,setData:c,post:p,processing:f,errors:s}=N({nominal:0,transaction_date:"",keterangan:"",transaksi:""}),m=t=>{const{value:i,name:h}=t.target;c(h,i)},g=(t,i)=>{c(i,t)},b=t=>{t.preventDefault(),p(route("unitsaving.store_mutasi"))};return a(x,{loading:f,children:e(o,{judul:"Input Lain Lain ",children:[a(o.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:a(o.endContent,{className:"flex-wrap",children:a(v,{href:route("mutation.index"),title:"Back",size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"})})})}),a("div",{className:"sm:px-6 lg:px-8",children:a("div",{className:"p-3 bg-white rounded shadow w-1/2 mx-auto",children:e("form",{onSubmit:b,className:"w-full",children:[e("div",{className:"lg:flex gap-3 w-full",children:[e("div",{className:"mb-2 flex-1 w-full",children:[a(r,{value:"Tanggal",className:"mb-1"}),a(d,{className:"block w-full",type:"date",required:!0,name:"transaction_date",max:u.akhirbulan,min:u.awalbulan,value:l.transaction_date,onChange:m}),a(n,{message:s.transaction_date,className:"mt-2"})]}),e("div",{className:"mb-2 flex-1",children:[a(r,{value:"Nominal",className:"mb-1"}),a(y,{name:"nominal",id:"nominal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:g,value:l.nominal,placeholder:"Inputkan angka tanpa sparator"}),a(n,{message:s.nominal,className:"mt-2"})]})]}),e("div",{className:"lg:flex gap-3 w-full",children:[e("div",{className:"mb-2 flex-1 w-full",children:[a(r,{value:"transaksi",className:"mb-1"}),a(k,{className:"block w-full",type:"text",required:!0,name:"transaksi",value:l.transaksi,nullValue:!0,options:[{id:1,value:"D",display:"Masuk (Debit)"},{id:2,value:"K",display:"Keluar (Kredit)"}],onChange:m}),a(n,{message:s.transaksi,className:"mt-2"})]}),e("div",{className:"mb-2 flex-1 w-full",children:[a(r,{value:"Keterangan",className:"mb-1"}),a(d,{className:"block w-full",type:"text",required:!0,name:"keterangan",value:l.keterangan,onChange:m}),a(n,{message:s.keterangan,className:"mt-2"})]})]}),a(w,{type:"submit",title:"submit"})]})})})]})})};export{E as default};
