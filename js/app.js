/* ==========================================================
   LITTLE LUXE — app (router, sound, scenes, pages)
   ========================================================== */
(() => {
'use strict';
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
const clamp = (v, a=0, b=1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const range = (p, a, b) => clamp((p - a) / (b - a));
const easeOutBack = t => { const c1=1.70158, c3=c1+1; return 1 + c3*Math.pow(t-1,3) + c1*Math.pow(t-1,2); };
const easeOutBounce = t => { const n=7.5625, d=2.75; if(t<1/d) return n*t*t; if(t<2/d) return n*(t-=1.5/d)*t+.75; if(t<2.5/d) return n*(t-=2.25/d)*t+.9375; return n*(t-=2.625/d)*t+.984375; };
const hex2rgb = h => [1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
const mix = (a, b, t) => { const A=hex2rgb(a), B=hex2rgb(b); return '#'+A.map((v,i)=>Math.round(lerp(v,B[i],t)).toString(16).padStart(2,'0')).join(''); };
const ramp = (stops, p) => { // stops: [[t,color],...]
  for (let i=0;i<stops.length-1;i++){ const [t0,c0]=stops[i],[t1,c1]=stops[i+1]; if(p<=t1) return mix(c0,c1,range(p,t0,t1)); }
  return stops[stops.length-1][1];
};
const store = { get(k,d){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } }, set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} } };

/* ---------------- DATA ---------------- */
// EDIT: individual prices are placeholders. Kit price (₹599, was ₹945) is from littleluxe.in.
const PRODUCTS = {
  'glow-shield': {
    id:'glow-shield', name:'Glow Shield', full:'Glow Shield Opaque Gel Mineral Sunscreen', badge:'SPF 60 PA++++', pal:'sunny', cat:'sun',
    price:349, mrp:null, art:()=>ART.tube('sunny','Glow','Shield'),
    short:'Mineral sunscreen and moisturiser in one non-chalky gel.',
    sub:'The everyday shield. A mineral SPF 60 PA++++ gel that moisturises too, and rubs in without the white cast.',
    claims:['SPF 60 PA++++','Mineral filters','Non-chalky gel','2-in-1'],
    what:'Glow Shield is a 2-in-1: a mineral sunscreen and a moisturiser in one opaque gel. SPF 60 helps protect from UVB, PA++++ from UVA. The gel texture spreads easily on wriggly faces and sinks in clear.',
    how:['Squeeze a generous strip onto your fingers (or theirs).','Dot it on forehead, cheeks, nose, chin, ears and neck.','Rub in until it disappears. No ghost face.','Reapply every two hours outdoors, and after swimming or a sweaty game.'],
    key:[['Mineral UV filters','Form a protective layer on the skin to help block UV rays.'],['Moisturising gel base','Keeps skin comfortable, so you can skip a separate morning cream.']], // EDIT: confirm exact filters from pack
  },
  'blush-block': {
    id:'blush-block', name:'Blush & Block', full:'Blush & Block Tinted Sunscreen', badge:'SPF 60 PA++++', pal:'blush', cat:'sun',
    price:349, mrp:null, art:()=>ART.tube('blush','Blush &','Block'),
    short:'A soft coral tint with SPF 60 PA++++ underneath. 3-in-1.',
    sub:'For the ones who want to look like the grown-ups. A coral-tinted 3-in-1 sunscreen with UVA and UVB protection.',
    claims:['SPF 60 PA++++','Coral tint','UVA + UVB','3-in-1'],
    what:'Blush & Block is a tinted sunscreen that gives cheeks a soft coral glow while SPF 60 PA++++ protects from UVA and UVB. It is the sunscreen tweens and teens actually ask for.',
    how:['Shake a little out onto clean fingertips.','Blend it over the face like a tinted cream.','Build a second layer on cheeks for more glow.','Reapply every two hours outdoors.'],
    key:[['Coral tint','A sheer, natural flush that suits Indian skin tones.'],['SPF 60 PA++++','High protection from both burning UVB and ageing UVA rays.']],
  },
  'cloud-mist': {
    id:'cloud-mist', name:'Cloud Mist Gel', full:'Hydrating Cloud Mist Gel', badge:'Hydrating', pal:'mint', cat:'hydration',
    price:249, mrp:null, art:()=>ART.jar(),
    short:'Lightweight, non-greasy moisture with panthenol, cica and hyaluronic acid.',
    sub:'Puts back what the day took out. A cloud-light gel moisturiser that sinks in before the second page of the bedtime story.',
    claims:['Panthenol','Cica','Hyaluronic acid','Non-greasy'],
    what:'Cloud Mist Gel is a lightweight, non-greasy moisturiser for after bath, after sun and before bed. Panthenol, cica and hyaluronic acid help skin stay soft, calm and hydrated.',
    how:['After bath, pat skin almost dry.','Take a pea-sized amount for the face, more for arms and legs.','Smooth it on in big cloud circles.','Use morning and night, and after a long day in the sun.'],
    key:[['Panthenol (vitamin B5)','Helps skin hold on to moisture and supports a healthy skin barrier.'],['Cica','A plant extract known for calming and soothing skin.'],['Hyaluronic acid','Draws water into the skin so it feels soft and bouncy.']],
  },
  'first-glow-kit': {
    id:'first-glow-kit', name:'First Glow Ritual Kit', full:'First Glow Ritual Kit', badge:'Discovery kit', pal:'lilac', cat:'kits',
    price:599, mrp:945, art:()=>ART.box(),
    short:'All three, plus a founder note and a seed-paper bookmark.',
    sub:'The easiest place to start. Glow Shield, Blush & Block and Cloud Mist Gel in one box, with a note from our founder and a bookmark you can plant.',
    claims:['3 products','Founder note','Seed-paper bookmark','Buy 3, get 1 free'],
    what:'Everything you need to try the whole Little Luxe ritual: Glow Shield for everyday sun, Blush & Block for tinted days and Cloud Mist Gel for hydration. Plus a handwritten-style note from Dr. Jui and a seed-paper bookmark that grows into flowers.',
    how:['Morning: Glow Shield (or Blush & Block on tinted days).','After play: reapply sunscreen.','Night: Cloud Mist Gel after bath.','Plant the bookmark together and watch it grow.'],
    key:[['Glow Shield','Mineral SPF 60 PA++++ gel sunscreen and moisturiser.'],['Blush & Block','Coral-tinted SPF 60 PA++++ sunscreen.'],['Cloud Mist Gel','Panthenol, cica and hyaluronic acid moisturiser.']],
  }
};
const ORDER = ['glow-shield','cloud-mist','blush-block','first-glow-kit'];
const NEVER = ['Parabens','Sulphates','Mineral oil'];
const CERTS = [['Dermatologically tested','shield'],['Clinically tested','check'],['pH balanced','drop'],['Non-irritant','leaf'],['Not tested on animals','heart'],['Doctor formulated','star'],['Made in India for Indian skin','sun'],['Parent approved','heart']];
const fmt = n => '₹' + n.toLocaleString('en-IN');
const P = id => PRODUCTS[id];
const pal = id => PAL[P(id).pal];

/* ---------------- SOUND (Web Audio, no files) ---------------- */
const Sound = {
  ctx:null, master:null, on: store.get('ll-sound', true) && !reduced, last:0,
  init(){ if(this.ctx) { if(this.ctx.state!=='running') this.ctx.resume(); return; }
    const AC = window.AudioContext || window.webkitAudioContext; if(!AC) return;
    this.ctx = new AC(); this.master = this.ctx.createGain(); this.master.gain.value = .32; this.master.connect(this.ctx.destination); },
  ok(){ return this.on && this.ctx && this.ctx.state === 'running'; },
  tone(f, dur, type='sine', vol=.25, slide=null, delay=0){
    if(!this.ok()) return; const t = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator(), g = this.ctx.createGain();
    o.type = type; o.frequency.setValueAtTime(f, t); if(slide) o.frequency.exponentialRampToValueAtTime(slide, t+dur);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(vol, t+.012); g.gain.exponentialRampToValueAtTime(.0001, t+dur);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t+dur+.03);
  },
  pop(){ const n=performance.now(); if(n-this.last<70) return; this.last=n; const f=560+Math.random()*160; this.tone(f,.09,'sine',.22,f*.55); },
  boop(){ this.tone(1046,.1,'triangle',.18); this.tone(1568,.16,'triangle',.18,null,.08); },
  tick(i){ const s=[523,587,659,698,784,880,988,1046,1175,1318,1397,1568,1760]; const f=s[clamp(i,0,12)]; this.tone(f,.4,'sine',.2); this.tone(f*4,.08,'sine',.04); },
  sparkle(){ [1318,1568,1760,2093,2637].forEach((f,i)=>this.tone(f,.3,'sine',.11,null,i*.07)); },
  chime(){ this.tone(2093,.6,'sine',.05); this.tone(3136,.5,'sine',.03,null,.05); },
  swish(){ if(!this.ok()) return; const c=this.ctx, len=c.sampleRate*.3, buf=c.createBuffer(1,len,c.sampleRate), d=buf.getChannelData(0);
    for(let i=0;i<len;i++) d[i]=(Math.random()*2-1)*Math.sin(Math.PI*i/len);
    const s=c.createBufferSource(); s.buffer=buf; const bp=c.createBiquadFilter(); bp.type='bandpass'; bp.Q.value=1.2;
    bp.frequency.setValueAtTime(500,c.currentTime); bp.frequency.exponentialRampToValueAtTime(2600,c.currentTime+.28);
    const g=c.createGain(); g.gain.value=.12; s.connect(bp); bp.connect(g); g.connect(this.master); s.start(); },
  set(v){ this.on=v; store.set('ll-sound', v); $$('.sound-btn').forEach(b=>{ b.setAttribute('aria-pressed', String(v)); b.setAttribute('aria-label', v?'Sound on. Turn sounds off':'Sound off. Turn sounds on'); }); }
};
const hideHint = () => { const h=document.getElementById('soundHint'); if(h) h.classList.add('gone'); };
const wakeAudio = () => { Sound.init(); if(Sound.ctx && !Sound.ctx._watched){ Sound.ctx._watched=true;
    const chk=()=>{ if(Sound.ctx.state==='running'){ hideHint(); store.set('ll-hint-done',true); } }; Sound.ctx.addEventListener('statechange',chk); chk(); } };
