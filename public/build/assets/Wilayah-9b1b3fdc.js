import{r as m,j as l,a,F as d}from"./app-577095aa.js";import{A as h}from"./AuthenticatedLayout-9a50dbde.js";import"./TextInput-f601cbff.js";import{C as t}from"./Card-298928cd.js";import{S as u}from"./Search-e7b584b2.js";import f from"./TableGlobalPerbulan-fa8b55c5.js";import"./Loading-c8b73d4d.js";import"./transition-89244925.js";import"./index.esm-40d2e5fe.js";import"./iconBase-0c341566.js";import"./index.esm-b887299b.js";import"./index.esm-0a08b294.js";import"./index.esm-6cd27bff.js";import"./PrimaryButton-e87527a9.js";import"./SelectList-2f891eca.js";import"./useServerFilter-39cea4dc.js";import"./DefaultTable-994263ac.js";import"./useFilter-ec167528.js";import"./dayjs.min-a735f434.js";import"./react-number-format.es-1fd40bc0.js";const $=({server_filter:y,batch_datas:e,...w})=>{var n;const[o,c]=m.useState(((n=e[0])==null?void 0:n.wilayah)??null),p=i=>{c(i)},[r,s]=m.useState(!1);return l(h,{loading:r,children:[l(t,{judul:"SKSW Per Wilayah",children:[a(t.subTitle,{children:l("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[a("div",{className:"flex flex-wrap items-center justify-around",children:e.length>0?a(d,{children:a("ul",{className:"tab-list flex justify-start gap-3",children:e.map(i=>a("li",{className:`tab ${o===i.wilayah?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>p(i.wilayah),children:i.wilayah},i.wilayah))})}):a("div",{children:"Belum ada data yang di input di wilayah ini"})}),a(t.endContent,{className:"flex-wrap",children:a(u,{loading:r,setLoading:s,urlLink:route("sksw.wilayah"),localState:"sksw_wilayah",availableMonth:!0})})]})}),a("div",{className:"tab-content mt-3",children:e.map(i=>a("div",{className:o===i.wilayah?"active":"hidden",children:a(f,{data:i,loading:r,setLoading:s})},i.wilayah))})]}),a("div",{className:"mx-auto sm:px-6 lg:px-8 mb-6"})]})};export{$ as default};
