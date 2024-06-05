import{_ as I,j as e,r as T,a}from"./app-5ed665f7.js";import{I as t}from"./InputError-c95ae42c.js";import{I as r}from"./InputLabel-b55f2251.js";import{P as j}from"./PrimaryButton-060dd549.js";import{S as m}from"./SelectList-0017c979.js";import{T as q}from"./TextInput-51ae16fc.js";import{u as B}from"./useServerFilter-3b942d5e.js";import{C as b}from"./index.esm-aabc7ba8.js";import{t as W}from"./transition-ad8a4df2.js";const G=({show:g=!1,showHandler:h})=>{const{wilayah:w,setSelectedWilayah:F,filteredBranch:v,selectedWilayah:i,selectedBranch:L,selectedBranch_id:y,onWilayahChangeHandler:N,onBranchChangeHandler:x,filteredEmps:c}=B(),{data:o,setData:u,post:_,processing:V,recentlySuccessful:D,reset:k,errors:n}=I({employee_id:"",sw_balance:0,sk_balance:0,tgl_tabugan:""}),d=l=>{const{value:s,name:S}=l.target;u(S,s)},f=(l,s)=>{u(s,parseInt(l))},p=()=>{h(!1),k(),setLoading(!1)},C=l=>{l.preventDefault(),_(route("sksw.store"),{onStart:s=>{setLoading(!0)},onSuccess:s=>{p()},onError:s=>setLoading(!1),replace:!0})};return e(W,{as:T.Fragment,show:g,enter:"transition ease-out duration-200",enterFrom:"transform opacity-0 scale-95",enterTo:"transform opacity-100 scale-100",leave:"transition ease-in duration-75",leaveFrom:"transform opacity-100 scale-100",leaveTo:"transform opacity-0 scale-95",children:e("div",{className:"w-full h-screen fixed top-0 left-0 z-[50]",children:e("div",{className:"flex justify-center h-full items-center p-2",onClick:p,children:a("form",{onSubmit:C,className:"w-full lg:max-w-xl bg-white py-3 px-6 shadow border",onClick:l=>l.stopPropagation(),children:[e("div",{className:"mb-3 font-semibold text-xl",children:"Tambah SKSW BARU"}),a("div",{className:"flex flex-col lg:flex-row gap-3 w-full mb-2",children:[a("div",{className:"flex-1",children:[e(r,{value:"Wilayah",className:"mb-1"}),e(m,{name:"wilayah",value:i,className:"w-full",nullValue:!0,options:w,onChange:N,required:!0})]}),i!==""&&a("div",{className:"flex-1",children:[e(r,{value:"Unit",className:"mb-1"}),e(m,{name:"branch_id",className:"w-full",value:y,nullValue:!0,options:v,onChange:x,required:!0})]}),c!==""&&a("div",{className:"flex-1",children:[e(r,{value:"Nama Karyawan",className:"mb-1"}),e(m,{name:"employee_id",className:"w-full",value:o.employee_id,nullValue:!0,options:c,onChange:d,required:!0}),e(t,{message:n.employee_id,className:"mt-2"})]})]}),a("div",{className:"w-full mb-2",children:[e(r,{value:"Tanggal Tabungan"}),e(q,{type:"date",className:"w-full",name:"tgl_tabugan",onChange:d,required:!0}),e(t,{message:n.tgl_tabugan,className:"mt-2"})]}),a("div",{className:"w-full mb-2",children:[e(r,{value:"Setor Awal Simpanan Wajib",className:"mb-1"}),e(b,{name:"sw_balance",id:"sw_balance",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:f,value:o.sw_balance,placeholder:"Inputkan angka tanpa sparator"}),e(t,{message:n.sw_balance,className:"mt-2"})]}),a("div",{className:"w-full mb-2",children:[e(r,{value:"Setor Awal Simpanan Sukarela",className:"mb-1"}),e(b,{name:"sk_balance",id:"sk_balance",className:"border-gray-300 focus:border-brand-500 focus:ring-brand-500 bg-white dark:bg-gray-800 rounded-md shadow-sm block w-full text-sm mt-2",allowDecimals:!1,prefix:"Rp. ",min:1,required:!0,onValueChange:f,value:o.sk_balance,placeholder:"Inputkan angka tanpa sparator"}),e(t,{message:n.sk_balance,className:"mt-2"})]}),e("div",{className:"flex justify-end items-center",children:e(j,{type:"submit",title:"submit"})})]})})})})};export{G as default};