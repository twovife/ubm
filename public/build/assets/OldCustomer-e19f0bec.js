import{_ as h,j as r,a}from"./app-6794986b.js";import{C as f}from"./Checkbox-3f8e85a6.js";import{I as l}from"./InputError-254a1205.js";import{I as i}from"./InputLabel-dc1061f9.js";import{L as x}from"./Loading-26b5fb87.js";import{P as N}from"./PrimaryButton-7b63f9f8.js";import{T as d}from"./TextInput-d1ef2681.js";import{C as v}from"./index.esm-83c4a1d0.js";import"./transition-2a1bbb41.js";const q=({auth:t,...p})=>{const{data:n,setData:o,post:c,processing:u,errors:m}=h({nik:p.nik,unit_id:t.user.employee.branch_id,unit:t.user.employee.branch.unit,mantri:t.user.employee.id,tanggal_drop:"",type_drop:"",pinjaman:""}),s=e=>{o(e.target.name,e.target.type==="checkbox"?e.target.checked:e.target.value)},g=(e,b)=>{o(b,e)};return r("div",{className:"py-3 px-6 text-main-800 rounded-md border mb-3",children:[a(x,{show:u}),a("h1",{className:"mb-3 text-lg font-semibold",children:"Pengajuan Nasabah Lama"}),a("div",{className:"mb-3",children:r("form",{onSubmit:e=>{e.preventDefault(),c(route("mantriapps.pinjaman.store"))},children:[r("div",{className:"mb-1",children:[a(i,{value:"NIK"}),a(d,{className:"w-full text-xl mt-2",name:"nik",id:"nik",disabled:!0,value:n.nik,required:!0,onChange:s}),a(l,{message:m.nik,className:"mt-2"})]}),r("div",{className:"mb-1",children:[a(i,{value:"Tanggal Drop :"}),r("div",{className:"flex items-center gap-3",children:[r("div",{className:"flex-[3]",children:[a(d,{type:"date",className:"w-full text-xl mt-2",name:"tanggal_drop",id:"tanggal_drop",required:!0,value:n.tanggal_drop,onChange:s}),a(l,{message:m.tanggal_drop,className:"mt-2"})]}),a("div",{className:"flex-1",children:r("label",{className:"flex-1 flex items-center",children:[a(f,{name:"type_drop",value:n.type_drop,onChange:s}),a("span",{className:"ml-2 font-semibold",children:"Drop Langsung ?"})]})})]})]}),r("div",{className:"mb-1",children:[a(i,{value:"Jumlah Drop :"}),a(v,{name:"pinjaman",id:"pinjaman",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-xl mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:g,value:n.pinjaman,placeholder:"Inputkan angka tanpa sparator"}),a(l,{message:m.pinjaman,className:"mt-2"})]}),a("div",{children:a(N,{size:"md",title:"Submit",className:"block mt-2 ml-auto",type:"submit"})})]})})]})};export{q as default};
