import{W as f,r as g,a as r,j as e,Y as h,b,y as x}from"./app-9ebf769c.js";import{C as w}from"./Checkbox-733c121a.js";import{G as y}from"./GuestLayout-29cca99b.js";import{I as n}from"./InputError-efb1c53f.js";import{I as l}from"./InputLabel-47189f62.js";import{P as N}from"./PrimaryButton-29581f6d.js";import{T as i}from"./TextInput-5c77428e.js";function D({status:m,canResetPassword:u}){const{data:a,setData:c,post:v,processing:d,errors:o,reset:p}=f({username:"",password:"",remember:""});g.useEffect(()=>()=>{p("password")},[]);const t=s=>{c(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return r(y,{children:[e(h,{title:"Log in"}),m&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:m}),r("form",{onSubmit:s=>{s.preventDefault(),x.post(route("login"),a,{replace:!0})},children:[r("div",{children:[e(l,{htmlFor:"username",value:"Username"}),e(i,{id:"username",type:"text",name:"username",value:a.username,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:t}),e(n,{message:o.username,className:"mt-2"})]}),r("div",{className:"mt-4",children:[e(l,{htmlFor:"password",value:"Password"}),e(i,{id:"password",type:"password",name:"password",value:a.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:t}),e(n,{message:o.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:r("label",{className:"flex items-center",children:[e(w,{name:"remember",value:a.remember,onChange:t}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),r("div",{className:"flex items-center justify-end mt-4",children:[u&&e(b,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e(N,{type:"submit",className:"ml-4",disabled:d,children:"Log in"})]})]})]})}export{D as default};