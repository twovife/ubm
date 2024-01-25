import{r as p,a,j as o,F as f,d}from"./app-e7588a7f.js";import{A as b}from"./AuthenticatedLayout-95c049d1.js";import{I as h}from"./index.esm-93648891.js";import{L as g}from"./LinkButton-6a3e372e.js";import"./TextInput-901027fc.js";import"./Pagination-cf089232.js";import{d as N}from"./dayjs.min-95b22515.js";import"./Loading-63179d32.js";import j from"./ActionPinjaman-f3af7624.js";import{N as y}from"./react-number-format.es-4830d3cd.js";import{C as x}from"./ContentWrap-65d3f08d.js";import{M as _}from"./MyTables-da1961c0.js";import{f as k}from"./index.esm-e98cb10d.js";import"./SweetAlert-39528630.js";import"./transition-9e4a2392.js";import"./index.esm-d87b7d82.js";import"./iconBase-25778281.js";import"./index.esm-5c7dcc17.js";import"./Modal-8af42e9c.js";import"./PrimaryButton-1d462f06.js";import"./index.esm-bcd6f1b1.js";const W=({datadrops:s,...r})=>{const[c,n]=p.useState(!1),u=e=>{n(!1)},i=[{title:"Nomor Pinjaman",column:"id",sortable:!1,filterable:!0},{title:"Nama Nasabah",column:"customer_nama",sortable:!1,filterable:!1},{title:"NIK",column:"customer_nik",sortable:!1,filterable:!1},{title:"Alamat",column:"customer_alamat",sortable:!1,filterable:!1},{title:"Kelompok",column:"kelompok",sortable:!1,filterable:!0},{title:"Tanggal Drop",column:"tanggal_drop",sortable:!1,filterable:!0},{title:"Hari",column:"hari",sortable:!1,filterable:!0},{title:"Jumlah Pegajuan",column:"pinjaman",sortable:!1,filterable:!1},{title:"Status",column:"status",sortable:!1,filterable:!0},{title:"Tanggal Disetujui",column:"approved_date",sortable:!1,filterable:!1},{title:"Disetujui Oleh",column:"approved_by",sortable:!1,filterable:!1},{title:"Mantri Bertugas",column:"mantri",sortable:!1,filterable:!1}];return a(b,{auth:r.auth,errors:r.errors,header:o(f,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Transaksi Drop"}),a("div",{className:"ml-auto flex items-center",children:r.canCreate&&a(g,{icon:a(h,{}),size:"md",title:"Tambah Pinjaman",type:"a",href:route("unit.pinjaman.create")})})]}),children:o(x,{children:[a(j,{onClose:u,data:c}),a(_,{header:i,link:s.link,datefilter:"tanggal_drop",editable:!0,children:a("tbody",{children:s.data.map((e,m)=>o("tr",{className:"odd:bg-gray-100",children:[a("th",{className:"px-6 py-1",children:o("div",{className:"flex justify-around items-center gap-3",children:[m+1,a(d,{href:route("unit.pinjaman.request.edit",e.id),children:a(k,{className:"text-blue-500 hover:cursor-pointer"})})]})}),i.map((t,l)=>t.column=="status"?a("td",{className:"px-6 py-1 min-w-[10rem]",children:e.status=="acc"?a("span",{className:"bg-green-300 px-2.5 py-1 rounded-full",children:e[t.column]}):e.status=="tolak"?a("span",{className:"bg-red-300 px-2.5 py-1 rounded-full",children:e[t.column]}):a("span",{className:"px-2.5 py-1 rounded-full",children:e[t.column]})},l):t.column=="tanggal_drop"||t.column=="approved_date"&&e[t.column]!=""?a("td",{className:"px-6 py-1 min-w-[10rem]",children:N(e[t.column]).format("DD/MM/YYYY")},l):t.column=="pinjaman"?a("td",{className:"px-6 py-1 min-w-[10rem]",children:a(y,{value:e[t.column],displayType:"text",thousandSeparator:",",prefix:"Rp. "})},l):t.column=="customer_nama"&&r.canCreate?a("td",{className:"px-6 py-3 hover:cursor-pointer hover:bg-gray-100 text-blue-500",onClick:v=>n({show:!0,id:e.id,disabled:e.status=="acc"}),children:e.customer_nama},l):a("td",{className:"px-6 py-1 min-w-[10rem]",children:e[t.column]},l))]},m))})})]})})};export{W as default};