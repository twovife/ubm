import{r as o,j as t,a as s,R as S}from"./app-df871abb.js";import{C as c}from"./Navbar-88a283a0.js";import{P as M}from"./PrimaryButton-2e9f3eea.js";import{A as O}from"./AuthenticatedLayout-ddac043c.js";import{u as _,T as F,a as G,b as p,c as b,f as n,d as j,e as I,g as Y,h as A}from"./table-79fd49b5.js";import{d as H}from"./dayjs.min-c46c4501.js";import{F as l}from"./FormatNumbering-e591f225.js";import{S as L}from"./Search-4a1b8990.js";import B from"./CreateTransaksi-d23a8a3c.js";import{F as E}from"./index.esm-6eb99c1e.js";import P from"./DeleteTransaksi-ce724dcd.js";import"./iconBase-6f294e2e.js";import"./transition-0c33212e.js";import"./index.esm-a32ba1d8.js";import"./Loading-0b0ba1ff.js";import"./utils-01642ffa.js";import"./react-number-format.es-cf93bc84.js";import"./SelectList-d2279005.js";import"./useServerFilter-a6266122.js";import"./TextInput-6df0972b.js";import"./ButtonWrapper-424887ee.js";import"./dialog-6183c01a.js";import"./index-ca27c7cc.js";import"./InputLabel-506b9b72.js";import"./index.esm-67de2cc5.js";import"./InputError-27d9f13a.js";import"./Checkbox-51c48c3f.js";const De=({datas:d,...U})=>{const[x,C]=o.useState(!1),[m,D]=o.useState(()=>d);o.useEffect(()=>{D(d)},[d]),console.log(m.length);const[T,h]=o.useState(!1),N=e=>{h(!0)},k=e=>{h(!1)},[y,f]=o.useState(!1),[v,w]=o.useState(""),K=e=>{f(!0),w(e)},V=e=>{f(!1)},u=(e=>e.reduce((r,a)=>(r.debitGoro+=a.debit_goro||0,r.totalDebit+=a.debit||0,r.totalKredit+=a.kredit||0,r),{debitGoro:0,totalDebit:0,totalKredit:0}))(m),R=o.useMemo(()=>[{accessorKey:"transaction",id:"transaction",type:"action",cell:e=>e.getValue(),header:()=>"Type"},{accessorKey:"transaction_date",id:"transaction_date",cell:e=>t("div",{className:"text-center",children:e.getValue()&&H(e.getValue()).format("DD-MM-YYYY")}),header:()=>"Tanggal Transaksi"},{accessorKey:"unit",id:"unit",cell:e=>t("div",{className:"text-center",children:e.getValue()}),header:()=>"Unit"},{accessorKey:"keterangan",id:"keterangan",cell:e=>t("div",{className:"text-center",children:e.getValue()}),header:()=>"Keterangan"},{accessorKey:"debit_goro",id:"debit_goro",cell:e=>t(l,{value:e.getValue()}),header:()=>"Debit Goro",footer:e=>t(l,{value:u.debitGoro})},{accessorKey:"debit",id:"debit",cell:e=>t(l,{value:e.getValue()}),header:()=>"Debit",footer:e=>t(l,{value:u.totalDebit})},{accessorKey:"kredit",id:"kredit",cell:e=>t(l,{value:e.getValue()}),header:()=>"Kredit",footer:e=>t(l,{value:u.totalKredit})},{accessorKey:"saldo",id:"saldo",cell:e=>t(l,{value:e.getValue()}),header:()=>"Saldo"}],[]),i=_({data:m,columns:R,getCoreRowModel:A()});return s(O,{children:[s(c,{judul:"Transaksi Goro",children:[t(c.subTitle,{children:s("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[t(c.startContent,{className:"flex-wrap mb-3 lg:mb-0"}),t(c.endContent,{className:"flex-wrap",children:t(L,{loading:x,setLoading:C,urlLink:route("goroumrah.goro_transaksi"),localState:"goroumrah_goro_transaksi",availableMonth:!0,children:t(M,{onClick:N,theme:"green",title:"Create"})})})]})}),s(F,{className:"border",children:[t(G,{children:i.getHeaderGroups().map((e,r)=>t(p,{children:e.headers.map((a,g)=>t(b,{className:"text-center",children:n(a.column.columnDef.header,a.getContext())},g))},r))}),t(j,{children:i.getRowModel().rows.length?i.getRowModel().rows.map((e,r)=>t(S.Fragment,{children:t(p,{children:e.getVisibleCells().map((a,g)=>t(I,{className:a.column.columnDef.className,children:a.column.columnDef.type=="action"?s("div",{className:"flex gap-2 items-center",children:[t("div",{className:"flex-1 text-end",children:n(a.row.original.transaction)=="LAIN"?t("button",{className:"bg-red-500 text-white rounded p-2",onClick:()=>K(a.row.original.id),children:t(E,{})}):""}),t("div",{className:"flex-1 text-start",children:n(a.column.columnDef.cell,a.getContext())})]}):n(a.column.columnDef.cell,a.getContext())},g))},r)},r)):null}),t(Y,{children:i.getFooterGroups().map((e,r)=>t(p,{children:e.headers.map(a=>t(b,{className:"text-center bg-gray-100 text-black",children:n(a.column.columnDef.footer,a.getContext())},a.id))},r))})]})]}),t(B,{open:T,onClosed:k}),t(P,{open:y,onClosed:V,triggeredId:v})]})};export{De as default};