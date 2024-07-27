import{_ as N,a as e,j as a}from"./app-66cb5542.js";import{D as k,a as v,b as y,c as _,d as C}from"./dialog-846a8d61.js";import{I as t}from"./InputLabel-d70115a7.js";import{T as u}from"./TextInput-7da1376d.js";import{C as D}from"./index.esm-ca1f291a.js";import{I as i}from"./InputError-4989f8c3.js";import{P as x}from"./PrimaryButton-e6e3700f.js";import{L as w}from"./Loading-b802964d.js";import{S}from"./SelectList-3762b1c5.js";import"./utils-01642ffa.js";import"./transition-00bda6a6.js";const V=({open:d,onClosed:o})=>{const{data:s,setData:c,post:p,processing:g,errors:n,reset:h}=N({branch_id:"",unit_payment_id:2,remark:"",nominal:0,transaction_date:"",type_transaksi:""}),m=r=>{const{value:l,name:f}=r.target;c(f,l)},b=(r,l)=>{c(l,r)};return e(k,{open:d,onOpenChange:r=>r==!0?"":o(),className:"text-sm",children:[a(w,{show:g}),e(v,{className:"lg:max-w-lg",children:[e(y,{children:[a(_,{children:"Transaksi Goro Umroh"}),a(C,{children:"Pembayaran Goro Umroh Bulanan"})]}),e("form",{className:"grid gap-4 py-4",onSubmit:r=>{r.preventDefault(),p(route("goroumrah.goro_create"),{preserveScroll:!0,preserveState:!0,onSuccess:()=>o(),onFinish:()=>h()})},children:[e("div",{className:"mb-3",children:[a(t,{value:"Tanggal Transaksi",className:"mb-1"}),a(u,{name:"transaction_date",type:"date",className:"w-full inline-block",onChange:m,value:s.transaction_date,required:!0}),a(i,{message:n.transaction_date,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(t,{value:"Tipe Transaksi",className:"mb-1"}),a(S,{name:"type_transaksi",className:"w-full inline-block",onChange:m,value:s.type_transaksi,nullValue:!0,options:[{id:1,display:"Debit",value:1},{id:2,display:"Kredit",value:2}],required:!0}),a(i,{message:n.type_transaksi,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(t,{value:"Nominal",className:"mb-1"}),a(D,{name:"nominal",id:"nominal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:b,value:s.nominal,placeholder:"Inputkan angka tanpa sparator"}),a(i,{message:n.nominal,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(t,{value:"Keterangan",className:"mb-1"}),a(u,{name:"remark",type:"text",className:"w-full inline-block",onChange:m,value:s.remark,required:!0}),a(i,{message:n.remark,className:"mt-2"})]}),a("div",{className:"flex justify-end",children:a(x,{theme:"green",type:"submit",children:"Submit"})})]})]})]})};export{V as default};
