import{W as T,r as l,j as a,a as x,R as y,b as i}from"./app-0b5f1112.js";import{F as m,u as D,T as N,a as R,b as r,c as C,f as u,d as M,e as c,h as A}from"./index-8708f93e.js";import{d as w}from"./dayjs.min-068b8e04.js";import"./react-number-format.es-04b13629.js";import"./utils-01642ffa.js";const G=({triggerId:o})=>{const{server_filter:b}=T().props,[g,h]=l.useState([]),[f,d]=l.useState(!0);l.useState();const p=l.useMemo(()=>[{accessorKey:"transaction_date",id:"transaction_date",cell:e=>a("div",{className:"text-center",children:e.getValue()&&w(e.getValue()).format("DD-MM-YYYY")}),header:()=>"Tanggal Transaksi"},{accessorKey:"nominal",id:"nominal",cell:e=>a(m,{value:e.getValue()}),header:()=>"Nominal Bayar"},{accessorKey:"total_pembayaran",id:"total_pembayaran",cell:e=>a(m,{value:e.getValue()}),header:()=>"Total Goro"}],[]);l.useEffect(()=>{if(o===null)return;const e=new AbortController;return(async()=>{try{const t=await i.get(route("goroumrah.requestUnitTransaction"),{params:{branch_id:o,bulan:b.bulan},signal:e.signal});h(t.data.data)}catch(t){i.isCancel(t)?console.log("Request canceled:",t.message):(setError(t),d(!1))}finally{d(!1)}})(),()=>{e.abort()}},[o]);const n=D({data:g,columns:p,getCoreRowModel:A(),debugTable:!0,debugHeaders:!0,debugColumns:!1});return a("div",{className:"p-3",children:x(N,{className:"border shadow lg:text-sm text-xs ",children:[a(R,{children:n.getHeaderGroups().map(e=>a(r,{children:e.headers.map(s=>a(C,{className:"text-center",children:u(s.column.columnDef.header,s.getContext())},s.id))},e.id))}),a(M,{children:f?a(r,{children:a(c,{colSpan:"3",children:"SILAHKAN TUNGGU DATA MASIH DIMUAT"})}):n.getRowModel().rows.length?n.getRowModel().rows.map((e,s)=>a(y.Fragment,{children:a(r,{id:e.id,children:e.getVisibleCells().map(t=>a(c,{className:t.column.columnDef.className,children:u(t.column.columnDef.cell,t.getContext())},t.id))},e.id)},e.id)):a(r,{children:a(c,{colSpan:"3",children:"Belum Ada Data Pembayaran Goro Umrah"})})})]})})};export{G as default};
