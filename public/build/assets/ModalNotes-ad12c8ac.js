import{_ as f,a as o,j as a}from"./app-35486303.js";import{I as h}from"./InputLabel-f58801a2.js";import{L as b}from"./Loading-2bf0e064.js";import{M as N}from"./Modal-732cabc6.js";import{P as g}from"./PrimaryButton-c89a07da.js";import{S as v}from"./SelectList-e48d4d18.js";import"./TextInput-ba3a0fa1.js";import"./dayjs.min-8d593140.js";import"./index.esm-b943725c.js";import{I as L}from"./InputError-a7b3b63c.js";import"./transition-2adfecdb.js";const D=({closedModal:s,...n})=>{const{show:r,dataArray:e}=n.data,{data:l,setData:i,put:m,processing:u,reset:y,errors:p}=f({loan_notes:e?e.loan_notes:""}),c=[{id:1,value:"10L",display:"10L"},{id:2,value:"Beban Pemakaian",display:"Beban Pemakaian"},{id:3,value:"CM Lunas",display:"CM Lunas"}],d=t=>{i(t.target.name,t.target.type==="checkbox"?t.target.checked:t.target.value)};return o(N,{show:r,onClose:s,children:[a(b,{show:u}),o("form",{onSubmit:()=>{m(route("unit.pinjaman.editNotes",e.id??null))},className:"p-6 overflow-auto",children:[o("div",{className:"mb-1",children:[a(h,{value:"Jenis Nasabah :"}),a(v,{name:"loan_notes",options:c,nullValue:!0,value:l.loan_notes,onChange:d,className:"w-full text-xl mt-2"}),a(L,{message:p.loan_notes,className:"mt-2"})]}),a("div",{className:"w-full mt-3",children:a(g,{className:"ml-auto",title:"Setuju",type:"submit"})})]})]})};export{D as default};
