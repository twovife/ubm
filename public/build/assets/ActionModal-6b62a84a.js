import{j as i,a as m,F as s}from"./app-5ab5dafe.js";import{M as c}from"./Modal-8a977562.js";import"./TextInput-01069d32.js";import n from"./FormMutasi-a1c2163a.js";import o from"./PencairanSimpanan-42d398fb.js";import"./Loading-c4ba8e97.js";import f from"./ResignModal-752ab2e9.js";import p from"./UpdateDetail-4386b5eb.js";import x from"./Resign-43f5ede7.js";import"./transition-a5d0b238.js";import"./InputError-f46267ec.js";import"./InputLabel-39b75776.js";import"./PrimaryButton-c044392e.js";import"./SelectList-e396f9c0.js";import"./TextArea-1a6c2932.js";const P=({show:r,onClose:e,data:l,...t})=>{const a=t.branch.map(d=>({id:d.id,value:d.id,display:d.unit}));return i(c,{maxWidth:"7xl",show:r,onClose:e,children:m("div",{className:"p-6 overflow-auto",children:[i("div",{className:"text-lg mb-6",children:"Action Form"}),m("div",{className:"lg:flex gap-6",children:[i("div",{className:"flex-1",children:i(p,{branch:a,detailData:l,onClose:e,titles:t.titles})}),m("div",{className:"flex-[2]",children:[i("div",{className:"w-full lg:flex gap-6 mb-6",children:l.date_resign!==null?i(x,{branch:a,detailData:l,onClose:e,titles:t.titles}):m(s,{children:[i("div",{className:"flex-1",children:i(n,{branch:a,detailId:l.id,onClose:e,titles:t.titles})}),i("div",{className:"flex-1",children:i(f,{branch:a,detailId:l.id,onClose:e,titles:t.titles})})]})}),i("div",{className:"w-full lg:flex gap-6",children:i("div",{className:"flex-1",children:i(o,{detailId:l.id,detailData:l,onClose:e})})})]})]})]})})};export{P as default};