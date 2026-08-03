import{V as Je,a as M,W as li,S as hi,P as ci,M as le,O as _s,B as Pe,F as za,b as ge,U as Ds,c as ut,H as fa,N as Nt,T as ui,C as Bs,R as di,d as fi,e as pi,L as mi,f as gi,g as vi,A as wi,h as yi,i as bi,j as xi,k as Es,l as xa,m as pa,n as ma,D as Si,o as ga,p as Ns,q as Gt,r as ki,s as Sa,t as va,G as Mi,u as Gs,v as H,w as Ti,x as Os,y as Ai,I as Pi,z as st,E as ye,J as ka,K as pt,Q as Ws,X as he,Y as Ae,Z as Is,_ as Ra,$ as Ci,a0 as Fi,a1 as zi}from"./three-DMZcnpyd.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function t(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=t(a);fetch(a.href,o)}})();const B={render:{maxPixelRatio:2,minPixelRatio:.75,frameBudgetMs:16.6,fov:58,near:.35,far:4200,fovSpeedKick:13},ocean:{extent:2600,baseResolution:192,lodRings:5,snap:4},boat:{length:4.6,beam:1.9,mass:420,thrust:6100,reverseThrust:2600,boostForce:4e3,topSpeed:29,boostTopSpeed:39,dragLinear:.18,dragQuadratic:.00909,ploughDrag:26,throttleUpRate:2.7,throttleDownRate:4.4,airThrust:.3,turnRateLow:2.35,turnRateHigh:1.15,yawResponse:5.6,driftYawGain:1.15,airControl:.24,lateralGrip:12,driftGrip:3.8,airGrip:.35,bankGain:.0085,slipLeanGain:.026,planeTrim:.1,driftMinSpeed:5,driftSlipThreshold:2.2,driftExitKick:.4,gripRecovery:.85,driftRecovery:.52,driftTiers:[.85,1.8,2.9],boostDuration:[.75,1.35,2.1],probeCount:6,buoyancy:70,buoyancyDamping:7.2,buoyancyDampFloor:.45,maxBuoyantAccel:34,maxLaunchSpeed:4.6,restDraft:.14,maxDraft:.85,planingLift:8e-4,pitchStiffness:17,pitchDamping:2.8,rollStiffness:90,rollDamping:3.2,slamPitchKick:.075,airborneClearance:.15,airMinDuration:.25,airCoyote:.09,collisionRadius:1,collisionRestitution:.42,collisionSpin:.055},race:{laps:3,racerCount:4,countdownSeconds:4,gateRadius:17,wrongWayDot:-.35},ai:{lookaheadBase:14,lookaheadPerSpeed:.95,rubberBand:.11,avoidRadius:6.5},camera:{distance:11.2,height:4.15,lookAhead:9,posStiffness:9.5,rotStiffness:7,shakeDecay:3.4},audio:{masterGain:.62,engineGain:.3,waterGain:.28},debug:{enabled:new URLSearchParams(location.search).has("debug"),harness:new URLSearchParams(location.search).has("harness")}};function qs(){return{steer:0,throttle:0,brake:0,drift:!1,startPressed:!1,restartPressed:!1,cameraTogglePressed:!1}}const Fe={left:["ArrowLeft","KeyA"],right:["ArrowRight","KeyD"],fwd:["ArrowUp","KeyW"],back:["ArrowDown","KeyS"],drift:["ShiftLeft","ShiftRight","Space"],start:["Enter","Space"],restart:["KeyR"],camera:["KeyC"]};class Ri{constructor(e=window){this.target=e,e.addEventListener("keydown",this.onKeyDown),e.addEventListener("keyup",this.onKeyUp),e.addEventListener("blur",this.onBlur)}target;state=qs();down=new Set;pressedThisFrame=new Set;steerSmooth=0;onKeyDown=e=>{const t=e;t.repeat||((t.code.startsWith("Arrow")||t.code==="Space")&&t.preventDefault(),this.down.add(t.code),this.pressedThisFrame.add(t.code))};onKeyUp=e=>{this.down.delete(e.code)};onBlur=()=>{this.down.clear()};any(e){return e.some(t=>this.down.has(t))}anyPressed(e){return e.some(t=>this.pressedThisFrame.has(t))}update(e){const t=this.state,s=navigator.getGamepads?.().find(n=>n&&n.connected)??null;let a=(this.any(Fe.right)?1:0)-(this.any(Fe.left)?1:0);if(s){const n=s.axes[0]??0;Math.abs(n)>.12&&(a=n)}const o=a===0?12:9;this.steerSmooth+=(a-this.steerSmooth)*(1-Math.exp(-o*e)),t.steer=Math.abs(this.steerSmooth)<.001?0:this.steerSmooth,t.throttle=this.any(Fe.fwd)?1:0,t.brake=this.any(Fe.back)?1:0,s&&(t.throttle=Math.max(t.throttle,s.buttons[7]?.value??0,s.buttons[0]?.value??0),t.brake=Math.max(t.brake,s.buttons[6]?.value??0)),t.drift=this.any(Fe.drift)||!!(s&&(s.buttons[1]?.pressed||s.buttons[5]?.pressed)),t.startPressed=this.anyPressed(Fe.start)||!!(s&&s.buttons[9]?.pressed),t.restartPressed=this.anyPressed(Fe.restart),t.cameraTogglePressed=this.anyPressed(Fe.camera),this.pressedThisFrame.clear()}dispose(){this.target.removeEventListener("keydown",this.onKeyDown),this.target.removeEventListener("keyup",this.onKeyUp),this.target.removeEventListener("blur",this.onBlur)}}const $=(i,e,t)=>i<e?e:i>t?t:i,I=i=>$(i,0,1),Li=(i,e,t)=>i+(e-i)*t,Hs=(i,e,t)=>{const s=I((t-i)/(e-i||1e-6));return s*s*(3-2*s)},Ut=Math.PI*2;function Us(i,e){let t=(e-i)%Ut;return t>Math.PI&&(t-=Ut),t<-Math.PI&&(t+=Ut),t}function q(i,e,t,s){return Li(e,i,Math.exp(-t*s))}function _i(i,e,t,s){return i+Us(i,e)*(1-Math.exp(-t*s))}const Di=9.81,Ke=i=>{const e=i*Math.PI/180;return new Je(Math.cos(e),Math.sin(e))},Vs=[{dir:Ke(8),wavelength:71.3,amplitude:1.3,steepness:.92,speed:1,phase:0},{dir:Ke(63),wavelength:44.1,amplitude:.82,steepness:.85,speed:.97,phase:1.7},{dir:Ke(-34),wavelength:23.7,amplitude:.44,steepness:.78,speed:1.04,phase:3.1},{dir:Ke(101),wavelength:13.9,amplitude:.255,steepness:.7,speed:1.11,phase:.6},{dir:Ke(-71),wavelength:7.63,amplitude:.108,steepness:.6,speed:1.19,phase:4.4},{dir:Ke(148),wavelength:4.31,amplitude:.056,steepness:.5,speed:1.27,phase:2.2}];let ft=[],js=1;function Ks(){const i=Vs.map(s=>{const a=2*Math.PI/s.wavelength,o=s.amplitude*js;return{w:s,k:a,amp:o,qak:s.steepness*o*a}}),e=i.reduce((s,a)=>s+a.qak,0),t=e>.92?.92/e:1;ft=i.map(({w:s,k:a,amp:o})=>({dx:s.dir.x,dz:s.dir.y,k:a,a:o,qa:s.steepness*t*o,w:Math.sqrt(Di*a)*s.speed,phase:s.phase}))}Ks();function Bi(i){js=i,Ks(),$s()}const Ot=Vs.length,Le={uWaveA:new Float32Array(Ot*4),uWaveB:new Float32Array(Ot*4)};function $s(){const{uWaveA:i,uWaveB:e}=Le;for(let t=0;t<Ot;t++){const s=ft[t];i[t*4+0]=s.dx,i[t*4+1]=s.dz,i[t*4+2]=s.k,i[t*4+3]=s.a,e[t*4+0]=s.w,e[t*4+1]=s.qa,e[t*4+2]=s.phase,e[t*4+3]=0}return Le}$s();const Ma=`
#define WAVE_COUNT ${Ot}
uniform vec4 uWaveA[WAVE_COUNT]; // dirX, dirZ, k, amplitude
uniform vec4 uWaveB[WAVE_COUNT]; // omega, Q*A, phase, _
uniform float uTime;

// Horizontal + vertical offset from the flat grid position.
vec3 gerstnerDisplace(vec2 p, float t) {
  vec3 acc = vec3(0.0);
  for (int i = 0; i < WAVE_COUNT; i++) {
    vec4 A = uWaveA[i];
    vec4 B = uWaveB[i];
    vec2 d = A.xy;
    float theta = A.z * dot(d, p) - B.x * t + B.z;
    float s = sin(theta), c = cos(theta);
    acc.xz += B.y * d * c;
    acc.y  += A.w * s;
  }
  return acc;
}

// Full surface sample: displaced position, analytic normal, and the horizontal
// Jacobian used as a foam/whitecap mask.
void gerstnerSurface(vec2 p, float t, out vec3 pos, out vec3 nrm, out float jacobian) {
  vec3 acc = vec3(0.0);
  // Partial derivatives of the displacement w.r.t. the flat grid axes.
  float jxx = 0.0, jxz = 0.0, jzz = 0.0;
  vec3 dPdx = vec3(0.0), dPdz = vec3(0.0);

  for (int i = 0; i < WAVE_COUNT; i++) {
    vec4 A = uWaveA[i];
    vec4 B = uWaveB[i];
    vec2 d = A.xy;
    float k = A.z, amp = A.w, qa = B.y;
    float theta = k * dot(d, p) - B.x * t + B.z;
    float s = sin(theta), c = cos(theta);

    acc.xz += qa * d * c;
    acc.y  += amp * s;

    float qak = qa * k * s;
    jxx -= qak * d.x * d.x;
    jxz -= qak * d.x * d.y;
    jzz -= qak * d.y * d.y;

    float akc = amp * k * c;
    dPdx.y += akc * d.x;
    dPdz.y += akc * d.y;
  }

  pos = vec3(p.x + acc.x, acc.y, p.y + acc.z);

  dPdx.x = 1.0 + jxx; dPdx.z = jxz;
  dPdz.x = jxz;       dPdz.z = 1.0 + jzz;
  nrm = normalize(cross(dPdz, dPdx));

  // det of [[1+jxx, jxz], [jxz, 1+jzz]] — < 1 means the surface is pinching.
  jacobian = (1.0 + jxx) * (1.0 + jzz) - jxz * jxz;
}
`,La=new M,_a=new M;function Da(i,e,t,s){let a=0,o=0,n=0,r=0,h=0,l=0,u=0,d=0;for(let m=0;m<ft.length;m++){const c=ft[m],v=c.k*(c.dx*i+c.dz*e)-c.w*t+c.phase,f=Math.sin(v),p=Math.cos(v);a+=c.qa*c.dx*p,n+=c.qa*c.dz*p,o+=c.a*f;const w=c.qa*c.k*f;r-=w*c.dx*c.dx,h-=w*c.dx*c.dz,l-=w*c.dz*c.dz;const y=c.a*c.k*p;u+=y*c.dx,d+=y*c.dz}return s.position.set(i+a,o,e+n),La.set(1+r,u,h),_a.set(h,d,1+l),s.normal.copy(_a).cross(La).normalize(),s.height=o,s.jacobian=(1+r)*(1+l)-h*h,s}const Vt={position:new M,normal:new M(0,1,0),height:0,jacobian:1};function Qs(i,e,t,s={position:new M,normal:new M(0,1,0),height:0,jacobian:1}){let a=i,o=e;for(let n=0;n<3;n++)Da(a,o,t,Vt),a+=i-Vt.position.x,o+=e-Vt.position.z;return Da(a,o,t,s),s.position.x=i,s.position.z=e,s}function Ei(i,e,t){return Qs(i,e,t,Ni).height}const Ni={position:new M,normal:new M(0,1,0),height:0,jacobian:1};function Gi(){return ft.reduce((i,e)=>i+e.a,0)}function Oi(i){const e=new li({canvas:i,antialias:!1,alpha:!1,stencil:!1,depth:!0,powerPreference:"high-performance",precision:"highp"});return e.outputColorSpace=hi,e.setClearColor(397348,1),e.shadowMap.enabled=!1,e.shadowMap.type=ci,e.autoClear=!1,e.info.autoReset=!1,{renderer:e,canvas:i}}class Wi{constructor(e){this.renderer=e,this.maxDpr=Math.min(window.devicePixelRatio||1,B.render.maxPixelRatio),this.minScale=B.render.minPixelRatio/this.maxDpr}renderer;scale=1;fps=60;frameMs=16.6;samples=[];cooldown=0;climbTimer=0;maxDpr;minScale;get pixelRatio(){return this.maxDpr*this.scale}update(e,t){if(e>0&&e<500&&this.samples.push(e),this.samples.length>45&&this.samples.shift(),this.samples.length<12)return!1;const s=[...this.samples].sort((r,h)=>r-h),a=s[s.length>>1];if(this.frameMs=a,this.fps=1e3/Math.max(a,.001),this.cooldown-=t,this.cooldown>0)return!1;const o=B.render.frameBudgetMs;let n=!1;if(a>o*1.14&&this.scale>this.minScale){const r=a/o;this.scale=Math.max(this.minScale,this.scale/Math.sqrt(r)),this.cooldown=.5,this.climbTimer=0,n=!0}else a<o*.74&&this.scale<1?(this.climbTimer+=t,this.climbTimer>1.4&&(this.scale=Math.min(1,this.scale*1.07),this.cooldown=.7,this.climbTimer=0,n=!0)):this.climbTimer=0;return n}drawStats(){const e=this.renderer.info;return{drawCalls:e.render.calls,triangles:e.render.triangles}}}const Ii={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class mt{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const qi=new _s(-1,1,1,-1,0,1);class Hi extends Pe{constructor(){super(),this.setAttribute("position",new za([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new za([0,2,0,0,2,0],2))}}const Ui=new Hi;class Xs{constructor(e){this._mesh=new le(Ui,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,qi)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class Zs extends mt{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof ge?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Ds.clone(e.uniforms),this.material=new ge({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new Xs(this.material)}render(e,t,s){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=s.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class Ba extends mt{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,s){const a=e.getContext(),o=e.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let n,r;this.inverse?(n=0,r=1):(n=1,r=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),o.buffers.stencil.setFunc(a.ALWAYS,n,4294967295),o.buffers.stencil.setClear(r),o.buffers.stencil.setLocked(!0),e.setRenderTarget(s),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(a.EQUAL,1,4294967295),o.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),o.buffers.stencil.setLocked(!0)}}class Vi extends mt{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ji{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const s=e.getSize(new Je);this._width=s.width,this._height=s.height,t=new ut(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:fa}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Zs(Ii),this.copyPass.material.blending=Nt,this.timer=new ui}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let s=!1;for(let a=0,o=this.passes.length;a<o;a++){const n=this.passes[a];if(n.enabled!==!1){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,s),n.needsSwap){if(s){const r=this.renderer.getContext(),h=this.renderer.state.buffers.stencil;h.setFunc(r.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),h.setFunc(r.EQUAL,1,4294967295)}this.swapBuffers()}Ba!==void 0&&(n instanceof Ba?s=!0:n instanceof Vi&&(s=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new Je);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const s=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(s,a),this.renderTarget2.setSize(s,a);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(s,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ki extends mt{constructor(e,t,s=null,a=null,o=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=s,this.clearColor=a,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new Bs}render(e,t,s){const a=e.autoClear;e.autoClear=!1;let o,n;this.overrideMaterial!==null&&(n=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(o=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:s),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=n),e.autoClear=a}}const bt={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class $i extends mt{constructor(){super(),this.isOutputPass=!0,this.uniforms=Ds.clone(bt.uniforms),this.material=new di({name:bt.name,uniforms:this.uniforms,vertexShader:bt.vertexShader,fragmentShader:bt.fragmentShader}),this._fsQuad=new Xs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,s){this.uniforms.tDiffuse.value=s.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},fi.getTransfer(this._outputColorSpace)===pi&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===mi?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===gi?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===vi?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===wi?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===yi?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===bi?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===xi&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}const gt=i=>new Bs(i).convertSRGBToLinear(),Q={ink:858652,inkSoft:2372663,waterDeep:2850703,waterShadow:3972779,waterMid:5814467,waterShallow:8244949,waterCrest:11135208,waterSss:8577491,foam:15203327,foamShade:11065824,skyZenith:5079986,skyMid:7973833,skyHorizon:12771557,skyHaze:14872561,sun:16773319,sunCore:16775912,sunFlare:15332591,cloudLit:15923187,cloudShade:12110801,ambient:7705760,rimLight:13166568,tintBase:16777215,rock:3494999,rockLit:7310211,foliage:4287819,foliageLit:9219940,raceLine:6279360,raceLineGlow:11070688,gate:6279360,gateFar:15237962,buoy:15251530,hull0:15229738,hull1:15788248,hull2:13934652,hull3:11032636,suit0:2764856,suit1:3158572,suit2:3025444,suit3:2761760,suitMid0:5925496,suitMid1:7238244,suitMid2:7234128,suitMid3:6706762,skin:14199948,skinShade:9069136,boost:15229738,boostHot:16762986,warn:15231578,hudInk:858652,hudPaper:15003886,hudDim:8229263},Qi=gt(4036576),Xi=gt(15924223),Zi=gt(16774850),Yi=gt(4036576),T=Object.fromEntries(Object.entries(Q).map(([i,e])=>[i,gt(e)])),Ys=[{hull:T.hull0,suit:T.suit0,hex:Q.hull0},{hull:T.hull1,suit:T.suit1,hex:Q.hull1},{hull:T.hull2,suit:T.suit2,hex:Q.hull2},{hull:T.hull3,suit:T.suit3,hex:Q.hull3}],jt={x:-.25,y:.55,z:.79},Ea=new Map;function Ta(i,e){const t=Ea.get(i);if(t)return t;const s=e();return Ea.set(i,s),s}function Ji(i,e,t=64,s){const a=`ramp:${i.map(o=>o.getHexString()).join(",")}:${e.join(",")}:${t}:${(s??[]).join(",")}`;return Ta(a,()=>{const o=new Uint8Array(t*4);for(let r=0;r<t;r++){const h=r/(t-1);let l=0;for(let m=0;m<e.length;m++)h>=e[m]&&(l=m);const u=i[Math.min(l,i.length-1)];o[r*4+0]=Math.round(Math.min(1,u.r)*255),o[r*4+1]=Math.round(Math.min(1,u.g)*255),o[r*4+2]=Math.round(Math.min(1,u.b)*255);const d=s?s[Math.min(l,s.length-1)]??0:0;o[r*4+3]=Math.round(Math.max(0,Math.min(1,d))*255)}const n=new Si(o,t,1,ga,Ns);return n.magFilter=Gt,n.minFilter=Gt,n.wrapS=ma,n.wrapT=ma,n.generateMipmaps=!1,n.colorSpace=xa,n.needsUpdate=!0,n})}function Js(i=256,e=16,t=4){const s=`noise:${i}:${e}:${t}`;return Ta(s,()=>{const a=document.createElement("canvas");a.width=a.height=i;const o=a.getContext("2d"),n=o.createImageData(i,i);let r=2654435769;const h=()=>{r=r+1831565813>>>0;let c=r;return c=Math.imul(c^c>>>15,c|1),c^=c+Math.imul(c^c>>>7,c|61),((c^c>>>14)>>>0)/4294967296},l=[];for(let c=0;c<t;c++){const v=e<<c,f=new Array(v*v);for(let p=0;p<v*v;p++)f[p]=h();l.push(f)}const u=c=>c*c*(3-2*c),d=(c,v,f)=>{const p=e<<c,w=l[c],y=v*p,b=f*p,S=Math.floor(y)%p,x=Math.floor(b)%p,k=(S+1)%p,_=(x+1)%p,L=u(y-Math.floor(y)),C=u(b-Math.floor(b)),z=w[x*p+S],A=w[x*p+k],E=w[_*p+S],O=w[_*p+k];return(z+(A-z)*L)*(1-C)+(E+(O-E)*L)*C};for(let c=0;c<i;c++)for(let v=0;v<i;v++){const f=v/i,p=c/i;let w=.5,y=0,b=0;for(let k=0;k<t;k++)y+=d(k,f,p)*w,b+=w,w*=.5;const S=y/b,x=(c*i+v)*4;n.data[x+0]=Math.round(S*255),n.data[x+1]=Math.round(d(1,f,p)*255),n.data[x+2]=Math.round(d(t-1,f,p)*255),n.data[x+3]=255}o.putImageData(n,0,0);const m=new Es(a);return m.wrapS=m.wrapT=ki,m.colorSpace=xa,m.minFilter=Sa,m.magFilter=pa,m.generateMipmaps=!0,m})}function eo(i,e,t,s=.06,a=256){const o=`gloss:${i.getHexString()}:${e.getHexString()}:${t.getHexString()}:${s}`;return Ta(o,()=>{const n=document.createElement("canvas");n.width=n.height=a;const r=n.getContext("2d"),h=a/2,l=d=>"#"+d.clone().convertLinearToSRGB().getHexString();r.fillStyle="#000000",r.fillRect(0,0,a,a),r.save(),r.beginPath(),r.arc(h,h,h,0,Math.PI*2),r.clip(),r.fillStyle=l(t),r.beginPath(),r.ellipse(h*.66,h*.5,h*.2,h*.115,-.55,0,Math.PI*2),r.fill(),r.beginPath(),r.ellipse(h*1.3,h*.8,h*.075,h*.04,.35,0,Math.PI*2),r.fill(),r.strokeStyle=l(t.clone().lerp(e,.45).multiplyScalar(.62)),r.lineWidth=a*.02,r.beginPath(),r.arc(h,h,h*.968,Math.PI*-.28,Math.PI*.4),r.stroke(),r.strokeStyle=l(t.clone().lerp(i,.5).multiplyScalar(.55)),r.lineWidth=a*.016,r.beginPath(),r.arc(h,h,h*(.955-s),Math.PI*1.06,Math.PI*1.44),r.stroke(),r.restore();const u=new Es(n);return u.colorSpace=xa,u.minFilter=pa,u.magFilter=pa,u.generateMipmaps=!1,u.wrapS=u.wrapT=ma,u})}const to=Qi.g<.15;function V(i){const e=i.clone();return to&&e.convertLinearToSRGB(),e}const X={uTime:{value:0},uSunDir:{value:new M(jt.x,jt.y,jt.z).normalize()},uCameraPos:{value:new M},uResolution:{value:new Je(1,1)},uTanHalfFov:{value:.5},uNear:{value:.1},uFar:{value:4e3}},ao=[0,.3,.42,.86];function It(i){const e=Math.max(i.r,i.g,i.b)||1;return i.clone().multiplyScalar(1/e)}const so=.8;function io(i){if(i.length<2)return i;const e=i.map(s=>s.clone()),t=s=>Math.max(s.r,s.g,s.b);for(let s=e.length-2;s>=0;s--){const a=t(e[s+1]),o=t(e[s]),n=a*so;o>n&&o>1e-5&&e[s].multiplyScalar(n/o)}return e}const Aa=It(V(Xi)),Na=It(V(Yi)).lerp(Aa,.6),Ga=It(V(Zi)).lerp(Aa,.72);function oo(){return[Na.clone().multiplyScalar(.3),Na.clone().multiplyScalar(.55),Ga.clone().multiplyScalar(.94),Ga.clone().multiplyScalar(1)]}function no(i,e){const t=i.map(a=>Math.max(a.r,a.g,a.b)),s=Math.max(...t,1e-4);return t.map(a=>{const o=Math.max(0,1-a/s);return Math.min(1,o*o*1.9*e)})}const Kt=`
  attribute vec3 aSmoothNormal;

  // Always present in the uniform block; unused ones are optimised out by the
  // compiler, so declaring them unconditionally keeps the three variants
  // (main / prepass / outline) sharing one vertex source.
  uniform float uTime;
  uniform vec2 uResolution;
  uniform float uTanHalfFov;
  uniform float uNear;
  uniform float uFar;
  uniform float uOutlineWidthPx;
  uniform float uOutlineMaxPx;
  uniform float uOutlineRadius;
  uniform float uOutlineFadePx;
  uniform vec3 uCameraPos;

  varying vec3 vWorldNormal;
  varying vec3 vViewNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewPos;
  varying vec2 vUv;
  varying vec3 vColor4;
  /** Outline coverage, 0 on objects too small on screen to carry an ink line. */
  varying float vOutlineFade;
  /**
   * Object-space position and the object-space glass gate, packed into one
   * varying to stay well inside the varying budget (chunk-heavy materials —
   * the rider carries skinning plus a tint — add their own on top of these).
   * .xyz is the post-displacement object position, .w is 1 on a raked plate.
   */
  varying vec4 vObjPosGlass;

  CHUNK_VERTEX_HEAD

  void main() {
    vec3 transformed = position;
    vec3 objectNormal = normal;
    vec3 smoothNormal = aSmoothNormal;
    vOutlineFade = 1.0;
    vUv = uv;
    #ifdef USE_VERTEX_COLORS
      vColor4 = color;
    #else
      vColor4 = vec3(1.0);
    #endif

    CHUNK_VERTEX_BODY

    vec4 worldPos = modelMatrix * vec4(transformed, 1.0);
    vec4 mvPosition = viewMatrix * worldPos;

    vWorldPos = worldPos.xyz;
    vViewPos = mvPosition.xyz;
    vWorldNormal = normalize(mat3(modelMatrix) * objectNormal);
    vViewNormal = normalize(normalMatrix * objectNormal);

    // The glass gate, in object space so it selects the same faces however the
    // hull is pitched or heading. See GLASS_BANDS.
    {
      vec3 no = normalize(objectNormal);
      float raked = step(0.34, no.y) * (1.0 - step(0.87, no.y)) * step(0.34, abs(no.z));
      vObjPosGlass = vec4(transformed, raked);
    }

    CHUNK_VERTEX_OUTLINE

    gl_Position = projectionMatrix * mvPosition;
  }
`,ro=`
  {
    vec3 vn = normalize(normalMatrix * smoothNormal);
    float depth = max(-mvPosition.z, uNear);
    float unitsPerPixel = (2.0 * depth * uTanHalfFov) / uResolution.y;

    // One ink weight for the whole image, in device pixels.
    float w = min(uOutlineWidthPx, uOutlineMaxPx);

    vec2 dir = vn.xy;
    float len = length(dir);
    dir = len > 1.0e-4 ? dir / len : vec2(1.0, 0.0);
    // Floor-and-ramp, not a gate: see the note above. 0.68 is enough to close
    // the ring on a 30° face without letting a face pointing straight at the
    // camera drag its shell out sideways into view.
    float mag = mix(0.68, 1.0, smoothstep(0.0, 0.26, len));
    mvPosition.xy += dir * (w * mag * unitsPerPixel);
    // Away from the eye (view space looks down -Z), so a coincident shell
    // always loses the depth test instead of dithering against it. Scaled with
    // the push, because a shell displaced w pixels sideways across a grazing
    // surface is also displaced in depth and will otherwise surface through it.
    mvPosition.z -= unitsPerPixel * (2.0 + w);

    // Apparent size of this object, in pixels of radius → line alpha.
    float projPx = uOutlineRadius / max(unitsPerPixel, 1e-6);
    vOutlineFade = (uOutlineFadePx > 0.0 && uOutlineRadius > 0.0)
      ? smoothstep(uOutlineFadePx * 0.45, uOutlineFadePx, projPx)
      : 1.0;
  }
`,lo=`
  precision highp float;

  uniform vec3 uColor;
  uniform sampler2D uRamp;
  uniform float uRampScale;
  uniform vec3 uRimColor;
  uniform float uRimPower;
  uniform float uRimStrength;
  uniform vec3 uSpecColor;
  uniform float uSpecSize;
  uniform float uSpecSize2;
  uniform float uSpecStrength;
  uniform sampler2D uMatcap;
  uniform float uMatcapStrength;
  uniform vec3 uAmbientColor;
  uniform float uAmbientStrength;
  uniform float uOpacity;
  uniform vec3 uSunDir;
  uniform vec3 uCameraPos;
  uniform float uTime;
  uniform float uGlassBands;
  uniform vec3 uGlassShade;

  varying vec3 vWorldNormal;
  varying vec3 vViewNormal;
  varying vec3 vWorldPos;
  varying vec3 vViewPos;
  varying vec2 vUv;
  varying vec3 vColor4;
  varying vec4 vObjPosGlass;

  CHUNK_FRAGMENT_HEAD

  void main() {
    vec3 N = normalize(vWorldNormal);
    #ifdef FLAT_SHADING
      N = normalize(cross(dFdx(vWorldPos), dFdy(vWorldPos)));
    #endif
    vec3 V = normalize(uCameraPos - vWorldPos);
    vec3 L = normalize(uSunDir);

    vec3 baseColor = uColor * vColor4;

    // ── Quantised diffuse ───────────────────────────────────────────────────
    // Half-lambert widens the usable range so the ramp's bands land where we
    // placed them rather than crushing everything past the terminator into
    // band 0. The ramp texture itself does the stepping (NearestFilter).
    float ndl = dot(N, L) * 0.5 + 0.5;
    vec4 rampSample = texture2D(uRamp, vec2(clamp(ndl, 0.01, 0.99), 0.5));
    vec3 celShade = rampSample.rgb * uRampScale;
    float celAmbient = rampSample.a;

    CHUNK_FRAGMENT_BODY

    vec3 lit = baseColor * celShade;

    // ── Ambient bounce in the shadow bands ──────────────────────────────────
    // The ramp alone can only *scale* the surface colour, so a shadow could only
    // ever be a darker version of the base hue — a vermilion hull measured
    // (58,2,2) in the first capture, a black-red with the green and blue
    // channels effectively switched off. Adding a cool sea-and-sky bounce into
    // the dark bands is what makes the terminator a *hue* transition, and it
    // lifts the shadow enough that the ink line reads as a separate mark
    // instead of merging into it.
    // 0.62 hue retention, not 0.45: at 0.45 the ambient overwhelmed small dark
    // objects and the shadow side of the racer's red helmet came out flat
    // grey-blue, so the helmet read as two different materials
    // (shots/cel_r4/rider_closeup.png at 3×).
    lit += uAmbientColor * (celAmbient * uAmbientStrength) * mix(vec3(1.0), baseColor, 0.62);

    // ── Everything below this line is a *mask*, never a gradient ────────────
    // Each remaining term is thresholded to a hard shape and then *substituted*
    // into the surface tone with mix() rather than added to it. Adding was the
    // defect: three additive terms (spec + rim + matcap), each smoothly varying
    // in amplitude, summed into a continuously varying surface, and the ramp's
    // banding underneath was buried. Measured on the player's deck in
    // shots/r2/outline_check.png: 4666 distinct colours in a 626×62 patch with
    // no step anywhere across it — quantised Lambert plus three airbrushes.
    // Substitution keeps the flat fill flat: a pixel is either the band tone or
    // the highlight tone, and the boundary between them is one pixel wide.

    // ── Drawn glass bands ───────────────────────────────────────────────────
    // GLASS_BANDS. Three hard parallel streaks along a fixed object-space axis:
    // a wide cool "sky" band, a gap, and a narrow bright band. Object space, not
    // view space, because this is a *painted* reflection — an animator draws two
    // streaks on a windscreen and leaves them there. A view-dependent version
    // slides across the pane as the boat turns and immediately reads as a
    // simulated environment probe, which is the look the brief rules out.
    //
    // Why it is gated the way it is. The failure this fixes is specific: a large
    // near-white plate has a constant NdotL, so the four-band ramp has nowhere
    // to land and the plate is one flat fill (the windscreen in
    // shots/cel_r2/ocean_low.png). The gate therefore selects exactly that case
    // and nothing else:
    //   • .w  — object normal raked (0.34 < n.y < 0.87, |n.z| > 0.34). Selects
    //           the windscreen's pane and rejects the deck (n.y ≈ 1), the
    //           waterline stripe and the grips (n.y ≈ 0), and every axis-aligned
    //           box face on the boat.
    //   • near-white, near-neutral base — the "paper" surfaces only. The hull's
    //           vermilion, the graphite trim, the gates and the rider's tinted
    //           suit all fail it, so none of them pick up streaks.
    // Materials can force it on or off with glassBands.
    {
      float bright = step(0.80, min(min(baseColor.r, baseColor.g), baseColor.b));
      float g = dot(vObjPosGlass.xyz, normalize(vec3(0.62, 0.55, -0.56))) * 3.1;
      float f = fract(g);
      // One wide band and one narrow band per cycle: two marks read as intent.
      float wide   = step(0.06, f) * (1.0 - step(0.40, f));
      float narrow = step(0.56, f) * (1.0 - step(0.66, f));
      float gate = bright * vObjPosGlass.w * uGlassBands;
      // Substituted into the shaded tone, like every other mask in this shader,
      // so the result is still two flat fills with a one-pixel boundary.
      lit = mix(lit, lit * uGlassShade, wide * gate);
      lit = mix(lit, mix(lit, uSpecColor, 0.85), narrow * gate);
    }

    // ── Banded specular ─────────────────────────────────────────────────────
    // Two hard thresholds on the Blinn term, never a pow() falloff, gated by
    // the diffuse band: an unshadowed step() on N·H puts highlights on faces
    // the key light never reaches, the single most PBR-looking mistake here.
    vec3 H = normalize(L + V);
    float spec = dot(N, H);
    float specLight = step(0.5, ndl);
    float specMask = specLight * (step(uSpecSize, spec) * 0.42 + step(uSpecSize2, spec) * 0.58);
    lit = mix(lit, uSpecColor, clamp(specMask * uSpecStrength * 2.0, 0.0, 1.0));

    // ── Fresnel rim ─────────────────────────────────────────────────────────
    // Two steps on the fresnel term, so the rim is a drawn edge and not an
    // airbrush, and gated — not weighted — everywhere else: on the lit side of
    // the form only, and off up-facing planes, where a rim floods a whole deck
    // with a pale wash instead of drawing a line. Every factor here is a step()
    // for the same reason: a smoothly varying stroke width reads as a shaded
    // shell, not as a line an animator drew.
    float fres = 1.0 - max(dot(N, V), 0.0);
    float rim = pow(fres, uRimPower);
    float rimSide = step(-0.18, dot(N, L)) * 0.42 + step(0.28, dot(N, L)) * 0.58;
    float rimFlank = 1.0 - step(0.74, N.y) * 0.85;
    // Thresholds are low on purpose. A rim confined to the last 2% of the form
    // is completely hidden underneath the inverted-hull ink line, which sits in
    // exactly that band — the first captures had a mathematically correct rim
    // that could not be seen anywhere. These two steps put the light-line
    // *inboard* of the ink, which is where an animator draws it.
    float rimMask = (step(0.26, rim) * 0.40 + step(0.55, rim) * 0.60) * rimSide * rimFlank;
    lit = mix(lit, uRimColor, clamp(rimMask * uRimStrength, 0.0, 1.0));

    // ── Faked reflection ────────────────────────────────────────────────────
    // A drawn matcap, sampled by the view-space normal. Deliberately not a
    // cubemap: an accurate reflection is the fastest way to make a surface read
    // as physically based. The disc is a *drawing* (see makeGlossMatcap), so its
    // marks are admitted through two hard thresholds — a flat plane that samples
    // an unmarked part of the disc picks up exactly nothing, which is what stops
    // the foredeck reading as a pale bare panel.
    #ifdef USE_MATCAP
      vec3 vn = normalize(vViewNormal);
      vec2 mUv = vn.xy * 0.5 + 0.5;
      vec3 mc = texture2D(uMatcap, mUv).rgb;
      float mcl = max(max(mc.r, mc.g), mc.b);
      float mcMask = (step(0.10, mcl) * 0.45 + step(0.30, mcl) * 0.55) * step(0.56, ndl);
      lit = mix(lit, mix(uSpecColor, baseColor, 0.30), clamp(mcMask * uMatcapStrength, 0.0, 1.0));
    #endif

    gl_FragColor = vec4(lit, uOpacity);
  }
