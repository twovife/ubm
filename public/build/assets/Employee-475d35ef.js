import{r as i,j as e,F as A,a,n as S,g as p}from"./app-25a72498.js";import{P as M}from"./Pagination-165a1d8c.js";import{P as L}from"./PrimaryButton-e4bf7c34.js";import{S as o}from"./SelectList-ed960274.js";import{T as C}from"./TextInput-c3f9cff9.js";import{A as D}from"./AuthenticatedLayout-379eab3a.js";import{d as g}from"./dayjs.min-91ef050a.js";import{I}from"./index.esm-fedc1d97.js";import{I as x}from"./InputLabel-4b04c0a8.js";import{L as T}from"./Loading-2b6eeeab.js";import"./TextArea-0eb109cd.js";import{M as K}from"./ModalAlert-be09d373.js";import{L as u}from"./LinkButton-59d375ad.js";import"./SweetAlert-a220bfe0.js";import"./transition-a2430a37.js";import"./iconBase-5700b827.js";import"./index.esm-342e605e.js";import"./index.esm-7d2fa649.js";import"./Modal-83832326.js";const ea=({branch:N,employee:l,...s})=>{const y=l.from,d=l.data,[r,b]=i.useState({branch_id:"",is_active:"",search:"",...s.filters}),[f,h]=i.useState(!1);i.useState({show:!1,data:""});const m=t=>{h(!0);const n={...r,[t.target.name]:t.target.value};p.get(route("employee.index",{data:n}))},w=N.sort().map(t=>({id:t.id,display:t.unit,value:t.id})),v=t=>{b({...r,search:t.target.value})},_=t=>{h(!0),t.preventDefault();const n=document.getElementById("searchFill"),k={...r,search:n.value};p.get(route("employee.index",{data:k,onProgress:B=>{console.log("asd")}}))},[j,c]=i.useState({show:!1,textAlert:null,typeAlert:null}),P=t=>{c(!1)};return i.useEffect(()=>{s.flash.message&&c({show:!0,textAlert:s.flash.message,typeAlert:"success"}),s.errors[0]&&c({show:!0,textAlert:s.errors[0],typeAlert:"danger"})},[]),e(D,{auth:s.auth,errors:s.errors,header:e(A,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Karyawan"}),a("div",{className:"ml-auto flex items-center",children:a(u,{as:"a",href:route("employee.create"),icon:a(I,{}),size:"md",title:"Tambah"})})]}),children:[a(K,{alertParams:j,onClose:P}),a(S,{title:"Dashboard"}),a(T,{show:f}),a("div",{className:"py-3",children:a("div",{className:"mx-auto sm:px-6 lg:px-8",children:a("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:e("div",{className:"border p-6 text-main-800",children:[e("div",{className:"flex justify-between w-full items-center mb-6",children:[e("div",{className:"flex gap-3 items-center",children:[a(x,{value:"Unit :",className:"font-semibold"}),a(o,{value:r.branch_id,name:"branch_id",onChange:m,nullValue:!0,options:w})]}),e("div",{className:"ml-3 flex gap-3 items-center",children:[a(x,{value:"Status Karyawan :",className:"font-semibold"}),a(o,{value:r.is_active,name:"is_active",onChange:m,nullValue:!0,options:[{id:1,value:1,display:"Aktiv"},{id:2,value:2,display:"Keluar"}]})]}),a("div",{className:"ml-auto",children:e("form",{className:"flex gap-3",onSubmit:_,children:[a(C,{placeholder:"Cari Nama",id:"searchFill",className:"px-6",onChange:v,value:r.search}),a(L,{type:"submit",title:"search"})]})})]}),a("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6",children:e("table",{className:"w-full text-sm text-left text-main-500 dark:text-main-400",children:[a("thead",{className:"text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400",children:e("tr",{children:[a("th",{className:"px-6 py-3",children:"Nomor"}),a("th",{className:"px-6 py-3",children:"Action"}),a("th",{className:"px-6 py-3",children:"NIP"}),a("th",{className:"px-6 py-3",children:"Nama Karyawan"}),a("th",{className:"px-6 py-3",children:"NIK"}),a("th",{className:"px-6 py-3",children:a("span",{className:"px-32",children:"Alamat"})}),a("th",{className:"px-6 py-3",children:"Tanggal Masuk"}),a("th",{className:"px-6 py-3",children:"Lama Bekerja"}),a("th",{className:"px-6 py-3",children:"Jabatan"}),a("th",{className:"px-6 py-3",children:"Wilayah"}),a("th",{className:"px-6 py-3",children:"Cabang"}),a("th",{className:"px-6 py-3",children:"Jenis Jaminan"}),a("th",{className:"px-6 py-3 bg-gray-200",children:"Tanggal Perpindahan"}),a("th",{className:"px-6 py-3 bg-gray-200",children:"History Perpindahan"}),a("th",{className:"px-6 py-3 bg-gray-200",children:"Keterangan Perpindahan"}),a("th",{className:"px-6 py-3 bg-rose-100",children:"Tanggal Berhenti"}),a("th",{className:"px-6 py-3 bg-rose-100",children:"Keterangan Berhenti"}),a("th",{className:"px-6 py-3 bg-rose-100",children:"Tanggal Pengambilan S.Sukarela"}),a("th",{className:"px-6 py-3 bg-rose-100",children:"Petugas"}),a("th",{className:"px-6 py-3 bg-rose-100",children:"Tanggal Pengambilan S.Wajib"}),a("th",{className:"px-6 py-3 bg-rose-100",children:"Petugas"}),a("th",{className:"px-6 py-3 bg-rose-100",children:"Pengambilan Jaminan"}),a("th",{className:"px-6 py-3 bg-rose-100",children:"Petugas"})]})}),a("tbody",{children:d&&d.map((t,n)=>e("tr",{className:`border-b dark:bg-gray-900 dark:border-gray-700 ${t.resign_status=="Resign"?"bg-yellow-200":t.resign_status=="Pecat"?"bg-red-200":t.janis_jaminan==null||t.janis_jaminan==""?"bg-blue-200":"bg-white"}`,children:[a("td",{className:"px-6 py-4",children:n+y}),a("td",{className:"px-6 py-4",children:a("div",{className:"flex gap-2",children:a(u,{as:"a",href:route("employee.action",t.id),theme:"yellow",size:"sm",title:"Edit"})})}),a("td",{className:"px-6 py-4",children:t.nip}),a("td",{className:"px-6 py-4 whitespace-nowrap",children:t.nama_karyawan}),a("td",{className:"px-6 py-4",children:t.nik}),a("td",{className:"px-6 py-4",children:t.alamat}),a("td",{className:"px-6 py-4",children:g(t.hire_date).format("DD/MM/YYYY")}),a("td",{className:"px-6 py-4",children:Math.floor(g().diff(t.hire_date,"year",!0))}),a("td",{className:"px-6 py-4 whitespace-nowrap",children:t.area==0?t.jabatan:`${t.jabatan} ${t.area}`}),a("td",{className:"px-6 py-4 whitespace-nowrap",children:t.branch.wilayah}),a("td",{className:"px-6 py-4 whitespace-nowrap",children:t.branch.unit}),a("td",{className:"px-6 py-4",children:t.janis_jaminan}),a("td",{className:"px-6 py-4",children:t.history&&t.history.history_date}),a("td",{className:"px-6 py-4 uppercase",children:t.history&&t.history.keterangan}),a("td",{className:"px-6 py-4",children:t.history&&t.history.record}),a("td",{className:"px-6 py-4",children:t.date_resign}),a("td",{className:"px-6 py-4",children:t.resign_status}),a("td",{className:"px-6 py-4",children:t.pencairan_simpanan_date}),a("td",{className:"px-6 py-4",children:t.ttdss?t.ttdss.nama_karyawan:""}),a("td",{className:"px-6 py-4",children:t.pencairan_simpanan_w_date}),a("td",{className:"px-6 py-4",children:t.ttdsw?t.ttdsw.nama_karyawan:""}),a("td",{className:"px-6 py-4",children:t.handover_jaminan}),a("td",{className:"px-6 py-4",children:t.ttdjaminan?t.ttdjaminan.nama_karyawan:""})]},t.id))})]})}),a(M,{data:l})]})})})})]})};export{ea as default};