import{r as S,_ as C,j as a,a as l}from"./app-361d4a38.js";import{C as i}from"./Navbar-917f3221.js";import{I as b}from"./InputError-156c2007.js";import{I as r}from"./InputLabel-1325250b.js";import{L as x}from"./LinkButton-cac727a3.js";import{P as T}from"./PrimaryButton-8ac8d257.js";import{T as n}from"./TextInput-170491db.js";import{A as I}from"./AuthenticatedLayout-952e0d23.js";import{d as D}from"./dayjs.min-83cc26cc.js";import{C as f}from"./index.esm-7bf18591.js";import{N as o}from"./react-number-format.es-009607bb.js";import P from"./Mutasi-dc131225.js";import"./index.esm-f1e3c586.js";import"./iconBase-9f6552dc.js";import"./transition-849d851d.js";import"./index.esm-5bb7e369.js";import"./Loading-cd7dadd4.js";import"./SelectList-a8172cf6.js";import"./useServerFilter-1f38a6d9.js";const G=({details:m,curent_unit:s,...d})=>{const[y,N]=S.useState(!1),{data:c,setData:p,post:w,processing:g,errors:h}=C({debit:0,jasa:s.max_payment*2/100,transaction_date:""}),v=e=>{const{value:t,name:j}=e.target;p(j,t)},u=(e,t)=>{p(t,parseInt(e))},k=e=>{e.preventDefault(),w(route("pinjamanmodal.pinjaman_modal_post",s.id))};return a(I,{loading:g||y,auth:d.auth,errors:d.errors,children:l(i,{judul:`Detail Pinjaman Modal ${s.type_pinjaman=="PO"?"Pak Hertawan":"Pusat"}`,children:[a(i.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:l(i.endContent,{className:"flex-wrap",children:[a(x,{href:route("unitsaving.index"),title:"Simpanan 1JT",size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"}),a(x,{href:route("bonpanjer.bon_panjer"),title:"Bon Panjer",size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"})]})})}),a("div",{className:"p-3 bg-white rounded shadow w-full mb-3 overflow-auto",children:l("table",{className:"w-full text-left text-gray-500 text-xs",children:[a("thead",{className:"text-xs text-gray-900 uppercase bg-gray-200 sticky top-0 whitespace-nowrap",children:l("tr",{children:[a("th",{className:"px-3 py-1",children:"Nomor"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Tanggal"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Wilayah"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Unit"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Nama Karyawan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Jabatan"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo Sebelum"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Angsuran"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Pinjaman"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Saldo"}),a("th",{scope:"col",className:"px-3 py-1 hover:bg-main-200 hover:text-black",children:"Jasa modal"})]})}),a("tbody",{children:m?m.map((e,t)=>l("tr",{className:"even:bg-gray-100",children:[a("th",{className:"px-3 py-1",children:a("td",{colSpan:"2",children:t+1})},t),a("td",{className:"px-3 py-1",children:D(e.transaction_date).format("DD/MM/YYYY")}),a("td",{className:"px-3 py-1",children:e.wilayah}),a("td",{className:"px-3 py-1 whitespace-nowrap",children:e.unit}),a("td",{className:"px-3 py-1",children:e.nama_karyawan}),a("td",{className:"px-3 py-1",children:e.jabatan}),a("td",{className:"px-3 py-1 whitespace-nowrap",children:a(o,{value:e.saldo_sebelum,displayType:"text",thousandSeparator:","})}),a("td",{className:"px-3 py-1 whitespace-nowrap",children:a(o,{value:e.angsuran,displayType:"text",thousandSeparator:","})}),a("td",{className:"px-3 py-1 whitespace-nowrap",children:a(o,{value:e.pinjaman,displayType:"text",thousandSeparator:","})}),a("td",{className:"px-3 py-1 whitespace-nowrap",children:a(o,{value:e.saldo,displayType:"text",thousandSeparator:","})}),a("td",{className:"px-3 py-1 whitespace-nowrap",children:a(o,{value:e.jasa_modal,displayType:"text",thousandSeparator:","})})]})):a("tr",{children:a("td",{colSpan:"2",children:"Data Not Found"})})})]})}),l("div",{className:"flex items-start justify-center flex-col lg:flex-row gap-3",children:[a("div",{className:"flex-[3]",children:l("div",{className:"p-3 bg-white rounded shadow w-full",children:[a("div",{className:"font-semibold text-gray-500 text-xl mb-3",children:"Transaksi Pinjaman"}),l("form",{onSubmit:k,className:"w-full",children:[l("div",{className:"lg:flex gap-2 w-full",children:[l("div",{className:"mb-3 flex-1 w-full",children:[a(r,{value:"Wilayah",className:"mb-1"}),a(n,{className:"block w-full",disabled:!0,value:s.wilayah})]}),l("div",{className:"mb-3 flex-1 w-full",children:[a(r,{value:"Unit",className:"mb-1"}),a(n,{className:"block w-full",disabled:!0,value:s.unit})]}),l("div",{className:"mb-3 flex-1 w-full",children:[a(r,{value:"Nama Karyawan",className:"mb-1"}),a(n,{className:"block w-full",type:"text",disabled:!0,value:s.nama_karyawan})]}),l("div",{className:"mb-3 flex-1 w-full",children:[a(r,{value:"Bulan",className:"mb-1"}),a(n,{className:"block w-full",type:"date",required:!0,name:"transaction_date",min:s.awalbulan,max:s.akhirbulan,value:c.transaction_date,onChange:v})]})]}),l("div",{className:"lg:flex gap-2 w-full",children:[l("div",{className:"mb-3 flex-1 w-full",children:[a(r,{value:"Angsur",className:"mb-1"}),a(f,{name:"debit",id:"debit",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,max:s.max_payment,required:!0,onValueChange:u,value:c.debit,placeholder:"Inputkan angka tanpa sparator"}),a(b,{message:h.debit,className:"mt-2"})]}),l("div",{className:"mb-3 flex-1 w-full",children:[a(r,{value:"Jasa Modal 2%",className:"mb-1"}),a(f,{name:"jasa",id:"jasa",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:0,onValueChange:u,value:c.jasa,placeholder:"Inputkan angka tanpa sparator"}),a(b,{message:h.debit,className:"mt-2"})]})]}),a(T,{type:"submit",title:"submit"})]})]})}),a("div",{className:"flex-1",children:a(P,{id:s.id,setLoading:N})})]})]})})};export{G as default};
