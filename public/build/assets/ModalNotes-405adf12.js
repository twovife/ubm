import{_ as f,j as o,a}from"./app-6e80265d.js";import{I as h}from"./InputLabel-cd856161.js";import{L as b}from"./Loading-7978b7d8.js";import{M as N}from"./Modal-89458efc.js";import{P as g}from"./PrimaryButton-4e18fc5b.js";import{S as v}from"./SelectList-e9f73704.js";import"./TextInput-420b4604.js";import"./dayjs.min-8d0bae3b.js";import"./index.esm-67e102c1.js";import{I as L}from"./InputError-b8f8921a.js";import"./transition-52595909.js";const D=({closedModal:s,...n})=>{const{show:r,dataArray:e}=n.data,{data:l,setData:i,put:m,processing:u,reset:y,errors:p}=f({loan_notes:e?e.loan_notes:""}),c=[{id:1,value:"10L",display:"10L"},{id:2,value:"Beban Pemakaian",display:"Beban Pemakaian"},{id:3,value:"CM Lunas",display:"CM Lunas"}],d=t=>{i(t.target.name,t.target.type==="checkbox"?t.target.checked:t.target.value)};return o(N,{show:r,onClose:s,children:[a(b,{show:u}),o("form",{onSubmit:()=>{m(route("unit.pinjaman.editNotes",e.id??null))},className:"p-6 overflow-auto",children:[o("div",{className:"mb-1",children:[a(h,{value:"Jenis Nasabah :"}),a(v,{name:"loan_notes",options:c,nullValue:!0,value:l.loan_notes,onChange:d,className:"w-full text-xl mt-2"}),a(L,{message:p.loan_notes,className:"mt-2"})]}),a("div",{className:"w-full mt-3",children:a(g,{className:"ml-auto",title:"Setuju",type:"submit"})})]})]})};export{D as default};