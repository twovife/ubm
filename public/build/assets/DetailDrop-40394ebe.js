import{a as e,j as a}from"./app-50f8e911.js";import{M as r}from"./MobileLayout-ed1c7a5d.js";import{d as i}from"./dayjs.min-54a0913a.js";import{N as d}from"./react-number-format.es-d41d29c3.js";import"./LinkButton-cbd9c99a.js";import"./index.esm-90934d74.js";import"./iconBase-d5c66182.js";const f=({...l})=>{const{loans:s}=l;return e(r,{auth:l.auth,errors:l.errors,header:"Detail Drop Langsung",children:a("div",{children:[a("div",{className:"flex px-4 py-2 border-b shadow-sm",children:[a("div",{className:"flex-[2] flex justify-between",children:[e("span",{children:"Nomor"}),e("span",{className:"pr-3",children:":"})]}),e("div",{className:"flex-[4]",children:s.id})]}),a("div",{className:"flex px-4 py-2 border-b shadow-sm",children:[a("div",{className:"flex-[2] flex justify-between",children:[e("span",{children:"Nama"}),e("span",{className:"pr-3",children:":"})]}),e("div",{className:"flex-[4]",children:s.customer.nama})]}),a("div",{className:"flex px-4 py-2 border-b shadow-sm",children:[a("div",{className:"flex-[2] flex justify-between",children:[e("span",{children:"NIK"}),e("span",{className:"pr-3",children:":"})]}),e("div",{className:"flex-[4]",children:s.customer.nik})]}),a("div",{className:"flex px-4 py-2 border-b shadow-sm",children:[a("div",{className:"flex-[2] flex justify-between",children:[e("span",{children:"Drop"}),e("span",{className:"pr-3",children:":"})]}),e("div",{className:"flex-[4]",children:e(d,{value:s.drop,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})]}),a("div",{className:"flex px-4 py-2 border-b shadow-sm",children:[a("div",{className:"flex-[2] flex justify-between",children:[e("span",{children:"Tanggal Drop"}),e("span",{className:"pr-3",children:":"})]}),e("div",{className:"flex-[4]",children:i(s.tanggal_drop).format("DD-MM-YYYY")})]})]})})};export{f as default};