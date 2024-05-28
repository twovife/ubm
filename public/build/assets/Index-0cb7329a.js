import{r as g,a as n,j as e,d as N}from"./app-685a650b.js";import{C as s}from"./Navbar-ed35b3ad.js";import{P as v}from"./PrimaryButton-b901c9f3.js";import{A as Y}from"./AuthenticatedLayout-8ede30e6.js";import{d as r}from"./dayjs.min-615c3dc9.js";import{u as k}from"./useFilter-f148eda9.js";import{D as t}from"./DefaultTable-95d2665a.js";import{P as j}from"./Paginasi-57d6422e.js";import{S as P}from"./Search-f91c9d4c.js";import{F as D}from"./FilterBox-02f95ec3.js";import"./index.esm-30d96192.js";import"./iconBase-b6d1d32b.js";import"./transition-85f71fcc.js";import"./index.esm-dde3bf1e.js";import"./Loading-97ca849f.js";import"./SelectList-ad4fa6c8.js";import"./useServerFilter-bb490841.js";import"./TextInput-054957de.js";import"./InputLabel-f5698ebd.js";const Q=({server_filter:M,datas:i,...S})=>{const[l,c]=g.useState(!1),{showFilter:h,setShowFilter:o,filter:m,whenFilterrAdding:y,addFilter:u,setAddFilter:_,removeFilter:f,returnedData:d,currentPage:w,totalPages:x,handlePageChange:b}=k(i,10,"employee_index");return n(Y,{loading:l,judul:"Daftar Karyawan",children:[e(D,{show:h,setShow:o,whenFilterrAdding:y,addFilter:u,setAddFilter:_}),n(s,{judul:"Daftar Karyawan",children:[e(s.subTitle,{children:n("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[e(s.startContent,{className:"flex-wrap mb-3 lg:mb-0",children:e(s.filterItem,{filter:m,removeFilter:f})}),n(s.endContent,{className:"flex-wrap",children:[e(P,{loading:l,setLoading:c,urlLink:route("emp.index"),localState:"emp.index",availableBranch:!0}),e(v,{className:"block",title:"Tambah Baru"})]})]})}),n(t,{children:[n(t.thead,{children:[e(t.th,{type:"nested",sticky:!0,headers:[{name:"No",filterable:"no"},{name:"Nama",filterable:"yes",column:"nama",type_date:"text"}]}),e(t.th,{type:"default",headers:{name:"Status",filterable:"no"}}),e(t.th,{type:"default",headers:{name:"NIK",filterable:"yes",column:"nik",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Alamat",filterable:"yes",column:"alamat",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Tanggal Masuk",filterable:"yes",column:"hire_date",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Masa Kerja (th)",filterable:"yes",column:"masa_kerja",type_date:"number"}}),e(t.th,{type:"default",headers:{name:"Unit",filterable:"yes",column:"unit",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Jabatan",filterable:"yes",column:"jabatan",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Jenis Jaminan",filterable:"yes",column:"janis_jaminan",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Tanggal Pindah",filterable:"yes",column:"tanggal_perpindahan",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Keterangan Pindah",filterable:"yes",column:"keterangan_perpindahan",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"History Pindah",filterable:"yes",column:"history_perpindahan",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Tanggal Berhenti",filterable:"yes",column:"date_resign",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Keterangan Berhenti",filterable:"yes",column:"resign_status",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Pencairan Simp.Wjb",filterable:"yes",column:"pencairan_simpanan_w_date",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Petugas",filterable:"yes",column:"pencairan_simpanan_w_by",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Pencairan Simp.Sukarela",filterable:"yes",column:"pencairan_simpanan_date",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Petugas",filterable:"yes",column:"pencairan_simpanan_by",type_date:"text"}}),e(t.th,{type:"default",headers:{name:"Pengembalian Jaminan",filterable:"yes",column:"handover_jaminan",type_date:"date"}}),e(t.th,{type:"default",headers:{name:"Petugas",filterable:"yes",column:"handover_jaminan_by",type_date:"text"}})]}),e("tbody",{className:"divide-y divide-gray-200 relative z-0",children:d&&d.map((a,p)=>n("tr",{className:"odd:bg-white even:bg-gray-100 hover:bg-roman-50",children:[e("td",{className:"sticky left-0 top-0 z-10 bg-inherit",children:n("div",{className:"grid grid-cols-5 gap-1",children:[e("div",{className:"col-span-1 px-3 py-1.5 whitespace-nowrap text-center",children:n(N,{href:route("emp.show",a.id),className:"text-blue-500 hover:bg-blue-500 hover:text-white  focus:bg-blue-500 focus:text-white text-center px-1 py-0.5 rounded",children:[e("span",{children:p+1}),e("span",{className:"hidden lg:inline-block ml-2",children:"Edit"})]})}),e("div",{className:"col-span-4 px-3 py-1.5 whitespace-nowrap",children:a.nama})]})}),e("td",{className:"px-3 py-1.5 whitespace-nowrap",children:a.status_karyawan=="Aktif"?e("div",{className:"bg-green-500 text-white text-center px-2 py-1 rounded",children:a.status_karyawan}):a.status_karyawan=="Resign"?e("div",{className:"bg-amber-400 text-white text-center px-2 py-1 rounded",children:a.status_karyawan}):a.status_karyawan=="Pecat"?e("div",{className:"bg-black text-white text-center px-2 py-1 rounded",children:a.status_karyawan}):a.status_karyawan=="belum-lengkap"?e("div",{className:"bg-blue-500 text-white text-center px-2 py-1 rounded",children:a.status_karyawan}):""}),e("td",{className:"px-3 py-1.5 whitespace-nowrap",children:a.nik}),e("td",{className:"px-3 py-1.5",children:e("div",{className:"w-44",children:a.alamat})}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap",children:a.hire_date?r(a.hire_date).format("DD-MM-YYYY"):"-"}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap",children:`${a.masa_kerja} Th`}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap",children:a.unit}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap",children:a.jabatan}),e("td",{className:"px-3 py-1.5 w-36 whitespace-nowrap text-xs",children:a.janis_jaminan}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.tanggal_perpindahan?r(a.tanggal_perpindahan).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.keterangan_perpindahan}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.history_perpindahan}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.date_resign?r(a.date_resign).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.resign_status}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.pencairan_simpanan_date?r(a.pencairan_simpanan_date).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.pencairan_simpanan_by}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.pencairan_simpanan_w_date?r(a.pencairan_simpanan_w_date).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.pencairan_simpanan_w_by}),e("td",{scope:"col",className:"px-3 py-1.5 whitespace-nowrap",children:a.handover_jaminan?r(a.handover_jaminan).format("DD-MM-YYYY"):""}),e("td",{scope:"col",className:"px-3 py-1.5",children:a.handover_jaminan_by})]},p))})]}),e(j,{currentPage:w,totalPages:x,onPageChange:b})]})]})};export{Q as default};
