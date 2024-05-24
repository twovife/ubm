import{j as x}from"./app-577095aa.js";function u({title:t,type:s="button",className:o="",processing:i,children:d,disabled:a,icon:l,size:b,active:n=!1,theme:g="primary",...f}){let e="",r="px-4 py-2 text-xs";return g=="primary"?e=`${n||a?"bg-roman-900":"bg-roman-500"} disabled:hover:bg-roman-800 hover:bg-roman-700 focus:bg-roman-600 focus:ring-roman-500 text-white border border-transparent`+o:g=="secondary"?e=`${n?"bg-gray-900":"bg-gray-500"} disabled:hover:bg-gray-800 hover:bg-gray-700 focus:bg-gray-600 focus:ring-gray-500 text-white border border-transparent`+o:g=="green"?e=`${n?"bg-green-900":"bg-green-500"} disabled:hover:bg-green-800 hover:bg-green-700 focus:bg-green-600 focus:ring-green-500 text-white border border-transparent`+o:g=="red"?e=`${n?"bg-red-900":"bg-red-500"} disabled:hover:bg-red-800 hover:bg-red-700 focus:bg-red-600 focus:ring-red-500 text-white border border-transparent`+o:g=="yellow"?e=`${n?"bg-yellow-900":"bg-yellow-500"} disabled:hover:bg-yellow-800 hover:bg-yellow-700 focus:bg-yellow-600 focus:ring-yellow-500 text-white border border-transparent`+o:g=="base"?e=`${n?"bg-main-900":"bg-main-500"} disabled:hover:bg-main-500 hover:bg-main-600 focus:bg-main-600 focus:ring-main-500 text-white border border-transparent`+o:e=`${n?"bg-white-900":"bg-white-500"} disabled:hover:bg-main-800 border border border-main-500 text-main-500 hover:text-white hover:bg-main-700 focus:bg-main-600 focus:ring-main-500 `+o,b=="sm"?r="px-3 py-2 text-xs":b=="md"?r="px-4 py-2 text-xs":b=="lg"?r="px-6 py-3":b=="xl"?r="px-6 py-3 text-xl":b=="box-lg"?r="px-6 py-6":b=="box-md"?r="px-4 py-4":b=="box"&&(r="px-3 py-3"),x("button",{...f,type:s,className:`disabled:cursor-not-allowed flex gap-2 items-center ${r} rounded-md font-semibold tracking-widest focus:outline-none focus:ring-2 ${i&&"opacity-25"} transition ease-in-out duration-150 `+e,disabled:i||a,children:[l,d||t&&(d||t)]})}export{u as P};
