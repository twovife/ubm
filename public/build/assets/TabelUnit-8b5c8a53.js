import{q as _,r as n,j as a,a as B,R as D,b as l}from"./app-9ebf769c.js";import{u as F,T as K,a as M,b as c,c as h,f as o,d as S,e as V,g as j,h as O}from"./table-483daf3b.js";import{F as b}from"./FormatNumbering-10cce313.js";import k from"./Create-b17e5be2.js";import"./utils-01642ffa.js";import"./react-number-format.es-5b2e0b92.js";import"./InputError-efb1c53f.js";import"./InputLabel-47189f62.js";import"./PrimaryButton-29581f6d.js";import"./TextInput-5c77428e.js";import"./index.esm-7b87d996.js";import"./dialog-8ea8bf26.js";import"./index-b12c8b0a.js";import"./Loading-d148a701.js";import"./transition-0247d4df.js";const te=({triggeredWilayah:d,loading:H,setLoading:I})=>{const{batch_datas:u}=_().props,[g,f]=n.useState([]),[w,m]=n.useState(!1),[x,y]=n.useState(""),[N,p]=n.useState(""),T=(t,r)=>{m(!0),y(t),p(r)},C=t=>{m(!1),p("")};n.useEffect(()=>{var r,e;const t=(e=(r=u.filter(i=>i.wilayah==d))==null?void 0:r[0])==null?void 0:e.data;f(t)},[d,u]);const v=(t=>t.reduce((r,e)=>(r.total+=e.total||0,r),{total:0}))(g),R=n.useMemo(()=>[{accessorKey:"button_type",id:"button_type",type:"action",cell:t=>t.getValue(),header:()=>"Action"},{accessorKey:"unit",id:"unit",cell:t=>t.getValue(),header:()=>"Unit"},{accessorKey:"total",id:"total",cell:t=>a(b,{value:t.getValue()}),header:()=>"Total",footer:t=>a(b,{value:v.totalNominal})},{accessorKey:"tanggungan",id:"tanggungan",cell:t=>t.getValue(),header:()=>"Keterangan"}],[]),s=F({data:g,columns:R,getCoreRowModel:O()});return B(K,{className:"border",children:[a(k,{branch:N,branchId:x,open:w,onClosed:C}),a(M,{children:s.getHeaderGroups().map((t,r)=>a(c,{children:t.headers.map((e,i)=>a(h,{className:"text-center",children:o(e.column.columnDef.header,e.getContext())},i))},r))}),a(S,{children:s.getRowModel().rows.length?s.getRowModel().rows.map((t,r)=>a(D.Fragment,{children:a(c,{className:"text-center",children:t.getVisibleCells().map((e,i)=>a(V,{className:e.column.columnDef.className,children:e.column.columnDef.type=="action"?a("div",{className:"flex items-center justify-center-center",children:a("div",{className:"w-full",children:o(e.row.original.button_type)==2?a("button",{onClick:()=>T(e.row.original.branch_id,e.row.original.unit),className:"px-2 py-1 text-white bg-green-500 rounded-lg",children:"Baru"}):o(e.row.original.button_type)==3?a(l,{href:route("unitsaving.savingdetails",e.row.original.id),className:"px-2 py-1 text-white bg-gray-500 rounded-lg",children:"Tutup"}):o(e.row.original.button_type)==4?a("div",{className:"px-2 py-1 rounded-lg",children:"Non Aktif"}):o(e.row.original.button_type)==1?a(l,{href:route("unitsaving.savingdetails",e.row.original.id),className:"px-2 py-1 text-white bg-indigo-500 rounded-lg",children:"Setor"}):o(e.row.original.button_type)==5?a(l,{href:route("unitsaving.savingdetails",e.row.original.id),className:"px-2 py-1 text-white rounded-lg bg-amber-500",children:"Nihil"}):"invalid"})}):o(e.column.columnDef.cell,e.getContext())},i))},r)},r)):null}),a(j,{children:s.getFooterGroups().map((t,r)=>a(c,{children:t.headers.map(e=>a(h,{className:"text-center text-black bg-gray-100",children:o(e.column.columnDef.footer,e.getContext())},e.id))},r))})]})};export{te as default};