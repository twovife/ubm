import{r as m,a as r,j as a,F as d}from"./app-02daae82.js";import{A as h}from"./AuthenticatedLayout-50b04756.js";import{C as t}from"./Navbar-25c622c5.js";import{S as u}from"./Search-b0264cc4.js";import f from"./TableGlobalPerbulan-a38d3df8.js";import"./Loading-5377d93d.js";import"./transition-de6f9320.js";import"./iconBase-29f29ecf.js";import"./index.esm-b32c738a.js";import"./index.esm-21f6a8e9.js";import"./PrimaryButton-766ea5f3.js";import"./SelectList-2b8f6e47.js";import"./useServerFilter-cf57a595.js";import"./TextInput-0be98de0.js";import"./ButtonWrapper-c5241022.js";import"./DefaultTable-5265205f.js";import"./useFilter-e8d9489b.js";import"./dayjs.min-ef1ffec7.js";import"./react-number-format.es-44e0fe2c.js";const M=({server_filter:w,batch_datas:e,...x})=>{var n;const[o,c]=m.useState(((n=e[0])==null?void 0:n.wilayah)??null),p=i=>{c(i)},[l,s]=m.useState(!1);return r(h,{loading:l,children:[r(t,{judul:"SKSW Per Wilayah",children:[a(t.subTitle,{children:r("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[a("div",{className:"flex flex-wrap items-center justify-around flex-1",children:e.length>0?a(d,{children:a("ul",{className:"tab-list flex justify-start gap-3 flex-wrap w-full",children:e.map(i=>a("li",{className:`tab ${o===i.wilayah?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>p(i.wilayah),children:i.wilayah},i.wilayah))})}):a("div",{children:"Belum ada data yang di input di wilayah ini"})}),a(t.endContent,{className:"flex-wrap",children:a(u,{loading:l,setLoading:s,urlLink:route("sksw.wilayah"),localState:"sksw_wilayah",availableMonth:!0})})]})}),a("div",{className:"tab-content mt-3",children:e.map(i=>a("div",{className:o===i.wilayah?"active":"hidden",children:a(f,{data:i,loading:l,setLoading:s})},i.wilayah))})]}),a("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6"})]})};export{M as default};