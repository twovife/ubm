import{_ as g,r as f,a,j as e}from"./app-6e80265d.js";import{I as s}from"./InputError-b8f8921a.js";import{I as l}from"./InputLabel-cd856161.js";import{M as h}from"./Modal-89458efc.js";import{P as x}from"./PrimaryButton-4e18fc5b.js";import{T as o}from"./TextInput-420b4604.js";import"./transition-52595909.js";const w=({show:p,onClose:d,...u})=>{const{auth:N,dataNik:m}=u,{data:b,setData:i,post:c,processing:v,errors:n}=g({nik:"",tanggal_drop:"",pinjaman:""});f.useEffect(()=>{i("nik",m)},[m]);const r=t=>{i(t.target.name,t.target.value)};return a(h,{maxWidth:"2xl",show:p,onClose:d,children:a("div",{className:"p-6",children:e("form",{onSubmit:t=>{t.preventDefault(),c(route("mantriapps.pinjaman.oldCustomerDropStore"))},children:[e("div",{className:"mb-1",children:[a(l,{value:"NIK :"}),a(o,{readOnly:!0,className:"w-full text-xl mt-2",name:"nik",id:"nik",value:m,onChange:r}),a(s,{message:n.nik,className:"mt-2"})]}),e("div",{className:"mb-1",children:[a(l,{value:"Tanggal Drop :"}),a(o,{type:"date",className:"w-full text-xl mt-2",name:"tanggal_drop",id:"tanggal_drop",onChange:r}),a(s,{message:n.tanggal_drop,className:"mt-2"})]}),e("div",{className:"mb-1",children:[a(l,{value:"Jumlah Drop :"}),a(o,{type:"number",className:"w-full text-xl mt-2",name:"pinjaman",id:"pinjaman",onChange:r}),a(s,{message:n.pinjaman,className:"mt-2"})]}),a("div",{children:a(x,{size:"md",title:"Submit",className:"block mt-2 ml-auto",type:"submit"})})]})})})};export{w as default};