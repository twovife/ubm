import{a as e,j as t,F as d}from"./app-3502981f.js";import o from"./UpdateDetail-5c6d1770.js";import c from"./Resign-241492b6.js";import n from"./FormMutasi-55bb8c6a.js";import f from"./ResignModal-e608474f.js";import p from"./PencairanSimpanan-4d031c0e.js";import{L as m}from"./LinkButton-3f43e51b.js";import{a as h,b as u}from"./index.esm-903a5f2d.js";import"./InputError-6fedeff9.js";import"./InputLabel-37295ceb.js";import"./Loading-ef25532a.js";import"./transition-fe8cd52b.js";import"./PrimaryButton-eeb4d7e5.js";import"./SelectList-9ceef050.js";import"./TextArea-549bba5b.js";import"./TextInput-94ef07e5.js";import"./iconBase-c5d34aa7.js";const R=({data:i,...a})=>{const s=a.titles.map(l=>({id:l.id,value:l.title,display:l.title})),r=a.branch.map(l=>({id:l.id,value:l.id,display:l.unit}));return e("div",{children:t("div",{className:"p-6 overflow-auto",children:[t("div",{className:"flex w-full justify-start items-center",children:[e("div",{className:"text-lg mb-6",children:"Action Form"}),e("div",{className:"flex ml-auto gap-3 items-center",children:e(m,{as:"a",href:route("employee.index"),icon:e(h,{}),size:"sm",title:"Back"})})]}),t("div",{className:"lg:flex gap-6",children:[e("div",{className:"flex-1",children:e(o,{branch:r,detailData:i,titles:s})}),t("div",{className:"flex-[2]",children:[e("div",{className:"w-full lg:flex gap-6 mb-6",children:i.date_resign!==null?e(c,{branch:r,detailData:i,titles:s}):t(d,{children:[e("div",{className:"flex-1",children:e(n,{branch:r,detailId:i.id,titles:s})}),e("div",{className:"flex-1",children:e(f,{branch:r,detailId:i.id,titles:s})})]})}),e("div",{className:"w-full lg:flex gap-6",children:e("div",{className:"flex-1",children:e(p,{detailId:i.id,detailData:i,auth:a.auth})})})]})]}),e("div",{className:"flex w-full items-center justify-end mt-3",children:a.deletable&&e(m,{as:"a",href:route("employee.destroy",i.id),method:"delete",icon:e(u,{}),size:"sm",title:"Delete",theme:"red"})})]})})};export{R as default};