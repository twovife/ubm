import{r as o,j as r,a as c,F as p}from"./app-a2b587a6.js";import{A as h,C as t}from"./AuthenticatedLayout-c900e453.js";import u from"./TableDetailPerbulan-d329ef80.js";import{S as f}from"./Search-e543ef07.js";import"./transition-5456f04c.js";import"./Loading-803d8939.js";import"./iconBase-5265f4a5.js";import"./index.esm-092c351d.js";import"./index.esm-db9384a5.js";import"./useFilter-e78e743e.js";import"./dayjs.min-902dd2c5.js";import"./react-number-format.es-3b3c9504.js";import"./PrimaryButton-3e6865f8.js";import"./SelectList-3ef59407.js";import"./useServerFilter-83617e83.js";import"./TextInput-d297890b.js";import"./ButtonWrapper-51f0b408.js";const D=({branch:b,server_filters:g,batch_datas:i,...v})=>{var s;const[l,d]=o.useState(((s=i[0])==null?void 0:s.branch_id)??null),m=e=>{d(e)},[a,n]=o.useState(!1);return r(h,{loading:a,children:c(t,{judul:"SKSW Per Unit",children:[r(t.subTitle,{children:c("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[r("div",{className:"flex items-center justify-start flex-1",children:i.length>0?r(p,{children:r("ul",{className:"tab-list flex justify-start gap-3 flex-wrap w-full",children:i.map(e=>r("li",{className:`tab ${l===e.branch_id?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>m(e.branch_id),children:e.unit},e.branch_id))})}):r("div",{children:"Belum ada data yang di input di wilayah ini"})}),r(t.endContent,{className:"flex-wrap",children:r(f,{loading:a,setLoading:n,urlLink:route("sksw.unit"),localState:"sksw_unit",FilterWilayahOnly:!0,availableMonth:!0})})]})}),r("div",{className:"tab-content mt-3",children:i.map(e=>r("div",{className:l===e.branch_id?"active":"hidden",children:r(u,{data:e,loading:a,setLoading:n})},e.branch_id))})]})})};export{D as default};
