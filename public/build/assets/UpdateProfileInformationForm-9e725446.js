import{W as d,_ as b,a,j as e}from"./app-35486303.js";import{I as m}from"./InputError-a7b3b63c.js";import{I as l}from"./InputLabel-f58801a2.js";import{T as n}from"./TextInput-ba3a0fa1.js";function F({mustVerifyEmail:p,status:h,className:o}){const t=d().props.auth.user,{data:r,setData:i,patch:c,errors:s,processing:f,recentlySuccessful:v}=b({username:t.username,name:t.employee.nama_karyawan,jabatan:t.employee.jabatan,branch:t.employee.branch.unit,email:t.email});return a("section",{className:o,children:[a("header",{children:[e("h2",{className:"text-lg font-medium text-gray-900",children:"Profile Information"}),e("p",{className:"mt-1 text-sm text-gray-600",children:"Update your account's profile information and email address."})]}),a("form",{onSubmit:u=>{u.preventDefault(),c(route("profile.update"))},className:"mt-6 space-y-6",children:[a("div",{children:[e(l,{htmlFor:"username",value:"Username"}),e(n,{id:"username",disabled:!0,className:"mt-1 block w-full",value:r.username,required:!0,isFocused:!0,autoComplete:"username"}),e(m,{className:"mt-2",message:s.name})]}),a("div",{children:[e(l,{htmlFor:"name",value:"Name"}),e(n,{id:"name",disabled:!0,className:"mt-1 block w-full",value:r.name,onChange:u=>i("name",u.target.value),required:!0,isFocused:!0,autoComplete:"name"}),e(m,{className:"mt-2",message:s.name})]}),a("div",{children:[e(l,{htmlFor:"branch",value:"Cabang"}),e(n,{id:"branch",disabled:!0,className:"mt-1 block w-full",value:r.branch,required:!0,isFocused:!0,autoComplete:"branch"}),e(m,{className:"mt-2",message:s.branch})]}),a("div",{children:[e(l,{htmlFor:"jabatan",value:"Jabatan"}),e(n,{id:"jabatan",disabled:!0,className:"mt-1 block w-full",value:r.jabatan,required:!0,isFocused:!0,autoComplete:"jabatan"}),e(m,{className:"mt-2",message:s.jabatan})]})]})]})}export{F as default};
