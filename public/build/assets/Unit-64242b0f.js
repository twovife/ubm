import{r as n,j as i,a as m,F as d}from"./app-9ebf769c.js";import{A as f,C as g}from"./AuthenticatedLayout-24a86f0d.js";import h from"./TableDetailPerbulan-44161170.js";import{S as v}from"./Search-c8f48bb6.js";import{T as x,a as w,b as S,c as T}from"./tabs-5fd494a8.js";import"./transition-0247d4df.js";import"./Loading-d148a701.js";import"./iconBase-65420739.js";import"./index.esm-248cfe20.js";import"./index.esm-28d8e751.js";import"./useFilter-eb84ef94.js";import"./dayjs.min-312ec6ad.js";import"./react-number-format.es-5b2e0b92.js";import"./PrimaryButton-29581f6d.js";import"./SelectList-714b7fc3.js";import"./useServerFilter-fa43e14d.js";import"./TextInput-5c77428e.js";import"./ButtonWrapper-a1f738f6.js";import"./index-b12c8b0a.js";import"./index-cab5e03c.js";import"./utils-01642ffa.js";const J=({branch:b,server_filters:j,batch_datas:r,...k})=>{const[l,o]=n.useState(!1),[p,a]=n.useState(null),c=e=>{localStorage.setItem("tabsActive_sksw_perunit_index",e),a(e)};return n.useEffect(()=>{const e=localStorage.getItem("tabsActive_sksw_perunit_index"),s=r==null?void 0:r.some(t=>t.branch_id==e),u=Math.min(...r==null?void 0:r.map(t=>t.branch_id));a(s?parseInt(e):u)},[]),i(f,{loading:l,children:i(g,{judul:"SKSW Per Unit",children:i("div",{className:"w-full",children:m(x,{className:"w-full",value:p,children:[m("div",{className:"flex flex-col justify-between lg:flex-row",children:[i(w,{className:"flex flex-wrap justify-start w-full gap-3 bg-transparent",children:r.length>0?r.map((e,s)=>i(S,{onClick:()=>c(e.branch_id),value:e.branch_id,className:"border",children:e.unit})):null}),i("div",{className:"w-full ",children:i(v,{loading:l,setLoading:o,urlLink:route("sksw.unit"),localState:"sksw_unit",FilterWilayahOnly:!0,availableMonth:!0})})]}),i(d,{children:r.length>0?r.map((e,s)=>i(T,{value:e.branch_id,children:i(h,{data:e,loading:l,setLoading:o})})):null})]})})})})};export{J as default};