/* Notebook style: pen strokes drawn in code.
   Idea borrowed from Looseleaf (github.com/kevintngo/looseleaf, MIT): every drawn line is a seeded
   function that writes SVG, so the same element always gets the same hand-drawn stroke.
   This file is a small vanilla rewrite for a static site; no Looseleaf code is copied. */
(()=>{
'use strict';
const root=document.documentElement;
if(root.dataset.style!=='notebook')return;
const zh=root.lang==='zh-CN';
const NS='http://www.w3.org/2000/svg';

/* ---------- seeded randomness ---------- */
function hash(str){let h=2166136261;for(let i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function rng(seed){let a=seed>>>0;return()=>{a=(a+0x6D2B79F5)>>>0;let t=a;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}}
// smooth 1-D noise: random values at knots, cosine-interpolated
function noise1(r,knots=7){const v=Array.from({length:knots+1},()=>r()*2-1);return x=>{x=Math.max(0,Math.min(.9999,x))*knots;const i=Math.floor(x),f=x-i,s=(1-Math.cos(f*Math.PI))/2;return v[i]*(1-s)+v[i+1]*s}}

/* ---------- a pen stroke: polyline -> filled outline with pressure ---------- */
function stroke(pts,width,r,{taper=.18,press=.35}={}){
  const n=pts.length;if(n<2)return'';
  const wob=noise1(r,9),L=[],R=[];
  for(let i=0;i<n;i++){
    const t=i/(n-1),a=pts[Math.max(0,i-1)],b=pts[Math.min(n-1,i+1)];
    let dx=b[0]-a[0],dy=b[1]-a[1];const d=Math.hypot(dx,dy)||1;dx/=d;dy/=d;
    const ends=Math.min(1,t/taper,(1-t)/taper);           // pen lands and lifts
    const w=width*(.42+.58*Math.sqrt(Math.max(0,ends)))*(1+press*wob(t))/2;
    L.push([pts[i][0]-dy*w,pts[i][1]+dx*w]);R.push([pts[i][0]+dy*w,pts[i][1]-dx*w]);
  }
  const ring=L.concat(R.reverse());
  let p=`M${ring[0][0].toFixed(2)} ${ring[0][1].toFixed(2)}`;
  for(let i=1;i<ring.length;i++){const a=ring[i-1],b=ring[i];p+=`Q${a[0].toFixed(2)} ${a[1].toFixed(2)} ${((a[0]+b[0])/2).toFixed(2)} ${((a[1]+b[1])/2).toFixed(2)}`}
  return p+'Z';
}
// a rectangle drawn in one go, starting top-left, overshooting where it closes
function rectPts(w,h,r,{pad=3,corner=7,jitter=1.4}={}){
  const x0=pad,y0=pad,x1=w-pad,y1=h-pad,c=Math.min(corner,(x1-x0)/4,(y1-y0)/4),pts=[];
  const seg=(ax,ay,bx,by)=>{const len=Math.hypot(bx-ax,by-ay),k=Math.max(4,Math.round(len/6));for(let i=0;i<k;i++){const t=i/k;pts.push([ax+(bx-ax)*t,ay+(by-ay)*t])}};
  const arc=(cx,cy,a0)=>{for(let i=0;i<5;i++){const a=a0+i/5*Math.PI/2;pts.push([cx+Math.cos(a)*c,cy+Math.sin(a)*c])}};
  const start=x0+c+6+r()*14;
  seg(start,y0,x1-c,y0);arc(x1-c,y0+c,-Math.PI/2);seg(x1,y0+c,x1,y1-c);arc(x1-c,y1-c,0);
  seg(x1-c,y1,x0+c,y1);arc(x0+c,y1-c,Math.PI/2);seg(x0,y1-c,x0,y0+c);arc(x0+c,y0+c,Math.PI);
  seg(x0+c,y0,start+16+r()*18,y0);
  // low-frequency wobble along the outline, plus a slight drift so the end misses the start
  const nx=noise1(r,6),ny=noise1(r,6),drift=1.5+r()*1.5;
  return pts.map((p,i)=>{const t=i/(pts.length-1);return[p[0]+nx(t)*jitter,p[1]+ny(t)*jitter+(t>.92?(t-.92)*12*drift:0)]});
}
function linePts(x0,y,x1,r,{bow=2.2,wave=1.2}={}){
  const k=Math.max(8,Math.round((x1-x0)/7)),n=noise1(r,5),pts=[],tilt=(r()-.5)*2.4,b=(r()*.6+.7)*bow;
  for(let i=0;i<=k;i++){const t=i/k;pts.push([x0+(x1-x0)*t,y+Math.sin(t*Math.PI)*-b+n(t)*wave+tilt*(t-.5)])}
  return pts;
}

/* ---------- attach an SVG layer to an element and keep it sized ---------- */
const layers=new Map();
function layer(el,draw,cls){
  const svg=document.createElementNS(NS,'svg');svg.setAttribute('aria-hidden','true');svg.setAttribute('class','nb-ink '+(cls||''));
  el.classList.add('nb-has-ink');el.appendChild(svg);
  const seed=hash((el.textContent||'').trim().slice(0,40)+(cls||''));
  const paint=()=>{const w=el.offsetWidth,h=el.offsetHeight;if(!w||!h)return;const key=w+'x'+h;if(svg.dataset.k===key)return;svg.dataset.k=key;
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.setAttribute('width',w);svg.setAttribute('height',h);svg.innerHTML=draw(w,h,rng(seed))};
  layers.set(el,paint);paint();
}
const ro=new ResizeObserver(es=>es.forEach(e=>{const f=layers.get(e.target);if(f)f()}));
const path=(d,fill='currentColor')=>`<path d="${d}" fill="${fill}"/>`;

/* outline box: buttons, stamps */
function box(el,{width=1.7,cls='nb-box',pad=2,corner=8,double=false}={}){
  layer(el,(w,h,r)=>{let s=path(stroke(rectPts(w,h,r,{pad,corner}),width,r));if(double)s+=path(stroke(rectPts(w,h,r,{pad:pad+1.5,corner:corner+2,jitter:2}),width*.6,r),'currentColor" opacity=".55');return s},cls);ro.observe(el);
}
/* underline under the text of a heading */
function underline(el,{width=2.6,cls='nb-under',twice=false}={}){
  // The stroke goes under the last line of text only, so wrapped headings are not underlined across the whole column.
  const span=document.createElement('span');span.className='nb-u';while(el.firstChild)span.appendChild(el.firstChild);el.appendChild(span);
  const svg=document.createElementNS(NS,'svg');svg.setAttribute('aria-hidden','true');svg.setAttribute('class','nb-ink '+cls);
  el.classList.add('nb-has-ink');el.appendChild(svg);
  const seed=hash((el.textContent||'').trim().slice(0,40)+cls);
  const paint=()=>{const rs=[...span.getClientRects()].filter(r=>r.width>1);if(!rs.length)return;
    const last=rs[rs.length-1],line=rs.filter(r=>Math.abs(r.bottom-last.bottom)<4),x0=Math.min(...line.map(r=>r.left)),x1=Math.max(...line.map(r=>r.right));
    const box=el.getBoundingClientRect(),w=Math.round(x1-x0),h=16,key=[w,Math.round(last.bottom-box.top),Math.round(x0-box.left)].join();if(svg.dataset.k===key)return;svg.dataset.k=key;
    svg.style.left=(x0-box.left)+'px';svg.style.top=(last.bottom-box.top-2)+'px';
    svg.setAttribute('viewBox',`0 0 ${w} ${h}`);svg.setAttribute('width',w);svg.setAttribute('height',h);
    const r=rng(seed);let s=path(stroke(linePts(-4,5,w+6,r),width,r,{taper:.12}));if(twice)s+=path(stroke(linePts(w*.12,10,w*.9,r,{bow:1.2}),width*.7,r,{taper:.2}));svg.innerHTML=s};
  layers.set(el,paint);paint();ro.observe(el);
}
/* an irregular ring around a number */
function ring(el){
  layer(el,(w,h,r)=>{const cx=w/2,cy=h/2,rx=w/2-1,ry=h/2-1,n=noise1(r,5),a0=-2.2+r()*.6,pts=[];
    for(let i=0;i<=40;i++){const t=i/40,a=a0+t*Math.PI*2.18;pts.push([cx+Math.cos(a)*(rx+n(t)*1.2)*(1+t*.06),cy+Math.sin(a)*(ry+n(t)*1.2)])}
    return path(stroke(pts,1.6,r,{taper:.1}))},'nb-ring');ro.observe(el);
}

/* ---------- page structure ---------- */
function wrapSheet(){
  // Content pages: everything between the nav and the footer goes onto one sheet of paper.
  if(document.body.classList.contains('home'))return;
  const c=document.querySelector('.container'),head=c&&c.querySelector(':scope>header');if(!c||!head)return;
  const kids=[...c.children].filter(k=>k!==head&&k.tagName!=='FOOTER'&&k.tagName!=='SCRIPT');
  const isList=!!c.querySelector(':scope>.projects-grid,:scope>.list-item');
  const sheet=document.createElement('div');sheet.className=isList?'nb-desk':'nb-sheet';
  head.after(sheet);kids.forEach(k=>sheet.appendChild(k));
}
function markCurrentNav(){
  const here=location.pathname.replace(/index\.html$/,'');
  document.querySelectorAll('nav a:not(.site-name):not([lang])').forEach(a=>{
    const p=new URL(a.getAttribute('href'),location.href).pathname.replace(/index\.html$/,'');
    if(here===p||(here.startsWith(p)&&p.endsWith('/projects/')))a.setAttribute('aria-current','page');
  });
}
function decorate(){
  wrapSheet();markCurrentNav();
  // the name in the greeting gets a red-pen underline
  const h1=document.querySelector('.intro h1');
  if(h1&&!h1.querySelector('em')){const w=document.createTreeWalker(h1,NodeFilter.SHOW_TEXT);let t;while((t=w.nextNode())){const i=t.data.indexOf('卢卡');if(i>=0){const r=document.createRange();r.setStart(t,i);r.setEnd(t,i+2);const em=document.createElement('em');r.surroundContents(em);break}}}
  const tag=document.querySelector('.intro .tagline');
  if(tag){const m=document.createElement('span');m.className='nb-mark';while(tag.firstChild)m.appendChild(tag.firstChild);tag.appendChild(m)}
  document.querySelectorAll('.intro h1 em').forEach(e=>underline(e,{width:3.6,twice:true}));
  document.querySelectorAll('nav a[aria-current]').forEach(a=>underline(a,{width:2,cls:'nb-under nb-nav-under'}));
  document.querySelectorAll('.page-title,.single-header h1').forEach(h=>underline(h,{width:3.4,twice:true}));
  document.querySelectorAll('.single-content h2').forEach(h=>underline(h,{width:2.2}));
  document.querySelectorAll('.discover,.back-link').forEach(b=>box(b,{width:1.8,corner:9}));
  document.querySelectorAll('.proj .meta,.list-item .meta').forEach(m=>box(m,{width:1.3,corner:4,pad:1.5,cls:'nb-box nb-stamp'}));
  document.querySelectorAll('.flow-num,.phase-num,.step-num').forEach(ring);
  // card page numbers: "1 / 6"
  const cards=[...document.querySelectorAll('.projects-grid .proj')];
  cards.forEach((c,i)=>{const f=document.createElement('span');f.className='nb-folio';f.setAttribute('aria-hidden','true');f.textContent=`${i+1} / ${cards.length}`;c.appendChild(f)});
  requestAnimationFrame(()=>root.classList.remove('nb-loading'));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',decorate);else decorate();
// webfonts change text widths: redraw once they are in
if(document.fonts&&document.fonts.ready)document.fonts.ready.then(()=>layers.forEach(f=>f()));
})();