// touch scrolling doesn't unlock audio, so also listen for real taps (touchend/click)
['pointerdown','touchend','click','keydown'].forEach(ev=>addEventListener(ev, wakeAudio, {passive:true}));
const buzz = (p=8) => { if(Sound.on && !reduced && navigator.vibrate){ try{ navigator.vibrate(p); }catch(e){} } };

// hover pops on anything playful
const POP_SEL = '.btn,.pcard,.sticker,.opt,.thumb,.menu__prod,.gram__tile,.cert,.note,.logo,.bandaid,.dots button,.icard,.menu__links a,.foot ul a';
document.addEventListener('pointerover', e => {
  if(e.pointerType && e.pointerType!=='mouse') return;
  const el = e.target.closest(POP_SEL); if(!el) return;
  if(e.relatedTarget && el.contains(e.relatedTarget)) return;
  Sound.pop();
});
document.addEventListener('click', e => { if(e.target.closest('.btn,.opt,.tab')) { Sound.boop(); buzz(6); } });
// on touch screens there is no hover, so give cards and stickers a pop on tap
document.addEventListener('pointerdown', e => { if(e.pointerType==='mouse') return; const el=e.target.closest(POP_SEL); if(el && !el.closest('.btn,.opt,.tab')) Sound.pop(); }, {passive:true});

/* ---------------- CART ---------------- */
const Cart = {
  items: store.get('ll-cart', {}),
  save(){ store.set('ll-cart', this.items); this.render(); },
  add(id, n=1){ this.items[id]=(this.items[id]||0)+n; this.save(); },
  setQty(id, n){ if(n<=0) delete this.items[id]; else this.items[id]=n; this.save(); },
  count(){ return Object.values(this.items).reduce((a,b)=>a+b,0); },
  total(){ return Object.entries(this.items).reduce((a,[id,q])=>a+P(id).price*q,0); },
  render(){
    const c=this.count(); $$('.bag-count').forEach(b=>{ b.textContent=c; b.hidden=!c; });
    const box=$('#cartItems'); if(!box) return;
    if(!c){ box.innerHTML=`<div class="empty">${ART.kid({shirt:C.lilacS,shorts:C.ink,hair:'bun'})}<h3>Your bag is empty</h3><p>Start with the kit. It has all three.</p><a class="btn btn--lilac btn--sm" href="#/product/first-glow-kit" data-close-cart>See the First Glow kit</a></div>`; $('#cartFoot').hidden=true; return; }
    $('#cartFoot').hidden=false;
    box.innerHTML = Object.entries(this.items).map(([id,q])=>{ const p=P(id), pl=pal(id); return `<div class="citem">
      <div class="citem__img" style="--bg:${pl.l}">${p.art()}</div>
      <div><h4>${p.name}</h4><div class="price" style="font-size:1rem">${fmt(p.price)}</div>
      <div class="qty" role="group" aria-label="Quantity for ${p.name}"><button data-q="${id}" data-d="-1" aria-label="Remove one">−</button><span>${q}</span><button data-q="${id}" data-d="1" aria-label="Add one">+</button></div></div>
      <button class="btn btn--ghost btn--sm icon-btn" style="width:40px;height:40px;min-height:40px" data-q="${id}" data-d="-999" aria-label="Remove ${p.name}">${ART.close()}</button></div>`; }).join('');
    const kits=this.items['first-glow-kit']||0, free=Math.floor(kits/3);
    $('#cartOffer').innerHTML = free ? `${free} free First Glow kit${free>1?'s':''} added. Thank you for spreading the glow.` : (kits ? `Add ${3-kits%3} more kit${3-kits%3>1?'s':''} and the next one is free.` : 'Festive offer: buy 3 First Glow kits, get 1 free.');
    $('#cartTotal').textContent = fmt(this.total());
  }
};
document.addEventListener('click', e => {
  const q = e.target.closest('[data-q]'); if(q){ const id=q.dataset.q; Cart.setQty(id,(Cart.items[id]||0)+Number(q.dataset.d)); Sound.pop(); return; }
  if(e.target.closest('[data-open-cart]')){ e.preventDefault(); openCart(true); }
  if(e.target.closest('[data-close-cart]')) openCart(false);
  const add = e.target.closest('[data-add]'); if(add){ e.preventDefault(); addToBag(add.dataset.add, add, Number(add.dataset.n||1)); }
});
function openCart(v){ $('#cart').classList.toggle('open', v); $('#cart').setAttribute('aria-hidden', String(!v)); if(v){ Cart.render(); setTimeout(()=>$('#cart .cart__head button').focus(),50); Sound.swish(); } }
function addToBag(id, from, n=1){
  const bag = $('.header .bag-btn');
  if(!reduced && from && bag){
    const a=from.getBoundingClientRect(), b=bag.getBoundingClientRect();
    const f=document.createElement('div'); f.className='fly'; f.innerHTML=P(id).art();
    f.style.left=(a.left+a.width/2-30)+'px'; f.style.top=(a.top+a.height/2-60)+'px'; document.body.appendChild(f);
    requestAnimationFrame(()=>{ f.style.transform=`translate(${b.left-a.left-a.width/2+30}px,${b.top-a.top-a.height/2+40}px) scale(.3) rotate(25deg)`; f.style.opacity='.6'; });
    setTimeout(()=>f.remove(),800);
  }
  setTimeout(()=>{ Cart.add(id,n); $$('.bag-count').forEach(c=>{ c.classList.remove('bump'); void c.offsetWidth; c.classList.add('bump'); }); Sound.boop(); buzz([12,40,12]); toast(`${P(id).name} is in your bag.`, true); }, reduced?0:650);
}

/* ---------------- TOAST / FX ---------------- */
let toastT;
function toast(msg, withBag=false){
  const t=$('#toast'); t.innerHTML = msg + (withBag?' <button class="hand" data-open-cart style="text-decoration:underline;font-size:1.2rem;margin-left:6px;color:#FFE68F">open bag</button>':'');
  t.classList.add('show'); clearTimeout(toastT); toastT=setTimeout(()=>t.classList.remove('show'),3200);
}
function confetti(x, y, n=26){
  if(reduced) return; const cols=[C.blushS,C.sunnyS,C.mintS,C.skyS,C.lilacS];
  for(let i=0;i<n;i++){ const d=document.createElement('div'); d.className='confetti'; d.innerHTML=ART.heart(cols[i%5]);
    const a=Math.random()*Math.PI*2, r=80+Math.random()*180;
    d.style.left=x+'px'; d.style.top=y+'px'; d.style.setProperty('--dx',Math.cos(a)*r+'px'); d.style.setProperty('--dy',(Math.sin(a)*r-60)+'px'); d.style.setProperty('--rot',(Math.random()*720-360)+'deg');
    document.body.appendChild(d); setTimeout(()=>d.remove(),1500); }
}
if(finePointer && !reduced){ let lt=0;
  addEventListener('pointermove', e=>{ const n=performance.now(); if(n-lt<110) return; lt=n;
    const b=document.createElement('div'); b.className='bubble'; const s=6+Math.random()*14; b.style.cssText=`width:${s}px;height:${s}px;left:${e.clientX-s/2}px;top:${e.clientY-s/2+14}px;--dx:${(Math.random()*30-15)}px`;
    document.body.appendChild(b); setTimeout(()=>b.remove(),1150); }, {passive:true});
}

/* ---------------- SCROLL ENGINE ---------------- */
let scenes = [], cleanups = [];
const io = new IntersectionObserver(es=>es.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('in'); io.unobserve(en.target); } }),{rootMargin:'0px 0px -60px 0px'});
function addScene(s){ s.cur = s.cur ?? 0; scenes.push(s); }
const prog = el => { const r=el.getBoundingClientRect(), h=el.offsetHeight-innerHeight; return clamp(-r.top/Math.max(h,1)); };
let lastY = scrollY, headerHidden=false;
function frame(){
  const y = scrollY;
  // header: hide on scroll down, reveal on scroll up
  const hd=$('.header'), annH=$('.announce').offsetHeight;
  hd.style.top = Math.max(0, annH - y) + 'px';
  if(Math.abs(y-lastY)>4){ const hide = y>lastY && y>220 && !$('#menu').classList.contains('open'); if(hide!==headerHidden){ headerHidden=hide; hd.classList.toggle('is-hidden', hide); } lastY=y; }
  for(const s of scenes){ if(!s.el.isConnected) continue; const r=s.el.getBoundingClientRect(); if(r.bottom < -200 || r.top > innerHeight+200){ continue; }
    const target = s.progress ? s.progress() : prog(s.el);
    if(!s.always && s.drawn===target && s.cur===target) continue;
    s.cur = reduced ? target : lerp(s.cur, target, s.ease||.14); if(Math.abs(s.cur-target)<.0005) s.cur=target; s.update(s.cur, target); s.drawn=s.cur; }
  requestAnimationFrame(frame);
}

/* ---------------- SHARED BLOCKS ---------------- */
const marquee = (words, cls='c-sunny', tilt=true) => {
  const icons=[ART.sun(), ART.heart(), ART.drop(), ART.leaf()];
  const one = words.map((w,i)=>`<span class="marquee__item">${w}${icons[i%4]}</span>`).join('');
  return `<div class="marquee ${cls} ${tilt?'marquee--tilt':''}" aria-label="${words.join(', ')}"><div class="marquee__track" aria-hidden="true">${one}${one}${one}${one}</div></div>`;
};
const card = (id, i=0) => { const p=P(id), pl=pal(id); return `<a class="pcard pop-in" style="--bg:${pl.l};--fg:${pl.d};--i:${i}" href="#/product/${id}">
  <span class="sticker age" style="--bg:#fff;--fg:${pl.d}">Ages 4–16</span>
  <div class="pcard__img">${p.art()}</div><h3>${p.name}</h3><p class="pcard__sub">${p.short}</p>
  <div class="pcard__row"><span class="price">${fmt(p.price)}${p.mrp?`<s>${fmt(p.mrp)}</s>`:''}</span><button class="btn btn--sm add-btn" style="--fg:${pl.d};--sh:${pl.d}" data-add="${id}" aria-label="Add ${p.name} to bag">Add to bag</button></div></a>`; };
