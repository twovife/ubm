import{W as w,r as d}from"./app-577095aa.js";function F(){const{server_filter:a}=w().props,[s,y]=d.useState((a==null?void 0:a.wilayah)??""),[n,c]=d.useState((a==null?void 0:a.branch_id)??""),[u,h]=d.useState((a==null?void 0:a.bulan)??""),[o,p]=d.useState((a==null?void 0:a.employee_id)??""),W=[{id:0,display:"Pusat",value:0},{id:1,display:"Wilayah 1",value:1},{id:2,display:"Wilayah 2",value:2},{id:3,display:"Wilayah 3",value:3},{id:4,display:"Wilayah 4",value:4},{id:5,display:"Wilayah 5",value:5},{id:6,display:"Wilayah 6",value:6},{id:7,display:"Wilayah 7",value:7},{id:8,display:"Wilayah 8",value:8},{id:9,display:"Wilayah 9",value:9},{id:10,display:"Wilayah 10",value:10}],[r,S]=d.useState(),[g,B]=d.useState(),E=t=>{const{value:l}=t.target;y(l)},b=t=>{const{value:l}=t.target;c(l)};return d.useEffect(()=>{var l,i;const t=s!==""?(i=(l=a==null?void 0:a.branch)==null?void 0:l.filter(e=>e.wilayah==s))==null?void 0:i.map(e=>({id:e.id,display:e.unit,value:e.id,wilayah:e.wilayah})):"";S(t)},[s]),d.useEffect(()=>{var l,i;const t=n!==""?(i=(l=a==null?void 0:a.employees)==null?void 0:l.filter(e=>e.branch_id==n))==null?void 0:i.map(e=>({id:e.id,display:`${e.nama_karyawan} ${e.date_resign?" - Resign":""} `,value:e.id,className:e.date_resign?"bg-red-200":""})):"";B(t)},[n]),{selectedWilayah:s,setSelectedWilayah:y,selectedBranch_id:n,setSelectedBranch_id:c,selectedEmployee:o,setSelectedEmployee:p,selectedBulan:u,setSelectedBulan:h,wilayah:W,filteredBranch:r,filteredEmps:g,onWilayahChangeHandler:E,onBranchChangeHandler:b}}export{F as u};
