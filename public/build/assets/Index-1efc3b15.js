import{r as o,j as t,a as n,R as O,F as A}from"./app-15a65f49.js";import{C as d}from"./Navbar-8307b345.js";import{F as m}from"./FormatNumbering-3ea45516.js";import{S as k}from"./Search-dfc252c4.js";import{A as K}from"./AuthenticatedLayout-5446e34f.js";import{u as V,T as E,a as H,b as u,c as y,f as g,d as P,e as N,h as W,g as L}from"./index-7a4838b1.js";import{F as U}from"./index.esm-8815781d.js";import{d as G}from"./dayjs.min-e74ede01.js";import q from"./Create-701f3546.js";import z from"./DetailDo-0f4b81ad.js";import"./iconBase-e73ac9d8.js";import"./transition-72712b5f.js";import"./index.esm-382287a8.js";import"./react-number-format.es-a72007be.js";import"./PrimaryButton-27d9f578.js";import"./SelectList-cb58a67c.js";import"./useServerFilter-b2d73a13.js";import"./TextInput-7351ce8b.js";import"./ButtonWrapper-331eb1e4.js";import"./Loading-b2f2b3c5.js";import"./utils-01642ffa.js";import"./dialog-ea3cb2cf.js";import"./InputLabel-a7e268ec.js";import"./index.esm-c19d9da0.js";import"./InputError-af6aa722.js";const Te=({datas:T,unit_show:s,...v})=>{const S=G(v.server_filter.bulan).format("MMM"),[p,w]=o.useState(!1),[i,J]=o.useState(()=>T),[l,D]=o.useState(),f=e=>{D(a=>a===e?null:e)},h=(e=>e.reduce((a,r)=>(a.totalBefore+=r.sum_nominal_before||0,a.totalOn+=r.sum_nominal_on||0,a.totalAfter+=r.total_pembayaran||0,a),{totalBefore:0,totalOn:0,totalAfter:0}))(i),_=o.useMemo(()=>[{accessorKey:"unit",id:"collapse",cell:e=>e.getValue(),header:()=>"Unit",footer:e=>t("div",{children:"Total Keseluruhan"})},{accessorKey:"sum_nominal_on",id:"sum_nominal_on",cell:e=>t(m,{value:e.getValue()}),header:()=>`Pembayaran Bln ${S}`,footer:e=>t(m,{value:h.totalOn})},{accessorKey:"total_pembayaran",id:"total_pembayaran",cell:e=>t(m,{value:e.getValue()}),header:()=>"Total Stor DO",footer:e=>t(m,{value:h.totalAfter})}],[]),c=V({data:i,columns:_,getCoreRowModel:L()}),[B,b]=o.useState(),[F,x]=o.useState(),[M,R]=o.useState(),[j,C]=o.useState(!1),I=(e,a,r)=>{C(!0),b(e),x(a),R(r)},$=e=>{C(!1),b(null),x(null)};return o.useEffect(()=>{f(parseInt(s==null?void 0:s.branch))},[s]),o.useEffect(()=>{console.log(i)},[i]),n(K,{loading:p,children:[n(d,{judul:"Goro Umrah",children:[t(d.subTitle,{children:n("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[t(d.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),t(d.endContent,{className:"flex-wrap",children:t(k,{loading:p,setLoading:w,urlLink:route("goroumrah.goro_do"),localState:"goroumrah_goro_do",availableMonth:!0})})]})}),t("div",{className:"overflow-auto rounded-lg shadow",children:n(E,{className:"border text-xs",children:[t(H,{children:c.getHeaderGroups().map(e=>t(u,{children:e.headers.map(a=>t(y,{className:`text-center lg:whitespace-nowrap whitespace-pre-line duration-300 ease-linear ${l?"text-transparent":""}`,children:g(a.column.columnDef.header,a.getContext())},a.id))},e.id))}),t(P,{children:c.getRowModel().rows.length?c.getRowModel().rows.map((e,a)=>n(O.Fragment,{children:[t(u,{id:e.id,className:`${l==e.original.id?"border-b-0":""}`,children:e.getVisibleCells().map(r=>t(N,{className:`${r.column.columnDef.className} w-1/4`,children:r.column.id=="collapse"?n("div",{className:"flex w-full items-center justify-center gap-3",children:[t("button",{onClick:()=>f(e.original.id),className:`flex justify-center items-start hover:text-roman-500 ${l==e.original.id?"rotate-90 text-roman-500":""} `,children:t(U,{})}),t("button",{className:`px-2 py-1 text-xs border border-gray-400 rounded hover:bg-gray-500 hover:text-white ${l==e.original.id?"bg-gray-400 text-white font-semibold":""}`,onClick:()=>I(e.original.id,e.original.unit,e.original.wilayah),children:g(r.column.columnDef.cell,r.getContext())})]}):l==e.original.id?"":g(r.column.columnDef.cell,r.getContext())},r.id))},e.id),l==e.original.id&&t(A,{children:t(u,{className:"p-0 hover:bg-transparent",children:t(N,{colSpan:"4",className:"p-0 border-0",children:t(z,{triggerId:l})})},`newrow${e.id}`)})]},e.id)):null}),l?"":t(W,{children:c.getFooterGroups().map(e=>t(u,{children:e.headers.map(a=>t(y,{className:"text-center bg-gray-100 text-black",children:g(a.column.columnDef.footer,a.getContext())},a.id))},e.id))})]})})]}),t(q,{open:j,onClosed:$,triggeredId:B,triggeredBranch:F,triggeredWilayah:M})]})};export{Te as default};