const claimBand = (list, pals=['blush','mint','sky','sunny','lilac']) => list.map((c,i)=>{ const pl=PAL[pals[i%pals.length]]; return `<span class="bandaid" style="--bg:${pl.l};--fg:${pl.d}">${c}</span>`; }).join('');
const pageHero = (cls, h, lead, deco='') => `<section class="panel page-hero ${cls}"><div class="wrap" style="width:auto;margin:0"><h1 style="max-width:14ch">${h}</h1><p class="lead">${lead}</p></div>${deco?`<div class="deco">${deco}</div>`:''}</section>`;
const acc = (items, open=0) => `<div class="acc">${items.map(([q,a],i)=>`<details ${i===open?'open':''}><summary>${q}<span class="pm" aria-hidden="true"></span></summary><div class="acc__body">${a}</div></details>`).join('')}</div>`;

const founderLetter = () => `<section class="founder" data-scene="letter">
  <div><span class="sticker" style="--bg:var(--blush);--fg:var(--blush-d);--r:-4deg">From our founder</span>
    <h2 style="margin-top:18px">I couldn't find it, so I made it.</h2>
    <p class="lead">Dr. Jui Gijare is a dentist and a mum. When her son needed skincare, the shelves offered adult formulas in smaller bottles. So she made what she couldn't find, and tested every formula on herself first.</p>
    <a class="btn btn--ink" href="#/story">Read our story</a></div>
  <div class="envelope" aria-label="A letter from Dr. Jui Gijare"><div class="env-back"></div>
    <div class="letter"><p>Dear parent,</p><p>Growing skin is not small adult skin. It deserves care made just for it: gentle, honest, and tested like it matters, because it does.</p><p>Everything we make goes on my own skin first.</p><p class="sig">Dr. Jui Gijare</p></div>
    <div class="env-front"></div><div class="env-flap"></div><div class="env-seal">${ART.heart(C.blushS).replace('<svg','<svg width="30" height="30"')}</div></div>
</section>`;
function initLetter(root){ const el=$('[data-scene="letter"] .envelope', root); if(!el) return;
  addScene({el, progress:()=>{ const r=el.getBoundingClientRect(); return clamp((innerHeight*0.95 - r.top)/(innerHeight*0.7)); }, update(p){
    const flap = range(p,0,.45), up = range(p,.4,1);
    el.querySelector('.env-flap').style.setProperty('--flap', (-180*flap)+'deg');
    el.querySelector('.env-flap').style.zIndex = flap>.5 ? 1 : 4;
    el.querySelector('.env-seal').style.opacity = 1-flap*2;
    el.querySelector('.letter').style.setProperty('--up', (-62*up)+'%');
  }});
}

/* ---------------- PAGES ---------------- */
function pageHome(){
  const html = `
  <section class="panel hero" id="hero">
    <div class="hero__grid">
      <div>
        <h1 aria-label="Growing skin deserves care."><span class="line"><span>Growing skin</span></span><span class="line"><span>deserves</span></span><span class="line"><span>care.</span></span></h1>
        <p class="lead">Gentle, doctor-formulated sun care and hydration for kids aged 4 to 16. Clinical standards for their skin. Peace of mind for you.</p>
        <div class="hero__ctas"><a class="btn" href="#/shop">Shop the ritual</a><a class="btn btn--ghost" href="#/start-here">Find their ritual</a></div>
      </div>
      <div class="hero__stage" data-parallax>
        <div class="layer hero__cloud" data-depth="10" style="width:38%;left:-4%;top:6%">${ART.cloud()}</div>
        <div class="layer hero__cloud" data-depth="-14" style="width:26%;left:46%;top:30%">${ART.cloud()}</div>
        <div class="layer hero__sun" data-depth="22">${ART.sunFace()}</div>
        <div class="layer hero__prod hero__p1" data-depth="-28">${ART.tube('sunny','Glow','Shield')}</div>
        <div class="layer hero__prod hero__p2" data-depth="-46">${ART.jar()}</div>
        <div class="layer hero__prod hero__p3" data-depth="-34">${ART.tube('blush','Blush &','Block')}</div>
        <span class="sticker pop-in" style="left:2%;bottom:46%;--r:-10deg;--bg:var(--mint);--fg:var(--mint-d)" data-float=".25">Doctor formulated</span>
        <span class="sticker pop-in" style="right:0;top:56%;--r:8deg;--bg:var(--blush);--fg:var(--blush-d);--i:2" data-float="-.2">No white cast</span>
        <p class="hero__note hand" aria-hidden="true">the yellow one is mine!${ART.squiggleArrow()}</p>
        <svg class="spin-badge" style="left:40%;top:-4%" viewBox="0 0 160 160" data-spin aria-label="SPF 60 PA plus plus plus plus">
          <defs><path id="circ" d="M80 80m-58 0a58 58 0 1 1 116 0a58 58 0 1 1-116 0"/></defs>
          <circle cx="80" cy="80" r="78" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
          <text fill="${C.ink}"><textPath href="#circ">SPF 60 · PA++++ · MINERAL · GENTLE ·</textPath></text>
          <g transform="translate(56 56)">${ART.sun(C.sunnyS,48)}</g></svg>
      </div>
    </div>
  </section>

  ${marquee(['Doctor formulated','pH balanced','SPF 60 PA++++','Made for Indian skin','Paraben free','Parent approved'])}

  <section class="section wrap">
    <div class="center"><h2>Three little things<br>for very big days.</h2>
    <p class="lead" style="margin-top:16px">Sun care for school runs and sports days. Moisture for bath time and bedtime. Made by a doctor, for skin that is still growing.</p></div>
    <div class="row-scroll" style="margin-top:40px">${ORDER.map(card).join('')}</div>
    <div class="center" style="margin-top:20px"><a class="btn btn--ink" href="#/shop">Shop everything</a></div>
  </section>

  <section class="day" id="day" aria-label="A sunny day, told in four moments">
    <div class="day__pin">
      ${ART.dayScene()}
      <div class="day__intro"><h2 id="dayIntro">One sunny day.<br>Four little moments.</h2></div>
      <div class="day__cards">
        ${[
          ['7:10 am','The school bus won\'t wait.','Sunscreen goes on with the socks. Glow Shield is a gel, so it\'s on in seconds and doesn\'t leave a white cast on the uniform collar.','I did it myself!','sunny'],
          ['11:30 am','Recess is the brightest hour.','Mineral SPF 60 PA++++ sits on top of little skin like an invisible umbrella, for UVB and UVA.','shield ON','sky'],
          ['4:45 pm','Terrace cricket. One more over.','Reapply at the water break. Blush & Block adds a soft coral tint for the older ones, with the same SPF 60 underneath.','I\'m batting next','blush'],
          ['8:30 pm','Bath, story, sleep.','Cloud Mist Gel puts back what the day took out, with panthenol, cica and hyaluronic acid, in a gel that sinks in before the second page.','goodnight sun','mint']
        ].map(([t,h,p,s,c],i)=>`<article class="beat ${i===0?'':''}" data-beat="${i}"><span class="sticker beat__time" style="--bg:var(--${c});--fg:var(--${c}-d);--r:-3deg">${t}</span><h3>${h}</h3><p>${p}</p><span class="hand">${s}</span></article>`).join('')}
      </div>
      <nav class="day__progress" aria-label="Jump to a moment">${[0,1,2,3].map(i=>`<button data-jump="${i}" aria-label="Moment ${i+1}"></button>`).join('')}</nav>
    </div>
  </section>

  <section class="tiles" id="tiles" aria-label="Our products and what they promise">
    <div class="tiles__pin">
      <div class="tiles__head wrap"><h2>Gentle enough for little faces.<br>Tested like it's for grown-ups.</h2><p class="lead" style="margin-inline:auto">Dermatologically and clinically tested. Made in India, for Indian sun and Indian skin.</p></div>
      <div class="tiles__wall"></div><div class="tiles__ledge"></div>
      <div class="drop drop--1">${ART.tube('sunny','Glow','Shield')}</div>
      <div class="drop drop--2" style="width:clamp(110px,12vw,180px);margin-left:calc(clamp(110px,12vw,180px) / -2)">${ART.jar()}</div>
      <div class="drop drop--3">${ART.tube('blush','Blush &','Block')}</div>
      ${[['pH balanced','sky',6,52,-8],['Paraben free','blush',78,48,6],['Dermatologically tested','sunny',10,80,4],['Non-irritant','mint',64,78,-6],['Sulphate free','lilac',8,64,-3],['Mineral oil free','sky',40,88,5],['Clinically tested','lilac',76,62,4]]
        .map(([t,c,x,y,r],i)=>`<span class="bandaid ${[0,1,4,6].includes(i)?'m-hide':''}" data-x="${x}" data-y="${y}" style="left:${x}%;top:${y}%;--bg:var(--${c});--fg:var(--${c}-d);--r:${r}deg">${t}</span>`).join('')}
    </div>
  </section>

  <section class="panel c-blush rub" id="rub">
    <div>
      <span class="sticker" style="--bg:#fff;--fg:var(--blush-d);--r:-5deg">Try it</span>
      <h2 style="margin:18px 0 16px;color:var(--ink)">Rub it in.<br>Watch it vanish.</h2>
      <p class="lead" style="color:var(--ink)">Kids run from sunscreen that feels sticky or turns them white. Glow Shield is a gel. Drag across the cheek to rub it in.</p>
      <div class="rub__meter"><svg class="ring" viewBox="0 0 80 80"><circle class="bg" cx="40" cy="40" r="32"/><circle class="fg" cx="40" cy="40" r="32" stroke-dasharray="201" stroke-dashoffset="201"/></svg>
        <span class="rub__msg" aria-live="polite">0% rubbed in</span></div>
      <button class="btn btn--ghost btn--sm" id="rubReset">Put more on</button>
    </div>
    <div class="rub__stage" id="rubStage" aria-label="Interactive: drag to rub sunscreen into the cheek">
      ${ART.face()}<canvas></canvas>
      <div class="hint-hand">${ART.handRub()}</div>
      <div class="rub__done"><span class="sticker" style="font-size:1.6rem;--bg:var(--sunny);--fg:var(--sunny-d)">Shield on. No ghost face.</span></div>
    </div>
  </section>

  <section class="panel c-sunny grow" id="grow">
    <div class="door" aria-hidden="true">
      <div class="door__ruler">${[4,6,8,10,12,14,16].map(a=>`<div class="door__mark" style="bottom:${40+(a-4)/12*45}%;width:${a%4===0?46:30}px"><span>${a}</span></div>`).join('')}</div>
      <div class="door__line"><span>age 4</span></div>
      <div class="door__kid">${ART.kid({shirt:C.skyS,shorts:C.ink})}</div>
    </div>
    <div style="color:var(--ink)">
      <span class="sticker" style="--bg:#fff;--fg:var(--sunny-d);--r:4deg">Ages 4 to 16</span>
      <h2 style="margin:18px 0 10px">Care that grows<br>with them.</h2>
      <p class="lead" style="color:var(--ink-2)">Slide to their age. Watch the pencil mark climb the door frame, and see the ritual that fits.</p>
      <label class="sr-only" for="ageSlider">Child's age</label>
      <input class="slider" id="ageSlider" type="range" min="4" max="16" step="1" value="4">
      <div class="ages" aria-hidden="true"><span>4</span><span>8</span><span>12</span><span>16</span></div>
      <div class="stage-card" id="stageCard" aria-live="polite"></div>
    </div>
  </section>

  ${founderLetter()}

  <section class="panel c-lilac section" id="promises">
    <div class="wrap center"><h2 style="color:var(--ink)">Our pinky promises.</h2>
    <p class="lead" style="color:var(--ink-2);margin-top:14px">What we promise every parent, and every kid who has to sit still for sunscreen.</p></div>
    <!-- SWAP: add real parent reviews as extra .slide elements (same markup) -->
    <div class="focus" id="focus">
      ${[
        ['No adult formulas in smaller bottles.','Every product is made for growing skin from the first line of the formula.','sunny'],
        ['Tested on a grown-up first.','Our founder tries every formula on her own skin before it goes near a child\'s.','blush'],
        ['Nothing hiding in the bottle.','No parabens, no sulphates, no mineral oil. Never tested on animals.','mint'],
        ['Textures kids don\'t run from.','Gels that rub in fast and clear, so the morning rush stays a rush, not a battle.','sky'],
        ['Made for Indian sun.','Made in India, for Indian skin, for afternoons that go on and on.','lilac']
      ].map(([h,p,c],i)=>`<article class="slide" style="--bg:var(--${c});--fg:var(--${c}-d)" aria-roledescription="slide" aria-label="${i+1} of 5"><div><div class="pinky">${ART.pinky(PAL[c].d)}</div><h3>${h}</h3><p>${p}</p></div></article>`).join('')}
    </div>
    <div class="focus__nav"><button class="btn btn--ghost btn--sm icon-btn" data-dir="-1" aria-label="Previous promise">${ART.arrowL()}</button><div class="dots" role="tablist">${[0,1,2,3,4].map(i=>`<button data-i="${i}" aria-label="Promise ${i+1}"></button>`).join('')}</div><button class="btn btn--ghost btn--sm icon-btn" data-dir="1" aria-label="Next promise">${ART.arrowR()}</button></div>
  </section>

  <section class="section" style="padding-bottom:30px">
    <div class="wrap center"><h2>Little faces, big feelings.</h2><p class="lead" style="margin-top:14px">Tag your mornings, sports days and bedtime stories. We read every one.</p>
      <a class="btn btn--sky" href="#" style="margin-top:22px" onclick="return false">Follow on Instagram</a></div>
    <!-- SWAP: replace illustrated tiles with real Instagram posts -->
    <div class="gram-wrap" style="margin-top:30px"><div class="gram">${[...ART.gramTiles,...ART.gramTiles].map(t=>`<figure class="gram__tile" style="--bg:${t.bg};--fg:${t.fg};margin:0">${t.art()}<figcaption>${t.cap}</figcaption></figure>`).join('')}</div></div>
  </section>`;
  return { title:'Little Luxe | Growing skin deserves care', html, init(root){
    initHero(root); initDay(root); initTiles(root); initRub($('#rubStage',root)); initGrow(root); initLetter(root); initFocus($('#focus',root));
  }};
}

