import{r as m,j as i,a as e}from"./app-6e80265d.js";import{L as c}from"./LinkButton-e4d2fbe1.js";import{P as h}from"./PrimaryButton-4e18fc5b.js";import{M as u}from"./MobileLayout-fb00b66c.js";import{d}from"./dayjs.min-8d0bae3b.js";import{N as f}from"./react-number-format.es-c408b04a.js";import p from"./DropModal-9420edf6.js";import"./Loading-7978b7d8.js";import"./index.esm-00a1b8af.js";import"./iconBase-9ac44975.js";import"./Modal-89458efc.js";import"./transition-52595909.js";const B=({requestDrop:r,...s})=>{const[n,l]=m.useState(!1),t=a=>{l(!1)};return i(u,{auth:s.auth,errors:s.errors,header:i("div",{className:"flex justify-between items-center",children:[e("h1",{children:"Drop Hari Ini"}),e(c,{as:"a",href:route("mantriapps.drop.calonDrop"),title:"Go To Pengajuan"})]}),children:[e(p,{datas:n,onClosed:t}),e("div",{className:"p-3 border rounded-lg",children:e("div",{className:"border rounded p-3",children:r&&r.map((a,o)=>i("div",{className:"mb-3 py-2 border-b",children:[i("div",{className:"flex",children:[i("div",{className:"flex-1",children:[i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"NIK Nasabah"}),e("div",{children:a.customer.nik})]}),i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"Nama Nasabah"}),e("div",{children:a.customer.nama})]}),i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"Tanggal Drop"}),e("div",{children:d(a.tanggal_drop).format("DD-MM-YYYY")})]})]}),i("div",{className:"flex-1 text-right",children:[i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:a.status=="acc"?"Disetujui":a.status=="open"?"Belum Disetujui":"Ditolak"}),e("div",{children:a.approved_date?d(a.approved_date).format("DD-MM-YYYY"):"."})]}),i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"Oleh"}),e("div",{children:a.approvedby?a.approvedby.nama_karyawan:"."})]}),i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"Jumlah Drop"}),e("div",{children:e(f,{value:a.pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})]})]}),e("div",{className:"w-full",children:e(h,{className:"ml-auto disabled:bg-slate-400",title:"Drop",disabled:a.status!="acc",onClick:N=>l({id:a.id,show:!0})})})]},o))})})]})};export{B as default};