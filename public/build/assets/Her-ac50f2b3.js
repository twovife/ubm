import{r as s,a as o,j as e,R as v}from"./app-02daae82.js";import{C as c}from"./Navbar-25c622c5.js";import{P as y}from"./PrimaryButton-766ea5f3.js";import{A as _}from"./AuthenticatedLayout-50b04756.js";import R from"./Create-2dab9885.js";import{u as k,T as H,a as j,b as m,c as D,f as d,d as M,e as f,h as $}from"./table-ece589a0.js";import{S as A}from"./Search-b0264cc4.js";import{a as B}from"./index.esm-b32c738a.js";import K from"./DetailHer-9be15a02.js";import{S as P,a as V}from"./scroll-area-862a5758.js";import"./iconBase-29f29ecf.js";import"./transition-de6f9320.js";import"./index.esm-21f6a8e9.js";import"./Loading-5377d93d.js";import"./dialog-902129b6.js";import"./utils-01642ffa.js";import"./InputLabel-cf4d0354.js";import"./TextInput-0be98de0.js";import"./index.esm-4764c0db.js";import"./InputError-4b2065f7.js";import"./SelectList-2b8f6e47.js";import"./useServerFilter-cf57a595.js";import"./ButtonWrapper-c5241022.js";import"./dayjs.min-ef1ffec7.js";import"./HerPayment-caf92955.js";import"./Checkbox-103ee50d.js";const ue=({datas:g,...z})=>{const[b,F]=s.useState(()=>g),[h,w]=s.useState(!1),[x,u]=s.useState(!1),C=a=>{u(!0)},N=a=>{u(!1)},[r,p]=s.useState(),T=(a,l)=>{r==a?p():p(a)},S=s.useMemo(()=>[{accessorKey:"bulan",id:"bulan",type:"collapse",cell:a=>a.getValue(),header:()=>"Bulan"},{accessorKey:"total_asset_aktif",id:"total_asset_aktif",cell:a=>a.getValue(),header:()=>"Total Asset"},{accessorKey:"total_asset_her",id:"total_asset_her",cell:a=>a.getValue(),header:()=>"Total Her"}],[]),n=k({data:b,columns:S,getCoreRowModel:$()});return o(_,{loading:h,children:[o(c,{judul:"Aset Kendaraan",children:[e(c.subTitle,{children:e("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:e(c.endContent,{className:"flex-wrap",children:e(A,{loading:h,setLoading:w,urlLink:route("asset.kendaraan.her"),localState:"asset_kendaraan_her",availableMonth:!0,children:e(y,{type:"button",onClick:C,children:"Tambah Baru"})})})})}),o(H,{className:"border text-xs lg:text-sm",children:[e(j,{children:n.getHeaderGroups().map((a,l)=>e(m,{children:a.headers.map((t,i)=>e(D,{className:`text-center lg:whitespace-nowrap whitespace-pre-line duration-300 ease-linear ${r?"bg-green-200 text-black":""}`,children:d(t.column.columnDef.header,t.getContext())},i))},l))}),e(M,{className:"text-center",children:n.getRowModel().rows.length?n.getRowModel().rows.map((a,l)=>o(v.Fragment,{children:[e(m,{className:`${a.original.is_active==2?"bg-red-100 even:bg-red-50 hover:bg-red-200":""}`,children:a.getVisibleCells().map((t,i)=>e(f,{className:`${t.column.columnDef.className} ${r==a.original.id?"bg-gray-100":""} w-1/3`,children:t.column.columnDef.type=="collapse"?o("div",{className:"flex w-full items-center justify-center gap-3",children:[e("button",{onClick:()=>T(a.original.id,a.original.datas),className:`flex justify-center items-start hover:text-roman-500 ${r==a.original.id?"rotate-90 text-roman-500":""} `,children:e(B,{})}),e("div",{children:d(t.column.columnDef.cell,t.getContext())})]}):d(t.column.columnDef.cell,t.getContext())},i))},l),r==a.original.id&&e(m,{className:"p-0 hover:bg-transparent",children:e(f,{colSpan:"3",className:"p-2 border-0",children:e("div",{className:"flex max-w-full relative overflow-auto w-full z-10 h-[50vh]",children:e("div",{className:"absolute top-0 w-full h-full z-20",children:o(P,{className:"h-full w-full",children:[e(K,{branchShow:r}),e(V,{orientation:"horizontal"})]})})})})},`newrow${l}`)]},l)):null})]})]}),e(R,{open:x,onClosed:N})]})};export{ue as default};