import{W as S,j as a,r as K,a as e}from"./app-03fb5093.js";import{I as i}from"./InputError-379f7db7.js";import{I as n}from"./InputLabel-2a4bfdd0.js";import{P as I}from"./PrimaryButton-842e4140.js";import{S as u}from"./SelectList-1a007774.js";import{T as r}from"./TextInput-9244e08a.js";import{u as P}from"./useServerFilter-32035045.js";import{q as T}from"./transition-62fd6406.js";const H=({show:f,setShow:N,setLoading:c})=>{const{data:m,setData:p,post:g,reset:y,processing:W,errors:l}=S({nama_karyawan:"",nik:"",alamat:"",branch_id:"",hire_date:"",jabatan:"",area:"",janis_jaminan:""}),{wilayah:b,filteredBranch:w,selectedWilayah:h,onWilayahChangeHandler:k}=P(),x=[{id:1,value:"mantri",display:"Mantri"},{id:3,value:"admin",display:"Admin"},{id:4,value:"kasir",display:"Kasir"},{id:2,value:"kepala mantri",display:"Kepala Mantri"},{id:5,value:"wakil pimpinan",display:"Wakil Pimpinan"},{id:6,value:"pimpinan",display:"Pimpinan"},{id:7,value:"staf",display:"Staf"},{id:8,value:"staf kontrol",display:"Staf Kontrol"},{id:9,value:"pengawas",display:"Pengawas"}],j=[{id:1,value:1,display:"Cadangan"},{id:2,value:2,display:"Kontrak"}],s=t=>{const{name:o,value:d}=t.target;p(o,d)},_=t=>{const{name:o,value:d}=t.target,q={[o]:d,area:0};p(F=>({...F,...q}))},v=t=>{N(),y()},C=t=>{t.preventDefault(),c(!0),g(route("emp.store"),{onSuccess:o=>v(),onFinish:o=>c(!1)})};return a(T,{as:K.Fragment,show:f,enter:"transition ease-out duration-200",enterFrom:"transform opacity-0",enterTo:"transform opacity-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100",leaveTo:"transform opacity-0",children:a("div",{className:"fixed top-0 left-0 border px-6 py-3 rounded w-full h-screen z-[100] flex items-center justify-center",onClick:v,children:a("div",{className:"p-3 rounded shadow-lg bg-white border max-w-2xl w-full",onClick:t=>t.stopPropagation(),children:e("form",{onSubmit:C,className:"mt-3 bg-inherit",children:[a("div",{className:"text-gray-500 font-semibold text-xl mono",children:"Tambah Karywan Baru"}),e("div",{className:"w-full mx-auto flex",children:[e("div",{className:"flex-1 p-3",children:[e("div",{className:"mb-3",children:[a(n,{htmlFor:"nama_karyawan",value:"Nama Pegawai"}),a(r,{required:!0,onChange:s,className:"mt-1 w-full",name:"nama_karyawan",id:"nama_karyawan"}),a(i,{message:l.nama_karyawan,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(n,{htmlFor:"nik",value:"NIK"}),a(r,{required:!0,onChange:s,className:"mt-1 w-full",name:"nik",id:"nik"}),a(i,{message:l.nik,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(n,{required:!0,htmlFor:"alamat",value:"Alamat"}),a(r,{required:!0,onChange:s,className:"mt-1 w-full",name:"alamat",id:"alamat"}),a(i,{message:l.alamat,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(n,{value:"Wilayah",className:"mb-1"}),a(u,{name:"wilayah",value:h,className:"w-full",nullValue:!0,options:b,onChange:k,required:!0})]}),h!==""&&e("div",{className:"mb-3",children:[a(n,{value:"Unit",className:"mb-1"}),a(u,{name:"branch_id",className:"w-full",value:m.branch_id,nullValue:!0,options:w,onChange:s,required:!0})]}),e("div",{className:"mb-3",children:[a(n,{htmlFor:"hire_date",value:"Tanggal masuk"}),a(r,{required:!0,onChange:s,className:"mt-1 w-full",name:"hire_date",id:"hire_date",type:"date"}),a(i,{message:l.hire_date,className:"mt-2"})]})]}),e("div",{className:"flex-1 p-3",children:[e("div",{className:"flex flex-col lg:flex-row items-center justify-center gap-3 mb-3",children:[e("div",{className:"flex-1",children:[a(n,{value:"Jabatan"}),a(u,{required:!0,value:m.jabatan,className:"w-full",nullvalue:!0,options:x,name:"jabatan",onChange:_}),a(i,{message:l.jabatan,className:"mt-2"})]}),m.jabatan==="mantri"&&e("div",{className:"flex-1",children:[a(n,{value:"Kelompok"}),a(r,{className:"w-full",required:!0,name:"area",value:m.area,type:"number",min:"0",onChange:s}),a(i,{message:l.area,className:"mt-2"})]})]}),e("div",{className:"mb-3",children:[a(n,{htmlFor:"janis_jaminan",value:"Jenis Jaminan"}),a(r,{onChange:s,className:"mt-1 w-full",name:"janis_jaminan",id:"janis_jaminan"}),a(i,{message:l.janis_jaminan,className:"mt-2"})]}),e("div",{className:"mb-3",children:[a(n,{value:"Status Kontrak"}),a(u,{required:!0,name:"status_kontrak",value:m.status_kontrak,className:"w-full",nullvalue:!0,options:j,onChange:s}),a(i,{message:l.status_kontrak,className:"mt-2"})]})]})]}),a("div",{className:"flex justify-end items-end",children:a(I,{type:"submit",title:"Submit",theme:"green"})})]})})})})};export{H as default};