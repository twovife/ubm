import{j as e,a as t,F as n,n as d,d as c}from"./app-1d785132.js";import"./Pagination-42336bca.js";import"./TextInput-bd1c020b.js";import{A as p}from"./AuthenticatedLayout-3cf4e6d7.js";import{a as h}from"./index.esm-cfc0a015.js";import"./Loading-03bb076d.js";import{M as u}from"./MyTables-ef7e34b8.js";import{C as f}from"./ContentWrap-bf49b9bb.js";import"./Navbar-5bc1c263.js";import"./index.esm-f651b8a5.js";import"./iconBase-72367d21.js";import"./transition-773de677.js";import"./index.esm-0983ca43.js";import"./index.esm-598a2836.js";import"./PrimaryButton-d85fef6e.js";const w=({customers:a,...r})=>{const l=[{title:"Id Customer",column:"id",sortable:!1},{title:"Nama",column:"nama",sortable:!1},{title:"NIK",column:"nik",sortable:!1},{title:"No KK",column:"no_kk",sortable:!1},{title:"Alamat",column:"alamat",sortable:!1},{title:"Unit",column:"unit",sortable:!1}];return e(p,{auth:r.auth,errors:r.errors,header:t(n,{children:[e("h2",{className:"font-semibold text-xl text-main-800 leading-tight",children:"Management User"}),e(d,{title:"Management User"}),e("div",{className:"ml-auto flex items-center"})]}),children:e("div",{className:"p-4",children:e(f,{children:e(u,{header:l,link:a.link,datefilter:!1,editable:!0,children:e("tbody",{children:a.data.map((i,s)=>t("tr",{className:"odd:bg-gray-100",children:[e("th",{className:"px-6 py-1",children:t("div",{className:"flex justify-around items-center gap-3",children:[s+1,e(c,{href:route("unit.customer.edit",i.id),children:e(h,{className:"text-blue-500 hover:cursor-pointer"})})]})}),l.map((o,m)=>e("td",{className:"px-6 py-1 min-w-[10rem]",children:i[o.column]},m))]},s))})})})})})};export{w as default};