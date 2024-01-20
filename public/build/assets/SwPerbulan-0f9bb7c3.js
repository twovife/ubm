import{r as s,a as t,j as l,F as g,g as B}from"./app-8b2c8f5a.js";import{A as C}from"./AuthenticatedLayout-818e74d5.js";import F from"./TableDetailPerbulan-083d52c6.js";import{L as P}from"./LinkButton-98fabd78.js";import{S as o}from"./SelectList-592557ae.js";import{B as j}from"./index.esm-e8f97965.js";import{u as k}from"./useBulanFilter-099c1a8d.js";import{P as A}from"./PrimaryButton-33b1c72b.js";import"./SweetAlert-e0eb17e7.js";import"./transition-9291623c.js";import"./index.esm-d939975b.js";import"./iconBase-65c2d3e9.js";import"./index.esm-58292b62.js";import"./Loading-e3459361.js";import"./useFilteredComplains-54c225a1.js";import"./dayjs.min-eb231bb4.js";import"./index.esm-30b91dde.js";import"./react-number-format.es-fe0672b4.js";const U=({branch:m,server_filters:r,batch_datas:n,...c})=>{var d;const{bulanAngka:b,tahunAngka:y}=k(),[u,f]=s.useState(((d=n[0])==null?void 0:d.branch_id)??null),v=a=>{f(a)},[h,p]=s.useState(!1),x=m.map(a=>({id:a.wilayah,value:a.wilayah,display:`wilayah ${a.wilayah}`})),[e,w]=s.useState({transaction_month:parseInt(r.transaction_month)??null,transaction_year:parseInt(r.transaction_year)??null,wilayah:parseInt(r.wilayah)??null}),i=a=>{const{value:S,name:_}=a.target;w({...e,[_]:S})},N=a=>{a.preventDefault(),console.log(e),p(!0),B.visit(route("simpanan.sw_perbulan"),{data:{...e}})};return t(C,{loading:h,auth:c.auth,errors:c.errors,header:l(g,{children:[t("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Wajib Karyawan"}),l("form",{onSubmit:N,className:"ml-auto flex gap-3 items-center",children:[t(o,{value:e.transaction_month,options:b,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:i}),t(o,{value:e.transaction_year,options:y,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:i}),t(o,{value:e.wilayah,name:"wilayah",options:x,nullValue:!0,className:"text-sm",onChange:i}),t(A,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),t(P,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:t(j,{})})]})]}),children:t("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:n.length>0?l(g,{children:[t("ul",{className:"tab-list flex justify-start gap-3",children:n.map(a=>t("li",{className:`tab ${u===a.branch_id?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>v(a.branch_id),children:a.unit},a.branch_id))}),t("div",{className:"tab-content mt-3",children:n.map(a=>t("div",{className:u===a.branch_id?"active":"hidden",children:t(F,{data:a,branch:m,loading:h,setLoading:p})},a.branch_id))})]}):t("div",{children:"Belum ada data yang di input di wilayah ini"})})})};export{U as default};
