import{r as p,a,j as s,F as f,d}from"./app-62eb9655.js";import{A as b}from"./AuthenticatedLayout-9936f508.js";import{I as h}from"./index.esm-4af1f187.js";import{L as g}from"./LinkButton-07ad72cd.js";import"./TextInput-ca643556.js";import"./Pagination-416cf7f1.js";import{d as N}from"./dayjs.min-21f7e36d.js";import"./Loading-a76b646a.js";import j from"./ActionPinjaman-1e32d22d.js";import{N as y}from"./react-number-format.es-a1f4ae96.js";import{C as x}from"./ContentWrap-1d625769.js";import{M as _}from"./MyTables-f6a68f62.js";import{a as k}from"./index.esm-b4c81a09.js";import"./SweetAlert-e2c5e5b7.js";import"./transition-a78dee6c.js";import"./iconBase-fa43618f.js";import"./index.esm-e930102c.js";import"./Modal-e3c3171f.js";import"./PrimaryButton-c6c1178d.js";import"./index.esm-0b7b70e9.js";const O=({datadrops:o,...r})=>{const[c,n]=p.useState(!1),u=e=>{n(!1)},i=[{title:"Nomor Pinjaman",column:"id",sortable:!1,filterable:!0},{title:"Nama Nasabah",column:"customer_nama",sortable:!1,filterable:!1},{title:"NIK",column:"customer_nik",sortable:!1,filterable:!1},{title:"Alamat",column:"customer_alamat",sortable:!1,filterable:!1},{title:"Kelompok",column:"kelompok",sortable:!1,filterable:!0},{title:"Tanggal Drop",column:"tanggal_drop",sortable:!1,filterable:!0},{title:"Hari",column:"hari",sortable:!1,filterable:!0},{title:"Jumlah Pegajuan",column:"pinjaman",sortable:!1,filterable:!1},{title:"Status",column:"status",sortable:!1,filterable:!0},{title:"Tanggal Disetujui",column:"approved_date",sortable:!1,filterable:!1},{title:"Disetujui Oleh",column:"approved_by",sortable:!1,filterable:!1},{title:"Mantri Bertugas",column:"mantri",sortable:!1,filterable:!1}];return a(b,{auth:r.auth,errors:r.errors,header:s(f,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Transaksi Drop"}),a("div",{className:"ml-auto flex items-center",children:r.canCreate&&a(g,{icon:a(h,{}),size:"md",title:"Tambah Pinjaman",type:"a",href:route("unit.pinjaman.create")})})]}),children:s(x,{children:[a(j,{onClose:u,data:c}),a(_,{header:i,link:o.link,datefilter:"tanggal_drop",editable:!0,children:a("tbody",{children:o.data.map((e,m)=>s("tr",{className:"odd:bg-gray-100",children:[a("th",{className:"px-6 py-1",children:s("div",{className:"flex justify-around items-center gap-3",children:[m+1,a(d,{href:route("unit.pinjaman.request.edit",e.id),children:a(k,{className:"text-blue-500 hover:cursor-pointer"})})]})}),i.map((t,l)=>t.column=="status"?a("td",{className:"px-6 py-1 min-w-[10rem]",children:e.status=="acc"?a("span",{className:"bg-green-300 px-2.5 py-1 rounded-full",children:e[t.column]}):e.status=="tolak"?a("span",{className:"bg-red-300 px-2.5 py-1 rounded-full",children:e[t.column]}):a("span",{className:"px-2.5 py-1 rounded-full",children:e[t.column]})},l):t.column=="tanggal_drop"||t.column=="approved_date"&&e[t.column]!=""?a("td",{className:"px-6 py-1 min-w-[10rem]",children:N(e[t.column]).format("DD/MM/YYYY")},l):t.column=="pinjaman"?a("td",{className:"px-6 py-1 min-w-[10rem]",children:a(y,{value:e[t.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})},l):t.column=="customer_nama"&&r.canCreate?a("td",{className:"px-6 py-3 hover:cursor-pointer hover:bg-gray-100 text-blue-500",onClick:v=>n({show:!0,id:e.id,disabled:e.status=="acc"}),children:e.customer_nama},l):a("td",{className:"px-6 py-1 min-w-[10rem]",children:e[t.column]},l))]},m))})})]})})};export{O as default};