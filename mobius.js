/* Canonical renderer shared by the homepage and the animation lab. */
(()=>{
'use strict';
const stanceFromUrl=new URLSearchParams(location.search).get('stance');
window.drawMobiusScene = function(ctx,w,h,t) {
  ctx.clearRect(0,0,w,h);
  const scale=Math.min(w*.36,h*.5), bg='#f4f3ee', ink='#3f4b66', edge='#6c7890', lane='#cfd2d6', far='#8d97ab', items=[];
  const add=(a,b)=>a.map((v,i)=>v+b[i]), mul=(a,k)=>a.map(v=>v*k);
  const unit=a=>mul(a,1/Math.max(1e-8,Math.hypot(...a)));
  const cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
  // Equal lobes in the drawing plane. The half twist is confined to the crossing.
  const morph=t*.25;
  const radius=1.04+.05*Math.sin(morph);
  const rise=.34+.08*Math.sin(morph+.7);
  const depth=.18+.04*Math.sin(morph+1.2);
  const halfWidth=.15+.025*Math.sin(morph-.9);
  const twistSpan=.42+.13*Math.sin(morph+.4);
  const center=u=>[radius*Math.sin(u),rise*Math.sin(2*u),depth*Math.cos(u)];
  function frame(u) {
    const cycle=Math.floor(u/(2*Math.PI)), q=u-cycle*2*Math.PI;
    const progress=Math.max(0,Math.min(1,(q-(Math.PI-twistSpan))/(2*twistSpan)));
    const twist=Math.PI*(cycle+progress*progress*(3-2*progress));
    const derivative=[radius*Math.cos(u),2*rise*Math.cos(2*u),-depth*Math.sin(u)];
    const tangent=unit(derivative), lateral=unit([-derivative[1],derivative[0],0]);
    const binormal=unit(cross(tangent,lateral));
    return {across:add(mul(lateral,Math.cos(twist)),mul(binormal,Math.sin(twist)))};
  }
  const surface=(u,v)=>add(center(u),mul(frame(u).across,v));
  const project=p=>[w*.5+p[0]*scale,h*.55+p[1]*scale,p[2]];
  const path=pts=>{ctx.beginPath();pts.forEach((p,i)=>i?ctx.lineTo(p[0],p[1]):ctx.moveTo(p[0],p[1]));};
  for(let i=0;i<160;i++) {
    const u=i/160*Math.PI*2,next=(i+1)/160*Math.PI*2;
    const p=[surface(u,-halfWidth),surface(u,halfWidth),surface(next,halfWidth),surface(next,-halfWidth)].map(project);
    items.push({z:p.reduce((s,v)=>s+v[2],0)/4,draw(){
      path(p);ctx.closePath();ctx.fillStyle=bg;ctx.fill();
      ctx.lineCap='round';ctx.strokeStyle=lane;ctx.lineWidth=.7;
      path([project(center(u)),project(center(next))]);ctx.stroke();
      ctx.strokeStyle=edge;ctx.lineWidth=1.15;
      path([p[0],p[3]]);ctx.stroke();path([p[1],p[2]]);ctx.stroke();
    }});
  }
  // ---- Runner ---------------------------------------------------------------
  // The rig is posed in a local frame (a = forward, b = up, px at a 300px canvas)
  // and then laid onto the band. 'upright' (default) keeps the body vertical on
  // screen and spins it round at the two ends; 'track' swings the body round with
  // the path, so it runs the walls and ceilings of the loops.
  const upright=(window.drawMobiusScene.stance||stanceFromUrl)!=='track';
  const k=scale/75*.94, speed=.5, cadence=38/(8*Math.PI), stride=speed/cadence, TAU=Math.PI*2;
  const u=t*speed-1.25;
  // Once a lap, on the front crossing, one flight phase is stretched by half a gait
  // cycle into a leap. The legs swap roles afterwards, so the loop still closes.
  const LAP=TAU/speed, AIR=.73/cadence, firstLeap=3.27/cadence;
  const leaps=Math.floor((t-firstLeap)/LAP), air=Math.max(0,Math.min(1,(t-firstLeap-leaps*LAP)/AIR));
  const gait=t*cadence-.5*(leaps+air), airborne=air>0&&air<1, soar=airborne?Math.sin(Math.PI*air):0, trailing=((leaps%2)+2)%2;
  const sat=x=>Math.max(0,Math.min(1,x)), ease=x=>{x=sat(x);return x*x*(3-2*x);}, mix=(a,b,x)=>a+(b-a)*x;
  const ground=q=>project(center(q)), G=ground(u);
  const slope=[radius*Math.cos(u),2*rise*Math.cos(2*u)], run=Math.hypot(slope[0],slope[1]);
  const T=[slope[0]/run,slope[1]/run], N=[T[1],-T[0]];
  const pace=sat(run/1.3);               // 1 on the long diagonals, about .5 around the ends
  // On gentle slopes the body stays close to vertical, as a runner on a hill would;
  // only on the walls and ceilings of the loops does it swing round with the track.
  const steep=Math.atan2(N[0],-N[1]), tilt=upright?steep:.45*Math.sin(steep)*(1+Math.cos(steep)), up=steep-tilt;
  const F=[Math.cos(up),Math.sin(up)], B=[Math.sin(up),-Math.cos(up)], turn=upright?Math.tanh(T[0]*5):1;
  const place=p=>[G[0]+(F[0]*p[0]*turn+B[0]*p[1])*k,G[1]+(F[1]*p[0]*turn+B[1]*p[1])*k];
  function groundAt(q) {
    const P=ground(q), dx=(P[0]-G[0])/k, dy=(P[1]-G[1])/k;
    if(upright) return [Math.sign(q-u)*Math.hypot(dx,dy),-3.6*Math.tanh(dy/3.6)];
    return [dx*F[0]+dy*F[1],dx*B[0]+dy*B[1]];
  }
  function bend(a,b,l1,l2,forward) {
    const dx=b[0]-a[0],dy=b[1]-a[1],full=Math.max(1e-3,Math.hypot(dx,dy)),d=Math.min(full,l1+l2-.01);
    const along=(l1*l1-l2*l2+d*d)/(2*d),h=Math.sqrt(Math.max(0,l1*l1-along*along));
    let px=-dy/full,py=dx/full; if(px*forward<0){px=-px;py=-py;}
    return [a[0]+dx/full*along+px*h,a[1]+dy/full*along+py*h];
  }
  const swing=(angle,len)=>[Math.sin(angle)*len,-Math.cos(angle)*len];   // 0 = hanging down, + = forward
  const plus=(p,q)=>[p[0]+q[0],p[1]+q[1]];

  const HIP=12.1, THIGH=6.2, SHIN=6.1, SHOE=2.7, STANCE=.27, LEAD=.38;
  // Lowest just after contact (the 'down' pose), highest in flight (the 'up' pose).
  const bob=-1.25*(.55+.45*pace)*Math.cos(2*TAU*(gait-STANCE*.4));
  const jump=8*4*air*(1-air);
  const hip=[.2,HIP+bob+jump-(upright?2.1*Math.abs(T[1])*pace:3.3*Math.abs(Math.sin(tilt)))];
  const lean=mix(.13+.17*pace+.03*Math.sin(2*TAU*gait),-.06,soar);
  const spine=[Math.sin(lean),Math.cos(lean)], chest=[spine[1],-spine[0]];
  const shoulder=plus(hip,[spine[0]*7,spine[1]*7]);
  const nod=lean*.5;
  const head=plus(shoulder,[Math.sin(nod)*4.3+.3,Math.cos(nod)*4.3-.25*bob]);
  const limbs=[];
  for(let side=0;side<2;side++) {
    const p=((gait+side*.5)%1+1)%1;
    let toe,pitch;
    if(p<STANCE) {
      const x=p/STANCE;
      toe=groundAt(u+stride*(STANCE*LEAD-p));
      pitch=mix(-.28*(1-ease(x*4)),1.05,ease((x-.45)/.55));     // heel strike, flat, heel peels up
    } else {
      const s=(p-STANCE)/(1-STANCE), reach=ease(Math.pow(s,1.15));
      toe=groundAt(u+stride*STANCE*(LEAD-1+reach));
      // The heel flicks up behind, the knee drives through, then the leg reaches out to land.
      toe[1]+=(2.6+5*pace)*Math.pow(Math.sin(Math.PI*s),.75)*(1.15-.55*s);
      toe[0]+=2*pace*Math.sin(Math.PI*ease((s-.45)/.55));
      pitch=mix(1.05+.45*Math.sin(Math.PI*sat(s/.5)),-.28,ease((s-.3)/.55));
    }
    if(soar>0) {                                   // split the legs and point the toes in the air
      const back=side===trailing;
      toe[0]+=soar*(back?-5.2:4.6);toe[1]+=jump+soar*(back?2.6:3.4);pitch=mix(pitch,back?1.25:.35,soar);
    }
    toe[1]+=SHOE*Math.max(0,-Math.sin(pitch));
    const ankle=[toe[0]-Math.cos(pitch)*SHOE,toe[1]+.7+Math.sin(pitch)*SHOE];
    const pelvis=[hip[0],hip[1]];
    const knee=bend(pelvis,ankle,THIGH,SHIN,1);
    // Arms counter the legs, elbows near a right angle, and reach their widest
    // in the air rather than at contact, which is what tells a run from a walk.
    const drive=Math.cos(TAU*(p-.385)), open=side===trailing?2.05:-1.75;
    const upper=mix(-.1+(.62+.5*pace)*drive,open,soar), fold=mix(1.5+.35*drive,open>0?.3:-.3,soar);
    const root=plus(shoulder,[-spine[0]*.6,-spine[1]*.6]);
    const elbow=plus(root,swing(upper+lean*.5,4.4)), hand=plus(elbow,swing(upper+fold,4.2));
    limbs.push({down:p<STANCE&&!airborne,leg:[pelvis,knee,ankle,toe],arm:[root,elbow,hand]});
  }
  // A short scarf trails behind and flutters faster than the stride.
  const flutter=TAU*gait*2.6, tail=.55+.6*pace, neck=plus(shoulder,[spine[0]*.5,spine[1]*.5]);
  const scarf=[neck,plus(neck,[-3.3*tail,.5+.8*Math.sin(flutter)]),plus(neck,[-6.9*tail,.9+1.5*Math.sin(flutter-1.4)-.4*bob])];
  items.push({z:G[2]+.7*depth,draw(){
    const line=(pts,colour)=>{path(pts.map(place));ctx.strokeStyle=colour;ctx.lineWidth=1.5*k;ctx.stroke();};
    ctx.lineCap='round';ctx.lineJoin='round';
    line(limbs[0].arm,far);line(limbs[0].leg,far);
    const s=scarf.map(place);ctx.beginPath();ctx.moveTo(s[0][0],s[0][1]);ctx.quadraticCurveTo(s[1][0],s[1][1],s[2][0],s[2][1]);
    ctx.strokeStyle='#b98868';ctx.lineWidth=1.5*k;ctx.stroke();
    line([hip,shoulder],ink);line(limbs[1].leg,ink);line(limbs[1].arm,ink);
    const c=place(head);ctx.beginPath();ctx.arc(c[0],c[1],3.2*k,0,TAU);ctx.fillStyle=bg;ctx.fill();ctx.strokeStyle=ink;ctx.lineWidth=1.5*k;ctx.stroke();
  }});
  items.sort((a,b)=>a.z-b.z);for(const item of items)item.draw();
  // Screen-space joints, for the lab and for automated checks.
  return {x:G[0],y:G[1],unit:k,legs:limbs.map(l=>({down:l.down,points:l.leg.map(place)}))};
};
})();
