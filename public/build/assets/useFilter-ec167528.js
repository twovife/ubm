import{r}from"./app-577095aa.js";function x(f,l,u){const d=localStorage.getItem(u),{oldFilter:k,oldPage:p}=d?JSON.parse(d):{oldFilter:[],oldPage:1},[S,h]=r.useState(!1),[n,g]=r.useState(k),[D,w]=r.useState({}),[y,_]=r.useState([]),[o,c]=r.useState(p),[C,L]=r.useState(0);r.useEffect(()=>{const e=t=>{t.target.classList.contains("filterthis")&&(h(!0),w({name:t.target.getAttribute("data-name"),data_type:t.target.getAttribute("data-type")}))};return window.addEventListener("click",e),()=>{window.removeEventListener("click",e)}},[]);const v=e=>{n.some(a=>a.name===e.name&&a.search_key.toLowerCase()===e.search_key.toLowerCase())||g([...n,{...e,id:n.length+1}]),c(1)},E=e=>{g(t=>t.filter(a=>a.id!==e)),c(1)},A=(e,t)=>t.length===0?e:e.filter(a=>t.every(s=>{switch(s.operator){case 2:return a[s.name]==s.search_key;case 4:return a[s.name]>s.search_key;case 5:return a[s.name]<s.search_key;case 1:return s.data_type==="text"?a[s.name].toLowerCase().includes(s.search_key.toLowerCase()):a[s.name].includes(s.search_key);default:return e}})),F=(e,t)=>{const a=A(e,t);return L(Math.ceil(a.length/l)),a.slice((o-1)*l,o*l)};r.useEffect(()=>{const e=F(f,n);_(e),localStorage.setItem(u,JSON.stringify({oldFilter:n,oldPage:o}))},[o,n]);const P=e=>{c(e)};let i={};return y.forEach(e=>{for(let t in e)t!=="wilayah"&&t!=="bulan"&&(i[t]=(parseInt(i[t])||0)+parseInt(e[t]))}),{showFilter:S,setShowFilter:h,filter:n,whenFilterrAdding:v,addFilter:D,setAddFilter:w,removeFilter:E,returnedData:y,totalPages:C,currentPage:o,displayData:F,handlePageChange:P,setCurrentPage:c,totals:i}}export{x as u};
