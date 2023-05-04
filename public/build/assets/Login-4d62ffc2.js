import{a as e,_ as f,r as h,j as r,n as b,d as x}from"./app-b1e3a402.js";import{G as w}from"./GuestLayout-6553f64d.js";import{I as i}from"./InputError-474357f4.js";import{I as l}from"./InputLabel-c9d1d76a.js";import{P as N}from"./PrimaryButton-52d0cdfe.js";import{T as d}from"./TextInput-0f398284.js";function y({className:a="",...t}){return e("input",{...t,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+a})}function E({status:a,canResetPassword:t}){const{data:o,setData:u,post:c,processing:p,errors:n,reset:g}=f({username:"",password:"",remember:""});h.useEffect(()=>()=>{g("password")},[]);const m=s=>{u(s.target.name,s.target.type==="checkbox"?s.target.checked:s.target.value)};return r(w,{children:[e(b,{title:"Log in"}),a&&e("div",{className:"mb-4 font-medium text-sm text-green-600",children:a}),r("form",{onSubmit:s=>{s.preventDefault(),c(route("login"))},children:[r("div",{children:[e(l,{htmlFor:"username",value:"Username"}),e(d,{id:"username",type:"text",name:"username",value:o.username,className:"mt-1 block w-full",autoComplete:"username",isFocused:!0,onChange:m}),e(i,{message:n.username,className:"mt-2"})]}),r("div",{className:"mt-4",children:[e(l,{htmlFor:"password",value:"Password"}),e(d,{id:"password",type:"password",name:"password",value:o.password,className:"mt-1 block w-full",autoComplete:"current-password",onChange:m}),e(i,{message:n.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:r("label",{className:"flex items-center",children:[e(y,{name:"remember",value:o.remember,onChange:m}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),r("div",{className:"flex items-center justify-end mt-4",children:[t&&e(x,{href:route("password.request"),className:"underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:"Forgot your password?"}),e(N,{type:"submit",className:"ml-4",disabled:p,children:"Log in"})]})]})]})}export{E as default};