function initHero(root){
  const stage=$('[data-parallax]',root); if(!stage) return;
  const layers=$$('[data-depth]',stage); let mx=0,my=0;
  const onMove=e=>{ mx=(e.clientX/innerWidth-.5); my=(e.clientY/innerHeight-.5); };
  if(finePointer && !reduced){ addEventListener('pointermove',onMove,{passive:true}); cleanups.push(()=>removeEventListener('pointermove',onMove)); }
  const spin=$('[data-spin]',root), floats=$$('[data-float]',root);
  if(!finePointer && !reduced && window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission!=='function'){
    const onTilt=e=>{ if(e.gamma==null) return; mx=clamp(e.gamma/35,-1,1)*.45; my=clamp((e.beta-50)/35,-1,1)*.35; };
    addEventListener('deviceorientation',onTilt); cleanups.push(()=>removeEventListener('deviceorientation',onTilt)); }
  addScene({el:$('#hero',root), always:true, progress:()=>scrollY, ease:.2, update(y){
    layers.forEach(l=>{ const d=+l.dataset.depth; l.style.transform=`translate(${mx*d}px,${my*d + y*d*-.006}px)`; });
    if(spin) spin.style.transform=`rotate(${y*.25}deg)`;
    floats.forEach(f=>f.style.translate=`0 ${y*+f.dataset.float}px`);
  }});
}

function initDay(root){
  const sec=$('#day',root); if(!sec) return;
  const svg=$('.day__svg',sec), beats=$$('.beat',sec), dots=$$('.day__progress button',sec), props=$$('.prop',svg);
  const skyTop=[[0,'#FFC7A8'],[.3,'#8EC2FF'],[.52,'#7FB2FF'],[.7,'#FF9E7A'],[.82,'#3A2A72'],[1,'#1E1546']];
  const skyBot=[[0,'#FFE9B8'],[.3,'#E3F0FF'],[.52,'#FFF0C2'],[.7,'#FFC59A'],[.82,'#6A4A9A'],[1,'#3B2A6E']];
  const hill=[[0,'#A8E0B8'],[.6,'#9AD8A8'],[.75,'#7DA88C'],[1,'#2F3E6E']], gnd=[[0,'#7FCF97'],[.6,'#74C68C'],[.75,'#5E8F72'],[1,'#26325C']];
  const bld=[[0,'#F1DFFF'],[.6,'#E9D9FF'],[.78,'#8B6FB5'],[1,'#2A2155']];
  const g=id=>svg.querySelector('#'+id);
  let active=-1;
  const setBeat=i=>{ if(i===active) return; active=i; beats.forEach((b,k)=>b.classList.toggle('on',k===i)); dots.forEach((d,k)=>d.classList.toggle('on',k===i));
    props.forEach(pr=>pr.style.transition='opacity .5s'); props.forEach(pr=>pr.setAttribute('opacity', +pr.dataset.beat===i || (i<0 && pr.dataset.beat==='0') ? 1 : 0));
    if(i>=0){ Sound.chime(); } };
  dots.forEach((d,i)=>d.addEventListener('click',()=>{ const top=sec.offsetTop + (sec.offsetHeight-innerHeight)*([.14,.38,.6,.86][i]); scrollTo({top,behavior:reduced?'auto':'smooth'}); }));
  addScene({el:sec, ease:.1, update(p){
    g('skyTop').setAttribute('stop-color',ramp(skyTop,p)); g('skyBot').setAttribute('stop-color',ramp(skyBot,p));
    g('hill').setAttribute('fill',ramp(hill,p)); g('ground').setAttribute('fill',ramp(gnd,p)); g('bld').setAttribute('fill',ramp(bld,p));
    const st=clamp(p/.8), sx=lerp(120,1480,st), sy=780-Math.sin(st*Math.PI)*640;
    g('sunG').setAttribute('transform',`translate(${sx} ${sy})`); g('sunG').setAttribute('opacity', 1-range(p,.74,.84));
    const mt=range(p,.8,1); g('moonG').setAttribute('transform',`translate(${lerp(1300,1180,mt)} ${lerp(820,190,easeOutBack(mt))})`); g('moonG').setAttribute('opacity',range(p,.78,.86));
    g('moonCut').setAttribute('fill',ramp(skyTop,p));
    g('stars').setAttribute('opacity',range(p,.8,.95)); g('win').setAttribute('opacity',range(p,.76,.9)); g('clouds').setAttribute('opacity',.9-range(p,.75,.9)*.7);
    g('clouds').setAttribute('transform',`translate(${p*-260} 0)`);
    const sh = range(p,.3,.4) * (1-range(p,.72,.8));
    g('shield').setAttribute('r', 170*easeOutBack(sh)); g('shield').setAttribute('opacity', sh);
    $('#dayIntro',sec).style.opacity = 1-range(p,.02,.09); $('#dayIntro',sec).style.transform=`scale(${1-range(p,.02,.09)*.1})`;
    setBeat(p<.08 ? -1 : p<.3 ? 0 : p<.52 ? 1 : p<.74 ? 2 : 3);
  }});
}

