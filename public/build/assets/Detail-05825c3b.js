import{W as f,j as a,a as l}from"./app-b6de9a88.js";import{A as w,C as i}from"./AuthenticatedLayout-2fa8312a.js";import{I as k}from"./InputError-741589bb.js";import{I as s}from"./InputLabel-7ec19e62.js";import{L as S}from"./LinkButton-7a3da68b.js";import{P as C}from"./PrimaryButton-83d74b64.js";import{T as n}from"./TextInput-9b401af1.js";import{C as I}from"./index.esm-20de4ddc.js";import{N as o}from"./react-number-format.es-8876b7fc.js";import"./transition-96bf3998.js";import"./Loading-b832758a.js";import"./iconBase-27e1330c.js";import"./index.esm-92f3fdda.js";import"./index.esm-6f99eeaf.js";const H=({details:c,curent_unit:t,...h})=>{var p;const{data:d,setData:m,post:u,processing:b,errors:x}=f({debit:1e6,transaction_date:""}),g=e=>{const{value:r,name:v}=e.target;m(v,r)},N=(e,r)=>{m(r,e)},y=e=>{e.preventDefault(),u(route("unitsaving.savingdetails",t.id))};return a(w,{loading:b,children:l(i,{judul:"Detail Tabungan 1 Juta",children:[a(i.subTitle,{children:a("div",{className:"flex flex-col items-center gap-3 lg:flex-row lg:justify-between",children:a(i.endContent,{className:"flex-wrap",children:a(S,{href:route("unitsaving.index",[{bulan:((p=h.back_params)==null?void 0:p.bulan)??null}]),title:"Back",size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"})})})}),l("div",{className:"sm:px-6 lg:px-8",children:[a("div",{className:"max-w-6xl p-3 mx-auto mb-3 bg-white rounded shadow",children:l("table",{className:"w-full text-xs text-left text-gray-500",children:[a("thead",{className:"sticky top-0 text-xs text-gray-900 uppercase bg-gray-200 whitespace-nowrap",children:l("tr",{children:[a("th",{className:"px-6 py-4",children:"Nomor"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Bulan"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Wilayah"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Unit"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Saldo Sebelum"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Simpanan"}),a("th",{scope:"col",className:"px-6 py-4 hover:bg-main-200 hover:text-black",children:"Saldo"})]})}),a("tbody",{children:c?c.map((e,r)=>l("tr",{className:"even:bg-gray-100",children:[a("th",{className:"px-6 py-1",children:a("td",{colSpan:"2",children:r+1})},r),a("td",{className:"px-6 py-1",children:e.tanggal}),a("td",{className:"px-6 py-1",children:e.wilayah}),a("td",{className:"px-6 py-1",children:e.unit}),a("td",{className:"px-6 py-1",children:a(o,{value:e.saldo_before,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-1",children:a(o,{value:e.debit,displayType:"text",thousandSeparator:",",prefix:"Rp. "})}),a("td",{className:"px-6 py-1",children:a(o,{value:e.saldo,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]})):a("tr",{children:a("td",{colSpan:"2",children:"Data Not Found"})})})]})}),t.editable&&a("div",{className:"max-w-6xl p-3 mx-auto bg-white rounded shadow",children:l("form",{onSubmit:y,className:"w-full",children:[l("div",{className:"w-full gap-3 lg:flex",children:[l("div",{className:"flex-1 mb-2",children:[a(s,{value:"Wilayah",className:"mb-1"}),a(n,{disabled:!0,value:t.wilayah})]}),l("div",{className:"flex-1 mb-2",children:[a(s,{value:"Unit",className:"mb-1"}),a(n,{disabled:!0,value:t.unit})]}),l("div",{className:"flex-1 w-full mb-2",children:[a(s,{value:"Bulan",className:"mb-1"}),a(n,{className:"block w-full",type:"date",required:!0,name:"transaction_date",min:t.awalbulan,max:t.akhirbulan,value:d.transaction_date,onChange:g})]})]}),l("div",{className:"mb-2",children:[a(s,{value:"Setoran Simpanan Wajib",className:"mb-1"}),a(I,{name:"debit",id:"debit",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:N,value:d.debit,placeholder:"Inputkan angka tanpa sparator"}),a(k,{message:x.debit,className:"mt-2"})]}),a(C,{type:"submit",title:"submit"})]})})]})]})})};export{H as default};