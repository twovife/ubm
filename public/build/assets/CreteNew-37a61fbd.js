import{_ as C,a as e,j as a}from"./app-66cb5542.js";import{D as _,a as S,b as D,c as x,d as I}from"./dialog-846a8d61.js";import{I as n}from"./InputLabel-d70115a7.js";import{T as k}from"./TextInput-7da1376d.js";import{C as j}from"./index.esm-ca1f291a.js";import{I as u}from"./InputError-4989f8c3.js";import{P}from"./PrimaryButton-e6e3700f.js";import{L as T}from"./Loading-b802964d.js";import{S as d}from"./SelectList-3762b1c5.js";import{u as q}from"./useServerFilter-a7686f7a.js";import"./utils-01642ffa.js";import"./transition-00bda6a6.js";const z=({open:h,onClosed:l})=>{const{wilayah:p,filteredBranch:g,selectedWilayah:o,onWilayahChangeHandler:b,setSelectedWilayah:F}=q(),{data:t,setData:i,post:f,processing:N,errors:m,reset:v}=C({branch_id:"",unit_payment_id:4,remark:"PINJAMAN GORO",nominal:1e6,transaction_date:"",type_transaksi:2}),c=r=>{const{value:s,name:w}=r.target;i(w,s)},y=(r,s)=>{i(s,r)};return e(_,{open:h,onOpenChange:r=>r==!0?null:l(),className:"text-sm",children:[a(T,{show:N}),e(S,{className:"lg:max-w-lg",children:[e(D,{children:[a(x,{children:"Pinjaman Goro Umroh"}),a(I,{children:"Pinjaman Goro Umroh"})]}),e("form",{className:"grid gap-4 py-4",onSubmit:r=>{r.preventDefault(),f(route("goroumrah.goro_create"),{preserveScroll:!0,preserveState:!0,onSuccess:()=>l(),onFinish:()=>v()})},children:[e("div",{className:"mb-3",children:[a(n,{value:"Wilayah",className:"mb-1"}),a(d,{name:"wilayah",value:o,className:"w-full",nullValue:!0,options:p,onChange:b,required:!0})]}),o!==""&&e("div",{className:"mb-3",children:[a(n,{value:"Unit",className:"mb-1"}),a(d,{name:"branch_id",className:"w-full",value:t.branch_id,nullValue:!0,options:g,onChange:c,required:!0})]}),e("div",{className:"mb-3",children:[a(n,{value:"Tanggal Transaksi",className:"mb-1"}),a(k,{name:"transaction_date",type:"date",className:"w-full inline-block",onChange:c,value:t.transaction_date,required:!0}),a(u,{message:m.transaction_date,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(n,{value:"Nominal",className:"mb-1"}),a(j,{name:"nominal",id:"nominal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:y,value:t.nominal,placeholder:"Inputkan angka tanpa sparator"}),a(u,{message:m.nominal,className:"mt-2"})]}),a("div",{className:"flex justify-end",children:a(P,{theme:"green",type:"submit",children:"Submit"})})]})]})]})};export{z as default};
