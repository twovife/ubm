import{_ as g,j as a,a as l}from"./app-6e6d0e61.js";import{B as v}from"./ButtonWrapper-5c45b674.js";import{A as w,C as o}from"./AuthenticatedLayout-d6e4433e.js";import{I as k}from"./InputError-84ac2462.js";import{I as s}from"./InputLabel-7f9be826.js";import{L as S}from"./LinkButton-4fa5f66f.js";import{P as C}from"./PrimaryButton-12ccfabe.js";import{T as n}from"./TextInput-ee64155e.js";import{C as B}from"./index.esm-31577bb4.js";import{N as i}from"./react-number-format.es-8e0ba211.js";import"./transition-74e3025e.js";import"./index.esm-bd028a30.js";const z=({details:c,curent_unit:t,...p})=>{const{data:d,setData:m,post:h,processing:u,errors:b}=g({debit:15e5,transaction_date:""}),x=e=>{const{value:r,name:f}=e.target;m(f,r)},N=(e,r)=>{m(r,e)},y=e=>{e.preventDefault(),h(route("bop.update",t.id))};return a(w,{loading:u,children:l(o,{judul:"Setor BOP Unit",children:[a(o.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:a(o.endContent,{className:"flex-wrap",children:a(v,{children:a(S,{href:route("bop.index",[{bulan:p.back_params.bulan}]),title:"Back",size:"sm",type:"button",className:"block whitespace-nowrap ml-auto",theme:"primary"})})})})}),l("div",{className:"sm:px-6 lg:px-8",children:[a("div",{className:"p-3 bg-white rounded shadow max-w-6xl mx-auto mb-3",children:l("table",{className:"w-full text-xs text-left text-gray-500",children:[a("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:l("tr",{children:[a("th",{className:"px-6 py-4",children:"Nomor"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Bulan"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Wilayah"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Unit"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Saldo Sebelum"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Simpanan"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Saldo"})]})}),a("tbody",{children:c?c.map((e,r)=>l("tr",{className:"even:bg-gray-100",children:[a("th",{className:"px-6 py-1",children:a("td",{colSpan:"2",children:r+1})},r),a("td",{className:"px-6 py-1",children:e.tanggal}),a("td",{className:"px-6 py-1",children:e.wilayah}),a("td",{className:"px-6 py-1",children:e.unit}),a("td",{className:"px-6 py-1",children:a(i,{value:e.saldo_before,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-1",children:a(i,{value:e.debit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-1",children:a(i,{value:e.saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})):a("tr",{children:a("td",{colSpan:"2",children:"Data Not Found"})})})]})}),t.editable&&a("div",{className:"p-3 bg-white rounded shadow max-w-6xl mx-auto",children:l("form",{onSubmit:y,className:"w-full",children:[l("div",{className:"lg:flex gap-3 w-full",children:[l("div",{className:"mb-2 flex-1",children:[a(s,{value:"Wilayah",className:"mb-1"}),a(n,{disabled:!0,value:t.wilayah})]}),l("div",{className:"mb-2 flex-1",children:[a(s,{value:"Unit",className:"mb-1"}),a(n,{disabled:!0,value:t.unit})]}),l("div",{className:"mb-2 flex-1 w-full",children:[a(s,{value:"Bulan",className:"mb-1"}),a(n,{className:"block w-full",type:"date",required:!0,name:"transaction_date",min:t.awalbulan,max:t.akhirbulan,value:d.transaction_date,onChange:x})]})]}),l("div",{className:"mb-2",children:[a(s,{value:"Setoran Simpanan Wajib",className:"mb-1"}),a(B,{name:"debit",id:"debit",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:N,value:d.debit,placeholder:"Inputkan angka tanpa sparator"}),a(k,{message:b.debit,className:"mt-2"})]}),a(C,{type:"submit",title:"submit"})]})})]})]})})};export{z as default};
