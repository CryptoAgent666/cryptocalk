import{c as a,j as o}from"./createLucideIcon.K_D3khf4.js";import{r as n}from"./index.DiEladB3.js";/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const s=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],h=a("moon",s);/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],i=a("sun",r);function d(){if(typeof window>"u")return"light";const t=localStorage.getItem("theme");return t||(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light")}function g(){const[t,c]=n.useState(d);n.useEffect(()=>{document.documentElement.setAttribute("data-theme",t)},[t]);const m=()=>{const e=t==="light"?"dark":"light";c(e),document.documentElement.setAttribute("data-theme",e),localStorage.setItem("theme",e)};return o.jsx("button",{type:"button",onClick:m,"aria-label":`Switch to ${t==="light"?"dark":"light"} mode`,className:"theme-toggle-btn",children:t==="light"?o.jsx(h,{size:18}):o.jsx(i,{size:18})})}export{g as default};
