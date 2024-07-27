import{r,a as o,j as e,R as D}from"./app-66cb5542.js";import{C as h}from"./Navbar-2791f138.js";import{P as A}from"./PrimaryButton-e6e3700f.js";import{A as R}from"./AuthenticatedLayout-6fbd30c5.js";import j from"./Create-9f39a3f2.js";import{u as P,T as B,a as H,b as i,c as M,f as c,d as $,e as u,g as F}from"./index-7d2e7be8.js";import{S as K}from"./Search-c380601e.js";import{F as V}from"./index.esm-07fbca0e.js";import z from"./DataDetail-7a613bad.js";import E from"./SearchByPlat-f5c9e61a.js";import{S as L,a as O}from"./scroll-area-246410ae.js";import"./iconBase-b3a06d45.js";import"./transition-00bda6a6.js";import"./index.esm-c8fdb6fb.js";import"./Loading-b802964d.js";import"./dialog-846a8d61.js";import"./utils-01642ffa.js";import"./InputLabel-d70115a7.js";import"./TextInput-7da1376d.js";import"./index.esm-ca1f291a.js";import"./InputError-4989f8c3.js";import"./SelectList-3762b1c5.js";import"./useServerFilter-a7686f7a.js";import"./ButtonWrapper-10776ab8.js";import"./dayjs.min-9c519b5c.js";import"./Edit-1a55b9ea.js";const xe=({datas:d,datas_by_plat_nomor:f,...G})=>{const[C,N]=r.useState(()=>d);r.useEffect(()=>{N(d)},[d]);const[g,S]=r.useState(!1),[v,x]=r.useState(!1),y=a=>{x(!0)},T=a=>{x(!1)},[s,b]=r.useState(),[n,w]=r.useState(),_=(a,l)=>{s==l&&n==a?(b(),w()):(b(l),w(a))},k=r.useMemo(()=>[{accessorKey:"branch",id:"branch",cell:a=>a.getValue(),header:()=>"Unit"},{accessorKey:"total_asset_aktif",id:"total_asset_aktif",type:"collapse",dataColapse:"active",cell:a=>a.getValue(),header:()=>"Asset Aktif"},{accessorKey:"total_asset_non_aktif",id:"total_asset_non_aktif",type:"collapse",dataColapse:"non",cell:a=>a.getValue(),header:()=>"Asset Non Aktif"}],[]),m=P({data:C,columns:k,getCoreRowModel:F()});return o(R,{loading:g,children:[o(h,{judul:"Aset Kendaraan",children:[e(h.subTitle,{children:e("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:e(h.endContent,{className:"flex-wrap",children:e(K,{loading:g,setLoading:S,urlLink:route("asset.kendaraan.index"),localState:"asset_kendaraan_index",FilterWilayahOnly:!0,availablePlanText:!0,planTextName:"plat_nomor",children:e(A,{type:"button",onClick:y,children:"Tambah Baru"})})})})}),f?e(E,{datas:f}):o(B,{className:"border text-xs lg:text-sm",children:[e(H,{children:m.getHeaderGroups().map((a,l)=>e(i,{children:a.headers.map((t,p)=>e(M,{className:`text-center lg:whitespace-nowrap whitespace-pre-line duration-300 ease-linear ${s?"bg-green-200 text-black":""}`,children:c(t.column.columnDef.header,t.getContext())},p))},l))}),e($,{className:"text-center",children:m.getRowModel().rows.length?m.getRowModel().rows.map((a,l)=>o(D.Fragment,{children:[e(i,{className:`${a.original.is_active==2?"bg-red-100 even:bg-red-50 hover:bg-red-200":""}`,children:a.getVisibleCells().map((t,p)=>e(u,{className:`${t.column.columnDef.className} w-1/3`,children:t.column.columnDef.type=="collapse"?o("div",{className:"flex w-full items-center justify-center gap-3",children:[e("button",{onClick:()=>_(t.column.columnDef.dataColapse,a.original.branch_id),className:`flex justify-center items-start hover:text-roman-500 ${s==a.original.branch_id&&n==t.column.columnDef.dataColapse?"rotate-90 text-roman-500":""} `,children:e(V,{})}),e("div",{children:c(t.column.columnDef.cell,t.getContext())})]}):s==a.original.branch_id?o("div",{className:"grid lg:grid-cols-2 grid-cols-1",children:[c(t.column.columnDef.cell,t.getContext()),n=="non"?e("span",{className:"ml-1 px-2 py-1 bg-red-400 text-white rounded-full text-xs",children:"Non Active"}):e("span",{className:"ml-1 px-2 py-1 bg-green-400 text-white rounded-full text-xs",children:"Active"})]}):c(t.column.columnDef.cell,t.getContext())},p))},l),s==a.original.branch_id&&e(i,{className:"p-0 hover:bg-transparent",children:e(u,{colSpan:"3",className:"p-0 border-0",children:e("div",{className:"flex max-w-full relative overflow-auto w-full z-10 h-[50vh]",children:e("div",{className:"absolute top-0 w-full h-full z-20",children:o(L,{className:"h-full w-full",children:[e(z,{branchShow:s,typeShow:n}),e(O,{orientation:"horizontal"})]})})})})},`newrow${l}`)]},l)):e(i,{children:e(u,{colSpan:"3",children:"Data Tidak Ada"})})})]})]}),e(j,{open:v,onClosed:T})]})};export{xe as default};
