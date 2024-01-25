import{R as z,r as M}from"./app-e7588a7f.js";function ve(e,r){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&r.indexOf(n)<0&&(a[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,n=Object.getOwnPropertySymbols(e);t<n.length;t++)r.indexOf(n[t])<0&&Object.prototype.propertyIsEnumerable.call(e,n[t])&&(a[n[t]]=e[n[t]]);return a}var Y;(function(e){e.event="event",e.props="prop"})(Y||(Y={}));function W(){}function ee(e){return!!(e||"").match(/\d/)}function X(e){return e==null}function se(e){return typeof e=="number"&&isNaN(e)}function ce(e){return e.replace(/[-[\]/{}()*+?.\\^$|]/g,"\\$&")}function De(e){switch(e){case"lakh":return/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g;case"wan":return/(\d)(?=(\d{4})+(?!\d))/g;case"thousand":default:return/(\d)(?=(\d{3})+(?!\d))/g}}function Ve(e,r,a){var n=De(a),t=e.search(/[1-9]/);return t=t===-1?e.length:t,e.substring(0,t)+e.substring(t,e.length).replace(n,"$1"+r)}function Ce(e){var r=M.useRef(e);r.current=e;var a=M.useRef(function(){for(var n=[],t=arguments.length;t--;)n[t]=arguments[t];return r.current.apply(r,n)});return a.current}function te(e,r){r===void 0&&(r=!0);var a=e[0]==="-",n=a&&r;e=e.replace("-","");var t=e.split("."),i=t[0],u=t[1]||"";return{beforeDecimal:i,afterDecimal:u,hasNegation:a,addNegation:n}}function Ie(e){if(!e)return e;var r=e[0]==="-";r&&(e=e.substring(1,e.length));var a=e.split("."),n=a[0].replace(/^0+/,"")||"0",t=a[1]||"";return(r?"-":"")+n+(t?"."+t:"")}function de(e,r,a){for(var n="",t=a?"0":"",i=0;i<=r-1;i++)n+=e[i]||t;return n}function ie(e,r){return Array(r+1).join(e)}function ge(e){var r=e+"",a=r[0]==="-"?"-":"";a&&(r=r.substring(1));var n=r.split(/[eE]/g),t=n[0],i=n[1];if(i=Number(i),!i)return a+t;t=t.replace(".","");var u=1+i,d=t.length;return u<0?t="0."+ie("0",Math.abs(u))+t:u>=d?t=t+ie("0",u-d):t=(t.substring(0,u)||"0")+"."+t.substring(u),a+t}function oe(e,r,a){if(["","-"].indexOf(e)!==-1)return e;var n=(e.indexOf(".")!==-1||a)&&r,t=te(e),i=t.beforeDecimal,u=t.afterDecimal,d=t.hasNegation,p=parseFloat("0."+(u||"0")),b=u.length<=r?"0."+u:p.toFixed(r),S=b.split("."),s=i.split("").reverse().reduce(function(g,V,R){return g.length>R?(Number(g[0])+Number(V)).toString()+g.substring(1,g.length):V+g},S[0]),l=de(S[1]||"",r,a),c=d?"-":"",h=n?".":"";return""+c+s+h+l}function Z(e,r){if(e.value=e.value,e!==null){if(e.createTextRange){var a=e.createTextRange();return a.move("character",r),a.select(),!0}return e.selectionStart||e.selectionStart===0?(e.focus(),e.setSelectionRange(r,r),!0):(e.focus(),!1)}}function Re(e,r){for(var a=0,n=0,t=e.length,i=r.length;e[a]===r[a]&&a<t;)a++;for(;e[t-1-n]===r[i-1-n]&&i-n>a&&t-n>a;)n++;return{from:{start:a,end:t-n},to:{start:a,end:i-n}}}function Be(e,r,a){return Math.min(Math.max(e,r),a)}function fe(e){return Math.max(e.selectionStart,e.selectionEnd)}function Te(){return typeof navigator<"u"&&!(navigator.platform&&/iPhone|iPod/.test(navigator.platform))}function Oe(e){return{from:{start:0,end:0},to:{start:0,end:e.length},lastValue:""}}function Ae(e,r,a,n,t,i){var u=t.findIndex(function(F){return F}),d=e.slice(0,u);!r&&!a.startsWith(d)&&(a=d+a,n=n+d.length);for(var p=a.length,b=e.length,S={},s=new Array(p),l=0;l<p;l++){s[l]=-1;for(var c=0,h=b;c<h;c++)if(a[l]===e[c]&&S[c]!==!0){s[l]=c,S[c]=!0;break}}for(var g=n;g<p&&(s[g]===-1||!i(a[g]));)g++;var V=g===p||s[g]===-1?b:s[g];for(g=n-1;g>0&&s[g]===-1;)g--;var R=g===-1||s[g]===-1?0:s[g]+1;return R>V?V:n-R<V-n?R:V}function ue(e,r,a,n){var t=e.length;if(r=Be(r,0,t),n==="left"){for(;r>=0&&!a[r];)r--;r===-1&&(r=a.indexOf(!0))}else{for(;r<=t&&!a[r];)r++;r>t&&(r=a.lastIndexOf(!0))}return r===-1&&(r=t),r}function Ee(e){for(var r=Array.from({length:e.length+1}).map(function(){return!0}),a=0,n=r.length;a<n;a++)r[a]=Boolean(ee(e[a])||ee(e[a-1]));return r}function me(e,r,a,n,t,i){i===void 0&&(i=W);var u=M.useRef(),d=Ce(function(l){var c,h;return X(l)||se(l)?(h="",c=""):typeof l=="number"||a?(h=typeof l=="number"?ge(l):l,c=n(h)):(h=t(l,void 0),c=l),{formattedValue:c,numAsString:h}}),p=M.useState(function(){return d(r)}),b=p[0],S=p[1],s=function(l,c){S({formattedValue:l.formattedValue,numAsString:l.value}),i(l,c)};return M.useMemo(function(){X(e)?u.current=void 0:(u.current=d(e),S(u.current))},[e,d]),[b,s]}function Fe(e){return e.replace(/[^0-9]/g,"")}function _e(e){return e}function Me(e){var r=e.type;r===void 0&&(r="text");var a=e.displayType;a===void 0&&(a="input");var n=e.customInput,t=e.renderText,i=e.getInputRef,u=e.format;u===void 0&&(u=_e);var d=e.removeFormatting;d===void 0&&(d=Fe);var p=e.defaultValue,b=e.valueIsNumericString,S=e.onValueChange,s=e.isAllowed,l=e.onChange;l===void 0&&(l=W);var c=e.onKeyDown;c===void 0&&(c=W);var h=e.onMouseUp;h===void 0&&(h=W);var g=e.onFocus;g===void 0&&(g=W);var V=e.onBlur;V===void 0&&(V=W);var R=e.value,F=e.getCaretBoundary;F===void 0&&(F=Ee);var j=e.isValidInputCharacter;j===void 0&&(j=ee);var k=ve(e,["type","displayType","customInput","renderText","getInputRef","format","removeFormatting","defaultValue","valueIsNumericString","onValueChange","isAllowed","onChange","onKeyDown","onMouseUp","onFocus","onBlur","value","getCaretBoundary","isValidInputCharacter"]),$=me(R,p,Boolean(b),u,d,S),H=$[0],C=H.formattedValue,q=H.numAsString,K=$[1],L=M.useRef(),m=function(o,f){L.current=o.formattedValue,K(o,f)};M.useEffect(function(){var o=u(q);if(L.current===void 0||o!==L.current){var f=G.current,v=d(o,void 0);U({formattedValue:o,numAsString:v,input:f,setCaretPosition:!0,source:Y.props,event:void 0})}});var x=M.useState(!1),A=x[0],T=x[1],G=M.useRef(null),I=M.useRef({setCaretTimeout:null,focusTimeout:null});M.useEffect(function(){return T(!0),function(){clearTimeout(I.current.setCaretTimeout),clearTimeout(I.current.focusTimeout)}},[]);var _=u,P=function(o,f){var v=parseFloat(f);return{formattedValue:o,value:f,floatValue:isNaN(v)?void 0:v}},E=function(o,f,v){Z(o,f),I.current.setCaretTimeout=setTimeout(function(){o.value===v&&Z(o,f)},0)},B=function(o,f,v){return ue(o,f,F(o),v)},J=function(o,f,v){var y=F(f),N=Ae(f,C,o,v,y,j);return N=ue(f,N,y),N},U=function(o){var f=o.formattedValue;f===void 0&&(f="");var v=o.input,y=o.setCaretPosition;y===void 0&&(y=!0);var N=o.source,w=o.event,D=o.numAsString,O=o.caretPos;if(v){if(O===void 0&&y){var Q=o.inputValue||v.value,ae=fe(v);v.value=f,O=J(Q,f,ae)}v.value=f,y&&O!==void 0&&E(v,O,f)}f!==C&&m(P(f,D),{event:w,source:N})},he=function(o,f,v){var y=Re(C,o),N=Object.assign(Object.assign({},y),{lastValue:C}),w=d(o,N),D=_(w);if(w=d(D,void 0),s&&!s(P(D,w))){var O=f.target,Q=fe(O),ae=J(o,C,Q);return E(O,ae,C),!1}return U({formattedValue:D,numAsString:w,inputValue:o,event:f,source:v,setCaretPosition:!0,input:f.target}),!0},Se=function(o){var f=o.target,v=f.value,y=he(v,o,Y.event);y&&l(o)},xe=function(o){var f=o.target,v=o.key,y=f.selectionStart,N=f.selectionEnd,w=f.value;w===void 0&&(w="");var D;if(v==="ArrowLeft"||v==="Backspace"?D=Math.max(y-1,0):v==="ArrowRight"?D=Math.min(y+1,w.length):v==="Delete"&&(D=y),D===void 0||y!==N){c(o);return}var O=D;if(v==="ArrowLeft"||v==="ArrowRight"){var Q=v==="ArrowLeft"?"left":"right";O=B(w,D,Q)}else v==="Delete"&&!j(w[D])?O=B(w,D,"right"):v==="Backspace"&&!j(w[D])&&(O=B(w,D,"left"));O!==D&&E(f,O,w),o.isUnitTestRun&&E(f,O,w),c(o)},pe=function(o){var f=o.target,v=f.selectionStart,y=f.selectionEnd,N=f.value;if(N===void 0&&(N=""),v===y){var w=B(N,v);w!==v&&E(f,w,N)}h(o)},we=function(o){o.persist&&o.persist();var f=o.target;G.current=f,I.current.focusTimeout=setTimeout(function(){var v=f.selectionStart,y=f.selectionEnd,N=f.value;N===void 0&&(N="");var w=B(N,v);w!==v&&!(v===0&&y===N.length)&&E(f,w,N),g(o)},0)},be=function(o){G.current=null,clearTimeout(I.current.focusTimeout),clearTimeout(I.current.setCaretTimeout),V(o)},ye=A&&Te()?"numeric":void 0,ne=Object.assign({inputMode:ye},k,{type:r,value:C,onChange:Se,onKeyDown:xe,onMouseUp:pe,onFocus:we,onBlur:be});if(a==="text")return t?z.createElement(z.Fragment,null,t(C,k)||null):z.createElement("span",Object.assign({},k,{ref:i}),C);if(n){var Ne=n;return z.createElement(Ne,Object.assign({},ne,{ref:i}))}return z.createElement("input",Object.assign({},ne,{ref:i}))}function le(e,r){var a=r.decimalScale,n=r.fixedDecimalScale,t=r.prefix;t===void 0&&(t="");var i=r.suffix;i===void 0&&(i="");var u=r.allowNegative,d=r.thousandsGroupStyle;if(d===void 0&&(d="thousand"),e===""||e==="-")return e;var p=re(r),b=p.thousandSeparator,S=p.decimalSeparator,s=a!==0&&e.indexOf(".")!==-1||a&&n,l=te(e,u),c=l.beforeDecimal,h=l.afterDecimal,g=l.addNegation;return a!==void 0&&(h=de(h,a,!!n)),b&&(c=Ve(c,b,d)),t&&(c=t+c),i&&(h=h+i),g&&(c="-"+c),e=c+(s&&S||"")+h,e}function re(e){var r=e.decimalSeparator;r===void 0&&(r=".");var a=e.thousandSeparator,n=e.allowedDecimalSeparators;return a===!0&&(a=","),n||(n=[r,"."]),{decimalSeparator:r,thousandSeparator:a,allowedDecimalSeparators:n}}function je(e,r){e===void 0&&(e="");var a=new RegExp("(-)"),n=new RegExp("(-)(.)*(-)"),t=a.test(e),i=n.test(e);return e=e.replace(/-/g,""),t&&!i&&r&&(e="-"+e),e}function ke(e,r){return new RegExp("(^-)|[0-9]|"+ce(e),r?"g":void 0)}function Le(e,r,a){var n;r===void 0&&(r=Oe(e));var t=a.allowNegative,i=a.prefix;i===void 0&&(i="");var u=a.suffix;u===void 0&&(u="");var d=a.decimalScale,p=r.from,b=r.to,S=b.start,s=b.end,l=re(a),c=l.allowedDecimalSeparators,h=l.decimalSeparator,g=e[s]===h;if(ee(e)&&(e===i||e===u)&&r.lastValue==="")return e;if(s-S===1&&c.indexOf(e[S])!==-1){var V=d===0?"":h;e=e.substring(0,S)+V+e.substring(S+1,e.length)}var R=function(_,P,E){var B=!1,J=!1;i.startsWith("-")?B=!1:_.startsWith("--")?(B=!1,J=!0):u.startsWith("-")&&_.length===u.length?B=!1:_[0]==="-"&&(B=!0);var U=B?1:0;return J&&(U=2),U&&(_=_.substring(U),P-=U,E-=U),{value:_,start:P,end:E,hasNegation:B}},F=R(e,S,s),j=F.hasNegation;n=F,e=n.value,S=n.start,s=n.end;var k=R(r.lastValue,p.start,p.end),$=k.start,H=k.end,C=k.value,q=e.substring(S,s);e.length&&C.length&&($>C.length-u.length||H<i.length)&&!(q&&u.startsWith(q))&&(e=C);var K=0;e.startsWith(i)?K+=i.length:S<i.length&&(K=S),e=e.substring(K),s-=K;var L=e.length,m=e.length-u.length;e.endsWith(u)?L=m:(s>m||s>e.length-u.length)&&(L=s),e=e.substring(0,L),e=je(j?"-"+e:e,t),e=(e.match(ke(h,!0))||[]).join("");var x=e.indexOf(h);e=e.replace(new RegExp(ce(h),"g"),function(_,P){return P===x?".":""});var A=te(e,t),T=A.beforeDecimal,G=A.afterDecimal,I=A.addNegation;return b.end-b.start<p.end-p.start&&T===""&&g&&!parseFloat(G)&&(e=I?"-":""),e}function Pe(e,r){var a=r.prefix;a===void 0&&(a="");var n=r.suffix;n===void 0&&(n="");var t=Array.from({length:e.length+1}).map(function(){return!0}),i=e[0]==="-";t.fill(!1,0,a.length+(i?1:0));var u=e.length;return t.fill(!1,u-n.length+1,u+1),t}function Ke(e){var r=re(e),a=r.thousandSeparator,n=r.decimalSeparator,t=e.prefix;t===void 0&&(t="");var i=e.allowNegative;if(i===void 0&&(i=!0),a===n)throw new Error(`
        Decimal separator can't be same as thousand separator.
        thousandSeparator: `+a+` (thousandSeparator = {true} is same as thousandSeparator = ",")
        decimalSeparator: `+n+` (default value for decimalSeparator is .)
     `);return t.startsWith("-")&&i&&(console.error(`
      Prefix can't start with '-' when allowNegative is true.
      prefix: `+t+`
      allowNegative: `+i+`
    `),i=!1),Object.assign(Object.assign({},e),{allowNegative:i})}function Ue(e){e=Ke(e);var r=e.decimalSeparator;r===void 0&&(r="."),e.allowedDecimalSeparators,e.thousandsGroupStyle,e.suffix;var a=e.allowNegative,n=e.allowLeadingZeros,t=e.onKeyDown;t===void 0&&(t=W);var i=e.onBlur;i===void 0&&(i=W);var u=e.thousandSeparator,d=e.decimalScale,p=e.fixedDecimalScale,b=e.prefix;b===void 0&&(b="");var S=e.defaultValue,s=e.value,l=e.valueIsNumericString,c=e.onValueChange,h=ve(e,["decimalSeparator","allowedDecimalSeparators","thousandsGroupStyle","suffix","allowNegative","allowLeadingZeros","onKeyDown","onBlur","thousandSeparator","decimalScale","fixedDecimalScale","prefix","defaultValue","value","valueIsNumericString","onValueChange"]),g=function(m){return le(m,e)},V=function(m,x){return Le(m,x,e)},R=l;X(s)?X(S)||(R=l??typeof S=="number"):R=l??typeof s=="number";var F=function(m){return X(m)||se(m)?m:(typeof m=="number"&&(m=ge(m)),R&&typeof d=="number"?oe(m,d,Boolean(p)):m)},j=me(F(s),F(S),Boolean(R),g,V,c),k=j[0],$=k.numAsString,H=k.formattedValue,C=j[1],q=function(m){var x=m.target,A=m.key,T=x.selectionStart,G=x.selectionEnd,I=x.value;if(I===void 0&&(I=""),T!==G){t(m);return}A==="Backspace"&&I[0]==="-"&&T===b.length+1&&a&&Z(x,1);var _=re(e),P=_.decimalSeparator,E=_.allowedDecimalSeparators;A==="Backspace"&&I[T-1]===P&&d&&p&&(Z(x,T-1),m.preventDefault()),E!=null&&E.includes(A)&&I[T]===P&&Z(x,T+1);var B=u===!0?",":u;A==="Backspace"&&I[T-1]===B&&Z(x,T-1),A==="Delete"&&I[T]===B&&Z(x,T+1),t(m)},K=function(m){var x=$;if(x.match(/\d/g)||(x=""),n||(x=Ie(x)),p&&d&&(x=oe(x,d,p)),x!==$){var A=le(x,e);C({formattedValue:A,value:x,floatValue:parseFloat(x)},{event:m,source:Y.event})}i(m)},L=function(m){return m===r?!0:ee(m)};return Object.assign(Object.assign({},h),{value:H,valueIsNumericString:!1,isValidInputCharacter:L,onValueChange:C,format:g,removeFormatting:V,getCaretBoundary:function(m){return Pe(m,e)},onKeyDown:q,onBlur:K})}function $e(e){var r=Ue(e);return z.createElement(Me,Object.assign({},r))}export{$e as N};