function initTiles(root){
  const sec=$('#tiles',root); if(!sec) return;
  const drops=$$('.drop',sec), bands=$$('.bandaid',sec); let landed=[false,false,false];
  addScene({el:sec, ease:.16, update(p){
    drops.forEach((d,i)=>{ const t=range(p,.04+i*.08,.36+i*.08); const y=(1-easeOutBounce(t))*-110; d.style.transform=`translateY(${y}vh) rotate(${(1-t)*(i-1)*30}deg)`;
      if(t>=.98 && !landed[i]){ landed[i]=true; Sound.tone(220+i*60,.12,'sine',.25,110); } if(t<.5) landed[i]=false; });
    bands.forEach((b,i)=>{ const t=range(p,.5+i*.05,.66+i*.05); b.style.opacity=t; b.style.transform=`translateY(${(1-easeOutBack(t))*60}px) rotate(${b.style.getPropertyValue('--r')}) scale(${.6+.4*easeOutBack(t)})`; });
  }});
}

function initRub(stage){
  if(!stage) return; const wrap=stage.closest('.rub'); const cv=$('canvas',stage), ctx=cv.getContext('2d');
  const ring=$('.ring .fg', wrap), msg=$('.rub__msg', wrap); let W,H,done=false,down=false,moves=0;
  const blobs=[[.64,.6,.12],[.37,.64,.09],[.52,.4,.08],[.7,.48,.05],[.3,.54,.045]];
  function paint(){ const r=stage.getBoundingClientRect(); const dpr=Math.min(devicePixelRatio||1,2); W=cv.width=r.width*dpr; H=cv.height=r.height*dpr;
    ctx.globalCompositeOperation='source-over'; ctx.clearRect(0,0,W,H);
    blobs.forEach(([x,y,s])=>{ const cx=x*W, cy=y*H, R=s*W;
      ctx.save(); ctx.shadowColor='rgba(43,26,74,.18)'; ctx.shadowBlur=R*.25; ctx.shadowOffsetY=R*.08;
      const g=ctx.createRadialGradient(cx-R*.25,cy-R*.3,R*.05,cx,cy,R*1.05);
      g.addColorStop(0,'#FFFFFF'); g.addColorStop(.75,'#FFFDF7'); g.addColorStop(1,'#FFF4E6');
      ctx.fillStyle=g; ctx.beginPath(); for(let a=0;a<=Math.PI*2+.01;a+=.2){ const rr=R*(1+Math.sin(a*2+x*7)*.06); ctx.lineTo(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.78); } ctx.closePath(); ctx.fill(); ctx.restore();
      ctx.fillStyle='rgba(255,255,255,.95)'; ctx.beginPath(); ctx.ellipse(cx-R*.38,cy-R*.3,R*.22,R*.09,-.5,0,Math.PI*2); ctx.fill();
      ctx.fillStyle='rgba(207,226,255,.55)'; ctx.beginPath(); ctx.ellipse(cx+R*.3,cy+R*.32,R*.3,R*.08,.3,0,Math.PI*2); ctx.fill(); });
    done=false; wrap.classList.remove('done','touched'); setPct(0); base=null; base=coverage(); }
  let base=null;
  function coverage(){ const step=8, d=ctx.getImageData(0,0,W,H).data; let s=0; for(let i=3;i<d.length;i+=4*step) s+=d[i]; return s; }
  function setPct(v){ ring.style.strokeDashoffset = 201*(1-v); msg.textContent = done ? 'All rubbed in. Shield on.' : Math.round(v*100)+'% rubbed in'; }
  function rub(e){ const r=stage.getBoundingClientRect(); const dpr=W/r.width; const x=(e.clientX-r.left)*dpr, y=(e.clientY-r.top)*dpr;
    ctx.globalCompositeOperation='destination-out'; const R=W*.07; const g=ctx.createRadialGradient(x,y,0,x,y,R); g.addColorStop(0,'rgba(0,0,0,.55)'); g.addColorStop(1,'rgba(0,0,0,0)');
    ctx.fillStyle=g; ctx.beginPath(); ctx.arc(x,y,R,0,Math.PI*2); ctx.fill();
    if(++moves%4===0){ const left=coverage()/base; const v=clamp(1-left); setPct(v); if(Math.random()<.5) spark(e.clientX-r.left,e.clientY-r.top);
      if(v>.85 && !done){ done=true; wrap.classList.add('done'); ctx.clearRect(0,0,W,H); setPct(1); Sound.sparkle(); buzz([10,50,10,50,20]); const rr=stage.getBoundingClientRect(); confetti(rr.left+rr.width/2, rr.top+rr.height/2, 18); } } }
  function spark(x,y){ if(reduced) return; const s=document.createElement('div'); s.className='sparkle'; s.innerHTML=ART.star(C.sunnyS); s.style.left=(x-9+Math.random()*30-15)+'px'; s.style.top=(y-9+Math.random()*30-15)+'px'; stage.appendChild(s); setTimeout(()=>s.remove(),700); }
  stage.addEventListener('pointerdown',e=>{ down=true; wrap.classList.add('touched'); stage.setPointerCapture(e.pointerId); rub(e); });
  stage.addEventListener('pointermove',e=>{ if(down && !done) rub(e); });
  const up=()=>down=false; stage.addEventListener('pointerup',up); stage.addEventListener('pointercancel',up);
  $('#rubReset',wrap).addEventListener('click',paint);
  // keyboard fallback
  stage.tabIndex=0; stage.addEventListener('keydown',e=>{ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); done=true; wrap.classList.add('done','touched'); ctx.clearRect(0,0,W,H); setPct(1); Sound.sparkle(); } });
  const ro=new ResizeObserver(()=>paint()); ro.observe(stage); cleanups.push(()=>ro.disconnect());
}

const STAGES = [
  {max:7, name:'Little explorer', note:'You apply, they giggle. Make it a game: dot, dot, dot, then rub.', ritual:['glow-shield','cloud-mist'], kid:'still needs help with the cap'},
  {max:12, name:'Big kid, bigger opinions', note:'They want to do it themselves. Let them, then check the ears and the back of the neck.', ritual:['glow-shield','cloud-mist'], kid:'"I can do it MYSELF"'},
  {max:16, name:'Teen, mostly', note:'A tinted SPF they actually want to wear on school days, and a light gel that never feels greasy.', ritual:['blush-block','cloud-mist'], kid:'"can I borrow yours?" "no, this one is yours"'}
];
function initGrow(root){
  const s=$('#ageSlider',root); if(!s) return; const kid=$('.door__kid',root), line=$('.door__line',root), card=$('#stageCard',root); let lastStage=-1;
  const upd=(fromUser)=>{ const a=+s.value, t=(a-4)/12; s.style.setProperty('--p',(t*100)+'%');
    kid.style.height=(40+t*45)+"%";
    const bottom = 40 + t*45; line.style.bottom = `calc(${bottom}% + 0px)`; line.querySelector('span').textContent='age '+a;
    const si=STAGES.findIndex(x=>a<=x.max), st=STAGES[si];
    if(si!==lastStage){ lastStage=si; card.innerHTML=`<div class="stage-swap"><span class="hand" style="font-size:1.3rem;color:var(--blush-d)">${st.kid}</span><h3>${st.name}</h3><p style="margin:0;color:var(--ink-2)">${st.note}</p>
      <div class="ritual">${st.ritual.map(id=>`<a class="bandaid" href="#/product/${id}" style="--bg:${pal(id).l};--fg:${pal(id).d};text-decoration:none">${P(id).name}</a>`).join('')}</div>
      <div style="margin-top:18px;display:flex;gap:12px;flex-wrap:wrap"><button class="btn btn--sm" data-add-ritual="${st.ritual.join(',')}">Add this ritual</button><a class="btn btn--ghost btn--sm" href="#/start-here">Take the 3-question quiz</a></div></div>`; }
    if(fromUser){ Sound.tick(a-4); buzz(5); }
  };
  s.addEventListener('input',()=>upd(true)); upd(false);
  card.addEventListener('click',e=>{ const b=e.target.closest('[data-add-ritual]'); if(!b) return; b.dataset.addRitual.split(',').forEach((id,i)=>setTimeout(()=>addToBag(id,b),i*250)); });
}

function initFocus(el){
  if(!el) return; const slides=$$('.slide',el), n=slides.length, wrap=el.parentElement, dots=$$('.dots button',wrap); let i=0, timer;
  const go=k=>{ i=(k+n)%n; slides.forEach((s,j)=>{ s.classList.remove('active','prev','next'); if(j===i) s.classList.add('active'); else if(j===(i-1+n)%n) s.classList.add('prev'); else if(j===(i+1)%n) s.classList.add('next'); s.setAttribute('aria-hidden', String(j!==i)); });
    dots.forEach((d,j)=>{ d.classList.toggle('on',j===i); d.setAttribute('aria-selected', String(j===i)); }); };
  $$('[data-dir]',wrap).forEach(b=>b.addEventListener('click',()=>{ go(i+ +b.dataset.dir); restart(); }));
  dots.forEach((d,j)=>d.addEventListener('click',()=>{ go(j); restart(); }));
  slides.forEach((s,j)=>s.addEventListener('click',()=>{ if(j!==i){ go(j); Sound.pop(); restart(); } }));
  let sx=0; el.addEventListener('pointerdown',e=>sx=e.clientX); el.addEventListener('pointerup',e=>{ const dx=e.clientX-sx; if(Math.abs(dx)>50){ go(i+(dx<0?1:-1)); Sound.pop(); buzz(8); restart(); } });
  const restart=()=>{ clearInterval(timer); if(!reduced) timer=setInterval(()=>go(i+1),5200); };
  go(0); restart(); cleanups.push(()=>clearInterval(timer));
}

