import{_ as d,j as t,a}from"./app-fdf32284.js";import{I as p}from"./InputError-a669d58a.js";import{I as f}from"./InputLabel-793a87c1.js";import{L as g}from"./Loading-ca7ddf5b.js";import{P as h}from"./PrimaryButton-fbe0e362.js";import{T as v}from"./TextInput-054d9190.js";import"./transition-d829c033.js";const D=({detailId:n,onClose:s,...b})=>{const{data:j,setData:r,put:i,processing:o,errors:m,reset:l}=d({date_resign:"",resign_status:"",resign_reson:""}),u=e=>{r(e.target.name,e.target.value)},c=()=>{l(),s()};return t("form",{className:"w-full h-full flex flex-col",onSubmit:e=>{e.preventDefault(),i(route("employee.handover",n),{onSuccess:()=>c()})},children:[a(g,{show:o}),a("div",{className:"tracking-widest font-semibold mb-3",children:"Pengambilan Jaminan"}),a(f,{htmlFor:"handover_jaminan",value:"Tanggal Diambil"}),t("div",{className:"flex items-center gap-3",children:[t("div",{className:"flex-[3]",children:[a(v,{required:!0,onChange:u,className:"mt-1 w-full",name:"handover_jaminan",id:"handover_jaminan",type:"date"}),a(p,{message:m.handover_jaminan,className:"mt-2"})]}),a("div",{children:a(h,{className:"ml-auto",title:"Setujui Pencairan",type:"submit"})})]})]})};export{D as default};