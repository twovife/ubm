import{r as m,_ as g,j as a,a as s}from"./app-70b81897.js";import{I as d}from"./InputError-ce235c67.js";import{I as c}from"./InputLabel-33ee089e.js";import{P as v}from"./PrimaryButton-c7047bc2.js";import{T as p}from"./TextInput-c22344c3.js";import{t as _}from"./transition-34d0ea43.js";function S({className:i}){const l=m.useRef(),u=m.useRef(),{data:o,setData:t,errors:e,put:w,reset:n,processing:f,recentlySuccessful:h}=g({current_password:"",password:"",password_confirmation:""});return a("section",{className:i,children:[a("header",{children:[s("h2",{className:"text-lg font-medium text-gray-900",children:"Update Password"}),s("p",{className:"mt-1 text-sm text-gray-600",children:"Ensure your account is using a long, random password to stay secure."})]}),a("form",{onSubmit:r=>{console.log("ditutul"),r.preventDefault(),w(route("password.update"),{preserveScroll:!0,onSuccess:()=>n(),onError:()=>{e.password&&(n("password","password_confirmation"),l.current.focus()),e.current_password&&(n("current_password"),u.current.focus())}})},className:"mt-6 space-y-6",children:[a("div",{children:[s(c,{htmlFor:"current_password",value:"Current Password"}),s(p,{id:"current_password",ref:u,value:o.current_password,onChange:r=>t("current_password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"current-password"}),s(d,{message:e.current_password,className:"mt-2"})]}),a("div",{children:[s(c,{htmlFor:"password",value:"New Password"}),s(p,{id:"password",ref:l,value:o.password,onChange:r=>t("password",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s(d,{message:e.password,className:"mt-2"})]}),a("div",{children:[s(c,{htmlFor:"password_confirmation",value:"Confirm Password"}),s(p,{id:"password_confirmation",value:o.password_confirmation,onChange:r=>t("password_confirmation",r.target.value),type:"password",className:"mt-1 block w-full",autoComplete:"new-password"}),s(d,{message:e.password_confirmation,className:"mt-2"})]}),a("div",{className:"flex items-center gap-4",children:[s(v,{type:"submit",disabled:f,children:"Save"}),s(_,{show:h,enterFrom:"opacity-0",leaveTo:"opacity-0",className:"transition ease-in-out",children:s("p",{className:"text-sm text-gray-600",children:"Saved."})})]})]})]})}export{S as default};