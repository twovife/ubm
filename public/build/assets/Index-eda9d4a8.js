import{r as o,j as e,a as i,R as C,F as _}from"./app-df871abb.js";import{A as S}from"./AuthenticatedLayout-ddac043c.js";import{C as n}from"./Navbar-88a283a0.js";import{S as k}from"./Search-4a1b8990.js";import"./DefaultTable-0fb01719.js";import R from"./TabelUnit-9723907a.js";import{u as j,T as F,a as L,b as g,c as f,f as l,d as D,e as M,g as A,h as I}from"./table-79fd49b5.js";import{T as K,a as V,b as E,c as H}from"./tabs-68c27bcb.js";import{F as w}from"./FormatNumbering-e591f225.js";import"./Loading-0b0ba1ff.js";import"./transition-0c33212e.js";import"./iconBase-6f294e2e.js";import"./index.esm-6eb99c1e.js";import"./index.esm-a32ba1d8.js";import"./PrimaryButton-2e9f3eea.js";import"./SelectList-d2279005.js";import"./useServerFilter-a6266122.js";import"./TextInput-6df0972b.js";import"./ButtonWrapper-424887ee.js";import"./Create-a0c98986.js";import"./InputError-27d9f13a.js";import"./InputLabel-506b9b72.js";import"./index.esm-67de2cc5.js";import"./dialog-6183c01a.js";import"./index-ca27c7cc.js";import"./utils-01642ffa.js";import"./react-number-format.es-cf93bc84.js";import"./index-4adb76a8.js";const we=({branch:W,server_filters:B,datas:m,batch_datas:s,...G})=>{const[d,p]=o.useState(!1),[x,h]=o.useState(0),y=t=>{localStorage.setItem("tabsActive_sksw_global_index",t),h(t)};o.useEffect(()=>{const t=localStorage.getItem("tabsActive_sksw_global_index");h(parseInt(t)||0)},[]);const[b,T]=o.useState(()=>m);o.useEffect(()=>{T(m)},[m]);const v=(t=>t.reduce((r,a)=>(r.total+=a.total||0,r),{total:0}))(b),N=o.useMemo(()=>[{accessorKey:"wilayah",id:"wilayah",cell:t=>t.getValue(),header:()=>"Wilayah"},{accessorKey:"total",id:"total",cell:t=>e(w,{value:t.getValue()}),header:()=>"Total",footer:t=>e(w,{value:v.total})},{accessorKey:"last_month_payment",id:"last_month_payment",cell:t=>t.getValue(),header:()=>"Keterangan"}],[]),c=j({data:b,columns:N,getCoreRowModel:I()});return i(S,{loading:d,children:[i(n,{judul:"Tabungan 1JT Unit",children:[e(n.subTitle,{children:i("div",{className:"flex flex-col items-center gap-3 lg:flex-row lg:justify-between",children:[e(n.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),e(n.endContent,{className:"flex-wrap",children:e(k,{loading:d,setLoading:p,urlLink:route("unitsaving.index"),localState:"unitsaving_index",availableMonth:!0})})]})}),i(F,{className:"border",children:[e(L,{children:c.getHeaderGroups().map((t,r)=>e(g,{children:t.headers.map((a,u)=>e(f,{className:"text-center",children:l(a.column.columnDef.header,a.getContext())},u))},r))}),e(D,{children:c.getRowModel().rows.length?c.getRowModel().rows.map((t,r)=>e(C.Fragment,{children:e(g,{className:"text-center",children:t.getVisibleCells().map((a,u)=>e(M,{className:a.column.columnDef.className,children:a.column.columnDef.type=="action"?e("div",{className:"flex items-center justify-center-center",children:e("div",{className:"w-full",children:l(a.row.original.button_type)==2?e("button",{onClick:()=>handleOpenCreate(a.row.original.branch_id,a.row.original.unit),className:"px-2 py-1 text-white bg-green-500 rounded-lg",children:"Baru"}):l(a.row.original.button_type)==3?e(Link,{href:route("unitsaving.savingdetails",a.row.original.id),className:"px-2 py-1 text-white bg-gray-500 rounded-lg",children:"Tutup"}):l(a.row.original.button_type)==4?e("div",{className:"px-2 py-1 rounded-lg",children:"Non Aktif"}):l(a.row.original.button_type)==1?e(Link,{href:route("unitsaving.savingdetails",a.row.original.id),className:"px-2 py-1 text-white bg-indigo-500 rounded-lg",children:"Setor"}):l(a.row.original.button_type)==5?e(Link,{href:route("unitsaving.savingdetails",a.row.original.id),className:"px-2 py-1 text-white rounded-lg bg-amber-500",children:"Nihil"}):"invalid"})}):l(a.column.columnDef.cell,a.getContext())},u))},r)},r)):null}),e(A,{children:c.getFooterGroups().map((t,r)=>e(g,{children:t.headers.map(a=>e(f,{className:"text-center text-black bg-gray-100",children:l(a.column.columnDef.footer,a.getContext())},a.id))},r))})]})]}),e(n,{judul:"Wilayah",children:e("div",{className:"w-full",children:i(K,{className:"w-full",value:x,children:[e(V,{children:s.length>0?s.map((t,r)=>e(E,{onClick:()=>y(t.wilayah),value:t.wilayah,className:"ml-3 first:ml-0",children:t.wilayah})):null}),e(_,{children:s.length>0?s.map((t,r)=>e(H,{value:t.wilayah,children:e(R,{triggeredWilayah:t.wilayah,loading:d,setLoading:p})})):null})]})})})]})};export{we as default};
