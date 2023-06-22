import{r as N,j as t,F as u,a,n as b}from"./app-fb0605f7.js";import{P as f}from"./Pagination-2fceaca5.js";import{P as h}from"./PrimaryButton-0a91b541.js";import{S as w}from"./SelectList-c2789120.js";import{T as _}from"./TextInput-32029054.js";import{A as y}from"./AuthenticatedLayout-9bb29f43.js";import{d as v}from"./dayjs.min-86fafd73.js";import{a as k,b as j}from"./index.esm-749211a1.js";import P from"./ReactiveModal-bbd0194c.js";import"./transition-5bf56c86.js";import"./index.esm-823b205b.js";import"./iconBase-77bd93ce.js";import"./InputError-c308d894.js";import"./InputLabel-188d0602.js";import"./Modal-3da8fb92.js";const z=({branch:o,employee:e,...c})=>{const m=e.from,x=()=>{const s=e.last_page<5?e.last_page-1:4;let r=[],i;e.last_page<5&&(i=1),e.current_page<=3?i=1:e.last_page-e.current_page<2?i=e.last_page-4:i=e.current_page-2;for(let l=i;l<=i+s;l++)r.push(e.links[l]);return r},n=e.data,[d,p]=N.useState({show:!1,id:""}),g=s=>{p(!1)};return t(y,{auth:c.auth,errors:c.errors,header:t(u,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Eks Karyawan"}),a("div",{className:"ml-auto flex items-center",children:a(h,{icon:a(k,{}),size:"md",title:"Tambah",onClick:()=>alert("maaf menu ini belum ada")})})]}),children:[a(b,{title:"Dashboard"}),a(P,{show:d.show,detailId:d.id,onClose:g,branch:o}),a("div",{className:"py-3",children:a("div",{className:"mx-auto sm:px-6 lg:px-8",children:a("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:t("div",{className:"border p-6 text-main-800",children:[t("div",{className:"flex justify-between w-full items-center mb-6",children:[a("div",{children:a(w,{nullValue:!0,options:[{id:1,value:1,display:"All"},{id:2,value:1,display:"Gresik 1"}]})}),a("div",{className:"ml-auto",children:a(_,{placeholder:"Cari Nama",className:"px-6"})})]}),a("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6",children:t("table",{className:"w-full text-sm text-left text-main-500 dark:text-main-400",children:[a("thead",{className:"text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400",children:t("tr",{children:[a("th",{scope:"col",className:"px-6 py-3",children:"Nomor"}),a("th",{scope:"col",className:"px-6 py-3",children:"Action"}),a("th",{scope:"col",className:"px-6 py-3",children:"NIP"}),a("th",{scope:"col",className:"px-6 py-3",children:"Nama Karyawan"}),a("th",{scope:"col",className:"px-6 py-3",children:"NIK"}),a("th",{className:"px-6 py-3",children:"Alamat - Kota"}),a("th",{scope:"col",className:"px-6 py-3",children:"Tanggal Masuk"}),a("th",{scope:"col",className:"px-6 py-3",children:"Jabatan"}),a("th",{scope:"col",className:"px-6 py-3",children:"Wilayah"}),a("th",{scope:"col",className:"px-6 py-3",children:"Cabang"}),a("th",{scope:"col",className:"px-6 py-3",children:"Jenis Jaminan"}),a("th",{scope:"col",className:"px-6 py-3 bg-rose-100",children:"Tanggal Berhenti"}),a("th",{scope:"col",className:"px-6 py-3 bg-rose-100",children:"Keterangan Berhenti"}),a("th",{scope:"col",className:"px-6 py-3 bg-rose-100",children:"Alasan Berhenti"}),a("th",{scope:"col",className:"px-6 py-3 bg-rose-100",children:"Tanggal Pengambilan S.Sukarela"}),a("th",{scope:"col",className:"px-6 py-3 bg-rose-100",children:"Petugas"}),a("th",{scope:"col",className:"px-6 py-3 bg-rose-100",children:"Pengambilan Jaminan & S.Wajib"}),a("th",{scope:"col",className:"px-6 py-3 bg-rose-100",children:"Petugas"})]})}),a("tbody",{children:n&&n.map((s,r)=>t("tr",{className:"bg-white border-b dark:bg-gray-900 dark:border-gray-700",children:[a("td",{className:"px-6 py-4",children:r+m}),a("td",{className:"px-6 py-4",children:a("div",{className:"flex gap-2",children:a(h,{onClick:()=>p({show:!0,id:s.id}),theme:"yellow",size:"box",icon:a(j,{})})})}),a("td",{className:"px-6 py-4",children:s.nip}),a("td",{className:"px-6 py-4 whitespace-nowrap",children:s.nama_karyawan}),a("td",{className:"px-6 py-4",children:s.nik}),a("td",{className:"px-6 py-4",children:`${s.alamat} - ${s.kota}`}),a("td",{className:"px-6 py-4",children:v(s.hire_date).format("DD/MM/YYYY")}),a("td",{className:"px-6 py-4 whitespace-nowrap",children:s.area==0?s.jabatan:`${s.jabatan} ${s.area}`}),a("td",{className:"px-6 py-4 whitespace-nowrap",children:s.branch.wilayah}),a("td",{className:"px-6 py-4 whitespace-nowrap",children:s.branch.unit}),a("td",{className:"px-6 py-4",children:s.janis_jaminan}),a("td",{className:"px-6 py-4",children:s.date_resign}),a("td",{className:"px-6 py-4",children:s.resign_status}),a("td",{className:"px-6 py-4",children:s.resign_reson}),a("td",{className:"px-6 py-4",children:s.pencairan_simpanan_date}),a("td",{className:"px-6 py-4",children:s.pencairan_simpanan_by}),a("td",{className:"px-6 py-4",children:s.handover_jaminan}),a("td",{className:"px-6 py-4",children:s.handover_jaminan_by})]},s.id))})]})}),a(f,{first_page_url:e.first_page_url,last_page_url:e.last_page_url,linkPagination:x()})]})})})})]})};export{z as default};