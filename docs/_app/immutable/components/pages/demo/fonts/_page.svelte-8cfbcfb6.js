import{S as te,i as le,s as se,k as b,a as x,q as M,L as ve,l as z,h as m,c as I,m as S,r as A,n as g,p as Q,J as i,b as R,a7 as ge,O as Z,u as W,E as Ee,B as ee,D as ce,o as be,a8 as X,f as U,g as ue,d as de,t as K,M as pe,a9 as ze,w as he,x as me,y as ye,z as _e}from"../../../../chunks/index-4554a1e6.js";import{g as ke,d as Ce}from"../../../../chunks/transform-00e0e7dc.js";import{c as Se}from"../../../../chunks/shared-23917130.js";const Te=async l=>{if("clipboard"in navigator)await navigator.clipboard.writeText(l);else{const e=document.createElement("input");e.type="text",e.disabled=!0,e.style.setProperty("position","fixed"),e.style.setProperty("z-index","-100"),e.style.setProperty("pointer-events","none"),e.style.setProperty("opacity","0"),e.value=l,document.body.appendChild(e),e.click(),e.select(),document.execCommand("copy"),document.body.removeChild(e)}},we=(l,e)=>{async function n(){if(c)try{await Te(c),l.dispatchEvent(new CustomEvent("svelte-copy",{detail:c}))}catch(o){l.dispatchEvent(new CustomEvent("svelte-copy:error",{detail:o}))}}let t=typeof e=="string"?["click"]:[e.events].flat(1),c=typeof e=="string"?e:e.text;return t.forEach(o=>{l.addEventListener(o,n,!0)}),{update:o=>{const v=typeof o=="string"?["click"]:[o.events].flat(1),E=typeof o=="string"?o:o.text,y=v.filter(d=>!t.includes(d)),s=t.filter(d=>!v.includes(d));y.forEach(d=>{l.addEventListener(d,n,!0)}),s.forEach(d=>{l.removeEventListener(d,n,!0)}),t=v,c=E},destroy:()=>{t.forEach(o=>{l.removeEventListener(o,n,!0)})}}};function De(l){let e,n,t,c,o,v,E,y,s,d,a,r,p,T,w,j,L,B,q,D,F,P,H,V;return{c(){e=b("link"),n=x(),t=b("div"),c=b("h3"),o=M(l[0]),v=x(),E=b("p"),y=M(l[1]),s=x(),d=b("details"),a=b("summary"),r=M("CSS Snippet"),p=x(),T=b("code"),w=M(l[2]),j=x(),L=b("p"),B=b("button"),q=M("Copy CSS to Clipboard"),F=b("span"),P=M(l[3]),this.h()},l(C){const k=ve("svelte-1uevrx3",document.head);e=z(k,"LINK",{rel:!0,href:!0}),k.forEach(m),n=I(C),t=z(C,"DIV",{style:!0,class:!0});var u=S(t);c=z(u,"H3",{class:!0});var Y=S(c);o=A(Y,l[0]),Y.forEach(m),v=I(u),E=z(u,"P",{});var f=S(E);y=A(f,l[1]),f.forEach(m),s=I(u),d=z(u,"DETAILS",{class:!0});var h=S(d);a=z(h,"SUMMARY",{class:!0});var _=S(a);r=A(_,"CSS Snippet"),_.forEach(m),p=I(h),T=z(h,"CODE",{class:!0});var O=S(T);w=A(O,l[2]),O.forEach(m),h.forEach(m),j=I(u),L=z(u,"P",{});var G=S(L);B=z(G,"BUTTON",{class:!0});var N=S(B);q=A(N,"Copy CSS to Clipboard"),N.forEach(m),F=z(G,"SPAN",{class:!0});var J=S(F);P=A(J,l[3]),J.forEach(m),G.forEach(m),u.forEach(m),this.h()},h(){g(e,"rel","external stylesheet"),g(e,"href",l[5]),g(c,"class","svelte-19ry7n"),Q(E,"font-size",l[4]),g(a,"class","svelte-19ry7n"),g(T,"class","svelte-19ry7n"),g(d,"class","svelte-19ry7n"),g(B,"class","svelte-19ry7n"),g(F,"class","svelte-19ry7n"),Q(t,"font-family","'"+l[0]+"'"),g(t,"class","svelte-19ry7n")},m(C,k){i(document.head,e),R(C,n,k),R(C,t,k),i(t,c),i(c,o),i(t,v),i(t,E),i(E,y),i(t,s),i(t,d),i(d,a),i(a,r),i(d,p),i(d,T),i(T,w),i(t,j),i(t,L),i(L,B),i(B,q),i(L,F),i(F,P),H||(V=[ge(D=we.call(null,B,l[2])),Z(B,"svelte-copy",l[6])],H=!0)},p(C,[k]){k&1&&W(o,C[0]),k&2&&W(y,C[1]),k&16&&Q(E,"font-size",C[4]),k&4&&W(w,C[2]),D&&Ee(D.update)&&k&4&&D.update.call(null,C[2]),k&8&&W(P,C[3]),k&1&&Q(t,"font-family","'"+C[0]+"'")},i:ee,o:ee,d(C){m(e),C&&m(n),C&&m(t),H=!1,ce(V)}}}function Le(l,e,n){let t,{id:c=""}=e,{family:o=""}=e,{size:v=16}=e,{text:E}=e,y="",s="";const d=`${Se}/assets/demo/fonts/${c}.css`,a=()=>{n(3,s="Copied!"),setTimeout(()=>{n(3,s="")},1e3)};return be(async()=>{const r=await fetch(d);n(2,y=await r.text())}),l.$$set=r=>{"id"in r&&n(7,c=r.id),"family"in r&&n(0,o=r.family),"size"in r&&n(8,v=r.size),"text"in r&&n(1,E=r.text)},l.$$.update=()=>{l.$$.dirty&256&&n(4,t=`${v}px`)},[o,E,y,s,t,d,a,c,v]}class Pe extends te{constructor(e){super(),le(this,e,Le,De,se,{id:7,family:0,size:8,text:1})}}const xe=[{id:"atkinson",family:"Atkinson",type:"sans-serif"},{id:"atlas",family:"Atlas Grotesk",type:"sans-serif"},{id:"baloo-bhai",family:"Baloo Bhai",type:"sans-serif"},{id:"canela",family:"Canela",type:"serif"},{id:"computer-modern",family:"Computer Modern",type:"serif"},{id:"cozette",family:"Cozette",type:"other"},{id:"inter",family:"Inter",type:"sans-serif"},{id:"jamboree",family:"Jamboree",type:"other"},{id:"jersey",family:"Jersey M54",type:"other"},{id:"lyon",family:"Lyon Display",type:"serif"},{id:"metropolis",family:"Metropolis",type:"sans-serif"},{id:"national",family:"National 2 Web",type:"sans-serif"},{id:"publico",family:"Publico Text",type:"serif"},{id:"recoleta",family:"Recoleta",type:"serif"},{id:"rubik",family:"Rubik",type:"sans-serif"},{id:"spacemono",family:"Space Mono",type:"mono"},{id:"tiempos",family:"Tiempos Text",type:"serif"}];function ae(l,e,n){const t=l.slice();return t[5]=e[n][0],t[6]=e[n][1],t}function ie(l,e,n){const t=l.slice();return t[9]=e[n].family,t[10]=e[n].id,t}function re(l){let e,n;return e=new Pe({props:{id:l[10],family:l[9],size:l[0],text:l[1]}}),{c(){he(e.$$.fragment)},l(t){me(e.$$.fragment,t)},m(t,c){ye(e,t,c),n=!0},p(t,c){const o={};c&1&&(o.size=t[0]),c&2&&(o.text=t[1]),e.$set(o)},i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){K(e.$$.fragment,t),n=!1},d(t){_e(e,t)}}}function fe(l){let e,n=l[5]+"",t,c,o,v,E,y=l[6],s=[];for(let a=0;a<y.length;a+=1)s[a]=re(ie(l,y,a));const d=a=>K(s[a],1,1,()=>{s[a]=null});return{c(){e=b("h2"),t=M(n),c=x(),o=b("section");for(let a=0;a<s.length;a+=1)s[a].c();v=x(),this.h()},l(a){e=z(a,"H2",{});var r=S(e);t=A(r,n),r.forEach(m),c=I(a),o=z(a,"SECTION",{class:!0});var p=S(o);for(let T=0;T<s.length;T+=1)s[T].l(p);v=I(p),p.forEach(m),this.h()},h(){g(o,"class","svelte-1lzc8ku")},m(a,r){R(a,e,r),i(e,t),R(a,c,r),R(a,o,r);for(let p=0;p<s.length;p+=1)s[p].m(o,null);i(o,v),E=!0},p(a,r){if(r&7){y=a[6];let p;for(p=0;p<y.length;p+=1){const T=ie(a,y,p);s[p]?(s[p].p(T,r),U(s[p],1)):(s[p]=re(T),s[p].c(),U(s[p],1),s[p].m(o,v))}for(ue(),p=y.length;p<s.length;p+=1)d(p);de()}},i(a){if(!E){for(let r=0;r<y.length;r+=1)U(s[r]);E=!0}},o(a){s=s.filter(Boolean);for(let r=0;r<s.length;r+=1)K(s[r]);E=!1},d(a){a&&m(e),a&&m(c),a&&m(o),pe(s,a)}}}function Me(l){let e,n,t,c,o,v,E,y,s,d,a,r,p,T,w,j,L,B,q,D,F,P,H,V,C,k=l[2],u=[];for(let f=0;f<k.length;f+=1)u[f]=fe(ae(l,k,f));const Y=f=>K(u[f],1,1,()=>{u[f]=null});return{c(){e=b("div"),n=b("h1"),t=M("Hosted Fonts on The Pudding"),c=x(),o=b("p"),v=b("em"),E=M("Do not use fonts hosted by The Pudding without written permission."),y=x(),s=b("form"),d=b("label"),a=M("font-size: "),r=M(l[0]),p=M("px"),T=x(),w=b("input"),j=x(),L=b("label"),B=M("text sample"),q=x(),D=b("input"),F=x(),P=b("article");for(let f=0;f<u.length;f+=1)u[f].c();this.h()},l(f){e=z(f,"DIV",{id:!0,class:!0});var h=S(e);n=z(h,"H1",{});var _=S(n);t=A(_,"Hosted Fonts on The Pudding"),_.forEach(m),c=I(h),o=z(h,"P",{});var O=S(o);v=z(O,"EM",{});var G=S(v);E=A(G,"Do not use fonts hosted by The Pudding without written permission."),G.forEach(m),O.forEach(m),y=I(h),s=z(h,"FORM",{});var N=S(s);d=z(N,"LABEL",{for:!0,class:!0});var J=S(d);a=A(J,"font-size: "),r=A(J,l[0]),p=A(J,"px"),J.forEach(m),T=I(N),w=z(N,"INPUT",{id:!0,type:!0,min:!0,max:!0}),j=I(N),L=z(N,"LABEL",{for:!0,class:!0});var ne=S(L);B=A(ne,"text sample"),ne.forEach(m),q=I(N),D=z(N,"INPUT",{id:!0,type:!0,maxlength:!0}),N.forEach(m),h.forEach(m),F=I(f),P=z(f,"ARTICLE",{class:!0});var oe=S(P);for(let $=0;$<u.length;$+=1)u[$].l(oe);oe.forEach(m),this.h()},h(){g(d,"for","size"),g(d,"class","svelte-1lzc8ku"),g(w,"id","size"),g(w,"type","range"),g(w,"min","12"),g(w,"max","48"),g(L,"for","text"),g(L,"class","svelte-1lzc8ku"),g(D,"id","text"),g(D,"type","text"),g(D,"maxlength","100"),g(e,"id","info"),g(e,"class","svelte-1lzc8ku"),g(P,"class","svelte-1lzc8ku")},m(f,h){R(f,e,h),i(e,n),i(n,t),i(e,c),i(e,o),i(o,v),i(v,E),i(e,y),i(e,s),i(s,d),i(d,a),i(d,r),i(d,p),i(s,T),i(s,w),X(w,l[0]),i(s,j),i(s,L),i(L,B),i(s,q),i(s,D),X(D,l[1]),R(f,F,h),R(f,P,h);for(let _=0;_<u.length;_+=1)u[_].m(P,null);H=!0,V||(C=[Z(w,"change",l[3]),Z(w,"input",l[3]),Z(D,"input",l[4])],V=!0)},p(f,[h]){if((!H||h&1)&&W(r,f[0]),h&1&&X(w,f[0]),h&2&&D.value!==f[1]&&X(D,f[1]),h&7){k=f[2];let _;for(_=0;_<k.length;_+=1){const O=ae(f,k,_);u[_]?(u[_].p(O,h),U(u[_],1)):(u[_]=fe(O),u[_].c(),U(u[_],1),u[_].m(P,null))}for(ue(),_=k.length;_<u.length;_+=1)Y(_);de()}},i(f){if(!H){for(let h=0;h<k.length;h+=1)U(u[h]);H=!0}},o(f){u=u.filter(Boolean);for(let h=0;h<u.length;h+=1)K(u[h]);H=!1},d(f){f&&m(e),f&&m(F),f&&m(P),pe(u,f),V=!1,ce(C)}}}function Ie(l,e,n){let t=18,c="The quick brown fox jumps over the lazy dog.";const o=ke(xe,y=>y.type);o.sort((y,s)=>Ce(y[1].length,s[1].length));function v(){t=ze(this.value),n(0,t)}function E(){c=this.value,n(1,c)}return[t,c,o,v,E]}class Ae extends te{constructor(e){super(),le(this,e,Ie,Me,se,{})}}function Be(l){let e,n;return e=new Ae({}),{c(){he(e.$$.fragment)},l(t){me(e.$$.fragment,t)},m(t,c){ye(e,t,c),n=!0},p:ee,i(t){n||(U(e.$$.fragment,t),n=!0)},o(t){K(e.$$.fragment,t),n=!1},d(t){_e(e,t)}}}class Oe extends te{constructor(e){super(),le(this,e,null,Be,se,{})}}export{Oe as default};
