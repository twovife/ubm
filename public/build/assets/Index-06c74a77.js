import{r as h,j as a,F as x,a as e,n as N}from"./app-6e80265d.js";import{P as g}from"./Pagination-a0392604.js";import{P as o}from"./PrimaryButton-4e18fc5b.js";import{T as f}from"./TextInput-420b4604.js";import{A as y}from"./AuthenticatedLayout-66ad427d.js";import{A as u}from"./index.esm-00a1b8af.js";import{I as b}from"./index.esm-e7db42b5.js";import w from"./RegisterUserModal-a26ca8a6.js";import"./SweetAlert-390db087.js";import"./transition-52595909.js";import"./iconBase-9ac44975.js";import"./index.esm-dbd368ac.js";import"./Loading-7978b7d8.js";import"./InputError-b8f8921a.js";import"./InputLabel-cd856161.js";import"./Modal-89458efc.js";import"./SelectList-e9f73704.js";function E({users:t,employees:c,unit:n,...r}){console.log(r);const{data:s}=t,[d,i]=h.useState(!1),p=()=>{i(!1)};return a(y,{auth:r.auth,errors:r.errors,header:a(x,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Management User"}),e("div",{className:"ml-auto flex items-center",children:e(o,{icon:e(b,{}),size:"md",title:"Register",onClick:()=>i(!0)})})]}),children:[e(N,{title:"Management User"}),e("div",{className:"py-3",children:e("div",{className:"mx-auto sm:px-6 lg:px-8",children:e("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:a("div",{className:"border p-6 text-main-800",children:[a("div",{className:"flex justify-between w-full items-center mb-6",children:[e("div",{className:"ml-auto",children:e(f,{name:"search",placeholder:"Cari Nama",className:"px-6"})}),e("div",{children:e(o,{size:"box",icon:e(u,{}),className:"ml-2"})})]}),e("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6",children:a("table",{className:"w-full text-sm text-left text-main-500 dark:text-main-400",children:[e("thead",{className:"text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400",children:a("tr",{className:"text-center",children:[e("th",{scope:"col",className:"px-6 py-3",children:"Nomor"}),e("th",{scope:"col",className:"px-6 py-3",children:"Username"}),e("th",{scope:"col",className:"px-6 py-3",children:"Nama Karyawan"}),e("th",{scope:"col",className:"px-6 py-3",children:"Unit"}),e("th",{scope:"col",className:"px-6 py-3",children:"Jabatan"}),e("th",{scope:"col",className:"px-6 py-3",children:"Role"})]})}),e("tbody",{children:s&&s.map((l,m)=>a("tr",{className:"text-center",children:[e("td",{className:"px-6 py-4",children:m+1}),e("td",{className:"px-6 py-4",children:l.username}),e("td",{className:"px-6 py-4",children:l.employee.nama_karyawan}),e("td",{className:"px-6 py-4",children:l.employee.branch.unit}),e("td",{className:"px-6 py-4",children:`${l.employee.jabatan} ${l.employee.area==0?"":l.employee.area} `})]},m))})]})}),e(g,{first_page_url:t.first_page_url,last_page_url:t.last_page_url,last_page:t.last_page,current_page:t.current_page,links:t.links})]})})})}),e(w,{show:d,onClose:p,employees:c,unit:n})]})}export{E as default};