function pageShop(cat='all'){
  const tabs=[['all','Everything'],['sun','Sun care'],['hydration','Hydration'],['kits','Kits']];
  const html=`${pageHero('c-sky','Everything their skin needs. Nothing it doesn\'t.','Three doctor-formulated essentials for ages 4 to 16, and a kit that has all of them.', ART.sunFace())}
  <section class="wrap" style="padding-top:10px">
    <div class="tabs" role="group" aria-label="Filter products">${tabs.map(([k,l])=>`<button class="btn btn--sm tab" data-cat="${k}" aria-pressed="${k===cat}">${l}</button>`).join('')}</div>
    <div class="cards" id="shopGrid"></div>
  </section>
  <section class="panel c-lilac section" style="margin-top:70px">
    <div class="wrap" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:40px;align-items:center">
      <div style="width:min(380px,100%);justify-self:center">${ART.box()}</div>
      <div style="color:var(--ink)"><span class="sticker" style="--bg:var(--sunny);--fg:var(--sunny-d)">Festive offer</span>
        <h2 style="margin:16px 0 12px">Not sure where to start? Start with all three.</h2>
        <p class="lead" style="color:var(--ink-2)">The First Glow Ritual Kit has Glow Shield, Blush & Block and Cloud Mist Gel, a note from our founder and a seed-paper bookmark you can plant together.</p>
        <p class="price" style="font-size:2rem;margin:10px 0 20px">${fmt(599)} <s>${fmt(945)}</s></p>
        <div style="display:flex;gap:14px;flex-wrap:wrap"><button class="btn" data-add="first-glow-kit">Add the kit to bag</button><button class="btn btn--ghost" data-add="first-glow-kit" data-n="3">Add 3, get 1 free</button></div></div>
    </div></section>
  ${marquee(['Gentle','Doctor formulated','Tested on our founder first','Made in India','Ages 4 to 16'],'c-mint',false)}`;
  return { title:'Shop | Little Luxe', html, init(root){
    const grid=$('#shopGrid',root);
    const draw=c=>{ grid.innerHTML=ORDER.filter(id=>c==='all'||P(id).cat===c).map(card).join(''); $$('.pop-in',grid).forEach(x=>io.observe(x)); };
    $$('.tab',root).forEach(t=>t.addEventListener('click',()=>{ $$('.tab',root).forEach(x=>x.setAttribute('aria-pressed',String(x===t))); draw(t.dataset.cat); history.replaceState(null,'','#/shop'+(t.dataset.cat==='all'?'':'/'+t.dataset.cat)); }));
    draw(cat);
  }};
}

function pageProduct(id){
  const p=P(id); if(!p) return pageNotFound();
  const pl=pal(id);
  const views=[['Pack',p.art()],['Texture',ART.texture(p.pal)],['In the school bag',ART.schoolbag(p.pal)],['Little user',ART.kid({shirt:pl.s,shorts:C.ink,cap:p.cat==='sun'})]];
  const pairs=ORDER.filter(x=>x!==id).slice(0,3);
  const html=`<section class="pdp">
    <div class="gallery">
      <div class="gallery__thumbs" role="group" aria-label="Product views">${views.map(([l,a],i)=>`<button class="thumb" style="--bg:${pl.l}" data-view="${i}" aria-pressed="${i===0}" aria-label="${l}">${a}</button>`).join('')}</div>
      <div class="gallery__main" id="mainView" style="--bg:${pl.l};--fg:${pl.d}">${views[0][1]}
        <span class="sticker" style="position:absolute;top:20px;left:20px;--bg:#fff;--fg:${pl.d};--r:-6deg">${p.badge}</span>
        <span class="sticker" style="position:absolute;bottom:22px;right:20px;--bg:${pl.s};--fg:#fff;--r:5deg;border-color:#fff">Ages 4–16</span></div>
    </div>
    <div>
      <a href="#/shop" class="ui" style="text-decoration:none;color:var(--ink-2)">← All products</a>
      <h1>${p.name}</h1><p class="pdp__sub">${p.sub}</p>
      <div class="pdp__buy"><span class="price" style="font-size:2rem">${fmt(p.price)}${p.mrp?`<s>${fmt(p.mrp)}</s>`:''}</span>
        <div class="qty qty--lg" role="group" aria-label="Quantity"><button id="qMinus" aria-label="Fewer">−</button><span id="qVal">1</span><button id="qPlus" aria-label="More">+</button></div>
        <button class="btn" id="pdpAdd" style="--bg:${pl.s};--sh:var(--ink)">Add to bag</button></div>
      <div class="pdp__claims">${claimBand(p.claims,[p.pal,'mint','sky','lilac'])}</div>
      ${acc([
        ['What it does', `<p>${p.what}</p>`],
        ['How to use it', `<ol>${p.how.map(h=>`<li>${h}</li>`).join('')}</ol>`],
        ['What\'s inside', `<ul>${p.key.map(([k,v])=>`<li><b>${k}:</b> ${v}</li>`).join('')}</ul><p style="margin-top:10px"><a href="#/inside">See every ingredient explained</a></p>`],
        ['What\'s never inside', `<p>No parabens. No sulphates. No mineral oil. Not tested on animals. Dermatologically tested, clinically tested, pH balanced and non-irritant.</p>`]
      ])}
    </div>
  </section>
  ${p.cat==='sun'?`<section class="panel c-blush rub" id="rub" style="margin-top:40px">
    <div><h2 style="margin:0 0 16px;color:var(--ink)">Feel the texture.</h2><p class="lead" style="color:var(--ink)">Drag across the cheek to rub it in. A gel that disappears, not a paste that stays.</p>
      <div class="rub__meter"><svg class="ring" viewBox="0 0 80 80"><circle class="bg" cx="40" cy="40" r="32"/><circle class="fg" cx="40" cy="40" r="32" stroke-dasharray="201" stroke-dashoffset="201"/></svg><span class="rub__msg" aria-live="polite">0% rubbed in</span></div>
      <button class="btn btn--ghost btn--sm" id="rubReset">Put more on</button></div>
    <div class="rub__stage" id="rubStage" aria-label="Interactive: drag to rub sunscreen into the cheek">${ART.face()}<canvas></canvas><div class="hint-hand">${ART.handRub()}</div><div class="rub__done"><span class="sticker" style="font-size:1.6rem">Shield on. No ghost face.</span></div></div>
  </section>`:''}
  <section class="section wrap"><h2 class="center" style="margin-bottom:36px">Pairs well with</h2><div class="cards">${pairs.map(card).join('')}</div></section>
  <div class="sticky-buy" id="stickyBuy"><div><b class="ui" style="font-size:1.1rem">${p.name}</b><div class="price" style="font-size:1rem">${fmt(p.price)}</div></div><button class="btn btn--sm" data-add="${id}" style="--bg:${pl.s}">Add to bag</button></div>`;
  return { title:`${p.name} | Little Luxe`, html, init(root){
    let q=1; const qv=$('#qVal',root);
    $('#qMinus',root).onclick=()=>{ q=Math.max(1,q-1); qv.textContent=q; Sound.pop(); };
    $('#qPlus',root).onclick=()=>{ q=Math.min(9,q+1); qv.textContent=q; Sound.pop(); };
    $('#pdpAdd',root).onclick=e=>addToBag(id,e.currentTarget,q);
    $$('.thumb',root).forEach(t=>t.addEventListener('click',()=>{ $$('.thumb',root).forEach(x=>x.setAttribute('aria-pressed',String(x===t)));
      const mv=$('#mainView',root); const art=mv.querySelector(':scope > svg'); art.outerHTML=views[+t.dataset.view][1]; const n=mv.querySelector(':scope > svg'); n.animate([{transform:'scale(.7) rotate(-8deg)',opacity:0},{transform:'none',opacity:1}],{duration:450,easing:'cubic-bezier(.34,1.56,.64,1)'}); }));
    initRub($('#rubStage',root));
    const sb=$('#stickyBuy',root), ob=new IntersectionObserver(([en])=>{ const on=!en.isIntersecting && en.boundingClientRect.top<0; sb.classList.toggle('show',on); document.body.classList.toggle('has-sticky',on); }); cleanups.push(()=>document.body.classList.remove('has-sticky')); ob.observe($('#pdpAdd',root)); cleanups.push(()=>ob.disconnect());
  }};
}

function pageStory(){
  // EDIT: chapter copy is based on the founder story on littleluxe.in; add dates/photos when available.
  const ch=[
    ['The search','Her son needed sunscreen and a moisturiser. The shelves offered adult formulas, just in smaller bottles.','sunny'],
    ['A doctor\'s checklist','As a doctor, Dr. Jui Gijare wrote down what growing skin actually needs: gentle, pH balanced, non-irritating, and nothing it doesn\'t need.','sky'],
    ['Tested on herself first','Every formula went on her own skin before it went anywhere near a child\'s. It still does.','blush'],
    ['Three little things','Glow Shield, Blush & Block and Cloud Mist Gel. Dermatologically and clinically tested, made in India for Indian skin.','mint'],
    ['Growing with them','For kids, tweens and teens aged 4 to 16, and for the parents who want peace of mind.','lilac']
  ];
  const html=`${pageHero('c-blush','It started with one little boy and a mum who reads every label.','Little Luxe is skincare made by a doctor, for skin that is still growing. Here is how it began.', ART.kid({shirt:C.sunnyS,shorts:C.ink}))}
  <section class="section wrap"><div class="tl" id="tl"><div class="tl__line"><div class="tl__fill"></div></div>
    ${ch.map(([h,p,c],i)=>`<div class="tl__item"><span class="tl__pin">${i+1}</span><div class="tl__card pop-in" style="--bg:var(--${c});--fg:var(--${c}-d)"><span class="hand" style="font-size:1.3rem">chapter ${i+1}</span><h3>${h}</h3><p>${p}</p></div></div>`).join('')}
  </div></section>
  ${founderLetter()}
  ${marquee(['Clinical standards for their skin','Peace of mind for you'],'c-blush',true)}
  <section class="section wrap center"><h2>Ready for their first glow?</h2><p class="lead" style="margin-top:14px">The kit has all three products and a note from Dr. Jui.</p>
    <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap;margin-top:24px"><a class="btn" href="#/product/first-glow-kit">See the kit</a><a class="btn btn--ghost" href="#/start-here">Find their ritual</a></div></section>`;
  return { title:'Our story | Little Luxe', html, init(root){
    const tl=$('#tl',root); addScene({el:tl, progress:()=>{ const r=tl.getBoundingClientRect(); return clamp((innerHeight*.6-r.top)/r.height); }, update(p){ tl.querySelector('.tl__fill').style.height=(p*100)+'%'; }});
    initLetter(root);
  }};
}

