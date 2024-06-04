import{j as e,a as r,r as f,d as D}from"./app-de2cccc6.js";import{A as M,C as i}from"./AuthenticatedLayout-120287b2.js";import{P as C}from"./PrimaryButton-8c482837.js";import{d as l}from"./dayjs.min-f92535a6.js";import{u as P,D as t}from"./useFilter-21ad523d.js";import{S}from"./Search-7053da64.js";import{F as B}from"./FilterBox-56b32988.js";import F from"./Create-ad0181e3.js";import"./transition-ea63980f.js";import"./index.esm-dac3b13c.js";import"./SelectList-cf0dcf63.js";import"./useServerFilter-bfb5d5b5.js";import"./TextInput-37d8c38c.js";import"./ButtonWrapper-c6f23039.js";import"./InputLabel-a516d818.js";import"./InputError-6382fce3.js";function A({currentPage:n,totalPages:o,onPageChange:p}){const c=n>1,h=n<o,d=Math.max(1,n-2),y=Math.min(o,d+4),m=Array.from({length:y-d+1},(s,u)=>d+u);return e("nav",{"aria-label":"Page navigation example",children:r("ul",{className:"flex items-center -space-x-px h-8 text-sm",children:[c&&e("li",{children:r("button",{onClick:()=>p(n-1),className:"flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",children:[e("span",{className:"sr-only",children:"Previous"}),e("svg",{className:"w-2.5 h-2.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10",children:e("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M5 1 1 5l4 4"})})]})}),m.map(s=>e("li",{children:e("button",{onClick:()=>p(s),disabled:n===s,className:"disabled:bg-gray-500 disabled:text-white flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",children:s})},s)),h&&e("li",{children:r("button",{onClick:()=>p(n+1),className:"flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white",children:[e("span",{className:"sr-only",children:"Next"}),e("svg",{className:"w-2.5 h-2.5","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 6 10",children:e("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"m1 9 4-4-4-4"})})]})})]})})}const V=({server_filter:n,datas:o,...p})=>{const[c,h]=f.useState(!1),{showFilter:d,setShowFilter:y,filter:m,whenFilterrAdding:s,addFilter:u,setAddFilter:_,removeFilter:k,returnedData:g,currentPage:N,totalPages:v,handlePageChange:j}=P(o,10,"employee_index"),[x,Y]=f.useState(!1),w=()=>{Y(!x)};return r(M,{loading:c,judul:"Daftar Karyawan",children:[e(B,{show:d,setShow:y,whenFilterrAdding:s,addFilter:u,setAddFilter:_}),r(i,{judul:"Daftar Karyawan",children:[e(i.subTitle,{children:r("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[e(i.startContent,{className:"flex-wrap mb-3 lg:mb-0",children:e(i.filterItem,{filter:m,removeFilter:k})}),e(i.endContent,{className:"flex-wrap",children:e(S,{loading:c,setLoading:h,urlLink:route("emp.index"),localState:"employee_index",availableBranch:!0,children:e(C,{className:"block",title:"Tambah Baru",onClick:w})})})]})}),r(t,{children:[r(t.thead,{children:[e(t.th,{type:"nested",sticky:!0,headers:[{name:"No",filterable:"no"},{name:"Nama",filterable:"yes",column:"nama",type_date:"text"}]}),e(t.th,{type:"default",headers:{name:"Status",filterable:"no"}}),e(t.th,{type:"default",headers:{name:"NIK",filterable:"yes",column:"nik",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Alamat",filterable:"yes",column:"alamat",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Tanggal Masuk",filterable:"yes",column:"hire_date",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Masa Kerja (th)",filterable:"yes",column:"masa_kerja",type_date:"number"}}),e(t.th,{type:"default",headers:{name:"Unit",filterable:"yes",column:"unit",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Jabatan",filterable:"yes",column:"jabatan",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Jenis Jaminan",filterable:"yes",column:"janis_jaminan",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Tanggal Pindah",filterable:"yes",column:"tanggal_perpindahan",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Keterangan Pindah",filterable:"yes",column:"keterangan_perpindahan",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"History Pindah",filterable:"yes",column:"history_perpindahan",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Tanggal Berhenti",filterable:"yes",column:"date_resign",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Keterangan Berhenti",filterable:"yes",column:"resign_status",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Pencairan Simp.Wjb",filterable:"yes",column:"pencairan_simpanan_w_date",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Petugas",filterable:"yes",column:"pencairan_simpanan_w_by",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Pencairan Simp.Sukarela",filterable:"yes",column:"pencairan_simpanan_date",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Petugas",filterable:"yes",column:"pencairan_simpanan_by",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Pengembalian Jaminan",filterable:"yes",column:"handover_jaminan",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Petugas",filterable:"yes",column:"handover_jaminan_by",type_date:"text"}})]}),e("tbody",{className:"divide-y divide-gray-200 relative z-0 text-xs",children:g&&g.map((a,b)=>r("tr",{className:"odd:bg-white even:bg-gray-100 hover:bg-roman-50",children:[e("td",{className:"sticky left-0 top-0 z-10 bg-inherit",children:r("div",{className:"grid grid-cols-5 gap-1",children:[e("div",{className:"col-span-1 px-3 py-1.5 whitespace-nowrap text-center",children:r(D,{href:route("emp.show",a.id),className:"text-blue-500 hover:bg-blue-500 hover:text-white  focus:bg-blue-500 focus:text-white text-center px-1 py-0.5 rounded",children:[e("span",{children:b+1}),e("span",{className:"hidden lg:inline-block ml-2",children:"Edit"})]})}),e("div",{className:"col-span-4 px-3 py-1.5 whitespace-nowrap",children:a.nama})]})}),e("td",{className:"px-3 py-1.5 whitespace-nowrap",children:a.status_karyawan=="Aktif"?e("div",{className:"bg-green-500 text-white text-center px-2 py-1 rounded",children:a.status_karyawan}):a.status_karyawan=="Resign"?e("div",{className:"bg-amber-400 text-white text-center px-2 py-1 rounded",children:a.status_karyawan}):a.status_karyawan=="Pecat"?e("div",{className:"bg-black text-white text-center px-2 py-1 rounded",children:a.status_karyawan}):a.status_karyawan=="belum-lengkap"?e("div",{className:"bg-blue-500 text-white text-center px-2 py-1 rounded",children:a.status_karyawan}):""}),e("td",{className:"px-3 py-1.5 whitespace-nowrap",children:a.nik}),e("td",{className:"px-3 py-1.5",children:e("div",{className:"w-44",children:a.alamat})}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap",children:a.hire_date?l(a.hire_date).format("DD-MM-YYYY"):"-"}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap",children:`${a.masa_kerja} Th`}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap",children:a.unit}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap",children:a.jabatan}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap text-xs",children:a.janis_jaminan}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.tanggal_perpindahan?l(a.tanggal_perpindahan).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.keterangan_perpindahan}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.history_perpindahan}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.date_resign?l(a.date_resign).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.resign_status}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.pencairan_simpanan_date?l(a.pencairan_simpanan_date).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.pencairan_simpanan_by}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.pencairan_simpanan_w_date?l(a.pencairan_simpanan_w_date).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.pencairan_simpanan_w_by}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.handover_jaminan?l(a.handover_jaminan).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.handover_jaminan_by})]},b))})]}),e(A,{currentPage:N,totalPages:v,onPageChange:j}),e(F,{show:x,setShow:w,setLoading:h})]})]})};export{V as default};
