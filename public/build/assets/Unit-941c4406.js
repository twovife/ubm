import{r as s,j as i,a as m,F as f}from"./app-df871abb.js";import{A as d}from"./AuthenticatedLayout-ddac043c.js";import g from"./TableDetailPerbulan-3af4fbc4.js";import{C as h}from"./Navbar-88a283a0.js";import{S as v}from"./Search-4a1b8990.js";import{T as x,a as w,b as S,c as T}from"./tabs-68c27bcb.js";import"./Loading-0b0ba1ff.js";import"./transition-0c33212e.js";import"./DefaultTable-0fb01719.js";import"./useFilter-f1dac9b7.js";import"./dayjs.min-c46c4501.js";import"./react-number-format.es-cf93bc84.js";import"./iconBase-6f294e2e.js";import"./index.esm-6eb99c1e.js";import"./index.esm-a32ba1d8.js";import"./PrimaryButton-2e9f3eea.js";import"./SelectList-d2279005.js";import"./useServerFilter-a6266122.js";import"./TextInput-6df0972b.js";import"./ButtonWrapper-424887ee.js";import"./index-ca27c7cc.js";import"./index-4adb76a8.js";import"./utils-01642ffa.js";const R=({branch:b,server_filters:j,batch_datas:e,...k})=>{const[l,n]=s.useState(!1),[p,a]=s.useState(null),c=r=>{localStorage.setItem("tabsActive_sksw_perunit_index",r),a(r)};return s.useEffect(()=>{const r=localStorage.getItem("tabsActive_sksw_perunit_index"),t=e==null?void 0:e.some(o=>o.branch_id==r),u=Math.min(...e==null?void 0:e.map(o=>o.branch_id));a(t?parseInt(r):u)},[]),i(d,{loading:l,children:i(h,{judul:"SKSW Per Unit",children:i("div",{className:"w-full",children:m(x,{className:"w-full",value:p,children:[m("div",{className:"flex flex-col justify-between lg:flex-row",children:[i(w,{className:"flex flex-wrap justify-start w-full gap-3 bg-transparent",children:e.length>0?e.map((r,t)=>i(S,{onClick:()=>c(r.branch_id),value:r.branch_id,className:"border",children:r.unit})):null}),i("div",{className:"w-full ",children:i(v,{loading:l,setLoading:n,urlLink:route("sksw.unit"),localState:"sksw_unit",FilterWilayahOnly:!0,availableMonth:!0})})]}),i(f,{children:e.length>0?e.map((r,t)=>i(T,{value:r.branch_id,children:i(g,{data:r,loading:l,setLoading:n})})):null})]})})})})};export{R as default};