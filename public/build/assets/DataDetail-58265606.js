import{q as y,r as n,j as a,a as N,R as C}from"./app-02daae82.js";import{u as M,T as R,a as E,b as d,c as K,f as i,d as j,e as m,h as v}from"./table-ece589a0.js";import{d as f}from"./dayjs.min-ef1ffec7.js";import V from"./Edit-eca541e6.js";import"./utils-01642ffa.js";import"./dialog-902129b6.js";import"./InputLabel-cf4d0354.js";import"./TextInput-0be98de0.js";import"./index.esm-4764c0db.js";import"./InputError-4b2065f7.js";import"./PrimaryButton-766ea5f3.js";import"./Loading-5377d93d.js";import"./transition-de6f9320.js";import"./SelectList-2b8f6e47.js";import"./useServerFilter-cf57a595.js";const Q=({branchShow:u,typeShow:p})=>{const{datas:l}=y().props,[b,D]=n.useState([]);n.useEffect(()=>{var t,o;const s=((o=(t=l.filter(r=>r.branch_id==u))==null?void 0:t[0])==null?void 0:o.datas).filter(r=>p=="active"?r.is_active===1:r.is_active!==1);D(s)},[l,p,u]);const[w,g]=n.useState(!1),[_,h]=n.useState(),T=e=>{g(!0),h(e)},k=e=>{g(!1),h()},x=n.useMemo(()=>[{accessorKey:"asset_name",id:"asset_name",type:"button",cell:e=>e.getValue(),header:()=>"Nama Aset"},{accessorKey:"plat_nomor",id:"plat_nomor",cell:e=>e.getValue(),header:()=>"Plat Nomor"},{accessorKey:"nama_stnk",id:"nama_stnk",cell:e=>e.getValue(),header:()=>"Atas Nama"},{accessorKey:"tanggal_stnk",id:"tanggal_stnk",cell:e=>a("div",{className:"whitespace-nowrap",children:f(e.getValue()).format("DD-MM-YY")}),header:()=>"Tanggal STNK"},{accessorKey:"tanggal_pajak_tahunan",id:"tanggal_pajak_tahunan",cell:e=>a("div",{className:"whitespace-nowrap",children:f(e.getValue()).format("DD-MM-YY")}),header:()=>"Pajak Tahunan"},{accessorKey:"keterangan",id:"keterangan",cell:e=>e.getValue(),header:()=>"Keterangan"}],[l]),c=M({data:b,columns:x,getCoreRowModel:v(),debugTable:!0,debugHeaders:!0,debugColumns:!1});return N(R,{children:[a(E,{children:c.getHeaderGroups().map(e=>a(d,{children:e.headers.map(s=>a(K,{className:"text-center bg-gray-100 whitespace-nowrap",children:i(s.column.columnDef.header,s.getContext())},s.id))},e.id))}),a(j,{children:c.getRowModel().rows.length?c.getRowModel().rows.map((e,s)=>a(C.Fragment,{children:a(d,{id:e.id,children:e.getVisibleCells().map((t,o)=>t.column.columnDef.type=="button"?a(m,{className:`${t.column.columnDef.className} w-1/6`,children:a("button",{className:"px-2 py-1 rounded-md border border-roman-500 hover:bg-roman-500 hover:text-white focus:bg-roman-600 focus:text-white",onClick:()=>T(t.row.original),children:i(t.column.columnDef.cell,t.getContext())})},o):a(m,{className:`${t.column.columnDef.className} w-1/6`,children:i(t.column.columnDef.cell,t.getContext())},o))},e.id)},e.id)):a(d,{children:a(m,{colSpan:"3",children:"Tidak Ada Data Ditemukan"})})}),a(V,{open:w,onClosed:k,dataDetail:_})]})};export{Q as default};