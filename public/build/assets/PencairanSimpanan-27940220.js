import{_ as u,j as n,a}from"./app-b3afb448.js";import{I as t}from"./InputError-233f4281.js";import{I as l}from"./InputLabel-6bf1377d.js";import{L as h}from"./Loading-e9759365.js";import{P as v}from"./PrimaryButton-724723da.js";import{T as p}from"./TextInput-f72ced76.js";import"./transition-ec730b13.js";const T=({detailId:e,detailData:f,...c})=>{console.log(c);const{data:m,setData:_,put:o,processing:d,errors:r,reset:g}=u({pencairan_simpanan_date:e.pencairan_simpanan_date,pencairan_simpanan_by:e.pencairan_simpanan_by,pencairan_simpanan_w_date:e.pencairan_simpanan_w_date,handover_jaminan:e.handover_jaminan,handover_jaminan_by:e.handover_jaminan_by}),s=i=>{_({...m,[i.target.name]:i.target.value,[i.target.name=="pencairan_simpanan_date"?"pencairan_simpanan_by":i.target.name=="handover_jaminan"?"handover_jaminan_by":"pencairan_simpanan_w_date"]:c.auth.id})};return n("form",{className:"w-full h-full flex flex-col",onSubmit:i=>{i.preventDefault(),o(route("employee.handover",e))},children:[a(h,{show:d}),a("div",{className:"tracking-widest font-semibold mb-3",children:"Pencairan Simpanan & Pengembalian Jaminan"}),n("div",{className:"flex flex-col lg:flex-row items-center flex-wrap gap-3",children:[n("div",{className:"flex-1 mb-3",children:[a(l,{htmlFor:"pencairan_simpanan_date",value:"Tgl Pencairan Simp. Sukarela"}),n("div",{className:"flex-[3]",children:[a(p,{onChange:s,className:"mt-1 w-full",name:"pencairan_simpanan_date",id:"pencairan_simpanan_date",type:"date",value:m.pencairan_simpanan_date}),a(t,{message:r.pencairan_simpanan_date,className:"mt-2"})]})]}),n("div",{className:"flex-1 mb-3",children:[a(l,{htmlFor:"pencairan_simpanan_w_date",value:"Tgl Pencairan Simp. Wajib"}),n("div",{className:"flex-[3]",children:[a(p,{onChange:s,className:"mt-1 w-full",name:"pencairan_simpanan_w_date",id:"pencairan_simpanan_w_date",type:"date",value:m.pencairan_simpanan_w_date}),a(t,{message:r.pencairan_simpanan_w_date,className:"mt-2"})]})]}),n("div",{className:"flex-1 mb-3",children:[a(l,{htmlFor:"handover_jaminan",value:"Tgl Pengembalian Jaminan"}),n("div",{className:"flex-[3]",children:[a(p,{onChange:s,className:"mt-1 w-full",name:"handover_jaminan",id:"handover_jaminan",type:"date",value:m.handover_jaminan}),a(t,{message:r.handover_jaminan,className:"mt-2"})]})]})]}),a("div",{children:a(v,{className:"ml-auto",title:"Setujui",type:"submit"})})]})};export{T as default};