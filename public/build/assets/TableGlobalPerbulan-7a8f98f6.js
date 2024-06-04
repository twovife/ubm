import{a as d,j as e}from"./app-a2b587a6.js";import{u as i,D as t}from"./useFilter-e78e743e.js";import{d as u}from"./dayjs.min-902dd2c5.js";import{N as a}from"./react-number-format.es-3b3c9504.js";const _=({data:p,loading:h,setLoading:m})=>{const c=p.data,{returnedData:n,totals:s}=i(c,100,"sksw_wilayah"),o=[{type:"default",headers:{filterable:"no",name:"Nomor",column:"no",type_date:"text"}},{type:"default",headers:{filterable:"no",name:"Wilayah",column:"wilayah",type_date:"text"}},{type:"default",headers:{filterable:"no",name:"Bulan",column:"bulan",class_name:"whitespace-nowrap",type_date:"text"}},{type:"default",headers:{filterable:"no",name:"Unit",column:"unit",class_name:"whitespace-nowrap",type_date:"text"}},{type:"default",headers:{filterable:"no",name:"Simpanan SW",column:"balance_before_sw",format:"currency",class_name:"bg-gray-100 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Simpanan SK",column:"balance_before_sk",format:"currency",class_name:"bg-gray-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Debit SW",column:"debit_sw",format:"currency",class_name:"bg-green-100 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Debit SK",column:"debit_sk",format:"currency",class_name:"bg-green-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Kredit SW",column:"kredit_sw",format:"currency",class_name:"bg-red-100 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Kredit SK",column:"kredit_sk",format:"currency",class_name:"bg-red-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Saldo SW",column:"balance_sw",format:"currency",class_name:"bg-green-100 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Saldo SK",column:"balance_sk",format:"currency",class_name:"bg-green-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Saldo Global",column:"saldo_global",format:"currency",class_name:"bg-blue-200 text-black font-semibold"}},{type:"default",headers:{filterable:"no",name:"Setoran SW (D)",column:"D_sw",format:"currency",class_name:"bg-emerald-50"}},{type:"default",headers:{filterable:"no",name:"Setoran SK (D)",column:"D_sk",format:"currency",class_name:"bg-emerald-50"}},{type:"default",headers:{filterable:"no",name:"Debit Mutasi SW (D)",column:"DM_sw",format:"currency",class_name:"bg-emerald-50"}},{type:"default",headers:{filterable:"no",name:"Debit Mutasi SK (D)",column:"DM_sk",format:"currency",class_name:"bg-emerald-50"}},{type:"default",headers:{filterable:"no",name:"Pengambilan SW (K)",column:"K_sw",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Pengambilan SK (K)",column:"K_sk",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Kredit Mutasi SW (K)",column:"KM_sw",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Kredit Mutasi SK (K)",column:"KM_sk",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Kredit Resign / M SW (K)",column:"KRMD_sw",format:"currency",class_name:"bg-rose-50"}},{type:"default",headers:{filterable:"no",name:"Kredit Resign / MD SK (K)",column:"KRMD_sk",format:"currency",class_name:"bg-rose-50"}}];return d(t,{children:[e(t.thead,{children:o.map((l,r)=>e(t.th,{type:l.type,headers:l.headers},r))}),e(t.tbody,{children:n==null?void 0:n.map((l,r)=>d(t.tr,{children:[e(t.td,{className:"text-center",children:r+1}),e(t.td,{className:"text-center",children:l.wilayah}),e(t.td,{className:"text-center",children:u(l.bulan).format("MMM/YYYY")}),e(t.td,{noSpace:!0,className:"text-center",children:l.unit}),e(t.td,{noSpace:!0,className:"text-end bg-yellow-100",children:e(a,{value:l.balance_before_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-yellow-200",children:e(a,{value:l.balance_before_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-green-100",children:e(a,{value:l.debit_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-green-200",children:e(a,{value:l.debit_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-red-100",children:e(a,{value:l.kredit_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-red-200",children:e(a,{value:l.kredit_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-green-100",children:e(a,{value:l.balance_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-green-200",children:e(a,{value:l.balance_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-200",children:e(a,{value:l.saldo_global,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.D_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.D_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.DM_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.DM_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.K_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.K_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.KM_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.KM_sk,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.KRMD_sw,displayType:"text",thousandSeparator:","})}),e(t.td,{noSpace:!0,className:"text-end bg-blue-50",children:e(a,{value:l.KRMD_sk,displayType:"text",thousandSeparator:","})})]},r))}),e("tfoot",{className:"sticky bottom-0 left-0 w-full bg-gray-300 shadow border-t border-t-white",children:d("tr",{className:"bg-blue-200 font-semibold text-black",children:[e("td",{className:"px-3 py-1",colSpan:4,children:"TOTAL"}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.balance_before_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.balance_before_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-400 text-white",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.debit_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.debit_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.kredit_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.kredit_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.balance_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.balance_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1 bg-green-500 text-white",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.saldo_global,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.D_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.D_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.DM_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.DM_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.K_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.K_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.KM_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.KM_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.KRMD_sw,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})}),e("td",{className:"px-3 py-1",children:e("div",{className:"whitespace-nowrap text-end",children:e(a,{value:s.KRMD_sk,displayType:"text",thousandSeparator:",",prefix:"Rp. "})})})]})})]})};export{_ as default};
