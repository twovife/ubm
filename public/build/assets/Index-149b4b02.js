import{r as p,a as r,j as e,F as v}from"./app-4b64987d.js";import{L as h}from"./LinkButton-f076041a.js";import{A as T}from"./AuthenticatedLayout-e3aef652.js";import{N as u}from"./react-number-format.es-40fdc7db.js";import{C as l}from"./Navbar-7ecaa830.js";import{S}from"./Search-55b3320b.js";import{u as j}from"./useFilter-7103a7d6.js";import{D as t}from"./DefaultTable-b2d18a28.js";import k from"./TabelUnit-4c65963f.js";import"./Loading-59809775.js";import"./transition-8a455e6a.js";import"./index.esm-8083a225.js";import"./iconBase-9babfb13.js";import"./index.esm-d14f182d.js";import"./PrimaryButton-b9f8d107.js";import"./SelectList-625b839b.js";import"./useServerFilter-3c1a7720.js";import"./TextInput-c1dcdedb.js";import"./ButtonWrapper-3082baef.js";const Q=({branch:C,server_filters:F,datas:f,batch_datas:i,...L})=>{var m;const[s,c]=p.useState(!1),{filter:y,removeFilter:b,returnedData:o,totals:x}=j(f,100,"unitsaving_index"),g=[{type:"default",headers:{filterable:"no",name:"Nomor",column:"no"}},{type:"default",headers:{filterable:"no",name:"Wilayah",column:"wilayah"}},{type:"default",headers:{filterable:"no",name:"Saldo Tabungan",column:"total",format:"currency"}},{type:"default",headers:{filterable:"no",name:"Setoran Terakhir",column:"last_month_payment"}}],[d,w]=p.useState(((m=i[0])==null?void 0:m.wilayah)??null),N=a=>{w(a)};return r(T,{loading:s,children:[r(l,{judul:"Tabungan 1JT Unit",children:[e(l.subTitle,{children:r("div",{className:"flex lg:flex-row flex-col lg:justify-between items-center gap-3",children:[e(l.startContent,{className:"flex-wrap mb-3 lg:mb-0",children:e(l.filterItem,{filter:y,removeFilter:b})}),e(l.endContent,{className:"flex-wrap",children:r(S,{loading:s,setLoading:c,urlLink:route("unitsaving.index"),localState:"unitsaving_index",availableMonth:!0,children:[e(h,{href:route("unitsaving.index"),title:"Simpanan 1JT",size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"}),e(h,{href:route("bonpanjer.bon_panjer"),title:"Bon Panjer",size:"sm",type:"button",className:"block whitespace-nowrap",theme:"primary"})]})})]})}),r(t,{children:[e(t.thead,{children:g.map((a,n)=>e(t.th,{type:a.type,headers:a.headers},n))}),e(t.tbody,{children:o==null?void 0:o.map((a,n)=>r(t.tr,{children:[e(t.td,{className:"text-center",children:n+1}),e(t.td,{className:"text-center",children:a.wilayah}),e(t.td,{className:"text-end",children:e(u,{value:a.total,displayType:"text",thousandSeparator:","})}),e(t.td,{className:"text-center",children:a.last_month_payment})]},n))}),e("tfoot",{children:r("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-3 py-1",colSpan:"2",children:"TOTAL"}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap text-right",children:e(u,{value:x.total,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1"})]})})]})]}),e(l,{judul:"Wilayah",children:e("div",{className:"w-full",children:i.length>0?r(v,{children:[e("ul",{className:"tab-list flex justify-start gap-3 flex-wrap",children:i.map(a=>e("li",{className:`tab ${d===a.wilayah?"active bg-main-400 ring-2 ring-main-500":""} px-3 py-1 border rounded hover:bg-main-400 hover:cursor-pointer`,onClick:()=>N(a.wilayah),children:a.wilayah},a.wilayah))}),e("div",{className:"tab-content mt-3",children:i.map(a=>e("div",{className:d===a.wilayah?"active":"hidden",children:e(k,{data:a,loading:s,setLoading:c})},a.wilayah))})]}):e("div",{children:"Belum ada data yang di input di wilayah ini"})})})]})};export{Q as default};
