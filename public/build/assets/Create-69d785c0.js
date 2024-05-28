import{_ as k,r as I,j as a,a as t}from"./app-35486303.js";import{C as i}from"./Navbar-694f7b74.js";import{I as m}from"./InputError-a7b3b63c.js";import{I as n}from"./InputLabel-f58801a2.js";import{L as j}from"./LinkButton-4aba18f0.js";import{P as B}from"./PrimaryButton-c89a07da.js";import{S as b}from"./SelectList-e48d4d18.js";import{T as S}from"./TextInput-ba3a0fa1.js";import{A as L}from"./AuthenticatedLayout-2f8adbdf.js";import{C as O}from"./index.esm-b943725c.js";import"./index.esm-6eda1847.js";import"./iconBase-3e359bc1.js";import"./index.esm-4e58b8d4.js";import"./transition-2adfecdb.js";import"./index.esm-f3c4def6.js";import"./Loading-2bf0e064.js";const Q=({branch:c,employees:P,curent_unit:u,...A})=>{const{data:d,setData:p,post:w,processing:g,errors:o}=k({branch_id:"",setoran_awal:15e5,transaction_date:""}),[h,N]=I.useState(),v=Object.values(c.reduce((e,s)=>{const l=s.wilayah;return e[l]={id:l,value:l,display:`wilayah ${l}`},e},{})),y=e=>{const{value:s}=e.target,l=c.filter(r=>r.wilayah==s).map(({id:r,unit:_})=>({id:r,display:_,value:r}));N(l)},f=e=>{const{value:s,name:l}=e.target;p(l,s)},x=(e,s)=>{p(s,e)},C=e=>{e.preventDefault(),w(route("bop.store"))};return a(L,{loading:g,children:t(i,{judul:"Setoran BOP Unit Baru ",children:[a(i.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:a(i.endContent,{className:"flex-wrap",children:a("div",{className:"w-full",children:a(j,{href:route("bop.index"),title:"Back",size:"sm",type:"button",className:"block whitespace-nowrap ml-auto",theme:"primary"})})})})}),a("div",{className:"p-3 bg-white rounded shadow lg:w-1/2 mx-auto",children:t("form",{onSubmit:C,className:"w-full",children:[t("div",{className:"lg:flex gap-3 w-full",children:[t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Wilayah",className:"mb-1"}),a(b,{onChange:y,options:v,nullValue:!0,className:"w-full"}),a(m,{message:o.wilayah,className:"mt-2"})]}),h&&t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Unit",className:"mb-1"}),a(b,{name:"branch_id",onChange:f,nullValue:!0,options:h,className:"w-full"}),a(m,{message:o.branch_id,className:"mt-2"})]})]}),t("div",{className:"lg:flex gap-3 w-full",children:[t("div",{className:"mb-2 flex-1 w-full",children:[a(n,{value:"Bulan",className:"mb-1"}),a(S,{className:"block w-full",type:"date",required:!0,name:"transaction_date",max:u.akhirbulan,min:u.awalbulan,value:d.transaction_date,onChange:f})]}),t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Setor Awal BOP",className:"mb-1"}),a(O,{name:"setoran_awal",id:"setoran_awal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:x,value:d.setoran_awal,placeholder:"Inputkan angka tanpa sparator"}),a(m,{message:o.setoran_awal,className:"mt-2"})]})]}),a(B,{type:"submit",title:"submit"})]})})]})})};export{Q as default};
