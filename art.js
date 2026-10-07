(()=>{
'use strict';
const style=document.documentElement.dataset.style;
const zh=document.documentElement.lang==='zh-CN';
const refined=['1','2'].includes(document.documentElement.dataset.refine), motif=document.documentElement.dataset.art||'orbit';
if(document.documentElement.dataset.refine==='2'){document.querySelectorAll('.eyebrow,.discover,.footer-note,.find small>span').forEach(e=>e.remove());}
if(refined){const icons=['<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="17" y="3" width="8" height="8" rx="1"/><rect x="3" y="17" width="8" height="8" rx="1"/><path d="M18 18h6v6h-6z" fill="#b98868" stroke="none"/>','<path d="M14 7C10 4 5 4 2 5v18c4-1 9-1 12 2 3-3 8-3 12-2V5c-3-1-8-1-12 2v18M6 10h4M6 14h4M18 10h4M18 14h4"/>','<path d="M14 1v8m0 10v8M1 14h8m10 0h8M5 5l6 6m6 6 6 6M5 23l6-6m6-6 6-6"/>'];document.querySelectorAll('.home-links .link-num').forEach((e,i)=>e.innerHTML='<svg viewBox="0 0 28 28" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">'+icons[i]+'</svg>')}
const captions={ascii:'FIG. 01 / A SMALL WORLD, MADE OF CHARACTERS',sketch:'A FEW LINES. SOMETHING NEW.',impression:'LIGHT STUDY / SKY, WATER, MEMORY',morph:'FORM STUDY / ALWAYS BECOMING'};
const notes={ascii:'small tools. open possibilities.',sketch:'make. read. learn.',impression:'a place for things in progress.',morph:'built with curiosity.'};
const caption=document.querySelector('.art-caption'),footer=document.querySelector('.footer-note');
if(caption)caption.textContent=captions[style];if(footer)footer.textContent=notes[style];
const cv=document.getElementById('art');if(!cv||style==='sketch')return;
const ctx=cv.getContext('2d');if(!ctx)return;
const forceMotion=refined&&motif==='mobius'&&document.documentElement.dataset.motion==='on',paused=refined&&motif==='mobius'&&document.documentElement.dataset.motion==='off';
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let w=0,h=0,raf=0,last=0,visible=true,phase=4.5;
let seed=143;function rand(){seed=(seed*1664525+1013904223)>>>0;return seed/4294967296;}
function fit(){const box=cv.getBoundingClientRect();w=box.width;h=box.height;if(!w||!h)return;const dpr=Math.min(devicePixelRatio||1,motif==='mobius'?3:1.5);cv.width=Math.round(w*dpr);cv.height=Math.round(h*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw(phase);}
function ascii(t){
  ctx.clearRect(0,0,w,h);const cols=78,rows=Math.round(h/w*cols*.7),cw=w/cols,ch=h/rows;
  const grid=new Float32Array(cols*rows).fill(-100),light=new Float32Array(cols*rows);const a=.7+Math.sin(t*.2)*.12,b=t*.16,ca=Math.cos(a),sa=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
  for(let i=0;i<104;i++){const u=i/104*Math.PI*2;for(let j=0;j<42;j++){const v=j/42*Math.PI*2;
    const R=1.1+.07*Math.cos(u*3+t*.25),r=.44;let x=(R+r*Math.cos(v))*Math.cos(u),y=(R+r*Math.cos(v))*Math.sin(u),z=r*Math.sin(v);
    const yy=y*ca-z*sa,zz=y*sa+z*ca,xx=x*cb+zz*sb,z2=-x*sb+zz*cb;
    const scale=Math.min(w,h)*.275/(1-z2*.09),gx=Math.floor((w*.5+xx*scale)/cw),gy=Math.floor((h*.47+yy*scale)/ch);
    if(gx<0||gx>=cols||gy<0||gy>=rows)continue;const k=gy*cols+gx;
    if(z2>grid[k]){grid[k]=z2;const nx=Math.cos(v)*Math.cos(u),ny=Math.cos(v)*Math.sin(u),nz=Math.sin(v);light[k]=Math.max(0,Math.min(1,.35+ny*.3+nx*.15+nz*.5));}
  }}
  const chars=' .,:;+=*#%@';ctx.font=`${Math.max(5,cw*1.16)}px Menlo,Consolas,monospace`;ctx.textAlign='center';ctx.textBaseline='middle';
  for(let y=0;y<rows;y++)for(let x=0;x<cols;x++){let k=y*cols+x;if(grid[k]>-99){let L=light[k];ctx.fillStyle=`rgba(237,172,105,${.3+L*.7})`;ctx.fillText(chars[Math.max(1,Math.floor(L*(chars.length-1)))],(x+.5)*cw,(y+.5)*ch);}}
  ctx.fillStyle='#86938a';ctx.font='9px Menlo,monospace';ctx.textAlign='left';ctx.fillText('+',w*.08,h*.16);ctx.fillText('+',w*.9,h*.8);
}
function morph(t){
  ctx.clearRect(0,0,w,h);const mix=.5+.5*Math.sin(t*.35),angle=t*.13-.3,tilt=.5;const scale=Math.min(w*.39,h*.61);const ca=Math.cos(angle),sa=Math.sin(angle),ct=Math.cos(tilt),st=Math.sin(tilt);
  for(let i=0;i<42;i++){
    let phi=i/41*Math.PI*2;let rad=(1-mix)*(.56+.25*Math.cos(phi))+mix*.78*Math.sin(phi*.5),yy=(1-mix)*.25*Math.sin(phi)+mix*.8*Math.cos(phi*.5);
    ctx.beginPath();for(let j=0;j<=180;j++){let theta=j/180*Math.PI*2;const ripple=.015*Math.sin(theta*6+phi*3+t*.2);let x=(rad+ripple)*Math.cos(theta),z=(rad+ripple)*Math.sin(theta);let xx=x*ca+z*sa,zz=-x*sa+z*ca,y2=yy*ct-zz*st;let z2=yy*st+zz*ct;let X=w*.5+xx*scale*(1+z2*.13),Y=h*.5+y2*scale*(1+z2*.13);if(j===0)ctx.moveTo(X,Y);else ctx.lineTo(X,Y);}
    ctx.strokeStyle=`rgba(51,77,173,${.18+.35*(i/42)})`;ctx.lineWidth=.75;ctx.stroke();
  }
}

function project3(x,y,z,t,scale){const angle=t*.055-.35,tilt=.53;const xx=x*Math.cos(angle)+z*Math.sin(angle),zz=-x*Math.sin(angle)+z*Math.cos(angle);return [w*.5+xx*scale,h*.5+(y*Math.cos(tilt)-zz*Math.sin(tilt))*scale,y*Math.sin(tilt)+zz*Math.cos(tilt)];}
function orbit(t){
  ctx.clearRect(0,0,w,h);const scale=Math.min(w*.27,h*.44);let circles=[];
  for(let k=0;k<4;k++){let points=[],a=k*.85+.4;for(let j=0;j<=200;j++){const u=j/200*Math.PI*2,r=.92+.05*Math.sin(u*2+k+t*.08);const x=r*Math.cos(u),z=r*Math.sin(u);points.push(project3(x,z*Math.sin(a),z*Math.cos(a),t,scale));}circles.push(points);}
  for(let k=0;k<circles.length;k++){const points=circles[k];for(let j=1;j<points.length;j++){const a=points[j-1],b=points[j];ctx.beginPath();ctx.moveTo(a[0],a[1]);ctx.lineTo(b[0],b[1]);ctx.lineWidth=1.05;ctx.strokeStyle=`rgba(66,91,157,${b[2]>.05?.61:.22})`;ctx.stroke();}for(let n=0;n<3;n++){const i=Math.floor(((t*.025+k*.21+n/3)%1)*200),p=points[i];ctx.fillStyle=n===0&&k===1?'#b88d70':'#7184b2';ctx.beginPath();ctx.arc(p[0],p[1],n===0?3:1.6,0,Math.PI*2);ctx.fill();}}
  ctx.fillStyle='#b28a70';ctx.beginPath();ctx.arc(w*.5,h*.5,2.1,0,Math.PI*2);ctx.fill();
}
function fold(t){
  ctx.clearRect(0,0,w,h);const scale=Math.min(w*.28,h*.47);const vertices=[[-1.25,.12,-.25],[-.4,-.51,.42],[0,.05,.8],[.47,-.58,.15],[1.23,.12,-.3],[.42,.68,.22],[-.3,.61,-.22],[0,.01,-.75]];
  const points=vertices.map(p=>project3(p[0],p[1],p[2],t+Math.sin(t*.12)*.4,scale));const faces=[[0,1,2],[1,3,2],[3,4,2],[4,5,2],[5,6,2],[6,0,2],[0,7,1],[1,7,3],[3,7,4],[4,7,5],[5,7,6],[6,7,0]];
  faces.sort((a,b)=>a.reduce((s,i)=>s+points[i][2],0)-b.reduce((s,i)=>s+points[i][2],0));for(let f=0;f<faces.length;f++){const ids=faces[f],z=ids.reduce((s,i)=>s+points[i][2],0)/3;ctx.beginPath();ids.forEach((id,j)=>j?ctx.lineTo(points[id][0],points[id][1]):ctx.moveTo(points[id][0],points[id][1]));ctx.closePath();ctx.fillStyle=`rgba(${f%4===0?'198,211,216':'218,224,232'},${.3+(z+.8)*.22})`;ctx.fill();ctx.strokeStyle=`rgba(71,91,140,${z>0?.65:.32})`;ctx.lineWidth=.95;ctx.stroke();}
}
function petal(t){
  ctx.clearRect(0,0,w,h);const scale=Math.min(w*.29,h*.46);const open=.92+.09*Math.sin(t*.2);
  for(let k=0;k<14;k++){const a=k/14*Math.PI*2+t*.018;ctx.beginPath();for(let j=0;j<=140;j++){let u=j/140*Math.PI*2;const r=(.13+.82*Math.pow(Math.sin(u/2),1.45))*open;const spread=.36*Math.sin(u);const x=r*Math.cos(a+spread),y=r*Math.sin(a+spread);const z=.24*Math.sin(u)*Math.sin(u*.5);let p=project3(x,y,z,t*.14,scale);j?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]);}ctx.closePath();ctx.fillStyle='rgba(141,162,186,.028)';ctx.fill();ctx.strokeStyle=`rgba(63,91,139,${.35+.13*Math.sin(a)})`;ctx.lineWidth=1;ctx.stroke();}
  ctx.strokeStyle='#b99576';ctx.lineWidth=.8;ctx.beginPath();ctx.arc(w*.5,h*.5,scale*.1,0,Math.PI*2);ctx.stroke();
}


function mobius(t) { window.drawMobiusScene(ctx,w,h,t); }

function impression(){
  seed=143;ctx.clearRect(0,0,w,h);ctx.save();ctx.scale(w/680,h/520);
  let sky=ctx.createLinearGradient(0,0,0,330);sky.addColorStop(0,'#e8e8d5');sky.addColorStop(.6,'#efd2b5');sky.addColorStop(1,'#d0bdaa');ctx.fillStyle=sky;ctx.fillRect(0,0,680,520);
  ctx.fillStyle='#eab286';ctx.beginPath();ctx.arc(415,183,68,0,Math.PI*2);ctx.fill();
  const hill=(points,color)=>{ctx.fillStyle=color;ctx.beginPath();ctx.moveTo(-5,520);for(const [x,y]of points)ctx.lineTo(x,y);ctx.lineTo(685,520);ctx.fill()};
  hill([[-5,284],[55,222],[125,241],[207,200],[284,245],[343,224],[448,263],[572,209],[685,226]],'#a6b5a3');
  hill([[-5,314],[77,254],[172,266],[256,242],[346,292],[453,275],[575,306],[685,257]],'#73958c');
  hill([[-5,325],[60,308],[123,300],[200,324],[296,307],[374,321],[508,290],[584,325],[685,300]],'#487b75');
  let water=ctx.createLinearGradient(0,328,0,520);water.addColorStop(0,'#c8c8a6');water.addColorStop(.5,'#92b0a0');water.addColorStop(1,'#56847c');ctx.fillStyle=water;ctx.fillRect(0,328,680,192);
  for(let i=0;i<13200;i++){
    const x=rand()*680,y=rand()*520;let c;
    if(y<220)c=['#fff7dd','#e2bda6','#e4d8bc','#b7c5b0'][Math.floor(rand()*4)];
    else if(y<328)c=['#41736c','#c8c6a1','#c3c7aa','#648f83'][Math.floor(rand()*4)];
    else c=['#376c66','#d4cfa9','#96bfa9','#e6c99f','#aac1aa'][Math.floor(rand()*5)];
    ctx.globalAlpha=.1+rand()*.25;ctx.fillStyle=c;let bw=y>328?5+rand()*19:2+rand()*7,bh=1+rand()*4;ctx.fillRect(x,y,bw,bh);
  }
  ctx.globalAlpha=.3;ctx.fillStyle='#f8d1a0';for(let i=0;i<180;i++){let y=336+rand()*160,x=415+(rand()-.5)*(30+(y-330)*.55);ctx.fillRect(x,y,rand()*28+5,1.8);}
  ctx.globalAlpha=1;ctx.restore();
}
function draw(t){if(style==='ascii')ascii(t);else if(style==='morph'){if(refined){if(motif==='mobius')mobius(t);else if(motif==='fold')fold(t);else if(motif==='petal')petal(t);else orbit(t)}else morph(t)}else impression();}
function tick(now){raf=0;if(document.hidden||!visible||(reduced.matches&&!forceMotion)||paused||style==='impression')return;if(now-last>=1000/(motif==='mobius'?30:12)){phase+=Math.min((now-last)/1000,.15);last=now;draw(phase)}raf=requestAnimationFrame(tick);}
function sync(){if(raf)cancelAnimationFrame(raf);raf=0;if(!document.hidden&&visible&&(!reduced.matches||forceMotion)&&!paused&&style!=='impression'){last=performance.now();raf=requestAnimationFrame(tick);}}
new ResizeObserver(fit).observe(cv);new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync()},{threshold:0}).observe(cv);document.addEventListener('visibilitychange',sync);reduced.addEventListener('change',()=>{draw(phase);sync()});fit();sync();
})();
