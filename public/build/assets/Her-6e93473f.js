import{r as l,a as o,j as a,R as _}from"./app-03fb5093.js";import{A as D,C as c}from"./AuthenticatedLayout-3b6ef8cf.js";import{P as R}from"./PrimaryButton-842e4140.js";import k from"./Create-ae1d8cea.js";import{u as H,T as j,a as M,b as m,c as $,f as d,d as A,e as f,g as B}from"./index-a2cbdac7.js";import{S as K}from"./Search-d9e54ee9.js";import{F as P}from"./index.esm-72e650d3.js";import V from"./DetailHer-2564b181.js";import"./transition-62fd6406.js";import"./Loading-6c5c37e7.js";import"./iconBase-4881e141.js";import"./index.esm-7a477193.js";import"./dialog-4ea01c6c.js";import"./utils-01642ffa.js";import"./InputLabel-2a4bfdd0.js";import"./TextInput-9244e08a.js";import"./index.esm-e8b696db.js";import"./InputError-379f7db7.js";import"./SelectList-1a007774.js";import"./useServerFilter-32035045.js";import"./ButtonWrapper-67671d32.js";import"./dayjs.min-3ce3b738.js";import"./HerPayment-e528a379.js";import"./Checkbox-ae269782.js";const de=({datas:b,...F})=>{const[x,L]=l.useState(()=>b),[p,w]=l.useState(!1),[C,u]=l.useState(!1),T=e=>{u(!0)},N=e=>{u(!1)},[s,h]=l.useState(),[v,g]=l.useState(),y=(e,r)=>{s==e?(g(),h()):(h(e),g(r))},S=l.useMemo(()=>[{accessorKey:"bulan",id:"bulan",type:"collapse",cell:e=>e.getValue(),header:()=>"Bulan"},{accessorKey:"total_asset_aktif",id:"total_asset_aktif",cell:e=>e.getValue(),header:()=>"Total Asset"},{accessorKey:"total_asset_her",id:"total_asset_her",cell:e=>e.getValue(),header:()=>"Total Her"}],[]),n=H({data:x,columns:S,getCoreRowModel:B()});return o(D,{loading:p,children:[o(c,{judul:"Aset Kendaraan",children:[a(c.subTitle,{children:a("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:a(c.endContent,{className:"flex-wrap",children:a(K,{loading:p,setLoading:w,urlLink:route("asset.kendaraan.her"),localState:"asset_kendaraan_her",availableMonth:!0,children:a(R,{type:"button",onClick:T,children:"Tambah Baru"})})})})}),o(j,{className:"border text-xs lg:text-sm",children:[a(M,{children:n.getHeaderGroups().map((e,r)=>a(m,{children:e.headers.map((t,i)=>a($,{className:`text-center lg:whitespace-nowrap whitespace-pre-line duration-300 ease-linear ${s?"bg-green-200 text-black":""}`,children:d(t.column.columnDef.header,t.getContext())},i))},r))}),a(A,{className:"text-center",children:n.getRowModel().rows.length?n.getRowModel().rows.map((e,r)=>o(_.Fragment,{children:[a(m,{className:`${e.original.is_active==2?"bg-red-100 even:bg-red-50 hover:bg-red-200":""}`,children:e.getVisibleCells().map((t,i)=>a(f,{className:`${t.column.columnDef.className} ${s==e.original.id?"bg-gray-100":""} w-1/3`,children:t.column.columnDef.type=="collapse"?o("div",{className:"flex w-full items-center justify-center gap-3",children:[a("button",{onClick:()=>y(e.original.id,e.original.datas),className:`flex justify-center items-start hover:text-roman-500 ${s==e.original.id?"rotate-90 text-roman-500":""} `,children:a(P,{})}),a("div",{children:d(t.column.columnDef.cell,t.getContext())})]}):d(t.column.columnDef.cell,t.getContext())},i))},r),s==e.original.id&&a(m,{className:"p-0 hover:bg-transparent",children:a(f,{colSpan:"3",className:"p-2 border-0",children:a("div",{className:"flex max-w-full relative overflow-auto w-full h-[50vh]",children:a(V,{datas:v})})})},`newrow${r}`)]},r)):null})]})]}),a(k,{open:C,onClosed:N})]})};export{de as default};