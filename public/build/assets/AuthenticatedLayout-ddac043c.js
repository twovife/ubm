import{r as m,q as l,a as d,j as e}from"./app-df871abb.js";import{S as i,N as g,a as h}from"./Navbar-88a283a0.js";import{L as b}from"./Loading-0b0ba1ff.js";function x({header:f,children:o,loading:n=!1}){const[s,p]=m.useState(!1),a=()=>{p(!s)},{errors:r,flash:t,auth:c}=l().props;return d("div",{className:"min-h-screen relative bg-gray-50",children:[Object.keys(r).length>0&&e(i,{type:"error",message:r[0]}),t.message&&e(i,{type:"success",message:t.message}),e(b,{show:n}),e(g,{auth:c,toggleSidebar:a}),e(h,{isOpen:s,setIsopen:a}),e("div",{className:"relative py-2 px-4",children:e("main",{children:o})})]})}export{x as A};