import{r as l,W as v,a,j as e}from"./app-02daae82.js";import"./Navbar-25c622c5.js";import{I as p}from"./InputError-4b2065f7.js";import{I as d}from"./InputLabel-cf4d0354.js";import{P as x}from"./PrimaryButton-766ea5f3.js";import{T as N}from"./TextInput-0be98de0.js";import{L as C}from"./Loading-5377d93d.js";import{C as S}from"./index.esm-4764c0db.js";import{D as _,a as D,b as y,c as T,d as I}from"./dialog-902129b6.js";import"./iconBase-29f29ecf.js";import"./index.esm-b32c738a.js";import"./transition-de6f9320.js";import"./index.esm-21f6a8e9.js";import"./utils-01642ffa.js";const M=({branchId:r,branch:m,open:g,onClosed:i,...j})=>{const[k,f]=l.useState(!1),{data:c,setData:s,post:h,processing:o,errors:u}=v({branch_id:r,setoran_awal:1e6,transaction_date:""});l.useEffect(()=>{f(o)},[o]),l.useEffect(()=>{s("branch_id",r)},[r]);const b=t=>{const{value:n,name:w}=t.target;s(w,n)};return a(_,{open:g,onOpenChange:t=>t==!0?"":i(),className:"text-sm",children:[e(C,{show:o}),a(D,{className:"lg:max-w-3xl max-h-[90vh] overflow-auto",children:[a(y,{children:[a(T,{children:["Tabungan 1 JT ",m]}),a(I,{children:["Setoran Baru Tabungan 1JT ",m]})]}),a("form",{onSubmit:t=>{t.preventDefault(),h(route("unitsaving.store"),{preserveScroll:!0,preserveState:!0,onSuccess:()=>i(),onFinish:()=>reset()})},className:"w-full",children:[a("div",{className:"lg:flex gap-3 w-full",children:[a("div",{className:"mb-2 flex-1",children:[e(d,{value:"Setor Awal Simpanan Wajib",className:"mb-1"}),e(S,{name:"setoran_awal",id:"setoran_awal",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:(t,n)=>{s(n,t)},value:c.setoran_awal,placeholder:"Inputkan angka tanpa sparator"}),e(p,{message:u.setoran_awal,className:"mt-2"})]}),a("div",{className:"mb-2 flex-1",children:[e(d,{value:"Jumlah Setor",className:"mb-1"}),e(N,{name:"transaction_date",value:c.transaction_date,type:"date",onChange:b,className:"w-full"}),e(p,{message:u.setoran_awal,className:"mt-2"})]})]}),e(x,{type:"submit",title:"submit"})]})]})]})};export{M as default};