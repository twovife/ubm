import{W as S,_ as C,a as e,j as a}from"./app-1d785132.js";import{I as r}from"./InputError-dbc39e5b.js";import{I as s}from"./InputLabel-faf6f2c6.js";import{P as K}from"./PrimaryButton-d85fef6e.js";import{S as o}from"./SelectList-244562dc.js";import{T as p}from"./TextInput-bd1c020b.js";import{u as I}from"./useServerFilter-1ecb9cd8.js";const V=({typeMutasi:f,closedModal:g})=>{const{employee:h}=S().props,{wilayah:y,selectedWilayah:v,setSelectedWilayah:b,filteredBranch:k}=I(),{data:t,setData:c,put:N,processing:W,recentlySuccessful:q,errors:i}=C({typeMutasi:parseInt(f),branch_id:"",tanggal_kembali:"",status_kontrak:"",jabatan:"",area:0,jenis_jaminan:""}),w=[{id:1,value:"mantri",display:"Mantri"},{id:3,value:"admin",display:"Admin"},{id:4,value:"kasir",display:"Kasir"},{id:2,value:"kepala mantri",display:"Kepala Mantri"},{id:5,value:"wakil pimpinan",display:"Wakil Pimpinan"},{id:6,value:"pimpinan",display:"Pimpinan"},{id:7,value:"staf",display:"Staf"},{id:8,value:"staf kontrol",display:"Staf Kontrol"},{id:9,value:"pengawas",display:"Pengawas"}],j=[{id:1,value:1,display:"Cadangan"},{id:2,value:2,display:"Kontrak"}],m=l=>{const{name:n,value:u}=l.target;c(n,u)},x=l=>{const{name:n,value:u}=l.target,d={[n]:u,area:0};c(_=>({..._,...d}))};return e("form",{onSubmit:l=>{l.preventDefault(),N(route("emp.kembali_karyawan",h.id),{onSuccess:n=>{g()},replace:!0})},className:"mt-3 bg-inherit",children:[a("div",{className:"text-gray-500 font-semibold text-xl mono",children:"Pilih Unit Dan Jabatan Baru"}),e("div",{className:"flex flex-col lg:flex-row items-center justify-center gap-3 mt-3",children:[e("div",{className:"flex-1 w-full",children:[a(s,{value:"Wilayah"}),a(o,{name:"wilayah",value:v,className:"w-full",nullValue:!0,required:!0,options:y,onChange:l=>{const{value:n}=l.target;b(n);const u={branch_id:n};c(d=>({...d,...u}))}})]}),v!==""&&e("div",{className:"flex-1 w-full",children:[a(s,{value:"Unit"}),a(o,{name:"branch_id",className:"w-full",value:t.branch_id,nullValue:!0,required:!0,options:k,onChange:m}),a(r,{message:i.branch_id,className:"mt-2"})]})]}),e("div",{className:"mt-3",children:[a(s,{value:"Tanggal Kembali"}),a(p,{name:"tanggal_kembali",value:t.tangal,required:!0,className:"w-full",type:"date",onChange:m}),a(r,{message:i.tanggal_kembali,className:"mt-2"})]}),e("div",{className:"mt-3",children:[a(s,{value:"Status Kontrak"}),a(o,{required:!0,name:"status_kontrak",value:t.status_kontrak,className:"w-full",nullvalue:!0,options:j,onChange:m}),a(r,{message:i.status_kontrak,className:"mt-2"})]}),e("div",{className:"flex flex-col lg:flex-row items-center justify-center gap-3 mt-3",children:[e("div",{className:"flex-1 w-full",children:[a(s,{value:"Jabatan"}),a(o,{required:!0,value:t.jabatan,className:"w-full",nullvalue:!0,options:w,name:"jabatan",onChange:x}),a(r,{message:i.jabatan,className:"mt-2"})]}),t.jabatan==="mantri"&&e("div",{className:"flex-1 w-full",children:[a(s,{value:"Kelompok"}),a(p,{required:!0,name:"area",value:t.area,type:"number",min:"0",onChange:m}),a(r,{message:i.area,className:"mt-2"})]})]}),e("div",{className:"mt-3",children:[a(s,{value:"Jenis Jaminan",optional:!0}),a(p,{name:"jenis_jaminan",value:t.jenis_jaminan,className:"w-full",onChange:m}),a(r,{message:i.status_kontrak,className:"mt-2"})]}),a("div",{className:"mt-3 flex justify-end items-center",children:a(K,{title:"Submit",type:"submit",theme:"green"})})]})};export{V as default};