import{r as o,j as a,a as x,R as _}from"./app-03fb5093.js";import{u as D,T as j,a as N,b as i,c as T,f as r,d as k,e as c,g as C}from"./index-a2cbdac7.js";import{d as R}from"./dayjs.min-3ce3b738.js";import"./dialog-4ea01c6c.js";import"./TextInput-9244e08a.js";import"./index.esm-e8b696db.js";import"./Loading-6c5c37e7.js";import H from"./HerPayment-e528a379.js";import"./utils-01642ffa.js";import"./transition-62fd6406.js";import"./PrimaryButton-842e4140.js";import"./Checkbox-ae269782.js";const z=({datas:s})=>{const[g,h]=o.useState(()=>s),[p,d]=o.useState(!1),[b,m]=o.useState(),f=e=>{console.log(e),d(!0),m(e)},w=e=>{d(!1),m()};o.useEffect(()=>{h(s)},[s]);const y=o.useMemo(()=>[{accessorKey:"wilayah",id:"wilayah",cell:e=>e.getValue(),header:()=>"Wilayah"},{accessorKey:"branch",id:"branch",cell:e=>e.getValue(),header:()=>"Unit"},{accessorKey:"asset_name",id:"asset_name",type:"button",cell:e=>e.getValue(),header:()=>"Nama Aset"},{accessorKey:"plat_nomor",id:"plat_nomor",cell:e=>e.getValue(),header:()=>"Plat Nomor"},{accessorKey:"tanggal_pajak_tahunan",id:"tanggal_pajak_tahunan",cell:e=>a("div",{className:"whitespace-nowrap",children:R(e.getValue()).format("DD-MM-YYYY")}),header:()=>"Tanggal Pajak"},{accessorKey:"jenis_pajak",id:"jenis_pajak",cell:e=>e.getValue(),header:()=>"Jenis Pajak"},{accessorKey:"nama_stnk",id:"nama_stnk",cell:e=>e.getValue(),header:()=>"Atas Nama"},{accessorKey:"is_finish",id:"is_finish",cell:e=>a("div",{children:e.getValue()==1?"Sudah Di HER":"Belum"}),header:()=>"Keterangan"}],[s]),n=D({data:g,columns:y,getCoreRowModel:C(),debugTable:!0,debugHeaders:!0,debugColumns:!1});return x(j,{className:"absolute top-0 left-0 w-full h-full lg:text-sm text-xs z-0 border rounded-lg overflow-hidden",children:[a(N,{children:n.getHeaderGroups().map(e=>a(i,{children:e.headers.map(l=>a(T,{className:"text-center bg-gray-50 whitespace-nowrap",children:r(l.column.columnDef.header,l.getContext())},l.id))},e.id))}),a(k,{children:n.getRowModel().rows.length?n.getRowModel().rows.map((e,l)=>a(_.Fragment,{children:a(i,{className:`${e.original.is_finish==1?"bg-green-200 hover:bg-green-100 border border-white":""} `,id:e.id,children:e.getVisibleCells().map((t,u)=>t.column.columnDef.type=="button"?a(c,{className:`${t.column.columnDef.className} w-1/6`,children:e.original.is_finish==1?a("div",{children:r(t.column.columnDef.cell,t.getContext())}):a("button",{className:"px-2 py-1 rounded-md border border-roman-500 hover:bg-roman-500 hover:text-white focus:bg-roman-600 focus:text-white",onClick:()=>f(t.row.original.id),children:r(t.column.columnDef.cell,t.getContext())})},u):a(c,{className:`${t.column.columnDef.className} w-1/8`,children:r(t.column.columnDef.cell,t.getContext())},u))},e.id)},e.id)):a(i,{children:a(c,{colSpan:"3",children:"Tidak Ada Data Ditemukan"})})}),a(H,{open:p,onClosed:w,triggeredId:b})]})};export{z as default};