import{r as p,j as a,F as h,a as e,n as x}from"./app-0a330f65.js";import{P as N}from"./Pagination-576171bc.js";import{P as c}from"./PrimaryButton-181769c9.js";import{T as u}from"./TextInput-43f542d2.js";import{A as f}from"./AuthenticatedLayout-bfe1b493.js";import{A as g}from"./index.esm-5f2ad4a3.js";import{I as b}from"./index.esm-b756a395.js";import y from"./CustomerCreateModal-2b096ed2.js";import"./transition-29ff6cc3.js";import"./index.esm-7b89608d.js";import"./iconBase-86cbebf7.js";import"./InputError-328ca8b1.js";import"./InputLabel-8ba3c8d6.js";import"./Loading-8650f9cf.js";import"./Modal-9477831f.js";import"./SelectList-b2603293.js";const E=({branch:C,employees:n,customers:t,...r})=>{const{data:l}=t,[o,i]=p.useState(!1),d=s=>{i(!1)};return a(f,{auth:r.auth,errors:r.errors,header:a(h,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Management User"}),e("div",{className:"ml-auto flex items-center",children:e(c,{icon:e(b,{}),size:"md",title:"Tambah Customer",onClick:()=>i(!0)})})]}),children:[e(x,{title:"Management User"}),e("div",{className:"py-3",children:e("div",{className:"mx-auto sm:px-6 lg:px-8",children:e("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:a("div",{className:"border p-6 text-main-800",children:[a("div",{className:"flex justify-between w-full items-center mb-6",children:[e("div",{className:"ml-auto",children:e(u,{name:"search",placeholder:"Cari Nama",className:"px-6"})}),e("div",{children:e(c,{size:"box",icon:e(g,{}),className:"ml-2"})})]}),e("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6",children:a("table",{className:"w-full text-sm text-left text-main-500 dark:text-main-400",children:[e("thead",{className:"text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400",children:a("tr",{className:"text-center",children:[e("th",{scope:"col",className:"px-6 py-3",children:"Nomor"}),e("th",{scope:"col",className:"px-6 py-3",children:"Nama Nasabah"}),e("th",{scope:"col",className:"px-6 py-3",children:"No KK Nasabah"}),e("th",{scope:"col",className:"px-6 py-3",children:"NIK Nasabah"}),e("th",{scope:"col",className:"px-6 py-3",children:"Jumlah Pinjaman"}),e("th",{scope:"col",className:"px-6 py-3",children:"Area"}),e("th",{scope:"col",className:"px-6 py-3",children:"History"})]})}),e("tbody",{children:l&&l.map((s,m)=>a("tr",{className:"text-center",children:[e("td",{className:"px-6 py-4",children:m+1}),e("td",{className:"px-6 py-4",children:s.nama}),e("td",{className:"px-6 py-4",children:s.nik}),e("td",{className:"px-6 py-4",children:s.no_kk}),e("td",{className:"px-6 py-4",children:s.alamat})]},m))})]})}),e(N,{first_page_url:t.first_page_url,last_page_url:t.last_page_url,last_page:t.last_page,current_page:t.current_page,links:t.links})]})})})}),e(y,{show:o,onClose:d,employees:n})]})};export{E as default};