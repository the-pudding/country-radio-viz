function g(){}const dt=t=>t;function _t(t,e){for(const n in e)t[n]=e[n];return t}function tt(t){return t()}function Q(){return Object.create(null)}function E(t){t.forEach(tt)}function L(t){return typeof t=="function"}function It(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let S;function Jt(t,e){return S||(S=document.createElement("a")),S.href=e,t===S.href}function ht(t){return Object.keys(t).length===0}function mt(t,...e){if(t==null)return g;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Kt(t,e,n){t.$$.on_destroy.push(mt(e,n))}function Qt(t,e,n,i){if(t){const r=et(t,e,n,i);return t[0](r)}}function et(t,e,n,i){return t[1]&&i?_t(n.ctx.slice(),t[1](i(e))):n.ctx}function Ut(t,e,n,i){if(t[2]&&i){const r=t[2](i(n));if(e.dirty===void 0)return r;if(typeof r=="object"){const c=[],s=Math.max(e.dirty.length,r.length);for(let o=0;o<s;o+=1)c[o]=e.dirty[o]|r[o];return c}return e.dirty|r}return e.dirty}function Vt(t,e,n,i,r,c){if(r){const s=et(e,n,i,c);t.p(s,r)}}function Xt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Yt(t){return t&&L(t.destroy)?t.destroy:g}const nt=typeof window<"u";let pt=nt?()=>window.performance.now():()=>Date.now(),J=nt?t=>requestAnimationFrame(t):g;const w=new Set;function it(t){w.forEach(e=>{e.c(t)||(w.delete(e),e.f())}),w.size!==0&&J(it)}function yt(t){let e;return w.size===0&&J(it),{promise:new Promise(n=>{w.add(e={c:t,f:n})}),abort(){w.delete(e)}}}let R=!1;function gt(){R=!0}function xt(){R=!1}function bt(t,e,n,i){for(;t<e;){const r=t+(e-t>>1);n(r)<=i?t=r+1:e=r}return t}function $t(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let u=0;u<e.length;u++){const d=e[u];d.claim_order!==void 0&&l.push(d)}e=l}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let r=0;for(let l=0;l<e.length;l++){const u=e[l].claim_order,d=(r>0&&e[n[r]].claim_order<=u?r+1:bt(1,r,h=>e[n[h]].claim_order,u))-1;i[l]=n[d]+1;const a=d+1;n[a]=l,r=Math.max(a,r)}const c=[],s=[];let o=e.length-1;for(let l=n[r]+1;l!=0;l=i[l-1]){for(c.push(e[l-1]);o>=l;o--)s.push(e[o]);o--}for(;o>=0;o--)s.push(e[o]);c.reverse(),s.sort((l,u)=>l.claim_order-u.claim_order);for(let l=0,u=0;l<s.length;l++){for(;u<c.length&&s[l].claim_order>=c[u].claim_order;)u++;const d=u<c.length?c[u]:null;t.insertBefore(s[l],d)}}function rt(t,e){t.appendChild(e)}function st(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function wt(t){const e=q("style");return vt(st(t),e),e.sheet}function vt(t,e){return rt(t.head||t,e),e.sheet}function Et(t,e){if(R){for($t(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Nt(t,e,n){t.insertBefore(e,n||null)}function At(t,e,n){R&&!n?Et(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function v(t){t.parentNode&&t.parentNode.removeChild(t)}function Zt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function q(t){return document.createElement(t)}function Tt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function K(t){return document.createTextNode(t)}function te(){return K(" ")}function ee(){return K("")}function U(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function ne(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ie(t){return t===""?null:+t}function Ct(t){return Array.from(t.childNodes)}function ot(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ct(t,e,n,i,r=!1){ot(t);const c=(()=>{for(let s=t.claim_info.last_index;s<t.length;s++){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r||(t.claim_info.last_index=s),o}}for(let s=t.claim_info.last_index-1;s>=0;s--){const o=t[s];if(e(o)){const l=n(o);return l===void 0?t.splice(s,1):t[s]=l,r?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=s,o}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function St(t,e,n,i){return ct(t,r=>r.nodeName===e,r=>{const c=[];for(let s=0;s<r.attributes.length;s++){const o=r.attributes[s];n[o.name]||c.push(o.name)}c.forEach(s=>r.removeAttribute(s))},()=>i(e))}function re(t,e,n){return St(t,e,n,q)}function Mt(t,e){return ct(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>K(e),!0)}function se(t){return Mt(t," ")}function V(t,e,n){for(let i=n;i<t.length;i+=1){const r=t[i];if(r.nodeType===8&&r.textContent.trim()===e)return i}return t.length}function oe(t,e){const n=V(t,"HTML_TAG_START",0),i=V(t,"HTML_TAG_END",n);if(n===i)return new X(void 0,e);ot(t);const r=t.splice(n,i-n+1);v(r[0]),v(r[r.length-1]);const c=r.slice(1,r.length-1);for(const s of c)s.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1;return new X(c,e)}function ce(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function le(t,e){t.value=e??""}function ue(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function ae(t,e){for(let n=0;n<t.options.length;n+=1){const i=t.options[n];if(i.__value===e){i.selected=!0;return}}t.selectedIndex=-1}function fe(t){const e=t.querySelector(":checked")||t.options[0];return e&&e.__value}let M;function kt(){if(M===void 0){M=!1;try{typeof window<"u"&&window.parent&&window.parent.document}catch{M=!0}}return M}function de(t,e){getComputedStyle(t).position==="static"&&(t.style.position="relative");const i=q("iframe");i.setAttribute("style","display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"),i.setAttribute("aria-hidden","true"),i.tabIndex=-1;const r=kt();let c;return r?(i.src="data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>",c=U(window,"message",s=>{s.source===i.contentWindow&&e()})):(i.src="about:blank",i.onload=()=>{c=U(i.contentWindow,"resize",e)}),rt(t,i),()=>{(r||c&&i.contentWindow)&&c(),v(i)}}function _e(t,e,n){t.classList[n?"add":"remove"](e)}function Ht(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const r=document.createEvent("CustomEvent");return r.initCustomEvent(t,n,i,e),r}function he(t,e){const n=[];let i=0;for(const r of e.childNodes)if(r.nodeType===8){const c=r.textContent.trim();c===`HEAD_${t}_END`?(i-=1,n.push(r)):c===`HEAD_${t}_START`&&(i+=1,n.push(r))}else i>0&&n.push(r);return n}class jt{constructor(e=!1){this.is_svg=!1,this.is_svg=e,this.e=this.n=null}c(e){this.h(e)}m(e,n,i=null){this.e||(this.is_svg?this.e=Tt(n.nodeName):this.e=q(n.nodeName),this.t=n,this.c(e)),this.i(i)}h(e){this.e.innerHTML=e,this.n=Array.from(this.e.childNodes)}i(e){for(let n=0;n<this.n.length;n+=1)Nt(this.t,this.n[n],e)}p(e){this.d(),this.h(e),this.i(this.a)}d(){this.n.forEach(v)}}class X extends jt{constructor(e,n=!1){super(n),this.e=this.n=null,this.l=e}c(e){this.l?this.n=this.l:super.c(e)}i(e){for(let n=0;n<this.n.length;n+=1)At(this.t,this.n[n],e)}}function me(t,e){return new t(e)}const j=new Map;let D=0;function Dt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function zt(t,e){const n={stylesheet:wt(e),rules:{}};return j.set(t,n),n}function Y(t,e,n,i,r,c,s,o=0){const l=16.666/i;let u=`{
`;for(let y=0;y<=1;y+=l){const x=e+(n-e)*c(y);u+=y*100+`%{${s(x,1-x)}}
`}const d=u+`100% {${s(n,1-n)}}
}`,a=`__svelte_${Dt(d)}_${o}`,h=st(t),{stylesheet:f,rules:_}=j.get(h)||zt(h,t);_[a]||(_[a]=!0,f.insertRule(`@keyframes ${a} ${d}`,f.cssRules.length));const m=t.style.animation||"";return t.style.animation=`${m?`${m}, `:""}${a} ${i}ms linear ${r}ms 1 both`,D+=1,a}function Lt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),r=n.length-i.length;r&&(t.style.animation=i.join(", "),D-=r,D||Rt())}function Rt(){J(()=>{D||(j.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&v(e)}),j.clear())})}let T;function A(t){T=t}function O(){if(!T)throw new Error("Function called outside component initialization");return T}function pe(t){O().$$.on_mount.push(t)}function ye(t){O().$$.after_update.push(t)}function ge(t,e){return O().$$.context.set(t,e),e}function xe(t){return O().$$.context.get(t)}const $=[],Z=[],k=[],G=[],lt=Promise.resolve();let I=!1;function ut(){I||(I=!0,lt.then(at))}function be(){return ut(),lt}function z(t){k.push(t)}function $e(t){G.push(t)}const W=new Set;let b=0;function at(){if(b!==0)return;const t=T;do{try{for(;b<$.length;){const e=$[b];b++,A(e),qt(e.$$)}}catch(e){throw $.length=0,b=0,e}for(A(null),$.length=0,b=0;Z.length;)Z.pop()();for(let e=0;e<k.length;e+=1){const n=k[e];W.has(n)||(W.add(n),n())}k.length=0}while($.length);for(;G.length;)G.pop()();I=!1,W.clear(),A(t)}function qt(t){if(t.fragment!==null){t.update(),E(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(z)}}let N;function Ot(){return N||(N=Promise.resolve(),N.then(()=>{N=null})),N}function F(t,e,n){t.dispatchEvent(Ht(`${e?"intro":"outro"}${n}`))}const H=new Set;let p;function we(){p={r:0,c:[],p}}function ve(){p.r||E(p.c),p=p.p}function Pt(t,e){t&&t.i&&(H.delete(t),t.i(e))}function Ee(t,e,n,i){if(t&&t.o){if(H.has(t))return;H.add(t),p.c.push(()=>{H.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const Bt={duration:0};function Ne(t,e,n,i){const r={direction:"both"};let c=e(t,n,r),s=i?0:1,o=null,l=null,u=null;function d(){u&&Lt(t,u)}function a(f,_){const m=f.b-s;return _*=Math.abs(m),{a:s,b:f.b,d:m,duration:_,start:f.start,end:f.start+_,group:f.group}}function h(f){const{delay:_=0,duration:m=300,easing:y=dt,tick:x=g,css:P}=c||Bt,B={start:pt()+_,b:f};f||(B.group=p,p.r+=1),o||l?l=B:(P&&(d(),u=Y(t,s,f,m,_,y,P)),f&&x(0,1),o=a(B,m),z(()=>F(t,f,"start")),yt(C=>{if(l&&C>l.start&&(o=a(l,m),l=null,F(t,o.b,"start"),P&&(d(),u=Y(t,s,o.b,o.duration,0,y,c.css))),o){if(C>=o.end)x(s=o.b,1-s),F(t,o.b,"end"),l||(o.b?d():--o.group.r||E(o.group.c)),o=null;else if(C>=o.start){const ft=C-o.start;s=o.a+o.d*y(ft/o.duration),x(s,1-s)}}return!!(o||l)}))}return{run(f){L(c)?Ot().then(()=>{c=c(r),h(f)}):h(f)},end(){d(),o=l=null}}}function Ae(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Te(t){t&&t.c()}function Ce(t,e){t&&t.l(e)}function Wt(t,e,n,i){const{fragment:r,after_update:c}=t.$$;r&&r.m(e,n),i||z(()=>{const s=t.$$.on_mount.map(tt).filter(L);t.$$.on_destroy?t.$$.on_destroy.push(...s):E(s),t.$$.on_mount=[]}),c.forEach(z)}function Ft(t,e){const n=t.$$;n.fragment!==null&&(E(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Gt(t,e){t.$$.dirty[0]===-1&&($.push(t),ut(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Se(t,e,n,i,r,c,s,o=[-1]){const l=T;A(t);const u=t.$$={fragment:null,ctx:[],props:c,update:g,not_equal:r,bound:Q(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(l?l.$$.context:[])),callbacks:Q(),dirty:o,skip_bound:!1,root:e.target||l.$$.root};s&&s(u.root);let d=!1;if(u.ctx=n?n(t,e.props||{},(a,h,...f)=>{const _=f.length?f[0]:h;return u.ctx&&r(u.ctx[a],u.ctx[a]=_)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](_),d&&Gt(t,a)),h}):[],u.update(),d=!0,E(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){gt();const a=Ct(e.target);u.fragment&&u.fragment.l(a),a.forEach(v)}else u.fragment&&u.fragment.c();e.intro&&Pt(t.$$.fragment),Wt(t,e.target,e.anchor,e.customElement),xt(),at()}A(l)}class Me{$destroy(){Ft(this,1),this.$destroy=g}$on(e,n){if(!L(n))return g;const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const r=i.indexOf(n);r!==-1&&i.splice(r,1)}}$set(e){this.$$set&&!ht(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{$e as $,be as A,g as B,Et as C,Qt as D,Vt as E,Xt as F,Ut as G,Kt as H,he as I,Zt as J,X as K,oe as L,xe as M,z as N,U as O,ge as P,Z as Q,dt as R,Me as S,de as T,Ne as U,ae as V,fe as W,_e as X,L as Y,E as Z,Ae as _,te as a,Jt as a0,Yt as a1,le as a2,ie as a3,At as b,se as c,ve as d,ee as e,Pt as f,we as g,v as h,Se as i,ye as j,q as k,re as l,Ct as m,ne as n,pe as o,ue as p,K as q,Mt as r,It as s,Ee as t,ce as u,me as v,Te as w,Ce as x,Wt as y,Ft as z};
