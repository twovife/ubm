import{r as o,j as r,a as c,F as p}from"./app-35486303.js";import{A as h}from"./AuthenticatedLayout-2f8adbdf.js";import u from"./TableDetailPerbulan-f5125f25.js";import{C as t}from"./Navbar-694f7b74.js";import{S as f}from"./Search-f5b399be.js";import"./Loading-2bf0e064.js";import"./transition-2adfecdb.js";import"./DefaultTable-00d965de.js";import"./useFilter-e53f77ee.js";import"./dayjs.min-8d593140.js";import"./react-number-format.es-a9d2bbc7.js";import"./index.esm-6eda1847.js";import"./iconBase-3e359bc1.js";import"./index.esm-4e58b8d4.js";import"./index.esm-f3c4def6.js";import"./PrimaryButton-c89a07da.js";import"./SelectList-e48d4d18.js";import"./useServerFilter-e7013701.js";import"./TextInput-ba3a0fa1.js";const K=({branch:b,server_filters:g,batch_datas:e,...v})=>{var s;const[l,d]=o.useState(((s=e[0])==null?void 0:s.branch_id)??null),m=i=>{d(i)},[a,n]=o.useState(!1);return r(h,{loading:a,children:c(t,{judul:"SKSW Per Unit",children:[r(t.subTitle,{children:c("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[r("div",{className:"flex items-center justify-start flex-1",children:e.length>0?r(p,{children:r("ul",{className:"tab-list flex justify-start gap-3 flex-wrap w-full",children:e.map(i=>r("li",{className:`tab ${l===i.branch_id?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>m(i.branch_id),children:i.unit},i.branch_id))})}):r("div",{children:"Belum ada data yang di input di wilayah ini"})}),r(t.endContent,{className:"flex-wrap",children:r(f,{loading:a,setLoading:n,urlLink:route("sksw.unit"),localState:"sksw_unit",FilterWilayahOnly:!0,availableMonth:!0})})]})}),r("div",{className:"tab-content mt-3",children:e.map(i=>r("div",{className:l===i.branch_id?"active":"hidden",children:r(u,{data:i,loading:a,setLoading:n})},i.branch_id))})]})})};export{K as default};
