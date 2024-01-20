import{r,a as t,j as i,F as p,g as B}from"./app-8b2c8f5a.js";import{A as N}from"./AuthenticatedLayout-818e74d5.js";import C from"./TableGlobalPerbulan-0e58d5f9.js";import{u as F}from"./useBulanFilter-099c1a8d.js";import{S as d}from"./SelectList-592557ae.js";import{P as j}from"./PrimaryButton-33b1c72b.js";import{L as k}from"./LinkButton-98fabd78.js";import{B as A}from"./index.esm-e8f97965.js";import"./SweetAlert-e0eb17e7.js";import"./transition-9291623c.js";import"./index.esm-d939975b.js";import"./iconBase-65c2d3e9.js";import"./index.esm-58292b62.js";import"./Loading-e3459361.js";import"./useFilteredComplains-54c225a1.js";import"./dayjs.min-eb231bb4.js";import"./index.esm-30b91dde.js";import"./react-number-format.es-fe0672b4.js";const O=({server_filters:o,batch_datas:n,...l})=>{var h;const[s,g]=r.useState(((h=n[0])==null?void 0:h.wilayah)??null),f=a=>{g(a)},[m,c]=r.useState(!1),{bulanAngka:y,tahunAngka:b}=F(),[e,v]=r.useState({transaction_month:parseInt(o.transaction_month)??null,transaction_year:parseInt(o.transaction_year)??null}),u=a=>{const{value:w,name:S}=a.target;v({...e,[S]:w})},x=a=>{a.preventDefault(),console.log(e),c(!0),B.visit(route("simpanan.sw_global"),{data:{...e}})};return t(N,{loading:m,auth:l.auth,errors:l.errors,header:i(p,{children:[t("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Wajib Karyawan"}),i("form",{onSubmit:x,className:"ml-auto flex gap-3 items-center",children:[t(d,{value:e.transaction_month,options:y,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:u}),t(d,{value:e.transaction_year,options:b,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:u}),t(j,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),t(k,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:t(A,{})})]})]}),children:t("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:n.length>0?i(p,{children:[t("ul",{className:"tab-list flex justify-start gap-3",children:n.map(a=>t("li",{className:`tab ${s===a.wilayah?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>f(a.wilayah),children:a.wilayah},a.wilayah))}),t("div",{className:"tab-content mt-3",children:n.map(a=>t("div",{className:s===a.wilayah?"active":"hidden",children:t(C,{data:a,loading:m,setLoading:c})},a.wilayah))})]}):t("div",{children:"Belum ada data yang di input di wilayah ini"})})})};export{O as default};
