import{r as h,_ as I,a as s,j as a,F as M}from"./app-de2cccc6.js";import{I as n}from"./InputLabel-a516d818.js";import{L as C}from"./LinkButton-8e8f7c8e.js";import{P as j}from"./PrimaryButton-8c482837.js";import{S as y}from"./SelectList-cf0dcf63.js";import{T as c}from"./TextInput-37d8c38c.js";import{A as W,C as u}from"./AuthenticatedLayout-120287b2.js";import{d as g}from"./dayjs.min-f92535a6.js";import{C as p}from"./index.esm-92bc8704.js";import{N as r}from"./react-number-format.es-dc7dd9c5.js";import q from"./Mutasi-07840457.js";import{B as J}from"./ButtonWrapper-c6f23039.js";import"./transition-ea63980f.js";import"./index.esm-dac3b13c.js";const sa=({branch:A,datas:f,employees:V,deposit:d,validating:w,...B})=>{const[k,L]=h.useState(!1),{data:l,setData:o,put:N,processing:_,errors:P,reset:v}=I({saldo_awal_sk:0,nominal_sk:0,saldo_awal_sw:0,nominal_sw:0,transaction_date:"",transaction:"",transaction_type:"",income_note:"Setoran Awal"});h.useEffect(()=>{o({...l,saldo_awal_sk:d.sk_balance,saldo_awal_sw:d.sw_balance})},[d]);const S=e=>{const{value:t,name:i}=e.target;o(i,t)},m=(e,t)=>{o(t,parseInt(e))},[K,b]=h.useState(),D=e=>{b(null);const{value:t,name:i}=e.target;if(t==="D"&&(b([{id:1,value:"D",display:"Debit / Setor"}]),o({...l,nominal_sw:1e5,[i]:t})),t==="K"){o(i,t);const x=[{id:1,value:"K",display:"Pengambilan SK"}];d.status_karyawan=="Resign"&&x.push({id:2,value:"KRMD",display:"Kredit Resign / MD"}),b(x)}},T=e=>{const{name:t,value:i}=e.target;i==="KRMD"?o({...l,nominal_sw:parseInt(d.sw_balance),nominal_sk:parseInt(d.sk_balance),[t]:i}):o(t,i)},R=e=>{e.preventDefault(),console.log(l),N(route("sksw.addtransaksi",d.id),{onSuccess:t=>{v()}})};return s(W,{loading:_||k,children:[a(u,{judul:"Transaksi SKSW",children:a(u.subTitle,{children:s("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[s(u.startContent,{className:"flex-wrap mb-3 lg:mb-0",children:[a("p",{className:"text-xs",children:"* jika ada debit dan kredit dalam satu bulan, cara input disendirikan ( setelah debit baru kredit / sebaliknya)"}),a("p",{className:"text-xs",children:"*Jika Terjadi Kesalahan Input bisa hubungi tim IT ( jangan mengurangi transaksi jika memang tidak ada transaksi kredit )"})]}),a(u.endContent,{className:"flex-wrap",children:a(J,{children:a(C,{href:route("sksw.dashboard"),title:"Halaman Utama",className:"inline-block"})})})]})})}),a("div",{className:"p-5 mt-3 bg-gray-50 rounded shadow overflow-auto",children:s("table",{className:"w-full text-sm text-left text-gray-500 shadow rounded",children:[a("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:s("tr",{children:[a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap",children:"Wilayah"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap",children:"Unit"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap",children:"Bulan"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap",children:"Tanggal Transaksi"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold",children:"Saldo SW Sebelumnya"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold",children:"Debit SW"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold",children:"Kredit SW"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold",children:"Saldo SW"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold",children:"Setoran SW(D)"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold",children:"Debit Mutasi SW(D)"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold",children:"Pengambilan SW(K)"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold",children:"Kredit Mutasi SW(K)"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-blue-200 text-black font-semibold",children:"Kredit Resign / MD SW(K)"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold",children:"Saldo SK Sebelumnya"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold",children:"Debit SK"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold",children:"Kredit SK"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold",children:"Saldo SK"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold",children:"Setoran SK(D)"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold",children:"Debit Mutasi SK(D)"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold",children:"Pengambilan SK(K)"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold",children:"Kredit Mutasi SK(K)"}),a("th",{scope:"col",className:"px-6 py-3 whitespace-nowrap bg-red-200 text-black font-semibold",children:"Kredit Resign / MD SK(K)"})]})}),a("tbody",{children:f.map((e,t)=>s("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:[a("td",{className:"px-6 py-4",children:e.wilayah}),a("td",{className:"px-6 py-4 whitespace-nowrap",children:e.unit}),a("td",{className:"px-6 py-4",children:g(e==null?void 0:e.transaction_date).format("MMM")}),a("td",{className:"px-6 py-4",children:g(e==null?void 0:e.transaction_date).format("DD-MM-YYYY")}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-gray-100",children:a(r,{value:e.sw_balance_before,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-green-100 text-black",children:a(r,{value:e.sw_debit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-red-100 text-black",children:a(r,{value:e.sw_kredit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-green-200 text-black font-semibold",children:a(r,{value:e.sw_saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.D_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.DM_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.K_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.KM_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.KRMD_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-gray-50",children:a(r,{value:e.sk_balance_before,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-green-100 text-black",children:a(r,{value:e.sk_debit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-red-100 text-black",children:a(r,{value:e.sk_kredit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-green-200 text-black font-semibold",children:a(r,{value:e.sk_saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.D_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.DM_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.K_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.KM_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-4 whitespace-nowrap bg-blue-100",children:a(r,{value:e.KRMD_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]},t))})]})}),s("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:[a("div",{className:"p-3 bg-white rounded shadow mt-3",children:s("div",{className:"lg:flex justify-start items-start gap-3",children:[s("div",{className:"mb-3 flex-1",children:[a(n,{value:"Nama Karyawan"}),a(c,{type:"text",disabled:!0,value:d.nama_karyawan,name:"transaction_date",className:"w-full uppercase"})]}),s("div",{className:"mb-3 flex-1",children:[a(n,{value:"Unit Sekarang"}),a(c,{type:"text",disabled:!0,value:d.unit,name:"transaction_date",className:"w-full"})]}),s("div",{className:"mb-3 flex-1",children:[a(n,{value:"Status Karyawan"}),a(c,{type:"text",disabled:!0,value:d.status_karyawan,name:"transaction_date",className:"w-full"})]}),s("div",{className:"mb-3 flex-1",children:[a(n,{value:"Status SKSW"}),a(c,{type:"text",disabled:!0,value:d.status_sksw,name:"transaction_date",className:"w-full"})]}),a("div",{className:"mb-3 flex-1"}),a("div",{className:"mb-3 flex-1"})]})}),d.status_sksw=="Active"&&s(M,{children:[a("div",{className:"p-3 bg-white rounded shadow mt-3",children:s("form",{onSubmit:R,children:[a("span",{className:"font-semibold mb-3",children:"Transaksi"}),s("div",{className:"lg:flex justify-start items-start gap-3",children:[s("div",{className:"mb-3 flex-1",children:[a(n,{value:"Tanggal Transaksi"}),a(c,{type:"month",required:!0,max:w.max_date,min:w.min_date,onChange:S,name:"transaction_date",className:"w-full"})]}),s("div",{className:"mb-3 flex-1",children:[a(n,{value:"Jenis Transaksi"}),a(y,{className:"w-full",nullValue:!0,required:!0,name:"transaction",value:l.transaction,onChange:D,options:[{id:1,value:"D",display:"Debit"},{id:2,value:"K",display:"Kredit"}]})]}),s("div",{className:"mb-3 flex-1",children:[a(n,{value:"Jenis Transaksi"}),a(y,{className:"w-full",nullValue:!0,name:"transaction_type",required:!0,onChange:T,options:K})]}),s("div",{className:"flex-[2] flex gap-3",children:[s("div",{className:"flex-1",children:[s("div",{className:"mb-3",children:[a(n,{value:"Saldo Simpanan Wajib"}),a(p,{name:"saldo_awal_sw",id:"saldo_awal_sw",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed",allowDecimals:!1,prefix:"Rp. ",min:1,readOnly:!0,required:!0,onValueChange:m,value:l.saldo_awal_sw,placeholder:"Inputkan angka tanpa sparator"})]}),s("div",{className:"mb-3",children:[a(n,{value:"Nominal Transaksi Simpanan Wajib"}),a(p,{name:"nominal_sw",id:"nominal_sw",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:m,value:l.nominal_sw,placeholder:"Inputkan angka tanpa sparator"})]}),s("div",{className:"mb-3",children:[a(n,{value:"Saldo Akhir Transaksi Simpanan Wajib"}),a(p,{name:"sw_balance",id:"sw_balance",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed",allowDecimals:!1,prefix:"Rp. ",min:1,readOnly:!0,required:!0,value:l.transaction=="D"?parseInt(l.saldo_awal_sw)+parseInt(l.nominal_sw):parseInt(l.saldo_awal_sw)-parseInt(l.nominal_sw),placeholder:"Inputkan angka tanpa sparator"})]})]}),s("div",{className:"flex-1",children:[s("div",{className:"mb-3",children:[a(n,{value:"Saldo Simpanan Sukarela"}),a(p,{name:"saldo_awal_sk",id:"saldo_awal_sk",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,readOnly:!0,onValueChange:m,value:l.saldo_awal_sk,placeholder:"Inputkan angka tanpa sparator"})]}),s("div",{className:"mb-3",children:[a(n,{value:"Nominal Transaksi Simpanan Sukarela"}),a(p,{name:"nominal_sk",id:"nominal_sk",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:m,value:l.nominal_sk,placeholder:"Inputkan angka tanpa sparator"})]}),s("div",{className:"mb-3",children:[a(n,{value:"Saldo Akhir Transaksi Simpanan Sukarela"}),a(p,{name:"sk_balance",id:"sk_balance",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-md read-only:bg-gray-100 read-only:cursor-not-allowed",allowDecimals:!1,prefix:"Rp. ",readOnly:!0,min:1,required:!0,value:l.transaction=="D"?parseInt(l.saldo_awal_sk)+parseInt(l.nominal_sk):parseInt(l.saldo_awal_sk)-parseInt(l.nominal_sk),placeholder:"Inputkan angka tanpa sparator"})]})]})]})]}),a("div",{children:a(j,{title:"Submit",type:"submit"})})]})}),a(q,{})]})]})]})};export{sa as default};
