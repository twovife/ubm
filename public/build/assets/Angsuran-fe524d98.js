import{r as u,j as i,a,F as g,n as F,g as $}from"./app-3502981f.js";import{I as b}from"./InputLabel-37295ceb.js";import{L as I}from"./Loading-ef25532a.js";import{P as L}from"./PrimaryButton-eeb4d7e5.js";import{S as j}from"./SelectList-9ceef050.js";import{T as C}from"./TextInput-94ef07e5.js";import{A as P}from"./AuthenticatedLayout-835ae7c2.js";import{d as o}from"./dayjs.min-96d919f6.js";import{N as c}from"./react-number-format.es-faa2c34d.js";import R from"./ModalAngsuran-04059890.js";import"./transition-fe8cd52b.js";import"./index.esm-9f6588cf.js";import"./iconBase-c5d34aa7.js";import"./index.esm-bff22a13.js";import"./Modal-1759e292.js";import"./index.esm-dcad7d9f.js";import"./InputError-6fedeff9.js";import"./Checkbox-1cc29a24.js";const ra=({...d})=>{console.log(d.display_tanggal);const[M,f]=u.useState(!1),S=e=>{f(!1)},[k,N]=u.useState(!1),[x,H]=u.useState({search:"",hari:"",kelompok:"",...d.dataFilters});u.useState({show:!1,textAlert:null,typeAlert:null});const D=[{id:1,display:"senin",value:"senin"},{id:2,display:"selasa",value:"selasa"},{id:3,display:"rabu",value:"rabu"},{id:4,display:"kamis",value:"kamis"},{id:5,display:"jumat",value:"jumat"},{id:6,display:"sabtu",value:"sabtu"},{id:7,display:"minggu",value:"minggu"}],A=d.kelompok.sort((e,t)=>e.area-t.area).map(e=>({id:e.id,value:e.area,display:e.area})),w=e=>{const t={...x,[e.target.name]:e.target.value};$.get(window.location.href,{data:t},{onBefore:()=>N(!0),onFinish:()=>N(!1)})},_=e=>{let t=null;return e.map((p,n)=>{const m=new Date(p).getMonth()+1;let s=null;return t==null||t==m?s=a("th",{className:"w-16 text-center px-6 py-3",children:o(p).format("DD/MM")},`x${n}`):s=i(g,{children:[a("th",{className:"w-16 text-center px-6 py-3",children:"TTL Angsuran"},`xa${n}`),a("th",{className:"w-16 text-center px-6 py-3",children:"Saldo"},`xaa${n}`),a("th",{className:"w-16 text-center px-6 py-3",children:o(p).format("DD/MM")},`x${n}`)]}),t=m,s})},T=(e,t)=>{let p=null,n=0,m=0;return e.map((s,h)=>{const v=new Date(s).getMonth()+1;let y=null;return p==null||p==v?y=a("td",{className:`text-center whitespace-nowrap text-sm px-6 py-3 ${t.angsuran.filter(r=>r.pembayaran_date==s).map(r=>r.danatitipan).join(", ")=="true"?"text-red-500":""}`,tanggal_id:o(s).format("DD/MM"),children:(()=>{if(t.angsuran.some(r=>r.pembayaran_date===s)){const r=t.angsuran.filter(l=>l.pembayaran_date==s).map(l=>(n+=parseInt(l.jumlah),m=parseInt(l.saldo_terakhir),l.jumlah)).join(", ");return a(c,{value:r,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}})()},`headerdate${h}`):y=i(g,{children:[a("td",{className:"text-center whitespace-nowrap text-sm px-6 py-3 bg-yellow-50",children:a(c,{value:n,displayType:"text",thousandSeparator:",",prefix:"Rp. "})},`xx1${h}`),a("td",{className:"text-center whitespace-nowrap text-sm px-6 py-3 bg-yellow-50",children:a(c,{value:m,displayType:"text",thousandSeparator:",",prefix:"Rp. "})},`xx2${h}`),a("td",{className:`text-center whitespace-nowrap text-sm px-6 py-3 ${t.angsuran.filter(r=>r.pembayaran_date==s).map(r=>r.danatitipan).join(", ")=="true"?"text-red-500":""}`,tanggal_id:o(s).format("DD/MM"),children:(()=>{if(t.angsuran.some(r=>r.pembayaran_date===s)){const r=t.angsuran.filter(l=>l.pembayaran_date==s).map(l=>(n=0,n+=l.jumlah,m=l.saldo_terakhir,l.jumlah)).join(", ");return a(c,{value:r,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}else n=parseInt(0),n+=parseInt(0)})()},`x2${h}`)]}),p=v,y})};return i(P,{auth:d.auth,errors:d.errors,header:a(g,{children:a("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Data Storting"})}),children:[a(F,{title:"Data Storting"}),a(I,{show:k}),a(R,{data:M,onClose:S,mantri:d.mantri}),a("div",{className:"py-3",children:a("div",{className:"mx-auto sm:px-6 lg:px-8",children:a("div",{className:"bg-white overflow-hidden shadow-sm sm:rounded-lg",children:i("div",{className:"border p-6 text-main-800",children:[i("div",{className:"flex justify-between w-full items-center mb-6",children:[i("div",{className:"flex gap-3 items-center",children:[a(b,{value:"Kelompok :",className:"font-semibold"}),a(j,{value:x.kelompok??"",name:"kelompok",onChange:w,nullValue:!0,options:A})]}),i("div",{className:"flex gap-3 items-center ml-3",children:[a(b,{value:"Hari :",className:"font-semibold"}),a(j,{value:x.hari??"",name:"hari",onChange:w,nullValue:!0,options:D})]}),a("div",{className:"ml-auto",children:i("form",{className:"flex gap-3",children:[a(C,{placeholder:"Cari Nama",id:"searchFill"}),a(L,{type:"submit",title:"search"})]})})]}),a("div",{className:"relative overflow-x-auto shadow-md sm:rounded-lg text-main-800 mb-6 whitespace-pre-wrap",children:i("table",{className:"w-full text-sm text-left text-main-500 dark:text-main-400",children:[a("thead",{className:"text-xs text-main-700 uppercase bg-main-100 dark:bg-gray-700 dark:text-main-400",children:i("tr",{children:[a("th",{className:"px-6 py-3",children:"Nomor"}),a("th",{className:"px-6 py-3 whitespace-nowrap",children:"Tanggal Drop"}),a("th",{className:"px-6 py-3 whitespace-nowrap",children:"Nama Nasabah"}),a("th",{className:"px-6 py-3",children:"Alamat"}),a("th",{className:"px-6 py-3",children:"Kelompok"}),a("th",{className:"px-6 py-3",children:"Hari"}),a("th",{className:"px-6 py-3 whitespace-nowrap",children:"Pinjaman Ke"}),a("th",{className:"px-6 py-3 whitespace-nowrap",children:"Jml Angsuran"}),a("th",{className:"px-6 py-3 whitespace-nowrap",children:"Besar Pinjaman"}),_(d.display_tanggal)]})}),a("tbody",{children:d.pinjaman.map((e,t)=>i("tr",{children:[a("td",{className:"px-6 py-3",children:t+1}),a("td",{className:"px-6 py-3",children:o(e.tanggal_drop).format("DD-MM-YYYY")}),a("td",{className:"px-6 py-3 hover:bg-gray-100 hover:cursor-pointer text-blue-500",onClick:p=>f({show:!0,dataArray:e}),children:e.customer.nama}),a("td",{className:"px-6 py-3",children:e.customer.alamat}),a("td",{className:"px-6 py-3",children:e.kelompok}),a("td",{className:"px-6 py-3",children:e.hari}),a("td",{className:"px-6 py-3",children:"1"}),a("td",{className:"px-6 py-3",children:e.angsuran.length}),a("td",{className:"px-6 py-3 whitespace-nowrap",children:a(c,{value:e.pinjaman,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),T(d.display_tanggal,e)]},t))})]})})]})})})})]})};export{ra as default};
