import{r as m,a as r,j as a,F as p}from"./app-2e3742d5.js";import{A as h,C as t}from"./AuthenticatedLayout-54b3b308.js";import{S as u}from"./Search-cd701b22.js";import f from"./TableGlobalPerbulan-05429f81.js";import"./transition-fd3fc326.js";import"./Loading-d8fe2b36.js";import"./iconBase-e86fd508.js";import"./index.esm-966eea7f.js";import"./index.esm-3c51905a.js";import"./PrimaryButton-9dca493b.js";import"./SelectList-7833457f.js";import"./useServerFilter-6461bdd9.js";import"./TextInput-3b331d2c.js";import"./ButtonWrapper-10af8a3c.js";import"./useFilter-a39b4d92.js";import"./dayjs.min-e9f1cbb9.js";import"./react-number-format.es-098b67ac.js";const G=({server_filter:w,batch_datas:i,...x})=>{var o;const[s,c]=m.useState(((o=i[0])==null?void 0:o.wilayah)??null),d=e=>{c(e)},[l,n]=m.useState(!1);return r(h,{loading:l,children:[r(t,{judul:"SKSW Per Wilayah",children:[a(t.subTitle,{children:r("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[a("div",{className:"flex flex-wrap items-center justify-around flex-1",children:i.length>0?a(p,{children:a("ul",{className:"tab-list flex justify-start gap-3 flex-wrap w-full",children:i.map(e=>a("li",{className:`tab ${s===e.wilayah?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>d(e.wilayah),children:e.wilayah},e.wilayah))})}):a("div",{children:"Belum ada data yang di input di wilayah ini"})}),a(t.endContent,{className:"flex-wrap",children:a(u,{loading:l,setLoading:n,urlLink:route("sksw.wilayah"),localState:"sksw_wilayah",availableMonth:!0})})]})}),a("div",{className:"tab-content mt-3",children:i.map(e=>a("div",{className:s===e.wilayah?"active":"hidden",children:a(f,{data:e,loading:l,setLoading:n})},e.wilayah))})]}),a("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6"})]})};export{G as default};