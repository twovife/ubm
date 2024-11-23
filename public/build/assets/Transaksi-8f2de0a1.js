import{r as o,j as t,a as s,R as S}from"./app-4f05f94d.js";import{A as M,C as c}from"./AuthenticatedLayout-4d3d24c0.js";import{P as O}from"./PrimaryButton-98ce0df1.js";import{u as _,T as F,a as G,b as p,c as b,f as n,d as j,e as I,g as Y,h as A}from"./table-2becad6f.js";import{d as H}from"./dayjs.min-65dd6782.js";import{F as l}from"./FormatNumbering-1549d2b9.js";import{S as L}from"./Search-fff9f1bb.js";import B from"./CreateTransaksi-cd6d2313.js";import{F as E}from"./index.esm-1b68e9a9.js";import P from"./DeleteTransaksi-365df3ab.js";import"./transition-cc305502.js";import"./Loading-f0e3f8f8.js";import"./iconBase-41b361e6.js";import"./index.esm-ee5137ef.js";import"./utils-01642ffa.js";import"./react-number-format.es-386b16ca.js";import"./SelectList-e6bf5ee2.js";import"./useServerFilter-43a566ce.js";import"./TextInput-a0b3ec1e.js";import"./ButtonWrapper-e9d9afef.js";import"./dialog-93e7ef9b.js";import"./index-8a197248.js";import"./InputLabel-64407202.js";import"./index.esm-7f00a46f.js";import"./InputError-57bfbd48.js";import"./Checkbox-939ddb16.js";const Ce=({datas:d,...U})=>{const[x,C]=o.useState(!1),[m,D]=o.useState(()=>d);o.useEffect(()=>{D(d)},[d]),console.log(m.length);const[T,h]=o.useState(!1),N=e=>{h(!0)},k=e=>{h(!1)},[y,f]=o.useState(!1),[v,w]=o.useState(""),K=e=>{f(!0),w(e)},V=e=>{f(!1)},u=(e=>e.reduce((r,a)=>(r.debitGoro+=a.debit_goro||0,r.totalDebit+=a.debit||0,r.totalKredit+=a.kredit||0,r),{debitGoro:0,totalDebit:0,totalKredit:0}))(m),R=o.useMemo(()=>[{accessorKey:"transaction",id:"transaction",type:"action",cell:e=>e.getValue(),header:()=>"Type"},{accessorKey:"transaction_date",id:"transaction_date",cell:e=>t("div",{className:"text-center",children:e.getValue()&&H(e.getValue()).format("DD-MM-YYYY")}),header:()=>"Tanggal Transaksi"},{accessorKey:"unit",id:"unit",cell:e=>t("div",{className:"text-center",children:e.getValue()}),header:()=>"Unit"},{accessorKey:"keterangan",id:"keterangan",cell:e=>t("div",{className:"text-center",children:e.getValue()}),header:()=>"Keterangan"},{accessorKey:"debit_goro",id:"debit_goro",cell:e=>t(l,{value:e.getValue()}),header:()=>"Debit Goro",footer:e=>t(l,{value:u.debitGoro})},{accessorKey:"debit",id:"debit",cell:e=>t(l,{value:e.getValue()}),header:()=>"Debit",footer:e=>t(l,{value:u.totalDebit})},{accessorKey:"kredit",id:"kredit",cell:e=>t(l,{value:e.getValue()}),header:()=>"Kredit",footer:e=>t(l,{value:u.totalKredit})},{accessorKey:"saldo",id:"saldo",cell:e=>t(l,{value:e.getValue()}),header:()=>"Saldo"}],[]),i=_({data:m,columns:R,getCoreRowModel:A()});return s(M,{children:[s(c,{judul:"Transaksi Goro",children:[t(c.subTitle,{children:s("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[t(c.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),t(c.endContent,{className:"flex-wrap",children:t(L,{loading:x,setLoading:C,urlLink:route("goroumrah.goro_transaksi"),localState:"goroumrah_goro_transaksi",availableMonth:!0,children:t(O,{onClick:N,theme:"green",title:"Create"})})})]})}),s(F,{className:"border",children:[t(G,{children:i.getHeaderGroups().map((e,r)=>t(p,{children:e.headers.map((a,g)=>t(b,{className:"text-center",children:n(a.column.columnDef.header,a.getContext())},g))},r))}),t(j,{children:i.getRowModel().rows.length?i.getRowModel().rows.map((e,r)=>t(S.Fragment,{children:t(p,{children:e.getVisibleCells().map((a,g)=>t(I,{className:a.column.columnDef.className,children:a.column.columnDef.type=="action"?s("div",{className:"flex gap-2 items-center",children:[t("div",{className:"flex-1 text-end",children:n(a.row.original.transaction)=="LAIN"?t("button",{className:"bg-red-500 text-white rounded p-2",onClick:()=>K(a.row.original.id),children:t(E,{})}):""}),t("div",{className:"flex-1 text-start",children:n(a.column.columnDef.cell,a.getContext())})]}):n(a.column.columnDef.cell,a.getContext())},g))},r)},r)):null}),t(Y,{children:i.getFooterGroups().map((e,r)=>t(p,{children:e.headers.map(a=>t(b,{className:"text-center bg-gray-100 text-black",children:n(a.column.columnDef.footer,a.getContext())},a.id))},r))})]})]}),t(B,{open:T,onClosed:k}),t(P,{open:y,onClosed:V,triggeredId:v})]})};export{Ce as default};