function pageQuiz(){
  const Q=[
    ['How old is your little one?',[['4 to 7','Little explorer','still needs help with the cap','sunny'],['8 to 12','Big kid','wants to do it themselves','sky'],['13 to 16','Teen','has opinions about everything','lilac']]],
    ['What does their day look like?',[['Mostly indoors','School, books, home','the walk to the bus counts','mint'],['School and playground','Recess in the sun','monkey bars, every day','sunny'],['Sports all day','Nets, matches, the pool','one more over, always','blush']]],
    ['What do they say about skincare?',[['"Do I have to?"','They want it fast','10 seconds, max','sky'],['"It feels sticky!"','They want it light','gel, not cream','mint'],['"Can I have what you use?"','They want to feel grown-up','tinted, please','blush']]]
  ];
  const html=`${pageHero('c-mint','Find their ritual in three taps.','Tell us a little about your child. We will suggest a morning, after-play and bedtime routine that fits.', ART.schoolbag('mint'))}
  <section class="quiz" id="quiz" style="margin-top:40px"></section>`;
  return { title:'Start here | Little Luxe', html, init(root){
    const box=$('#quiz',root), ans=[];
    const draw=()=>{ const k=ans.length;
      if(k<Q.length){ const [q,opts]=Q[k];
        box.innerHTML=`<div class="quiz__bar" aria-hidden="true"><span style="--w:${k/Q.length*100}%"></span></div><div class="quiz__q stage-swap"><p class="ui" style="color:var(--ink-2)">Question ${k+1} of ${Q.length}</p><h2>${q}</h2>
          <div class="opts">${opts.map(([a,b,c,col],i)=>`<button class="opt" style="--bg:var(--${col});--fg:var(--${col}-d)" data-a="${i}"><b>${a}</b><span>${b}</span><span class="hand">${c}</span></button>`).join('')}</div>
          ${k?`<button class="ui" style="margin-top:22px;text-decoration:underline" id="qBack">Back</button>`:''}</div>`;
        $$('.opt',box).forEach(o=>o.onclick=()=>{ ans.push(+o.dataset.a); Sound.tick(ans.length*3); buzz(10); draw(); });
        const b=$('#qBack',box); if(b) b.onclick=()=>{ ans.pop(); draw(); };
      } else result();
      box.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
    };
    const result=()=>{
      const [age,day,says]=ans; const day1 = (age===2||says===2) ? 'blush-block' : 'glow-shield';
      const ritual=[['Morning',day1, day1==='blush-block'?'A soft coral tint with SPF 60 PA++++, on before school.':'One quick layer before the bus. Ears and neck too.'],
        ['After play', day1, day===2?'Reapply at every water break and after the pool.':day===1?'Reapply after recess or the evening game.':'A top-up before any time outdoors.'],
        ['Bedtime','cloud-mist','Cloud Mist Gel after bath, smoothed on in big cloud circles.']];
      const ids=[...new Set(ritual.map(r=>r[1]))];
      box.innerHTML=`<div class="quiz__bar" aria-hidden="true"><span style="--w:100%"></span></div><div class="stage-swap"><span class="sticker" style="--bg:var(--sunny);--fg:var(--sunny-d)">Their ritual</span>
        <h2 style="font-size:clamp(2rem,4.6vw,3.6rem);margin:16px 0 24px">Here's a day of care that fits.</h2>
        <div style="display:grid;gap:18px">${ritual.map(([t,id,txt],i)=>{ const pl=pal(id); return `<div class="tl__card" style="--bg:${pl.l};--fg:${pl.d};display:grid;grid-template-columns:90px 1fr;gap:18px;align-items:center"><div style="height:110px;display:grid;place-items:center">${P(id).art().replace('<svg','<svg style="height:110px;width:auto"')}</div><div><span class="hand" style="font-size:1.3rem">${i+1}. ${t}</span><h3 style="margin:4px 0 6px">${P(id).name}</h3><p>${txt}</p></div></div>`; }).join('')}</div>
        <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:28px"><button class="btn" id="addRitual">Add the ritual to bag</button><a class="btn btn--lilac" href="#/product/first-glow-kit">Or get all three in the kit (${fmt(599)})</a><button class="btn btn--ghost" id="again">Start again</button></div></div>`;
      Sound.sparkle(); const r=box.getBoundingClientRect(); confetti(innerWidth/2, Math.max(120,r.top+80), 30);
      $('#addRitual',box).onclick=e=>ids.forEach((id,i)=>setTimeout(()=>addToBag(id,e.target),i*260));
      $('#again',box).onclick=()=>{ ans.length=0; draw(); };
    };
    draw(); window.scrollTo(0,0);
  }};
}

