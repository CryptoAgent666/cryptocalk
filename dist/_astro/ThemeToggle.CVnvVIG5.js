import{c as m,j as o}from"./createLucideIcon.B9g1MKm9.js";import{r as s}from"./index.DYrVU9rO.js";/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const h=[["path",{d:"M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401",key:"kfwtm"}]],d=m("moon",h);/**
 * @license lucide-react v0.564.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const r=[["circle",{cx:"12",cy:"12",r:"4",key:"4exip2"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"m4.93 4.93 1.41 1.41",key:"149t6j"}],["path",{d:"m17.66 17.66 1.41 1.41",key:"ptbguv"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"m6.34 17.66-1.41 1.41",key:"1m8zz5"}],["path",{d:"m19.07 4.93-1.41 1.41",key:"1shlcs"}]],l=m("sun",r);function g(){const[e,a]=s.useState("light");s.useEffect(()=>{const c=localStorage.getItem("theme")??(window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light");a(c),document.documentElement.setAttribute("data-theme",c)},[]);const n=()=>{const t=e==="light"?"dark":"light";a(t),document.documentElement.setAttribute("data-theme",t),localStorage.setItem("theme",t)};return o.jsx("button",{type:"button",onClick:n,"aria-label":`Switch to ${e==="light"?"dark":"light"} mode`,className:"theme-toggle-btn",children:e==="light"?o.jsx(d,{size:18}):o.jsx(l,{size:18})})}export{g as default};
