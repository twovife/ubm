import{r as n,a,j as s,g as i}from"./app-6794986b.js";import{I as l}from"./InputLabel-dc1061f9.js";import{M as p}from"./Modal-7476a281.js";import{P as c}from"./PrimaryButton-7b63f9f8.js";import{T as u}from"./TextInput-d1ef2681.js";import"./transition-2a1bbb41.js";const w=({show:o=!1,onClose:r})=>{const[t,m]=n.useState("");return a(p,{show:o,onClose:r,children:a("div",{className:"p-6 overflow-auto",children:s("form",{onSubmit:e=>{e.preventDefault(),i.get(route("mantriapps.angsur.angsur",t))},className:"max-w-md mb-3",children:[a(l,{value:"Masukkan Nomor KTP"}),s("div",{className:"flex items-baseline gap-3",children:[a(u,{className:"mt-1 block w-full",name:"cek_ktp",value:t,onChange:e=>{m(e.target.value)},id:"cek_ktp"}),a(c,{size:"sm",className:"whitespace-nowrap",title:"Cek KTP",type:"submit"})]})]})})})};export{w as default};