function pageInside(){
  const I=[
    ['Panthenol (vitamin B5)','drop','sky','Helps skin hold on to moisture and supports a healthy skin barrier.','A drink of water your skin can save for later.'],
    ['Cica','leaf','mint','A plant extract (Centella asiatica) known for calming and soothing skin.','A leafy helper that tells grumpy skin, "shh, it\'s okay."'],
    ['Hyaluronic acid','drop','lilac','Draws water into the skin so it feels soft, plump and comfortable.','A tiny sponge that makes cheeks squishy-soft.'],
    ['Mineral UV filters','sun','sunny','Form a protective layer on the skin to help block UVA and UVB rays.','An invisible umbrella for your face, even when it\'s not raining.'],
    ['Coral tint','heart','blush','A sheer tint in Blush & Block that evens out the look of skin, with SPF underneath.','Rosy cheeks, like you just won the race.'],
  ]; // EDIT: confirm full INCI list with the brand
  const ic={drop:ART.drop,leaf:ART.leaf,sun:(c)=>ART.sun(c,64),heart:ART.heart,shield:(c)=>ART.shield(c),check:(c)=>ART.check(c),star:ART.star};
  const html=`${pageHero('c-mint','Read the label with us.','Every ingredient explained twice: once for you, once for them. Flip the switch.', ART.jar())}
  <section class="section wrap" style="padding-top:40px">
    <div class="center"><p class="ui" style="margin:0 0 4px;color:var(--ink-2)">Explain it</p><div class="switch" role="group" aria-label="Explain it"><button aria-pressed="true" data-mode="parent">For parents</button><button aria-pressed="false" data-mode="kid">For kids</button></div></div>
    <div class="ingr" style="margin-top:40px" id="ingr">${I.map(([n,icn,c,par,kid],i)=>`<article class="icard pop-in" style="--bg:var(--${c});--fg:var(--${c}-d);--i:${i}">${ic[icn](PAL[c].s)}<h3>${n}</h3><p class="txt" data-parent="${par.replace(/"/g,'&quot;')}" data-kid="${kid.replace(/"/g,'&quot;')}">${par}</p></article>`).join('')}</div>
  </section>
  <section class="panel c-ink section center"><h2 style="color:#fff">What's never inside.</h2><p class="lead" style="margin:14px auto 0;opacity:.85">Scroll down and watch us cross them out.</p>
    <div class="never" id="never">${NEVER.map(n=>`<span class="never__item" style="color:#fff">${n}<svg viewBox="0 0 300 60" preserveAspectRatio="none"><path d="M5 40 C 60 10, 120 50, 180 22 S 270 30, 295 18"/></svg></span>`).join('')}</div>
    <p class="hand" style="font-size:1.6rem;margin-top:30px;color:var(--sunny)">and never tested on animals</p></section>
  <section class="section wrap"><h2 class="center">Tested, checked, and double-checked.</h2>
    <div class="certs">${CERTS.map(([t,icn],i)=>{ const c=['sunny','mint','sky','blush','lilac'][i%5]; return `<div class="cert pop-in" style="--i:${i}">${ic[icn](PAL[c].s)}<span>${t}</span></div>`; }).join('')}</div></section>`;
  return { title:'What\'s inside | Little Luxe', html, init(root){
    $$('.switch button',root).forEach(b=>b.addEventListener('click',()=>{ $$('.switch button',root).forEach(x=>x.setAttribute('aria-pressed',String(x===b)));
      $$('.icard .txt',root).forEach((t,i)=>{ t.animate([{opacity:1,transform:'none'},{opacity:0,transform:'translateY(8px)'}],{duration:160}).onfinish=()=>{ t.textContent=t.dataset[b.dataset.mode]; t.className='txt '+(b.dataset.mode==='kid'?'kid':''); t.animate([{opacity:0,transform:'translateY(-8px)'},{opacity:1,transform:'none'}],{duration:260,easing:'cubic-bezier(.34,1.56,.64,1)'}); }; }); }));
    io.observe($('#never',root));
  }};
}

function pageFaq(){
  const G=[
    ['Sun care basics','sunny',[
      ['Do kids really need sunscreen every day?','On any day they are outside, yes, including cloudy and monsoon days, because UV gets through clouds. School runs, recess and terrace play all add up.'],
      ['How much should I use?','Enough to cover every exposed bit in a visible layer: face, ears, neck, arms and legs. Most people use too little, so be generous.'],
      ['How often do we reapply?','Every two hours outdoors, and straight after swimming, towelling off or a very sweaty game.'],
      ['Glow Shield or Blush & Block?','Both are SPF 60 PA++++. Glow Shield is a non-chalky gel that moisturises too. Blush & Block adds a soft coral tint, which tweens and teens often love.']]],
    ['Ages and routines','sky',[
      ['What ages is Little Luxe for?','Our range is made for kids, tweens and teens aged 4 to 16.'],
      ['Can my child apply it themselves?','Yes, and we encourage it. For younger ones, do a quick check of the ears, hairline and back of the neck.'],
      ['My child is under 4. Can we use it?','Our range is formulated for ages 4 to 16. For younger children, please ask your paediatrician.']]],
    ['Ingredients and safety','mint',[
      ['How is it tested?','Every product is dermatologically tested, clinically tested, pH balanced and non-irritant. Our founder also tests each formula on herself first.'],
      ['What is never inside?','No parabens, no sulphates and no mineral oil. We never test on animals.'],
      ['My child has sensitive skin. Any tips?','Try a small amount on the inner arm first and wait a day. If you see redness or irritation, stop using it and check with your doctor.']]],
    ['Orders and offers','lilac',[
      ['What is in the First Glow Ritual Kit?','Glow Shield, Blush & Block and Cloud Mist Gel, plus a founder note and a seed-paper bookmark.'],
      ['How does "buy 3 kits, get 1 free" work?','Add three First Glow Ritual Kits to your bag and the fourth one is on us.'],
      ['How long does delivery take?','Delivery options and charges are shown at checkout.']]] // EDIT: add shipping policy
  ];
  const html=`${pageHero('c-sunny','Questions parents ask us.','Short answers to the things you\'re wondering about at 11 pm.', ART.sunFace())}
  <div class="wrap"><div class="tabs" role="group" aria-label="Jump to a topic">${G.map(([g,c],i)=>`<button class="btn btn--sm btn--${c==='sunny'?'sun':c}" data-jumpto="faq-${i}">${g}</button>`).join('')}</div></div>
  <section class="faq">${G.map(([g,c,qs],i)=>`<div id="faq-${i}" style="scroll-margin-top:110px"><h2>${g}</h2>${acc(qs.map(([q,a])=>[q,`<p>${a}</p>`]),-1).replace('class="acc"',`class="acc" style="box-shadow:6px 6px 0 var(--${c}-d)"`)}</div>`).join('')}
    <div class="panel c-blush" style="margin:0;padding:clamp(24px,4vw,44px);display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap"><div style="color:var(--ink)"><h3>Still wondering?</h3><p style="margin:6px 0 0">Our three-question quiz suggests a routine in under a minute.</p></div><a class="btn btn--ink" href="#/start-here">Take the quiz</a></div>
  </section>`;
  return { title:'FAQ | Little Luxe', html, init(root){
    $$('[data-jumpto]',root).forEach(b=>b.addEventListener('click',()=>$('#'+b.dataset.jumpto,root).scrollIntoView({behavior:reduced?'auto':'smooth'})));
    $$('details',root).forEach(d=>d.addEventListener('toggle',()=>{ if(d.open) Sound.pop(); }));
  }};
}

const NOTES=[
  ['How much sunscreen does a six-year-old actually need?','Sun care','sunny',()=>ART.tube('sunny','Glow','Shield'),'Short answer: more than you think. Here is a simple way to get the amount right without a measuring spoon, and how to make reapplying part of the day.'],
  ['The school-bag skincare kit','Routines','sky',()=>ART.schoolbag('sunny'),'Water bottle, tiffin, sunscreen. What to pack for school days, sports days and trips, and how to get them to actually use it.'],
  ['Why kids\' skin isn\'t small adult skin','Skin science','mint',()=>ART.kid({shirt:C.mintS,shorts:C.ink}),'Growing skin is still building its barrier. What that means for the products you choose, explained without the jargon.'],
  ['Monsoon is not a day off from SPF','Seasons','lilac',()=>ART.cloud(C.lilacS),'Grey skies still let UV through. A rainy-season routine that works with gumboots and wet hair.'],
  ['"Can I use your products?" A guide for parents of teens','Teens','blush',()=>ART.tube('blush','Blush &','Block'),'When your teen reaches for your shelf, here is what to say yes to, and what to swap for something made for them.'],
  ['The five-minute bath-time ritual','Routines','mint',()=>ART.jar(),'Turn moisturising into the calmest part of the evening: a small routine kids look forward to.']
]; // EDIT: replace with real articles
function pageNotes(){
  const html=`${pageHero('c-lilac','Small reads for busy parents.','Sun, skin and routines, explained in the time it takes to boil the milk.', ART.box())}
  <section class="section wrap" style="padding-top:50px"><div class="notes">${NOTES.map(([t,cat,c,art],i)=>`<button class="note pop-in" style="--i:${i}" data-note="${i}"><div class="note__cover" style="--bg:var(--${c})">${art()}</div><div class="note__body"><span class="note__meta">${cat}, 3 min read</span><h3>${t}</h3></div></button>`).join('')}</div></section>`;
  return { title:'Skin Notes | Little Luxe', html, init(root){
    $$('[data-note]',root).forEach(b=>b.addEventListener('click',()=>{ const [t,cat,c,art,intro]=NOTES[+b.dataset.note];
      $('#readerBody').innerHTML=`<div class="note__cover" style="--bg:var(--${c});border-radius:28px;margin-bottom:20px">${art()}</div><span class="note__meta">${cat}</span><h2 style="font-size:clamp(2rem,4vw,3rem);margin:8px 0 16px">${t}</h2><p class="lead" style="max-width:none">${intro}</p><p>The full note is being written. Join the Sunday skin note at the bottom of the page and we will send it to you first.</p>`;
      openReader(true); }));
  }};
}
function openReader(v){ const r=$('#reader'); r.classList.toggle('open',v); r.setAttribute('aria-hidden',String(!v)); if(v){ Sound.swish(); setTimeout(()=>$('#reader .reader__card button').focus(),60); } }

function pageNotFound(){
  return { title:'Not found | Little Luxe', html:`${pageHero('c-sky','This page went out to play.','It is probably on the terrace with a cricket bat. Let\'s get you back home.', ART.kid({shirt:C.blushS,shorts:C.ink,cap:true}))}<div class="wrap" style="padding:40px 0 80px"><a class="btn" href="#/">Back to home</a></div>`, init(){} };
}

/* ---------------- ROUTER ---------------- */
const ROUTES=[
  [/^#?\/?$/, ()=>pageHome()],
  [/^#\/shop(?:\/(\w+))?$/, m=>pageShop(m[1]||'all')],
  [/^#\/product\/([\w-]+)$/, m=>pageProduct(m[1])],
  [/^#\/story$/, ()=>pageStory()],
  [/^#\/start-here$/, ()=>pageQuiz()],
  [/^#\/inside$/, ()=>pageInside()],
  [/^#\/faq$/, ()=>pageFaq()],
  [/^#\/skin-notes$/, ()=>pageNotes()],
];
let first=true;
function route(){
  const h=location.hash||'#/'; let page=null;
  for(const [re,fn] of ROUTES){ const m=h.match(re); if(m){ page=fn(m); break; } }
  if(!page) page=pageNotFound();
  const main=$('#app');
  const swap=()=>{
    cleanups.forEach(f=>{ try{f();}catch(e){} }); cleanups=[]; scenes=[];
    main.innerHTML=page.html; document.title=page.title; scrollTo(0,0);
    main.classList.remove('leaving'); main.classList.remove('entering'); void main.offsetWidth; main.classList.add('entering');
    page.init(main); $$('.pop-in',main).forEach(x=>io.observe(x));
    $$('.nav a, .menu__links a').forEach(a=>a.toggleAttribute('aria-current', a.getAttribute('href')===h));
  };
  openMenu(false); openCart(false); openReader(false);
  if(first||reduced){ first=false; swap(); } else { Sound.swish(); main.classList.add('leaving'); setTimeout(swap,200); }
}

/* ---------------- CHROME (menu, sound, newsletter) ---------------- */
function openMenu(v){ const m=$('#menu'); m.classList.toggle('open',v); m.setAttribute('aria-hidden',String(!v)); $('#menuBtn').setAttribute('aria-expanded',String(v)); if(v){ Sound.swish(); buzz(6); setTimeout(()=>$('#menu .menu__close').focus(),60); } }
function chrome(){
  $('#menuProds').innerHTML=ORDER.map(id=>`<a class="menu__prod" href="#/product/${id}" style="--bg:${pal(id).l};--fg:${pal(id).d}">${P(id).art()}<span>${P(id).name}</span></a>`).join('');
  $('#menuBtn').onclick=()=>openMenu(true);
  $$('[data-close-menu]').forEach(b=>b.onclick=()=>openMenu(false));
  $$('[data-close-reader]').forEach(b=>b.onclick=()=>openReader(false));
  $$('.sound-btn').forEach(b=>b.onclick=()=>{ Sound.init(); Sound.set(!Sound.on); hideHint(); if(Sound.on) setTimeout(()=>Sound.sparkle(),60); toast(Sound.on?'Little sounds on.':'Little sounds off.'); });
  Sound.set(Sound.on);
  if(!Sound.on || reduced || store.get('ll-hint-done',false)) hideHint();
  document.documentElement.style.setProperty('--announce-h', $('.announce').offsetHeight+'px');
  $('#checkout').onclick=()=>toast('Checkout connects to the Little Luxe Shopify store when this goes live.');
  $('#nl').onsubmit=e=>{ e.preventDefault(); const i=$('#nl input'); if(!/^\S+@\S+\.\S+$/.test(i.value)){ i.focus(); toast('Add an email address like name@example.com.'); return; }
    const b=$('#nl button'), r=b.getBoundingClientRect(); confetti(r.left+r.width/2,r.top,30); Sound.sparkle(); b.textContent="You're on the list"; i.value=''; $('#nlMsg').textContent='Look out for the Sunday skin note.'; };
  addEventListener('keydown',e=>{ if(e.key==='Escape'){ openMenu(false); openCart(false); openReader(false); } });
  $('#footMarquee').outerHTML = marquee(['Little skin','Big days','Growing skin deserves care'],'c-blush',false);
  $('#footClaims').innerHTML = claimBand(['Dermatologically tested','Clinically tested','pH balanced','Non-irritant','Paraben free','Sulphate free','Mineral oil free','Not tested on animals']);
  $('#bagIcon').innerHTML=ART.bag(); $('#menuIcon').innerHTML=ART.menu(); $$('.x-icon').forEach(x=>x.innerHTML=ART.close()); $$('.snd-icon').forEach(x=>x.innerHTML=ART.sound());
  $('#logoDot').outerHTML='<span class="dot" aria-hidden="true"></span>';
  Cart.render();
}

chrome();
addEventListener('hashchange',route);
route();
requestAnimationFrame(frame);
})();
