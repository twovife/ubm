import{_ as g,r as h,j as r,a as e,n as b,d as x}from"./app-ff24692e.js";import{C as w}from"./Checkbox-bc797398.js";import{G as N}from"./GuestLayout-f131389b.js";import{I as n}from"./InputError-5311aa99.js";import{I as l}from"./InputLabel-35b3bafd.js";import{P as v}from"./PrimaryButton-7b80c783.js";import{T as i}from"./TextInput-57b11146.js";function P({status:m,canResetPassword:u}){const{data:a,setData:c,post:d,processing:p,errors:o,reset:f}=g({username:"",password:"",remember:""});h.useEffect(()=>()=>{f("password")},[]);const t=s=>{c(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return r(N,{children:[e(b,{title:"Log in"}),m&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:m}),r("form",{onSubmit:s=>{s.preventDefault(),d(route("login"))},children:[r("div",{children:[e(l,{htmlFor:"username",value:"Username"}),e(i,{id:"username",type:"text",name:"username",value:a.username,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:t}),e(n,{message:o.username,className:"mt-2"})]}),r("div",{className:"mt-4",children:[e(l,{htmlFor:"password",value:"Password"}),e(i,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:t}),e(n,{message:o.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:r("label",{className:"flex items-center",children:[e(w,{name:"remember",value:a.remember,onChange:t}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),r("div",{className:"flex items-center justify-end mt-4",children:[u&&e(x,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e(v,{type:"submit",className:"ml-4",disabled:p,children:"Log in"})]})]})]})}export{P as default};
