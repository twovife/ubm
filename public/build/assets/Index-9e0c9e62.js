import{r as o,j as a,a as s,R as H,F as O}from"./app-4f05f94d.js";import{A as W,C as d}from"./AuthenticatedLayout-4d3d24c0.js";import{F as n}from"./FormatNumbering-1549d2b9.js";import{S as E}from"./Search-fff9f1bb.js";import{u as A,T as L,a as U,b as m,c as w,f as u,d as G,e as v,g as q,h as z}from"./table-2becad6f.js";import{a as J}from"./index.esm-1b68e9a9.js";import{d as Q}from"./dayjs.min-65dd6782.js";import X from"./DetailKasbon-5a5bcd39.js";import Y from"./Create-2f23a0c0.js";import{B as Z}from"./ButtonWrapper-e9d9afef.js";import{P as ee}from"./PrimaryButton-98ce0df1.js";import ae from"./CreteNew-46c1e44a.js";import"./transition-cc305502.js";import"./Loading-f0e3f8f8.js";import"./iconBase-41b361e6.js";import"./index.esm-ee5137ef.js";import"./react-number-format.es-386b16ca.js";import"./SelectList-e6bf5ee2.js";import"./useServerFilter-43a566ce.js";import"./TextInput-a0b3ec1e.js";import"./utils-01642ffa.js";import"./dialog-93e7ef9b.js";import"./index-8a197248.js";import"./InputLabel-64407202.js";import"./index.esm-7f00a46f.js";import"./InputError-57bfbd48.js";const Pe=({datas:g,...p})=>{const T=Q(p.server_filter.bulan).format("MMM"),[h,j]=o.useState(!1),[f,S]=o.useState(()=>g);o.useEffect(()=>{S(g)},[g]);const[l,B]=o.useState(),b=e=>{B(t=>t===e?null:e)},i=(e=>e.reduce((t,r)=>(t.totalPinjaman+=r.total_pinjaman||0,t.totalPembayaran+=r.bayar_on||0,t.totalSisa+=r.sisa||0,t.totalBayar+=r.total_bayar||0,t),{totalPinjaman:0,totalPembayaran:0,totalSisa:0,totalBayar:0}))(f),_=o.useMemo(()=>[{accessorKey:"unit",id:"collapse",cell:e=>e.getValue(),header:()=>"Unit",footer:e=>a("div",{children:"Total Keseluruhan"})},{accessorKey:"total_pinjaman",id:"total_pinjaman",cell:e=>a(n,{value:e.getValue()}),header:()=>"Total Pinjaman",footer:e=>a(n,{value:i.totalPinjaman})},{accessorKey:"bayar_on",id:"bayar_on",cell:e=>a(n,{value:e.getValue()}),header:()=>`Pembayaran Bln ${T}`,footer:e=>a(n,{value:i.totalPembayaran})},{accessorKey:"total_bayar",id:"total_bayar",cell:e=>a(n,{value:e.getValue()}),header:()=>"Total Bayar",footer:e=>a(n,{value:i.totalBayar})},{accessorKey:"sisa",id:"sisa",cell:e=>a(n,{value:e.getValue()}),header:()=>"Sisa Pinjaman",footer:e=>a(n,{value:i.totalSisa})}],[]),c=A({data:f,columns:_,getCoreRowModel:z()}),[P,y]=o.useState(),[D,C]=o.useState(),[M,R]=o.useState(),[F,x]=o.useState(!1),K=(e,t,r)=>{console.log(e,t,r),x(!0),y(e),C(t),R(r)},I=e=>{x(!1),y(null),C(null)},[$,N]=o.useState(!1),V=e=>{N(!0)},k=e=>{N(!1)};return o.useEffect(()=>{b(parseInt(p.unit_show.branch))},[]),s(W,{loading:h,children:[s(d,{judul:"Kasbon Goro Umroh",children:[a(d.subTitle,{children:s("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[a(d.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),a(d.endContent,{className:"flex-wrap",children:a(E,{loading:h,setLoading:j,urlLink:route("goroumrah.goro_pinjaman"),localState:"goroumrah_goro_pinjaman",availableMonth:!0,children:a(Z,{children:a(ee,{title:"Create New",onClick:V,type:"button"})})})})]})}),a("div",{className:"overflow-auto rounded-lg shadow",children:s(L,{className:"border text-xs",children:[a(U,{children:c.getHeaderGroups().map(e=>a(m,{children:e.headers.map(t=>a(w,{className:`text-center lg:whitespace-nowrap whitespace-pre-line duration-300 ease-linear ${l?"text-transparent":""}`,children:u(t.column.columnDef.header,t.getContext())},t.id))},e.id))}),a(G,{children:c.getRowModel().rows.length?c.getRowModel().rows.map((e,t)=>s(H.Fragment,{children:[a(m,{id:e.id,className:`${l==e.original.id?"border-b-0":""}`,children:e.getVisibleCells().map(r=>a(v,{className:`${r.column.columnDef.className} w-1/5`,children:r.column.id=="collapse"?s("div",{className:"flex w-full items-center justify-center gap-3",children:[a("button",{onClick:()=>b(e.original.id),className:`flex justify-center items-start hover:text-roman-500 ${l==e.original.id?"rotate-90 text-roman-500":""} `,children:a(J,{})}),a("button",{className:`px-2 py-1 text-xs border border-gray-400 rounded hover:bg-gray-500 hover:text-white ${l==e.original.id?"bg-gray-400 text-white font-semibold":""}`,onClick:()=>K(e.original.id,e.original.unit,e.original.wilayah),children:u(r.column.columnDef.cell,r.getContext())})]}):l==e.original.id?"":u(r.column.columnDef.cell,r.getContext())},r.id))},e.id),l==e.original.id&&a(O,{children:a(m,{className:"p-0 hover:bg-transparent",children:a(v,{colSpan:"5",className:"p-0 border-0",children:a(X,{triggerId:l})})},`newrow${e.id}`)})]},e.id)):null}),l?"":a(q,{children:c.getFooterGroups().map(e=>a(m,{children:e.headers.map(t=>a(w,{className:"text-center bg-gray-100 text-black",children:u(t.column.columnDef.footer,t.getContext())},t.id))},e.id))})]})})]}),a(Y,{open:F,onClosed:I,triggeredId:P,triggeredBranch:D,triggeredWilayah:M}),a(ae,{open:$,onClosed:k})]})};export{Pe as default};
