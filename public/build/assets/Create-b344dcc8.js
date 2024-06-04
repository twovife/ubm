import{_ as k,r as I,j as a,a as t}from"./app-de2cccc6.js";import{A as j,C as i}from"./AuthenticatedLayout-120287b2.js";import{I as m}from"./InputError-6382fce3.js";import{I as n}from"./InputLabel-a516d818.js";import{L as B}from"./LinkButton-8e8f7c8e.js";import{P as S}from"./PrimaryButton-8c482837.js";import{S as b}from"./SelectList-cf0dcf63.js";import{T as L}from"./TextInput-37d8c38c.js";import{C as O}from"./index.esm-92bc8704.js";import"./transition-ea63980f.js";import"./index.esm-dac3b13c.js";const $=({branch:c,employees:P,curent_unit:u,...A})=>{const{data:d,setData:p,post:w,processing:g,errors:o}=k({branch_id:"",setoran_awal:15e5,transaction_date:""}),[h,N]=I.useState(),v=Object.values(c.reduce((e,s)=>{const l=s.wilayah;return e[l]={id:l,value:l,display:`wilayah ${l}`},e},{})),y=e=>{const{value:s}=e.target,l=c.filter(r=>r.wilayah==s).map(({id:r,unit:_})=>({id:r,display:_,value:r}));N(l)},f=e=>{const{value:s,name:l}=e.target;p(l,s)},x=(e,s)=>{p(s,e)},C=e=>{e.preventDefault(),w(route("bop.store"))};return a(j,{loading:g,children:t(i,{judul:"Setoran BOP Unit Baru ",children:[a(i.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:a(i.endContent,{className:"flex-wrap",children:a("div",{className:"w-full",children:a(B,{href:route("bop.index"),title:"Back",size:"sm",type:"button",className:"block whitespace-nowrap ml-auto",theme:"primary"})})})})}),a("div",{className:"p-3 bg-white rounded shadow lg:w-1/2 mx-auto",children:t("form",{onSubmit:C,className:"w-full",children:[t("div",{className:"lg:flex gap-3 w-full",children:[t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Wilayah",className:"mb-1"}),a(b,{onChange:y,options:v,nullValue:!0,className:"w-full"}),a(m,{message:o.wilayah,className:"mt-2"})]}),h&&t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Unit",className:"mb-1"}),a(b,{name:"branch_id",onChange:f,nullValue:!0,options:h,className:"w-full"}),a(m,{message:o.branch_id,className:"mt-2"})]})]}),t("div",{className:"lg:flex gap-3 w-full",children:[t("div",{className:"mb-2 flex-1 w-full",children:[a(n,{value:"Bulan",className:"mb-1"}),a(L,{className:"block w-full",type:"date",required:!0,name:"transaction_date",max:u.akhirbulan,min:u.awalbulan,value:d.transaction_date,onChange:f})]}),t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Setor Awal BOP",className:"mb-1"}),a(O,{name:"setoran_awal",id:"setoran_awal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:x,value:d.setoran_awal,placeholder:"Inputkan angka tanpa sparator"}),a(m,{message:o.setoran_awal,className:"mt-2"})]})]}),a(S,{type:"submit",title:"submit"})]})})]})})};export{$ as default};
