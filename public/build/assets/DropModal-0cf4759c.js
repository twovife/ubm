import{r as p,j as a,a as s,g as c}from"./app-b3afb448.js";import{L as u}from"./Loading-e9759365.js";import{M as d}from"./Modal-fe9b553f.js";import{P as f}from"./PrimaryButton-724723da.js";import"./transition-ec730b13.js";const D=({datas:r,onClosed:t,...h})=>{const[e,o]=p.useState(!1),{show:i,id:m}=r,n=l=>{o(!1),t()};return a(d,{maxWidth:"sm",show:i,onClose:t,children:[s(u,{show:e}),a("div",{className:"p-6",children:[s("h1",{className:"text-center text-xl mb-3",children:"Drop Customer Sekarang?"}),s(f,{onClick:l=>{c.put(route("mantriapps.drop.storeMantriDrop",m),{value:3},{onBefore:()=>o(!0),onSuccess:()=>n()})},title:"Yes",size:"lg",className:"mx-auto"})]})]})};export{D as default};