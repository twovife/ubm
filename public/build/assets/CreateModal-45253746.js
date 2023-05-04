import{_ as f,j as t,a}from"./app-b1e3a402.js";import{I as r}from"./InputLabel-c9d1d76a.js";import{L as N}from"./Loading-39904f7c.js";import{M as y}from"./Modal-e60bd39f.js";import{P as _}from"./PrimaryButton-52d0cdfe.js";import{S as u}from"./SelectList-be2283c5.js";import{T as l}from"./TextInput-0f398284.js";import"./transition-a48afc42.js";const M=({show:o,onClose:i,...m})=>{const{data:w,setData:s,post:c,reset:h,processing:d,errors:x}=f({nama_karyawan:"",nik:"",alamat:"",branch_id:"",hire_date:"",jabatan:"",area:"",janis_jaminan:""}),b=m.branch.map(e=>({id:e.id,value:e.id,display:e.unit})),g=m.titles.map(e=>({id:e.id,value:e.title,display:e.title})),p=e=>{s(e.target.name,e.target.value),e.target.value!=="mantri"?(document.getElementById("area").disabled=!0,document.getElementById("area").removeAttribute("required")):(document.getElementById("area").disabled=!1,document.getElementById("area").focus(),document.getElementById("area").setAttribute("required","required"))},n=e=>{s(e.target.name,e.target.value)},v=e=>{h(),i()};return t(y,{maxWidth:"4xl",show:o,onClose:i,children:[a(N,{show:d}),a("form",{onSubmit:e=>{e.preventDefault(),c(route("employee.store"),{onFinish:C=>v()})},children:t("div",{className:"p-6",children:[a("h1",{className:"mb-3 text-lg font-semibold tracking-widest",children:"Input Data Karyawan"}),a("div",{className:"max-w-lg mx-auto",children:t("div",{className:"flex-1 px-6",children:[t("div",{className:"mb-3",children:[a(r,{htmlFor:"nama_karyawan",value:"Nama Pegawai"}),a(l,{required:!0,onChange:n,className:"mt-1 w-full",name:"nama_karyawan",id:"nama_karyawan"})]}),t("div",{className:"mb-3",children:[a(r,{htmlFor:"nik",value:"NIK"}),a(l,{required:!0,onChange:n,className:"mt-1 w-full",name:"nik",id:"nik"})]}),t("div",{className:"mb-3",children:[a(r,{required:!0,htmlFor:"alamat",value:"Alamat"}),a(l,{required:!0,onChange:n,className:"mt-1 w-full",name:"alamat",id:"alamat"})]}),a("br",{}),t("div",{className:"mb-3",children:[a(r,{htmlFor:"branch_id",value:"Unit"}),a(u,{required:!0,onChange:n,className:"mt-1 w-full",name:"branch_id",id:"branch_id",nullValue:!0,options:b})]}),t("div",{className:"mb-3",children:[a(r,{htmlFor:"hire_date",value:"Tanggal masuk"}),a(l,{required:!0,onChange:n,className:"mt-1 w-full",name:"hire_date",id:"hire_date",type:"date"})]}),t("div",{className:"mb-3",children:[a(r,{htmlFor:"jabatan",value:"Jabatan"}),t("div",{className:"flex gap-2",children:[a(u,{required:!0,onChange:p,nullValue:!0,options:g,className:"flex-[2]",name:"jabatan",id:"jabatan"}),a(l,{onChange:n,className:"flex-1",type:"number",disabled:!0,name:"area",id:"area"})]})]}),t("div",{className:"mb-3",children:[a(r,{htmlFor:"janis_jaminan",value:"Jenis Jaminan"}),a(l,{onChange:n,className:"mt-1 w-full",name:"janis_jaminan",id:"janis_jaminan"})]})]})}),a("div",{className:"w-full",children:a(_,{type:"submit",title:"Submit",theme:"green",disabled:d,className:"ml-auto"})})]})})]})};export{M as default};
