import{j as y,d as c,a as u}from"./app-0a330f65.js";function p({title:b,href:s,type:d="submit",className:i="",processing:n,children:a,disabled:t,icon:l,size:g,theme:o="primary",...f}){let e="",r="px-4 py-2 text-xs";return o=="primary"?e="bg-main-500 disabled:hover:bg-main-800 hover:bg-main-700 focus:bg-main-600 active:bg-main-900 focus:ring-main-500 "+i:o=="secondary"?e="bg-gray-500 disabled:hover:bg-gray-800 hover:bg-gray-700 focus:bg-gray-600 active:bg-gray-900 focus:ring-gray-500 "+i:o=="green"?e="bg-green-500 disabled:hover:bg-green-800 hover:bg-green-700 focus:bg-green-600 active:bg-green-900 focus:ring-green-500 "+i:o=="red"?e="bg-red-500 disabled:hover:bg-red-800 hover:bg-red-700 focus:bg-red-600 active:bg-red-900 focus:ring-red-500 "+i:o=="yellow"?e="bg-yellow-500 disabled:hover:bg-yellow-800 hover:bg-yellow-700 focus:bg-yellow-600 active:bg-yellow-900 focus:ring-yellow-500 "+i:o=="base"?e="bg-main-500 disabled:hover:bg-main-500 hover:bg-main-600 focus:bg-main-600 active:bg-main-700 focus:ring-main-500 "+i:e="bg-white disabled:hover:bg-white border-gray-500 hover:bg-white focus:bg-white active:bg-white focus:ring-gray-500 "+i,g=="sm"?r="px-3 py-2 text-xs":g=="md"?r="px-4 py-2 text-xs":g=="lg"?r="px-6 py-3":g=="box-lg"?r="px-6 py-6":g=="box-md"?r="px-4 py-4":g=="box"?r="px-3 py-3":g=="box-sm"&&(r="px-1.5 py-1.5"),y(c,{href:s,as:d,...f,className:`disabled:cursor-not-allowed flex gap-2 items-center ${r} border border-transparent rounded-md font-semibold text-xs text-white tracking-widest focus:outline-none focus:ring-2 ${n&&"opacity-25"} transition ease-in-out duration-150 `+e,disabled:n||t,children:[l,a||b&&u("span",{children:a||b})]})}export{p as L};