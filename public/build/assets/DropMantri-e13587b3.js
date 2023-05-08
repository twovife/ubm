import{r as m,j as i,a as e}from"./app-100f7ec7.js";import{L as c}from"./LinkButton-946f93bf.js";import{P as h}from"./PrimaryButton-92f5ba1b.js";import{M as u}from"./MobileLayout-869ee8ca.js";import{d as s}from"./dayjs.min-cc1e9a59.js";import{N as p}from"./react-number-format.es-4fe7dcb5.js";import f from"./DropModal-3f2dbbe9.js";import"./Loading-52c760ae.js";import"./index.esm-12fb61aa.js";import"./iconBase-65d90880.js";import"./Modal-d90e379f.js";import"./transition-bcf47aff.js";const L=({requestDrop:n,...r})=>{const[d,l]=m.useState(!1),o=a=>{l(!1)};return i(u,{auth:r.auth,errors:r.errors,header:i("div",{className:"flex justify-between items-center",children:[e("h1",{children:"Tambah Permohonan Drop / Pinjaman"}),e(c,{as:"a",href:route("mantriapps.drop.calonDrop"),title:"List Pengajuan"})]}),children:[e(f,{datas:d,onClosed:o}),e("div",{className:"p-3 border rounded-lg",children:e("div",{className:"border rounded p-3",children:n.map((a,t)=>i("div",{children:[i("div",{className:"flex mb-3",children:[i("div",{className:"flex-1",children:[i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"NIK Nasabah"}),e("div",{children:a.customer.nik})]}),i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"Nama Nasabah"}),e("div",{children:a.customer.nama})]}),i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"Tanggal Drop"}),e("div",{children:s(a.tanggal_drop).format("DD-MM-YYYY")})]})]}),i("div",{className:"flex-1 text-right",children:[i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:a.status=="acc"?"Disetujui":a.status=="open"?"Belum Disetujui":"Ditolak"}),e("div",{children:a.approved_date?s(a.approved_date).format("DD-MM-YYYY"):"."})]}),i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"Oleh"}),e("div",{children:a.approvedby?a.approvedby.nama_karyawan:"."})]}),i("div",{className:"mb-1",children:[e("p",{className:"underline underline-offset-2 font-semibold",children:"Jumlah Drop"}),e("div",{children:e(p,{value:a.pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})]})]}),e("div",{className:"w-full",children:e(h,{className:"ml-auto",title:"Drop",onClick:N=>l({id:a.id,show:!0})})})]},t))})})]})};export{L as default};
