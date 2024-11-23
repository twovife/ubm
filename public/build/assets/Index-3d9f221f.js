import{r as o,j as e,a as i,F as C}from"./app-4f05f94d.js";import{A as _,C as n}from"./AuthenticatedLayout-4d3d24c0.js";import{S}from"./Search-fff9f1bb.js";import k from"./TabelUnit-70a28180.js";import{u as R,T as j,a as F,b as g,c as f,f as l,d as L,e as D,g as M,h as A}from"./table-2becad6f.js";import{T as I,a as K,b as V,c as E}from"./tabs-08323668.js";import{F as w}from"./FormatNumbering-1549d2b9.js";import"./transition-cc305502.js";import"./Loading-f0e3f8f8.js";import"./iconBase-41b361e6.js";import"./index.esm-1b68e9a9.js";import"./index.esm-ee5137ef.js";import"./PrimaryButton-98ce0df1.js";import"./SelectList-e6bf5ee2.js";import"./useServerFilter-43a566ce.js";import"./TextInput-a0b3ec1e.js";import"./ButtonWrapper-e9d9afef.js";import"./DefaultTable-1c49f161.js";import"./Create-8266bead.js";import"./InputError-57bfbd48.js";import"./InputLabel-64407202.js";import"./index.esm-7f00a46f.js";import"./dialog-93e7ef9b.js";import"./index-8a197248.js";import"./utils-01642ffa.js";import"./react-number-format.es-386b16ca.js";import"./index-cdec9703.js";const be=({branch:H,server_filters:W,datas:d,batch_datas:s,...B})=>{const[m,p]=o.useState(!1),[x,h]=o.useState(0),y=t=>{localStorage.setItem("tabsActive_sksw_global_index",t),h(t)};o.useEffect(()=>{const t=localStorage.getItem("tabsActive_sksw_global_index");h(parseInt(t)||0)},[]);const[b,T]=o.useState(()=>d);o.useEffect(()=>{T(d)},[d]);const v=(t=>t.reduce((r,a)=>(r.total+=a.total||0,r),{total:0}))(b),N=o.useMemo(()=>[{accessorKey:"wilayah",id:"wilayah",cell:t=>t.getValue(),header:()=>"Wilayah"},{accessorKey:"total",id:"total",cell:t=>e(w,{value:t.getValue()}),header:()=>"Total",footer:t=>e(w,{value:v.total})},{accessorKey:"last_month_payment",id:"last_month_payment",cell:t=>t.getValue(),header:()=>"Keterangan"}],[]),c=R({data:b,columns:N,getCoreRowModel:A()});return i(_,{loading:m,children:[i(n,{judul:"Tabungan 1JT Unit",children:[e(n.subTitle,{children:i("div",{className:"flex flex-col items-center gap-3 lg:flex-row lg:justify-between",children:[e(n.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),e(n.endContent,{className:"flex-wrap",children:e(S,{loading:m,setLoading:p,urlLink:route("unitsaving.index"),localState:"unitsaving_index",availableMonth:!0})})]})}),i(j,{className:"border",children:[e(F,{children:c.getHeaderGroups().map((t,r)=>e(g,{children:t.headers.map((a,u)=>e(f,{className:"text-center",children:l(a.column.columnDef.header,a.getContext())},u))},r))}),e(L,{children:c.getRowModel().rows.length?c.getRowModel().rows.map((t,r)=>e(React.Fragment,{children:e(g,{className:"text-center",children:t.getVisibleCells().map((a,u)=>e(D,{className:a.column.columnDef.className,children:a.column.columnDef.type=="action"?e("div",{className:"flex items-center justify-center-center",children:e("div",{className:"w-full",children:l(a.row.original.button_type)==2?e("button",{onClick:()=>handleOpenCreate(a.row.original.branch_id,a.row.original.unit),className:"px-2 py-1 text-white bg-green-500 rounded-lg",children:"Baru"}):l(a.row.original.button_type)==3?e(Link,{href:route("unitsaving.savingdetails",a.row.original.id),className:"px-2 py-1 text-white bg-gray-500 rounded-lg",children:"Tutup"}):l(a.row.original.button_type)==4?e("div",{className:"px-2 py-1 rounded-lg",children:"Non Aktif"}):l(a.row.original.button_type)==1?e(Link,{href:route("unitsaving.savingdetails",a.row.original.id),className:"px-2 py-1 text-white bg-indigo-500 rounded-lg",children:"Setor"}):l(a.row.original.button_type)==5?e(Link,{href:route("unitsaving.savingdetails",a.row.original.id),className:"px-2 py-1 text-white rounded-lg bg-amber-500",children:"Nihil"}):"invalid"})}):l(a.column.columnDef.cell,a.getContext())},u))},r)},r)):null}),e(M,{children:c.getFooterGroups().map((t,r)=>e(g,{children:t.headers.map(a=>e(f,{className:"text-center text-black bg-gray-100",children:l(a.column.columnDef.footer,a.getContext())},a.id))},r))})]})]}),e(n,{judul:"Wilayah",children:e("div",{className:"w-full",children:i(I,{className:"w-full",value:x,children:[e(K,{children:s.length>0?s.map((t,r)=>e(V,{onClick:()=>y(t.wilayah),value:t.wilayah,className:"ml-3 first:ml-0",children:t.wilayah})):null}),e(C,{children:s.length>0?s.map((t,r)=>e(E,{value:t.wilayah,children:e(k,{triggeredWilayah:t.wilayah,loading:m,setLoading:p})})):null})]})})})]})};export{be as default};
