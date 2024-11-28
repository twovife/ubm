import{r as t,j as e,a as l,F as j,Y as E,y as I}from"./app-9ebf769c.js";import{c as n}from"./utils-01642ffa.js";import{C as L}from"./Checkbox-733c121a.js";import{I as p}from"./InputError-efb1c53f.js";import{I as u}from"./InputLabel-47189f62.js";import{P as R}from"./PrimaryButton-29581f6d.js";import{T as h}from"./TextInput-5c77428e.js";import{L as D}from"./Loading-d148a701.js";import P from"./WelcomeAnimation-53e58294.js";import"./transition-0247d4df.js";const x=t.forwardRef(({className:r,...a},s)=>e("div",{ref:s,className:n("rounded-xl border border-slate-200 bg-white text-slate-950 shadow dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",r),...a}));x.displayName="Card";const N=t.forwardRef(({className:r,...a},s)=>e("div",{ref:s,className:n("flex flex-col space-y-1.5 p-6",r),...a}));N.displayName="CardHeader";const g=t.forwardRef(({className:r,...a},s)=>e("h3",{ref:s,className:n("font-semibold leading-none tracking-tight",r),...a}));g.displayName="CardTitle";const w=t.forwardRef(({className:r,...a},s)=>e("p",{ref:s,className:n("text-sm text-slate-500 dark:text-slate-400",r),...a}));w.displayName="CardDescription";const b=t.forwardRef(({className:r,...a},s)=>e("div",{ref:s,className:n("p-6 pt-0",r),...a}));b.displayName="CardContent";const C=t.forwardRef(({className:r,...a},s)=>e("div",{ref:s,className:n("flex items-center p-6 pt-0",r),...a}));C.displayName="CardFooter";function z(r){const[a,s]=t.useState(!1),[m,c]=t.useState({username:"",password:"",remember:""}),[f,v]=t.useState({});t.useEffect(()=>()=>{c(o=>({...o,password:null}))},[]);const d=o=>{const{name:i,value:y,type:k,checked:F}=o.target;c(S=>({...S,[i]:k==="checkbox"?F:y}))};return l(j,{children:[e(E,{title:"WELCOME"}),e(D,{show:a}),l("div",{className:"flex flex-col w-screen h-screen lg:flex-row",children:[e("div",{className:"flex-[3] items-center justify-center hidden lg:flex",children:l("div",{className:"font-mono text-center",children:[e("div",{className:"w-1/2 mx-auto",children:e(P,{})}),e("div",{className:"text-4xl font-bold",children:"APLIKASI PUSAT"}),e("div",{className:"text-xl font-light",children:"usberdigital apps"})]})}),e("div",{className:"flex-[2] flex items-center justify-center h-full p-5 bg-roman-500",children:l(x,{className:"w-full lg:max-w-sm",children:[l(N,{children:[e(g,{children:"Selamat Datang"}),e(w,{children:"Silahkan login dengan user yang sudah disediakan"})]}),e(b,{children:l("form",{onSubmit:o=>{o.preventDefault(),s(!0),I.post(route("login"),m,{replace:!0,onFinish:()=>s(!1),onError:i=>{v(i)}})},children:[l("div",{children:[e(u,{htmlFor:"username",value:"Username"}),e(h,{id:"username",type:"text",name:"username",value:m.username,className:"block w-full mt-1",autoComplete:"username",isFocused:!0,onChange:d}),e(p,{message:f.username,className:"mt-2"})]}),l("div",{className:"mt-4",children:[e(u,{htmlFor:"password",value:"Password"}),e(h,{id:"password",type:"password",name:"password",value:m.password,className:"block w-full mt-1",autoComplete:"current-password",onChange:d}),e(p,{message:f.password,className:"mt-2"})]}),e("div",{className:"block mt-4",children:l("label",{className:"flex items-center",children:[e(L,{name:"remember",value:m.remember,onChange:d}),e("span",{className:"ml-2 text-sm text-gray-600",children:"Remember me"})]})}),e("div",{className:"flex items-center justify-end mt-4",children:e(R,{type:"submit",className:"ml-4",disabled:a,children:"Log in"})})]})}),e(C,{className:"flex justify-between"})]})})]})]})}export{z as default};