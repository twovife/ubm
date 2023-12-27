import{r as s,a as t,j as l,F as g,g as _}from"./app-a162ad72.js";import{A as k}from"./AuthenticatedLayout-4e1a7df1.js";import{L as C}from"./LinkButton-22676bea.js";import{S as o}from"./SelectList-e0d69228.js";import{B as F}from"./SweetAlert-b25f2ae4.js";import{u as A}from"./useBulanFilter-3b3ff6a6.js";import{P}from"./PrimaryButton-1f7863c9.js";import j from"./TableDetailPerbulan-d9bcb5ee.js";import"./index.esm-d375b424.js";import"./iconBase-28f47845.js";import"./index.esm-11872e2d.js";import"./Loading-1d65d7be.js";import"./transition-4fbbf457.js";import"./useFilteredComplains-3b2c1caf.js";import"./dayjs.min-c6a6ceb2.js";import"./index.esm-4ea4aa20.js";import"./react-number-format.es-5f6fb86c.js";const Q=({branch:m,server_filters:r,batch_datas:n,...c})=>{var d;const{bulanAngka:y,tahunAngka:b}=A(),[u,f]=s.useState(((d=n[0])==null?void 0:d.branch_id)??null),v=a=>{f(a)},[h,p]=s.useState(!1),x=m.map(a=>({id:a.wilayah,value:a.wilayah,display:`wilayah ${a.wilayah}`})),[e,w]=s.useState({transaction_month:parseInt(r.transaction_month)??null,transaction_year:parseInt(r.transaction_year)??null,wilayah:parseInt(r.wilayah)??null}),i=a=>{const{value:S,name:B}=a.target;w({...e,[B]:S})},N=a=>{a.preventDefault(),p(!0),_.visit(route("sksw.skswunit"),{data:{...e}})};return t(k,{loading:h,auth:c.auth,errors:c.errors,header:l(g,{children:[t("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Sukarela Karyawan"}),l("form",{onSubmit:N,className:"ml-auto flex gap-3 items-center",children:[t(o,{value:e.transaction_month,options:y,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:i}),t(o,{value:e.transaction_year,options:b,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:i}),t(o,{value:e.wilayah,name:"wilayah",options:x,nullValue:!0,className:"text-sm",onChange:i}),t(P,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),t(C,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:t(F,{})})]})]}),children:t("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:n.length>0?l(g,{children:[t("ul",{className:"tab-list flex justify-start gap-3 flex-wrap",children:n.map(a=>t("li",{className:`tab ${u===a.branch_id?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>v(a.branch_id),children:a.unit},a.branch_id))}),t("div",{className:"tab-content mt-3",children:n.map(a=>t("div",{className:u===a.branch_id?"active":"hidden",children:t(j,{data:a,branch:m,loading:h,setLoading:p})},a.branch_id))})]}):t("div",{children:"Belum ada data yang di input di wilayah ini"})})})};export{Q as default};
