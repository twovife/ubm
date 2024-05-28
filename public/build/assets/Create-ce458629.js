import{_ as k,r as I,j as a,a as t}from"./app-1d785132.js";import{C as i}from"./Navbar-5bc1c263.js";import{I as m}from"./InputError-dbc39e5b.js";import{I as n}from"./InputLabel-faf6f2c6.js";import{L as j}from"./LinkButton-a4b9655b.js";import{P as B}from"./PrimaryButton-d85fef6e.js";import{S as b}from"./SelectList-244562dc.js";import{T as S}from"./TextInput-bd1c020b.js";import{A as L}from"./AuthenticatedLayout-3cf4e6d7.js";import{C as O}from"./index.esm-6428d631.js";import"./index.esm-cfc0a015.js";import"./iconBase-72367d21.js";import"./index.esm-f651b8a5.js";import"./transition-773de677.js";import"./index.esm-0983ca43.js";import"./Loading-03bb076d.js";const Q=({branch:c,employees:P,curent_unit:u,...A})=>{const{data:d,setData:p,post:w,processing:g,errors:o}=k({branch_id:"",setoran_awal:15e5,transaction_date:""}),[h,N]=I.useState(),v=Object.values(c.reduce((e,s)=>{const l=s.wilayah;return e[l]={id:l,value:l,display:`wilayah ${l}`},e},{})),y=e=>{const{value:s}=e.target,l=c.filter(r=>r.wilayah==s).map(({id:r,unit:_})=>({id:r,display:_,value:r}));N(l)},f=e=>{const{value:s,name:l}=e.target;p(l,s)},x=(e,s)=>{p(s,e)},C=e=>{e.preventDefault(),w(route("bop.store"))};return a(L,{loading:g,children:t(i,{judul:"Setoran BOP Unit Baru ",children:[a(i.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:a(i.endContent,{className:"flex-wrap",children:a("div",{className:"w-full",children:a(j,{href:route("bop.index"),title:"Back",size:"sm",type:"button",className:"block whitespace-nowrap ml-auto",theme:"primary"})})})})}),a("div",{className:"p-3 bg-white rounded shadow lg:w-1/2 mx-auto",children:t("form",{onSubmit:C,className:"w-full",children:[t("div",{className:"lg:flex gap-3 w-full",children:[t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Wilayah",className:"mb-1"}),a(b,{onChange:y,options:v,nullValue:!0,className:"w-full"}),a(m,{message:o.wilayah,className:"mt-2"})]}),h&&t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Unit",className:"mb-1"}),a(b,{name:"branch_id",onChange:f,nullValue:!0,options:h,className:"w-full"}),a(m,{message:o.branch_id,className:"mt-2"})]})]}),t("div",{className:"lg:flex gap-3 w-full",children:[t("div",{className:"mb-2 flex-1 w-full",children:[a(n,{value:"Bulan",className:"mb-1"}),a(S,{className:"block w-full",type:"date",required:!0,name:"transaction_date",max:u.akhirbulan,min:u.awalbulan,value:d.transaction_date,onChange:f})]}),t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Setor Awal BOP",className:"mb-1"}),a(O,{name:"setoran_awal",id:"setoran_awal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:x,value:d.setoran_awal,placeholder:"Inputkan angka tanpa sparator"}),a(m,{message:o.setoran_awal,className:"mt-2"})]})]}),a(B,{type:"submit",title:"submit"})]})})]})})};export{Q as default};