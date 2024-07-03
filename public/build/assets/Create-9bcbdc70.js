import{_ as k,r as I,j as a,a as s}from"./app-cc2d0faa.js";import{A as S,C as c}from"./AuthenticatedLayout-12fa7b7b.js";import{I as n}from"./InputError-1e381684.js";import{I as m}from"./InputLabel-d5eaf328.js";import{L as P}from"./LinkButton-fd0e3a74.js";import{P as B}from"./PrimaryButton-9f9cb87e.js";import{S as d}from"./SelectList-4b0a20ad.js";import{T as D}from"./TextInput-05a72ba0.js";import{C as T}from"./index.esm-42375017.js";import"./transition-94c7ea81.js";import"./Loading-7a3b1e6a.js";import"./iconBase-5713534a.js";import"./index.esm-96da7d57.js";import"./index.esm-db5342d1.js";const K=({branch:p,employees:q,...L})=>{const{data:o,setData:h,post:g,processing:b,errors:r,reset:w}=k({branch_id:"",setoran_awal:1e6,source:""}),[f,N]=I.useState(),v=Object.values(p.reduce((e,l)=>{const t=l.wilayah;return e[t]={id:t,value:t,display:`wilayah ${t}`},e},{})),y=e=>{const{value:l}=e.target,t=p.filter(i=>i.wilayah==l).map(({id:i,unit:j})=>({id:i,display:j,value:i}));N(t)},u=e=>{const{value:l,name:t}=e.target;h(t,l)},x=(e,l)=>{h(l,e)},C=[{id:1,value:"PM",display:"TB 1 Juta"},{id:2,value:"PO",display:"Bpk Hartawan"}],_=e=>{e.preventDefault(),g(route("pinjamanmodal.pinjaman_modal_store"),{onSuccess:l=>w()})};return a(S,{loading:b,children:s(c,{judul:"Pinjaman Modal Baru",children:[a(c.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:a(c.endContent,{className:"flex-wrap",children:a(P,{href:route("pinjamanmodal.pinjaman_modal"),title:"Back",size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"})})})}),a("div",{className:"sm:px-6 lg:px-8 mb-3",children:a("div",{className:"p-3 bg-white rounded shadow w-1/2 mx-auto",children:s("form",{onSubmit:_,className:"w-full",children:[s("div",{className:"lg:flex gap-3 w-full",children:[s("div",{className:"mb-2 flex-1",children:[a(m,{value:"Sumber Dana",className:"mb-1"}),a(d,{onChange:u,options:C,nullValue:!0,required:!0,name:"source",className:"w-full",value:o.source}),a(n,{message:r.wilayah,className:"mt-2"})]}),s("div",{className:"mb-2 flex-1",children:[a(m,{value:"Wilayah",className:"mb-1"}),a(d,{onChange:y,options:v,nullValue:!0,required:!0,className:"w-full"}),a(n,{message:r.wilayah,className:"mt-2"})]}),f&&s("div",{className:"mb-2 flex-1",children:[a(m,{value:"Unit",className:"mb-1"}),a(d,{name:"branch_id",onChange:u,nullValue:!0,options:f,className:"w-full"}),a(n,{message:r.branch_id,className:"mt-2"})]})]}),s("div",{className:"lg:flex gap-3 w-full mb-2",children:[s("div",{className:"flex-1",children:[a(m,{value:"Nominal Pinjaman",className:"mb-1"}),a(T,{name:"setoran_awal",id:"setoran_awal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:x,value:o.setoran_awal,placeholder:"Inputkan angka tanpa sparator"}),a(n,{message:r.setoran_awal,className:"mt-2"})]}),s("div",{className:"flex-1",children:[a(m,{value:"Tanggal Pinjam",className:"mb-1"}),a(D,{onChange:u,name:"transaction_date",value:o.transaction_date,type:"date",required:!0,className:"w-full"}),a(n,{message:r.transaction_date,className:"mt-2"})]})]}),a(B,{type:"submit",title:"submit"})]})})})]})})};export{K as default};