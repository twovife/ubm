import{r,a as e,j as a,d as S}from"./app-0b5f1112.js";import{A as _,C as Y,B as j}from"./AuthenticatedLayout-76bbb813.js";import{d as n}from"./dayjs.min-068b8e04.js";import{N as c}from"./react-number-format.es-04b13629.js";import P from"./Perpindahan-74519b9c.js";import D from"./PengembalianJaminan-3f95fc3a.js";import M from"./Edit-15972a6f.js";import{L as K}from"./LinkButton-7d61b3bc.js";import"./transition-7051d0f9.js";import"./Loading-9e25d30e.js";import"./iconBase-88429f7d.js";import"./index.esm-873aad8d.js";import"./index.esm-ad7e6b0e.js";import"./InputLabel-c173db8f.js";import"./SelectList-a39251a6.js";import"./Mutasi-b048f4ae.js";import"./InputError-8fa33d66.js";import"./PrimaryButton-15ae1d1a.js";import"./TextInput-67fb2e62.js";import"./useServerFilter-89952a47.js";import"./Resign-e5a8dda8.js";import"./Kembali-b84f566c.js";const ea=({employee:s,deposit_sksw:l,branches:B,...m})=>{var p,g,u,v;const[f,i]=r.useState(!1),[h,w]=r.useState(!1),d=()=>{w(!h)},[o,k]=r.useState(!1),x=()=>{k(!o)},[b,y]=r.useState(!1),N=()=>{y(!b)};return e(_,{loading:f,children:[a(Y,{judul:"Profil Karyawan",button:a(K,{title:"back",href:route("emp.index",[{wilayah:m.back_params.wilayah,branch_id:m.back_params.branch_id}])}),children:e("div",{className:"lg:flex mt-2 gap-3",children:[a("div",{className:"flex-1",children:e("div",{className:"p-2",children:[a("div",{className:"rounded-full border bg-red-400 h-32 w-32 mx-auto flex items-center justify-center overflow-hidden text-white mb-3",children:a(j,{className:"w-full h-full"})}),e("div",{className:"flex gap-3 mb-3 items-center justify-center",children:[s.resign_status==null||s.resign_status==""?e("span",{className:"inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full",children:[a("span",{className:"w-2 h-2 me-1 bg-green-500 rounded-full mr-1"}),"Active"]}):s.resign_status=="Resign"?e("span",{className:"inline-flex items-center bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full",children:[a("span",{className:"w-2 h-2 me-1 bg-yellow-500 rounded-full mr-1"}),"Resign"]}):e("span",{className:"inline-flex items-center bg-black text-white text-xs font-medium px-2.5 py-0.5 rounded-full",children:[a("span",{className:"w-2 h-2 me-1 bg-white rounded-full mr-1"}),"Pecat"]}),s.janis_jaminan==""||s.janis_jaminan==null?e("span",{className:"inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full",children:[a("span",{className:"w-2 h-2 me-1 bg-blue-500 rounded-full mr-1"}),"Jaminan Belum Lengkap"]}):""]}),e("div",{className:"rounded-md shadow p-3 border space-y-3 mb-3 text-sm",children:[e("div",{className:"text-end space-x-2",children:[a("button",{onClick:d,className:"text-xs bg-roman-400 hover:bg-roman-600 text-white px-2 py-1 rounded ring ring-roman-200 hover:ring-roman-400",children:"Pindah Karyawan"}),a("button",{onClick:N,className:"text-xs border border-green-400 hover:bg-green-600 text-green-500 hover:text-white px-2 py-1 rounded ring ring-green-100 hover:ring-green-300",children:"Edit Profil"})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Nama"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:s.nama_karyawan})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"NIK"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:s.nik})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Alamat"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all text-xs",children:s.alamat})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Tanggal Masuk"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:n(s.hire_date).format("DD-MM-YYYY")})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Jabatan"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:s.jabatan=="mantri"?`${s.jabatan} ${s.area}`:s.jabatan})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Unit"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:s.branch.unit})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Jenis Jaminan"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:s.janis_jaminan})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Status Kontrak"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:s.status_kontrak==1?a("span",{className:"text-red-500",children:"Cadangan"}):"Kontrak"})]})]}),s.date_resign&&e("div",{className:"rounded-md shadow p-3 border space-y-3 text-sm",children:[e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Tanggal Resign"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:n(s.date_resign).format("DD-MM-YYYY")})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Resign Status"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:s.resign_status})]}),e("div",{className:"flex gap-1",children:[a("div",{className:"basis-2/6 break-all",children:"Tanggal Resign"}),a("div",{className:"basis-1/6 text-center",children:":"}),a("div",{className:"basis-3/6 break-all",children:s.resign_reson})]})]})]})}),e("div",{className:"flex-[4]",children:[e("div",{className:"p-2 flex lg:flex-row flex-col gap-3",children:[e("div",{className:"border shadow rounded-md p-3 flex-1",children:[a("div",{className:"text-2xl font-semibold text-gray-400 mb-2",children:"SKSW"}),a("div",{className:"overflow-auto rounded",children:e("table",{className:"w-full border-2 shadow text-xs",children:[a("thead",{className:"bg-gray-200 text-center",children:e("tr",{children:[a("td",{className:"px-2 py-1",children:"Show"}),a("td",{className:"px-2 py-1",children:"Unit SKSW"}),a("td",{className:"px-2 py-1",children:"Saldo SK"}),a("td",{className:"px-2 py-1",children:"Saldo Sw"}),a("td",{className:"px-2 py-1",children:"Total Saldo"}),a("td",{className:"px-2 py-1",children:"Tanggal Terakhir Angsuran"})]})}),a("tbody",{className:"text-center",children:l!=null&&l.deposit_id?e("tr",{children:[a("td",{className:"px-2 py-1",children:a(S,{className:"bg-green-500 hover:bg-green-600 text-white p-1 rounded",href:route("sksw.transaksi",l.deposit_id),children:"Show"})}),a("td",{className:"px-2 py-1",children:l.unit}),a("td",{className:"px-2 py-1",children:a(c,{value:l.saldo_sk,displayType:"text",thousandSeparator:","})}),a("td",{className:"px-2 py-1",children:a(c,{value:l.saldo_sw,displayType:"text",thousandSeparator:","})}),a("td",{className:"px-2 py-1",children:a(c,{value:l.saldo_sw+l.saldo_sk,displayType:"text",thousandSeparator:","})}),a("td",{className:"px-2 py-1",children:l.max_tanggal?n(l.max_tanggal).format("DD-MM-YYYY"):"-"})]}):a("tr",{children:a("td",{colSpan:5,children:"Belum Ada SKSW"})})})]})})]}),e("div",{className:"border shadow rounded-md p-3 flex-1",children:[a("div",{className:"text-2xl font-semibold text-gray-400 mb-2",children:"History"}),a("div",{className:"overflow-auto rounded  max-h-[25vh] shadow",children:e("table",{className:"w-full border-2 shadow text-xs relative z-0",children:[a("thead",{className:"bg-gray-200 text-center sticky top-0 left-0 z-10 w-full",children:e("tr",{children:[a("td",{className:"px-2 py-1",children:"Tanggal"}),a("td",{className:"px-2 py-1",children:"Keterangan"}),a("td",{className:"px-2 py-1",children:"Record"})]})}),a("tbody",{className:"text-center",children:(p=s.histories)==null?void 0:p.map(t=>e("tr",{children:[a("td",{className:"px-2 py-1",children:n(t.history_date).format("DD/MM/YYYY")}),a("td",{className:"px-2 py-1",children:t.keterangan}),a("td",{className:"px-2 py-1",children:t.record})]}))})]})})]})]}),a("div",{className:"p-2",children:e("div",{className:"border shadow rounded-md p-3 flex-1",children:[e("div",{className:"flex justify-between items-center mb-2",children:[a("div",{className:"text-2xl font-semibold text-gray-400",children:"PENGAMBILAN"}),a("div",{children:a("button",{onClick:d,className:"text-xs bg-roman-400 hover:bg-roman-600 text-white px-2 py-1 rounded ring ring-roman-200 hover:ring-roman-400",children:"Pindah Karyawan"})})]}),a("div",{className:"overflow-auto rounded",children:e("table",{className:"w-full border-2 shadow text-xs",children:[a("thead",{className:"bg-gray-200 text-center",children:e("tr",{children:[a("td",{className:"px-2 py-1",children:"Pengambilan SW"}),a("td",{className:"px-2 py-1",children:"Petugas"}),a("td",{className:"px-2 py-1",children:"Pengambilan SK"}),a("td",{className:"px-2 py-1",children:"Petugas"}),a("td",{className:"px-2 py-1",children:"Pengembalian Jaminan"}),a("td",{className:"px-2 py-1",children:"Petugas"})]})}),a("tbody",{className:"text-center",children:e("tr",{children:[a("td",{className:"px-2 py-2",children:s.pencairan_simpanan_w_date?n(s.pencairan_simpanan_w_date).format("DD-MM-YYYY"):"SW belum Diambil"}),a("td",{className:"px-2 py-1",children:(g=s.ttdsw)==null?void 0:g.nama_karyawan}),a("td",{className:"px-2 py-1",children:s.pencairan_simpanan_date?n(s.pencairan_simpanan_date).format("DD-MM-YYYY"):"SK belum Diambil"}),a("td",{className:"px-2 py-1",children:(u=s.ttdss)==null?void 0:u.nama_karyawan}),a("td",{className:"px-2 py-1",children:s.handover_jaminan?n(s.handover_jaminan).format("DD-MM-YYYY"):s.janis_jaminan==""||s.janis_jaminan==null?e("span",{className:"inline-flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full",children:[a("span",{className:"w-2 h-2 me-1 bg-blue-500 rounded-full mr-1"}),"Jaminan Belum Lengkap"]}):a("button",{onClick:x,className:"text-xs bg-roman-400 hover:bg-roman-600 text-white px-2 py-1 rounded ring ring-roman-200 hover:ring-roman-400",children:"Pengembalian Jaminan"})}),a("td",{className:"px-2 py-1",children:(v=s.ttdjaminan)==null?void 0:v.nama_karyawan})]})})]})})]})})]})]})}),a(P,{show:h,setShow:d,isActive:s.resign_status===""||s.resign_status===null,setLoading:i}),a(M,{employee:s,show:b,setShow:N,setLoading:i}),a(D,{show:o,setShow:x,setLoading:i})]})};export{ea as default};
