import{W as N,r as u,_ as w,j as a,a as n,F as S}from"./app-35486303.js";import{I as i}from"./InputLabel-f58801a2.js";import{P as _}from"./PrimaryButton-c89a07da.js";import{S as d}from"./SelectList-e48d4d18.js";import{T as j}from"./TextInput-ba3a0fa1.js";const L=()=>{const{branch:r,deposit:p,validating:o}=N().props,[m,h]=u.useState(),[C,f]=u.useState(),{data:F,setData:c,put:b,processing:M,errors:T}=w({transaction_date:"",transaction:"M",transaction_type:"M",branch_id:""}),v=Object.values(r.reduce((t,s)=>{const e=s.wilayah;return t[e]={id:e,value:e,display:`wilayah ${e}`},t},{})),g=t=>{const{value:s}=t.target,e=r.filter(l=>l.wilayah==s).map(({id:l,unit:x})=>({id:l,display:x,value:l}));h(e),f(null)},y=t=>{const{value:s}=t.target;c("branch_id",s)};return a("div",{className:"p-3 bg-white rounded shadow mt-3",children:n("form",{onSubmit:t=>{t.preventDefault(),b(route("sksw.addtransaksi",p.id))},children:[a("span",{className:"font-semibold mb-3",children:"Mutasi"}),n("div",{className:"lg:flex justify-start items-start gap-3",children:[n("div",{className:"mb-3 flex-1",children:[a(i,{value:"Tanggal Transaksi"}),a(j,{type:"month",required:!0,max:o.max_date,min:o.min_date,onChange:t=>c(t.target.name,t.target.value),name:"transaction_date",className:"w-full"})]}),n("div",{className:"mb-3 flex-1",children:[a(i,{value:"Wilayah",className:"mb-1"}),a(d,{onChange:g,options:v,nullValue:!0,className:"w-full"})]}),a("div",{className:"mb-3 flex-1",children:m&&n(S,{children:[a(i,{value:"Unit",className:"mb-1"}),a(d,{onChange:y,nullValue:!0,options:m,className:"w-full"})]})}),a("div",{className:"flex-1"}),a("div",{className:"flex-1"})]}),a("div",{children:a(_,{title:"Submit",type:"submit"})})]})})};export{L as default};
