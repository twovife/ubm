import{r as o,j as t,a as n,R as O,F as A}from"./app-cc2d0faa.js";import{A as k,C as d}from"./AuthenticatedLayout-12fa7b7b.js";import{F as m,u as K,T as V,a as E,b as u,c as y,f as g,d as H,e as N,g as P,h as W}from"./index-0db9e81d.js";import{S as L}from"./Search-49dc9fb5.js";import{F as U}from"./index.esm-96da7d57.js";import{d as G}from"./dayjs.min-3243e25c.js";import q from"./Create-8999f30d.js";import z from"./DetailDo-140eddae.js";import"./transition-94c7ea81.js";import"./Loading-7a3b1e6a.js";import"./iconBase-5713534a.js";import"./index.esm-db5342d1.js";import"./react-number-format.es-21f1230d.js";import"./utils-01642ffa.js";import"./PrimaryButton-9f9cb87e.js";import"./SelectList-4b0a20ad.js";import"./useServerFilter-7b53e2d8.js";import"./TextInput-05a72ba0.js";import"./ButtonWrapper-40d30570.js";import"./dialog-d66e7d79.js";import"./InputLabel-d5eaf328.js";import"./index.esm-42375017.js";import"./InputError-1e381684.js";const ye=({datas:T,unit_show:s,...v})=>{const S=G(v.server_filter.bulan).format("MMM"),[p,w]=o.useState(!1),[i,J]=o.useState(()=>T),[l,D]=o.useState(),f=e=>{D(a=>a===e?null:e)},h=(e=>e.reduce((a,r)=>(a.totalBefore+=r.sum_nominal_before||0,a.totalOn+=r.sum_nominal_on||0,a.totalAfter+=r.total_pembayaran||0,a),{totalBefore:0,totalOn:0,totalAfter:0}))(i),_=o.useMemo(()=>[{accessorKey:"unit",id:"collapse",cell:e=>e.getValue(),header:()=>"Unit",footer:e=>t("div",{children:"Total Keseluruhan"})},{accessorKey:"sum_nominal_on",id:"sum_nominal_on",cell:e=>t(m,{value:e.getValue()}),header:()=>`Pembayaran Bln ${S}`,footer:e=>t(m,{value:h.totalOn})},{accessorKey:"total_pembayaran",id:"total_pembayaran",cell:e=>t(m,{value:e.getValue()}),header:()=>"Total Stor DO",footer:e=>t(m,{value:h.totalAfter})}],[]),c=K({data:i,columns:_,getCoreRowModel:W()}),[B,b]=o.useState(),[F,x]=o.useState(),[M,R]=o.useState(),[j,C]=o.useState(!1),I=(e,a,r)=>{C(!0),b(e),x(a),R(r)},$=e=>{C(!1),b(null),x(null)};return o.useEffect(()=>{f(parseInt(s==null?void 0:s.branch))},[s]),o.useEffect(()=>{console.log(i)},[i]),n(k,{loading:p,children:[n(d,{judul:"Goro Umrah",children:[t(d.subTitle,{children:n("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[t(d.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),t(d.endContent,{className:"flex-wrap",children:t(L,{loading:p,setLoading:w,urlLink:route("goroumrah.goro_do"),localState:"goroumrah_goro_do",availableMonth:!0})})]})}),t("div",{className:"overflow-auto rounded-lg shadow",children:n(V,{className:"border text-xs",children:[t(E,{children:c.getHeaderGroups().map(e=>t(u,{children:e.headers.map(a=>t(y,{className:`text-center lg:whitespace-nowrap whitespace-pre-line duration-300 ease-linear ${l?"text-transparent":""}`,children:g(a.column.columnDef.header,a.getContext())},a.id))},e.id))}),t(H,{children:c.getRowModel().rows.length?c.getRowModel().rows.map((e,a)=>n(O.Fragment,{children:[t(u,{id:e.id,className:`${l==e.original.id?"border-b-0":""}`,children:e.getVisibleCells().map(r=>t(N,{className:`${r.column.columnDef.className} w-1/4`,children:r.column.id=="collapse"?n("div",{className:"flex w-full items-center justify-center gap-3",children:[t("button",{onClick:()=>f(e.original.id),className:`flex justify-center items-start hover:text-roman-500 ${l==e.original.id?"rotate-90 text-roman-500":""} `,children:t(U,{})}),t("button",{className:`px-2 py-1 text-xs border border-gray-400 rounded hover:bg-gray-500 hover:text-white ${l==e.original.id?"bg-gray-400 text-white font-semibold":""}`,onClick:()=>I(e.original.id,e.original.unit,e.original.wilayah),children:g(r.column.columnDef.cell,r.getContext())})]}):l==e.original.id?"":g(r.column.columnDef.cell,r.getContext())},r.id))},e.id),l==e.original.id&&t(A,{children:t(u,{className:"p-0 hover:bg-transparent",children:t(N,{colSpan:"4",className:"p-0 border-0",children:t(z,{triggerId:l})})},`newrow${e.id}`)})]},e.id)):null}),l?"":t(P,{children:c.getFooterGroups().map(e=>t(u,{children:e.headers.map(a=>t(y,{className:"text-center bg-gray-100 text-black",children:g(a.column.columnDef.footer,a.getContext())},a.id))},e.id))})]})})]}),t(q,{open:j,onClosed:$,triggeredId:B,triggeredBranch:F,triggeredWilayah:M})]})};export{ye as default};
