import{r as l,j as a,a as s}from"./app-9ebf769c.js";import{A as R,C as i}from"./AuthenticatedLayout-24a86f0d.js";import{S as j}from"./Search-c8f48bb6.js";import{d as F}from"./dayjs.min-312ec6ad.js";import{u as O,T as B,a as H,b as p,c as y,f as c,d as A,e as P,g as Y,h as L}from"./table-483daf3b.js";import{F as o}from"./FormatNumbering-10cce313.js";import{F as z}from"./index.esm-248cfe20.js";import{S as E,a as G}from"./scroll-area-658f07b6.js";import{D as I}from"./DeleteDialogContent-fedadc71.js";import U from"./Outcome-f44f9c7a.js";import{P as W}from"./PrimaryButton-29581f6d.js";import"./transition-0247d4df.js";import"./Loading-d148a701.js";import"./iconBase-65420739.js";import"./index.esm-28d8e751.js";import"./SelectList-714b7fc3.js";import"./useServerFilter-fa43e14d.js";import"./TextInput-5c77428e.js";import"./ButtonWrapper-a1f738f6.js";import"./utils-01642ffa.js";import"./react-number-format.es-5b2e0b92.js";import"./index-b12c8b0a.js";import"./dialog-8ea8bf26.js";import"./index-cab5e03c.js";import"./index.esm-7b87d996.js";import"./Checkbox-733c121a.js";import"./InputError-efb1c53f.js";import"./InputLabel-47189f62.js";const ve=({branch:q,server_filters:J,datas:d,saldo_akhir:w,...Q})=>{const[h,x]=l.useState(!1),[g,N]=l.useState(()=>d);l.useEffect(()=>{N(d)},[d]);const k=e=>e.reduce((r,t)=>(r.saldo+=t.saldo||0,r.debit+=t.debit||0,r.kredit+=t.kredit||0,r.bop+=t.bop||0,r),{saldo:0,debit:0,kredit:0,bop:0}),[D,b]=l.useState(!1),C=e=>{b(!0)},v=e=>{b(!1)},[T,f]=l.useState(!1),[K,S]=l.useState(""),M=e=>{f(!0),S(route("mutation.delete_mutasi",e))},V=e=>{f(!1)},m=k(g),_=l.useMemo(()=>[{accessorKey:"deletable",id:"deletable",type:"action",cell:e=>e.getValue(),header:()=>"Action"},{accessorKey:"transaction_date",id:"transaction_date",cell:e=>a("div",{className:"text-center whitespace-nowrap",children:F(e.getValue()).format("DD-MM-YYYY")}),header:()=>"Tanggal"},{accessorKey:"type_transaksi",id:"type_transaksi",cell:e=>e.getValue(),header:()=>"Type"},{accessorKey:"keterangan",id:"keterangan",cell:e=>e.getValue(),header:()=>"Keterangan"},{accessorKey:"wilayah",id:"wilayah",cell:e=>e.getValue(),header:()=>"Wilayah"},{accessorKey:"unit",id:"unit",cell:e=>e.getValue(),header:()=>"Unit"},{accessorKey:"nama_karyawan",id:"nama_karyawan",cell:e=>e.getValue(),header:()=>"Nama Karyawan"},{accessorKey:"bop",id:"bop",className:"bg-green-100",cell:e=>a(o,{value:e.getValue()}),header:()=>"BOP",footer:e=>a(o,{value:m.bop})},{accessorKey:"debit",id:"debit",className:"bg-green-200",cell:e=>a(o,{value:e.getValue()}),header:()=>"Debit",footer:e=>a(o,{value:m.debit})},{accessorKey:"kredit",id:"kredit",className:"bg-red-100",cell:e=>a(o,{value:e.getValue()}),header:()=>"Kredit",footer:e=>a(o,{value:m.kredit})},{accessorKey:"saldo",id:"saldo",className:"bg-blue-100",cell:e=>a(o,{value:e.getValue()}),header:()=>"Saldo",footer:e=>a(o,{value:w})}],[]),n=O({data:g,columns:_,getCoreRowModel:L()});return s(R,{loading:h,children:[a(U,{open:D,onClosed:v}),s(i,{judul:"Buku Transaksi BOP",children:[a(i.subTitle,{children:s("div",{className:"flex flex-col items-center gap-3 lg:flex-row lg:justify-between",children:[a(i.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),a(i.endContent,{className:"flex-wrap",children:a(j,{loading:h,setLoading:x,urlLink:route("mutation.index"),localState:"mutation_index",availableMonth:!0,children:a(W,{onClick:C,title:'Lain"',size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"})})})]})}),s(E,{className:"h-[60vh] lg:h-[75vh] w-full",children:[s(B,{className:"border",children:[a(H,{children:n.getHeaderGroups().map((e,r)=>a(p,{children:e.headers.map((t,u)=>a(y,{className:"text-center",children:c(t.column.columnDef.header,t.getContext())},u))},r))}),a(A,{children:n.getRowModel().rows.length?n.getRowModel().rows.map((e,r)=>a(React.Fragment,{children:a(p,{className:"text-center",children:e.getVisibleCells().map((t,u)=>a(P,{className:t.column.columnDef.className,children:t.column.columnDef.type=="action"?a("div",{className:"flex items-center justify-center",children:a("div",{children:c(t.row.original.deletable)=="true"?a("button",{className:"p-2 text-white bg-red-500 rounded",onClick:()=>M(t.row.original.id),children:a(z,{})}):""})}):c(t.column.columnDef.cell,t.getContext())},u))},r)},r)):null}),a(Y,{children:n.getFooterGroups().map((e,r)=>a(p,{children:e.headers.map(t=>a(y,{className:"text-center text-black bg-gray-100",children:c(t.column.columnDef.footer,t.getContext())},t.id))},r))})]}),a(G,{orientation:"horizontal"})]})]}),a(I,{open:T,onClosed:V,url:K})]})};export{ve as default};