import{r as o,j as a,a as n,R}from"./app-9ebf769c.js";import{A as _,C as i}from"./AuthenticatedLayout-24a86f0d.js";import{P as j}from"./PrimaryButton-29581f6d.js";import{S as F}from"./Search-c8f48bb6.js";import{d as H}from"./dayjs.min-312ec6ad.js";import O from"./Outcome-002ea958.js";import{u as B,T as A,a as L,b as p,c as y,f as c,d as E,e as G,g as I,h as J}from"./table-483daf3b.js";import{F as l}from"./FormatNumbering-10cce313.js";import{F as P}from"./index.esm-248cfe20.js";import{D as Y}from"./DeleteDialogContent-fedadc71.js";import"./transition-0247d4df.js";import"./Loading-d148a701.js";import"./iconBase-65420739.js";import"./index.esm-28d8e751.js";import"./SelectList-714b7fc3.js";import"./useServerFilter-fa43e14d.js";import"./TextInput-5c77428e.js";import"./ButtonWrapper-a1f738f6.js";import"./InputError-efb1c53f.js";import"./InputLabel-47189f62.js";import"./dialog-8ea8bf26.js";import"./index-b12c8b0a.js";import"./utils-01642ffa.js";import"./index.esm-7b87d996.js";import"./react-number-format.es-5b2e0b92.js";import"./Checkbox-733c121a.js";const De=({server_filter:z,datas:d,saldo_akhir:w,...U})=>{const[g,x]=o.useState(!1),[h,D]=o.useState(()=>d);o.useEffect(()=>{D(d)},[d]);const m=(e=>e.reduce((r,t)=>(r.saldo+=t.saldo||0,r.debit+=t.debit||0,r.kredit+=t.kredit||0,r.bop+=t.bop||0,r),{saldo:0,debit:0,kredit:0,bop:0}))(h),N=o.useMemo(()=>[{accessorKey:"deletable",id:"deletable",type:"action",cell:e=>e.getValue(),header:()=>"Action"},{accessorKey:"transaction_date",id:"transaction_date",cell:e=>a("div",{className:"text-center",children:H(e.getValue()).format("DD-MM-YY")}),header:()=>"Tanggal"},{accessorKey:"type_transaksi",id:"type_transaksi",cell:e=>e.getValue(),header:()=>"Keterangan"},{accessorKey:"wilayah",id:"wilayah",cell:e=>e.getValue(),header:()=>"Wilayah"},{accessorKey:"unit",id:"unit",cell:e=>e.getValue(),header:()=>"Unit"},{accessorKey:"nama_karyawan",id:"nama_karyawan",cell:e=>e.getValue(),header:()=>"Nama Karyawan"},{accessorKey:"bop",id:"bop",className:"bg-green-100",cell:e=>a(l,{value:e.getValue()}),header:()=>"TB 1JT",footer:e=>a(l,{value:m.bop})},{accessorKey:"debit",id:"debit",className:"bg-green-200",cell:e=>a(l,{value:e.getValue()}),header:()=>"Debit",footer:e=>a(l,{value:m.debit})},{accessorKey:"kredit",id:"kredit",className:"bg-red-100",cell:e=>a(l,{value:e.getValue()}),header:()=>"Kredit",footer:e=>a(l,{value:m.kredit})},{accessorKey:"saldo",id:"saldo",className:"bg-blue-100",cell:e=>a(l,{value:e.getValue()}),header:()=>"Saldo",footer:e=>a(l,{value:w})}],[]),s=B({data:h,columns:N,getCoreRowModel:J()}),[T,b]=o.useState(!1),k=e=>{b(!0)},C=e=>{b(!1)},[v,f]=o.useState(!1),[K,M]=o.useState(""),V=e=>{f(!0),M(route("unitsaving.delete_mutasi",e))},S=e=>{f(!1)};return n(_,{loading:g,children:[a(O,{open:T,onClosed:C}),n(i,{judul:"Buku Transaksi 1JT",children:[a(i.subTitle,{children:n("div",{className:"flex flex-col items-center gap-3 lg:flex-row lg:justify-between",children:[a(i.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),a(i.endContent,{className:"flex-wrap",children:a(F,{loading:g,setLoading:x,urlLink:route("unitsaving.dashboard"),localState:"1juta_transaksi",availableMonth:!0,children:a(j,{onClick:k,title:'Lain"',size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"})})})]})}),n(A,{className:"border",children:[a(L,{children:s.getHeaderGroups().map((e,r)=>a(p,{children:e.headers.map((t,u)=>a(y,{className:"text-center",children:c(t.column.columnDef.header,t.getContext())},u))},r))}),a(E,{children:s.getRowModel().rows.length?s.getRowModel().rows.map((e,r)=>a(R.Fragment,{children:a(p,{className:"text-center",children:e.getVisibleCells().map((t,u)=>a(G,{className:t.column.columnDef.className,children:t.column.columnDef.type=="action"?a("div",{className:"flex items-center justify-center",children:a("div",{children:c(t.row.original.deletable)=="true"?a("button",{className:"p-2 text-white bg-red-500 rounded",onClick:()=>V(t.row.original.id),children:a(P,{})}):""})}):c(t.column.columnDef.cell,t.getContext())},u))},r)},r)):null}),a(I,{children:s.getFooterGroups().map((e,r)=>a(p,{children:e.headers.map(t=>a(y,{className:"text-center text-black bg-gray-100",children:c(t.column.columnDef.footer,t.getContext())},t.id))},r))})]}),a(Y,{open:v,onClosed:S,url:K})]})]})};export{De as default};
