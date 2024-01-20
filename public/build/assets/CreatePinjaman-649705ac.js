import{r,j as t,F as d,a as e,n as N,g as b}from"./app-8b2c8f5a.js";import{I as f}from"./InputLabel-ce77a5f7.js";import{L as y}from"./LinkButton-98fabd78.js";import{L as k}from"./Loading-e3459361.js";import{P as g}from"./PrimaryButton-33b1c72b.js";import{T as w}from"./TextInput-d6cefbdd.js";import{A as v}from"./AuthenticatedLayout-818e74d5.js";import{c as j}from"./index.esm-30b91dde.js";import P from"./ModalCreateNewCustomer-3eb000ed.js";import C from"./ModalCreateOldCustomer-520489f9.js";import{j as K}from"./index.esm-58292b62.js";import"./transition-9291623c.js";import"./SweetAlert-e0eb17e7.js";import"./index.esm-d939975b.js";import"./iconBase-65c2d3e9.js";import"./index.esm-e8f97965.js";import"./Checkbox-35a5a809.js";import"./InputError-e8fdb80e.js";import"./SelectList-592557ae.js";import"./index.esm-77a6b724.js";const W=({customer:o,...l})=>{const[s,B]=r.useState(o),[h,m]=r.useState(!1),[i,p]=r.useState(l.keyword??""),c=l.employees.map(a=>({id:a.id,value:a.id,display:`${a.nama_karyawan} - ${a.jabatan} ${a.area}`})),u=a=>{p(a.target.value)},x=a=>{a.preventDefault(),b.get(route("unit.pinjaman.create"),{nik:i},{onBefore:()=>m(!0),onFinish:()=>m(!1)})};return t(v,{auth:l.auth,errors:l.errors,header:t(d,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Buat Pinjaman Baru"}),e("div",{className:"ml-auto flex items-center",children:e(y,{icon:e(j,{}),size:"md",title:"Kembali",type:"a",href:route("unit.pinjaman.request.requestPinjaman")})})]}),children:[e(k,{show:h}),e(N,{title:"Data Pinjaman"}),e("div",{className:"py-3",children:e("div",{className:"mx-auto sm:px-6 lg:px-8",children:e("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:e("div",{className:"border p-6 text-main-800",children:t("div",{className:"lg:flex gap-6",children:[t("div",{className:"flex-1",children:[t("form",{onSubmit:x,className:"max-w-md mb-3",children:[e(f,{value:"Masukkan Nomor KTP"}),t("div",{className:"flex items-baseline gap-3",children:[e(w,{className:"mt-1 block w-full",name:"cek_ktp",value:i,onChange:u,id:"cek_ktp"}),e(g,{size:"sm",className:"whitespace-nowrap",title:"Cek KTP",type:"submit"})]})]}),s&&t(d,{children:[t("div",{className:"mb-6",children:[e("h1",{className:"text-lg font-semibold",children:"Data Customer"}),t("div",{className:"flex w-full justify-between max-w-md border-b border-black/40 mb-2",children:[e("div",{children:"NIK"}),e("div",{children:s.nik})]}),t("div",{className:"flex w-full justify-between max-w-md border-b border-black/40 mb-2",children:[e("div",{children:"Nomor KK"}),s.no_kk?t("a",{className:"text-blue-500 font-black underline decoration-dotted flex items-center",href:route("unit.customer.historyNasabahByKK",s.no_kk),target:"_blank",children:[e(K,{className:"mr-2"}),e("span",{children:s.no_kk})]}):e("span",{children:"Not Found"})]}),t("div",{className:"flex w-full justify-between max-w-md border-b border-black/40 mb-2",children:[e("div",{children:"Nama"}),e("div",{children:s.nama})]})]}),l.request.length!==0&&t("div",{className:"mb-6",children:[e("h1",{className:"text-lg font-semibold mb-3",children:"Request Berjalan"}),e("div",{className:"w-full overflow-auto",children:t("table",{className:"w-full text-sm text-left text-main-500 dark:text-main-400",children:[e("thead",{className:"text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400",children:t("tr",{children:[e("th",{className:"px-6 py-3",children:"NIK"}),e("th",{className:"px-6 py-3",children:"Nama Customer"}),e("th",{className:"px-6 py-3",children:"Tanggal Permintaan Drop"}),e("th",{className:"px-6 py-3",children:"Hari"}),e("th",{className:"px-6 py-3",children:"Unit Pemberi Pinjaman"}),e("th",{className:"px-6 py-3",children:"Status"})]})}),e("tbody",{children:l.request.map((a,n)=>t("tr",{children:[e("td",{className:"px-6 py-4",children:a.customer.nik}),e("td",{className:"px-6 py-4",children:a.customer.nama}),e("td",{className:"px-6 py-4",children:a.tanggal_drop}),e("td",{className:"px-6 py-4",children:a.hari}),e("td",{className:"px-6 py-4",children:a.branch.unit}),e("td",{className:"px-6 py-4",children:a.status})]},n))})]})})]}),l.pinjaman.length!==0?t("div",{className:"mb-6",children:[e("h1",{className:"text-lg font-semibold mb-3",children:"History Pinjaman"}),e("div",{className:"w-full overflow-auto",children:t("table",{className:"w-full text-sm text-main-500 dark:text-main-400 text-center",children:[e("thead",{className:"text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400",children:t("tr",{children:[e("th",{className:"px-6 py-3",children:"NIK"}),e("th",{className:"px-6 py-3 whitespace-nowrap",children:"Nama Customer"}),e("th",{className:"px-6 py-3",children:"Tanggal Permintaan Drop"}),e("th",{className:"px-6 py-3",children:"Hari"}),e("th",{className:"px-6 py-3 whitespace-nowrap",children:"Unit Pemberi Pinjaman"}),e("th",{className:"px-6 py-3",children:"Status"}),e("th",{className:"px-6 py-3",children:"Keterangan"})]})}),e("tbody",{children:l.pinjaman.map((a,n)=>t("tr",{children:[e("td",{className:"px-6 py-4",children:a.customer.nik}),e("td",{className:"px-6 py-4",children:a.customer.nama}),e("td",{className:"px-6 py-4",children:a.tanggal_drop}),e("td",{className:"px-6 py-4",children:a.hari}),e("td",{className:"px-6 py-4",children:a.branch.unit}),e("td",{className:`px-6 py-4 uppercase font-black ${a.status=="normal"?"text-green-500":a.status=="cm"?"text-orange-100":a.status=="mb"?"text-red-500":a.status=="ml"?"text-white bg-red-500":""}`,children:a.status}),e("td",{className:"px-6 py-4 uppercase",children:a.lunas})]},n))})]})})]}):e("div",{className:"text-lg font-semibold",children:"Customer Belum Pernah Melakukan Pinjaman"})]}),l.keyword&&!s&&e("div",{className:"text-xl",children:"Data Customer Tidak Ditemukan"})]}),l.keyword&&!s&&e("div",{className:"flex-1",children:e(P,{nik:i,auth:l.auth,employees:c})}),s&&e("div",{className:"flex-1",children:e(C,{nik:i,auth:l.auth,employees:c})})]})})})})})]})};export{W as default};
