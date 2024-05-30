import{_ as S,j as a,r as A,a as l}from"./app-5ab5dafe.js";import{I as n}from"./InputLabel-39b75776.js";import{S as u}from"./SelectList-e396f9c0.js";import{I as r}from"./InputError-f46267ec.js";import{P as B}from"./PrimaryButton-c044392e.js";import{T as m}from"./TextInput-01069d32.js";import{u as E}from"./useServerFilter-5f7f38b2.js";import{T as P}from"./TextArea-1a6c2932.js";import{t as T}from"./transition-a5d0b238.js";const Y=({show:h,setShow:v,isActive:J,setLoading:K})=>{const{wilayah:f,selectedWilayah:p,setSelectedWilayah:g,filteredBranch:b,selectedBranch_id:W,selectedBulan:D}=E(),{data:t,setData:d,put:y,processing:M,errors:s,reset:N,recentlySuccessful:U}=S({branch_id:""}),w=e=>{e.target.value!="mantri"?(d({...t,area:0,[e.target.name]:e.target.value}),document.getElementById("updateArea").disabled=!0,document.getElementById("updateArea").required=""):(d(e.target.name,e.target.value),document.getElementById("updateArea").disabled=!1,document.getElementById("updateArea").focus(),document.getElementById("updateArea").required="require")},_=()=>{N(),onClose()},j=e=>{const{value:o}=e.target;g(o),d({branch_id:""})},x=[{id:1,value:"mantri",display:"Mantri"},{id:3,value:"admin",display:"Admin"},{id:4,value:"kasir",display:"Kasir"},{id:2,value:"kepala mantri",display:"Kepala Mantri"},{id:5,value:"wakil pimpinan",display:"Wakil Pimpinan"},{id:6,value:"pimpinan",display:"Pimpinan"},{id:7,value:"staf",display:"Staf"},{id:8,value:"staf kontrol",display:"Staf Kontrol"},{id:9,value:"pengawas",display:"Pengawas"}],i=e=>{const{name:o,value:c}=e.target;d(o,c)},k=e=>{const{name:o,value:c}=e.target,I={[o]:c,area:0};d(q=>({...q,...I}))},C=e=>{e.preventDefault(),y(route("employee.update",t.id),{onSuccess:()=>_()})},F=e=>{v()};return a(T,{as:A.Fragment,show:h,enter:"transition ease-out duration-200",enterFrom:"transform opacity-0",enterTo:"transform opacity-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100",leaveTo:"transform opacity-0",children:a("div",{className:"fixed top-0 left-0 border px-6 py-3 rounded w-full h-screen z-[100] flex items-center justify-center",onClick:F,children:a("div",{className:"p-3 rounded shadow-lg bg-white border max-w-md w-full",onClick:e=>e.stopPropagation(),children:l("form",{className:"overflow-y-auto",onSubmit:C,children:[a("div",{className:"tracking-widest font-semibold mb-3",children:"Update Data"}),l("div",{className:"mb-3",children:[a(n,{htmlFor:"nama_karyawan",value:"Nama Karyawan"}),a(m,{required:!0,onChange:i,className:"mt-1 w-full",name:"nama_karyawan",id:"nama_karyawan",type:"text",value:t.nama_karyawan}),a(r,{message:s.nama_karyawan,className:"mt-2"})]}),l("div",{className:"mb-3",children:[a(n,{htmlFor:"nik",value:"NIK"}),a(m,{required:!0,onChange:i,className:"mt-1 w-full",name:"nik",id:"nik",value:t.nik,type:"text"}),a(r,{message:s.nik,className:"mt-2"})]}),l("div",{className:"mb-3",children:[a(n,{htmlFor:"alamat",value:"Alamat"}),a(P,{required:!0,onChange:i,className:"mt-1 w-full",name:"alamat",id:"alamat",value:t.alamat,type:"text"}),a(r,{message:s.alamat,className:"mt-2"})]}),l("div",{className:"mb-3",children:[a(n,{htmlFor:"hire_date",value:"Tanggal Masuk"}),a(m,{required:!0,onChange:i,className:"mt-1 w-full",name:"hire_date",disabled:t.hire_date?!1:"disabled",id:"hire_date",value:t.hire_date,type:"date"}),a(r,{message:s.hire_date,className:"mt-2"})]}),l("div",{className:"mb-3",children:[a(n,{htmlFor:"jabatan",value:"Jabatan"}),l("div",{className:"flex gap-2",children:[a("div",{className:"flex-[2]",children:a(u,{required:!0,value:t.jabatan,onChange:w,nullValue:!0,className:"mt-1 w-full",name:"jabatan",id:"jabatan"})}),a("div",{className:"flex-1",children:a(m,{onChange:i,value:t.area,className:"mt-1",type:"number",disabled:t.area===0,name:"area",id:"updateArea"})})]})]}),l("div",{className:"mb-3",children:[a(n,{htmlFor:"branch_id",value:"Wilayah"}),a(u,{name:"wilayah",value:p,className:"w-full mt-1",nullValue:!0,options:f,onChange:j}),a(r,{message:s.branch_id,className:"mt-2"})]}),p!==""&&l("div",{className:"mb-3",children:[a(n,{htmlFor:"branch_id",value:"Wilayah"}),a(u,{name:"branch_id",className:"w-full mt-1",value:t.branch_id,nullValue:!0,required:!0,options:b,onChange:i}),a(r,{message:s.branch_id,className:"mt-2"})]}),l("div",{className:"flex flex-col lg:flex-row items-center justify-center gap-3 mt-3",children:[l("div",{className:"flex-1 w-full",children:[a(n,{value:"Jabatan"}),a(u,{required:!0,value:t.jabatan,className:"w-full",nullvalue:!0,options:x,name:"jabatan",onChange:k}),a(r,{message:s.jabatan,className:"mt-2"})]}),t.jabatan==="mantri"&&l("div",{className:"flex-1 w-full",children:[a(n,{value:"Kelompok"}),a(m,{required:!0,name:"area",value:t.area,type:"number",min:"0",onChange:i}),a(r,{message:s.area,className:"mt-2"})]})]}),l("div",{className:"mb-3",children:[a(n,{htmlFor:"janis_jaminan",value:"Jenis Jaminan"}),a(m,{onChange:i,className:"mt-1 w-full",name:"janis_jaminan",id:"janis_jaminan",value:t.janis_jaminan,type:"text"}),a(r,{message:s.janis_jaminan,className:"mt-2"})]}),a("div",{className:"w-full mt-auto",children:a(B,{className:"ml-auto",title:"Ubah Data",type:"submit"})})]})})})})};export{Y as default};
