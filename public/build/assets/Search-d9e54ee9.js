import{W as D,r as p,a as o,j as a,F as E,y as O}from"./app-03fb5093.js";import{P as d}from"./PrimaryButton-842e4140.js";import{S as u}from"./SelectList-1a007774.js";import{u as P}from"./useServerFilter-32035045.js";import{T as w}from"./TextInput-9244e08a.js";import{B as V}from"./ButtonWrapper-67671d32.js";const G=({loading:I,setLoading:r,urlLink:c=route("emp.index"),localState:y,FilterWilayahOnly:b=!1,availableBranch:v=!1,availableDate:S=!1,availableMonth:x=!1,children:N})=>{const{wilayah:m,selectedWilayah:l,setSelectedWilayah:C,filteredBranch:j,selectedBranch_id:f,selectedBulan:h}=P(),{data:n,setData:i,get:B,processing:g}=D({}),s=e=>{const{name:t,value:k}=e.target;i(t,k)},F=e=>{const{value:t}=e.target;C(t),i({branch_id:""})},W=e=>{e.preventDefault(),B(c)},_=e=>{e.preventDefault(),O.visit(c,{onStart:t=>r(!0),onFinish:t=>r(!1)}),localStorage.setItem(y,JSON.stringify({oldFilter:[],oldPage:1}))};return p.useEffect(()=>{const e={};f&&(e.branch_id=f),h&&(e.bulan=h),l&&(e.wilayah=l),Object.keys(e).length>0&&i(e)},[]),p.useEffect(()=>{r(g)},[g]),o("form",{onSubmit:W,className:"flex w-full flex-col lg:flex-row gap-3 items-end lg:items-center justify-end",children:[o("div",{className:"flex flex-row justify-end gap-3 flex-wrap w-full lg:w-auto",children:[x&&a(w,{type:"month",className:"w-full lg:w-auto",onChange:s,name:"bulan",value:n.bulan}),S&&a(w,{type:"date",className:"w-full lg:w-auto",onChange:s,name:"tanggal",value:n.tanggal}),b&&a(u,{name:"wilayah",value:n.wilayah,className:"w-full lg:w-auto",nullValue:!0,options:m,onChange:s}),v&&o(E,{children:[a(u,{name:"wilayah",value:l,className:"w-full lg:w-auto inline-block",nullValue:!0,options:m,onChange:F}),l!==""&&a(u,{name:"branch_id",className:"w-full lg:w-auto",value:n.branch_id,nullValue:!0,required:!0,options:j,onChange:s})]})]}),o(V,{children:[a(d,{type:"submit",theme:"green",className:"block",title:"Cari"}),a(d,{onClick:_,type:"button",theme:"yellow",className:"block",title:"Reset"}),N]})]})};export{G as S};