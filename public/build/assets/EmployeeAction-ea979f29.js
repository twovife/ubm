import{a as e,j as t,F as d}from"./app-62eb9655.js";import o from"./UpdateDetail-f7ab33a3.js";import c from"./Resign-c1f21755.js";import n from"./FormMutasi-de6b0501.js";import f from"./ResignModal-ac836173.js";import p from"./PencairanSimpanan-5511dbf0.js";import{L as m}from"./LinkButton-07ad72cd.js";import{a as h,b as u}from"./index.esm-4af1f187.js";import"./InputError-7ff03abe.js";import"./InputLabel-23ccd222.js";import"./Loading-a76b646a.js";import"./transition-a78dee6c.js";import"./PrimaryButton-c6c1178d.js";import"./SelectList-c044c9da.js";import"./TextArea-769a3988.js";import"./TextInput-ca643556.js";import"./iconBase-fa43618f.js";const R=({data:i,...a})=>{const s=a.titles.map(l=>({id:l.id,value:l.title,display:l.title})),r=a.branch.map(l=>({id:l.id,value:l.id,display:l.unit}));return e("div",{children:t("div",{className:"p-6 overflow-auto",children:[t("div",{className:"flex w-full justify-start items-center",children:[e("div",{className:"text-lg mb-6",children:"Action Form"}),e("div",{className:"flex ml-auto gap-3 items-center",children:e(m,{as:"a",href:route("employee.index"),icon:e(h,{}),size:"sm",title:"Back"})})]}),t("div",{className:"lg:flex gap-6",children:[e("div",{className:"flex-1",children:e(o,{branch:r,detailData:i,titles:s})}),t("div",{className:"flex-[2]",children:[e("div",{className:"w-full lg:flex gap-6 mb-6",children:i.date_resign!==null?e(c,{branch:r,detailData:i,titles:s}):t(d,{children:[e("div",{className:"flex-1",children:e(n,{branch:r,detailId:i.id,titles:s})}),e("div",{className:"flex-1",children:e(f,{branch:r,detailId:i.id,titles:s})})]})}),e("div",{className:"w-full lg:flex gap-6",children:e("div",{className:"flex-1",children:e(p,{detailId:i.id,detailData:i,auth:a.auth})})})]})]}),e("div",{className:"flex w-full items-center justify-end mt-3",children:a.deletable&&e(m,{as:"a",href:route("employee.destroy",i.id),method:"delete",icon:e(u,{}),size:"sm",title:"Delete",theme:"red"})})]})})};export{R as default};