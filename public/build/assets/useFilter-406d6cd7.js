import{j as r,r as h}from"./app-5ed665f7.js";const g=({children:t})=>r("div",{className:"overflow-auto max-h-[60vh] lg:max-h-[70vh]",children:r("table",{className:"w-full divide-y divide-gray-200 text-xs lg:text-sm relative z-0",children:t})}),P=({children:t})=>r("thead",{className:"sticky top-0 left-0 z-10",children:r("tr",{className:"bg-gray-300 shadow-sm",children:t})}),A=({children:t})=>r("tbody",{className:"divide-y divide-gray-200 relative z-0 text-gray-700 text-xs",children:t}),$=({className:t,children:n})=>r("tr",{className:`odd:bg-white even:bg-gray-100 hover:bg-roman-50/50 group ${t}`,children:n}),j=({nested:t=!1,children:n,noSpace:l,className:c})=>{let i=[];return t?i.push(r("td",{className:"px-3 py-1.5 sticky left-0 top-0 z-10 bg-inherit",children:r("div",{className:"grid grid-cols-5 gap-1",children:n})},1)):i.push(r("td",{scope:"col",className:`px-3 py-1.5 group-hover:bg-inherit ${l?" whitespace-nowrap ":""} ${c}  `,children:n},2)),i},J=(t,n)=>{let l=[];return t.forEach((c,i)=>{c.filterable=="no"?l.push(r("div",{className:"col-span-1 px-6 py-1.5 text-center",children:c.name},i)):c.filterable=="yes"&&l.push(r("div",{className:"col-span-4 px-6 py-1.5 filterthis hover:cursor-pointer hover:bg-gray-500 hover:text-white text-center","data-type":c.type_date,"data-name":c.column,children:c.name},i))}),r("th",{scope:"col",className:`${n?"sticky":""} left-0 top-0 z-10 bg-inherit `,children:r("div",{className:"grid grid-cols-5 gap-1 lg:w-[20vw] w-[40vw] ",children:l})})},O=t=>t.filterable=="yes"?r("th",{scope:"col",className:"px-6 py-1.5 whitespace-nowrap filterthis hover:cursor-pointer hover:bg-gray-500 hover:text-white text-center","data-type":t.type_date,"data-name":t.column,children:t.name}):r("th",{scope:"col",className:"px-6 py-1.5 whitespace-nowrap text-center",children:t.name}),B=({type:t,sticky:n=!1,headers:l})=>t=="nested"?J(l,n):O(l);g.thead=P;g.th=B;g.td=j;g.tr=$;g.tbody=A;function R(t,n,l){const c=localStorage.getItem(l),i={oldFilter:[],oldPage:1};let d;try{d=JSON.parse(c),(!d||typeof d!="object"||!("oldFilter"in d)||!("oldPage"in d))&&(d=i)}catch{d=i}const{oldFilter:N,oldPage:F}=d,[k,v]=h.useState(!1),[u,w]=h.useState(N),[S,b]=h.useState({}),[x,D]=h.useState([]),[p,y]=h.useState(F),[_,T]=h.useState(0);h.useEffect(()=>{const e=a=>{a.target.classList.contains("filterthis")&&(v(!0),b({name:a.target.getAttribute("data-name"),data_type:a.target.getAttribute("data-type")}))};return window.addEventListener("click",e),()=>{window.removeEventListener("click",e)}},[]);const C=e=>{u.some(s=>s.name===e.name&&s.search_key.toLowerCase()===e.search_key.toLowerCase())||w([...u,{...e,id:u.length+1}]),y(1)},E=e=>{w(a=>a.filter(s=>s.id!==e)),y(1)},L=(e,a)=>a.length===0?e:e.filter(s=>a.every(o=>{switch(o.operator){case 2:return s[o.name]==o.search_key;case 4:return s[o.name]>o.search_key;case 5:return s[o.name]<o.search_key;case 1:return o.data_type==="text"?s[o.name].toLowerCase().includes(o.search_key.toLowerCase()):s[o.name].includes(o.search_key);default:return e}})),m=(e,a)=>{const s=L(e,a);return T(Math.ceil(s.length/n)),s.slice((p-1)*n,p*n)};h.useEffect(()=>{const e=m(t,u);D(e),localStorage.setItem(l,JSON.stringify({oldFilter:u,oldPage:p}))},[p,u]);const z=e=>{y(e)};let f={};return x.forEach(e=>{for(let a in e)a!=="wilayah"&&a!=="bulan"&&(f[a]=(parseInt(f[a])||0)+parseInt(e[a]??0))}),{showFilter:k,setShowFilter:v,filter:u,whenFilterrAdding:C,addFilter:S,setAddFilter:b,removeFilter:E,returnedData:x,totalPages:_,currentPage:p,displayData:m,handlePageChange:z,setCurrentPage:y,totals:f}}export{g as D,R as u};