import{_ as j,r as D,a,j as e,F as p,n as _}from"./app-577095aa.js";import{A as T}from"./AuthenticatedLayout-9a50dbde.js";import{C as S}from"./ContentWrap-bbfb09e8.js";import{T as b}from"./TextInput-f601cbff.js";import{C as N}from"./index.esm-c639fe91.js";import{I as i}from"./InputLabel-324b8a32.js";import{P as s}from"./PrimaryButton-e87527a9.js";import{S as C}from"./SelectList-2f891eca.js";import{L as R}from"./Loading-c8b73d4d.js";import{C as P}from"./Checkbox-02d828f5.js";import{N as r}from"./react-number-format.es-1fd40bc0.js";import{d as B}from"./dayjs.min-a735f434.js";import{L as y}from"./LinkButton-c41e9ed7.js";import"./Card-298928cd.js";import"./index.esm-40d2e5fe.js";import"./iconBase-0c341566.js";import"./index.esm-b887299b.js";import"./transition-89244925.js";import"./index.esm-0a08b294.js";import"./index.esm-6cd27bff.js";const aa=({loanrequest:l,...d})=>{const{data:t,setData:h,put:f,processing:v,errors:A}=j({mantri:l.mantri,tanggal_drop:l.tanggal_drop,pinjaman:l.pinjaman,pembayaran_date:l.loan&&l.loan.last_angsuran?l.loan.last_angsuran.pembayaran_date:"",jumlah:l.loan&&l.loan.last_angsuran?l.loan.last_angsuran.jumlah:"",danatitipan:l.loan&&l.loan.last_angsuran?l.loan.last_angsuran.danatitipan:""}),m=n=>{h(n.target.name,n.target.value)},o=(n,x)=>{h(x,n)},[k,u]=D.useState(!1),g=()=>{u(!1)},w=d.employees.map(n=>({id:n.id,value:n.id,display:`${n.nama_karyawan} - ${n.jabatan} ${n.area}`})),c=n=>{n.preventDefault(),f(route("unit.pinjaman.request.update",l.id))};return a(T,{auth:d.auth,errors:d.errors,header:e(p,{children:[a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Revisi Pinjaman"}),a(_,{title:"Management User"}),e("div",{className:"ml-auto flex items-center gap-3",children:[a(y,{href:route("unit.pinjaman.request.bukutransaksi"),title:"Back"}),a(s,{title:"Delete",onClick:()=>u(!0),theme:"red"})]})]}),children:e("div",{className:"p-4 relative",children:[a("div",{onClick:g,className:`w-full h-full fixed top-0 left-0 z-50 bg-black/30 flex items-center justify-center ${k?"":"hidden"}`,children:e("div",{onClick:n=>n.stopPropagation(),className:"max-w-md bg-white w-full shadow border border-gray-200 rounded p-6",children:[a("div",{className:"font-semibold",children:"Menghapus Data juga akan menghapus Angsuran dan Pinjaman yang berkaitan."}),e("div",{className:"flex gap-3 items-center justify-end",children:[a(s,{title:"Batal",onClick:g}),a(y,{as:"button",title:"Hapus",theme:"red",href:route("unit.pinjaman.request.destroy",l.id),method:"delete"})]})]})}),a(R,{show:v}),e(S,{children:[e("div",{className:"grid lg:grid-cols-3 gap-3 mb-6",children:[e("form",{onSubmit:c,className:"col-span-1 border p-4 shadow rounded relative",children:[a("h1",{className:"mb-3 font-semibold",children:"Revisi Data"}),e("div",{className:"mb-3",children:[a(i,{value:"Tanggal Drop",className:"mb-1"}),a(b,{name:"tanggal_drop",type:"date",onChange:m,className:"w-full",value:t.tanggal_drop})]}),e("div",{className:"mb-3",children:[a(i,{value:"Mantri & Kelompok",className:"mb-1"}),a(C,{options:w,name:"mantri",type:"date",onChange:m,className:"w-full",value:t.mantri})]}),a("div",{className:"mb-3",children:a(s,{title:"Update",type:"submit",className:"ml-auto"})}),e("div",{className:"mb-3 text-sm text-gray-400 italic",children:["NB:",e("ul",{className:"list-disc px-4",children:[a("li",{children:"Merubah Mantri akan mempengaruhi perubahan area."}),a("li",{children:"Hanya dapat diubah ketika pinjaman belum pernah diangsur."})]})]})]}),a("form",{onSubmit:c,className:"col-span-1 border p-4 shadow rounded relative",children:l.loan&&e(p,{children:[a("h1",{className:"mb-3 font-semibold",children:"Revisi Drop"}),e("div",{className:"mb-3",children:[a(i,{value:"Tanggal Drop",className:"mb-1"}),a(N,{name:"pinjaman",id:"pinjaman",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:o,value:t.pinjaman,placeholder:"Inputkan angka tanpa sparator"})]}),a("div",{className:"mb-3",children:a(s,{type:"submit",title:"Update",className:"ml-auto"})}),e("div",{className:"mb-3 text-sm text-gray-400 italic",children:["NB:",e("ul",{className:"list-disc px-4",children:[a("li",{children:"Merubah DROP akan mempengaruhi Besar Pinjaman."}),a("li",{children:"Drop Hanya dapat diubah ketika pinjaman belum pernah diangsur."})]})]})]})}),a("form",{onSubmit:c,className:"col-span-1 border p-4 shadow rounded",children:l.loan&&l.loan.last_angsuran&&e(p,{children:[a("h1",{className:"mb-3 font-semibold",children:"Revisi Angsuran"}),e("div",{className:"mb-3",children:[a(i,{value:"Tanggal Angsuran",className:"mb-1"}),a(b,{name:"tanggal_drop",type:"date",disabled:!0,className:"w-full",value:t.pembayaran_date})]}),e("div",{className:"mb-3",children:[a(i,{value:"Tanggal Drop",className:"mb-1"}),a(N,{name:"jumlah",id:"jumlah",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:o,value:t.jumlah,placeholder:"Inputkan angka tanpa sparator"})]}),a("div",{className:"mb-3",children:e("label",{className:"flex items-center",children:[a(P,{name:"danatitipan",value:t.danatitipan,onChange:m}),a("span",{className:"ml-2 text-sm text-gray-600",children:"Dana Titipan DO?"})]})}),a("div",{className:"mb-3",children:a(s,{title:"Update",type:"submit",className:"ml-auto"})}),e("div",{className:"mb-3 text-sm text-gray-400 italic",children:["NB:",a("ul",{className:"list-disc px-4",children:a("li",{children:"Hanya Angsuran Terakhir yang dapat di edit."})})]})]})})]}),e("div",{className:"grid lg:grid-cols-3 gap-3",children:[a("div",{className:"col-span-1 border p-4 shadow rounded",children:e("table",{className:"w-full text-sm text-left text-main-500 dark:text-main-400",children:[a("thead",{className:"text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400",children:a("tr",{children:a("th",{className:"px-6 py-3",colSpan:"2",children:"Data Buku Transaksi"})})}),e("tbody",{children:[e("tr",{className:"bg-green-200 text-black",children:[a("th",{className:"px-6 py-3",children:"ID Customer"}),a("td",{className:"px-6 py-3",children:l.id})]}),e("tr",{className:"bg-green-200 text-black",children:[a("th",{className:"px-6 py-3",children:"Nama Nasabah"}),e("td",{className:"px-6 py-3",children:[a("div",{children:l.customer.nama}),a("div",{className:"font-thin italic",children:l.customer.nik})]})]}),e("tr",{children:[a("th",{className:"px-6 py-3",children:"Tanggal Permintaan Drop"}),a("td",{className:"px-6 py-3",children:l.tanggal_drop})]}),e("tr",{children:[a("th",{className:"px-6 py-3",children:"Hari / Kelompok"}),a("td",{className:"px-6 py-3",children:a("div",{children:`${l.hari} / ${l.kelompok} `})})]}),e("tr",{children:[a("th",{className:"px-6 py-3",children:"Jumlah Permintaan Drop"}),a("td",{className:"px-6 py-3 whitespace-nowrap",children:a(r,{value:l.pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})]})]})}),a("div",{className:"col-span-1 border p-4 shadow rounded",children:e("table",{className:"w-full text-sm text-left text-main-500 dark:text-main-400",children:[a("thead",{className:"text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400",children:a("tr",{children:a("th",{className:"px-6 py-3",colSpan:"2",children:"Data Pinjaman"})})}),l.loan&&e("tbody",{children:[e("tr",{children:[a("th",{className:"px-6 py-3",children:"Tanggal Drop"}),a("td",{className:"px-6 py-3",children:l.loan.tanggal_drop})]}),e("tr",{children:[a("th",{className:"px-6 py-3",children:"Hari / Kelompok"}),a("td",{className:"px-6 py-3",children:a("div",{children:`${l.loan.hari} / ${l.loan.kelompok} `})})]}),e("tr",{children:[a("th",{className:"px-6 py-3",children:"Jumlah Permintaan Drop"}),a("td",{className:"px-6 py-3 whitespace-nowrap",children:a(r,{value:l.loan.drop,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]}),e("tr",{children:[a("th",{className:"px-6 py-3",children:"Jumlah Pinjaman"}),a("td",{className:"px-6 py-3 whitespace-nowrap",children:a(r,{value:l.loan.pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]}),e("tr",{children:[a("th",{className:"px-6 py-3",children:"Saldo Pinjaman"}),a("td",{className:"px-6 py-3 whitespace-nowrap",children:a(r,{value:l.loan.saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})]})]})}),a("div",{className:"col-span-1 border p-4 shadow rounded",children:e("table",{className:"w-full text-xs text-left text-main-500 dark:text-main-400",children:[a("thead",{className:"text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400 text-center",children:e("tr",{children:[a("th",{className:"px-3 py-3",children:"Tanggal"}),a("th",{className:"px-3 py-3",children:"Jumlah Angsuran"}),a("th",{className:"px-3 py-3",children:"Total Angsuran"}),a("th",{className:"px-3 py-3",children:"Saldo Terakhir"})]})}),l.loan&&l.loan.last_angsuran&&a("tbody",{children:l.loan.angsuran.map((n,x)=>e("tr",{children:[a("th",{className:"px-3 py-3",children:B(n.pembayaran_date).format("DD-MM")}),a("td",{className:"px-3 py-3 whitespace-nowrap",children:a(r,{value:n.jumlah,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-3 whitespace-nowrap",children:a(r,{value:n.total_angsuran,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-3 py-3 whitespace-nowrap",children:a(r,{value:n.saldo_terakhir,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]}))})]})})]})]})]})})};export{aa as default};
