import{_ as l,r as c,j as a,a as s,n as p}from"./app-fb0605f7.js";import{G as u}from"./GuestLayout-c134258d.js";import{I as f}from"./InputError-c308d894.js";import{I as w}from"./InputLabel-188d0602.js";import{P as h}from"./PrimaryButton-0a91b541.js";import{T as b}from"./TextInput-32029054.js";function I(){const{data:e,setData:t,post:o,processing:m,errors:n,reset:i}=l({password:""});c.useEffect(()=>()=>{i("password")},[]);const d=r=>{t(r.target.name,r.target.value)};return a(u,{children:[s(p,{title:"Confirm Password"}),s("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),a("form",{onSubmit:r=>{r.preventDefault(),o(route("password.confirm"))},children:[a("div",{className:"mt-4",children:[s(w,{htmlFor:"password",value:"Password"}),s(b,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",isFocused:!0,onChange:d}),s(f,{message:n.password,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(h,{className:"ml-4",disabled:m,children:"Confirm"})})]})]})}export{I as default};