`,ho=`
  precision highp float;

  uniform float uObjectId;
  uniform float uEdgeBias;
  uniform float uFlareMask;
  uniform float uFar;

  in vec3 vWorldNormal;
  in vec3 vViewNormal;
  in vec3 vWorldPos;
  in vec3 vViewPos;
  in vec2 vUv;
  in vec3 vColor4;

  layout(location = 0) out vec4 gNormal;
  layout(location = 1) out vec4 gDepthId;

  void main() {
    vec3 vn = normalize(vViewNormal);
    gNormal = vec4(vn * 0.5 + 0.5, uEdgeBias);
    gDepthId = vec4(clamp(-vViewPos.z / uFar, 0.0, 1.0), uObjectId, uFlareMask, 1.0);
  }
`;function xt(i,e,t){return i.replace("CHUNK_VERTEX_HEAD",e?.vertexHead??"").replace("CHUNK_VERTEX_BODY",e?.vertexBody??"").replace("CHUNK_VERTEX_OUTLINE",t?ro:"").replace("CHUNK_FRAGMENT_HEAD",e?.fragmentHead??"").replace("CHUNK_FRAGMENT_BODY",e?.fragmentBody??"")}function co(i){return i.replace(/\battribute\b/g,"in").replace(/\bvarying\b/g,"out").replace(/\btexture2D\b/g,"texture")}let $t=1;function uo(){return $t=$t%250+1,$t/255}let Qt=null;function fo(){return Qt||(Qt=eo(V(T.ambient).multiplyScalar(.4),V(T.waterMid).multiplyScalar(.3),V(T.foam).multiplyScalar(.6))),Qt}V(T.ambient).multiplyScalar(.72);function Se(i={}){const e=V(i.color??T.hull0),t=io(i.rampColors??oo()),s=i.rampStops??ao,a=i.rampAmbient??no(t,1),o=Math.min(8,Math.max(1,...t.map(v=>Math.max(v.r,v.g,v.b)))),n=o>1?t.map(v=>v.clone().multiplyScalar(1/o)):t,r=Ji(n,s,64,a),h={uColor:{value:e},uRamp:{value:r},uRampScale:{value:o},uRimColor:{value:V(i.rimColor??T.rimLight)},uRimPower:{value:i.rimPower??3},uRimStrength:{value:i.rimStrength??.6},uSpecColor:{value:V(i.specColor??T.foam)},uSpecSize:{value:i.specSize??.94},uSpecSize2:{value:i.specSize2??.985},uSpecStrength:{value:i.specStrength??.3},uMatcap:{value:i.matcap===null?null:i.matcap??fo()},uMatcapStrength:{value:i.matcapStrength??.34},uAmbientColor:{value:V(i.ambientColor??T.waterMid).lerp(V(T.skyHorizon),.52)},uAmbientStrength:{value:i.ambientStrength??.62},uOpacity:{value:i.opacity??1},uGlassBands:{value:i.glassBands??1},uGlassShade:{value:It(V(T.skyMid)).lerp(Aa,.45).multiplyScalar(.58)},uObjectId:{value:i.objectId??uo()},uEdgeBias:{value:i.edgeBias??1},uFlareMask:{value:i.flareMask??1},uOutlineWidthPx:{value:i.outlineWidthPx??2.6},uOutlineMaxPx:{value:i.outlineMaxPx??2.8},uOutlineColor:{value:V(i.outlineColor??T.ink)},uOutlineRadius:{value:0},uOutlineFadePx:{value:i.outlineFadePx??19},uTime:X.uTime,uSunDir:X.uSunDir,uCameraPos:X.uCameraPos,uResolution:X.uResolution,uTanHalfFov:X.uTanHalfFov,uNear:X.uNear,uFar:X.uFar,...i.chunks?.uniforms??{}},l={...i.chunks?.defines??{}};h.uMatcap.value&&(l.USE_MATCAP=""),i.vertexColors&&(l.USE_VERTEX_COLORS=""),i.flatShading&&(l.FLAT_SHADING="");const u=!!i.vertexColors,d=new ge({name:i.name??"cel",uniforms:h,defines:l,vertexShader:xt(Kt,i.chunks,!1),fragmentShader:xt(lo,i.chunks,!1),side:i.side??va,transparent:i.transparent??!1,opacity:i.opacity??1,vertexColors:u}),m=new ge({name:(i.name??"cel")+":prepass",uniforms:h,defines:l,glslVersion:Mi,vertexShader:co(xt(Kt,i.chunks,!1)),fragmentShader:ho,side:i.side??va,vertexColors:u});let c=null;return i.outline!==!1&&(c=new ge({name:(i.name??"cel")+":outline",uniforms:h,defines:l,vertexColors:u,vertexShader:xt(Kt,i.chunks,!0),fragmentShader:`
        precision highp float;
        uniform vec3 uOutlineColor;
        uniform vec3 uSunDir;
        uniform vec3 uAmbientColor;
        varying vec3 vWorldNormal;
        varying vec3 vWorldPos;
        varying vec3 vViewPos;
        varying float vOutlineFade;
        void main() {
          // Ink is not flat black and it is not one value all the way round.
          // A brush line thins and lightens where light rakes across the form
          // and thickens into the shadow, so the ink is lifted toward the
          // ambient on the sun side. Two hard steps, not a gradient — this is
          // still a drawn line, and a smoothly varying stroke reads as a
          // rendered shell rather than as ink.
          float lightSide = dot(normalize(vWorldNormal), normalize(uSunDir)) * 0.5 + 0.5;
          float lift = step(0.56, lightSide) * 0.55 + step(0.80, lightSide) * 0.45;
          vec3 ink = uOutlineColor + uAmbientColor * (lift * 0.022);
          // Alpha, not width, is how a line leaves at distance. See OUTLINE_PUSH.
          if (vOutlineFade < 0.004) discard;
          gl_FragColor = vec4(ink, vOutlineFade);
        }
      `,side:Gs,transparent:!0,depthWrite:!0,polygonOffset:!0,polygonOffsetFactor:4,polygonOffsetUnits:8})),{main:d,prepass:m,outline:c,uniforms:h}}function wa(i){if(i.getAttribute("aSmoothNormal"))return i;i.getAttribute("normal")||i.computeVertexNormals();const e=i.getAttribute("position"),t=i.getAttribute("normal"),s=e.count,a=new Float32Array(s*3),o=new Map,n=r=>Math.round(r*1e4);for(let r=0;r<s;r++){const h=`${n(e.getX(r))},${n(e.getY(r))},${n(e.getZ(r))}`,l=o.get(h);l?l.push(r):o.set(h,[r])}for(const r of o.values()){let h=0,l=0,u=0;for(const m of r)h+=t.getX(m),l+=t.getY(m),u+=t.getZ(m);const d=Math.hypot(h,l,u)||1;h/=d,l/=d,u/=d;for(const m of r)a[m*3+0]=h,a[m*3+1]=l,a[m*3+2]=u}return i.setAttribute("aSmoothNormal",new H(a,3)),i}function Oe(i,e,t=0){wa(i.geometry),i.geometry.boundingSphere||i.geometry.computeBoundingSphere();const s=i.geometry.boundingSphere?.radius??1,a=e.uniforms.uOutlineRadius;if(a&&(a.value=Math.max(a.value,s)),i.material=e.main,i.renderOrder=t,i.userData.prepassMaterial=e.prepass,i.userData.celSet=e,e.outline){const o=new le(i.geometry,e.outline);o.name=i.name+":outline",o.renderOrder=t-1,o.frustumCulled=i.frustumCulled,o.userData.skipPrepass=!0,o.userData.isOutline=!0,i.add(o)}return i}function po(i,e){i.traverse(t=>{const s=t.userData?.celSet;s&&(s.uniforms.uOutlineWidthPx.value=e)})}const Pa=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,mo={uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepthId:{value:null},tFlare:{value:null},uResolution:{value:new Je},uInkColor:{value:V(T.ink)},uHaloColor:{value:V(T.rimLight)},uHaloThreshold:{value:.045},uHaloWidthPx:{value:3.2},uHullOwnedPx:{value:4},uThickness:{value:1.15},uDepthThreshold:{value:.006},uNormalThreshold:{value:.235},uEdgeStrength:{value:.95},uFlareStrength:{value:.24},uVignette:{value:0},uDither:{value:0},uPaperCentre:{value:.01},uPaperEdge:{value:.024},uPaperLumKnee:{value:.34}},vertexShader:Pa,fragmentShader:`
    precision highp float;

    uniform sampler2D tDiffuse;
    uniform sampler2D tNormal;
    uniform sampler2D tDepthId;
    uniform sampler2D tFlare;
    uniform vec2 uResolution;
    uniform vec3 uInkColor;
    uniform vec3 uHaloColor;
    uniform float uHaloThreshold;
    uniform float uHaloWidthPx;
    uniform float uHullOwnedPx;
    uniform float uThickness;
    uniform float uDepthThreshold;
    uniform float uNormalThreshold;
    uniform float uEdgeStrength;
    uniform float uFlareStrength;
    uniform float uVignette;
    uniform float uDither;
    uniform float uPaperCentre;
    uniform float uPaperEdge;
    uniform float uPaperLumKnee;

    varying vec2 vUv;

    float ditherNoise(vec2 c) {
      vec2 p = floor(mod(c, 8.0));
      return fract(52.9829189 * fract(dot(p, vec2(0.06711056, 0.00583715))));
    }

    /**
     * Applied last, in the composite, so nothing downstream re-quantises.
     *
     * ── Why there is no vignette any more ──────────────────────────────────
     * There were two stepped rings here, on the theory that hard steps keep each
     * fill flat *within* a ring. They do, but every band in the image still came
     * out in three near-identical variants — one per ring — and that is exactly
     * what the ramp contract forbids: the final pixel must land on a band.
     * Measured on shots/r3/hero.png: (2,35,147)/(2,34,145)/(2,33,141) and
     * (9,100,206)/(9,98,202)/(8,95,197) for a water field with five bands, and
     * 624 unique colours in the water region. A ~0.97 multiplier applied after
     * the band lookup is a multiplier applied after the band lookup no matter
     * how few discrete values it takes.
     *
     * uVignette is kept as a uniform so the number is discoverable and dead,
     * rather than being silently reintroduced by someone re-deriving it.
     */
    /**
     * Press texture. See the uniform block for why this is allowed to exist
     * where uDither is not: screen-locked, block-quantised, value-quantised.
     */
    /**
     * Unstructured hash. Deliberately NOT ditherNoise() — that is interleaved
     * gradient noise, whose whole design is a *regular* gradient. Sampling it
     * on block coordinates exposes the regularity directly, and the first
     * attempt at this grain came out as a woven mesh across the sky rather
     * than as paper.
     */
    float paperHash(vec2 p) {
      vec3 q = fract(vec3(p.xyx) * vec3(0.1031, 0.1030, 0.0973));
      q += dot(q, q.yzx + 33.33);
      return fract((q.x + q.y) * q.z);
    }

    vec3 paperGrain(vec3 col, vec2 uv) {
      // Two block scales. Fibre is stretched horizontally because paper fibre
      // is — an isotropic block reads as digital noise, not as stock.
      float fibre = paperHash(floor(gl_FragCoord.xy / vec2(5.0, 2.0)));
      float grain = paperHash(floor(gl_FragCoord.xy / 2.0) + 31.7);
      float n = fibre * 0.58 + grain * 0.42;

      // Three levels: -1, 0, +1. A flat fill becomes three flat fills.
      n = floor(n * 3.0) - 1.0;

      // Rectangular falloff, so the heavier press texture follows the frame
      // rather than describing a circle inside it.
      vec2 d = abs(uv - 0.5) * 2.0;
      float rect = clamp(max(d.x * d.x * d.x, d.y * d.y * d.y), 0.0, 1.0);
      float amp = mix(uPaperCentre, uPaperEdge, rect);

      float lum = dot(col, vec3(0.2126, 0.7152, 0.0722));

      // Scale with local value. A fixed linear offset is a *huge* relative
      // perturbation on a night sky — 0.013 against a 0.03 sky is 43%, which
      // is what made the first pass read as fabric. Grain has to be a
      // proportion of what it sits on, with a floor so the deepest water still
      // gets some tooth.
      amp *= 0.28 + 0.72 * sqrt(clamp(lum * 4.0, 0.0, 1.0));

      // Emitters stay clean.
      amp *= 1.0 - smoothstep(uPaperLumKnee, uPaperLumKnee * 3.0, lum);

      return col + n * amp;
    }

    vec3 finish(vec3 col, vec2 uv) {
      float lsb = 0.0034 * pow(max(max(col.r, col.g), col.b), 0.55) * uDither;
      col = col + (ditherNoise(gl_FragCoord.xy) - 0.5) * lsb;
      return paperGrain(col, uv);
    }

    /**
     * Highest and lowest G-buffer coverage flag within radPx of this pixel,
     * as (max, min).
     *
     * tDepthId.a is 1 wherever anything wrote the G-buffer and 0 where nothing
     * did — the sky, the ocean, foam and spray, and every outline shell. So
     * max == 1 means "geometry is nearby" and min == 0 means "background is
     * nearby", and a pixel with both is on a silhouette.
     *
     * Two rings of eight, at radPx and 55% of it. Eight directions is enough on a
     * contour — a silhouette is a *line*, so one of eight evenly spaced taps
     * lands within 22.5 degrees of its perpendicular — and the inner ring stops a
     * thin object slipping between the outer taps.
     */
    vec2 gbufRing(vec2 uv, float radPx) {
      vec2 r = radPx / uResolution;
      float hi = 0.0, lo = 1.0;
      const float K = 0.7071;
      vec2 dirs[8];
      dirs[0] = vec2(1.0, 0.0);      dirs[1] = vec2(-1.0, 0.0);
      dirs[2] = vec2(0.0, 1.0);      dirs[3] = vec2(0.0, -1.0);
      dirs[4] = vec2(K, K);          dirs[5] = vec2(-K, K);
      dirs[6] = vec2(K, -K);         dirs[7] = vec2(-K, -K);
      for (int i = 0; i < 8; i++) {
        float a = texture2D(tDepthId, uv + dirs[i] * r).a;
        float b = texture2D(tDepthId, uv + dirs[i] * r * 0.55).a;
        hi = max(hi, max(a, b));
        lo = min(lo, min(a, b));
      }
      return vec2(step(0.5, hi), step(0.5, lo));
    }

    /**
     * The flare, quantised into two hard shells.
     *
     * The streak buffer is a blurred field, so adding it directly paints a soft
     * radial glow — which is exactly what shots/r2/sky.png shows around the sun
     * (a soft white ellipse in a soft yellow halo) and what put a soft white
     * blob on the rider's helmet in shots/r2/rider_closeup.png. Thresholding its
     * luminance turns the same buffer into a *shape* with a crisp boundary: the
     * blur decides the outline of the shape, the steps decide that it has one.
     */
    vec3 flareAt(vec2 uv) {
      vec3 f = texture2D(tFlare, uv).rgb;
      float l = dot(f, vec3(0.2126, 0.7152, 0.0722));
      float m = step(0.030, l) * 0.42 + step(0.115, l) * 0.58;
      // Normalised to its own hue so the two shells are flat fills, not a ramp.
      vec3 hue = f / max(max(max(f.r, f.g), f.b), 1e-4);
      return hue * m * uFlareStrength;
    }

    void main() {
      /**
       * Nib pressure.
       *
       * A constant-width line is the tell that an outline was computed rather
       * than drawn, so the Sobel's sampling width breathes ±14% across the
       * frame. Two incommensurate sine frequencies rather than a hash: the
       * width feeds a derivative, and a block-quantised width would put a
       * visible step everywhere the block changed. This is smooth and, like the
       * paper, locked to screen space so it does not crawl.
       */
      float p1 = sin(gl_FragCoord.x * 0.017 + gl_FragCoord.y * 0.009);
      float p2 = sin(gl_FragCoord.x * -0.006 + gl_FragCoord.y * 0.021 + 2.1);
      float pressure = 1.0 + 0.14 * (p1 + p2) * 0.5;

      vec2 texel = uThickness * pressure / uResolution;
      vec3 scene = texture2D(tDiffuse, vUv).rgb;

      vec4 nc = texture2D(tNormal, vUv);
      vec4 dc = texture2D(tDepthId, vUv);
      float edgeBias = nc.a;
      float centreDepth = dc.r;
      float centreId = dc.g;

      // ── Nothing wrote the G-buffer here: sky, ocean, foam, outline shells ──
      //
      // HALO. This is where the value-adaptive contour is drawn, and it is the
      // answer to a measured defect: the ink (10,26,46) is L23, the ocean's
      // second-darkest band (1,22,101) is L25 and its darkest (1,7,40) is L9, so
      // roughly a quarter of every hull's silhouette was a dark line on an
      // equally dark or darker field — no readable contour at all
      // (shots/cel_r2/hud.png: an ink-detector keyed to PAL.ink returns 49,043
      // water pixels).
      //
      // Thickening the line cannot fix a value collision, and the palette's water
      // bands are not this subsystem's to lift. What an animator does instead is
      // switch the contour: dark ink over light ground, *light* ink over dark
      // ground. So on the outside of a silhouette — which is where the
      // inverted-hull shell has laid its ink, since the shell is only ever
      // visible outside the surface it belongs to — the local background tone
      // decides which of the two inks is drawn. The width is one constant number
      // of device pixels, exactly as with the dark line.
      //
      // The background tone is sampled *further out* than the contour, because
      // the pixel under the contour has already been painted with ink and no
      // longer carries the ground's value.
      if (dc.a < 0.5 || edgeBias <= 0.001) {
        vec3 outc = scene;
        if (dc.a < 0.5) {
          vec2 ring = gbufRing(vUv, uHaloWidthPx);
          vec2 far = (uHaloWidthPx + 4.0) / uResolution;
          vec3 g0 = texture2D(tDiffuse, vUv + vec2(far.x, 0.0)).rgb;
          vec3 g1 = texture2D(tDiffuse, vUv - vec2(far.x, 0.0)).rgb;
          vec3 g2 = texture2D(tDiffuse, vUv + vec2(0.0, far.y)).rgb;
          vec3 g3 = texture2D(tDiffuse, vUv - vec2(0.0, far.y)).rgb;
          // Darkest of the four, so a hull sitting half on a bright crest and
          // half in a trough still gets the light line along the dark half.
          vec3 ground = min(min(g0, g1), min(g2, g3));
          float groundLum = dot(ground, vec3(0.2126, 0.7152, 0.0722));
          float dark = 1.0 - step(uHaloThreshold, groundLum);
          outc = mix(outc, uHaloColor, ring.x * dark);
        }
        outc += flareAt(vUv);
        gl_FragColor = vec4(finish(outc, vUv), 1.0);
        return;
      }

      // HULL-OWNED SILHOUETTES. The inverted hull draws every exterior contour,
      // so the screen-space pass must not draw one too — two lines abutting is
      // the measured 6-7 device-px two-tone band on the course gates, double the
      // 3 px the boats carry. The old test for this was the *magnitude* of the
      // depth gradient, which is only a proxy and got it wrong in both
      // directions: it let a distant gate's silhouette through, and it suppressed
      // the rider's arm-over-torso boundary, which is not an exterior silhouette
      // at all and which the shell physically cannot draw (the arm rests on the
      // chest, so the shell's back face is at the contact depth and loses the
      // depth test). Ask the question directly instead: is background within
      // uHullOwnedPx? If so the shell owns this contour; if not, the Sobel does.
      float hullOwned = 1.0 - gbufRing(vUv, uHullOwnedPx).y;

      vec3 centreNormal = nc.rgb * 2.0 - 1.0;

      // 3×3 Sobel kernels, applied to all three signals in one sweep.
      const vec3 kx = vec3(-1.0, 0.0, 1.0);
      float gxDepth = 0.0, gyDepth = 0.0;
      float normalSum = 0.0;
      float idDiff = 0.0;

      for (int j = -1; j <= 1; j++) {
        for (int i = -1; i <= 1; i++) {
          vec2 off = vec2(float(i), float(j)) * texel;
          vec4 sd = texture2D(tDepthId, vUv + off);
          vec4 sn = texture2D(tNormal, vUv + off);

          // Sobel weights: [-1 0 1; -2 0 2; -1 0 1]
          float wx = kx[i + 1] * (j == 0 ? 2.0 : 1.0);
          float wy = kx[j + 1] * (i == 0 ? 2.0 : 1.0);
          gxDepth += sd.r * wx;
          gyDepth += sd.r * wy;

          // Mean, not max. A max over the 3x3 fires on a *single* aliased
          // sample, which is what a grazing surface produces in quantity — one
          // facet a pixel wide, one wildly different normal, one dot of ink. A
          // real crease runs through the kernel and shows up in three or four of
          // the eight neighbours, so the mean separates the two: a line scores
          // ~0.83 of the true break, an isolated alias ~0.27.
          vec3 sNormal = sn.rgb * 2.0 - 1.0;
          normalSum += 1.0 - dot(centreNormal, sNormal);
          idDiff = max(idDiff, abs(sd.g - centreId) > 0.002 ? 1.0 : 0.0);
        }
      }

      // Relative depth gradient → distance-invariant line weight.
      float depthGrad = length(vec2(gxDepth, gyDepth)) / max(centreDepth, 1e-4);
      float depthEdge = smoothstep(uDepthThreshold, uDepthThreshold * 3.4, depthGrad);
      float normalDiff = (normalSum / 8.0) * 2.2;
      float normalEdge = 0.0;

      // Grazing surfaces are the one place a normal-difference Sobel lies. A
      // panel seen almost edge-on packs many facets into a few pixels, so the
      // G-buffer normal is undersampled and every tessellation seam reads as a
      // crease — dense diagonal hatch across the boat's foredeck in
      // shots/cel_r2/outline_check.png.
      //
      // Fading the signal out there (what this did before) throws the baby out:
      // the hull's chine is a 50-70° authored break on a *flank*, i.e. exactly a
      // grazing surface, and multiplying its response by ~0 is why that crease
      // has never been inked in any capture despite the boat being authored
      // non-indexed with per-face normals to provide it. Raise the *threshold*
      // instead — a grazing surface must break harder to earn a line, so real
      // creases survive and tessellation seams (a few degrees) do not.
      float facing = abs(centreNormal.z);
      float grazeThr = uNormalThreshold * mix(2.4, 1.0, smoothstep(0.10, 0.45, facing));
      normalEdge = smoothstep(grazeThr, grazeThr * 1.75, normalDiff);

      // Object-over-object silhouettes — a boat crossing a gate, a rider's helmet
      // against the deck — are not adjacent to background, so hullOwned cannot
      // see them, but the shell does draw them (there is a real depth gap for it
      // to win). Those are the only case the depth-gradient proxy is still needed
      // for, so the thresholds are now set where a genuine metres-deep gap lives
      // and nothing else: the arm-on-chest case measures ~0.05 relative gradient
      // and stays fully inked, a hull in front of a gate 40 m behind it measures
      // an order of magnitude more and does not.
      float silhouette = max(hullOwned, smoothstep(uDepthThreshold * 30.0, uDepthThreshold * 80.0, depthGrad));
      depthEdge *= (1.0 - silhouette * 0.96);
      normalEdge *= (1.0 - silhouette * 0.96);

      // Interior lines are the whole reason this pass exists, so the normal
      // signal leads and the depth signal only fills in where two parallel
      // surfaces overlap (a wing over a cowl).
      float edge = clamp(max(max(depthEdge * 0.85, normalEdge), idDiff * (1.0 - silhouette * 0.96) * 0.8), 0.0, 1.0);
      edge *= edgeBias * uEdgeStrength;

      // A line is drawn or it is not there — two weights, hard thresholds.
      //
      // The smoothstep tail was producing ink at 1-2% opacity all over any
      // tessellated surface whose facets differ by a couple of degrees, and 1-2%
      // ink in a 1 px pattern is exactly the horizontal scanline striping the
      // critic measured across the hull and deck (values alternating de4836 /
      // e24936 down the deck in shots/cel_fix3/outline_check.png). It is
      // sub-pixel high-frequency detail on a moving object, so it shimmers at
      // speed. Clipping the tail to zero removes it at the source, and the two
      // surviving weights keep the line from reading as one uniform machine
      // stroke.
      edge = step(0.34, edge) * (0.60 + 0.40 * step(0.62, edge));

      // One ink value for the whole image.
      //
      // This was uInkColor + scene * 0.20, so the screen-space pass drew a
      // *different* ink from the inverted hull's: measured on the course gates in
      // shots/r3/hud.png as two abutting families, (10,26,46) from the shell and
      // (17,34,54)/(16,34,53) from here. Two ink constants side by side is what
      // makes a doubled edge read as muddy rather than merely thick, and the
      // brief asks for one ink weight and one ink value everywhere.
      vec3 col = mix(scene, uInkColor, edge);
      col += flareAt(vUv);

      gl_FragColor = vec4(finish(col, vUv), 1.0);
    }
  `},go={uniforms:{tDiffuse:{value:null},tDepthId:{value:null},uThreshold:{value:.58},uIntensity:{value:1}},vertexShader:Pa,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform sampler2D tDepthId;
    uniform float uThreshold;
    uniform float uIntensity;
    varying vec2 vUv;
    void main() {
      vec3 c = texture2D(tDiffuse, vUv).rgb;
      float lum = dot(c, vec3(0.2126, 0.7152, 0.0722));
      // step(), not smoothstep(): the flare should have a defined shape.
      float m = step(uThreshold, lum);
      vec4 g = texture2D(tDepthId, vUv);
      // g.a < 0.5 → nothing wrote the G-buffer here (sky, particles, foam,
      // outline shells): never flares. See the note above.
      float allow = g.a < 0.5 ? 0.0 : step(0.5, g.b);
      gl_FragColor = vec4(c * m * allow * uIntensity, 1.0);
    }
  `},vo={uniforms:{tDiffuse:{value:null},uResolution:{value:new Je},uRadius:{value:1},uCore:{value:.18},uStreak:{value:.42}},vertexShader:Pa,fragmentShader:`
    uniform sampler2D tDiffuse;
    uniform vec2 uResolution;
    uniform float uRadius;
    uniform float uCore;
    uniform float uStreak;
    varying vec2 vUv;

    void main() {
      vec2 px = uRadius / uResolution;
      vec3 centre = texture2D(tDiffuse, vUv).rgb;

      // Four axes: horizontal, vertical and both diagonals.
      const int AXES = 4;
      vec2 dirs[4];
      dirs[0] = vec2(1.0, 0.0);
      dirs[1] = vec2(0.0, 1.0);
      dirs[2] = vec2(0.7071, 0.7071);
      dirs[3] = vec2(0.7071, -0.7071);

      vec3 streak = vec3(0.0);
      float wsum = 0.0;
      for (int a = 0; a < AXES; a++) {
        // Geometric tap spacing: 1,2,4,8,16,28 px — a long reach for 12 fetches.
        float d = 1.0;
        for (int i = 0; i < 6; i++) {
          float w = 1.0 / (1.0 + d * 0.85);
          vec2 o = dirs[a] * px * d;
          streak += (texture2D(tDiffuse, vUv + o).rgb + texture2D(tDiffuse, vUv - o).rgb) * w;
          wsum += 2.0 * w;
          d *= 1.85;
        }
      }
      streak /= max(wsum, 1e-4);

      // Small isotropic core so the very centre of a glint is solid, and the
      // long streaks on top of it. The core is deliberately tiny: it is a
      // *highlight*, and anything wider starts reading as a lens.
      // The per-axis average is divided by the total weight of *all* axes, so
      // multiplying back by the axis count restores one axis' worth of energy.
      // Leaving the ×4 in (as the first pass did) made every near-white pixel a
      // blown streak across the hull — shots/cel_r1/outline_check.png.
      gl_FragColor = vec4(centre * uCore + streak * uStreak * float(AXES), 1.0);
    }
  `};class wo{constructor(e,t,s){this.renderer=e,this.scene=t,this.camera=s,this.gbuffer=new ut(1,1,{count:2,type:fa,format:ga,minFilter:Gt,magFilter:Gt,depthBuffer:!0,stencilBuffer:!1}),this.gbuffer.textures[0].name="gNormal",this.gbuffer.textures[1].name="gDepthId";const a={type:Ns,format:ga,depthBuffer:!1};this.flareA=new ut(1,1,a),this.flareB=new ut(1,1,a),this.composer=new ji(e,new ut(1,1,{type:fa})),this.composer.renderToScreen=!0,this.renderPass=new Ki(t,s),this.composer.addPass(this.renderPass),this.edgePass=new Zs(mo),this.edgePass.material.blending=Nt,this.composer.addPass(this.edgePass),this.composer.addPass(new $i),this.thresholdMat=new ge({...go,blending:Nt}),this.streakMat=new ge({...vo,blending:Nt}),this.fsQuad=new le(new Ti(2,2),this.thresholdMat),this.fsQuad.frustumCulled=!1,this.fsScene.add(this.fsQuad)}renderer;scene;camera;composer;gbuffer;flareA;flareB;thresholdMat;streakMat;edgePass;renderPass;fsScene=new Os;fsCamera=new _s(-1,1,1,-1,0,1);fsQuad;width=1;height=1;setSize(e,t,s){this.width=Math.max(1,Math.floor(e*s)),this.height=Math.max(1,Math.floor(t*s)),this.composer.setSize(e,t),this.composer.setPixelRatio(s),this.gbuffer.setSize(this.width,this.height),this.flareA.setSize(this.width>>2,this.height>>2),this.flareB.setSize(this.width>>2,this.height>>2),this.edgePass.uniforms.uResolution.value.set(this.width,this.height),this.streakMat.uniforms.uResolution.value.set(Math.max(1,this.width>>2),Math.max(1,this.height>>2))}renderGBuffer(){const e=[];this.scene.traverse(s=>{const a=s;if(!a.isMesh&&!a.isPoints&&!a.isLine)return;const o=a.userData.prepassMaterial;if(a.userData.skipPrepass||!o){a.visible&&(e.push({mesh:a,material:null,visible:!0}),a.visible=!1);return}e.push({mesh:a,material:a.material,visible:a.visible}),a.material=o});const t=this.renderer.getRenderTarget();this.renderer.setRenderTarget(this.gbuffer),this.renderer.setClearColor(0,0),this.renderer.clear(!0,!0,!1),this.renderer.render(this.scene,this.camera),this.renderer.setRenderTarget(t);for(const s of e)s.material===null||(s.mesh.material=s.material),s.mesh.visible=s.visible}renderFlare(e){const t=this.renderer.getRenderTarget();this.fsQuad.material=this.thresholdMat,this.thresholdMat.uniforms.tDiffuse.value=e,this.thresholdMat.uniforms.tDepthId.value=this.gbuffer.textures[1],this.renderer.setRenderTarget(this.flareB),this.renderer.clear(!0,!1,!1),this.renderer.render(this.fsScene,this.fsCamera),this.fsQuad.material=this.streakMat,this.streakMat.uniforms.tDiffuse.value=this.flareB.texture,this.renderer.setRenderTarget(this.flareA),this.renderer.clear(!0,!1,!1),this.renderer.render(this.fsScene,this.fsCamera),this.renderer.setRenderTarget(t)}render(){this.renderGBuffer();const e=this.edgePass.uniforms;e.tNormal.value=this.gbuffer.textures[0],e.tDepthId.value=this.gbuffer.textures[1],e.tFlare.value=this.flareA.texture,this.renderer.setClearColor(397348,1),this.composer.render(),this.renderFlare(this.composer.readBuffer.texture)}get gbufferDepth(){return this.gbuffer.textures[1]}get gbufferNormal(){return this.gbuffer.textures[0]}get edgeUniforms(){return this.edgePass.uniforms}get flareUniforms(){return this.thresholdMat.uniforms}get streakUniforms(){return this.streakMat.uniforms}dispose(){this.gbuffer.dispose(),this.flareA.dispose(),this.flareB.dispose(),this.composer.dispose()}}const Oa=2.2;function yo(){const i=new Ai(B.render.far*.46,64,40),e=new ge({name:"sky",side:Gs,depthWrite:!1,depthTest:!1,uniforms:{uTime:X.uTime,uSunDir:X.uSunDir,uZenith:{value:V(T.skyZenith)},uMid:{value:V(T.skyMid)},uHorizon:{value:V(T.skyHorizon)},uHaze:{value:V(T.skyHaze)},uSunScale:{value:Oa},uSunRayScale:{value:Math.sqrt(Oa)},uSunSquash:{value:1.32},uSunRayStrength:{value:.14},uBandWobble:{value:.055},uSunWobble:{value:.2},uSun:{value:V(T.sun)},uSunCore:{value:V(T.sunCore)},uFlare:{value:V(T.sunFlare)},uCloudLit:{value:V(T.cloudLit)},uCloudShade:{value:V(T.cloudShade)},uCloudRim:{value:V(T.inkSoft).lerp(V(T.skyZenith),.5)},uCloudCover:{value:.715},uCloudStretch:{value:1.7},uWind:{value:new M(.0075,0,.0042)}},vertexShader:`
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        // Strip translation: the dome is infinitely far away, so it must not
        // parallax as the camera drives across the ocean.
        vec4 mv = viewMatrix * vec4(position + cameraPosition, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_Position.z = gl_Position.w; // force to the far plane
      }
    `,fragmentShader:`
      precision highp float;

      uniform float uTime;
      uniform vec3 uSunDir;
      uniform vec3 uZenith, uMid, uHorizon, uHaze;
      uniform vec3 uSun, uSunCore, uFlare;
      uniform float uSunScale;
      uniform float uSunRayScale;
      uniform float uSunSquash;
      uniform float uSunRayStrength;
      uniform float uBandWobble;
      uniform float uCloudStretch;
      uniform float uSunWobble;
      uniform vec3 uCloudLit, uCloudShade, uCloudRim;
      uniform float uCloudCover;
      uniform vec3 uWind;

      varying vec3 vDir;

      // ── Value noise ────────────────────────────────────────────────────────
      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }
      float noise(vec2 p) {
        vec2 i = floor(p), f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        return mix(mix(hash(i), hash(i + vec2(1,0)), f.x),
                   mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x), f.y);
      }
      /**
       * Two octaves, for the *silhouette* field.
       *
       * Three was still too many. High-frequency content sitting near the
       * threshold does two things, both visible in shots/r2/sky.png: it punches
       * detached islands *inside* the mass (specks at 1339,1037 and 1512,1123)
       * and it frays the outline into the five-fingered amoeba the critic called
       * spilled milk. A cumulus silhouette is lumpy but closed, so the shape
       * field is deliberately the smoothest field in the shader.
       */
      float fbm2(vec2 p) {
        float v = 0.0, a = 0.5;
        for (int i = 0; i < 2; i++) { v += a * noise(p); p *= 2.11; a *= 0.5; }
        return v / 0.75;
      }
      /**
       * The cloud shape field. Factored out because the shading needs to sample
       * it at an *offset*, which is the whole trick below.
       */
      /**
       * ── Why this is stretched and heavily warped ─────────────────────────
       *
       * An isotropic noise field thresholded at a level set gives you round
       * blobs, and round blobs read as camouflage or as spilled paint — which
       * is exactly what the first Ember sky looked like. Two changes, both
       * about shape rather than colour:
       *
       * 1. **Anisotropy.** The field is sampled at different frequencies along
       *    x and z, so masses come out drawn out along one axis instead of
       *    equiaxed. Real layer cloud is sheared into bands by the wind, and
       *    this scene already has a wind vector pointing the same way, so the
       *    stretch agrees with the drift the clouds are already doing.
       * 2. **Stronger domain warp.** Raised from 0.58. The warp is what turns a
       *    level set from a smooth contour into a torn one; at low strength the
       *    outline stays recognisably a noise iso-line, which is the other half
       *    of the blob problem.
       */
      float cloudField(vec2 q, vec2 drift) {
        q *= vec2(1.0 / uCloudStretch, uCloudStretch * 0.92);
        float warp = fbm2(q * 1.55 - drift * 1.5);
        return fbm2(q * 1.12 + vec2(warp, warp * 0.72) * 0.86 + drift);
      }

      /**
       * One cel cloud layer: three flat tones and one contour, nothing else.
       *
       * The bands are built by *eroding the silhouette from the anti-sun side*
       * rather than by thresholding a second noise field. Sample the same shape
       * field a short step away from the sun: if that sample has left the cloud,
       * this pixel is within one band-width of the away-from-sun edge, so it is
       * in shadow. Two step lengths give two shadow depths, and the result is a
       * lit mass with a shadow crescent that always follows the form and always
       * agrees with SUN_DIR — which a threshold on an unrelated low-frequency
       * field does not, and did not: in shots/cel_fix2/sky.png entire masses
       * landed on one side of that threshold and came out flat white, exactly the
       * volume-less "spilled milk" the critic measured in r2.
       *
       * 'contour' lets the small high layer skip the line entirely. Three layers
       * each drawing their own contour crossed into line spaghetti wherever they
       * overlapped near the horizon (shots/r2/outline_check.png, 1008,187).
       */
      vec4 cloudLayer(vec2 uv, float scale, float cover, vec2 sunUv, float contour) {
        vec2 drift = uWind.xz * uTime * scale;
        vec2 p = uv * scale;
        float d = cloudField(p, drift);

        // The screen-space rate of change of the shape field, evaluated *before*
        // any early-out: a return inside a quad makes the derivative of anything
        // computed after it undefined, and a contour whose width goes undefined
        // is worse than no contour. This is what makes the line below a constant
        // number of *pixels* wide instead of a constant slice of the field, which
        // is a line that gets fatter every metre nearer the camera.
        //
        // Bounded, and switched off where the field is undersampled. Near the
        // horizon the flattened-dome projection compresses several field cycles
        // into a pixel, so fwidth there is a large fraction of the field's whole
        // range and an "unbounded 3 px line" becomes a 100 px slab of ink. A line
        // that cannot be drawn at the right width is not drawn.
        float aa = min(max(fwidth(d), 1.0e-5), 0.014);
        float lineOk = 1.0 - step(0.016, fwidth(d));

        if (step(cover, d) < 0.5) return vec4(0.0);

        // Three tones, spaced by *value*, not by taste: L255 / L211 / L167 in the
        // final frame. The previous ladder ran L255 / L211 / L181-with-a-L169-line
        // and read as mush — four of five nominal steps were invisible.
        //
        // Lit by default. A fair-weather cumulus is bright even in shadow, so the
        // shadow bands stay pale — dropping them further turned the mid-sky clouds
        // into smog in shots/cel_r2/sky.png.
        vec3 col = uCloudLit;

        // Erode from the anti-sun side: wide band → cloudShade, narrow band
        // nearer the edge → one step deeper. The deep band leans on the *ink*
        // now, which is what buys it 44 L of separation from cloudShade.
        float shifted = cloudField(p - sunUv * 0.34, drift);
        float shadeWide = 1.0 - step(cover, shifted);
        float shadeDeep = 1.0 - step(cover, cloudField(p - sunUv * 0.13, drift));
        col = mix(col, uCloudShade, shadeWide);
        col = mix(col, mix(uCloudShade, uCloudRim, 0.45), shadeDeep);

        // The interior shadow boundary, drawn as one hard ink line on the *lit*
        // side of the terminator — the band where the eroded field has just
        // cleared cover, not the region below it. Multiplying an "inside
        // cover + 2aa" mask by the "below cover" mask, which is how this read at
        // first, gives back the second mask unchanged: the whole shadow side came
        // out solid ink and both pale bands vanished from the frame
        // (shots/cel_r3/sky.png, 19.6% of the sky region in one flat L58).
        float shadeLine = step(cover, shifted) * (1.0 - step(cover + aa * 2.5, shifted));
        col = mix(col, uCloudRim, shadeLine * contour * lineOk);

        // The silhouette contour: constant screen width, three device pixels, the
        // same weight the boats carry. Every cloud gets one — they were the only
        // elements in the frame with no ink at all, which is why they read as flat
        // vector art pasted behind a cel-shaded game.
        float edge = 1.0 - step(cover + aa * 3.0, d);
        col = mix(col, uCloudRim, edge * contour * lineOk);

        return vec4(col, 1.0);
      }

      /**
       * One opposed pair of hard-edged triangular rays along an axis rotated by
       * 'rot' in the sun's tangent plane. Widest at the sun, tapering linearly to
       * a point at 'len'.
       */
      float rayPair(vec2 t, float rot, float len, float w0) {
        float c = cos(rot), s = sin(rot);
        vec2 q = vec2(t.x * c + t.y * s, -t.x * s + t.y * c);
        float along = abs(q.x);
        float perp = abs(q.y);
        float w = w0 * (1.0 - along / len);
        return step(perp, w) * step(along, len);
      }

      void main() {
        vec3 dir = normalize(vDir);
        float h = dir.y;
        vec3 L = normalize(uSunDir);

        // ── Banded gradient ─────────────────────────────────────────────────
        // Six flat bands, hard horizontal thresholds, no interpolation anywhere.
        //
        // This was three tones joined by "narrow" smoothsteps, on the theory that
        // fully hard steps would read as a rendering error. Measured on the
        // result: 69 distinct colours in 72 samples down one column and 606
        // unique colours in a 400×400 patch (shots/r2/sky.png). The sky is the
        // largest surface in most frames, so a 600-colour gradient is the single
        // most photoreal thing in the game and it drags everything else toward
        // realism with it. Committed bands instead.
        //
        // The thresholds are not evenly spaced: they crowd toward the horizon,
        // where the eye reads the sky as compressed, and open out overhead where
        // one big field of zenith blue is what an anime background actually is.
        // ── Band edges are disturbed, not ruled ──────────────────────────────
        //
        // Thresholding raw h draws every band edge as a perfectly straight
        // horizontal line across the whole dome. That is a ruler, not a sky:
        // the six bands came out as six flat stripes and read as a gradient
        // swatch. Real air is layered but the layers are not level — they sag,
        // bow and get pushed around.
        //
        // So h is perturbed by two slow, incommensurate waves in the azimuth
        // before it is thresholded. The bands stay hard-edged (the cel contract
        // is untouched — every pixel still lands on a committed tone) but their
        // boundaries now undulate. Amplitude is scaled by (1 - h) so the
        // disturbance is strongest near the horizon, where atmosphere actually
        // does this, and vanishes at the zenith where one clean field is wanted.
        float az = atan(dir.z, dir.x);
        float wob = sin(az * 2.0 + 0.7) * 0.55 + sin(az * 3.7 - 1.9) * 0.45;
        float hb = h + wob * uBandWobble * (1.0 - h) * (1.0 - h);

        vec3 sky = uHaze;
        sky = mix(sky, mix(uHorizon, uHaze, 0.42), step(0.019, hb));
        sky = mix(sky, uHorizon, step(0.056, hb));
        sky = mix(sky, mix(uHorizon, uMid, 0.62), step(0.108, hb));
        sky = mix(sky, uMid, step(0.186, hb));
        sky = mix(sky, mix(uMid, uZenith, 0.55), step(0.315, hb));
        sky = mix(sky, uZenith, step(0.545, hb));

        // Two more bands, this time radial around the sun, replacing what was a
        // smooth pow(sunSide, 4) desaturation plus a pow(sunSide, 40) glow —
        // i.e. an atmosphere model. Anime skies desaturate toward the sun in
        // *steps*, and the step edges are part of the drawing.
        //
        // Circular, and *close in*. Squashing the axis (dir.y * 0.78) made the
        // bands ellipses, which is half of why the critic read the sun as a lens
        // — a sun is a circle. And at 0.955 the outer band was a 17° disc: a pale
        // 800 px roundel sitting in the sky like a ghost image
        // (shots/cel_fix1/sky.png). These two sit just outside the drawn figure,
        // at ~9.5° and ~6.5°, so they read as the halo an animator paints round
        // the sun rather than as an object of their own.
        float sunSide = dot(dir, L);
        sky = mix(sky, mix(sky, uHaze, 0.42), step(0.9942, sunSide));

        // ── Sun ─────────────────────────────────────────────────────────────
        //
        // Drawn, not simulated. Hard disc, a collar, a detached annulus and
        // rays. There is no inverse-square falloff anywhere in here and nothing
        // the post blur can turn into haze: the whole figure is made of step()s.
        // Four concentric elements at most — a fifth and sixth turn the figure
        // into a bullseye (shots/cel_fix2/sky.png reads as a target, not a sun).
        //
        // ── Drawn BEFORE the clouds, deliberately ────────────────────────────
        // This block used to run after the cloud composite, which meant the sun
        // was painted over every cloud in the sky and could never be occluded.
        // A disc that nothing can ever pass in front of does not read as a body
        // in the scene; it reads as a decal stuck on the lens. Moving it here
        // lets cloud masses cut across the disc, which is the single most
        // recognisable thing a low sun does.
        //
        // ── Elliptical, deliberately ─────────────────────────────────────────
        // Radii are measured in the sun's own tangent plane so the figure can be
        // squashed vertically. Near the horizon refraction flattens the real
        // sun, and a perfect circle sitting on a sunset sky is most of what
        // makes it look pasted on. ex is horizontal by construction (up × L),
        // so tang.x is the horizontal axis and tang.y the vertical one.
        //
        // Radii are squared angular distances, matching the old 1 − cos(theta)
        // deficits: rad² ≈ 2(1 − sd). uSunScale keeps its meaning — angular
        // radius grows as its square root.
        vec3 up = abs(L.y) > 0.95 ? vec3(1.0, 0.0, 0.0) : vec3(0.0, 1.0, 0.0);
        vec3 ex = normalize(cross(up, L));
        vec3 ey = cross(L, ex);
        vec2 tang = vec2(dot(dir, ex), dot(dir, ey));
        vec2 tangE = vec2(tang.x, tang.y * uSunSquash);
        float rad2 = dot(tangE, tangE);

        // ── Break the circle ─────────────────────────────────────────────────
        // Concentric fills separated by hard steps are, geometrically, a
        // target. The squash helped but the edges were still *perfect* circles,
        // and a perfect circle is the thing the eye reads as a drawn symbol
        // rather than as a body of light.
        //
        // So every radius is modulated by the bearing around the sun before it
        // is thresholded. Same trick as the sky's band edges: the fills stay
        // flat and hard-edged (the cel contract is untouched) but their
        // outlines stop being compass work.
        float sunAng = atan(tang.y, tang.x);
        rad2 *= 1.0 + uSunWobble * (sin(sunAng * 3.0 + 1.3) * 0.62
                                  + sin(sunAng * 5.0 - 0.7) * 0.38);

        // ── Three nested fills, not five ─────────────────────────────────────
        // The daylight figure had a *detached* annulus sitting outside a gap,
        // and this file's own note warns that a fifth and sixth concentric
        // element "turns the figure into a bullseye — reads as a target, not a
        // sun". A separated ring is the most graphic element available and it
        // is what makes the disc read as a logo pasted on the sky.
        //
        // What a low sun actually presents is a bright core inside a continuous
        // glow that fades outward. So: core, collar, and one wide outer collar
        // that is *mixed* with whatever sky is behind it rather than painted
        // over it. Nested and touching, never detached.
        // Two fills, down from four. Every ring removed is one less circle for
        // the eye to count, and counting circles is what made it a target.
        float disc  = 1.0 - step(0.00150 * uSunScale, rad2);
        float halo  = (1.0 - step(0.00520 * uSunScale, rad2)) * (1.0 - disc);

        // Rays as *triangles*, defined by perpendicular distance from an axis
        // rather than by angular width. Thresholding on angle gives a shape
        // whose linear width grows with radius and then collapses, so each ray
        // came out lens-shaped — pointed at both ends, widest in the middle,
        // reading as a compass rose (shots/cel_probe3/sun_face.png).
        //
        // Four evenly spaced spokes are the most "graphic" thing in the figure
        // and the first thing that reads as a logo rather than as light, so
        // uSunRayStrength exists to dial them back. A high midday sun wants
        // them; a low one wants a soft stack of collars instead.
        float rayScale = uSunRayScale;
        float rays = 0.0;
        rays = max(rays, rayPair(tang,  0.0,       0.205 * rayScale, 0.0125 * rayScale));
        rays = max(rays, rayPair(tang,  1.5707963, 0.165 * rayScale, 0.0100 * rayScale));
        // The diagonals stop *inside* the annulus. When they reached it the
        // ring plus radial spokes read as a ship's wheel rather than as a sun.
        rays = max(rays, rayPair(tang,  0.7853982, 0.062 * rayScale, 0.0042 * rayScale));
        rays = max(rays, rayPair(tang, -0.7853982, 0.062 * rayScale, 0.0042 * rayScale));
        rays *= 1.0 - disc; // don't draw over the disc itself
        rays *= uSunRayStrength;

        // The outermost collar. Mixed *into* the sky rather than painted over
        // it, so it reads as the sky being lit near the sun instead of as
        // another ring of the target.
        float outer = (1.0 - step(0.0340 * uSunScale, rad2))
                    * step(0.00520 * uSunScale, rad2);

        sky = mix(sky, mix(sky, uFlare, 0.34), outer);
        sky = mix(sky, uFlare * 0.92, rays * 0.9);
        sky = mix(sky, uSun, halo);
        sky = mix(sky, uSunCore, disc);

        // ── Cel clouds ──────────────────────────────────────────────────────
        // Flattened-dome projection: 'dir.xz / (h + k)'. A true plane ('/h')
        // magnifies without bound at the zenith and leaves the upper sky empty.
        if (h > 0.008) {
          // Not an *alpha* fade. A cloud composited at 40% opacity is a
          // semi-transparent card over the sky: its edges go soft, overlapping
          // layers show through each other, and the pixel lands between two
          // committed tones instead of on one — measured as soft anti-aliased
          // cloud edges and see-through stacked layers in
          // shots/r3/countdown.png. So the horizon and bank falloffs below raise
          // the cloud *cover threshold* instead, which thins the masses by
          // shrinking their silhouettes. Every cloud pixel that survives is a
          // flat, fully opaque fill with a hard edge, in every phase.
          float horizonFade = smoothstep(0.008, 0.075, h);
          float horizonThin = (1.0 - horizonFade) * 0.30;

          // High layer: small, many, drifting faster in uv terms.
          vec2 uvHi = dir.xz / (h + 0.42);
          // The sun's direction inside the cloud plane, which is what the
          // shading erosion steps along.
          vec2 sunUv = normalize(L.xz + vec2(1e-5));
          // No contour on the small layer: three layers each drawing their own
          // line crossed into spaghetti wherever they overlapped.
          // Scales up across all three layers (1.35 → 2.30, 0.72 → 1.18,
          // 0.26 → 0.42). With a two-octave shape field the features come out
          // much larger for the same scale, and the low layer turned into one
          // 1000 px mass filling the middle of shots/cel_fix1/sky.png. Several
          // separate masses with sky between them is the composition.
          // The small layer draws its contour too. It was skipped because three
          // layers of line crossed into spaghetti near the horizon — but that was
          // with a *pale* rim over semi-transparent masses. With one committed ink
          // and opaque fills the topmost layer's line simply covers the ones
          // beneath it, which is how stacked cel layers are supposed to read.
          vec4 hi = cloudLayer(uvHi, 3.60, uCloudCover + 0.055 + horizonThin, sunUv, 1.0);

          // Low layer: bigger masses, slower, sits under the high one.
          vec2 uvLo = dir.xz / (h + 0.20);
          vec4 lo = cloudLayer(uvLo + 31.7, 1.95, uCloudCover + 0.020 + horizonThin, sunUv, 1.0);

          // Flat-bottomed bank hugging the horizon — the cumulus shelf that
          // anchors any anime seascape. Masked to a band in h so it cannot
          // climb into the clear sky above it.
          // Narrower and weaker than it was. A solid shelf across the whole
          // horizon is the "horizon smear" failure: in shots/cel_fix4/countdown.png
          // the bank plus the low layer covered the entire upper frame and the sky
          // read as flat overcast grey-blue — a different palette from the racing
          // shots, which is half of the "not committed across screens" defect.
          float bankBand = smoothstep(0.008, 0.030, h) * (1.0 - smoothstep(0.052, 0.115, h));
          float bankThin = (1.0 - bankBand) * 0.34;
          vec2 uvBank = dir.xz / (h + 0.085);
          // The bank reads as a shelf only if it is *solid*. Dropping its cover
          // below the other layers made it a lace curtain across the whole
          // horizon (shots/cel_probe3/sun_wide.png), so it now sits slightly
          // above them and gets a coarser field.
          vec4 bank = cloudLayer(uvBank * 0.36 + 77.0, 0.62, uCloudCover + 0.075 + bankThin, sunUv, 1.0);

          // Hard composites. .a is already 0 or 1 out of cloudLayer, so this is
          // a flat fill replacing a flat fill.
          sky = mix(sky, lo.rgb, lo.a);
          sky = mix(sky, bank.rgb, bank.a);
          sky = mix(sky, hi.rgb, hi.a);
        }

        // The sun is drawn BEFORE the clouds now. See the block above them.

        // No dither. It existed to hide 8-bit contouring in a long smooth ramp;
        // there is no longer a long smooth ramp to contour, and perturbing every
        // pixel of the largest surface in the frame is the opposite of a limited
        // palette. The banding is the drawing now.
        gl_FragColor = vec4(sky, 1.0);
      }
    `}),t=new le(i,e);return t.name="sky",t.frustumCulled=!1,t.renderOrder=-1e3,t.userData.skipPrepass=!0,t}const Wa=(i,e,t)=>i.clone().lerp(e,t);function bo(){const i=Js(512,7,5);return i.minFilter=Sa,i.generateMipmaps=!0,i.anisotropy=8,i.needsUpdate=!0,i}function xo(){const i=bo(),e=new ge({name:"ocean",side:va,transparent:!1,uniforms:{uWaveA:{value:Le.uWaveA},uWaveB:{value:Le.uWaveB},uTime:X.uTime,uSunDir:X.uSunDir,uCameraPos:X.uCameraPos,uResolution:X.uResolution,uTanHalfFov:X.uTanHalfFov,uFar:X.uFar,uNoise:{value:i},uSceneDepth:{value:null},uTrough:{value:T.waterShadow.clone()},uDeep:{value:Wa(T.waterShadow,T.waterMid,.42)},uMid:{value:T.waterMid.clone()},uShallow:{value:T.waterShallow.clone()},uCrest:{value:T.waterCrest.clone()},uSss:{value:T.waterSss.clone()},uFoam:{value:T.foam.clone()},uFoamShade:{value:T.foamShade.clone()},uHorizonTint:{value:T.skyHorizon.clone()},uHaze:{value:T.skyHaze.clone()},uSeaFar:{value:Wa(T.waterMid,T.skyHorizon,.34)},uFilterBase:{value:.394},uFilterSlope:{value:.028},uFilterScale:{value:.62},uSunWeight:{value:2.15},uSunPivot:{value:X.uSunDir.value.y},uSwellFoot:{value:7.5},uDetailWeight:{value:.52},uFresWeight:{value:.26},uFresPivot:{value:.34},uGraze:{value:1},uHeightWeight:{value:.06},uHeightScale:{value:1.9},uRagPixels:{value:6},uTilePatch:{value:210},uTileMacro:{value:63},uTileMeso:{value:17},uTileMicro:{value:5.6},uWarp:{value:14},uRippleStrength:{value:.05},uBand0:{value:.07},uBand1:{value:.33},uBand2:{value:.56},uBand3:{value:.79},uCurvGain:{value:2.6},uSheen:{value:.5},uRidgeSlope:{value:.075},uRidgeHeight:{value:.18},uMinFeaturePx:{value:10},uFoamPinch:{value:.15},uFoamSoft:{value:.14},uFoamGain:{value:.98},uFoamLip:{value:.5},uFoamFloor:{value:.2},uFoamCeil:{value:.6},uFoamRingWidth:{value:2.1},uFoamRingGain:{value:1.8},uContactWorld:{value:.75},uGlintPx:{value:19},uGlintGate:{value:.16},uGlintStrength:{value:1},uFresnelBand:{value:.965},uFlattenStart:{value:240},uFlattenEnd:{value:1150},uFlattenAmount:{value:.88},uFlattenSteps:{value:6},uHorizonStart:{value:700},uHorizonEnd:{value:2450},uHorizonSteps:{value:4}},vertexShader:`
      ${Ma}

      uniform vec3 uCameraPos;
      uniform float uFilterBase, uFilterSlope, uFilterScale, uSwellFoot;

      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying vec3 vSwellNormal;
      varying float vSwellH;
      varying float vJacobian;
      varying float vHeight;
      varying float vDist;
      varying float vViewZ;
      varying float vFoot;
      varying float vCurv;
      varying vec4 vScreen;

      void main() {
        // The position attribute arrives as a flat XZ lattice; the mesh is
        // re-centred on the camera on the CPU, and the world-space XZ we feed
        // the wave field is absolute — that is what makes the ocean infinite
        // with no tiling.
        vec3 world = (modelMatrix * vec4(position, 1.0)).xyz;

        // Local vertex spacing, hence the width of the low-pass we must apply
        // to stay inside Nyquist.
        float r = length(world.xz - uCameraPos.xz);
        float foot = (uFilterBase + r * uFilterSlope) * uFilterScale;

        // Four taps at ±foot on each axis plus a centre tap. The offsets cancel
        // in the average, so the average is the same surface convolved with a
        // box of half-width foot; centre − average is −h²/4·∇², a crest detector.
        vec3 p; vec3 n; float j;
        vec3 pAcc = vec3(0.0);
        vec3 nAcc = vec3(0.0);
        float jAcc = 0.0;
        gerstnerSurface(world.xz + vec2(foot, 0.0), uTime, p, n, j);
        pAcc += p; nAcc += n; jAcc += j;
        gerstnerSurface(world.xz - vec2(foot, 0.0), uTime, p, n, j);
        pAcc += p; nAcc += n; jAcc += j;
        gerstnerSurface(world.xz + vec2(0.0, foot), uTime, p, n, j);
        pAcc += p; nAcc += n; jAcc += j;
        gerstnerSurface(world.xz - vec2(0.0, foot), uTime, p, n, j);
        pAcc += p; nAcc += n; jAcc += j;

        vec3 pC; vec3 nC; float jC;
        gerstnerSurface(world.xz, uTime, pC, nC, jC);

        vec3 surfPos = pAcc * 0.25;
        vec3 surfNrm = normalize(nAcc);

        // ── Second, much wider low-pass: the SWELL ────────────────────────────
        // Same box-filter construction, footprint uSwellFoot metres instead of
        // the vertex spacing. A box of half-width R attenuates a wave of
        // wavenumber k by sinc(kR), so at 7.5 m this keeps the 71 m and 44 m
        // trains almost intact, halves the 24 m one and erases everything below —
        // i.e. it is the swell with the chop taken off. The fragment stage shades
        // from THIS and lets the chop only perturb the result; see uDetailWeight.
        float sfoot = max(uSwellFoot, foot);
        vec3 snAcc = vec3(0.0);
        float syAcc = 0.0;
        gerstnerSurface(world.xz + vec2(sfoot, 0.0), uTime, p, n, j);
        snAcc += n; syAcc += p.y;
        gerstnerSurface(world.xz - vec2(sfoot, 0.0), uTime, p, n, j);
        snAcc += n; syAcc += p.y;
        gerstnerSurface(world.xz + vec2(0.0, sfoot), uTime, p, n, j);
        snAcc += n; syAcc += p.y;
        gerstnerSurface(world.xz - vec2(0.0, sfoot), uTime, p, n, j);
        snAcc += n; syAcc += p.y;
        vSwellNormal = normalize(snAcc);
        vSwellH = syAcc * 0.25;

        // Normalised discrete Laplacian: 4·(centre − avg)/foot² = −∇²y.
        // Positive on a crest, negative in a trough, and — unlike height — it
        // picks up the short chop, which is what makes a crest read as a *lip*.
        vCurv = 4.0 * (pC.y - surfPos.y) / max(foot * foot, 1e-4);

        vWorldPos = surfPos;
        vNormal = surfNrm;
        vJacobian = jAcc * 0.25;
        vHeight = surfPos.y;
        vFoot = foot;
        vDist = length(surfPos - uCameraPos);

        vec4 mv = viewMatrix * vec4(surfPos, 1.0);
        // Linear *view* depth, matching what the G-buffer prepass writes
        // (-vViewPos.z / uFar). Comparing radial distance against view depth is
        // what made the first foam ring land in the wrong place.
        vViewZ = -mv.z;
        gl_Position = projectionMatrix * mv;
        vScreen = gl_Position;
      }
    `,fragmentShader:`
      precision highp float;

      uniform vec3 uSunDir, uCameraPos;
      uniform float uTime, uFar, uTanHalfFov;
      uniform vec2 uResolution;
      uniform sampler2D uNoise;
      uniform sampler2D uSceneDepth;

      uniform vec3 uTrough, uDeep, uMid, uShallow, uCrest, uSss, uFoam, uFoamShade;
      uniform vec3 uHorizonTint, uHaze, uSeaFar;

      uniform float uSunWeight, uSunPivot, uFresWeight, uFresPivot, uGraze;
      uniform float uDetailWeight, uRidgeSlope, uRidgeHeight, uMinFeaturePx;
      uniform float uHeightWeight, uHeightScale;
      uniform float uRagPixels, uTilePatch, uTileMacro, uTileMeso, uTileMicro, uWarp, uRippleStrength;
      uniform float uBand0, uBand1, uBand2, uBand3, uCurvGain, uSheen;
      uniform float uFoamPinch, uFoamSoft, uFoamGain, uFoamLip;
      uniform float uFoamFloor, uFoamCeil;
      uniform float uFoamRingWidth, uFoamRingGain, uContactWorld;
      uniform float uGlintPx, uGlintGate, uGlintStrength;
      uniform float uFresnelBand;
      uniform float uFlattenStart, uFlattenEnd, uFlattenAmount, uFlattenSteps;
      uniform float uHorizonStart, uHorizonEnd, uHorizonSteps;

      varying vec3 vWorldPos;
      varying vec3 vNormal;
      varying vec3 vSwellNormal;
      varying float vSwellH;
      varying float vJacobian;
      varying float vHeight;
      varying float vDist;
      varying float vViewZ;
      varying float vFoot;
      varying float vCurv;
      varying vec4 vScreen;

      float hash21(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      /**
       * How much of an octave whose features are feat metres across may be
       * used, given that one pixel covers fp metres of surface.
       *
       * This is the whole anti-boil mechanism. Below ~2.4 px a feature is not a
       * drawable shape, it is temporal noise, and it must never reach a
       * quantiser: a floor() of a sub-pixel field is a per-pixel coin flip that
       * changes every frame. Fading amplitude (rather than growing the pattern,
       * as v3 did) keeps every tile fixed in world space, so no octave's scale
       * is a function of distance and no camera-centred structure can form.
       */
      float resolveW(float feat, float fp) {
        return smoothstep(fp * 2.4, fp * 5.0, feat);
      }

      /**
       * One tap of the screen-space contact buffer.
       *
       * The w argument weights the tap so the outer ring contributes less coverage
       * than the inner one and the collar is denser against the object.
       */
      float contactTap(sampler2D depthTex, vec2 uv, float viewZ, float far, float width, float w) {
        vec4 d = texture2D(depthTex, uv);
        float bz = d.r * far - viewZ;
        // The window accepts geometry a little in FRONT of the water too: a hull
        // sitting on the surface is a few centimetres proud of it, and without
        // the slack its own waterline is excluded from its own collar.
        float has = step(0.5, d.a) * step(-0.45, bz);
        return has * w * (1.0 - clamp(bz / width, 0.0, 1.0));
      }

      void main() {
        vec3 Nv = normalize(vNormal);
        vec3 Ns = normalize(vSwellNormal);
        vec3 V = normalize(uCameraPos - vWorldPos);
        vec3 L = normalize(uSunDir);

        // World size of one screen pixel here, on the worst axis — which is what
        // goes wrong at grazing angles and what anisotropic filtering runs out of.
        float fp = max(max(fwidth(vWorldPos.x), fwidth(vWorldPos.z)), 1e-5);
        float pxWorld = vDist * 2.0 * uTanHalfFov / max(uResolution.y, 1.0);
        float distFade = smoothstep(60.0, 520.0, vDist);

        // ── Noise: constant world tiles, amplitude gated on resolvability ────
        vec2 wp = vWorldPos.xz;
        vec2 dr = vec2(uTime * 0.013, uTime * -0.009);

        float wPat = resolveW(uTilePatch / 7.0,  fp);   // ≈ 30 m
        float wMac = resolveW(uTileMacro / 7.0,  fp);   // ≈ 9.0 m
        float wMes = resolveW(uTileMeso  / 7.0,  fp);   // ≈ 2.4 m
        float wMic = resolveW(uTileMicro / 14.0, fp);   // ≈ 0.40 m

        vec4 nPat = texture2D(uNoise, wp / uTilePatch + dr * 0.12);
        vec4 nMac = texture2D(uNoise, wp / uTileMacro + dr * 0.35);
        // Domain warp. Without it the finer octaves lie on the same lattice as
        // the macro one and the sum has a legible dominant axis — the "camo
        // bedsheet" read. Warping by the macro octave means the detail layer has
        // no single direction and no centre at any altitude.
        // The warp is taken from the r and g channels (features ≈ tile/7 and
        // tile/14). It used to use b, whose feature is tile/112 ≈ 0.56 m — a
        // fourteen-metre displacement driven by a half-metre field, which injects
        // exactly the high-frequency structure the meso and micro fetches then
        // quantise into filaments.
        vec2 warp = (vec2(nMac.r, nMac.g) - 0.5) * uWarp * wMac;
        vec4 nMes = texture2D(uNoise, (wp + warp) / uTileMeso - dr * 1.1);
        vec4 nMic = texture2D(uNoise, (wp + warp * 0.45) / uTileMicro + dr * 2.0);

        // ── Fragment-space ripple ───────────────────────────────────────────
        // The band boundary is a function of the *interpolated* vertex normal, so
        // at a grazing bow camera — where one triangle spans many pixels — the
        // boundary zigzags along the tessellation and reads as a row of teeth.
        // Perturbing the normal per fragment breaks that alignment, and doubles
        // as the fine surface detail the mesh cannot carry. Gated on
        // resolvability, because a ripple you cannot resolve is not detail.
        // nMes.b is not used: its feature is uTileMeso/112 ≈ 15 cm, gated as if it
        // were 2.4 m, so it was a sub-pixel field perturbing the normal that
        // selects the bands.
        vec2 ripple = vec2(
          (nMes.g - 0.5) * wMes + (nMic.g - 0.5) * wMic,
          (nMes.r - 0.5) * wMes + (nMic.r - 0.5) * wMic);
        vec3 N = normalize(Nv + vec3(ripple.x, 0.0, ripple.y) * uRippleStrength);

        // ── Shade scalar, built around 0.5 ──────────────────────────────────
        // Dominant term is SUN FACING: view-independent, so it cannot produce
        // structure centred on the camera, and it puts a lit and a shadow side on
        // every wave regardless of where the camera is.
        //
        // The only view-dependent term left is Fresnel, and it is scaled by the
        // per-frame uGraze so that an aerial framing has effectively no
        // view-derived contribution at all. Nothing here is a function of the
        // *bearing* from the fragment to the camera, which is the property that
        // was drawing whorls.
        // ── Two scales, one ladder ──────────────────────────────────────────
        // swellFace is the dominant term and it comes from the 7.5 m-filtered
        // normal, so a band boundary is an iso-line of the SWELL's slope: a
        // crescent tens of metres long lying on one flank of a rolling wave, which
        // terminates naturally at the crest (slope → 0) and at the trough.
        //
        // detailRel is what the chop adds on top of the swell. It is deliberately
        // weighted well below one band gap (0.23), so it chews the crescent's edge
        // and textures its interior but can never open a band region of its own.
        // In r3 the chop had the *same* weight as the swell, which is why the
        // aerial was 211 same-sized dashes rather than a sea with a swell in it.
        float swellFace = dot(Ns, L) - uSunPivot;
        float detailRel = dot(N, L) - dot(Ns, L);
        // Fresnel is taken from the UN-rippled normal. On a calmed sea (the
        // countdown and results cameras drop the sea state) the sun term is almost
        // constant, so Fresnel is the whole tonal range — and running it through
        // the fragment ripple made the bands trace the ripple noise's contours in
        // long liquid swirls, which is the marbled "wood grain" read by another
        // route. The ripple's job is to break triangle-aligned band edges on the
        // sun term; it has no business setting the value of calm water.
        float fres = 1.0 - max(dot(Nv, V), 0.0);
        float hN = clamp(vHeight / uHeightScale, -1.0, 1.0);

        // The LOW-frequency part of the ladder: swell facing, Fresnel, height.
        // Everything here varies slowly across the screen, so every boundary it
        // draws is a large shape by construction.
        float shadeLo = 0.5
          + swellFace * uSunWeight
          + (fres - uFresPivot) * uFresWeight * uGraze
          + hN * uHeightWeight;

        // Ragged, hand-inked band edges. Three octaves — macro silhouette, lobes,
        // chewed edge — each faded out the moment it stops being a drawable
        // shape, so the ragging is *always* a shape and never a dither.
        float jitter = (nPat.r - 0.5) * 0.58 * wPat
                     + (nMac.r - 0.5) * 0.46 * wMac
                     + (nMes.r - 0.5) * 0.30 * wMes
                     + (nMic.g - 0.5) * 0.22 * wMic;
        // …and scaled by the local gradient of the dominant term, so the
        // displacement it produces is a fixed number of PIXELS rather than a
        // fixed number of tone units. See the uRagPixels note. The derivative is
        // taken from the un-rippled vertex normal: the fragment ripple is itself
        // high-frequency, and feeding its derivative back in here would make the
        // ragging amplitude track the noise instead of the wave form.
        // The lower clamp is what governs residual marbling: on the calmed sea of
        // the countdown/results cameras the geometric gradient is very small, and
        // any ragging floor above ~0.002 still walks a band boundary far enough to
        // trace the noise's own contours.
        float bandGrad = clamp(fwidth(dot(Ns, L)) * uSunWeight, 0.0022, 0.014);

        // ── The HIGH-frequency part, with its screen feature size clamped ─────
        // detailRel + ragging is everything in the ladder that varies quickly.
        // Left alone it is exactly what drew the r3 filigree: thin sinuous veins
        // and nested contour rings, because a band boundary's width in pixels is
        // (band gap) / (gradient of shade per pixel), and where this term's
        // gradient was steep that width fell to two or three pixels.
        //
        // Measuring that gradient directly and attenuating the term wherever it
        // would draw a feature narrower than uMinFeaturePx is a hard guarantee on
        // the *minimum band feature size in screen space* — the thing the critic
        // asked for — and it is self-tuning: full strength on a big smooth swell
        // filling the foreground, backed off in the compressed mid-distance where
        // filaments used to form. The swell term is untouched, so the large shapes
        // never lose contrast.
        float shadeHi = detailRel * uDetailWeight + jitter * uRagPixels * bandGrad;
        float gradPx = length(vec2(dFdx(shadeHi), dFdy(shadeHi)));
        // 0.22 ≈ one band gap; a feature is that many shade units wide.
        float allow = 0.22 / max(uMinFeaturePx, 1.0);
        shadeHi *= min(1.0, allow / max(gradPx, 1e-6));

        float shade = shadeLo + shadeHi;

        // ── Aerial perspective, stage 1: quantised band collapse ────────────
        // Computed here, applied per-tone below, so a distant tone lands on a
        // committed value rather than on a per-pixel interpolation.
        float fadeJit = (nMac.r - 0.5) * 0.20 * wMac + (nPat.r - 0.5) * 0.16 * wPat;
        float flat4 = floor(clamp(
          smoothstep(uFlattenStart, uFlattenEnd, vDist) * uFlattenAmount + fadeJit,
          0.0, 1.0) * uFlattenSteps) / uFlattenSteps;

        // ── Hard bands: step(), not smoothstep() ────────────────────────────
        // Zero-width transitions. There is no interpolant, so a region of water
        // contains a countable set of flat values — which is the definition of
        // cel shading and the opposite of what v3 produced.
        float lipCurv = clamp(vCurv * uCurvGain, -1.0, 1.5);
        float crestSel = shade + max(lipCurv, 0.0);

        vec3 col = uTrough;
        col = mix(col, uDeep,    step(uBand0, shade));
        col = mix(col, uMid,     step(uBand1, shade));
        col = mix(col, uShallow, step(uBand2, shade));
        float crestMask = step(uBand3, crestSel);
        col = mix(col, uCrest, crestMask);

        // ── The crest RIDGE line ────────────────────────────────────────────
        // A hard highlight that follows the ridge polyline of the swell: high, and
        // nearly level. Because the region where the slope falls below a threshold
        // has width (threshold / curvature), this is thin on a sharp crest and
        // absent on a broad dome — it can only ever draw a *ridge*, never the
        // concentric contour ring an iso-height test would draw around a local
        // high. Its shape is the crest's own line, which is the one silhouette the
        // r3 bands were missing.
        float swellSlope = length(Ns.xz) / max(Ns.y, 0.2);
        float hSwell = clamp(vSwellH / uHeightScale, -1.0, 1.0);
        float ridge = step(swellSlope, uRidgeSlope) * step(uRidgeHeight, hSwell)
                    * step(0.5, uSheen) * (1.0 - smoothstep(220.0, 700.0, vDist));
        col = mix(col, uCrest, ridge * (1.0 - crestMask));

        // A thin drawn highlight riding the shallow→crest boundary. Because the
        // boundary follows slope and curvature it traces the wave form, not an
        // elevation contour. Gated on curvature and on the meso octave's
        // resolvability so it never becomes a sub-pixel iso-line.
        float sheenLine = step(uBand2, shade) - step(uBand2 + 0.055, shade);
        sheenLine *= step(0.02, lipCurv) * step(0.5, wMes) * step(0.5, uSheen);
        col = mix(col, uCrest, sheenLine * (1.0 - crestMask));

        // ── Back-lit crest translucency ─────────────────────────────────────
        // One hard band of saturated teal where a thin, sharply curved crest is
        // between us and the sun.
        float backLit = max(dot(-V, L), 0.0)
                      * smoothstep(0.22, 0.6, hN)
                      * smoothstep(0.10, 0.35, lipCurv)
                      * (1.0 - smoothstep(60.0, 190.0, vDist));
        col = mix(col, uSss, step(0.18, backLit));

        // Collapse toward the far sea tone in four hard steps.
        col = mix(col, uSeaFar, flat4);

        // ── Foam: one coverage scalar, one hard threshold ────────────────────
        // Jacobian < 1 means the surface is compressing; that is where real water
        // piles up and breaks. Coverage is a *fraction of area*, realised by
        // thresholding noise against it, so the amount of white on screen is
        // directly controllable and the shapes stay hard-edged and irregular.
        float pinch = smoothstep(uFoamPinch, uFoamPinch + uFoamSoft, 1.0 - vJacobian);
        float lip = smoothstep(0.10, 0.42, lipCurv) * smoothstep(0.10, 0.55, hN);
        float coverage = pinch * uFoamGain + lip * uFoamLip;
        // Foam cannot exist on water that is not moving; without this gate, low
        // coverage on flat troughs leaves pale rounded patches reading as lily pads.
        coverage *= smoothstep(0.02, 0.085, length(Nv.xz));
        // Distant whitecaps thin right out. v3 kept 55% of coverage at range and,
        // with the fine octave still live out there, the far field filled with
        // 1 px white pepper — the "TV static" note.
        coverage *= 1.0 - 0.82 * distFade;
        coverage = clamp((coverage - uFoamFloor) / (1.0 - uFoamFloor), 0.0, 1.0) * uFoamCeil;

        // Break-up. Every octave is weighted by resolvability and the sum is
        // renormalised, so the *distribution* stays centred as octaves drop out
        // instead of collapsing to a constant and flipping the threshold wholesale.
        float sumW = 0.34 * wMac + 0.40 * wMes + 0.26 * wMic;
        float breakup = (0.34 * wMac * nMac.r + 0.40 * wMes * nMes.r + 0.26 * wMic * nMic.g)
                      / max(sumW, 1e-3);
        breakup = clamp(0.5 + (breakup - 0.5) * 1.45, 0.0, 1.0);

        float foam = step(1.0 - coverage, breakup);
        float foamCore = step(1.0 - clamp(coverage * 0.5, 0.0, 1.0), breakup);

        // ── Depth-difference contact ────────────────────────────────────────
        // The G-buffer records everything except the water, so where a fragment
        // of water is *in front of* recorded geometry we are looking through the
        // surface at something submerged — a hull skin, a buoy stem, a gate leg.
        //
        // Two parts, both hard:
        //   • the submerged area is stamped with the darkest tone, so a hull
        //     always has shadowed water under its keel instead of a hard clip
        //   • a lacy foam collar in a narrow slot right at the waterline
        vec2 screenUv = (vScreen.xy / vScreen.w) * 0.5 + 0.5;
        vec4 sceneD = texture2D(uSceneDepth, screenUv);
        float sceneZ = sceneD.r * uFar;
        float behind = sceneZ - vViewZ;
        float hasGeo = step(0.5, sceneD.a) * step(-0.02, behind);

        // The shadow under the keel is NOT dilated — it belongs under the hull,
        // not around it — so it stays a single centre tap.
        float sub = hasGeo * (1.0 - clamp(behind / (uFoamRingWidth * 6.0), 0.0, 1.0));
        col = mix(col, uTrough, step(0.08, sub));

        // The collar IS dilated, over two rings of eight taps whose radius is a
        // fixed world size converted to pixels, so a collar is the same physical
        // width at 5 m and at 50 m.
        float rPx = clamp(uContactWorld / max(pxWorld, 1e-4), 2.0, 26.0);
        vec2 texel = rPx / max(uResolution, vec2(1.0));
        float prox = contactTap(uSceneDepth, screenUv, vViewZ, uFar, uFoamRingWidth, 1.0);
        for (int i = 0; i < 8; i++) {
          float a = float(i) * 0.7853982 + 0.19;
          vec2 dir = vec2(cos(a), sin(a));
          prox = max(prox, contactTap(uSceneDepth, screenUv + dir * texel * 0.45,
                                      vViewZ, uFar, uFoamRingWidth, 0.95));
          prox = max(prox, contactTap(uSceneDepth, screenUv + dir * texel,
                                      vViewZ, uFar, uFoamRingWidth, 0.6));
        }
        float ringCov = clamp(prox * uFoamRingGain, 0.0, 1.0);
        // Its own, tighter break-up so the collar reads as churn, not a decal.
        float ringBreak = 0.26 + breakup * 0.58;
        float ringFoam = step(1.0 - ringCov, ringBreak);

        float totalFoam = max(foam, ringFoam);
        // Two flat foam values, chosen by a step. Almost all foam is uFoamShade,
        // whose linear luminance sits just under the flare pass's 0.82 threshold,
        // so a large collar can never bloom into a halo around the boat.
        vec3 foamCol = mix(uFoamShade, uFoam, step(0.5, max(foamCore, ringFoam)));
        // Distant foam settles onto the crest tone so it stops shouting.
        foamCol = mix(foamCol, uCrest, step(0.6, distFade) * (1.0 - ringFoam));
        col = mix(col, foamCol, totalFoam);

        // ── Fresnel band right at the horizon ───────────────────────────────
        col = mix(col, uHorizonTint, step(uFresnelBand, fres) * (1.0 - totalFoam));

        // ── Quantised sparkle — drawn shapes, not specular noise ────────────
        // Cells are sized in SCREEN PIXELS so a glint is always a few px across.
        // Each live cell picks its own rotation, aspect and one of two silhouettes,
        // which is what separates "light catching crests" from a grid of identical
        // hyphens. Gated on crest curvature AND the specular lobe, so it only
        // fires where the light would actually catch, and composited with mix()
        // rather than added — an additive glint invents an off-ladder tone.
        vec3 H = normalize(L + V);
        float specLobe = pow(max(dot(N, H), 0.0), 30.0);
        float gate = step(uGlintGate, specLobe)
                   * step(0.02, lipCurv)
                   * step(uBand1, shade)
                   * (1.0 - totalFoam);

        float cellSize = max(pxWorld * uGlintPx, vFoot * 0.9);
        vec2 gp = vWorldPos.xz / cellSize;
        vec2 cellId = floor(gp);
        float h  = hash21(cellId);
        float h2 = hash21(cellId + 17.3);
        float h3 = hash21(cellId + 51.7);
        // Jitter the stamp inside its cell so the lattice never reads as a grid.
        vec2 f = fract(gp) - vec2(0.24 + 0.5 * h, 0.24 + 0.5 * h2);
        float ga = h3 * 6.2831853;
        vec2 fr = vec2(f.x * cos(ga) - f.y * sin(ga), f.x * sin(ga) + f.y * cos(ga));
        // Shape A: a diamond whose aspect is randomised per cell, so its length
        // and orientation both vary. Shape B: a short cross / four-point star.
        float dia = step(abs(fr.x) * (1.15 + 3.0 * h) + abs(fr.y) * (1.15 + 3.0 * h3), 0.17);
        float star = max(
          step(abs(fr.x) * 4.4 + abs(fr.y) * 0.95, 0.13),
          step(abs(fr.x) * 0.95 + abs(fr.y) * 4.4, 0.13));
        float shape = mix(dia, star, step(0.66, h2));
        float live = step(0.66, h);
        float twinkle = step(0.55, abs(sin(uTime * (1.4 + h * 2.6) + h2 * 6.2832)));
        float glint = shape * live * twinkle * gate * step(0.5, uGlintStrength);
        col = mix(col, uFoam, glint);

        // ── Aerial perspective, stage 2: three hard steps into the haze ─────
        // The target is a *tinted* haze, not the raw near-white sky haze: mixing
        // all the way to uHaze put a blown white band along the horizon.
        float horiz3 = floor(clamp(
          smoothstep(uHorizonStart, uHorizonEnd, vDist) + fadeJit, 0.0, 1.0) * uHorizonSteps)
          / uHorizonSteps;
        col = mix(col, mix(uHaze, uSeaFar, 0.35), horiz3);

        gl_FragColor = vec4(col, 1.0);
      }
    `});return{material:e,uniforms:e.uniforms,setSceneDepth(t){e.uniforms.uSceneDepth.value=t}}}class So{s;constructor(e=439041101){this.s=e>>>0}next(){this.s=this.s+1831565813>>>0;let e=this.s;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}range(e,t){return e+this.next()*(t-e)}int(e,t){return Math.floor(this.range(e,t+1))}sym(e=1){return this.range(-e,e)}pick(e){return e[Math.floor(this.next()*e.length)%e.length]}bool(e=.5){return this.next()<e}}const Ia=new URLSearchParams(location.search).get("seed"),W=new So(Ia?Number(Ia)>>>0:1374518801),be=1500,ko=17.5,Mo=.4;class To{points;material;pos;vel;age;life;size;seed;cursor=0;alive=0;aPos;aAge;aLife;aSize;aSeed;bowCarry=[0,0,0,0];driftCarry=[0,0,0,0];sternCarry=[0,0,0,0];constructor(e){this.pos=new Float32Array(be*3),this.vel=new Float32Array(be*3),this.age=new Float32Array(be),this.life=new Float32Array(be),this.size=new Float32Array(be),this.seed=new Float32Array(be);for(let s=0;s<be;s++)this.life[s]=1,this.age[s]=2,this.seed[s]=W.next();const t=new Pi;t.setAttribute("position",new H(new Float32Array([-.5,-.5,0,.5,-.5,0,.5,.5,0,-.5,.5,0]),3)),t.setIndex(new H(new Uint16Array([0,1,2,0,2,3]),1)),this.aPos=new st(this.pos,3),this.aAge=new st(this.age,1),this.aLife=new st(this.life,1),this.aSize=new st(this.size,1),this.aSeed=new st(this.seed,1),this.aPos.setUsage(ye),this.aAge.setUsage(ye),this.aLife.setUsage(ye),this.aSize.setUsage(ye),this.aSeed.setUsage(ye),t.setAttribute("iPos",this.aPos),t.setAttribute("iAge",this.aAge),t.setAttribute("iLife",this.aLife),t.setAttribute("iSize",this.aSize),t.setAttribute("iSeed",this.aSeed),t.instanceCount=be,t.boundingSphere=null,this.material=new ge({name:"spray",transparent:!0,depthWrite:!1,blending:ka,uniforms:{uFoam:{value:T.foam.clone()},uFoamShade:{value:T.foamShade.clone()},uCrest:{value:T.waterCrest.clone()},uStrength:{value:1}},vertexShader:`
        attribute vec3 iPos;
        attribute float iAge;
        attribute float iLife;
        attribute float iSize;
        attribute float iSeed;

        varying vec2 vQuad;
        varying float vT;
        varying float vSeed;

        void main() {
          vT = iAge / max(iLife, 1e-3);
          vSeed = iSeed;
          vQuad = position.xy;

          // Droplets grow as they break up, then shrink as they fall apart.
          float grow = mix(0.55, 1.35, smoothstep(0.0, 0.45, vT))
                     * (1.0 - smoothstep(0.72, 1.0, vT));
          // Dead instances collapse the quad to a point, which rasterises nothing.
          float s = iSize * grow * step(vT, 1.0);

          // Rotate AND stretch the quad, not the texture lookup: the silhouette is
          // generated from the *unrotated, unstretched* local coordinate, so the
          // geometry transform spins and elongates the shape. Combined with the
          // four authored silhouettes in the fragment stage that gives every
          // droplet in a burst its own outline, which is what stops a burst from
          // reading as one sprite stamped repeatedly — the r13 capture found the
          // same 4-lobed clover at (1285,1073) and again three times in hud.png.
          float hAsp = fract(iSeed * 17.13);
          vec2 asp = vec2(0.68 + 0.74 * hAsp, 0.68 + 0.74 * (1.0 - hAsp));
          vec2 qp = position.xy * asp;
          float a = iSeed * 6.2831853;
          float c = cos(a), sn = sin(a);
          vec2 q = vec2(qp.x * c - qp.y * sn, qp.x * sn + qp.y * c) * s;

          // Camera basis straight out of the view matrix — a screen-facing quad
          // without needing the camera's world matrix as a uniform.
          vec3 camRight = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
          vec3 camUp    = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
          vec3 world = iPos + camRight * q.x + camUp * q.y;

          gl_Position = projectionMatrix * viewMatrix * vec4(world, 1.0);
        }
      `,fragmentShader:`
        precision highp float;

        uniform vec3 uFoam, uFoamShade, uCrest;
        uniform float uStrength;

        varying vec2 vQuad;
        varying float vT;
        varying float vSeed;

        void main() {
          // ── Four authored silhouettes, one per droplet ────────────────────
          // The previous single three-lobe polar radius had lobe amplitudes of
          // 0.085 and 0.05 against a base radius of 0.40 — a 12% wobble on a
          // circle. That is why every droplet in the r13 capture was the same
          // 4-lobed clover: the shapes were not actually different. These four
          // are different *outlines*, not different phases of one outline, and
          // the vertex stage rotates and stretches each instance on top.
          float r = length(vQuad);
          float ang = atan(vQuad.y, vQuad.x);
          float shp = floor(fract(vSeed * 5.71) * 4.0);
          float radius;

          if (shp < 1.0) {
            // Shard: a teardrop with one sharp point — a droplet torn off a crest.
            radius = 0.15 + 0.30 * pow(max(cos(ang * 0.5), 0.0), 2.2);
          } else if (shp < 2.0) {
            // Splat: five sharp spikes off a small core.
            radius = 0.17 + 0.27 * pow(abs(cos(ang * 2.5 + vSeed * 9.0)), 3.0);
          } else if (shp < 3.0) {
            // Chip: a hard-edged flake. A straight-sided polygon among the
            // curved shapes is what keeps the set from reading as one family.
            radius = 0.42 / (abs(cos(ang)) + 1.45 * abs(sin(ang)));
          } else {
            // Comma: a blob with a bite out of it, drawn as a crescent.
            radius = 0.34 + 0.11 * sin(ang * 3.0 + vSeed * 13.0);
            // The bite has to reach *past* the silhouette edge, otherwise it
            // punches a hole in the middle and the droplet reads as a bubble
            // ring rather than as a crescent of torn water.
            if (length(vQuad - vec2(0.24, 0.13)) < 0.24) discard;
          }

          // Droplets tear apart rather than fading: the radius shrinks with age
          // and a bite is taken out of one side.
          radius *= 1.0 - vT * 0.28;
          radius -= (0.5 + 0.5 * sin(ang * 2.0 + vSeed * 19.0)) * vT * 0.13;
          if (r > radius) discard;

          // ── Hard cutout: alpha is 1, never a ramp ────────────────────────
          // Soft alpha is what made the spray read as photographic cotton wool
          // and as a different render from the water. Ageing is expressed by the
          // shrinking silhouette and by dropping down the tone ladder — never by
          // transparency, and never additively (see the blending note above).
          float fade = 1.0 - vT;
          float core = step(r, radius * 0.5);
          vec3 col = uCrest;
          col = mix(col, uFoamShade, step(0.26, fade));
          col = mix(col, uFoam, step(0.42, fade) * core);
          gl_FragColor = vec4(col, uStrength);
        }
      `}),this.points=new le(t,this.material),this.points.name="spray",this.points.frustumCulled=!1,this.points.renderOrder=6,this.points.userData.skipPrepass=!0}get tunables(){return this.material.uniforms}emit(e,t,s,a,o,n,r,h){const l=this.cursor;this.cursor=(this.cursor+1)%be;const u=l*3;this.pos[u]=e,this.pos[u+1]=t,this.pos[u+2]=s,this.vel[u]=a,this.vel[u+1]=o,this.vel[u+2]=n,this.age[l]=0,this.life[l]=h,this.size[l]=r*Mo,this.seed[l]=W.next()}burst(e,t,s,a,o,n,r,h,l,u=.55){for(let d=0;d<r;d++){const m=h*W.range(.55,1.25);this.emit(e+W.sym(.28),t+W.range(-.05,.3),s+W.sym(.28),(a+W.sym(u))*m,(o+W.range(0,u*.9))*m,(n+W.sym(u))*m,l*W.range(.6,1.5),W.range(.5,1.15))}}update(e,t,s){const a=e.dt;for(let l=0;l<t.length;l++){const u=t[l],d=u.state,m=u.root.position.x;u.root.position.y;const c=u.root.position.z,v=Math.sin(d.heading),f=Math.cos(d.heading),p=f,w=-v,y=Math.abs(d.forwardSpeed),b=B.boat.beam*.5,S=m+v*B.boat.length*.46,x=c+f*B.boat.length*.46;if(d.landingImpact>1.4){const L=Math.min(1,d.landingImpact/13),C=e.ocean.height(m,c,e.time),z=Math.round(34+L*84);for(let A=0;A<z;A++){const E=A/z*Math.PI*2+W.sym(.4),O=3.5+L*9*W.range(.6,1.3);this.emit(m+Math.cos(E)*.8,C+.15,c+Math.sin(E)*.8,Math.cos(E)*O+d.velocity.x*.2,(5.5+L*9)*W.range(.6,1.3),Math.sin(E)*O+d.velocity.z*.2,W.range(.5,1.35),W.range(.8,1.7))}}if(s[l]<.25){this.bowCarry[l]=0,this.driftCarry[l]=0,this.sternCarry[l]=0;continue}if(y>4.5){const L=(y-4.5)*6;for(this.sternCarry[l]+=L*a;this.sternCarry[l]>=1;){this.sternCarry[l]-=1;const C=m-v*B.boat.length*.62+p*W.sym(b*.8),z=c-f*B.boat.length*.62+w*W.sym(b*.8),A=e.ocean.height(C,z,e.time);this.emit(C,A+.12,z,-v*y*.16+p*W.sym(3.4),W.range(2.4,6)+y*.05,-f*y*.16+w*W.sym(3.4),W.range(.2,.52),W.range(.45,.95))}}else this.sternCarry[l]=0;if(y>6.5){const L=(y-6.5)*6.4;for(this.bowCarry[l]+=L*a;this.bowCarry[l]>=1;){this.bowCarry[l]-=1;const C=W.bool()?1:-1,z=e.ocean.height(S,x,e.time),A=1.4+y*.09;this.emit(S+p*C*b*1.22,z+.1,x+w*C*b*1.22,v*y*.22+p*C*A+W.sym(.7),W.range(2.4,5.2)+y*.045,f*y*.22+w*C*A+W.sym(.7),W.range(.24,.6),W.range(.45,.9))}}else this.bowCarry[l]=0;const _=Math.abs(d.lateralSpeed);if(_>2.6){const L=d.lateralSpeed>0?-1:1;for(this.driftCarry[l]+=(_-2.6)*6.4*a;this.driftCarry[l]>=1;){this.driftCarry[l]-=1;const C=W.sym(B.boat.length*.4),z=m+v*C+p*L*b*1.18,A=c+f*C+w*L*b*1.18,E=e.ocean.height(z,A,e.time),O=2.2+_*.5;this.emit(z,E+.08,A,p*L*O+d.velocity.x*.25+W.sym(.9),W.range(1.4,3.6),w*L*O+d.velocity.z*.25+W.sym(.9),W.range(.3,.75),W.range(.45,.95))}}else this.driftCarry[l]=0}const o=Math.exp(-1.35*a),n=this.pos,r=this.vel;let h=0;for(let l=0;l<be;l++){const u=this.age[l];if(u>=this.life[l])continue;this.age[l]=u+a;const d=l*3;r[d]*=o,r[d+1]=(r[d+1]-ko*a)*o,r[d+2]*=o,n[d]+=r[d]*a,n[d+1]+=r[d+1]*a,n[d+2]+=r[d+2]*a,n[d+1]<-.35?this.age[l]=this.life[l]:h++}this.alive=h,this.aPos.needsUpdate=!0,this.aAge.needsUpdate=!0,this.aLife.needsUpdate=!0,this.aSize.needsUpdate=!0,this.aSeed.needsUpdate=!0}get liveCount(){return this.alive}dispose(){this.points.geometry.dispose(),this.material.dispose()}}const qa=[new M(0,-.1,1.9),new M(0,-.32,0),new M(0,-.4,-1.9)],Ha=new he,St=new M;function Ao(i,e){Ha.setFromEuler(e.root.rotation);let t=1/0;for(let s=0;s<qa.length;s++){St.copy(qa[s]).applyQuaternion(Ha).add(e.root.position);const a=St.y-i.ocean.height(St.x,St.z,i.time);a<t&&(t=a)}return 1-Math.min(1,Math.max(0,t/.34))}const J=96,Po=1.15,Xt=2.8,Co=1.9,se=5;function Fo(){return{x:new Float32Array(J),z:new Float32Array(J),nx:new Float32Array(J),nz:new Float32Array(J),age:new Float32Array(J),w0:new Float32Array(J),power:new Float32Array(J),valid:new Float32Array(J),head:-1,count:0,lastX:0,lastZ:0,carry:0}}class zo{mesh;material;trails=[];aPos;aSide;aAge;aPower;aRun;constructor(e,t){for(let c=0;c<e;c++)this.trails.push(Fo());const s=e*J*se,a=new Float32Array(s*3),o=new Float32Array(s),n=new Float32Array(s),r=new Float32Array(s),h=new Float32Array(s),l=e*(J-1)*(se-1),u=new Uint16Array(l*6);let d=0;for(let c=0;c<e;c++){const v=c*J*se;for(let f=0;f<J-1;f++)for(let p=0;p<se-1;p++){const w=v+f*se+p,y=w+1,b=w+se,S=b+1;u[d++]=w,u[d++]=y,u[d++]=b,u[d++]=y,u[d++]=S,u[d++]=b}}const m=new Pe;this.aPos=new H(a,3),this.aSide=new H(o,1),this.aAge=new H(n,1),this.aPower=new H(r,1),this.aRun=new H(h,1),this.aPos.setUsage(ye),this.aAge.setUsage(ye),this.aPower.setUsage(ye),this.aRun.setUsage(ye),m.setAttribute("position",this.aPos),m.setAttribute("aSide",this.aSide),m.setAttribute("aAge",this.aAge),m.setAttribute("aPower",this.aPower),m.setAttribute("aRun",this.aRun),m.setIndex(new H(u,1)),m.boundingSphere=null;for(let c=0;c<s;c++)o[c]=c%se/(se-1)*2-1;this.material=new ge({name:"wakeRibbon",transparent:!0,depthWrite:!1,blending:ka,side:Ws,uniforms:{uWaveA:{value:Le.uWaveA},uWaveB:{value:Le.uWaveB},uTime:X.uTime,uCameraPos:X.uCameraPos,uSunDir:X.uSunDir,uNoise:{value:t},uFoam:{value:T.foam.clone()},uFoamShade:{value:T.foamShade.clone()},uCrest:{value:T.waterCrest.clone()},uInk:{value:T.inkSoft.clone()},uLift:{value:.2},uLife:{value:Xt},uTile:{value:5.6},uOpacity:{value:1},uInkPx:{value:2.6}},vertexShader:`
        ${Ma}

        attribute float aSide;
        attribute float aAge;
        attribute float aPower;
        attribute float aRun;

        uniform float uLift;

        varying float vSide;
        varying float vAge;
        varying float vPower;
        varying float vRun;
        varying vec3 vWorldPos;

        void main() {
          // The CPU baked the spread into the XZ position; all the shader does is
          // put that point on the shared wave field, which is the only way the
          // ribbon can stay welded to a displaced surface.
          vec3 p; vec3 nrm; float j;
          gerstnerSurface(position.xz, uTime, p, nrm, j);
          p.y += uLift;

          vSide = aSide;
          vAge = aAge;
          vPower = aPower;
          vRun = aRun;
          vWorldPos = p;

          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }
      `,fragmentShader:`
        precision highp float;

        uniform sampler2D uNoise;
        uniform vec3 uFoam, uFoamShade, uCrest, uInk;
        uniform float uTime, uLife, uTile, uOpacity, uInkPx;

        varying float vSide;
        varying float vAge;
        varying float vPower;
        varying float vRun;
        varying vec3 vWorldPos;

        void main() {
          float life = clamp(1.0 - vAge / uLife, 0.0, 1.0);
          float v = abs(vSide);

          // ── Dissipation noise, with an 8 px floor on feature size ─────────
          // The r3 review measured the wake's boundary as "a salt-and-pepper
          // stipple of isolated 2–4 px squares". A hard threshold against a noise
          // field stops being an edge and becomes a dither the moment the field's
          // features approach a pixel, so every octave has to be gated on whether
          // it is drawable — and the gate has to use the octave's REAL feature
          // size, which is where the previous version went wrong.
          //
          // The noise map packs r = fbm (feature ≈ tile/7), g = one octave
          // (tile/14) and b = one octave (tile/112). The old code gated the b
          // channel of a fetch taken at 3.7× the base rate against an estimate of
          // tile/26 — a feature size twelve times too generous. Its true size is
          // uTile/(3.7·112) = 1.4 cm, which is sub-pixel at *any* camera distance
          // in this game, so a sub-pixel field was reaching a step() every frame.
          // That is the stipple, and once the ribbon gained a signed-distance
          // contour it became salt-and-pepper *ink* as well, because the gradient
          // of a sub-pixel field is random per pixel.
          //
          // The b channel is therefore gone, not gated: it is never drawable. The
          // two survivors are gated on 8–16 px using their actual scales.
          float fp = max(max(fwidth(vWorldPos.x), fwidth(vWorldPos.z)), 1e-5);
          float wMid = smoothstep(fp * 8.0, fp * 16.0, uTile / 14.0);
          float wFine = smoothstep(fp * 8.0, fp * 16.0, uTile / 51.8);
          vec2 uv = vWorldPos.xz / uTile;
          vec4 nA = texture2D(uNoise, uv + vec2(uTime * 0.01, uTime * -0.006));
          vec4 nB = texture2D(uNoise, uv * 3.7 - vec2(uTime * 0.03, 0.0));
          float wSum = 0.60 + 0.26 * wMid + 0.14 * wFine;
          float grain = (nA.r * 0.60 + nA.g * 0.26 * wMid + nB.g * 0.14 * wFine) / wSum;
          grain = clamp(0.5 + (grain - 0.5) * 1.35, 0.0, 1.0);

          // ── Across-ribbon profile ─────────────────────────────────────────
          //   • two divergent foam rails — a *ridge*, not a ramp from the middle
          //   • solid churn immediately behind the transom
          //   • a sparse turbulent field between the rails
          //
          // The rails sit at |v| ≈ 0.72 rather than 0.86, and coverage is taken to
          // zero before |v| = 1. That is the fix for the single worst thing in the
          // r3 wake: at 0.86 with a ±0.2 width the rail ran *past* the strip's own
          // edge, so its outer boundary was not the foam's silhouette at all — it
          // was the geometry's, and the geometry is a straight strip. Hence "the
          // right band's left edge is a perfectly straight line for 400 px". A
          // foam shape may never be clipped by its own carrier quad.
          float railPos = 0.72 + (grain - 0.5) * 0.15;
          float railW = 0.11 + grain * 0.06;
          float rail = 1.0 - smoothstep(0.0, railW, abs(v - railPos));
          float centre = 1.0 - smoothstep(0.0, 0.38, v);
          // 9 m of solid churn behind the transom was a white slab from a low
          // camera. 5 m is a churn *head*, which is what it is for.
          float head = 1.0 - smoothstep(1.2, 5.0, vRun);
          float fill = (1.0 - smoothstep(0.42, 0.95, v)) * 0.24;
          float shape = max(max(rail * 0.95, centre * head), fill * (0.3 + 0.7 * life));
          // Hard taper before the carrier's edge. Nothing reaches |v| = 1.
          shape *= 1.0 - smoothstep(0.86, 0.99, v);

          // ── Dissipation ──────────────────────────────────────────────────
          // Coverage must reach *zero* before the sample expires, and it has to
          // get there faster than linearly or the tail reads as a painted band
          // that simply stops. life² spends most of the trail's length visibly
          // breaking up, which is what "spreads and dissipates" means.
          float fadeOut = smoothstep(0.0, 0.30, life);
          float aged = life * life;
          float coverage = clamp(
            shape * fadeOut * (0.16 + 0.84 * aged) * (0.42 + 0.72 * vPower), 0.0, 0.78);

          // ── Hard cutout, no soft alpha ───────────────────────────────────
          // The whole foam layer is an alpha *cutout*: the mask is 0 or 1 and the
          // fragment is opaque. Alpha-blending an already-quantised foam tone over
          // already-quantised water is what generated the intermediate "mush"
          // tones and made the foam layer look like a different render from the
          // water. Fading is expressed as *less coverage* and as a *lower tone*,
          // never as transparency.
          //
          // sd is the signed distance to that cutout in coverage units, and it
          // is what turns a threshold into a drawn shape: dividing by its own
          // screen gradient converts it to PIXELS, so the ribbon can put a
          // constant-width ink contour on its outer silhouette and quantise a
          // shadow tone just inside it. That is the difference between a shape
          // with an edge and a noise-thresholded quad.
          float sd = coverage - (1.0 - grain);
          if (sd < 0.0) discard;

          // The contour is measured against the COARSE silhouette, not the full
          // grain. Inking the full grain looked right in principle and was wrong in
          // practice: a foam island the size of the finest live octave is narrower
          // than the ink width, so it comes out entirely ink — a scatter of dark
          // dots through the white, which is the r3 stipple in a new colour. The
          // coarse channel's features are ~0.8 m (30–60 px at chase range), so its
          // boundary is a line long enough to draw, and the finer octaves still
          // chew holes in the fill inside it.
          float sdLo = coverage - (1.0 - clamp(0.5 + (nA.r - 0.5) * 1.35, 0.0, 1.0));
          float loPx = sdLo / max(length(vec2(dFdx(sdLo), dFdy(sdLo))), 1e-5);

          // ── Three committed values plus ink ──────────────────────────────
          // Outermost 2.6 px: the contour. Then a pale-cyan shadow rim. Then the
          // body, whose tone drops down the ladder as the sample ages. Only fresh,
          // powerful churn on the rails reaches uFoam, so the wake never blooms.
          float hot = step(0.55, aged) * step(0.4, max(rail, centre * head))
                    * step(0.35, vPower);
          vec3 col = mix(uCrest, uFoamShade, step(0.26, aged));
          col = mix(col, uFoam, hot);
          // Shadow side: a band of pale cyan just inside the silhouette, so the
          // foam mass has a lit face and a turned-away face instead of being one
          // flat value across its whole width.
          float onEdge = step(0.0, sdLo);
          col = mix(col, uCrest,
                    onEdge * step(loPx, uInkPx * 3.4) * (1.0 - step(loPx, uInkPx)));
          col = mix(col, uInk, onEdge * step(loPx, uInkPx));

          gl_FragColor = vec4(col, uOpacity);
        }
      `}),this.mesh=new le(m,this.material),this.mesh.name="wakeRibbons",this.mesh.frustumCulled=!1,this.mesh.renderOrder=4,this.mesh.userData.skipPrepass=!0}get tunables(){return this.material.uniforms}emit(e,t,s,a,o,n,r,h){e.head=(e.head+1)%J;const l=e.head;e.x[l]=t,e.z[l]=s,e.nx[l]=a,e.nz[l]=o,e.age[l]=0,e.w0[l]=n,e.power[l]=r,e.valid[l]=h,e.count<J&&e.count++}update(e,t,s){const a=e.dt,o=this.aPos.array,n=this.aAge.array,r=this.aPower.array,h=this.aRun.array,l=B.boat.beam,u=B.boat.length*.5;for(let d=0;d<t.length&&d<this.trails.length;d++){const m=t[d],c=m.state,v=this.trails[d];for(let O=0;O<J;O++)v.age[O]+=a;const f=Math.sin(c.heading),p=Math.cos(c.heading),w=m.root.position.x-f*u,y=m.root.position.z-p*u,b=Math.abs(c.forwardSpeed),S=w-v.lastX,x=y-v.lastZ;v.carry+=Math.hypot(S,x),v.lastX=w,v.lastZ=y;const k=b>1.6&&s[d]>.3,_=l*.42+b*.028+(c.drifting?.55:0),L=Math.min(1,b/B.boat.topSpeed+Math.abs(c.lateralSpeed)*.12+(c.boostTime>0?.35:0));k&&(v.head<0||v.carry>=Po)&&(v.carry=0,this.emit(v,w,y,p,-f,_,L,1));const C=d*J*se;let z=0,A=0,E=0;for(let O=0;O<J;O++){const N=(v.head+1+O)%J,j=v.age[N],ce=v.valid[N]>.5&&v.count>1&&j<Xt,fe=ce?v.w0[N]+j*Co:0,pe=v.x[N],ve=v.z[N],D=v.nx[N],ue=v.nz[N];O>0&&(z+=Math.hypot(pe-A,ve-E)),A=pe,E=ve;const we=C+O*se;for(let de=0;de<se;de++){const Ue=de/(se-1)*2-1,Ce=(we+de)*3;o[Ce+0]=pe+D*fe*Ue,o[Ce+1]=0,o[Ce+2]=ve+ue*fe*Ue,n[we+de]=ce?j:Xt*2,r[we+de]=v.power[N],h[we+de]=z}}if(k&&v.count>1){const O=C+(J-1)*se;for(let N=0;N<se;N++){const j=N/(se-1)*2-1,ce=(O+N)*3;o[ce+0]=w+p*_*j,o[ce+1]=0,o[ce+2]=y-f*_*j,n[O+N]=0,r[O+N]=L}}for(let O=0;O<J*se;O++)h[C+O]=z-h[C+O]}this.aPos.needsUpdate=!0,this.aAge.needsUpdate=!0,this.aPower.needsUpdate=!0,this.aRun.needsUpdate=!0}dispose(){this.mesh.geometry.dispose(),this.material.dispose()}}const ke=15,$e=21;class Ro{mesh;material;aPos;aPower;localUv;constructor(e,t){const s=ke*$e,a=e*s,o=new Float32Array(a*3),n=new Float32Array(a*2),r=new Float32Array(a);for(let m=0;m<e;m++)for(let c=0;c<$e;c++)for(let v=0;v<ke;v++){const f=m*s+c*ke+v;n[f*2+0]=v/(ke-1)*2-1,n[f*2+1]=c/($e-1)*2-1}const h=e*(ke-1)*($e-1),l=new Uint16Array(h*6);let u=0;for(let m=0;m<e;m++){const c=m*s;for(let v=0;v<$e-1;v++)for(let f=0;f<ke-1;f++){const p=c+v*ke+f,w=p+1,y=p+ke,b=y+1;l[u++]=p,l[u++]=y,l[u++]=w,l[u++]=w,l[u++]=y,l[u++]=b}}const d=new Pe;this.localUv=n,this.aPos=new H(o,3),this.aPower=new H(r,1),this.aPos.setUsage(ye),this.aPower.setUsage(ye),d.setAttribute("position",this.aPos),d.setAttribute("aUv",new H(n,2)),d.setAttribute("aPower",this.aPower),d.setIndex(new H(l,1)),d.boundingSphere=null,this.material=new ge({name:"hullCollar",transparent:!0,depthWrite:!1,blending:ka,side:Ws,uniforms:{uWaveA:{value:Le.uWaveA},uWaveB:{value:Le.uWaveB},uTime:X.uTime,uNoise:{value:t},uFoam:{value:T.foam.clone()},uFoamShade:{value:T.foamShade.clone()},uCrest:{value:T.waterCrest.clone()},uInk:{value:T.inkSoft.clone()},uLift:{value:.2},uTile:{value:3.3},uInner:{value:.8},uOuter:{value:1.42},uOpacity:{value:1},uInkPx:{value:2.6},uVSpread:{value:.45},uVWidth:{value:.13}},vertexShader:`
        ${Ma}
        attribute vec2 aUv;
        attribute float aPower;
        uniform float uLift;
        varying vec2 vUv;
        varying float vPower;
        varying vec3 vWorldPos;
        void main() {
          vec3 p; vec3 nrm; float j;
          gerstnerSurface(position.xz, uTime, p, nrm, j);
          p.y += uLift;
          vUv = aUv;
          vPower = aPower;
          vWorldPos = p;
          gl_Position = projectionMatrix * viewMatrix * vec4(p, 1.0);
        }
      `,fragmentShader:`
        precision highp float;
        uniform sampler2D uNoise;
        uniform vec3 uFoam, uFoamShade, uCrest, uInk;
        uniform float uTime, uTile, uInner, uOuter, uOpacity, uInkPx;
        uniform float uVSpread, uVWidth;
        varying vec2 vUv;
        varying float vPower;
        varying vec3 vWorldPos;

        void main() {
          vec2 uv = vWorldPos.xz / uTile;
          vec4 nA = texture2D(uNoise, uv + vec2(uTime * 0.05, uTime * -0.03));
          vec4 nB = texture2D(uNoise, uv * 2.9 - vec2(uTime * 0.11, 0.0));
          // Feature-size floor, 8–16 px, same rule as the ribbon and the ocean,
          // and gated on each octave's REAL scale. The old third term was nB.b at
          // 2.9× the base rate — a feature size of uTile/325 ≈ 1 cm, i.e. sub-pixel
          // everywhere, and thresholding that is what put a salt-and-pepper fringe
          // right where the collar's silhouette needed to be a drawn shape.
          float fp = max(max(fwidth(vWorldPos.x), fwidth(vWorldPos.z)), 1e-5);
          float wMid = smoothstep(fp * 8.0, fp * 16.0, uTile / 14.0);
          float wFine = smoothstep(fp * 8.0, fp * 16.0, uTile / 40.6);
          float grain = (nA.r * 0.52 + nA.g * 0.28 * wMid + nB.g * 0.20 * wFine)
                      / (0.52 + 0.28 * wMid + 0.20 * wFine);
          grain = clamp(0.5 + (grain - 0.5) * 1.3, 0.0, 1.0);

          // Elliptical distance in hull-footprint units: 1.0 is the hull's own
          // outline, so the annulus starts just inside it and spills outward.
          //
          // The radius is warped by the noise *before* the annulus is built. The
          // r7 capture showed why: threshold a clean ellipse and, however lacy the
          // alpha afterwards, the outer boundary is still a visible circular arc
          // sitting on the water. Warping the metric means there is no arc to see.
          // The divisors put e = 1 exactly on the hull's own outline (0.32 × the
          // patch half-width is 0.94 m against a half-beam of 0.95 m; 0.435 × the
          // patch half-length is 2.30 m against a half-length of 2.30 m). They used
          // to be 0.42/0.56, i.e. e = 1 sat 30% *outside* the hull, so the whole
          // annulus was pushed off the waterline and the r5 capture showed the
          // collar as a floe of foam near the boat rather than a ring welded to it.
          float e = length(vec2(vUv.x / 0.32, vUv.y / 0.435));
          // Warp the metric before building the annulus, so there is no clean arc
          // anywhere. Held to ±0.18 — about a quarter of the annulus width — since
          // beyond that the ring stops being a ring.
          e *= 1.0 + (grain - 0.5) * 0.22 + (nB.g - 0.5) * 0.14;

          // The collar must be a *thick* band, not a hairline: the r3 review found
          // the waterline was "a razor-sharp geometric polygon edge with the water
          // band colour changing on the very next pixel", and a two-pixel ring
          // would not fix that. It starts inside the hull's own footprint (the hull
          // covers that part) and spills well outside it.
          float annulus = smoothstep(uInner, uInner + 0.14, e)
                        * (1.0 - smoothstep(uOuter * 0.72, uOuter, e));
          // Bow push and stern churn: the water piles up ahead of the hull and
          // boils behind it, so the collar is not a uniform ring.
          // ...but it must be *continuous* all the way round first. At a 0.55 base
          // the amidships collar — the part a chase camera actually sees — sat at
          // the minimum and the noise ate most of it.
          float bow = smoothstep(0.1, 0.6, vUv.y) * 0.32;
          float stern = smoothstep(-0.1, -0.8, vUv.y) * 0.55;
          float shape = annulus * (0.78 + bow + stern);

          // ── Bow wave: two divergent arms off the forefoot ──────────────────
          // The r3 review asked for "a bow-wave V that scales with speed" — the
          // cue that reads as hull speed and hull weight. Its arms leave the bow
          // and splay aft, so the apex is welded to the stem and the legs are
          // where the displaced water actually runs. The splay angle opens with
          // vPower, i.e. with speed, which is what makes it a speed cue rather
          // than decoration.
          // apex 0.46 puts it on the stem (0.46 × 5.29 m = 2.43 m forward).
          float apex = 0.46;
          float aft = clamp(apex - vUv.y, 0.0, 2.0);
          float spread = uVSpread * (0.55 + 0.75 * vPower);
          float arm = abs(abs(vUv.x) - (0.16 + spread * aft));
          float vwid = uVWidth * (1.0 + 0.9 * aft);
          float vee = (1.0 - smoothstep(0.0, vwid, arm))
                    * step(vUv.y, apex)
                    // ...and it fades out well inside the patch, so the arms end
                    // in foam breaking up rather than at the carrier's edge.
                    * (1.0 - smoothstep(0.55, 1.4, aft))
                    * (1.0 - smoothstep(0.72, 0.96, abs(vUv.x)))
                    * smoothstep(0.12, 0.45, vPower);
          shape = max(shape, vee * 1.15);

          // ── Hard cutout, then a drawn edge ───────────────────────────────
          // The mask is 0 or 1 and the fragment is opaque; fading is expressed as
          // less coverage and a lower tone, never as transparency. Capped below 1
          // so the noise always has range left to bite holes with — four grid-start
          // collars merging at full coverage is the "spilled paint puddle" the
          // countdown capture showed.
          float coverage = clamp(shape * (0.45 + 0.8 * vPower), 0.0, 0.86);
          float sd = coverage - (1.0 - grain);
          if (sd < 0.0) discard;
          // Signed distance converted to PIXELS. This is what makes the collar a
          // hard two-tone *shape with a contour* rather than an alpha falloff:
          // outermost 2.6 px is ink, the next band is the pale-cyan shadow side,
          // and the interior is white churn.
          //
          // Measured against the COARSE channel for the same reason as the ribbon:
          // a foam island narrower than the ink width would otherwise come out
          // entirely ink, i.e. as dark speckle inside the collar.
          float sdLo = coverage - (1.0 - clamp(0.5 + (nA.r - 0.5) * 1.3, 0.0, 1.0));
          float loPx = sdLo / max(length(vec2(dFdx(sdLo), dFdy(sdLo))), 1e-5);
          float onEdge = step(0.0, sdLo);

          vec3 col = mix(uFoamShade, uFoam, step(0.42, coverage));
          col = mix(col, uCrest,
                    onEdge * step(loPx, uInkPx * 3.2) * (1.0 - step(loPx, uInkPx)));
          col = mix(col, uInk, onEdge * step(loPx, uInkPx));
          gl_FragColor = vec4(col, uOpacity);
        }
      `}),this.mesh=new le(d,this.material),this.mesh.name="hullCollars",this.mesh.frustumCulled=!1,this.mesh.renderOrder=3,this.mesh.userData.skipPrepass=!0}get tunables(){return this.material.uniforms}update(e,t,s){const a=this.aPos.array,o=this.aPower.array,n=ke*$e,r=B.boat.beam*1.55,h=B.boat.length*1.15;for(let l=0;l<t.length;l++){const u=t[l].state,d=t[l].root.position,m=Math.sin(u.heading),c=Math.cos(u.heading),v=c,f=-m,p=Math.abs(u.forwardSpeed),w=Math.min(1,.38+p/B.boat.topSpeed+Math.abs(u.lateralSpeed)*.1)*s[l],y=l*n;for(let b=0;b<n;b++){const S=this.localUv[(y+b)*2],x=this.localUv[(y+b)*2+1],k=(y+b)*3;a[k+0]=d.x+v*S*r+m*x*h,a[k+1]=0,a[k+2]=d.z+f*S*r+c*x*h,o[y+b]=w}}this.aPos.needsUpdate=!0,this.aPower.needsUpdate=!0}dispose(){this.mesh.geometry.dispose(),this.material.dispose()}}class Lo{group=new pt;wake;collars;spray;wetness=new Float32Array(4);constructor(e=B.race.racerCount){const t=Js(512,5,5);t.minFilter=Sa,t.generateMipmaps=!0,t.anisotropy=8,t.needsUpdate=!0,this.wake=new zo(e,t),this.collars=new Ro(e,t),this.spray=new To(t),this.group.name="waterFx",this.group.add(this.collars.mesh),this.group.add(this.wake.mesh),this.group.add(this.spray.points)}update(e){const t=Math.min(e.racers.length,this.wetness.length);for(let s=0;s<t;s++)this.wetness[s]=Ao(e,e.racers[s]);this.wake.update(e,e.racers,this.wetness),this.collars.update(e,e.racers,this.wetness),this.spray.update(e,e.racers,this.wetness)}dispose(){this.wake.dispose(),this.collars.dispose(),this.spray.dispose()}}const Ua=new M;function _o(i){let e=Math.imul(i^2654435769,2246822507)>>>0;return e^=e>>>13,e=Math.imul(e,3266489909)>>>0,((e^e>>>16)>>>0)/4294967296}function Do(i,e,t,s){const a=1+i*e,o=new Float32Array(a*3),n=new Float32Array(a*2);o[0]=0,o[1]=0,o[2]=0;const r=Math.exp(s)-1,h=Math.PI*2/e;let l=3,u=2;for(let f=0;f<i;f++){const p=(f+1)/i,w=t*(Math.exp(s*p)-1)/r,y=(_o(f)-.5)*h;for(let b=0;b<e;b++){const S=b*h+y;o[l++]=Math.cos(S)*w,o[l++]=0,o[l++]=Math.sin(S)*w,n[u++]=p,n[u++]=b/e}}const d=e+(i-1)*e*2,m=new Uint32Array(d*3);let c=0;for(let f=0;f<e;f++)m[c++]=0,m[c++]=1+(f+1)%e,m[c++]=1+f;for(let f=0;f<i-1;f++){const p=1+f*e,w=p+e;for(let y=0;y<e;y++){const b=(y+1)%e;m[c++]=p+y,m[c++]=w+b,m[c++]=w+y,m[c++]=p+y,m[c++]=p+b,m[c++]=w+b}}const v=new Pe;return v.setAttribute("position",new H(o,3)),v.setAttribute("uv",new H(n,2)),v.setIndex(new H(m,1)),v.boundingSphere=null,v}class Bo{name="ocean";order=20;mesh;handles=xo();fx=new Lo;constructor(e=224,t=224,s=B.ocean.extent,a=5){const o=Do(e,t,s,a);this.mesh=new le(o,this.handles.material),this.mesh.name="ocean",this.mesh.frustumCulled=!1,this.mesh.renderOrder=0,this.mesh.userData.skipPrepass=!0;const n=this.handles.material.uniforms;n.uFilterSlope.value=Math.PI*2/t,n.uFilterBase.value=s*a/(e*(Math.exp(a)-1)),this.mesh.add(this.fx.group)}setSceneDepth(e){this.handles.setSceneDepth(e)}get material(){return this.handles.material}get tunables(){return this.handles.uniforms}update(e){const t=B.ocean.snap,s=Math.round(e.camera.position.x/t)*t,a=Math.round(e.camera.position.z/t)*t;this.mesh.position.set(s,0,a),this.fx.group.position.set(-s,0,-a),e.camera.getWorldDirection(Ua);const o=1-Math.min(1,Math.abs(Ua.y));this.handles.material.uniforms.uGraze.value=o*o,this.fx.update(e)}sample(e,t,s,a){return Qs(e,t,s,a)}height(e,t,s){return Ei(e,t,s)}maxHeight(){return Gi()}}const Ie=34,Te=220,Va=6,ja=26,Ka=34,qe=18,Ca=14,ei=11,Eo=Te/qe,ti=[{amp:46,period:940},{amp:19,period:370},{amp:7,period:143}];function xe(i){let e=0;for(const t of ti)e+=t.amp*Math.sin(i/t.period*Math.PI*2);return e}function No(i){let e=0;for(const t of ti){const s=Math.PI*2/t.period;e+=t.amp*s*Math.cos(i*s)}return e}function Me(i){const e=Math.sin(i*127.1+311.7)*43758.5453;return e-Math.floor(e)}function We(i,e,t){const s=Math.round(i/Eo);return Me(s*97.17+e*17.7+t*31.1)}function Go(i,e){const t=new Is(e,1),s=t.attributes.position,a=new M;for(let o=0;o<s.count;o++){a.fromBufferAttribute(s,o);const n=Me(i*31.7+o*7.3),r=(Math.floor(n*3)/2-.5)*.42;a.multiplyScalar(1+r),a.y*=.68,s.setXYZ(o,a.x,a.y,a.z)}return t.computeVertexNormals(),t}function Oo(i,e){const t=new Is(e,1),s=t.attributes.position,a=new M;for(let o=0;o<s.count;o++){a.fromBufferAttribute(s,o);const n=Me(i*17.3+o*3.1);a.multiplyScalar(.78+n*.5),a.y=a.y*.82+e*.18,s.setXYZ(o,a.x,a.y,a.z)}return t.computeVertexNormals(),t}function Wo(i){const e=i*Te,t=[],s=[];for(const o of[-1,1]){const n=t.length/3;for(let r=0;r<=qe;r++){const h=e-r/qe*Te,l=xe(h),u=l+o*(Ie-.5),d=l+o*(Ie+2.4+We(h,o,1.3)*2.8),m=Ca+We(h,o,2.7)*ei;t.push(u,.35+We(h,o,3.9)*.4,h,d,m,h)}for(let r=0;r<qe;r++){const h=n+r*2,l=h+1,u=h+2,d=h+3;o===1?s.push(h,l,u,l,d,u):s.push(h,u,l,l,u,d)}}const a=new Pe;return a.setAttribute("position",new H(new Float32Array(t),3)),a.setIndex(s),a.computeVertexNormals(),a.computeBoundingSphere(),a}function Io(i){const e=i*Te,t=[],s=[];for(const o of[-1,1]){const n=t.length/3;for(let r=0;r<=qe;r++){const h=e-r/qe*Te,l=xe(h),u=l+o*(Ie+2.4+We(h,o,1.3)*2.8),d=Ca+We(h,o,2.7)*ei,m=l+o*(Ie+26+We(h,o,4.1)*24),c=d-1.5+We(h,o,5.5)*4;t.push(u,d-.15,h,m,c,h)}for(let r=0;r<qe;r++){const h=n+r*2,l=h+1,u=h+2,d=h+3;o===1?s.push(h,l,u,l,d,u):s.push(h,u,l,l,u,d)}}const a=new Pe;return a.setAttribute("position",new H(new Float32Array(t),3)),a.setIndex(s),a.computeVertexNormals(),a.computeBoundingSphere(),a}function $a(i,e,t){let s=0,a=0;for(const v of t){const f=i[v];s+=f.attributes.position.count,a+=f.index?f.index.count:0}const o=new Float32Array(s*3),n=new Float32Array(s*3),r=new Uint32Array(a);let h=0,l=0;const u=new M,d=new M,m=new Ae;for(let v=0;v<t.length;v++){const f=i[t[v]],p=e[v];m.copy(p),m.setPosition(0,0,0);const w=f.attributes.position,y=f.attributes.normal,b=w.count;for(let S=0;S<b;S++)u.fromBufferAttribute(w,S).applyMatrix4(p),o[(h+S)*3]=u.x,o[(h+S)*3+1]=u.y,o[(h+S)*3+2]=u.z,d.fromBufferAttribute(y,S).applyMatrix4(m).normalize(),n[(h+S)*3]=d.x,n[(h+S)*3+1]=d.y,n[(h+S)*3+2]=d.z;if(f.index){const S=f.index;for(let x=0;x<S.count;x++)r[l+x]=S.getX(x)+h;l+=S.count}h+=b}const c=new Pe;return c.setAttribute("position",new H(o,3)),c.setAttribute("normal",new H(n,3)),c.setIndex(new H(r,1)),c.computeBoundingSphere(),c}class qo{name="river";order=35;group=new pt;length=1e5;checkpoints=[];chunks=[];rockProtos=[];bushProtos=[];bankMat=Se({name:"river-bank",color:T.foliage,rimColor:T.foliageLit,rimStrength:.38,specStrength:.03,outlineWidthPx:2.2});cliffMat=Se({name:"basalt-cliff",color:T.rock,rimColor:T.rockLit,rimStrength:.28,specStrength:.08,outlineWidthPx:2.6});rockMat=Se({name:"rock",color:T.rock,rimColor:T.rockLit,rimStrength:.35,specStrength:.08,outlineWidthPx:2.4});bushMat=Se({name:"bush",color:T.foliage,rimColor:T.foliageLit,rimStrength:.5,specStrength:.05,matcap:null,outlineWidthPx:2});constructor(){for(let e=0;e<6;e++)this.rockProtos.push(Go(e+1,1));for(let e=0;e<5;e++)this.bushProtos.push(Oo(e+11,1));for(let e=0;e<Va;e++)this.chunks.push(this.buildChunk(-e))}buildChunk(e){const{cliffs:t,banks:s,rocks:a,bushes:o}=this.chunkGeometry(e),n=Oe(new le(t,this.cliffMat.main),this.cliffMat),r=Oe(new le(s,this.bankMat.main),this.bankMat),h=Oe(new le(a,this.rockMat.main),this.rockMat),l=Oe(new le(o,this.bushMat.main),this.bushMat);return this.group.add(n,r,h,l),{index:e,cliffs:n,banks:r,rocks:h,bushes:l}}chunkGeometry(e){const t=e*Te,s=new Ae,a=new he,o=new M(0,1,0),n=new M,r=new M,h=[],l=[],u=[],d=[];for(let m=-1;;m=1){for(let c=0;c<ja;c++){const v=Me(e*811.3+m*97.1+c*13.7),f=Me(e*419.7+m*53.9+c*29.3),p=Me(e*233.1+m*71.3+c*41.9),w=t-(c+v)*(Te/ja),y=f*f*26,b=xe(w)+m*(Ie+2+y),S=3.4+p*7.5,x=-S*.55+v*2.2;n.set(S*(.8+f*.6),S,S*(.8+p*.6)),a.setFromAxisAngle(o,p*Math.PI*2),s.compose(r.set(b,x,w),a,n),h.push(s.clone()),l.push(Math.floor(v*this.rockProtos.length)%this.rockProtos.length)}for(let c=0;c<Ka;c++){const v=Me(e*617.9+m*31.7+c*19.1),f=Me(e*157.3+m*83.9+c*37.1),p=Me(e*941.7+m*11.3+c*7.9),w=t-(c+v)*(Te/Ka),y=8+f*46,b=xe(w)+m*(Ie+y),S=2.6+p*5.4,x=Ca+6+v*7.5+f*4;n.set(S*(.9+f*.5),S*(.7+v*.5),S*(.9+p*.5)),a.setFromAxisAngle(o,f*Math.PI*2),s.compose(r.set(b,x,w),a,n),u.push(s.clone()),d.push(Math.floor(p*this.bushProtos.length)%this.bushProtos.length)}if(m===1)break}return{cliffs:Wo(e),banks:Io(e),rocks:wa($a(this.rockProtos,h,l)),bushes:wa($a(this.bushProtos,u,d))}}update(e){const t=e.player.state.position.z,s=e.player.state.position,a=Ie-3.5,o=s.x-xe(s.z);if(Math.abs(o)>a){const h=Math.sign(o)*a;s.x=xe(s.z)+h,e.player.state.velocity.x*=.18}const n=Math.floor(t/Te),r=new Set;for(let h=0;h<Va;h++)r.add(n+1-h);for(const h of this.chunks){if(r.has(h.index)){r.delete(h.index);continue}const l=r.values().next();if(l.done)continue;const u=l.value;r.delete(u);const d=this.chunkGeometry(u);h.cliffs.geometry.dispose(),h.banks.geometry.dispose(),h.rocks.geometry.dispose(),h.bushes.geometry.dispose(),h.cliffs.geometry=d.cliffs,h.banks.geometry=d.banks,h.rocks.geometry=d.rocks,h.bushes.geometry=d.bushes,h.index=u}}startPosition(){return new M(xe(0),0,0)}sample(e,t){return this.sampleDistance(($(e,0,1)-.5)*this.length,t)}sampleDistance(e,t){const s=-e,a=No(s),o=t?.tangent??new M;o.set(-a,0,-1).normalize();const n=t?.position??new M;n.set(xe(s),0,s);const r=t??{position:n,tangent:o,curvature:0,u:0};return r.curvature=Math.abs(a),r.u=$(.5+e/this.length,0,1),r}project(e){const t=xe(e.z),s=-e.z;return{u:$(.5+s/this.length,0,1),distance:Math.abs(e.x-t),lateral:e.x-t}}startGrid(e){return{position:this.startPosition(),heading:Math.PI}}dispose(){for(const e of this.chunks)e.cliffs.geometry.dispose(),e.banks.geometry.dispose(),e.rocks.geometry.dispose(),e.bushes.geometry.dispose()}}const kt=i=>[-i[0],i[1],i[2]];let Ho=0;class Mt{p=[];f=[];facet=0;beginFacet(){return this.facet=++Ho,this}endFacet(){this.facet=0}tri(e,t,s){this.p.push(e[0],e[1],e[2],t[0],t[1],t[2],s[0],s[1],s[2]),this.f.push(this.facet)}quad(e,t,s,a){this.tri(e,t,s),this.tri(e,s,a)}quadMirrored(e,t,s,a,o){e>0?this.quad(t,s,a,o):this.quad(kt(t),kt(o),kt(a),kt(s))}loft(e,t,s=!1,a=0,o=-1){const n=o<0?e.length-1:o;for(let r=a;r<n;r++)s?this.quad(e[r],t[r],t[r+1],e[r+1]):this.quad(e[r],e[r+1],t[r+1],t[r])}cap(e,t,s,a=!0){const o=e.length,n=Uo(t,e[0],e[1]),r=n[0]*s[0]+n[1]*s[1]+n[2]*s[2]<0,h=a?o:o-1;for(let l=0;l<h;l++){const u=e[l],d=e[(l+1)%o];r?this.tri(t,d,u):this.tri(t,u,d)}}box(e,t,s,a,o,n){this.taperBox(o,n,[e,t,s,a],[e,t,s,a])}taperBox(e,t,s,a,o=!0,n=!0,r=!1){if(e>t){const y=e;e=t,t=y;const b=s;s=a,a=b}const h=Qa(s),l=Qa(a),u=[h[0],h[2],e],d=[h[1],h[2],e],m=[h[1],h[3],e],c=[h[0],h[3],e],v=[l[0],l[2],t],f=[l[1],l[2],t],p=[l[1],l[3],t],w=[l[0],l[3],t];this.quad(d,m,p,f),this.quad(v,w,c,u),r||this.quad(c,w,p,m),this.quad(v,u,d,f),n&&this.quad(v,f,p,w),o&&this.quad(d,u,c,m)}prism(e,t,s,a=!0,o=!0){const n=e.length;for(let d=0;d<n;d++){const m=e[d],c=e[(d+1)%n];this.quad([m[0],m[1],t],[c[0],c[1],t],[c[0],c[1],s],[m[0],m[1],s])}const r=e.reduce((d,m)=>d+m[0],0)/n,h=e.reduce((d,m)=>d+m[1],0)/n,l=e.map(d=>[d[0],d[1],t]),u=e.map(d=>[d[0],d[1],s]);a&&this.cap(l,[r,h,t],[0,0,-1]),o&&this.cap(u,[r,h,s],[0,0,1])}append(e){for(let t=0;t<e.p.length;t++)this.p.push(e.p[t]);for(let t=0;t<e.f.length;t++)this.f.push(e.f[t])}get triangleCount(){return this.p.length/9}geometry(e){const t=this.p.length/3,s=t/3,a=new Float32Array(this.p),o=new Float32Array(t*3),n=new Float32Array(t*2),r=new Float64Array(s),h=new Float64Array(s),l=new Float64Array(s);for(let m=0;m<s;m++){const c=m*9,v=a[c+3]-a[c],f=a[c+4]-a[c+1],p=a[c+5]-a[c+2],w=a[c+6]-a[c],y=a[c+7]-a[c+1],b=a[c+8]-a[c+2];r[m]=f*b-p*y,h[m]=p*w-v*b,l[m]=v*y-f*w}const u=new Map;for(let m=0;m<s;m++){const c=this.f[m]??0;if(c===0)continue;const v=u.get(c);v?(v[0]+=r[m],v[1]+=h[m],v[2]+=l[m]):u.set(c,[r[m],h[m],l[m]])}for(let m=0;m<s;m++){const c=this.f[m]??0;let v=r[m],f=h[m],p=l[m];if(c!==0){const b=u.get(c);Math.hypot(b[0],b[1],b[2])>1e-9&&(v=b[0],f=b[1],p=b[2])}const w=Math.hypot(v,f,p)||1;v/=w,f/=w,p/=w;const y=m*9;for(let b=0;b<3;b++)o[y+b*3+0]=v,o[y+b*3+1]=f,o[y+b*3+2]=p}for(let m=0;m<t;m++)n[m*2+0]=a[m*3+0]*.5+.5,n[m*2+1]=a[m*3+2]*.2+.5;const d=new Pe;return d.name=e,d.setAttribute("position",new H(a,3)),d.setAttribute("normal",new H(o,3)),d.setAttribute("uv",new H(n,2)),d.computeBoundingSphere(),d}}function Qa(i){return[Math.min(i[0],i[1]),Math.max(i[0],i[1]),Math.min(i[2],i[3]),Math.max(i[2],i[3])]}function Uo(i,e,t){const s=e[0]-i[0],a=e[1]-i[1],o=e[2]-i[2],n=t[0]-i[0],r=t[1]-i[1],h=t[2]-i[2],l=a*h-o*r,u=o*n-s*h,d=s*r-a*n,m=Math.hypot(l,u,d)||1;return[l/m,u/m,d/m]}const Tt=[{z:-2.32,w:.88,keel:-.22,chine:-.06,sheer:.2},{z:-1.6,w:.94,keel:-.29,chine:-.1,sheer:.19},{z:-.7,w:.95,keel:-.33,chine:-.12,sheer:.18},{z:.2,w:.9,keel:-.32,chine:-.11,sheer:.22},{z:.9,w:.78,keel:-.26,chine:-.04,sheer:.34},{z:1.55,w:.58,keel:-.12,chine:.06,sheer:.46},{z:2.05,w:.3,keel:.1,chine:.22,sheer:.58},{z:2.34,w:.05,keel:.34,chine:.4,sheer:.64}],Vo=[-2.32,-2.05,-1.7,-1.32,-1.06,-.6,-.1,.35,.9,1.35,1.8,2.1,2.34];function jo(i){let e=0;for(;e<Tt.length-2&&Tt[e+1].z<i;)e++;const t=Tt[e],s=Tt[e+1],a=Math.max(0,Math.min(1,(i-t.z)/(s.z-t.z))),o=a*a*(3-2*a),n=(r,h)=>r+(h-r)*o;return{z:i,w:n(t.w,s.w),keel:n(t.keel,s.keel),chine:n(t.chine,s.chine),sheer:n(t.sheer,s.sheer)}}const Ko=.055,Zt=.07,Yt=.055,it=[-1,-.62,-.32,-.11,.11,.32,.62,1],Xa=.115,Za=[[0,5],[6,8],[9,11]],$o=[[0,3],[4,6],[7,8],[9,11]],ya=[.32,.62],Ya=-1.06,Ja=.35,Qo=.19;function Xo(i,e){const t=Math.min(Math.abs(i),Math.abs(e)),s=Math.max(Math.abs(i),Math.abs(e));return Math.sign(i)===Math.sign(e)&&Math.abs(t-ya[0])<1e-4&&Math.abs(s-ya[1])<1e-4}const Ye=i=>i.w*.985;function Zo(i){const e=i.w,t=Ye(i),s=i.keel+(i.chine-i.keel)*.34,a=i.chine+(i.sheer-i.chine)*.32,o=i.z;return[[-t,i.sheer,o],[-e*.995,a,o],[-e,i.chine+.022,o],[-e*.82,i.chine,o],[-e*.42,s,o],[0,i.keel,o],[e*.42,s,o],[e*.82,i.chine,o],[e,i.chine+.022,o],[e*.995,a,o],[t,i.sheer,o]]}function te(i,e){const t=Ye(i);return[e*t,i.sheer+Ko*(1-e*e),i.z]}const At=[{z:-1.04,hw:.32,top:.66},{z:-1.3,hw:.46,top:.75},{z:-1.62,hw:.47,top:.71},{z:-1.92,hw:.42,top:.56},{z:-2.16,hw:.34,top:.4}],Pt=[{z:-1.06,hw:.3,top:.6},{z:-.8,hw:.335,top:.575},{z:-.42,hw:.32,top:.545},{z:-.05,hw:.25,top:.495}],ae=.22;function es(i,e,t){const s=e-ae;return[[-i,ae,t],[-i*1.05,ae+s*.55,t],[-i*.74,e,t],[-i*.3,e+.016,t],[0,e+.022,t],[i*.3,e+.016,t],[i*.74,e,t],[i*1.05,ae+s*.55,t],[i,ae,t]]}const Yo=[3,4],Wt=new M(0,.615,-.46),ba=new M(0,.775,-.01),ts=.31;function Fa(i){const e=Math.max(i.r,i.g,i.b)||1;return i.clone().multiplyScalar(1/e)}const ai=Fa(T.hudPaper),Ne=Fa(T.skyMid).lerp(ai,.62),Ge=Fa(T.sun).lerp(ai,.74);function Jo(){return[Ne.clone().multiplyScalar(.44),Ne.clone().multiplyScalar(.68),Ge.clone().multiplyScalar(.92),Ge.clone().multiplyScalar(1)]}const Jt=[0,.4,.56,.82];function en(i){const e=Ys[i].hull,t=Se({name:`hull${i}`,color:e,rampColors:Jo(),rampStops:Jt,specSize:.978,specSize2:.994,specStrength:.14,rimColor:T.rimLight,rimPower:3.4,rimStrength:.5,outlineWidthPx:5}),s=Se({name:`trim${i}`,color:T.inkSoft,rampColors:[Ne.clone().multiplyScalar(1.6),Ne.clone().multiplyScalar(2.8),Ge.clone().multiplyScalar(4.2),Ge.clone().multiplyScalar(5.2)],rampStops:Jt,specSize:.965,specSize2:.992,specStrength:.34,rimColor:T.rimLight,rimPower:2.6,rimStrength:.9,outlineWidthPx:3.4}),a=Se({name:`bright${i}`,color:T.hudPaper,rampColors:[Ne.clone().multiplyScalar(.56),Ne.clone().multiplyScalar(.76),Ge.clone().multiplyScalar(.94),Ge.clone().multiplyScalar(1)],rampStops:Jt,specSize:.975,specSize2:.993,specStrength:.1,rimColor:T.waterShallow,rimPower:3,rimStrength:.4,outlineWidthPx:3.4}),o=Se({name:`glass${i}`,color:T.skyHorizon,rampColors:[Ne.clone().multiplyScalar(.62),Ge.clone().multiplyScalar(1.06)],rampStops:[0,.5],specSize:.955,specSize2:.988,specStrength:.4,rimColor:T.foam,rimPower:2.2,rimStrength:.85,outlineWidthPx:3.4});return{hull:t,trim:s,bright:a,glass:o}}function tn(i){const e=new Mt,t=new Mt,s=new Mt,a=new Mt,o=Vo.map(jo),n=o.map(Zo),r=o.length;for(let f=0;f<10;f++){const p=f===1||f===8?s:e;for(const[w,y]of Za){p.beginFacet();for(let b=w;b<=y;b++){const S=n[b],x=n[b+1];p.quad(S[f],S[f+1],x[f+1],x[f])}p.endFacet()}}{const f=o[0],p=n[0],w=[];for(let b=it.length-2;b>=1;b--){const S=te(f,it[b]);w.push([S[0],S[1],f.z])}const y=[...p,...w];e.beginFacet(),e.cap(y,[0,(f.keel+f.sheer)*.5,f.z],[0,0,-1],!0),e.endFacet()}{const f=o[r-1],p=n[r-1];e.beginFacet(),e.cap(p,[0,(f.keel+f.sheer)*.5,f.z],[0,0,1],!0),e.endFacet()}const h=.3;for(let f=0;f<it.length-1;f++){const p=it[f],w=it[f+1],y=Math.abs(p)<=Xa&&Math.abs(w)<=Xa,b=Xo(p,w);for(const[S,x]of $o){const _=o[S].z>=h&&y?s:e;_.beginFacet();for(let L=S;L<=x;L++){const C=o[L],z=o[L+1];b&&C.z>=Ya-1e-4&&z.z<=Ja+1e-4||_.quad(te(C,p),te(z,p),te(z,w),te(C,w))}_.endFacet()}}for(const f of[-1,1]){for(const[p,w]of Za)for(let y=0;y<3;y++){t.beginFacet();for(let b=p;b<=w;b++){const S=o[b],x=o[b+1],k=Ye(S),_=Ye(x),L=S.sheer+Zt,C=x.sheer+Zt,z=Math.min(Yt,k*.5),A=Math.min(Yt,_*.5);y===0?t.quadMirrored(f,[k,S.sheer,S.z],[k,L,S.z],[_,C,x.z],[_,x.sheer,x.z]):y===1?t.quadMirrored(f,[k,L,S.z],[k-z,L,S.z],[_-A,C,x.z],[_,C,x.z]):t.quadMirrored(f,[k-z,L,S.z],[k-z,te(S,(k-z)/k)[1],S.z],[_-A,te(x,(_-A)/_)[1],x.z],[_-A,C,x.z])}t.endFacet()}for(const p of[0,r-1]){const w=o[p],y=Ye(w),b=Math.min(Yt,y*.5),S=w.sheer+Zt,x=te(w,(y-b)/y)[1],k=p===0?w.z-.001:w.z+.001;t.quadMirrored(f,[y,w.sheer,k],[y,S,k],[y-b,S,k],[y-b,x,k])}}{const f=At.map(y=>es(y.hw,y.top,y.z));for(let y=0;y<f[0].length-1;y++){const b=Yo.includes(y)?s:e;b.beginFacet();for(let S=0;S<f.length-1;S++){const x=f[S],k=f[S+1];b.quad(x[y],x[y+1],k[y+1],k[y])}b.endFacet()}const p=At[0],w=At[At.length-1];e.beginFacet(),e.cap(f[0],[0,(ae+p.top)*.5,p.z],[0,0,1],!0),e.endFacet(),e.beginFacet(),e.cap(f[f.length-1],[0,(ae+w.top)*.5,w.z],[0,0,-1],!0),e.endFacet(),e.quad([-p.hw,ae,p.z],[-w.hw,ae,w.z],[w.hw,ae,w.z],[p.hw,ae,p.z]),t.taperBox(-1.66,-1.24,[-.2,.2,.7,.795],[-.155,.155,.66,.83]),t.box(-.175,.175,.645,.85,-1.29,-1.235)}{const f=Pt.map(y=>es(y.hw,y.top,y.z));for(let y=0;y<f[0].length-1;y++){t.beginFacet();for(let b=0;b<f.length-1;b++){const S=f[b],x=f[b+1];t.quad(S[y],x[y],x[y+1],S[y+1])}t.endFacet()}const p=Pt[0],w=Pt[Pt.length-1];t.beginFacet(),t.cap(f[0],[0,(ae+p.top)*.5,p.z],[0,0,-1],!0),t.endFacet(),t.beginFacet(),t.cap(f[f.length-1],[0,(ae+w.top)*.5,w.z],[0,0,1],!0),t.endFacet(),t.quad([-p.hw,ae,p.z],[p.hw,ae,p.z],[w.hw,ae,w.z],[-w.hw,ae,w.z]),s.taperBox(-1,-.2,[-.245,.245,.575,.605],[-.205,.205,.52,.55])}{const f=[];for(const b of o)b.z>=Ya-1e-4&&b.z<=Ja+1e-4&&f.push(b);const[p,w]=ya,y=(b,S)=>{const x=te(b,S);return[x[0],x[1]-Qo,x[2]]};for(const b of[-1,1]){t.beginFacet();for(let z=0;z<f.length-1;z++){const A=f[z],E=f[z+1];t.quadMirrored(b,y(A,p),y(E,p),y(E,w),y(A,w))}t.endFacet(),t.beginFacet();for(let z=0;z<f.length-1;z++){const A=f[z],E=f[z+1];t.quadMirrored(b,y(A,w),y(E,w),te(E,w),te(A,w))}t.endFacet(),t.beginFacet();for(let z=0;z<f.length-1;z++){const A=f[z],E=f[z+1];t.quadMirrored(b,te(A,p),te(E,p),y(E,p),y(A,p))}t.endFacet();const S=f[0],x=f[f.length-1];t.quadMirrored(b,y(S,p),te(S,p),te(S,w),y(S,w)),t.quadMirrored(b,y(x,w),te(x,w),te(x,p),y(x,p));const k=p+(w-p)*.18,_=p+(w-p)*.82,L=.012,C=(z,A)=>{const E=y(z,A);return[E[0],E[1]+L,E[2]]};s.beginFacet();for(let z=0;z<f.length-1;z++){const A=f[z],E=f[z+1];s.quadMirrored(b,C(A,k),C(E,k),C(E,_),C(A,_))}s.endFacet()}}t.taperBox(-1.14,-1,[-.28,.28,.5,.88],[-.25,.25,.5,.84]),s.taperBox(-1,-.965,[-.215,.215,.6,.83],[-.205,.205,.6,.8]),t.taperBox(-.02,.34,[-.055,.055,.7,.79],[-.085,.085,.22,.3]),t.box(-.35,.35,.757,.793,-.042,.006);for(const f of[-1,1])s.box(f*.235,f*.352,.748,.802,-.058,.022);{t.taperBox(.3,.7,[-.4,.4,.18,.62],[-.32,.32,.24,.4]),s.taperBox(.37,.62,[-.21,.21,.6,.618],[-.175,.175,.44,.458]);const f=.34,p=.585,w=.1,y=.855,b=.285,S=.225,x=.034;a.taperBox(w,f,[-S,S,y,y+x],[-b,b,p,p+x],!0,!0,!0);const k=(C,z)=>{const A=b+(S-b)*C;return[z*A,p+x+(y-p)*C,f+(w-f)*C]},_=.34,L=-.62;s.beginFacet(),s.quad(k(0,-1),k(0,_),k(1,L),k(1,-1)),s.endFacet(),a.beginFacet(),a.quad(k(0,_),k(0,1),k(1,1),k(1,L)),a.endFacet();for(const C of[-1,1])t.taperBox(w,f,[C*S,C*(S+.036),y-.008,y+x+.014],[C*b,C*(b+.036),p-.008,p+x+.014]);t.taperBox(w-.042,w+.02,[-S-.036,S+.036,y-.01,y+x+.016],[-S-.036,S+.036,y-.01,y+x+.016])}t.taperBox(-2.44,-2.14,[-.5,.5,.805,.85],[-.45,.45,.835,.88]),e.taperBox(-2.42,-2.16,[-.05,.05,.82,1.14],[-.042,.042,.84,.99]);for(const f of[-1,1]){const p=f*.2,w=f*.28;t.taperBox(-2.3,-2.16,[p,w,.16,.845],[p,w,.18,.862])}t.taperBox(2.2,2.54,[-.085,.085,.3,.66],[-.02,.02,.47,.51]);{const f=o[0],p=Ye(f);t.taperBox(-2.345,-2.28,[-p*.9,p*.9,-.2,.055],[-p*.94,p*.94,-.21,.06]),s.box(-.4,.4,-.055,.06,-2.4,-2.3),s.taperBox(-2.35,-2.3,[-p*.86,p*.86,.12,.175],[-p*.9,p*.9,.115,.18])}t.taperBox(-2.36,-1.66,[-.08,.08,-.6,-.18],[-.055,.055,-.3,-.2]),t.taperBox(-2.5,-2.02,[-.075,.075,-.52,-.35],[-.105,.105,-.56,-.3]),e.taperBox(-2.58,-2.48,[-.035,.035,-.47,-.4],[-.075,.075,-.51,-.36]),s.box(-.26,.26,-.295,-.25,-2.44,-2.08);for(const f of[-1,1])t.box(f*.2,f*.34,.115,.235,-2.44,-2.3);const l=en(i),u=new pt;u.name=`boatMesh${i}`;const d=[[e,l.hull,"hullShell"],[t,l.trim,"hullTrim"],[s,l.bright,"hullBright"],[a,l.glass,"hullGlass"]];let m=0;for(const[f,p,w]of d){const y=new le(f.geometry(`${w}${i}`));y.name=`${w}${i}`,Oe(y,p),u.add(y),m+=f.triangleCount}const c=new Ra;c.name="seat",c.position.copy(Wt),u.add(c);const v=new Ra;return v.name="grip",v.position.copy(ba),u.add(v),{group:u,seat:c,grip:v,materials:[l.hull,l.trim,l.bright,l.glass],triangles:m}}const ea=9.81,Ee=-.26,He=[new M(0,Ee,2),new M(-.7,Ee,.95),new M(.7,Ee,.95),new M(-.82,Ee,-.95),new M(.82,Ee,-.95),new M(0,Ee,-2)],as=[new M(0,.06,2.06),new M(0,-.33,.1),new M(-.86,-.05,-1.4),new M(.86,-.05,-1.4),new M(0,-.6,-2.24)];He.reduce((i,e)=>i+e.z*e.z,0)/He.length;He.reduce((i,e)=>i+e.x*e.x,0)/He.length;const ot=.95,ze=new M,ta=new he,an={position:new M,normal:new M(0,1,0),height:0,jacobian:1},aa=new M,sa=new M;function sn(){return{engine:0,yawVel:0,pitchVel:0,rollVel:0,prevSurfaceY:0,inAir:!1,airGap:0,launchCeil:1/0,slip:0,hitCooldown:0,trimPitch:0,bankRoll:0,initialised:!1}}class on{constructor(e){this.racers=e;for(const t of e)this.internals.set(t.id,sn())}racers;name="boatPhysics";order=30;internals=new Map;update(e){for(const t of this.racers)this.step(e,t);this.resolveCollisions(e);for(const t of this.racers){const s=this.internals.get(t.id),a=t.state,o=t.root.rotation;o.order="YXZ",o.y=a.heading,o.x=a.pitch+s.trimPitch,o.z=a.roll+s.bankRoll}}debugState(e){const t=this.internals.get(e);return t?{engine:t.engine,yawVel:t.yawVel,pitchVel:t.pitchVel,rollVel:t.rollVel}:null}step(e,t){const s=e.dt;if(s<=0)return;const a=t.state,o=t.controls,n=B.boat,r=this.internals.get(t.id),h=t.root.position;(!r.initialised||a.velocity.lengthSq()===0&&a.forwardSpeed===0&&a.boostTime===0)&&(r.engine=0,r.yawVel=0,r.pitchVel=0,r.rollVel=0,r.slip=0,a.pitch=0,a.roll=0,r.prevSurfaceY=e.ocean.height(h.x,h.z,e.time),h.y=r.prevSurfaceY-Ee-n.restDraft,a.airborne=!1,a.airTime=0,r.inAir=!1,r.airGap=0,r.launchCeil=1/0,r.initialised=!0),r.hitCooldown=Math.max(0,r.hitCooldown-s);const l=Math.sin(a.heading),u=Math.cos(a.heading),d=u,m=-l;let c=a.velocity.x*l+a.velocity.z*u,v=a.velocity.x*d+a.velocity.z*m;ta.setFromEuler(t.root.rotation);let f=0,p=0,w=0,y=0,b=0;for(let U=0;U<He.length;U++){const K=He[U];ze.copy(K).applyQuaternion(ta).add(h);const P=e.ocean.sample(ze.x,ze.z,e.time,an);f+=P.height;const G=ze.y-P.height;if(G<0){const oe=Math.min(-G,n.maxDraft);b++,p+=oe,w+=oe*K.z,y+=oe*K.x}}const S=He.length,x=f/S,k=p/S,_=b/S,L=$((x-r.prevSurfaceY)/s,-18,18);r.prevSurfaceY=x;let C=1/0;for(let U=0;U<as.length;U++){ze.copy(as[U]).applyQuaternion(ta).add(h);const K=ze.y-e.ocean.height(ze.x,ze.z,e.time);K<C&&(C=K)}const z=r.inAir,A=b===0&&C>n.airborneClearance;if(r.inAir=A,A){if(r.airGap=0,a.airTime+=s,!a.airborne&&a.airTime>=n.airMinDuration){const U=Math.max(0,C-n.airborneClearance),K=a.velocity.y;(K+Math.sqrt(K*K+2*ea*U))/ea>=n.airMinDuration&&(a.airborne=!0)}}else r.airGap+=s,b>0||r.airGap>=n.airCoyote?(a.airborne=!1,a.airTime=0):a.airTime+=s;const E=I(o.throttle);r.engine=q(r.engine,E,E>r.engine?n.throttleUpRate:n.throttleDownRate,s),a.appliedThrottle=r.engine;const O=a.boostTime>0,N=A?n.airThrust:.45+.55*I(_*1.6);let j=r.engine*(n.thrust/n.mass)*N;O&&(j+=n.boostForce/n.mass*(A?n.airThrust:1)),j-=I(o.brake)*(n.reverseThrust/n.mass)*(A?0:1);const ce=A?.14:.55+.45*_;j-=(n.dragLinear*c+n.dragQuadratic*c*Math.abs(c))*ce,k>n.restDraft&&(j-=(k-n.restDraft)*n.ploughDrag*I(c/6)),c=$(c+j*s,-9,n.boostTopSpeed*1.15);const fe=I(Math.abs(c)/n.topSpeed);let pe=n.turnRateLow+(n.turnRateHigh-n.turnRateLow)*fe;const ve=.12+.88*Hs(0,5.5,Math.abs(c)),D=a.drifting?n.driftMinSpeed*.55:n.driftMinSpeed,ue=!A||a.drifting&&a.airTime<.6,we=o.drift&&Math.abs(c)>D&&Math.abs(o.steer)>.2&&ue;we&&(pe*=n.driftYawGain);const de=A?n.airControl:1,Ue=-o.steer*pe*ve*de;r.yawVel=q(r.yawVel,Ue,n.yawResponse,s),a.heading+=r.yawVel*s,a.drifting=we;const Ce=A?n.airGrip:a.drifting?n.driftGrip:n.lateralGrip,wt=Math.hypot(c,v);v*=Math.exp(-Ce*s);const at=(wt-Math.hypot(c,v))*(a.drifting?n.driftRecovery:n.gripRecovery);c+=c<0?-at:at,a.lateralSpeed=v;const yt=Math.abs(v)>n.driftSlipThreshold;if(r.slip=q(r.slip,yt&&a.drifting?1:0,9,s),a.drifting){a.driftCharge+=s*r.slip*(.55+.45*I(Math.abs(v)/7));let U=0;for(let K=0;K<n.driftTiers.length;K++)a.driftCharge>=n.driftTiers[K]&&(U=K+1);a.driftTier=U,a.boostMeter=I(a.driftCharge/n.driftTiers[n.driftTiers.length-1])}else o.drift&&Math.abs(o.steer)>.2&&A?a.boostMeter=I(a.driftCharge/n.driftTiers[n.driftTiers.length-1]):(a.driftTier>0&&(a.boostTime=n.boostDuration[a.driftTier-1],c+=Math.abs(v)*n.driftExitKick,e.audio.boost(),t.isPlayer&&e.cameraRig.addShake(.12+.06*a.driftTier)),a.driftCharge=0,a.driftTier=0,a.boostMeter=O?I(a.boostTime/n.boostDuration[n.boostDuration.length-1]):q(a.boostMeter,0,6,s));a.boostTime=Math.max(0,a.boostTime-s),a.velocity.x=l*c+d*v,a.velocity.z=u*c+m*v,a.forwardSpeed=c;const Ve=Math.min(k*n.buoyancy,n.maxBuoyantAccel);if(a.velocity.y+=(Ve-ea)*s,_>0){const U=a.velocity.y-L,K=Math.max(_,n.buoyancyDampFloor);a.velocity.y-=U*n.buoyancyDamping*K*s}A||(a.velocity.y+=n.planingLift*c*c*_*s),!z&&A&&(r.launchCeil=L+n.maxLaunchSpeed);const je=A?r.launchCeil:L+n.maxLaunchSpeed;(_>0||A)&&(a.velocity.y=Math.min(a.velocity.y,je)),h.addScaledVector(a.velocity,s);const _e=x-n.maxDraft;if(h.y<_e&&(h.y=_e,a.velocity.y<L&&(a.velocity.y=L)),h.y>x+14&&(h.y=x+14,a.velocity.y>0&&(a.velocity.y=0)),a.landingImpact=0,z&&!A){const U=Math.max(0,L-a.velocity.y);if(a.landingImpact=U,r.pitchVel-=U*n.slamPitchKick,c*=1-I(U/34)*.22,a.forwardSpeed=c,a.velocity.x=l*c+d*v,a.velocity.z=u*c+m*v,U>1.6){const K=I(U/9),P=Math.pow(K,1.5);t.isPlayer&&e.cameraRig.addShake(P*.85),e.audio.impact(K),e.audio.splash(I(.3+K*.7))}}if(A){const U=Math.hypot(a.velocity.x,a.velocity.z),K=$(Math.atan2(-a.velocity.y,Math.max(U,3))*.55,-.4,.34);r.pitchVel=q(r.pitchVel,(K-a.pitch)*3.4,5,s),r.rollVel=q(r.rollVel,-a.roll*2.4,4,s)}else{const U=-17*(w/S)-n.pitchDamping*r.pitchVel;r.pitchVel+=U*s;const K=n.rollStiffness*(y/S)-n.rollDamping*r.rollVel;r.rollVel+=K*s}a.pitch=$(a.pitch+r.pitchVel*s,-.62,.56),a.roll=$(a.roll+r.rollVel*s,-.66,.66);const qt=$(-.0085*r.yawVel*c,-.36,.36),Ht=$(v*n.slipLeanGain,-.2,.2);r.trimPitch=q(r.trimPitch,-.1*fe*fe,3.5,s),r.bankRoll=q(r.bankRoll,qt+Ht,6.5,s),a.speedFrac=I(Math.hypot(a.velocity.x,a.velocity.z)/n.boostTopSpeed)}resolveCollisions(e){const t=B.boat,s=t.collisionRadius,a=this.racers;for(let o=0;o<a.length;o++)for(let n=o+1;n<a.length;n++){const r=a[o],h=a[n],l=h.root.position.x-r.root.position.x,u=h.root.position.z-r.root.position.z,d=ot+s;if(!(l*l+u*u>4*d*d))for(let m=0;m<2;m++)for(let c=0;c<2;c++){ss(r,m===0?ot:-ot,aa),ss(h,c===0?ot:-ot,sa);let v=sa.x-aa.x,f=sa.z-aa.z,p=v*v+f*f;const w=s*2;if(p>=w*w)continue;let y=Math.sqrt(p);y<1e-4&&(v=1,f=0,y=1);const b=v/y,S=f/y,x=w-y;r.root.position.x-=b*x*.5,r.root.position.z-=S*x*.5,h.root.position.x+=b*x*.5,h.root.position.z+=S*x*.5;const k=h.state.velocity.x-r.state.velocity.x,_=h.state.velocity.z-r.state.velocity.z,L=k*b+_*S;if(L<0){const C=-1.42*L*.5;r.state.velocity.x-=b*C,r.state.velocity.z-=S*C,h.state.velocity.x+=b*C,h.state.velocity.z+=S*C;const z=this.internals.get(r.id),A=this.internals.get(h.id),E=m===0?1:-1,O=c===0?1:-1,N=$(-L*t.collisionSpin,0,2.2),j=Math.sign(b*Math.cos(r.state.heading)-S*Math.sin(r.state.heading)),ce=Math.sign(b*Math.cos(h.state.heading)-S*Math.sin(h.state.heading));z.yawVel+=N*E*j*-1,A.yawVel+=N*O*ce;for(const fe of[r,h]){const pe=this.internals.get(fe.id);if(pe.hitCooldown>0)continue;pe.hitCooldown=.18;const ve=I(-L/16);e.audio.impact(ve*.7),fe.isPlayer&&e.cameraRig.addShake(.14+ve*.4)}}}}}}function ss(i,e,t){const s=i.state.heading;t.set(i.root.position.x+Math.sin(s)*e,i.root.position.y,i.root.position.z+Math.cos(s)*e)}const nn=["YOU","KAIRA","NOX","PIP"],rn=[null,"aggressive","clean","erratic"],si=new Map;function ln(i,e,t){const s=new pt;s.name=`racer${i}`,s.rotation.order="YXZ",s.position.copy(e),s.rotation.y=t;const a=tn(i);si.set(i,a),s.add(a.group);const o={position:s.position,velocity:new M,heading:t,forwardSpeed:0,lateralSpeed:0,speedFrac:0,pitch:0,roll:0,airborne:!1,airTime:0,landingImpact:0,drifting:!1,driftCharge:0,driftTier:0,boostTime:0,boostMeter:0,appliedThrottle:0};return{id:i,isPlayer:i===0,name:nn[i],root:s,state:o,controls:qs(),personality:rn[i],lap:0,nextCheckpoint:0,progress:0,place:i+1,finished:!1,finishTime:0,lapTimes:[],bestLap:1/0,wrongWay:!1}}function hn(i){return si.get(i.id)?.seat??null}const g={hips:0,spine:1,chest:2,neck:3,head:4,clavL:5,upArmL:6,loArmL:7,handL:8,clavR:9,upArmR:10,loArmR:11,handR:12,thighL:13,shinL:14,footL:15,thighR:16,shinR:17,footR:18,scarfA:19,scarfB:20,scarfC:21},et=22,is=[{height:1.12,girth:1.02,armLen:1,legLen:1,headSize:1.08,hunch:0,shrug:0,shoulderPad:"left",crest:"fin",scarf:1,tempo:1,phase:0,bias:.25},{height:1.2,girth:.92,armLen:1.1,legLen:1.06,headSize:1.02,hunch:-.12,shrug:-.06,shoulderPad:"none",crest:"mohawk",scarf:1.35,tempo:.88,phase:1.9,bias:-1},{height:1.07,girth:1.22,armLen:.94,legLen:.94,headSize:1.14,hunch:.26,shrug:.14,shoulderPad:"both",crest:"none",scarf:0,tempo:1.12,phase:3.6,bias:.7},{height:1.01,girth:.96,armLen:.96,legLen:.9,headSize:1.24,hunch:.07,shrug:.04,shoulderPad:"left",crest:"fin",scarf:1.15,tempo:1.3,phase:5.1,bias:-.55}],Y=(i,e,t)=>new M(i,e,t);function cn(i){const e=i.height,t=i.armLen,s=i.legLen,a=i.girth,o=E=>E*e,n=Y(0,0,0),r=Y(0,o(.16),.03),h=Y(0,o(.36),.09),l=Y(0,o(.52),.13),u=Y(0,o(.6),.14),d=Y(0,o(.6)+.22*i.headSize,.155),m=Y(-.185*a,o(.455),.125),c=Y(-.05,o(.485),.115),v=Y(m.x-.15*t*a,m.y-.14*t*e,m.z+.13*t),f=Y(v.x+.025*t*a,v.y-.16*t*e,v.z+.195*t),p=Y(f.x,f.y-.022,f.z+.095),w=Y(-.115*a,-.02,.01),y=Y(-.215*a,-.185,.2+.07*s),b=Y(-.235*a,-.415,.08),S=Y(-.24*a,-.465,.2),x=E=>Y(-E.x,E.y,E.z),k=i.scarf>0?i.scarf:1,_=Y(0,o(.5),.05),L=Y(0,o(.46)-.015*k,.05-.115*k),C=Y(.012,o(.4)-.04*k,.05-.215*k),z=Y(.03,o(.31)-.08*k,.05-.295*k),A=[];return A[g.hips]={parent:-1,head:n,tip:r,hint:"z"},A[g.spine]={parent:g.hips,head:r,tip:h,hint:"z"},A[g.chest]={parent:g.spine,head:h,tip:l,hint:"z"},A[g.neck]={parent:g.chest,head:l,tip:u,hint:"z"},A[g.head]={parent:g.neck,head:u,tip:d,hint:"z"},A[g.clavL]={parent:g.chest,head:c,tip:m,hint:"z"},A[g.upArmL]={parent:g.clavL,head:m,tip:v,hint:"z"},A[g.loArmL]={parent:g.upArmL,head:v,tip:f,hint:"y"},A[g.handL]={parent:g.loArmL,head:f,tip:p,hint:"y"},A[g.clavR]={parent:g.chest,head:x(c),tip:x(m),hint:"z"},A[g.upArmR]={parent:g.clavR,head:x(m),tip:x(v),hint:"z"},A[g.loArmR]={parent:g.upArmR,head:x(v),tip:x(f),hint:"y"},A[g.handR]={parent:g.loArmR,head:x(f),tip:x(p),hint:"y"},A[g.thighL]={parent:g.hips,head:w,tip:y,hint:"z"},A[g.shinL]={parent:g.thighL,head:y,tip:b,hint:"z"},A[g.footL]={parent:g.shinL,head:b,tip:S,hint:"y"},A[g.thighR]={parent:g.hips,head:x(w),tip:x(y),hint:"z"},A[g.shinR]={parent:g.thighR,head:x(y),tip:x(b),hint:"z"},A[g.footR]={parent:g.shinR,head:x(b),tip:x(S),hint:"y"},A[g.scarfA]={parent:g.chest,head:_,tip:L,hint:"y"},A[g.scarfB]={parent:g.scarfA,head:L,tip:C,hint:"y"},A[g.scarfC]={parent:g.scarfB,head:C,tip:z,hint:"y"},A}const os=new he,Qe=new Ae,ns=new Ae,rs=new M,ii=new M(1,1,1);class un{bones=[];skin=new Float32Array(et*16);bindHead=[];constructor(e){const t=cn(e),s=Object.keys(g);for(let a=0;a<et;a++){const o=t[a],n=new M().subVectors(o.tip,o.head),r=n.length()||1e-4;n.multiplyScalar(1/r);const h=o.hint==="z"?new M(0,0,1):new M(0,1,0),l=new M().crossVectors(n,h);l.lengthSq()<1e-6&&l.crossVectors(n,new M(1,0,0)),l.normalize();const u=new M().crossVectors(l,n),d=new Ae().makeBasis(l,n,u).setPosition(o.head);this.bones[a]={name:s[a],parent:o.parent,len:r,bindWorld:d,invBind:d.clone().invert(),bindLocalPos:new M,bindLocalQuat:new he,anim:new he,animPos:new M,world:new Ae,worldQuat:new he},this.bindHead[a]=o.head.clone()}for(const a of this.bones)a.parent<0?Qe.copy(a.bindWorld):Qe.multiplyMatrices(this.bones[a.parent].invBind,a.bindWorld),Qe.decompose(a.bindLocalPos,a.bindLocalQuat,new M);this.update()}update(){for(let e=0;e<this.bones.length;e++)this.refresh(e)}refresh(e){const t=this.bones[e];os.copy(t.bindLocalQuat).multiply(t.anim),rs.addVectors(t.bindLocalPos,t.animPos),Qe.compose(rs,os,ii),t.parent<0?t.world.copy(Qe):t.world.multiplyMatrices(this.bones[t.parent].world,Qe),t.worldQuat.setFromRotationMatrix(t.world),ns.multiplyMatrices(t.world,t.invBind),ns.toArray(this.skin,e*16)}worldPos(e,t){const s=this.bones[e].world.elements;return t.set(s[12],s[13],s[14])}resetAnim(){for(const e of this.bones)e.anim.identity()}}class ls{constructor(e){this.skel=e}skel;pos=[];nrm=[];tint=[];bone=[];wt=[];uv=[];idx=[];m=new Ae;nm=new Ci;boneA=0;boneB=0;weightFn=null;_v=new M;_n=new M;at(e,t,s=e,a=null){return this.m.copy(this.skel.bones[e].bindWorld),t&&this.m.multiply(t),this.nm.setFromMatrix4(this.m),this.boneA=e,this.boneB=s,this.weightFn=a,this}push(e,t,s,a,o,n,r,h,l){this._v.set(e,t,s).applyMatrix4(this.m),this._n.set(a,o,n).applyMatrix3(this.nm).normalize(),this.pos.push(this._v.x,this._v.y,this._v.z),this.nrm.push(this._n.x,this._n.y,this._n.z),this.uv.push(r,h),this.tint.push(l.r,l.g,l.b),this.bone.push(this.boneA,this.boneB),this.wt.push(this.weightFn?this.weightFn(t):1)}lathe(e,t,s,a=1,o=1,n=0,r=1){const h=e.length,l=[],u=[],d=[],m=[];for(let p=0;p<h;p++){l[p]=e[p][0],u[p]=e[p][1];const w=e[Math.max(0,p-1)],y=e[Math.min(h-1,p+1)];let b=y[0]-w[0],S=y[1]-w[1];const x=Math.hypot(b,S)||1;b/=x,S/=x,d[p]=S,m[p]=-b}const c=[],v=[];for(let p=0;p<=t;p++){const w=(n+p/t*(r-n))*Math.PI*2;c[p]=Math.cos(w),v[p]=Math.sin(w)}const f=p=>p/(h-1||1);for(let p=0;p<h-1;p++)for(let w=0;w<t;w++){const y=typeof s=="function"?s((w+.5)/t,f(p)+.5/(h-1||1)):s,b=this.pos.length/3,S=(x,k)=>this.push(l[x]*c[k]*a,u[x],l[x]*v[k]*o,d[x]*c[k]/a,m[x],d[x]*v[k]/o,k/t,f(x),y);S(p,w),S(p,w+1),S(p+1,w+1),S(p+1,w),this.idx.push(b,b+3,b+1,b+3,b+2,b+1)}}box(e,t,s,a,o,n,r){const h=e*.5,l=t*.5,u=s*.5,d=[[1,0,0],[-1,0,0],[0,1,0],[0,-1,0],[0,0,1],[0,0,-1]],m=[[-1,-1],[1,-1],[1,1],[-1,1]];for(const c of d){const v=this.pos.length/3,f=new M(c[0],c[1],c[2]),p=Math.abs(f.y)>.9?new M(0,0,1):new M(0,1,0),w=new M().crossVectors(p,f).normalize(),y=new M().crossVectors(f,w),b=new M(a+f.x*h,o+f.y*l,n+f.z*u),S=Math.abs(w.x)*h+Math.abs(w.y)*l+Math.abs(w.z)*u,x=Math.abs(y.x)*h+Math.abs(y.y)*l+Math.abs(y.z)*u;for(let k=0;k<4;k++){const[_,L]=m[k];this.push(b.x+w.x*S*_+y.x*x*L,b.y+w.y*S*_+y.y*x*L,b.z+w.z*S*_+y.z*x*L,f.x,f.y,f.z,(_+1)*.5,(L+1)*.5,r)}this.idx.push(v,v+1,v+2,v,v+2,v+3)}}toGeometry(){const e=new Pe;return e.setAttribute("position",new H(new Float32Array(this.pos),3)),e.setAttribute("normal",new H(new Float32Array(this.nrm),3)),e.setAttribute("uv",new H(new Float32Array(this.uv),2)),e.setAttribute("aTint",new H(new Float32Array(this.tint),3)),e.setAttribute("aBone",new H(new Float32Array(this.bone),2)),e.setAttribute("aBoneW",new H(new Float32Array(this.wt),1)),e.setIndex(this.idx),e.boundingSphere=new Fi(new M(0,.7,-.1),1.5),e}get triCount(){return this.idx.length/3}}function re(i,e,t,s,a,o=3,n=0){const r=[];if(s>0){const h=i*s;for(let l=0;l<=o;l++){const u=l/o*(Math.PI/2);r.push([i*Math.sin(u),-h*Math.cos(u)])}}else r.push([i,0]);if(n!==0&&r.push([(i+e)*.5*(1+n),t*.5]),r.push([e,t]),a>0){const h=e*a;for(let l=o-1;l>=0;l--){const u=l/o*(Math.PI/2);r.push([e*Math.sin(u),t+h*Math.cos(u)])}}return r}function Ct(i,e,t,s,a,o,n,r=0){const h=[],l=u=>i+(e-i)*u+r*(i+e)*.5*Math.sin(u*Math.PI);if(s>0){const u=i*s;for(let d=0;d<=o;d++){const m=d/o*(Math.PI/2);h.push([i*Math.sin(m),-u*Math.cos(m)])}}else h.push([i,0]);for(const u of n){const d=l(u);h.push([d*1.07,t*(u-.055)]),h.push([d*.82,t*u]),h.push([d*1.05,t*(u+.055)])}if(h.push([e,t]),a>0){const u=e*a;for(let d=o-1;d>=0;d--){const m=d/o*(Math.PI/2);h.push([e*Math.sin(m),t+u*Math.cos(m)])}}return h}function dn(i,e,t=4){const s=[],a=e/t;s.push([i*.42,0]);for(let o=0;o<t;o++){const n=1-o*.075;s.push([i*.9*n,o*a+a*.14]),s.push([i*n,o*a+a*.5]),s.push([i*.88*n,(o+1)*a-a*.1])}return s.push([i*.4*(1-(t-1)*.075),e]),s}function nt(i,e,t=8,s=1){return Ze(i,e,0,1,t,s)}function Ze(i,e,t,s,a=6,o=1){const n=[];for(let r=0;r<=a;r++){const h=(t+r/a*(s-t))*Math.PI;n.push([i*Math.sin(h),e-i*o*Math.cos(h)])}return n}const ia=.058;function fn(){const i=T.cloudLit;return[i.clone().lerp(T.waterDeep,.5).multiplyScalar(.6),i.clone().lerp(T.waterShadow,.34).multiplyScalar(.88),i.clone(),i.clone().lerp(T.sun,.45).multiplyScalar(1.36)]}const hs=[0,.34,.5,.82];function cs(i){return{uniforms:{uBones:i},vertexHead:`
      attribute vec3 aTint;
      attribute vec2 aBone;
      attribute float aBoneW;
      uniform mat4 uBones[${et}];
      varying vec3 vTint;
    `,vertexBody:`
      {
        mat4 mA = uBones[int(aBone.x)];
        mat4 mB = uBones[int(aBone.y)];
        vec3 pA = (mA * vec4(transformed, 1.0)).xyz;
        vec3 pB = (mB * vec4(transformed, 1.0)).xyz;
        transformed = mix(pB, pA, aBoneW);
        mat3 rA = mat3(mA);
        mat3 rB = mat3(mB);
        objectNormal = normalize(mix(rB * objectNormal, rA * objectNormal, aBoneW));
        smoothNormal = normalize(mix(rB * smoothNormal, rA * smoothNormal, aBoneW));
        vTint = aTint;
      }
    `,fragmentHead:"varying vec3 vTint;",fragmentBody:"baseColor *= vTint;"}}function pn(i,e){const t=Ys[i],s=new un(e),a=e.girth,o=V,n=[T.suitMid0,T.suitMid1,T.suitMid2,T.suitMid3],r=o(t.hull),h=o(t.suit),l=o(n[i%n.length]),u=l.clone().lerp(h,.52),d=l.clone().lerp(o(T.foam),.4),m=o(T.foamShade),c=o(T.foam),v=o(T.skin),f=o(T.skinShade),p=r.clone().lerp(h,.55),w=h,y=o(T.waterDeep).lerp(o(T.waterShadow),.45),b=o(T.waterCrest),S=(P,G)=>P<0?G>.42&&G<.58:G<.08||G>.92,x=new ls(s),k=new ls(s),_=new Ae,L=new M,C=new he,z=new M(1,0,0),A=new M(0,1,0),E=new M(0,0,1),O=new he,N=(P,G,oe,ee=0,ne=0,me=0)=>(C.identity(),ee&&C.multiply(O.setFromAxisAngle(z,ee)),ne&&C.multiply(O.setFromAxisAngle(A,ne)),me&&C.multiply(O.setFromAxisAngle(E,me)),_.compose(L.set(P,G,oe),C,ii),_);x.at(g.hips),x.lathe(re(.13*a,.115*a,s.bones[g.hips].len,.9,.2,3),12,l,1.12,.9);const j=s.bones[g.spine].len+s.bones[g.chest].len;x.at(g.spine,void 0,g.chest,P=>1-Math.min(1,Math.max(0,(P/j-.15)/.7))),x.lathe([[.112*a,-.02],[.13*a,j*.2],[.144*a,j*.52],[.148*a,j*.8],[.126*a,j*1.02],[.095*a,j*1.12]],14,(P,G)=>G<.3?u:P>.62&&P<.9?m:P>.12&&P<.4?u:l,1.06,.86),x.at(g.chest),x.lathe([[.15*a,s.bones[g.chest].len*.4],[.176*a,s.bones[g.chest].len*.6],[.17*a,s.bones[g.chest].len*.86],[.12*a,s.bones[g.chest].len*1]],14,r,1.32,.8),x.at(g.spine,N(0,j*.16,0)),x.lathe([[.128*a,-.012],[.142*a,0],[.143*a,.03],[.13*a,.042]],14,P=>P>.19&&P<.31?r:w,1.08,.9),x.at(g.spine,N(0,j*.58,0,0,0,.18)),x.lathe([[.15*a,-.011],[.157*a,0],[.157*a,.022],[.148*a,.033]],14,P=>P>.6&&P<.9?d:w,1.06,.88);const ce=.2,fe=.75-ce*.5,pe=i%4+1,ve=new Set;for(let P=0;P<pe;P++)ve.add(4-(pe-1)+P*2);x.at(g.spine),x.lathe([[.14*a,j*.6],[.15*a,j*.64],[.15*a,j*.79],[.14*a,j*.83]],9,(P,G)=>G>.2&&G<.8&&ve.has(Math.floor(P*9))?w:c,1.06,.86,fe,fe+ce),x.at(g.neck),x.lathe(re(.052*a,.047*a,s.bones[g.neck].len*1.15,.2,0,2),8,f),x.at(g.neck,N(0,.008,0)),x.lathe(re(.074*a,.062*a,.052,.35,.3,2),10,w,1.06,1.06),x.at(g.head),x.lathe(nt(.088*e.headSize,.085,9,1.12),12,(P,G)=>G<.4?f:v,1,1.05);for(const P of[-1,1]){const G=P<0?g.upArmL:g.upArmR,oe=P<0?g.loArmL:g.loArmR,ee=P<0?g.handL:g.handR;x.at(G),x.lathe(nt(.059*a,.006,8,.92),10,d),x.lathe(Ct(.062*a,.05*a,s.bones[G].len,0,.4,3,[.58,.82]),10,me=>S(P,me)?r:l),x.at(oe),x.lathe(nt(.051*a,0,6,1),8,u),x.lathe(Ct(.05*a,.042*a,s.bones[oe].len,0,.3,2,[.3]),10,me=>S(P,me)?p:u),(e.bias>=0?-1:1)===P&&(x.at(G,N(0,s.bones[G].len*.34,0)),x.lathe(re(.062*a,.06*a,.026,.25,.25,2),10,r,1,1)),x.at(ee),x.lathe(re(.052*a,.049*a,.02,.4,0,2),10,c,1,1.06),x.at(ee,N(0,.019,0)),x.lathe(re(.05*a,.048*a,.014,.2,.2,2),10,w,1,1.06),x.at(ee),x.lathe([[.028*a,.03],[.04*a,.04],[.046*a,.06],[.039*a,.076]],10,me=>me>.55&&me<.95?w:r,1.32,.74);const ne=.108*a;x.at(ee,N(-P*ne*.5,ia,.008*a,0,0,-P*Math.PI*.5)),x.lathe(dn(.04*a,ne),8,me=>me>.55&&me<.95?p:r,1,1.14),x.at(ee,N(P*.012*a,ia-.02,-.016*a,0,-.55,-P*Math.PI*.5)),x.lathe(re(.023*a,.018*a,.058*a,.9,.9,2),8,r,1,1.1)}for(const P of[-1,1]){const G=P<0?g.thighL:g.thighR,oe=P<0?g.shinL:g.shinR,ee=P<0?g.footL:g.footR;x.at(G),x.lathe(Ct(.082*a,.062*a,s.bones[G].len,.3,.2,3,[.42,.72],.04),10,ne=>S(P,ne)?r:l),x.at(oe),x.lathe(nt(.062*a,0,7,.9),10,u),x.lathe(Ct(.056*a,.044*a,s.bones[oe].len,0,.2,2,[.34]),10,ne=>S(P,ne)?p:l),k.at(ee),k.lathe(re(.056*a,.04*a,s.bones[ee].len*1.5,.9,.7,3),10,ne=>ne>.6&&ne<.9?m:w,1,.95),k.at(ee),k.lathe(re(.066*a,.058*a,.045,.3,.2,2),10,w,1,1),k.at(ee,N(0,s.bones[ee].len*.62,0)),k.lathe(re(.05*a,.047*a,.024,.2,.2,2),10,r,1,.96)}const D=.118*e.headSize,ue=.088;k.at(g.head),k.lathe(nt(D,ue,11,1.05),14,(P,G)=>G<.2?p:r,1,1.13),k.lathe(Ze(D*1.03,ue,.36,.63,3,1.05),12,y,1,1.13,.02,.48),k.lathe(Ze(D*1.05,ue,.535,.6,1,1.05),12,b,1,1.13,.06,.245),k.lathe(Ze(D*1.06,ue,.63,.71,2,1.05),12,r,1,1.13,.01,.49),k.lathe(Ze(D*1.04,ue,.26,.36,2,1.05),12,p,1,1.13,.05,.45),k.at(g.head,N(0,ue-D*.52,D*.74,-.35)),k.lathe(re(D*.46,D*.3,D*.34,.7,.6,2),10,p,1.5,.72);for(const P of[-1,1])k.at(g.head,N(P*D*.88,ue-D*.1,D*.02,0,0,P*Math.PI*.5)),k.lathe(re(D*.34,D*.26,D*.3,.5,.55,2),8,w,1,1.25);k.at(g.head),k.lathe(Ze(D*1.04,ue-D*.16,.2,.46,3,1.14),12,p,1,1.13,.56,.94);const we=ue+D*1.05,de=(P,G)=>G>.7?r:w;if(e.crest==="fin")k.at(g.head,N(0,we-D*.34,-D*.1)),k.lathe([[0,-D*.44],[D*.66,-D*.16],[D*.8,D*.24],[D*.46,D*.54],[0,D*.66]],7,de,.26,1);else if(e.crest==="mohawk")for(let P=0;P<3;P++)k.at(g.head,N(0,we-D*.3-P*D*.14,D*(.3-P*.34))),k.lathe([[0,-D*.4],[D*.24,-D*.14],[D*.3,D*(.3-P*.05)],[0,D*(.5-P*.08)]],6,de,.24,1);else k.at(g.head,N(0,we-D*.34,-D*.36)),k.lathe([[0,-D*.36],[D*.44,-D*.1],[D*.5,D*.2],[0,D*.36]],6,de,.3,1);const Ue=e.shoulderPad==="both"?[-1,1]:e.shoulderPad==="left"?[-1]:[];for(const P of Ue){const G=P<0?g.upArmL:g.upArmR;k.at(G,N(0,.01,0)),k.lathe([[.028*a,-.076],[.078*a,-.064],[.097*a,-.026],[.088*a,.018],[.042*a,.05]],10,(oe,ee)=>ee<.34?p:r,1.12,.95),k.at(G,N(0,.028,0)),k.lathe(re(.09*a,.062*a,.016,0,0,2),10,w,1.12,.95)}if(e.scarf>0){x.at(g.neck,N(0,.02,0)),x.lathe(re(.082*a,.075*a,.045,.5,.4,2),10,r,1.05,1.1);const P=[g.scarfA,g.scarfB,g.scarfC];for(let G=0;G<P.length;G++){const oe=P[G],ee=(.112-G*.026)*a;x.at(oe),x.lathe(re(ee,ee*.7,s.bones[oe].len*1.06,0,G===2?.9:0,2),8,ne=>ne>.02&&ne<.5?r:p,1,.42)}}const Ce={value:s.skin},wt=fn(),at=Se({color:T.tintBase,rampColors:wt,rampStops:hs,rimColor:T.rimLight,rimPower:2.6,rimStrength:.55,specColor:T.foam,specSize:.978,specSize2:.995,specStrength:.13,matcap:null,outlineWidthPx:2,edgeBias:1.5,name:`riderSoft${i}`,chunks:cs(Ce)}),yt=Se({color:T.tintBase,rampColors:wt,rampStops:hs,rimColor:T.rimLight,rimPower:3.6,rimStrength:.42,specColor:T.foam,specSize:.966,specSize2:.991,specStrength:.5,matcapStrength:.16,outlineWidthPx:2.2,edgeBias:1.5,name:`riderHard${i}`,chunks:cs(Ce)}),Ve=new pt;Ve.name=`rider${i}`;const je=new le(x.toGeometry());je.name=`rider${i}:soft`,Oe(je,at),Ve.add(je);const _e=new le(k.toGeometry());_e.name=`rider${i}:hard`,Oe(_e,yt),Ve.add(_e);const qt=new M(-ts,0,0).add(ba).sub(Wt),Ht=new M(ts,0,0).add(ba).sub(Wt),U=s.bones[g.handL].bindWorld.elements,K=new M(U[4],U[5],U[6]).normalize().multiplyScalar(-ia);return{root:Ve,skel:s,soft:je,hard:_e,gripL:qt,gripR:Ht,palmOffset:K,triangles:x.triCount+k.triCount,sets:[at,yt]}}const oi=et*3+3,ie=et*3,tt=()=>new Float32Array(oi);function F(i,e,t,s,a){const o=e*3;i[o]=t,i[o+1]=s,i[o+2]=a}function vt(i,e){const t=e.speedFrac,s=e.build;i.fill(0),F(i,g.hips,-.02+t*.1,0,0),F(i,g.spine,.16+s.hunch+t*.3,0,0),F(i,g.chest,.1+s.hunch*.5+t*.16,0,0),F(i,g.neck,-.14-t*.16,0,0),F(i,g.head,-.16-t*.24,0,0),F(i,g.clavL,0,0,-s.shrug-t*.06),F(i,g.clavR,0,0,s.shrug+t*.06);const a=t*.08;F(i,g.thighL,-a,0,0),F(i,g.thighR,-a,0,0),F(i,g.shinL,a*1.4,0,0),F(i,g.shinR,a*1.4,0,0),F(i,g.scarfA,.04+t*.14,0,0),F(i,g.scarfB,.03+t*.1,0,0),F(i,g.scarfC,.02+t*.08,0,0),i[ie+1]=-t*.02}function mn(i,e){vt(i,e),F(i,g.hips,-.24,0,0),F(i,g.spine,-.12+e.build.hunch*.4,0,0),F(i,g.chest,-.08,0,0),F(i,g.neck,.02,0,0),F(i,g.head,-.02,0,0),F(i,g.thighL,.16,0,0),F(i,g.thighR,.16,0,0),F(i,g.shinL,-.1,0,0),F(i,g.shinR,-.1,0,0),i[ie+1]=.015,i[ie+2]=-.05}function gn(i,e){vt(i,e),F(i,g.hips,.26,0,0),F(i,g.spine,.48+e.build.hunch,0,0),F(i,g.chest,.28,0,0),F(i,g.neck,-.36,0,0),F(i,g.head,-.46,0,0),F(i,g.clavL,0,0,-.28),F(i,g.clavR,0,0,.28),F(i,g.thighL,-.58,.06,0),F(i,g.thighR,-.58,-.06,0),F(i,g.shinL,.7,0,0),F(i,g.shinR,.7,0,0),F(i,g.scarfA,.34,0,0),F(i,g.scarfB,.26,0,0),F(i,g.scarfC,.2,0,0),i[ie+1]=-.018,i[ie+2]=.035}function vn(i,e){vt(i,e),F(i,g.hips,.16,0,0),F(i,g.spine,.46+e.build.hunch,0,0),F(i,g.chest,.06,0,0),F(i,g.neck,-.34,0,0),F(i,g.head,-.46,0,0),F(i,g.clavL,0,0,-.4),F(i,g.clavR,0,0,.4),F(i,g.thighL,-.46,0,0),F(i,g.thighR,-.46,0,0),F(i,g.shinL,1,0,0),F(i,g.shinR,1,0,0),i[ie+1]=-.115,i[ie+2]=.012}function wn(i,e){vt(i,e);const t=e.celebT*e.build.tempo,s=Math.sin(t*3.1)*.5+.5,a=Math.sin(t*1.5);F(i,g.hips,-.12,.14*a,.07*a),F(i,g.spine,-.2-s*.08,.34,-.1*a),F(i,g.chest,-.14,.3,-.06*a),F(i,g.neck,.06,.34,.05),F(i,g.head,.1-s*.12,.42,.08*a),F(i,g.clavR,0,0,.3+s*.25),F(i,g.clavL,0,0,-.1),F(i,g.thighL,.1,0,0),F(i,g.thighR,.12,0,0),F(i,g.shinL,-.16,0,0),F(i,g.shinR,-.2,0,0),F(i,g.scarfA,.06+s*.12,0,-.2*a),F(i,g.scarfB,.05+s*.14,0,-.3*a),F(i,g.scarfC,.04+s*.16,0,-.4*a),i[ie+1]=.03+s*.03}const oa=new M,na=new M,rt=new M,Ft=new M,lt=new M,us=new M,zt=new M,ds=new M,ht=new M,Re=new M,fs=new M,Rt=new M,yn=new he,Lt=new he,_t=new he,ps=new Ae;function ms(i,e,t){return Re.copy(e).addScaledVector(i,-e.dot(i)),Re.lengthSq()<1e-8&&(Re.set(1,0,0).addScaledVector(i,-i.x),Re.lengthSq()<1e-8&&Re.set(0,0,1).addScaledVector(i,-i.z)),Re.normalize(),fs.crossVectors(Re,i),ps.makeBasis(Re,i,fs),t.setFromRotationMatrix(ps)}function gs(i,e,t){const s=i.bones[e].bindWorld.elements;return t.set(s[0],s[1],s[2])}function vs(i,e,t,s,a,o,n,r,h){if(h<=.001)return;const l=i.bones[e],u=i.bones[t],d=l.len,m=u.len;i.worldPos(e,oa),na.copy(a),rt.subVectors(na,oa);let c=rt.length();const v=Math.abs(d-m)*1.02+1e-4,f=(d+m)*.995;c=$(c,v,f),rt.lengthSq()<1e-8&&rt.set(0,-1,0),Ft.copy(rt).normalize();const p=$((d*d+c*c-m*m)/(2*d*c),-1,1),w=Math.acos(p);us.set(o,n,r).normalize(),lt.crossVectors(Ft,us),lt.lengthSq()<1e-8&&lt.set(0,1,0).cross(Ft),lt.normalize(),zt.copy(Ft).applyQuaternion(yn.setFromAxisAngle(lt,w)),ds.copy(oa).addScaledVector(zt,d),ht.subVectors(na,ds),ht.lengthSq()<1e-8&&ht.copy(zt),ht.normalize(),gs(i,e,Rt),ms(zt,Rt,Lt),_t.copy(i.bones[l.parent].worldQuat).multiply(l.bindLocalQuat).invert().multiply(Lt),l.anim.slerp(_t,h),i.refresh(e),gs(i,t,Rt),ms(ht,Rt,Lt),_t.copy(i.bones[u.parent].worldQuat).multiply(u.bindLocalQuat).invert().multiply(Lt),u.anim.slerp(_t,h),i.refresh(t),i.refresh(s)}const bn=new he,ws=new he,xn=new M(1,0,0),Sn=new M(0,1,0),kn=new M(0,0,1),ys=new M,bs=new M,xs=new M,Mn=[.55,.28,.17],Tn=[0,-.2,-.3],Ss=tt(),ks=tt(),Ms=tt(),Ts=tt(),As=tt(),R=tt();class An{constructor(e,t){this.mesh=e,this.build=t,this.sig={t:0,turn:0,lonG:0,heaveA:0,heave:0,speedFrac:0,throttle:0,brake:0,slip:0,roll:0,pitch:0,wAir:0,wLand:0,wCeleb:0,wBrace:0,wDrift:0,celebT:0,rev:0,build:t}}mesh;build;sig;prevHeading=0;prevVy=0;prevFwd=0;started=!1;readSignals(e,t){const s=this.sig,a=e.state,o=Math.max(t.dt,1e-4),n=this.build;s.t=t.time*n.tempo+n.phase,this.started||(this.prevHeading=a.heading,this.prevVy=a.velocity.y,this.prevFwd=a.forwardSpeed,this.started=!0);const r=Us(this.prevHeading,a.heading)/o;this.prevHeading=a.heading,s.turn=q(s.turn,$(r/1.5,-1,1),9,t.dt);const h=(a.forwardSpeed-this.prevFwd)/o;this.prevFwd=a.forwardSpeed,s.lonG=q(s.lonG,$(h/14,-1.4,1.4),7,t.dt);const l=a.velocity.y,u=(l-this.prevVy)/o;this.prevVy=l,s.heaveA=q(s.heaveA,$(u,-60,60),16,t.dt),s.heave=q(s.heave,$(-s.heaveA*.0042,-.05,.038),11,t.dt),s.speedFrac=a.speedFrac,s.throttle=q(s.throttle,e.controls.throttle,12,t.dt),s.brake=q(s.brake,e.controls.brake,12,t.dt),s.slip=q(s.slip,$(a.lateralSpeed/9,-1.4,1.4),6,t.dt),s.roll=a.roll,s.pitch=a.pitch,s.wAir=q(s.wAir,a.airborne?1:0,a.airborne?13:9,t.dt),a.landingImpact>.8&&(s.wLand=Math.max(s.wLand,.55+I(a.landingImpact/6)*.45)),s.wLand=q(s.wLand,0,2.4,t.dt),s.wBrace=q(s.wBrace,I(e.controls.brake*.8+I(-s.lonG)*.7),6,t.dt),s.wDrift=q(s.wDrift,a.drifting?1:0,6,t.dt);const d=e.finished||t.race.phase==="results";s.wCeleb=q(s.wCeleb,d?1:0,2.6,t.dt),s.celebT=d?s.celebT+t.dt:0,s.rev=q(s.rev,t.race.phase==="countdown"?1:0,5,t.dt)}blendPose(){const e=this.sig;vt(Ss,e);const t=e.wAir,s=e.wLand,a=e.wCeleb,o=e.wBrace*(1-t)*(1-a),n=Math.max(0,1-(t+s*.9+a+o*.7));let r=n+t+s+a+o;r<1e-4&&(r=1);const h=1/r;R.fill(0);const l=(u,d)=>{if(d<=1e-4)return;const m=d*h;for(let c=0;c<oi;c++)R[c]+=u[c]*m};l(Ss,n),o>1e-4&&(mn(ks,e),l(ks,o)),t>1e-4&&(gn(Ms,e),l(Ms,t)),s>1e-4&&(vn(Ts,e),l(Ts,s)),a>1e-4&&(wn(As,e),l(As,a))}modifiers(){const e=this.sig,t=this.build,s=1-e.wAir,a=1-e.wCeleb,o=-e.roll*.5*a;R[g.hips*3+2]+=o*.55,R[g.spine*3+2]+=o*.3,R[g.chest*3+2]+=o*.2,R[g.head*3+2]+=-e.roll*.55*a,R[g.spine*3]+=-e.pitch*.34*a,R[g.head*3]+=-e.pitch*.3*a;const n=(e.turn*.9+e.slip*.22)*s*a;R[g.hips*3+2]+=-n*.16,R[g.spine*3+2]+=-n*.2,R[g.chest*3+2]+=-n*.16,R[g.spine*3+1]+=e.turn*.1*s*a,R[g.chest*3+1]+=e.turn*.16*e.wDrift*a,R[g.head*3+1]+=(e.turn*.5+e.slip*.1)*a,R[g.neck*3+1]+=e.turn*.2*a,R[g.spine*3]+=-e.lonG*.14*a,R[g.chest*3]+=-e.lonG*.08*a,R[g.head*3]+=e.lonG*.06*a,R[ie+2]+=-e.lonG*.018*a,R[ie+1]+=e.heave;const r=$(-e.heave*6,-.3,.3);R[g.thighL*3]+=-r*.5,R[g.thighR*3]+=-r*.5,R[g.shinL*3]+=r,R[g.shinR*3]+=r,R[g.spine*3]+=r*.25;const h=t.bias*a;R[g.chest*3+2]+=h*.055,R[g.spine*3+1]+=h*.05,R[g.clavL*3+2]+=-h*.09,R[g.clavR*3+2]+=-h*.05,R[g.head*3+1]+=h*.13,R[g.head*3+2]+=-h*.07;const l=a*(1-e.wLand*.6),u=Math.sin(e.t*.83),d=Math.sin(e.t*1.27+1.1),m=Math.sin(e.t*.61+2.3);R[g.spine*3]+=u*.05*l,R[g.chest*3+1]+=d*.07*l,R[g.chest*3+2]+=m*.055*l,R[g.neck*3+1]+=d*.06*l,R[g.head*3+1]+=(d*.15+m*.1)*l,R[g.head*3]+=u*.08*l,R[g.clavL*3+2]+=-m*.06*l,R[g.clavR*3+2]+=u*.06*l,R[ie]+=m*.013*l,R[ie+1]+=u*.011*l;const c=Math.sin(e.t*41)*.0022*e.speedFrac*s;if(R[ie+1]+=c,R[g.chest*3+2]+=c*1.5,e.rev>.01){const w=Math.max(0,Math.sin(e.t*7.5))*e.rev;R[g.spine*3]+=w*.06,R[g.clavR*3+2]+=-w*.08}const v=.3+e.speedFrac*.9,f=R[g.hips*3]+R[g.spine*3]+R[g.chest*3],p=(-.3+1.4*e.speedFrac-f)*(1-e.wCeleb*.5);for(let w=0;w<3;w++){const y=g.scarfA+w,b=1+w*.7,S=e.t*(3.1+w*.7)-w*.9;R[y*3]+=p*Mn[w]+Tn[w],R[y*3]+=Math.sin(S)*.06*v*b,R[y*3+1]+=Math.sin(S*.77+.6)*.14*v*b,R[y*3+2]+=-.045*b+Math.cos(S*.9)*.05*v*b-e.slip*.08*b,R[y*3]+=$(-e.heaveA*.0022,-.2,.3)*b*.4}}gripTarget(e,t){const s=this.sig,a=this.mesh;t.copy(e<0?a.gripL:a.gripR);const o=s.turn*.3*(1-s.wCeleb),n=t.z-.08,r=t.x,h=t.z-n;if(t.x=r*Math.cos(o)+h*Math.sin(o),t.z=n-r*Math.sin(o)+h*Math.cos(o),t.y+=-Math.abs(o)*.02+o*e*.03,t.z+=s.throttle*.022-s.brake*.05,t.y+=-s.throttle*.012+s.brake*.022,s.rev>.01&&e>0){const l=Math.max(0,Math.sin(s.t*7.5))*s.rev;t.z+=l*.02,t.y-=l*.012}if(t.z-=s.wAir*.05,t.y-=s.wAir*.02,t.z-=s.wLand*.02,t.add(a.palmOffset),s.wCeleb>.001&&e>0){const l=s.celebT*this.build.tempo,u=Math.sin(l*3.1)*.5+.5;ys.set(.3*this.build.girth,(.82+u*.1)*this.build.height,-.04-u*.05),t.lerp(ys,Hs(0,1,s.wCeleb))}return t}update(e,t){this.readSignals(e,t),this.blendPose(),this.modifiers();const s=this.mesh.skel;for(let n=0;n<et;n++){const r=R[n*3],h=R[n*3+1],l=R[n*3+2],u=s.bones[n].anim;u.identity(),r&&u.multiply(bn.setFromAxisAngle(xn,r)),h&&u.multiply(ws.setFromAxisAngle(Sn,h)),l&&u.multiply(ws.setFromAxisAngle(kn,l))}bs.set(R[ie],R[ie+1],R[ie+2]),s.bones[g.hips].animPos.copy(bs),s.update();const o=1-this.sig.wAir*.15;vs(s,g.upArmL,g.loArmL,g.handL,this.gripTarget(-1,xs),-.5,-.55,-.68,o),vs(s,g.upArmR,g.loArmR,g.handR,this.gripTarget(1,xs),.5,-.55,-.68,o)}}const Pn=Wt.clone();class Cn{name="riders";order=60;riders=new Map;triangles;constructor(e){let t=0;for(const s of e){const a=is[s.id%is.length],o=pn(s.id,a),n=hn(s);n?n.add(o.root):(o.root.position.copy(Pn),s.root.add(o.root)),po(o.root,s.isPlayer?2.8:2.3),this.riders.set(s.id,{mesh:o,anim:new An(o,a),build:a,seated:!!n}),t+=o.triangles}this.triangles=t}update(e){for(const t of e.racers){const s=this.riders.get(t.id);s&&s.anim.update(t,e)}}dispose(){for(const e of this.riders.values()){e.mesh.soft.geometry.dispose(),e.mesh.hard.geometry.dispose();for(const t of e.mesh.sets)t.main.dispose(),t.prepass.dispose(),t.outline?.dispose();e.mesh.root.removeFromParent()}this.riders.clear()}}const Fn=.58,zn=.44,Rn=4.2,Ln=1,Dt=new M,ra=new M,la=new M,Ps=new M,Cs=new M,Fs=new M;class _n{camera;mode="chase";preset=null;pos=new M(0,6,-14);vel=new M;lookAt=new M;yaw=0;shake=0;shakeSeed=37.13;orbitAngle=0;baseFov=B.render.fov;roll=0;railOffset=0;fovPunch=0;lastBoostTime=0;followY=0;airLift=0;landKick=0;cinematicFrame=-1;snapNext=!0;constructor(e){this.camera=new zi(B.render.fov,e,B.render.near,B.render.far),this.camera.position.copy(this.pos)}setMode(e){this.mode=e,this.preset=null}setPreset(e){this.preset=e==="auto"?null:e,e==="auto"&&(this.mode="chase")}addShake(e){this.shake=I(this.shake+e)}snapToTarget(){this.vel.set(0,0,0),this.snapNext=!0,this.roll=0,this.railOffset=0,this.fovPunch=0,this.shake=0,this.landKick=0}update(e){const{dt:t}=e,s=e.player,a=s.state;if(Dt.copy(s.root.position),Dt.y+=.9,a.landingImpact>.4){const l=I(a.landingImpact/2);l>this.landKick&&this.addShake(l*.55),this.landKick=Math.max(this.landKick,l)}this.landKick=q(this.landKick,0,3.6,t),this.airLift=q(this.airLift,a.airborne?1:0,a.airborne?6.5:3.4,t),this.orbitAngle+=t*.32,this.preset?this.applyPreset(e,Dt):this.cinematicFrame===e.frame?(this.camera.position.copy(Cs),this.lookAt.copy(Fs),this.roll=q(this.roll,0,4,t)):this.applyChase(e,Dt),a.boostTime>this.lastBoostTime+.01&&(this.fovPunch=5.5),this.lastBoostTime=a.boostTime,this.fovPunch=q(this.fovPunch,0,6.5,t);const o=a.boostTime>0?1:0,n=this.baseFov+B.render.fovSpeedKick*a.speedFrac+o*6.5+this.fovPunch+this.landKick*9;if(this.camera.fov=q(this.camera.fov,n,5.5,t),this.camera.updateProjectionMatrix(),this.shake>5e-4){const l=e.time*34+this.shakeSeed,u=this.shake*this.shake*.42;this.camera.position.x+=Math.sin(l*1.7)*u,this.camera.position.y+=Math.sin(l*2.3+1.1)*u,this.camera.position.z+=Math.sin(l*1.9+2.7)*u,this.shake=q(this.shake,0,B.camera.shakeDecay,t)}const h=e.ocean.height(this.camera.position.x,this.camera.position.z,e.time)+.85;this.camera.position.y<h&&(this.camera.position.y=h),this.camera.lookAt(this.lookAt),Math.abs(this.roll)>1e-4&&this.camera.rotateZ(this.roll),this.snapNext=!1}applyChase(e,t){const{dt:s}=e,a=e.player.state,o=B.camera,n=a.velocity,r=Math.hypot(n.x,n.z),h=Math.atan2(n.x,n.z),l=a.drifting?I(Math.abs(a.lateralSpeed)/5):0,u=r>3?a.drifting?.55+l*.42:.24:0;let d=a.heading;if(u>0){const _=Math.atan2(Math.sin(h-d),Math.cos(h-d));d+=_*u}const m=o.rotStiffness*(a.drifting?.62:1)*(a.airborne?.7:1);this.yaw=this.snapNext?d:_i(this.yaw,d,m,s);const c=o.distance*Fn*(1+a.speedFrac*.22)+this.airLift*1.5,v=o.height*zn*(1+a.speedFrac*.1)-this.airLift*1.5,f=a.airborne?Ln:Rn;this.followY=this.snapNext?t.y:q(this.followY,t.y,f,s);const p=this.followY-this.landKick*1.7,w=$(-a.lateralSpeed*.42,-3.4,3.4)*(a.drifting?1:.3);this.railOffset=q(this.railOffset,w,3.2,s);const y=Math.cos(this.yaw),b=-Math.sin(this.yaw);ra.set(t.x-Math.sin(this.yaw)*c+y*this.railOffset,p+v,t.z-Math.cos(this.yaw)*c+b*this.railOffset),this.snapNext?this.camera.position.copy(ra):this.smoothFollow(ra,o.posStiffness,s),la.set(t.x+Math.sin(this.yaw)*o.lookAhead*(.5+a.speedFrac),p+.4-a.speedFrac*.5-this.airLift*.8,t.z+Math.cos(this.yaw)*o.lookAhead*(.5+a.speedFrac)),this.snapNext?this.lookAt.copy(la):this.lookAt.lerp(la,1-Math.exp(-8*s));const S=Math.atan2(Math.sin(d-this.yaw),Math.cos(d-this.yaw));let x=$(a.lateralSpeed*.014+S*.6,-.075,.075)*(.35+a.speedFrac*.65);x+=this.landKick*.075*(a.roll>=0?1:-1);const k=.075+this.landKick*.065;this.roll=q(this.roll,$(x,-k,k),4.6,s)}smoothFollow(e,t,s){const a=1-Math.exp(-t*s);Ps.copy(e).sub(this.camera.position).multiplyScalar(a),this.camera.position.add(Ps)}applyPreset(e,t){const a=e.player.state.heading,o=Math.sin(a),n=Math.cos(a),r=this.camera;switch(this.roll=q(this.roll,0,6,e.dt),this.preset){case"chase":this.applyChase(e,t);return;case"far":r.position.set(t.x-o*46,t.y+24,t.z-n*46),this.lookAt.set(t.x+o*40,t.y-2,t.z+n*40);return;case"bow":r.position.set(t.x+o*5.4+n*2.2,t.y+.55,t.z+n*5.4-o*2.2),this.lookAt.copy(t).setY(t.y+.2);return;case"wake":r.position.set(t.x-o*13,t.y+2.4,t.z-n*13),this.lookAt.copy(t).setY(t.y-.35);return;case"rider":r.position.set(t.x-o*3.6-n*3.1,t.y+1.75,t.z-n*3.6+o*3.1),this.lookAt.set(t.x,t.y+1.05,t.z);return;case"orbit_near":{const h=this.orbitAngle;r.position.set(t.x+Math.sin(h)*7.5,t.y+2.6,t.z+Math.cos(h)*7.5),this.lookAt.copy(t).setY(t.y+.7);return}case"far_boat":r.position.set(t.x+74,t.y+17,t.z+74),this.lookAt.copy(t);return;case"broadcast":r.position.set(t.x-o*30+n*20,t.y+13,t.z-n*30-o*20),this.lookAt.copy(t);return;case"aerial":r.position.set(t.x,t.y+210,t.z-40),this.lookAt.copy(t);return;case"sky":r.position.set(t.x-o*12,t.y+3.5,t.z-n*12),this.lookAt.set(t.x-o*60,t.y+42,t.z-n*60);return;default:this.applyChase(e,t)}}applyCinematicOrbit(e,t=13,s=4.2,a=.28){const o=e.player.root.position,n=e.race.phase;let r=t,h=s,l=a,u=.95,d=0,m=1.2;if(n==="countdown"){const v=I(1+e.race.raceTime/B.race.countdownSeconds);r=t*(1.55-.62*v),h=s*(1.28-.62*v),l=a*(1.5-.7*v)}else(n==="results"||n==="finished")&&(r=t*.78,h=s*.36,l=a*.6,u=.8,d=6.2,m=.75);this.orbitAngle+=e.dt*l;const c=this.orbitAngle;Cs.set(o.x+Math.sin(c)*r,o.y+h+Math.sin(c*.7)*m,o.z+Math.cos(c)*r),Fs.set(o.x-Math.sin(c)*1.1+Math.cos(c)*d,o.y+u,o.z-Math.cos(c)*1.1-Math.sin(c)*d),this.cinematicFrame=e.frame}resize(e){this.camera.aspect=e,this.camera.updateProjectionMatrix()}}const Bt='ui-sans-serif, system-ui, -apple-system, "Helvetica Neue", Arial, sans-serif';function Z(i,e){return`rgba(${i>>16&255},${i>>8&255},${i&255},${e})`}function ha(i,e,t,s,a){const o=new Path2D;return o.moveTo(i+a,e),o.lineTo(i+a+t,e),o.lineTo(i+t,e+s),o.lineTo(i,e+s),o.closePath(),o}function Dn(i,e,t,s){const a=new Path2D;return a.moveTo(i,e-s),a.lineTo(i+t,e),a.lineTo(i,e+s),a.lineTo(i-t,e),a.closePath(),a}function Bn(i,e,t,s){i.save(),i.strokeStyle=t,i.lineWidth=s,i.lineJoin="round",i.stroke(e),i.restore()}function ni(i,e,t,s,a=3){t&&(i.fillStyle=t,i.fill(e)),s&&a>0&&(i.strokeStyle=s,i.lineWidth=a,i.lineJoin="miter",i.stroke(e))}function En(i,e,t,s,a,o,n,r=7,h=1.6){i.save(),i.clip(e),i.strokeStyle=n,i.lineWidth=h,i.beginPath();for(let l=-o;l<a+o;l+=r)i.moveTo(t+l,s+o),i.lineTo(t+l+o,s);i.stroke(),i.restore()}const Nn=2.6,Gn=.24;function ca(i,e,t,s={}){const a=Nn*t;if(Bn(i,e,Z(Q.ink,1),a+3.6*t),ni(i,e,s.fill??Z(Q.hudInk,1),s.edge??Z(Q.hudPaper,.92),a),s.hatchRect){const[o,n,r,h]=s.hatchRect;En(i,e,o,n,r,h,Z(Q.inkSoft,.85),10*t,1.3*t)}}function ua(i,e,t,s){let a=0;for(const o of e)t==="fill"?i.fillText(o,a,0):i.strokeText(o,a,0),a+=i.measureText(o).width+s}function On(i,e,t){let s=0;for(const a of e)s+=i.measureText(a).width+t;return s-t}function da(i,e,t,s,a){const o=a.tracking??0;i.save(),i.font=a.font,i.textBaseline=a.baseline??"alphabetic";let n=0;if(o!==0){const r=On(i,e,o);(a.align??"left")==="center"?n=-r/2:a.align==="right"&&(n=-r),i.textAlign="left"}else i.textAlign=a.align??"left";i.translate(t+n,s),a.skew&&i.transform(1,0,-a.skew,1,0,0),i.lineJoin="round",i.miterLimit=2,a.ghost&&(i.save(),i.translate(a.ghostDx??3,a.ghostDy??3),i.fillStyle=a.ghost,o!==0?ua(i,e,"fill",o):i.fillText(e,0,0),i.restore()),a.ink&&(a.inkWidth??0)>0&&(i.strokeStyle=a.ink,i.lineWidth=a.inkWidth,o!==0?ua(i,e,"stroke",o):i.strokeText(e,0,0)),i.fillStyle=a.fill,o!==0?ua(i,e,"fill",o):i.fillText(e,0,0),i.restore()}const Wn=[126,48,109,121,51,91,95,112,127,123],De={A:64,B:32,C:16,D:8,E:4,F:2,G:1},In=.6,qn=.15,Hn=.015,Be=i=>{const e=new Path2D;for(let t=0;t<i.length;t++)t===0?e.moveTo(i[t][0],i[t][1]):e.lineTo(i[t][0],i[t][1]);return e.closePath(),e};let Et=null;function Un(){if(Et)return Et;const i=In,e=1,t=qn,s=Hn,a=e*.5,o=t*.5;return Et=[{bit:De.A,path:Be([[s,0],[i-s,0],[i-t-s,t],[t+s,t]])},{bit:De.D,path:Be([[s,e],[i-s,e],[i-t-s,e-t],[t+s,e-t]])},{bit:De.G,path:Be([[s,a],[t+s,a-o],[i-t-s,a-o],[i-s,a],[i-t-s,a+o],[t+s,a+o]])},{bit:De.F,path:Be([[0,s],[t,t+s],[t,a-o-s],[0,a-s]])},{bit:De.B,path:Be([[i,s],[i,a-s],[i-t,a-o-s],[i-t,t+s]])},{bit:De.E,path:Be([[0,a+s],[t,a+o+s],[t,e-t-s],[0,e-s]])},{bit:De.C,path:Be([[i,a+s],[i,e-s],[i-t,e-t-s],[i-t,a+o+s]])}],Et}const zs=[];function Rs(i){let e=zs[i];if(e)return e;e=new Path2D;for(const t of Un())i&t.bit&&e.addPath(t.path);return zs[i]=e,e}const dt=.74;function ri(i,e){let t=0;for(const s of i)t+=(s===":"||s==="."?.3:dt)*e;return t-.14*e}function Vn(i,e,t,s,a,o){const n=ri(e,a);let r=0;o.align==="right"?r=-n:o.align==="center"&&(r=-n/2),i.save(),i.translate(t+r,s),o.skew&&i.transform(1,0,o.skew,1,0,0),i.lineJoin="miter";let h=0;for(const l of e){if(l===" "){h+=dt*a;continue}if(l===":"||l==="."){const c=h+.09*a,v=.055*a;i.save(),i.translate(c,0);const f=l===":"?[.34,.7]:[.9];for(const p of f){const w=Dn(0,p*a,v,v*1.35);ni(i,w,o.lit,o.ink??null,(o.inkWidth??0)*.6)}i.restore(),h+=.3*a;continue}if(l==="/"){i.save(),i.strokeStyle=o.lit,i.lineWidth=.13*a,i.beginPath(),i.moveTo(h+.46*a,.06*a),i.lineTo(h+.1*a,.94*a),i.stroke(),i.restore(),h+=dt*.86*a;continue}const u=l.charCodeAt(0)-48;if(u<0||u>9){h+=dt*a;continue}const d=Wn[u];i.save(),i.translate(h+(u===1?-.44999999999999996*.5*a:0),0),i.scale(a,a);const m=Rs(d);o.dim&&(i.fillStyle=o.dim,i.fill(Rs(127&~d))),o.ink&&(o.inkWidth??0)>0&&(i.strokeStyle=o.ink,i.lineWidth=(o.inkWidth??2)*2/a,i.lineJoin="round",i.stroke(m)),i.fillStyle=o.lit,i.fill(m),i.restore(),h+=dt*a}i.restore()}class jn{constructor(e){this.canvas=e;const t=e.getContext("2d");if(!t)throw new Error("no 2d context");this.ctx2d=t}canvas;ctx2d;w=0;h=0;dpr=1;shownSpeed=0;lastPhase="none";goTimer=-1;lastCountNumber=99;resize(e,t,s){this.w=e,this.h=t,this.dpr=s,this.canvas.width=Math.floor(e*s),this.canvas.height=Math.floor(t*s),this.canvas.style.width=`${e}px`,this.canvas.style.height=`${t}px`}render(e){const t=this.ctx2d;t.setTransform(this.dpr,0,0,this.dpr,0,0),t.clearRect(0,0,this.w,this.h);const o=e.player.state.velocity.length()*3.6;this.shownSpeed+=(o-this.shownSpeed)*Math.min(1,e.rawDt*9);const n=Math.min(this.w,this.h)/900;e.race.phase!==this.lastPhase&&(e.race.phase==="racing"&&this.lastPhase==="countdown"&&(this.goTimer=1.15),this.lastPhase=e.race.phase),this.goTimer>=0&&(this.goTimer-=e.rawDt),e.race.phase==="countdown"?this.drawCountdown(t,n,e):this.drawSpeed(t,n),this.goTimer>=0&&this.drawGo(t,n)}drawCountdown(e,t,s){const a=-s.race.raceTime;if(a<=0)return;const o=Math.ceil(a);o!==this.lastCountNumber&&(this.lastCountNumber=o);const n=this.w*.5,r=this.h*.24,h=Math.min(this.w*.34,300*t),l=o>3?52*t:156*t,u=ha(n-h*.5,r-l*.52,h,l,22*t);if(ca(e,u,t,{fill:Z(Q.ink,.9),edge:Z(Q.waterCrest,.92)}),o>3){da(e,"STAND BY",n,r+7*t,{font:`800 ${Math.round(21*t)}px ${Bt}`,fill:Z(Q.hudPaper,1),ink:Z(Q.ink,1),inkWidth:4*t,align:"center",tracking:3*t});return}da(e,String(o),n,r+50*t,{font:`900 ${Math.round(116*t)}px ${Bt}`,fill:Z(Q.hudPaper,1),ink:Z(Q.ink,1),inkWidth:8*t,align:"center",skew:.12,ghost:Z(Q.boost,.9),ghostDx:7*t,ghostDy:8*t})}drawGo(e,t){if(this.goTimer<0)return;const s=Math.min(1,this.goTimer/.24,(1.15-this.goTimer)/.42);if(s<=0)return;const a=this.w*.5,o=this.h*.32,n=Math.min(this.w*.44,410*t),r=92*t;e.save(),e.globalAlpha=s;const h=ha(a-n*.5,o-r*.52,n,r,26*t);ca(e,h,t,{fill:Z(Q.ink,.92),edge:Z(Q.raceLine,.95)}),da(e,"GO!",a,o+25*t,{font:`900 ${Math.round(68*t)}px ${Bt}`,fill:Z(Q.raceLine,1),ink:Z(Q.ink,1),inkWidth:7*t,align:"center",skew:.16,tracking:2*t,ghost:Z(Q.boostHot,.9),ghostDx:7*t,ghostDy:7*t}),e.restore()}drawSpeed(e,t){const s=62*t,a=String(Math.max(0,Math.round(this.shownSpeed))),o=ri(a,s),n=26*t,r=o+n*2+74*t,h=s+30*t,l=this.w-r-34*t,u=this.h-h-34*t;ca(e,ha(l,u,r,h,Gn*h),t,{fill:Z(Q.hudInk,.82),edge:Z(Q.hudPaper,.85)}),Vn(e,a,l+n,u+15*t,s,{lit:Z(Q.hudPaper,1),dim:Z(Q.hudDim,.22)}),e.font=`600 ${15*t}px ${Bt}`,e.fillStyle=Z(Q.hudDim,.95),e.textAlign="left",e.textBaseline="alphabetic",e.fillText("KM/H",l+n+o+14*t,u+h-22*t)}dispose(){}}const Xe=26,Ls=89;class Kn{ac=null;live=null;busSum;master;comp;clipper;reverbSend;engineBus;waterBus;sfxBus;engineOsc=[];engineGain;engineFilter;whineOsc;whineGain;growlOsc;growlGain;growlFilter;rattleLfo;rattleGain;rattleDepth;rattleFilter;rushGain;rushFilter;hissGain;swellLfo;noiseBuffer=null;whiteBuffer=null;nodeLog=[];muted=!1;started=!1;lastBoostTime=0;rpm=0;async unlock(){if(!this.started){if(B.debug.harness){this.muted=!0,this.started=!0;return}try{const e=window.AudioContext??window.webkitAudioContext,t=new e;await t.resume(),this.live=t,this.ac=t,this.build(t),this.started=!0,B.debug.enabled&&console.info("[audio] graph:",this.nodeLog.join(", "))}catch(e){console.warn("[audio] unavailable, running silent",e),this.muted=!0,this.started=!0}}}setMuted(e){this.muted=e,this.master&&(this.master.gain.value=e?0:B.audio.masterGain)}makeNoise(e,t){const s=Math.floor(e.sampleRate*2),a=e.createBuffer(1,s,e.sampleRate),o=a.getChannelData(0);let n=0;for(let r=0;r<s;r++){const h=Math.random()*2-1;t?(n=(n+.02*h)/1.02,o[r]=n*3.2):o[r]=h}return a}makeClipCurve(e){const s=new Float32Array(2048);for(let a=0;a<2048;a++){const o=a/2047*2-1;s[a]=Math.tanh(o*e)/Math.tanh(e)}return s}makeDistCurve(e){const s=new Float32Array(1024);for(let a=0;a<1024;a++){const o=a/1023*2-1;s[a]=(1+e)*o/(1+e*Math.abs(o))}return s}makeImpulse(e){const t=Math.floor(e.sampleRate*1.1),s=e.createBuffer(2,t,e.sampleRate);for(let a=0;a<2;a++){const o=s.getChannelData(a);for(let n=0;n<t;n++){const r=n/t,h=n<t*.06?Math.random()<.22?1:.08:1;o[n]=(Math.random()*2-1)*Math.pow(1-r,3.4)*h}}return s}node(e,t){return this.nodeLog.push(e),t}build(e){this.nodeLog=[],this.noiseBuffer=this.makeNoise(e,!0),this.whiteBuffer=this.makeNoise(e,!1),this.master=this.node("master:Gain",e.createGain()),this.master.gain.value=this.muted?0:B.audio.masterGain,this.master.connect(e.destination),this.clipper=this.node("softClip:WaveShaper",e.createWaveShaper()),this.clipper.curve=this.makeClipCurve(1.6),this.clipper.oversample="2x",this.clipper.connect(this.master),this.comp=this.node("glue:DynamicsCompressor",e.createDynamicsCompressor()),this.comp.threshold.value=-17,this.comp.knee.value=12,this.comp.ratio.value=4,this.comp.attack.value=.006,this.comp.release.value=.19,this.comp.connect(this.clipper),this.busSum=this.node("busSum:Gain",e.createGain()),this.busSum.gain.value=1,this.busSum.connect(this.comp);const t=this.node("room:Convolver",e.createConvolver());t.buffer=this.makeImpulse(e),t.normalize=!0,this.reverbSend=this.node("reverbSend:Gain",e.createGain()),this.reverbSend.gain.value=.22,this.reverbSend.connect(t);const s=this.node("reverbReturn:Gain",e.createGain());s.gain.value=.5,t.connect(s).connect(this.comp),this.engineBus=this.node("engineBus:Gain",e.createGain()),this.waterBus=this.node("waterBus:Gain",e.createGain()),this.sfxBus=this.node("sfxBus:Gain",e.createGain()),this.engineBus.gain.value=1,this.waterBus.gain.value=1,this.sfxBus.gain.value=1,this.engineBus.connect(this.busSum),this.waterBus.connect(this.busSum),this.sfxBus.connect(this.busSum),this.sfxBus.connect(this.reverbSend),this.engineFilter=this.node("engineFormant:Biquad",e.createBiquadFilter()),this.engineFilter.type="lowpass",this.engineFilter.frequency.value=620,this.engineFilter.Q.value=6.5,this.engineGain=this.node("engine:Gain",e.createGain()),this.engineGain.gain.value=0,this.engineFilter.connect(this.engineGain).connect(this.engineBus);for(const[d,m,c]of[[1,0,"sawtooth"],[1,9,"sawtooth"],[2,-7,"sawtooth"],[3,5,"square"]]){const v=this.node(`enginePartial×${d}:Osc`,e.createOscillator());v.type=c,v.frequency.value=Xe*d,v.detune.value=m;const f=e.createGain();f.gain.value=d===1?.5:d===2?.3:.14,v.connect(f).connect(this.engineFilter),v.start(),v.__mult=d,this.engineOsc.push(v)}this.whineOsc=this.node("whine:Osc",e.createOscillator()),this.whineOsc.type="triangle",this.whineOsc.frequency.value=Xe*6,this.whineGain=this.node("whine:Gain",e.createGain()),this.whineGain.gain.value=0,this.whineOsc.connect(this.whineGain).connect(this.engineBus),this.whineOsc.start(),this.growlOsc=this.node("growl:Osc",e.createOscillator()),this.growlOsc.type="sawtooth",this.growlOsc.frequency.value=Xe*1.5;const a=this.node("growl:WaveShaper",e.createWaveShaper());a.curve=this.makeDistCurve(14),a.oversample="2x",this.growlFilter=this.node("growl:Biquad",e.createBiquadFilter()),this.growlFilter.type="bandpass",this.growlFilter.frequency.value=320,this.growlFilter.Q.value=2.6,this.growlGain=this.node("growl:Gain",e.createGain()),this.growlGain.gain.value=0,this.growlOsc.connect(a).connect(this.growlFilter).connect(this.growlGain).connect(this.engineBus),this.growlOsc.start();const o=this.node("rattle:BufferSource",e.createBufferSource());o.buffer=this.makeNoise(e,!1),o.loop=!0,this.rattleFilter=this.node("rattle:Biquad",e.createBiquadFilter()),this.rattleFilter.type="bandpass",this.rattleFilter.frequency.value=150,this.rattleFilter.Q.value=1.4;const n=this.node("rattleChop:Gain",e.createGain());n.gain.value=.5,this.rattleLfo=this.node("rattleLfo:Osc",e.createOscillator()),this.rattleLfo.type="sawtooth",this.rattleLfo.frequency.value=Xe,this.rattleDepth=this.node("rattleDepth:Gain",e.createGain()),this.rattleDepth.gain.value=.45,this.rattleLfo.connect(this.rattleDepth).connect(n.gain),this.rattleLfo.start(),this.rattleGain=this.node("rattle:Gain",e.createGain()),this.rattleGain.gain.value=0,o.connect(this.rattleFilter).connect(n).connect(this.rattleGain).connect(this.engineBus),o.start();const r=this.node("rush:BufferSource",e.createBufferSource());r.buffer=this.noiseBuffer,r.loop=!0,this.rushFilter=this.node("rush:Biquad",e.createBiquadFilter()),this.rushFilter.type="bandpass",this.rushFilter.frequency.value=280,this.rushFilter.Q.value=.7,this.rushGain=this.node("rush:Gain",e.createGain()),this.rushGain.gain.value=0,r.connect(this.rushFilter).connect(this.rushGain).connect(this.waterBus),r.start(),this.swellLfo=this.node("swellLfo:Osc",e.createOscillator()),this.swellLfo.type="sine",this.swellLfo.frequency.value=.23;const h=this.node("swellDepth:Gain",e.createGain());h.gain.value=150,this.swellLfo.connect(h).connect(this.rushFilter.frequency),this.swellLfo.start();const l=this.node("hiss:BufferSource",e.createBufferSource());l.buffer=this.makeNoise(e,!1),l.loop=!0;const u=this.node("hiss:Biquad",e.createBiquadFilter());u.type="highpass",u.frequency.value=2600,this.hissGain=this.node("hiss:Gain",e.createGain()),this.hissGain.gain.value=0,l.connect(u).connect(this.hissGain).connect(this.waterBus),l.start()}update(e){if(!this.ac||this.muted)return;const t=e.player.state,s=this.ac.currentTime,a=I(t.appliedThrottle);let o=I(t.speedFrac*.58+a*.42+Math.max(0,a-t.speedFrac)*.25);t.airborne&&(o=Math.max(o,.9)),t.boostTime>0&&(o=Math.min(1,o+.1)),this.rpm=o;const n=Xe+o*Ls;for(const c of this.engineOsc)c.frequency.setTargetAtTime(n*c.__mult,s,.05);this.rattleLfo.frequency.setTargetAtTime(n,s,.05),this.whineOsc.frequency.setTargetAtTime(n*6,s,.05),this.growlOsc.frequency.setTargetAtTime(n*1.5,s,.05),this.engineFilter.frequency.setTargetAtTime(560+o*3100+(t.airborne?500:0),s,.07);const r=B.audio.engineGain*(.2+a*.55+o*.4)*(t.airborne?.7:1);this.engineGain.gain.setTargetAtTime(r,s,.06);const h=I((o-.42)/.58);this.whineGain.gain.setTargetAtTime(B.audio.engineGain*h*h*.13,s,.08);const l=a*I(1-t.speedFrac*.85);this.growlGain.gain.setTargetAtTime(B.audio.engineGain*l*.5,s,.09),this.growlFilter.frequency.setTargetAtTime(280+o*520,s,.1);const u=(1-o*.78)*(.35+a*.3);this.rattleGain.gain.setTargetAtTime(B.audio.engineGain*u*.5,s,.08),this.rattleFilter.frequency.setTargetAtTime(120+o*260,s,.1);const d=t.airborne,m=d?.04:I(t.speedFrac*1.15);this.rushGain.gain.setTargetAtTime(B.audio.waterGain*m,s,d?.06:.12),this.rushFilter.frequency.setTargetAtTime(260+m*1500,s,.12),this.hissGain.gain.setTargetAtTime(B.audio.waterGain*(d?.01:m*m*.34),s,d?.05:.14),this.lastBoostTime=t.boostTime}burst(e,t,s,a,o,n){const r=e.createBufferSource();r.buffer=a.type==="highpass"?this.whiteBuffer:this.noiseBuffer,r.loop=!0,r.playbackRate.value=.8+Math.random()*.5;const h=e.createBiquadFilter();h.type=a.type,h.Q.value=a.q,h.frequency.setValueAtTime(a.from,t),h.frequency.exponentialRampToValueAtTime(Math.max(30,a.to),t+s);const l=e.createGain();l.gain.setValueAtTime(1e-4,t),l.gain.exponentialRampToValueAtTime(o,t+Math.min(.02,s*.12)),l.gain.exponentialRampToValueAtTime(1e-4,t+s),r.connect(h).connect(l).connect(n),r.start(t),r.stop(t+s+.02)}impact(e){const t=this.ac;if(!t||this.muted)return;const s=t.currentTime,a=I(e),o=t.createOscillator();o.type="triangle",o.frequency.setValueAtTime(150+a*110,s),o.frequency.exponentialRampToValueAtTime(38,s+.3);const n=t.createGain();n.gain.setValueAtTime(1e-4,s),n.gain.exponentialRampToValueAtTime(.52*a+.05,s+.01),n.gain.exponentialRampToValueAtTime(1e-4,s+.42),o.connect(n).connect(this.sfxBus),o.start(s),o.stop(s+.45),this.burst(t,s,.26+a*.16,{type:"bandpass",from:95+a*40,to:70,q:7.5},.34*a+.04,this.sfxBus),this.splash(a*.85)}splash(e){const t=this.ac;if(!t||this.muted)return;const s=I(e),a=t.currentTime;this.burst(t,a,.18+s*.22,{type:"highpass",from:900+s*2600,to:550,q:.8},.3*s+.02,this.sfxBus)}horn(e){const t=this.ac;if(!t||this.muted)return;const s=t.currentTime,a=196*Math.pow(2,$(e,0,1.2)),o=.24+e*.12;for(const[n,r,h]of[[1,.2,"sawtooth"],[1.5,.12,"sawtooth"],[2,.07,"square"]]){const l=t.createOscillator();l.type=h,l.frequency.setValueAtTime(a*n*.94,s),l.frequency.exponentialRampToValueAtTime(a*n,s+.05);const u=t.createBiquadFilter();u.type="lowpass",u.frequency.value=1500+e*1400,u.Q.value=1.2;const d=t.createGain();d.gain.setValueAtTime(1e-4,s),d.gain.exponentialRampToValueAtTime(r,s+.025),d.gain.setValueAtTime(r,s+o),d.gain.exponentialRampToValueAtTime(1e-4,s+o+.26),l.connect(u).connect(d).connect(this.sfxBus),l.start(s),l.stop(s+o+.3)}this.burst(t,s,.09,{type:"highpass",from:2200,to:900,q:.7},.1,this.sfxBus)}boost(){const e=this.ac;if(!e||this.muted)return;const t=e.currentTime;this.burst(e,t,.5,{type:"bandpass",from:360,to:4200,q:1.1},.3,this.sfxBus);const s=e.createOscillator();s.type="sawtooth",s.frequency.setValueAtTime(150,t),s.frequency.exponentialRampToValueAtTime(960,t+.3);const a=e.createBiquadFilter();a.type="bandpass",a.frequency.value=800,a.Q.value=4.5;const o=e.createGain();o.gain.setValueAtTime(1e-4,t),o.gain.exponentialRampToValueAtTime(.26,t+.04),o.gain.exponentialRampToValueAtTime(1e-4,t+.44),s.connect(a).connect(o).connect(this.sfxBus),s.start(t),s.stop(t+.48);const n=e.createOscillator();n.type="sine",n.frequency.setValueAtTime(110,t),n.frequency.exponentialRampToValueAtTime(45,t+.22);const r=e.createGain();r.gain.setValueAtTime(1e-4,t),r.gain.exponentialRampToValueAtTime(.3,t+.012),r.gain.exponentialRampToValueAtTime(1e-4,t+.3),n.connect(r).connect(this.sfxBus),n.start(t),n.stop(t+.32)}checkpoint(){const e=this.ac;if(!e||this.muted)return;const t=e.currentTime,s=e.createDelay(.4);s.delayTime.value=.11;const a=e.createGain();a.gain.value=.32,s.connect(a).connect(this.sfxBus);for(const[o,n,r]of[[0,880,.15],[.075,1320,.13]]){const h=e.createOscillator();h.type="triangle",h.frequency.value=n;const l=e.createGain();l.gain.setValueAtTime(1e-4,t+o),l.gain.exponentialRampToValueAtTime(r,t+o+.008),l.gain.exponentialRampToValueAtTime(1e-4,t+o+.16),h.connect(l),l.connect(this.sfxBus),l.connect(s),h.start(t+o),h.stop(t+o+.2)}}async selfTest(){const e=[],a=globalThis.OfflineAudioContext??globalThis.webkitOfflineAudioContext,o=new a(2,44100*6,44100),n=this.ac,r=this.muted;this.ac=o,this.muted=!1;try{this.build(o)}catch(v){return this.ac=n,this.muted=r,{nodes:[],sections:[],ok:!1,errors:[`build threw: ${v}`]}}const h=[["idle+engine",0,1],["engine@full+water",1,2],["impact",2,2.7],["splash",2.7,3.3],["horn",3.3,4.2],["boost",4.2,5],["checkpoint",5,5.6]],l=(v,f,p,w)=>{const y=Xe+f*Ls;for(const S of this.engineOsc)S.frequency.setValueAtTime(y*S.__mult,v);this.rattleLfo.frequency.setValueAtTime(y,v),this.whineOsc.frequency.setValueAtTime(y*6,v),this.growlOsc.frequency.setValueAtTime(y*1.5,v),this.engineFilter.frequency.setValueAtTime(560+f*3100,v),this.engineGain.gain.setValueAtTime(B.audio.engineGain*(.2+p*.55+f*.4),v);const b=I((f-.42)/.58);this.whineGain.gain.setValueAtTime(B.audio.engineGain*b*b*.13,v),this.growlGain.gain.setValueAtTime(B.audio.engineGain*p*I(1-w*.85)*.5,v),this.rattleGain.gain.setValueAtTime(B.audio.engineGain*(1-f*.78)*(.35+p*.3)*.5,v),this.rushGain.gain.setValueAtTime(B.audio.waterGain*w,v),this.hissGain.gain.setValueAtTime(B.audio.waterGain*w*w*.34,v)};l(0,.06,.05,0),l(1,1,1,.95),l(2,0,0,0),this.engineGain.gain.setValueAtTime(0,2),this.rattleGain.gain.setValueAtTime(0,2),this.whineGain.gain.setValueAtTime(0,2),this.growlGain.gain.setValueAtTime(0,2),this.rushGain.gain.setValueAtTime(0,2),this.hissGain.gain.setValueAtTime(0,2);const u=(v,f)=>{Object.defineProperty(o,"currentTime",{value:v,configurable:!0}),f()};try{u(2,()=>this.impact(.9)),u(2.75,()=>this.splash(.8)),u(3.35,()=>this.horn(1)),u(4.25,()=>this.boost()),u(5.05,()=>this.checkpoint())}catch(v){e.push(`one-shot threw: ${v}`)}let d;try{d=await o.startRendering()}catch(v){return this.ac=n,this.muted=r,{nodes:this.nodeLog.slice(),sections:[],ok:!1,errors:[`render threw: ${v}`]}}const m=d.getChannelData(0),c=h.map(([v,f,p])=>{let w=0,y=0,b=0;const S=Math.floor(f*44100),x=Math.min(m.length,Math.floor(p*44100));for(let k=S;k<x;k++){const _=m[k];if(!Number.isFinite(_)){e.includes("non-finite sample")||e.push("non-finite sample");continue}const L=Math.abs(_);L>w&&(w=L),y+=_*_,b++}return{name:v,peak:w,rms:Math.sqrt(y/Math.max(1,b))}});for(const v of c)v.peak<1e-4&&e.push(`${v.name}: silent`),v.peak>.999&&e.push(`${v.name}: hard clipped`);return this.ac=n,this.muted=r,this.engineOsc=[],n&&n===this.live&&this.build(n),{nodes:this.nodeLog.slice(),sections:c,ok:e.length===0,errors:e}}}class $n{constructor(e,t){this.glCanvas=e,this.hudCanvas=t;const{renderer:s}=Oi(e);this.adaptive=new Wi(s),this.input=new Ri;const a=window.innerWidth/window.innerHeight;this.cameraRig=new _n(a),this.scene.add(yo()),this.ocean=new Bo,this.scene.add(this.ocean.mesh),this.river=new qo,this.scene.add(this.river.group);const o=ln(0,this.river.startPosition(),Math.PI);this.racers.push(o),this.scene.add(o.root),this.race={phase:"countdown",raceTime:-4,countdownNumber:3,racers:this.racers,player:o,standings:()=>this.racers,restart:()=>{this.resetRacers(),this.race.phase="countdown",this.race.raceTime=-4,this.race.countdownNumber=3,this.lastCountdownBeep=99}},this.hud=new jn(t),this.composer=new wo(s,this.scene,this.cameraRig.camera),this.ctx={renderer:s,scene:this.scene,camera:this.cameraRig.camera,time:0,dt:0,rawDt:0,frame:0,ocean:this.ocean,track:this.river,race:this.race,racers:this.racers,player:this.racers[0],input:this.input.state,audio:this.audio,cameraRig:this.cameraRig,width:window.innerWidth,height:window.innerHeight,pixelRatio:1,perf:{fps:60,frameMs:16.6,gpuScale:1,drawCalls:0,triangles:0}},this.subsystems=[this.ocean,this.river,new on(this.racers),new Cn(this.racers)].sort((r,h)=>r.order-h.order),this.resize(),window.addEventListener("resize",()=>this.resize());const n=()=>{this.audio.unlock(),window.removeEventListener("pointerdown",n),window.removeEventListener("keydown",n)};window.addEventListener("pointerdown",n),window.addEventListener("keydown",n)}glCanvas;hudCanvas;scene=new Os;subsystems=[];input;adaptive;composer;cameraRig;ocean;river;hud;audio=new Kn;racers=[];race;ctx;lastTime=0;running=!1;lastCountdownBeep=99;forcedControls=null;fixedDt=null;scripted=!1;autopilotSteer(e){const s=26+e.state.velocity.length()*1.4,a=e.root.position.z-s,o=xe(a)-e.root.position.x;let n=Math.atan2(o,-s)-e.state.heading;for(;n>Math.PI;)n-=Math.PI*2;for(;n<-Math.PI;)n+=Math.PI*2;return $(-n*1.6,-1,1)}resetRacers(){for(const e of this.racers){const t=this.river.startGrid(e.id);e.root.position.copy(t.position),e.state.velocity.set(0,0,0),e.state.heading=t.heading,e.state.forwardSpeed=0,e.state.speedFrac=0,e.state.boostTime=0,e.state.boostMeter=0,e.state.driftCharge=0,e.state.driftTier=0,e.lap=0,e.nextCheckpoint=0,e.progress=0,e.place=e.id+1,e.finished=!1,e.finishTime=0,e.lapTimes=[],e.bestLap=1/0,e.wrongWay=!1}this.race.raceTime=0,this.cameraRig.snapToTarget()}resize(){const e=window.innerWidth,t=window.innerHeight;this.ctx.width=e,this.ctx.height=t;const s=this.adaptive.pixelRatio;this.ctx.pixelRatio=s,this.ctx.renderer.setPixelRatio(s),this.ctx.renderer.setSize(e,t,!1),this.cameraRig.resize(e/t),this.composer.setSize(e,t,s),this.hud.resize(e,t,Math.min(window.devicePixelRatio||1,2)),X.uResolution.value.set(e*s,t*s),X.uNear.value=B.render.near,X.uFar.value=B.render.far}start(){this.running=!0,this.lastTime=performance.now();const e=t=>{this.running&&(this.scripted||this.frame(t),requestAnimationFrame(e))};requestAnimationFrame(e)}frame(e,t){const s=this.ctx,a=t??(e-this.lastTime)/1e3;this.lastTime=e,s.rawDt=a,s.dt=$(a,0,1/20),s.time+=s.dt,s.frame++;const o=performance.now();this.input.update(s.dt);const n=this.racers[0].controls;if(this.forcedControls)n.throttle=this.forcedControls.throttle??0,n.brake=this.forcedControls.brake??0,n.drift=this.forcedControls.drift??!1,n.steer=this.forcedControls.autopilot?this.autopilotSteer(this.racers[0]):this.forcedControls.steer??0;else{const l=this.input.state;n.steer=l.steer,n.throttle=l.throttle,n.brake=l.brake,n.drift=l.drift}if(this.input.state.restartPressed&&(this.audio.unlock(),this.race.restart()),this.race.phase==="countdown"){this.race.raceTime+=s.dt;const l=Math.max(0,Math.ceil(-this.race.raceTime));this.race.countdownNumber=l,l<this.lastCountdownBeep&&(this.lastCountdownBeep=l,this.audio.horn(l===0?1:.55+(3-l)*.08)),n.throttle=0,n.brake=0,n.steer=0,n.drift=!1,this.race.raceTime>=0&&(this.race.phase="racing",this.race.countdownNumber=-1)}else this.race.raceTime+=s.dt;X.uTime.value=s.time,X.uCameraPos.value.copy(this.cameraRig.camera.position),X.uTanHalfFov.value=Math.tan(this.cameraRig.camera.fov*Math.PI/360);for(const l of this.subsystems)l.update(s);this.race.phase==="countdown"||this.race.phase==="results"?(this.cameraRig.applyCinematicOrbit(s),this.cameraRig.update(s)):this.cameraRig.update(s),this.audio.update(s),s.renderer.info.reset(),this.composer.render(),this.ocean.setSceneDepth(this.composer.gbufferDepth);const r=this.adaptive.drawStats();s.perf.drawCalls=r.drawCalls,s.perf.triangles=r.triangles,this.hud.render(s);const h=performance.now()-o;this.adaptive.update(h,s.dt)&&this.resize(),s.perf.fps=this.adaptive.fps,s.perf.frameMs=this.adaptive.frameMs,s.perf.gpuScale=this.adaptive.scale}harness(){const e=this;return{ready:!0,reset(){e.ctx.time=0,e.race.restart(),e.forcedControls=null},setPhase(t){t==="racing"?(e.race.phase="racing",e.race.raceTime=0,e.race.countdownNumber=-1):t==="countdown"?(e.race.phase="countdown",e.race.raceTime=-4,e.race.countdownNumber=3,e.lastCountdownBeep=99):(e.race.phase="results",e.racers.forEach((s,a)=>{s.finished=!0,s.finishTime=214.5+a*3.4,s.lapTimes=[71.2+a,70.8+a,72.5+a],s.bestLap=Math.min(...s.lapTimes),s.place=a+1,s.lap=B.race.laps}))},setControls(t){e.forcedControls=t},async simulate(t,s=1/60){e.scripted=!0;const a=Math.max(1,Math.round(t/s));for(let o=0;o<a;o++)e.frame(performance.now(),s),o%30===29&&await new Promise(n=>setTimeout(n,0))},async simulateUntil(t,s=90,a=1/60){e.scripted=!0;const o=new Function("s",`return (${t});`),n=Math.round(s/a);for(let r=0;r<n;r++){e.frame(performance.now(),a),r%30===29&&await new Promise(h=>setTimeout(h,0));try{if(o(this.stats()))return{found:!0,t:e.ctx.time}}catch{}}return{found:!1,t:e.ctx.time}},async settle(t=6){e.scripted=!0;for(let s=0;s<t;s++)e.frame(performance.now(),1/60),await new Promise(a=>requestAnimationFrame(()=>a(null)))},release(){e.scripted=!1,e.lastTime=performance.now()},probe(){return e.racers.map(t=>{const s=t.state.velocity.length(),a={x:Math.sin(t.state.heading),z:Math.cos(t.state.heading)},o=e.river.project(t.root.position),n=e.river.sample(o.u);return{id:t.id,name:t.name,heading:t.state.heading,headingFwd:a,headingDotTangent:a.x*n.tangent.x+a.z*n.tangent.z,velDotTangent:s>.01?t.state.velocity.dot(n.tangent)/s:0,speed:s,u:o.u,lateral:o.lateral,distToLine:o.distance,lap:t.lap,nextCheckpoint:t.nextCheckpoint,progress:t.progress,place:t.place,wrongWay:t.wrongWay,finished:t.finished,pos:t.root.position.toArray().map(r=>+r.toFixed(2))}})},setCameraPreset(t){e.cameraRig.setPreset(t)},setSeaState(t){Bi(t)},stats(){const t=e.ctx.player.state;return{fps:e.ctx.perf.fps,frameMs:e.ctx.perf.frameMs,drawCalls:e.ctx.perf.drawCalls,triangles:e.ctx.perf.triangles,pixelRatio:e.ctx.pixelRatio,time:e.ctx.time,phase:e.race.phase,speed:t.forwardSpeed,airborne:t.airborne,airTime:t.airTime,landingImpact:t.landingImpact,drifting:t.drifting,driftTier:t.driftTier,boostMeter:t.boostMeter,boostTime:t.boostTime,wrongWay:e.ctx.player.wrongWay,position:t.position.toArray(),lap:e.ctx.player.lap,place:e.ctx.player.place}},rendererInfo(){const t=e.ctx.renderer.getContext(),s=t.getExtension("WEBGL_debug_renderer_info");return{renderer:s?t.getParameter(s.UNMASKED_RENDERER_WEBGL):"unknown",vendor:s?t.getParameter(s.UNMASKED_VENDOR_WEBGL):"unknown"}},_game:e}}}const Qn=document.getElementById("gl"),Xn=document.getElementById("hud"),ct=document.getElementById("boot");try{const i=new $n(Qn,Xn);i.start(),requestAnimationFrame(()=>requestAnimationFrame(()=>{window.__INKTIDE__=i.harness(),ct?.classList.add("gone"),setTimeout(()=>ct?.remove(),700)}))}catch(i){throw console.error("[ink-tide] boot failed",i),ct&&(ct.textContent="Boot failed — see console",ct.style.letterSpacing="0.1em"),i}
//# sourceMappingURL=index-YfXKSmtp.js.map
