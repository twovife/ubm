import{W as j,r as B,j as a,a as t}from"./app-15a65f49.js";import{C as i}from"./Navbar-8307b345.js";import{I as m}from"./InputError-af6aa722.js";import{I as n}from"./InputLabel-a7e268ec.js";import{L as S}from"./LinkButton-c4d02a32.js";import{P as L}from"./PrimaryButton-27d9f578.js";import{S as g}from"./SelectList-cb58a67c.js";import{T as O}from"./TextInput-7351ce8b.js";import{A as P}from"./AuthenticatedLayout-5446e34f.js";import{C as A}from"./index.esm-c19d9da0.js";import"./iconBase-e73ac9d8.js";import"./index.esm-8815781d.js";import"./transition-72712b5f.js";import"./index.esm-382287a8.js";import"./Loading-b2f2b3c5.js";const Q=({branch:c,employees:D,curent_unit:u,...d})=>{var w;console.log(d.back_params);const{data:p,setData:h,post:N,processing:v,errors:o}=j({branch_id:"",setoran_awal:15e5,transaction_date:""}),[f,y]=B.useState(),x=Object.values(c.reduce((e,s)=>{const l=s.wilayah;return e[l]={id:l,value:l,display:`wilayah ${l}`},e},{})),C=e=>{const{value:s}=e.target,l=c.filter(r=>r.wilayah==s).map(({id:r,unit:I})=>({id:r,display:I,value:r}));y(l)},b=e=>{const{value:s,name:l}=e.target;h(l,s)},_=(e,s)=>{h(s,e)},k=e=>{e.preventDefault(),N(route("bop.store"))};return a(P,{loading:v,children:t(i,{judul:"Setoran BOP Unit Baru ",children:[a(i.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:a(i.endContent,{className:"flex-wrap",children:a("div",{className:"w-full",children:a(S,{href:route("bop.index",[{bulan:((w=d.back_params)==null?void 0:w.bulan)??null}]),title:"Back",size:"sm",type:"button",className:"block whitespace-nowrap ml-auto",theme:"primary"})})})})}),a("div",{className:"p-3 bg-white rounded shadow lg:w-1/2 mx-auto",children:t("form",{onSubmit:k,className:"w-full",children:[t("div",{className:"lg:flex gap-3 w-full",children:[t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Wilayah",className:"mb-1"}),a(g,{onChange:C,options:x,nullValue:!0,className:"w-full"}),a(m,{message:o.wilayah,className:"mt-2"})]}),f&&t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Unit",className:"mb-1"}),a(g,{name:"branch_id",onChange:b,nullValue:!0,options:f,className:"w-full"}),a(m,{message:o.branch_id,className:"mt-2"})]})]}),t("div",{className:"lg:flex gap-3 w-full",children:[t("div",{className:"mb-2 flex-1 w-full",children:[a(n,{value:"Bulan",className:"mb-1"}),a(O,{className:"block w-full",type:"date",required:!0,name:"transaction_date",max:u.akhirbulan,min:u.awalbulan,value:p.transaction_date,onChange:b})]}),t("div",{className:"mb-2 flex-1",children:[a(n,{value:"Setor Awal BOP",className:"mb-1"}),a(A,{name:"setoran_awal",id:"setoran_awal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:_,value:p.setoran_awal,placeholder:"Inputkan angka tanpa sparator"}),a(m,{message:o.setoran_awal,className:"mt-2"})]})]}),a(L,{type:"submit",title:"submit"})]})})]})})};export{Q as default};
