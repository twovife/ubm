import{r as n,a,j as s,g as i}from"./app-f485e328.js";import{I as l}from"./InputLabel-2709cae0.js";import{M as p}from"./Modal-20dfa011.js";import{P as c}from"./PrimaryButton-24b6c63c.js";import{T as u}from"./TextInput-40845f71.js";import"./transition-e7985ea4.js";const w=({show:o=!1,onClose:r})=>{const[t,m]=n.useState("");return a(p,{show:o,onClose:r,children:a("div",{className:"p-6 overflow-auto",children:s("form",{onSubmit:e=>{e.preventDefault(),i.get(route("mantriapps.angsur.angsur",t))},className:"max-w-md mb-3",children:[a(l,{value:"Masukkan Nomor KTP"}),s("div",{className:"flex items-baseline gap-3",children:[a(u,{className:"mt-1 block w-full",name:"cek_ktp",value:t,onChange:e=>{m(e.target.value)},id:"cek_ktp"}),a(c,{size:"sm",className:"whitespace-nowrap",title:"Cek KTP",type:"submit"})]})]})})})};export{w as default};