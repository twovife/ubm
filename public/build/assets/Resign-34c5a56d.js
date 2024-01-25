import{_ as v,j as n,a}from"./app-e7588a7f.js";import{I as s}from"./InputError-a125ab50.js";import{I as l}from"./InputLabel-5bffdcd9.js";import{L as f}from"./Loading-63179d32.js";import{P as _}from"./PrimaryButton-1d462f06.js";import{S as u}from"./SelectList-d9cce4fd.js";import"./TextArea-0b22e09a.js";import{T as d}from"./TextInput-901027fc.js";import"./transition-9e4a2392.js";const k=({detailData:i,branch:c,...g})=>{const{data:t,setData:o,put:h,processing:b,errors:r,reset:j}=v({id:i.id,history_date:"",jabatan:i.jabatan,area:i.area,branch_id:i.branch_id,janis_jaminan:""}),m=e=>{o(e.target.name,e.target.value)},p=e=>{e.target.value!="mantri"?(o({...t,area:0,[e.target.name]:e.target.value}),document.getElementById("resignArea").disabled=!0,document.getElementById("resignArea").required=""):(o(e.target.name,e.target.value),document.getElementById("resignArea").disabled=!1,document.getElementById("resignArea").focus(),document.getElementById("resignArea").required="require")};return n("form",{className:"overflow-y-auto",onSubmit:e=>{e.preventDefault(),console.log(t),h(route("employee.reactive",t.id))},children:[a(f,{show:b}),a("div",{className:"tracking-widest font-semibold mb-3",children:"Kembali Masuk"}),n("div",{className:"mb-3",children:[a(l,{htmlFor:"history_date",value:"Tanggal Masuk Kembali"}),a(d,{required:!0,onChange:m,className:"mt-1 w-full",name:"history_date",id:"history_date",value:t.history_date,type:"date"}),a(s,{message:r.hire_date,className:"mt-2"})]}),n("div",{className:"mb-3",children:[a(l,{htmlFor:"jabatan",value:"Jabatan Baru"}),n("div",{className:"flex gap-2",children:[n("div",{className:"flex-[2]",children:[a(u,{required:!0,value:t.jabatan,onChange:p,nullValue:!0,options:g.titles,className:"mt-1 w-full",name:"jabatan",id:"jabatan"}),a(s,{message:r.branch_id,className:"mt-2"})]}),n("div",{className:"flex-1",children:[a(d,{onChange:m,value:t.area,className:"mt-1",type:"number",disabled:t.area===0,name:"area",id:"resignArea"}),a(s,{message:r.branch_id,className:"mt-2"})]})]})]}),n("div",{className:"mb-3",children:[a(l,{htmlFor:"branch_id",value:"Unit Baru"}),a(u,{required:!0,value:t.branch_id,onChange:m,className:"mt-1 w-full",name:"branch_id",id:"branch_id",options:c}),a(s,{message:r.branch_id,className:"mt-2"})]}),n("div",{className:"mb-3",children:[a(l,{htmlFor:"janis_jaminan",value:"Jenis Jaminan"}),a(d,{onChange:m,className:"mt-1 w-full",name:"janis_jaminan",id:"janis_jaminan",value:t.janis_jaminan,type:"text"}),a(s,{message:r.janis_jaminan,className:"mt-2"})]}),a("div",{className:"w-full mt-auto",children:a(_,{className:"ml-auto",title:"Aktivkan Kembali",type:"submit"})})]})};export{k as default};