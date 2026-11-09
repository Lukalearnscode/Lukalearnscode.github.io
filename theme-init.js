(()=>{
  // Picks the site style before first paint. Defaults are the live design (morph / refine 2 / mobius / optima).
  // URL parameters (?style= &refine= &art= &type= &motion= &desk= &grain=) are remembered for the tab in sessionStorage.
  const keys=['ascii','sketch','impression','morph','notebook'],q=new URLSearchParams(location.search);
  const arts=['orbit','fold','petal','mobius'],types=['clean','serif','original','helvetica','avenir','gill','optima','trebuchet'];
  const desks=['sage','slate','kraft'],grains=['on','off'],papers=['white','book','parchment','ledger','kraft'];
  const ss={get:k=>{try{return sessionStorage.getItem('luka-'+k)}catch{return null}},set:(k,v)=>{try{sessionStorage.setItem('luka-'+k,v)}catch{}}};
  let key=q.get('style'),refine=q.get('refine');
  if(keys.includes(key)){ss.set('style',key);ss.set('refine',['1','2'].includes(refine)?refine:'0')}
  else{key=ss.get('style');refine=ss.get('refine')}
  const pick=(name,valid,fallback)=>{const v=q.get(name);if(valid.includes(v))ss.set(name,v);const s=ss.get(name);return valid.includes(s)?s:fallback};
  const art=pick('art',arts,'mobius'),type=pick('type',types,'optima');
  const desk=pick('desk',desks,'slate'),grain=pick('grain',grains,'on'),paper=pick('paper',papers,'book');
  if(!keys.includes(key)){key='morph';refine='2'}
  const root=document.documentElement;
  const motion=pick('motion',['on','off'],null);if(motion)root.dataset.motion=motion;
  root.dataset.style=key;
  if(key==='morph'&&['1','2'].includes(refine)){root.dataset.refine=refine;root.dataset.art=art;root.dataset.type=type;root.dataset.grain=grain}
  if(key==='notebook'){
    // The notebook look ships as its own stylesheet + script, loaded only when chosen.
    root.dataset.art='mobius';root.dataset.desk=desk;root.dataset.paper=paper;root.classList.add('nb-loading');
    const base=(document.currentScript&&document.currentScript.src||'').replace(/theme-init\.js.*$/,'');
    document.write('<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lxgw-wenkai-screen-webfont@1.7.0/lxgwwenkaigbscreen.css">'
      +'<link rel="stylesheet" href="'+base+'notebook.css">'
      +'<script src="'+base+'notebook.js" defer><\/script>');
    setTimeout(()=>root.classList.remove('nb-loading'),1200); // never leave the page hidden if the script fails
  }
})();
