import{r,a as o,j as e,R as D}from"./app-4f05f94d.js";import{A,C as h}from"./AuthenticatedLayout-4d3d24c0.js";import{P as R}from"./PrimaryButton-98ce0df1.js";import j from"./Create-dba54234.js";import{u as P,T as B,a as H,b as i,c as M,f as c,d as $,e as u,h as K}from"./table-2becad6f.js";import{S as V}from"./Search-fff9f1bb.js";import{a as z}from"./index.esm-1b68e9a9.js";import F from"./DataDetail-88bfc058.js";import E from"./SearchByPlat-621a4c8c.js";import{S as L,a as O}from"./scroll-area-2eb29fd1.js";import"./transition-cc305502.js";import"./Loading-f0e3f8f8.js";import"./iconBase-41b361e6.js";import"./index.esm-ee5137ef.js";import"./dialog-93e7ef9b.js";import"./index-8a197248.js";import"./utils-01642ffa.js";import"./InputLabel-64407202.js";import"./TextInput-a0b3ec1e.js";import"./index.esm-7f00a46f.js";import"./InputError-57bfbd48.js";import"./SelectList-e6bf5ee2.js";import"./useServerFilter-43a566ce.js";import"./ButtonWrapper-e9d9afef.js";import"./dayjs.min-65dd6782.js";import"./Edit-11d05ab9.js";import"./index-cdec9703.js";const be=({datas:d,datas_by_plat_nomor:f,...G})=>{const[C,N]=r.useState(()=>d);r.useEffect(()=>{N(d)},[d]);const[g,S]=r.useState(!1),[v,x]=r.useState(!1),y=a=>{x(!0)},T=a=>{x(!1)},[s,b]=r.useState(),[n,w]=r.useState(),_=(a,l)=>{s==l&&n==a?(b(),w()):(b(l),w(a))},k=r.useMemo(()=>[{accessorKey:"branch",id:"branch",cell:a=>a.getValue(),header:()=>"Unit"},{accessorKey:"total_asset_aktif",id:"total_asset_aktif",type:"collapse",dataColapse:"active",cell:a=>a.getValue(),header:()=>"Asset Aktif"},{accessorKey:"total_asset_non_aktif",id:"total_asset_non_aktif",type:"collapse",dataColapse:"non",cell:a=>a.getValue(),header:()=>"Asset Non Aktif"}],[]),m=P({data:C,columns:k,getCoreRowModel:K()});return o(A,{loading:g,children:[o(h,{judul:"Aset Kendaraan",children:[e(h.subTitle,{children:e("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:e(h.endContent,{className:"flex-wrap",children:e(V,{loading:g,setLoading:S,urlLink:route("asset.kendaraan.index"),localState:"asset_kendaraan_index",FilterWilayahOnly:!0,availablePlanText:!0,planTextName:"plat_nomor",children:e(R,{type:"button",onClick:y,children:"Tambah Baru"})})})})}),f?e(E,{datas:f}):o(B,{className:"border text-xs lg:text-sm",children:[e(H,{children:m.getHeaderGroups().map((a,l)=>e(i,{children:a.headers.map((t,p)=>e(M,{className:`text-center lg:whitespace-nowrap whitespace-pre-line duration-300 ease-linear ${s?"bg-green-200 text-black":""}`,children:c(t.column.columnDef.header,t.getContext())},p))},l))}),e($,{className:"text-center",children:m.getRowModel().rows.length?m.getRowModel().rows.map((a,l)=>o(D.Fragment,{children:[e(i,{className:`${a.original.is_active==2?"bg-red-100 even:bg-red-50 hover:bg-red-200":""}`,children:a.getVisibleCells().map((t,p)=>e(u,{className:`${t.column.columnDef.className} w-1/3`,children:t.column.columnDef.type=="collapse"?o("div",{className:"flex w-full items-center justify-center gap-3",children:[e("button",{onClick:()=>_(t.column.columnDef.dataColapse,a.original.branch_id),className:`flex justify-center items-start hover:text-roman-500 ${s==a.original.branch_id&&n==t.column.columnDef.dataColapse?"rotate-90 text-roman-500":""} `,children:e(z,{})}),e("div",{children:c(t.column.columnDef.cell,t.getContext())})]}):s==a.original.branch_id?o("div",{className:"grid lg:grid-cols-2 grid-cols-1",children:[c(t.column.columnDef.cell,t.getContext()),n=="non"?e("span",{className:"ml-1 px-2 py-1 bg-red-400 text-white rounded-full text-xs",children:"Non Active"}):e("span",{className:"ml-1 px-2 py-1 bg-green-400 text-white rounded-full text-xs",children:"Active"})]}):c(t.column.columnDef.cell,t.getContext())},p))},l),s==a.original.branch_id&&e(i,{className:"p-0 hover:bg-transparent",children:e(u,{colSpan:"3",className:"p-0 border-0",children:e("div",{className:"flex max-w-full relative overflow-auto w-full z-10 h-[50vh]",children:e("div",{className:"absolute top-0 w-full h-full z-20",children:o(L,{className:"h-full w-full",children:[e(F,{branchShow:s,typeShow:n}),e(O,{orientation:"horizontal"})]})})})})},`newrow${l}`)]},l)):e(i,{children:e(u,{colSpan:"3",children:"Data Tidak Ada"})})})]})]}),e(j,{open:v,onClosed:T})]})};export{be as default};
