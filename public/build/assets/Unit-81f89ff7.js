import{r as o,j as r,a as c,F as p}from"./app-2e3742d5.js";import{A as h,C as t}from"./AuthenticatedLayout-54b3b308.js";import u from"./TableDetailPerbulan-2408d4f5.js";import{S as f}from"./Search-cd701b22.js";import"./transition-fd3fc326.js";import"./Loading-d8fe2b36.js";import"./iconBase-e86fd508.js";import"./index.esm-966eea7f.js";import"./index.esm-3c51905a.js";import"./useFilter-a39b4d92.js";import"./dayjs.min-e9f1cbb9.js";import"./react-number-format.es-098b67ac.js";import"./PrimaryButton-9dca493b.js";import"./SelectList-7833457f.js";import"./useServerFilter-6461bdd9.js";import"./TextInput-3b331d2c.js";import"./ButtonWrapper-10af8a3c.js";const D=({branch:b,server_filters:g,batch_datas:i,...v})=>{var s;const[l,d]=o.useState(((s=i[0])==null?void 0:s.branch_id)??null),m=e=>{d(e)},[a,n]=o.useState(!1);return r(h,{loading:a,children:c(t,{judul:"SKSW Per Unit",children:[r(t.subTitle,{children:c("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[r("div",{className:"flex items-center justify-start flex-1",children:i.length>0?r(p,{children:r("ul",{className:"tab-list flex justify-start gap-3 flex-wrap w-full",children:i.map(e=>r("li",{className:`tab ${l===e.branch_id?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>m(e.branch_id),children:e.unit},e.branch_id))})}):r("div",{children:"Belum ada data yang di input di wilayah ini"})}),r(t.endContent,{className:"flex-wrap",children:r(f,{loading:a,setLoading:n,urlLink:route("sksw.unit"),localState:"sksw_unit",FilterWilayahOnly:!0,availableMonth:!0})})]})}),r("div",{className:"tab-content mt-3",children:i.map(e=>r("div",{className:l===e.branch_id?"active":"hidden",children:r(u,{data:e,loading:a,setLoading:n})},e.branch_id))})]})})};export{D as default};