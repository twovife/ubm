import{r,a as t,j as i,F as p,g as B}from"./app-577095aa.js";import{A as N}from"./AuthenticatedLayout-9a50dbde.js";import C from"./TableGlobalPerbulan-fa8b55c5.js";import{u as F}from"./useBulanFilter-932b4e08.js";import{S as d}from"./SelectList-2f891eca.js";import{P as j}from"./PrimaryButton-e87527a9.js";import{L as k}from"./LinkButton-c41e9ed7.js";import{B as A}from"./index.esm-b887299b.js";import"./Card-298928cd.js";import"./index.esm-40d2e5fe.js";import"./iconBase-0c341566.js";import"./transition-89244925.js";import"./index.esm-0a08b294.js";import"./index.esm-6cd27bff.js";import"./Loading-c8b73d4d.js";import"./DefaultTable-994263ac.js";import"./useFilter-ec167528.js";import"./dayjs.min-a735f434.js";import"./react-number-format.es-1fd40bc0.js";const Q=({server_filters:o,batch_datas:n,...l})=>{var h;const[s,g]=r.useState(((h=n[0])==null?void 0:h.wilayah)??null),f=a=>{g(a)},[m,c]=r.useState(!1),{bulanAngka:y,tahunAngka:b}=F(),[e,v]=r.useState({transaction_month:parseInt(o.transaction_month)??null,transaction_year:parseInt(o.transaction_year)??null}),u=a=>{const{value:w,name:S}=a.target;v({...e,[S]:w})},x=a=>{a.preventDefault(),console.log(e),c(!0),B.visit(route("simpanan.sw_global"),{data:{...e}})};return t(N,{loading:m,auth:l.auth,errors:l.errors,header:i(p,{children:[t("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Daftar Simpanan Wajib Karyawan"}),i("form",{onSubmit:x,className:"ml-auto flex gap-3 items-center",children:[t(d,{value:e.transaction_month,options:y,name:"transaction_month",nullValue:!0,className:"text-sm",onChange:u}),t(d,{value:e.transaction_year,options:b,name:"transaction_year",nullValue:!0,className:"text-sm",onChange:u}),t(j,{href:route("simpanan.detailPerBulan"),title:"Go",size:"sm",type:"submit",theme:"green"}),t(k,{href:route("simpanan.detailPerBulan"),title:"Reset",size:"sm",theme:"other",type:"submit",icon:t(A,{})})]})]}),children:t("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6",children:n.length>0?i(p,{children:[t("ul",{className:"tab-list flex justify-start gap-3",children:n.map(a=>t("li",{className:`tab ${s===a.wilayah?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>f(a.wilayah),children:a.wilayah},a.wilayah))}),t("div",{className:"tab-content mt-3",children:n.map(a=>t("div",{className:s===a.wilayah?"active":"hidden",children:t(C,{data:a,loading:m,setLoading:c})},a.wilayah))})]}):t("div",{children:"Belum ada data yang di input di wilayah ini"})})})};export{Q as default};
