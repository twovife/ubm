import{_ as b,j as e,a}from"./app-c0f178b1.js";import{C as N}from"./Checkbox-32515570.js";import{I as r}from"./InputError-fb935f2c.js";import{I as s}from"./InputLabel-41034c23.js";import{L as f}from"./Loading-120ec70c.js";import{P as x}from"./PrimaryButton-feca37e1.js";import{T as v}from"./TextArea-58cb05f3.js";import{T as i}from"./TextInput-433d15d0.js";import{C as k}from"./index.esm-30c4b5e8.js";import"./transition-53e05b05.js";const K=({auth:o,...c})=>{const{data:n,setData:d,post:u,processing:p,errors:t}=b({nama:"",nik:c.nik,no_kk:"",alamat:"",unit_id:o.user.employee.branch_id,unit:o.user.employee.branch.unit,mantri:o.user.employee.id,tanggal_drop:"",type_drop:"",pinjaman:"",jenisNasabah:""}),l=m=>{d(m.target.name,m.target.type==="checkbox"?m.target.checked:m.target.value)},g=(m,h)=>{d(h,m)};return e("div",{className:"py-3 px-6 text-main-800 rounded-md border mb-3",children:[a(f,{show:p}),a("h1",{className:"mb-3 text-lg font-semibold",children:"Pengajuan Nasabah Baru"}),a("div",{className:"mb-3",children:e("form",{onSubmit:m=>{m.preventDefault(),u(route("mantriapps.pinjaman.store"))},children:[e("div",{className:"mb-1",children:[a(s,{value:"NIK"}),a(i,{className:"w-full text-xl mt-2",name:"nik",id:"nik",disabled:!0,value:n.nik,required:!0,onChange:l}),a(r,{message:t.nik,className:"mt-2"})]}),e("div",{className:"mb-1",children:[a(s,{value:"No KK",optional:!0}),a(i,{className:"w-full text-xl mt-2",name:"no_kk",id:"no_kk",value:n.no_kk,onChange:l}),a(r,{message:t.no_kk,className:"mt-2"})]}),e("div",{className:"mb-1",children:[a(s,{value:"Nama Customer"}),a(i,{className:"w-full text-xl mt-2",name:"nama",id:"nama",value:n.nama,required:!0,onChange:l}),a(r,{message:t.nama,className:"mt-2"})]}),e("div",{className:"mb-1",children:[a(s,{value:"Alamat"}),a(v,{className:"w-full text-xl mt-2",name:"alamat",id:"alamat",value:n.alamat,required:!0,onChange:l}),a(r,{message:t.alamat,className:"mt-2"})]}),e("div",{className:"mb-1",children:[a(s,{value:"Tanggal Drop :"}),e("div",{className:"flex items-center gap-3",children:[e("div",{className:"flex-[3]",children:[a(i,{type:"date",className:"w-full text-xl mt-2",name:"tanggal_drop",id:"tanggal_drop",required:!0,value:n.tanggal_drop,onChange:l}),a(r,{message:t.tanggal_drop,className:"mt-2"})]}),a("div",{className:"flex-1",children:e("label",{className:"flex-1 flex items-center",children:[a(N,{name:"type_drop",value:n.type_drop,onChange:l}),a("span",{className:"ml-2 font-semibold",children:"Drop Langsung ?"})]})})]})]}),e("div",{className:"mb-1",children:[a(s,{value:"Jumlah Drop :"}),a(k,{name:"pinjaman",id:"pinjaman",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-xl mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:g,value:n.pinjaman,placeholder:"Inputkan angka tanpa sparator"}),a(r,{message:t.pinjaman,className:"mt-2"})]}),a("div",{children:a(x,{size:"md",title:"Submit",className:"block mt-2 ml-auto",type:"submit"})})]})})]})};export{K as default};
