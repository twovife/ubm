import{a as i,j as m,F as s}from"./app-1ade0aeb.js";import{M as c}from"./Modal-6bb220f2.js";import"./TextInput-9dd16bba.js";import n from"./FormMutasi-c291cea8.js";import o from"./PencairanSimpanan-71de599f.js";import"./Loading-7ff2ddc8.js";import f from"./ResignModal-e0d5e983.js";import p from"./UpdateDetail-1144396b.js";import x from"./Resign-56ff4c56.js";import"./transition-deec4ae6.js";import"./InputError-9a0fd59a.js";import"./InputLabel-c76485d5.js";import"./PrimaryButton-33526cce.js";import"./SelectList-e0a6096e.js";import"./TextArea-4d753e62.js";const P=({show:r,onClose:e,data:l,...t})=>{const a=t.branch.map(d=>({id:d.id,value:d.id,display:d.unit}));return i(c,{maxWidth:"7xl",show:r,onClose:e,children:m("div",{className:"p-6 overflow-auto",children:[i("div",{className:"text-lg mb-6",children:"Action Form"}),m("div",{className:"lg:flex gap-6",children:[i("div",{className:"flex-1",children:i(p,{branch:a,detailData:l,onClose:e,titles:t.titles})}),m("div",{className:"flex-[2]",children:[i("div",{className:"w-full lg:flex gap-6 mb-6",children:l.date_resign!==null?i(x,{branch:a,detailData:l,onClose:e,titles:t.titles}):m(s,{children:[i("div",{className:"flex-1",children:i(n,{branch:a,detailId:l.id,onClose:e,titles:t.titles})}),i("div",{className:"flex-1",children:i(f,{branch:a,detailId:l.id,onClose:e,titles:t.titles})})]})}),i("div",{className:"w-full lg:flex gap-6",children:i("div",{className:"flex-1",children:i(o,{detailId:l.id,detailData:l,onClose:e})})})]})]})]})})};export{P as default};