import{q as P,r as s,j as e,a as N,R as v,c as b}from"./app-03fb5093.js";import{F as o}from"./FormatNumbering-2d395679.js";import{u as C,T as R,a as w,b as n,c as g,f as d,d as M,e as m,h as S,g as A}from"./index-a2cbdac7.js";import{d as H}from"./dayjs.min-3ce3b738.js";import"./react-number-format.es-8e86fb37.js";import"./utils-01642ffa.js";const q=({triggerId:c})=>{const{server_filter:f}=P().props,[h,p]=s.useState([]),[y,u]=s.useState(!0);s.useState();const[i,T]=s.useState({totalPinjaman:0,totalPembayaran:0}),x=a=>a.reduce((l,t)=>(l.totalPinjaman+=t.pinjaman||0,l.totalPembayaran+=t.bayar||0,l),{totalPinjaman:0,totalPembayaran:0}),j=s.useMemo(()=>[{accessorKey:"transaction_date",id:"transaction_date",cell:a=>e("div",{className:"text-center",children:a.getValue()&&H(a.getValue()).format("DD-MM-YYYY")}),footer:"Total",header:()=>"Tanggal Transaksi"},{accessorKey:"pinjaman",id:"pinjaman",cell:a=>e(o,{value:a.getValue()}),header:()=>"Pinjaman",footer:a=>e(o,{value:i.totalPinjaman})},{accessorKey:"bayar",id:"bayar",cell:a=>e(o,{value:a.getValue()}),header:()=>"Pembayaran",footer:a=>e(o,{value:i.totalPembayaran})},{accessorKey:"sisa",id:"sisa",cell:a=>e(o,{value:a.getValue()}),header:()=>"Sisa"}],[i]);s.useEffect(()=>{if(c===null)return;const a=new AbortController;return(async()=>{try{const t=await b.get(route("goroumrah.requestPinjamanUnit"),{params:{branch_id:c,bulan:f.bulan},signal:a.signal});p(t.data.data);const D=x(t.data.data);T(D)}catch(t){b.isCancel(t)?console.log("Request canceled:",t.message):(setError(t),u(!1))}finally{u(!1)}})(),()=>{a.abort()}},[c]);const r=C({data:h,columns:j,getCoreRowModel:A(),debugTable:!0,debugHeaders:!0,debugColumns:!1});return e("div",{className:"max-h-[40vh] overflow-auto",children:N(R,{className:"lg:text-sm text-xs",children:[e(w,{children:r.getHeaderGroups().map(a=>e(n,{className:"bg-gray-100",children:a.headers.map(l=>e(g,{className:"text-center ",children:d(l.column.columnDef.header,l.getContext())},l.id))},a.id))}),e(M,{children:y?e(n,{children:e(m,{colSpan:"4",children:"SILAHKAN TUNGGU DATA MASIH DIMUAT"})}):r.getRowModel().rows.length?r.getRowModel().rows.map((a,l)=>e(v.Fragment,{children:e(n,{id:a.id,children:a.getVisibleCells().map(t=>e(m,{className:`w-1/4 ${t.column.columnDef.className}`,children:d(t.column.columnDef.cell,t.getContext())},t.id))},a.id)},a.id)):e(n,{children:e(m,{colSpan:"4",children:"Belum Ada Data Pembayaran Goro Umrah"})})}),e(S,{children:r.getFooterGroups().map(a=>e(n,{children:a.headers.map(l=>e(g,{className:"text-center bg-gray-100 text-blue-600 py-5",children:d(l.column.columnDef.footer,l.getContext())},l.id))},a.id))})]})})};export{q as default};