import{a as e,j as t,F as n,n as d,d as c}from"./app-fdf32284.js";import"./Pagination-136faa37.js";import"./TextInput-054d9190.js";import{A as h}from"./AuthenticatedLayout-be8fc0da.js";import{a as p}from"./index.esm-c6a4065a.js";import"./Loading-ca7ddf5b.js";import{M as u}from"./MyTables-5fd000d0.js";import{C as f}from"./ContentWrap-e7fd200f.js";import"./SweetAlert-b7460ca0.js";import"./transition-d829c033.js";import"./iconBase-e489749e.js";import"./index.esm-b765cddd.js";import"./index.esm-7ee00b76.js";import"./PrimaryButton-fbe0e362.js";const I=({customers:a,...r})=>{const l=[{title:"Id Customer",column:"id",sortable:!1},{title:"Nama",column:"nama",sortable:!1},{title:"NIK",column:"nik",sortable:!1},{title:"No KK",column:"no_kk",sortable:!1},{title:"Alamat",column:"alamat",sortable:!1},{title:"Unit",column:"unit",sortable:!1}];return e(h,{auth:r.auth,errors:r.errors,header:t(n,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Management User"}),e(d,{title:"Management User"}),e("div",{className:"ml-auto flex items-center"})]}),children:e("div",{className:"p-4",children:e(f,{children:e(u,{header:l,link:a.link,datefilter:!1,editable:!0,children:e("tbody",{children:a.data.map((i,s)=>t("tr",{className:"odd:bg-gray-100",children:[e("th",{className:"px-6 py-1",children:t("div",{className:"flex justify-around items-center gap-3",children:[s+1,e(c,{href:route("unit.customer.edit",i.id),children:e(p,{className:"text-blue-500 hover:cursor-pointer"})})]})}),l.map((o,m)=>e("td",{className:"px-6 py-1 min-w-[10rem]",children:i[o.column]},m))]},s))})})})})})};export{I as default};
