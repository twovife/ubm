import{r,a as t,j as i,F as p,g as S}from"./app-62eb9655.js";import{A as N}from"./AuthenticatedLayout-9936f508.js";import P from"./TableGlobalPerbulan-d711c0f3.js";import{u as k}from"./useBulanFilter-789a239b.js";import{S as d}from"./SelectList-c044c9da.js";import{P as C}from"./PrimaryButton-c6c1178d.js";import{L as F}from"./LinkButton-07ad72cd.js";import{B as A}from"./SweetAlert-e2c5e5b7.js";import"./index.esm-e930102c.js";import"./iconBase-fa43618f.js";import"./index.esm-b4c81a09.js";import"./Loading-a76b646a.js";import"./transition-a78dee6c.js";import"./useFilteredComplains-c976715a.js";import"./dayjs.min-21f7e36d.js";import"./index.esm-4af1f187.js";import"./react-number-format.es-a1f4ae96.js";const O=({server_filters:l,batch_datas:n,...o})=>{var h;const[s,g]=r.useState(((h=n[0])==null?void 0:h.wilayah)??null),f=a=>{g(a)},[m,c]=r.useState(!1),{bulanAngka:y,tahunAngka:b}=k(),[e,v]=r.useState({transaction_month:parseInt(l.transaction_month)??null,transaction_year:parseInt(l.transaction_year)??null}),u=a=>{const{value:B,name:w}=a.target;v({...e,[w]:B})},x=a=>{a.preventDefault(),console.log(e),c(!0),S.visit(route("simpanan.globalPerBulan"),{data:{...e}})};return t(N,{loading:m,auth:o.auth,errors:o.errors,header:i(p,{children:[t("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Sukarela Karyawan"}),i("form",{onSubmit:x,className:"ml-auto flex gap-3 items-center",children:[t(d,{value:e.transaction_month,options:y,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:u}),t(d,{value:e.transaction_year,options:b,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:u}),t(C,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),t(F,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:t(A,{})})]})]}),children:t("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:n.length>0?i(p,{children:[t("ul",{className:"tab-list flex justify-start gap-3 flex-wrap",children:n.map(a=>t("li",{className:`tab ${s===a.wilayah?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>f(a.wilayah),children:a.wilayah},a.wilayah))}),t("div",{className:"tab-content mt-3",children:n.map(a=>t("div",{className:s===a.wilayah?"active":"hidden",children:t(P,{data:a,loading:m,setLoading:c})},a.wilayah))})]}):t("div",{children:"Belum ada data yang di input di wilayah ini"})})})};export{O as default};