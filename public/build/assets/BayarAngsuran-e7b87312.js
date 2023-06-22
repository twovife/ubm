import{_ as x,j as e,a}from"./app-fb0605f7.js";import{C as g}from"./Checkbox-5e97c82e.js";import{I as i}from"./InputLabel-188d0602.js";import{L as f}from"./Loading-f5852003.js";import{P as y}from"./PrimaryButton-0a91b541.js";import{S as N}from"./SelectList-c2789120.js";import"./TextInput-32029054.js";import{M as v}from"./MobileLayout-6f05eee5.js";import{d}from"./dayjs.min-86fafd73.js";import{C as w}from"./index.esm-830a9687.js";import{N as k}from"./react-number-format.es-383626a1.js";import"./transition-5bf56c86.js";import"./LinkButton-fd760fad.js";import"./index.esm-749211a1.js";import"./iconBase-77bd93ce.js";const R=({...t})=>{const{data:s,setData:n,put:c,processing:o,reset:u,errors:C}=x({pembayaran_date:d().format("YYYY-MM-DD"),jumlah:"",mantri:t.auth.user.employee_id,status:"",isMantriApp:!0,danatitipan:!1}),h=(r,l)=>{n(l,r)},m=r=>{n(r.target.name,r.target.type==="checkbox"?r.target.checked:r.target.value)},p=r=>{r.preventDefault(),c(route("unit.pinjaman.angsuran.bayar",t.loans.id),{onSuccess:u()})},b=[{id:1,value:"normal",display:"Normal"},{id:2,value:"cm",display:"CM"},{id:3,value:"mb",display:"MB"},{id:4,value:"ml",display:"ML"}];return e(v,{auth:t.auth,errors:t.errors,header:"Angsuran Mantri",children:[a(f,{show:o}),e("div",{className:"py-3 px-6 text-main-800 rounded-md border mb-3 shadow",children:[e("div",{className:"flex w-full items-center mb-2 border-b",children:[a("div",{className:"flex-[2]",children:"Nama Customer"}),a("div",{className:"flex-[3]",children:t.loans.customer.nama})]}),e("div",{className:"flex w-full items-center mb-2 border-b",children:[a("div",{className:"flex-[2]",children:"NIK"}),a("div",{className:"flex-[3]",children:t.loans.customer.nik})]})]}),a("div",{children:a("div",{className:"relative overflow-x-auto",children:e("table",{className:"w-full text-sm text-left text-gray-500 dark:text-gray-400",children:[a("thead",{className:"text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400",children:e("tr",{children:[a("th",{scope:"col",className:"px-6 py-3",children:"No"}),a("th",{scope:"col",className:"px-6 py-3",children:"Tanggal Angsuran"}),a("th",{scope:"col",className:"px-6 py-3",children:"Jumlah"})]})}),a("tbody",{children:t.loans.angsuran.map((r,l)=>e("tr",{className:"bg-white border-b dark:bg-gray-800 dark:border-gray-700",children:[a("td",{className:"px-6 py-4",children:l+1}),a("td",{className:"px-6 py-4",children:d(r.pembayaran_date).format("DD/MM/YYYY")}),a("td",{className:"px-6 py-4",children:a(k,{value:r.jumlah,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]},l))})]})})}),a("div",{className:"py-3 px-6 text-main-800 rounded-md border mb-3 shadow",children:e("div",{children:[a("h1",{className:"text-xl mb-3",children:"Pembayaran Angsuran"}),e("form",{onSubmit:p,className:"mb-3",children:[a("div",{className:"flex gap-3",children:e("div",{className:"flex-1",children:[a(i,{value:"Jumlah Pembayaran"}),a(w,{name:"jumlah",id:"jumlah",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full mt-1",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:h,value:s.pinjaman,placeholder:"Inputkan angka tanpa sparator"})]})}),a("div",{className:"flex gap-3 mt-3",children:e("div",{className:"flex-1",children:[a(i,{value:"Status Angsuran"}),a(N,{required:!0,name:"status",className:"w-full mt-1",onChange:m,nullValue:!0,options:b})]})}),a("div",{className:"block mt-4",children:e("label",{className:"flex items-center",children:[a(g,{name:"danatitipan",value:s.danatitipan,onChange:m}),a("span",{className:"ml-2 text-sm text-gray-600",children:"Dana Titipan?"})]})}),a("div",{className:"w-full mt-3",children:a(y,{className:"ml-auto",title:"Setuju",type:"submit"})})]})]})})]})};export{R as default};
