import{_ as l,r as c,a,j as s,n as p}from"./app-1d785132.js";import{G as u}from"./GuestLayout-46c8e70d.js";import{I as f}from"./InputError-dbc39e5b.js";import{I as w}from"./InputLabel-faf6f2c6.js";import{P as h}from"./PrimaryButton-d85fef6e.js";import{T as b}from"./TextInput-bd1c020b.js";function I(){const{data:e,setData:t,post:o,processing:m,errors:n,reset:i}=l({password:""});c.useEffect(()=>()=>{i("password")},[]);const d=r=>{t(r.target.name,r.target.value)};return a(u,{children:[s(p,{title:"Confirm Password"}),s("div",{className:"mb-4 text-sm text-gray-600",children:"This is a secure area of the application. Please confirm your password before continuing."}),a("form",{onSubmit:r=>{r.preventDefault(),o(route("password.confirm"))},children:[a("div",{className:"mt-4",children:[s(w,{htmlFor:"password",value:"Password"}),s(b,{id:"password",type:"password",name:"password",value:e.password,className:"mt-1 block w-full",isFocused:!0,onChange:d}),s(f,{message:n.password,className:"mt-2"})]}),s("div",{className:"flex items-center justify-end mt-4",children:s(h,{className:"ml-4",disabled:m,children:"Confirm"})})]})]})}export{I as default};