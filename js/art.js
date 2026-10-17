/* ==========================================================
   LITTLE LUXE — illustration library (inline SVG)
   SWAP: replace any ART.* call with <img src="..."> of real
   packshots / lifestyle photos when available.
   ========================================================== */
const C = {
  ink:'#2B1A4A', paper:'#FFFFFF', cloud:'#F7F3FF',
  sunny:'#FFE68F', sunnyD:'#8A5200', sunnyS:'#F2B705',
  blush:'#FFD0C7', blushD:'#B5223F', blushS:'#E2405A',
  mint:'#C9F0DF', mintD:'#0B6B50', mintS:'#17A57C',
  sky:'#CFE2FF', skyD:'#2449B8', skyS:'#4F7BF0',
  lilac:'#E3D7FF', lilacD:'#5B36B8', lilacS:'#8C67E8',
  skin:'#C68A5E', skin2:'#A86F47'
};
const PAL = {
  sunny:{l:C.sunny,d:C.sunnyD,s:C.sunnyS},
  blush:{l:C.blush,d:C.blushD,s:C.blushS},
  mint:{l:C.mint,d:C.mintD,s:C.mintS},
  sky:{l:C.sky,d:C.skyD,s:C.skyS},
  lilac:{l:C.lilac,d:C.lilacD,s:C.lilacS}
};
const FD = `font-family="Bagel Fat One, Arial Rounded MT Bold, sans-serif"`;
const FU = `font-family="Bricolage Grotesque, system-ui, sans-serif" font-weight="800"`;

const ART = {};

/* ---- small icons ---- */
ART.sun = (fill=C.sunnyS, size=24) => `<svg viewBox="0 0 24 24" width="${size}" height="${size}" aria-hidden="true"><g fill="${fill}"><circle cx="12" cy="12" r="5.2"/>${[0,45,90,135,180,225,270,315].map(a=>`<rect x="11" y="0.8" width="2" height="4.4" rx="1" transform="rotate(${a} 12 12)"/>`).join('')}</g></svg>`;
ART.heart = (fill=C.blushS) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="${fill}" d="M12 21s-7.5-4.6-9.6-9.2C.9 8.3 3 4.5 6.7 4.5c2.1 0 3.6 1.2 4.3 2.6.7-1.4 2.2-2.6 4.3-2.6 3.7 0 5.8 3.8 4.3 7.3C19.5 16.4 12 21 12 21z"/></svg>`;
ART.drop = (fill=C.skyS) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="${fill}" d="M12 2.5S5 10 5 14.5a7 7 0 0 0 14 0C19 10 12 2.5 12 2.5z"/><path d="M9 15a3 3 0 0 0 3 3" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/></svg>`;
ART.leaf = (fill=C.mintS) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="${fill}" d="M20 3C9 3 4 8.5 4 15c0 2 .6 3.8 1.4 5.2C7 14 11 10.5 16 9c-4.3 2.4-7.4 6-8.8 11.6 1 .3 2 .4 3 .4C17 21 21 15 20 3z"/></svg>`;
ART.shield = (fill=C.sunnyS, stroke=C.ink) => `<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M32 5 9 13v17c0 14 10 24 23 29 13-5 23-15 23-29V13L32 5z" fill="${fill}" stroke="${stroke}" stroke-width="4" stroke-linejoin="round"/><path d="m21 32 8 8 15-16" fill="none" stroke="${stroke}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
ART.bag = () => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 11h20l-1.6 15.2a3 3 0 0 1-3 2.8H10.6a3 3 0 0 1-3-2.8L6 11z" fill="none" stroke="currentColor" stroke-width="3" stroke-linejoin="round"/><path d="M11 13V9a5 5 0 0 1 10 0v4" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>`;
ART.menu = () => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M6 9h20M6 16h14M6 23h20" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/></svg>`;
ART.close = () => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M8 8l16 16M24 8 8 24" stroke="currentColor" stroke-width="3.6" stroke-linecap="round"/></svg>`;
ART.sound = () => `<svg viewBox="0 0 32 32" aria-hidden="true"><path d="M5 12h5l7-6v20l-7-6H5z" fill="currentColor"/><g class="wave" fill="none" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" style="transition:opacity .2s"><path d="M21 11.5a6 6 0 0 1 0 9"/><path d="M24.5 8a11 11 0 0 1 0 16"/></g><g class="mute" stroke="currentColor" stroke-width="2.8" stroke-linecap="round" style="transition:opacity .2s"><path d="m21 12 7 8M28 12l-7 8"/></g></svg>`;
ART.check = (c=C.mintD) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12.5 4.5 4.5L19 7.5" fill="none" stroke="${c}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
ART.arrowL = () => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
ART.arrowR = () => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
ART.star = (fill=C.sunnyS) => `<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="${fill}" d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z"/></svg>`;
ART.pinky = (c=C.ink) => `<svg viewBox="0 0 80 50" aria-hidden="true"><g fill="none" stroke="${c}" stroke-width="5" stroke-linecap="round"><path d="M6 36c8 0 14-4 18-10s9-9 15-7c5 2 5 9 0 11-4 2-9 0-9-4"/><path d="M74 14c-8 0-14 4-18 10s-9 9-15 7c-5-2-5-9 0-11 4-2 9 0 9 4"/></g></svg>`;
ART.paw = () => ART.heart(C.blushS);
ART.squiggleArrow = (c=C.ink) => `<svg viewBox="0 0 120 60" aria-hidden="true"><path d="M4 8c22 2 30 20 46 26s34-4 50 14" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"/><path d="M92 38l10 12-15 2" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
ART.handRub = () => `<svg viewBox="0 0 80 90" aria-hidden="true"><path d="M30 86c-10-4-18-16-20-28l-6-20c-1-4 5-6 7-2l7 14V12c0-5 7-5 7 0v28-34c0-5 7-5 7 0v34-30c0-5 7-5 7 0v30-24c0-5 7-5 7 0v40c0 18-6 26-14 30z" fill="#fff" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/></svg>`;

/* ---- product packs ---- */
ART.tube = (pal, l1, l2, badge='SPF 60') => {
  const p = PAL[pal];
  const crimp = Array.from({length:9},(_,i)=>`<line x1="${28+i*10.5}" y1="15" x2="${28+i*10.5}" y2="33" stroke="rgba(255,255,255,.45)" stroke-width="2"/>`).join('');
  return `<svg viewBox="0 0 140 320" role="img" aria-label="${l1} ${l2} tube">
  <rect x="20" y="10" width="100" height="28" rx="5" fill="${p.s}" stroke="${C.ink}" stroke-width="4"/>${crimp}
  <path d="M24 38H116C120 110 124 196 114 250H26C16 196 20 110 24 38Z" fill="#fff" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M38 58C35 120 35 190 41 236" stroke="${p.l}" stroke-width="10" stroke-linecap="round" fill="none"/>
  <text x="74" y="86" text-anchor="middle" ${FU} font-size="12" letter-spacing="1" fill="${p.d}">little luxe</text>
  <text x="74" y="126" text-anchor="middle" ${FD} font-size="25" fill="${C.ink}">${l1}</text>
  <text x="74" y="154" text-anchor="middle" ${FD} font-size="25" fill="${C.ink}">${l2}</text>
  ${badge?`<rect x="40" y="170" width="68" height="26" rx="13" fill="${p.s}"/><text x="74" y="188" text-anchor="middle" ${FU} font-size="13" fill="#fff">${badge}</text>`:''}
  <g transform="translate(62 206)">${ART.sun(p.s,24).replace('<svg','<svg x="0" y="0"')}</g>
  <rect x="30" y="248" width="80" height="64" rx="18" fill="${p.s}" stroke="${C.ink}" stroke-width="4"/>
  <rect x="40" y="258" width="10" height="44" rx="5" fill="rgba(255,255,255,.4)"/>
</svg>`;
};
ART.jar = () => {
  const p = PAL.mint;
  return `<svg viewBox="0 0 180 230" role="img" aria-label="Cloud Mist Gel jar">
  <g fill="${p.s}" stroke="${C.ink}" stroke-width="4"><path d="M30 70c-8-22 14-36 30-26 4-18 32-22 40-6 14-14 40-4 36 16 14 2 18 12 16 16z" stroke-linejoin="round"/></g>
  <rect x="22" y="58" width="136" height="40" rx="14" fill="${p.s}" stroke="${C.ink}" stroke-width="4"/>
  <rect x="14" y="94" width="152" height="128" rx="30" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
  <path d="M30 112c-3 30-3 66 4 92" stroke="${p.l}" stroke-width="10" stroke-linecap="round" fill="none"/>
  <text x="94" y="126" text-anchor="middle" ${FU} font-size="12" letter-spacing="1" fill="${p.d}">little luxe</text>
  <text x="94" y="160" text-anchor="middle" ${FD} font-size="26" fill="${C.ink}">Cloud Mist</text>
  <rect x="64" y="174" width="60" height="24" rx="12" fill="${p.s}"/><text x="94" y="191" text-anchor="middle" ${FU} font-size="13" fill="#fff">GEL</text>
</svg>`;
};
ART.box = () => {
  const p = PAL.lilac;
  return `<svg viewBox="0 0 220 230" role="img" aria-label="First Glow Ritual Kit box">
  <path d="M110 46c-20-34-58-30-52-8 4 14 30 12 52 8zM110 46c20-34 58-30 52-8-4 14-30 12-52 8z" fill="${C.blushS}" stroke="${C.ink}" stroke-width="4" stroke-linejoin="round"/>
  <rect x="18" y="48" width="184" height="42" rx="10" fill="${p.s}" stroke="${C.ink}" stroke-width="4"/>
  <rect x="28" y="88" width="164" height="132" rx="14" fill="${p.l}" stroke="${C.ink}" stroke-width="4"/>
  <rect x="96" y="48" width="28" height="172" fill="${C.blushS}" stroke="${C.ink}" stroke-width="4"/>
  <g transform="rotate(-8 64 150)"><rect x="34" y="122" width="62" height="54" rx="8" fill="#fff" stroke="${C.ink}" stroke-width="3"/>
  <text x="65" y="146" text-anchor="middle" ${FD} font-size="13" fill="${C.ink}">First</text><text x="65" y="164" text-anchor="middle" ${FD} font-size="13" fill="${C.ink}">Glow</text></g>
  <g transform="translate(140 130)">${ART.sun(C.sunnyS,36)}</g>
  <text x="160" y="196" text-anchor="middle" ${FU} font-size="11" fill="${p.d}">ritual kit</text>
</svg>`;
};

/* ---- characters ---- */
ART.kid = ({shirt=C.skyS, shorts=C.ink, hair='short', id='k', walk=false, cap=false}={}) => {
  const hairPath = hair==='bun'
    ? `<circle cx="60" cy="22" r="14" fill="${C.ink}"/><path d="M22 66C18 34 40 24 60 24s42 10 38 42C88 50 74 44 60 44S32 50 22 66Z" fill="${C.ink}"/>`
    : `<path d="M22 64C20 30 46 18 64 22c24 2 36 22 34 40-10-12-28-20-46-16-12 2-22 10-30 18Z" fill="${C.ink}"/>`;
  return `<svg viewBox="0 0 120 262" role="img" aria-label="Illustrated child">
  <g class="${walk?'leg-a':''}"><path d="M50 196 L48 246" stroke="${C.skin}" stroke-width="14" stroke-linecap="round"/><ellipse cx="46" cy="250" rx="13" ry="7" fill="${C.ink}"/></g>
  <g class="${walk?'leg-b':''}"><path d="M70 196 L72 246" stroke="${C.skin2}" stroke-width="14" stroke-linecap="round"/><ellipse cx="74" cy="250" rx="13" ry="7" fill="${C.ink}"/></g>
  <rect x="36" y="166" width="48" height="38" rx="12" fill="${shorts}"/>
  <path d="M36 118 L18 168" stroke="${C.skin2}" stroke-width="12" stroke-linecap="round"/>
  <path d="M84 118 L102 168" stroke="${C.skin}" stroke-width="12" stroke-linecap="round"/>
  <rect x="30" y="102" width="60" height="76" rx="24" fill="${shirt}"/>
  <path d="M48 104q12 10 24 0" stroke="rgba(255,255,255,.6)" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="60" cy="64" r="38" fill="${C.skin}"/>
  <circle cx="22" cy="68" r="7" fill="${C.skin2}"/><circle cx="98" cy="68" r="7" fill="${C.skin2}"/>
  ${hairPath}
  ${cap?`<path d="M24 46c4-22 26-30 42-28 18 2 30 14 30 28z" fill="${C.sunnyS}"/><rect x="60" y="40" width="50" height="9" rx="4.5" fill="${C.sunnyS}"/>`:''}
  <circle cx="46" cy="70" r="4.6" fill="${C.ink}"/><circle cx="74" cy="70" r="4.6" fill="${C.ink}"/>
  <circle cx="47.6" cy="68.4" r="1.4" fill="#fff"/><circle cx="75.6" cy="68.4" r="1.4" fill="#fff"/>
  <path d="M48 85q12 11 24 0" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>
  <circle cx="36" cy="82" r="6.5" fill="${C.blushS}" opacity=".45"/><circle cx="84" cy="82" r="6.5" fill="${C.blushS}" opacity=".45"/>
</svg>`;
};
ART.sunFace = () => `<svg viewBox="0 0 200 200" role="img" aria-label="Smiling sun">
  <g class="rays" fill="${C.sunnyS}">${Array.from({length:12},(_,i)=>`<rect x="92" y="4" width="16" height="34" rx="8" transform="rotate(${i*30} 100 100)"/>`).join('')}</g>
  <circle cx="100" cy="100" r="58" fill="${C.sunnyS}" stroke="${C.ink}" stroke-width="4"/>
  <path d="M74 96q8-9 16 0M110 96q8-9 16 0" stroke="${C.ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <path d="M84 116q16 16 32 0" stroke="${C.ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>
  <circle cx="70" cy="114" r="8" fill="${C.blushS}" opacity=".55"/><circle cx="130" cy="114" r="8" fill="${C.blushS}" opacity=".55"/>
</svg>`;
ART.cloud = (fill='#fff') => `<svg viewBox="0 0 200 100" aria-hidden="true"><path d="M40 90a30 30 0 0 1-4-60 40 40 0 0 1 72-12 32 32 0 0 1 54 16 26 26 0 0 1-2 56z" fill="${fill}"/></svg>`;
ART.face = () => `<svg viewBox="0 0 400 400" role="img" aria-label="Close-up of a smiling child's face">
  <rect width="400" height="400" fill="${C.blush}"/>
  <circle cx="200" cy="230" r="150" fill="${C.skin}"/>
  <circle cx="54" cy="236" r="26" fill="${C.skin2}"/><circle cx="346" cy="236" r="26" fill="${C.skin2}"/>
  <path d="M52 200C44 104 120 54 206 60c86 4 150 62 140 140-34-46-92-74-150-70-58 4-110 30-144 70z" fill="${C.ink}"/>
  <path d="M140 222q20-22 40 0M220 222q20-22 40 0" stroke="${C.ink}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <path d="M168 288q32 30 64 0" stroke="${C.ink}" stroke-width="9" fill="none" stroke-linecap="round"/>
  <circle cx="122" cy="276" r="22" fill="${C.blushS}" opacity=".5"/><circle cx="278" cy="276" r="22" fill="${C.blushS}" opacity=".5"/>
</svg>`;
ART.texture = (pal='sunny') => { const p=PAL[pal]; return `<svg viewBox="0 0 200 200" role="img" aria-label="Gel texture swirl">
  <path d="M40 120c0-40 40-70 80-56s40 60 4 70-48-20-24-32 34 6 22 16" fill="none" stroke="#fff" stroke-width="30" stroke-linecap="round"/>
  <path d="M40 120c0-40 40-70 80-56s40 60 4 70-48-20-24-32 34 6 22 16" fill="none" stroke="${p.s}" stroke-width="4" stroke-linecap="round" opacity=".6"/>
  <circle cx="70" cy="80" r="6" fill="#fff"/><circle cx="150" cy="150" r="4" fill="#fff"/></svg>`; };
ART.schoolbag = (pal='sunny') => { const p=PAL[pal]; return `<svg viewBox="0 0 200 220" role="img" aria-label="School bag with sunscreen">
  <rect x="62" y="20" width="22" height="80" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="4" transform="rotate(-12 73 60)"/>
  <rect x="68" y="14" width="18" height="16" rx="4" fill="${p.s}" stroke="${C.ink}" stroke-width="3" transform="rotate(-12 73 60)"/>
  <path d="M70 60c0-30 60-30 60 0" fill="none" stroke="${C.ink}" stroke-width="8" stroke-linecap="round"/>
  <rect x="30" y="56" width="140" height="150" rx="40" fill="${C.skyS}" stroke="${C.ink}" stroke-width="4"/>
  <rect x="54" y="120" width="92" height="64" rx="18" fill="${C.sky}" stroke="${C.ink}" stroke-width="4"/>
  <circle cx="100" cy="100" r="7" fill="${C.sunnyS}" stroke="${C.ink}" stroke-width="3"/></svg>`; };

/* ---- day scene ---- */
ART.dayScene = () => {
  const stars = Array.from({length:40},()=>`<circle cx="${(Math.random()*1600).toFixed(0)}" cy="${(Math.random()*480).toFixed(0)}" r="${(Math.random()*2.4+1).toFixed(1)}" fill="#fff"/>`).join('');
  const bld = [[80,520,120,240],[220,560,90,200],[330,500,140,260],[1180,540,120,220],[1320,500,150,260],[1490,560,110,200]];
  const buildings = bld.map(([x,y,w,h])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="10"/><rect x="${x+w*.55}" y="${y-30}" width="${w*.3}" height="32" rx="8"/>`).join('');
  const windows = bld.map(([x,y,w,h])=>{let s='';for(let r=0;r<3;r++)for(let c=0;c<2;c++)s+=`<rect x="${x+16+c*(w/2)}" y="${y+28+r*56}" width="${w/2-32}" height="30" rx="5"/>`;return s;}).join('');
  return `<svg class="day__svg" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
  <defs><linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1"><stop id="skyTop" offset="0" stop-color="#FFC7A8"/><stop id="skyBot" offset="1" stop-color="#FFE9B8"/></linearGradient>
  <radialGradient id="shieldG"><stop offset=".7" stop-color="#FFF6C8" stop-opacity="0"/><stop offset="1" stop-color="#FFE68F" stop-opacity=".75"/></radialGradient></defs>
  <rect x="-400" y="-400" width="2400" height="2000" fill="url(#skyG)"/>
  <g id="stars" opacity="0">${stars}</g>
  <g id="sunG"><g transform="translate(-90 -90) scale(.9)">${ART.sunFace().replace(/<svg[^>]*>/,'').replace('</svg>','')}</g></g>
  <g id="moonG" opacity="0"><circle r="62" fill="#FFF6D6"/><circle cx="26" cy="-16" r="56" fill="#2B1F57" id="moonCut"/>
    <g transform="translate(-30 -6)"><path d="M-8 0q6-6 12 0" stroke="${C.ink}" stroke-width="4" fill="none" stroke-linecap="round"/></g></g>
  <g id="clouds" fill="#fff" opacity=".9">
    <g transform="translate(200 150) scale(1.1)">${ART.cloud().replace(/<svg[^>]*>/,'').replace('</svg>','')}</g>
    <g transform="translate(1100 110) scale(.8)">${ART.cloud().replace(/<svg[^>]*>/,'').replace('</svg>','')}</g>
    <g transform="translate(700 230) scale(.6)">${ART.cloud().replace(/<svg[^>]*>/,'').replace('</svg>','')}</g></g>
  <g id="bld" fill="#E9D9FF">${buildings}</g>
  <g id="win" fill="#FFE68F" opacity="0">${windows}</g>
  <path id="hill" d="M-400 700 C 0 600 300 640 600 680 S 1200 620 1600 660 L 2000 660 L2000 1400 L-400 1400Z" fill="#A8E0B8"/>
  <path id="ground" d="M-400 770 C 200 730 600 760 900 750 S 1500 735 2000 760 L2000 1400 L-400 1400Z" fill="#7FCF97"/>
  <!-- props per beat -->
  <g class="prop" data-beat="0" opacity="1" transform="translate(1060 640)">
    <rect x="0" y="0" width="300" height="120" rx="26" fill="${C.sunnyS}" stroke="${C.ink}" stroke-width="5"/>
    <rect x="22" y="20" width="56" height="44" rx="10" fill="#CFE2FF" stroke="${C.ink}" stroke-width="4"/><rect x="92" y="20" width="56" height="44" rx="10" fill="#CFE2FF" stroke="${C.ink}" stroke-width="4"/><rect x="162" y="20" width="56" height="44" rx="10" fill="#CFE2FF" stroke="${C.ink}" stroke-width="4"/>
    <rect x="232" y="20" width="52" height="86" rx="10" fill="#fff" stroke="${C.ink}" stroke-width="4"/>
    <text x="110" y="96" text-anchor="middle" ${FU} font-size="22" fill="${C.ink}">SCHOOL BUS</text>
    <circle cx="70" cy="122" r="24" fill="${C.ink}"/><circle cx="240" cy="122" r="24" fill="${C.ink}"/><circle cx="70" cy="122" r="9" fill="#fff"/><circle cx="240" cy="122" r="9" fill="#fff"/></g>
  <g class="prop" data-beat="1" opacity="0" transform="translate(1080 520)">
    <path d="M0 250 L60 0 M260 250 L200 0 M50 6 H210" stroke="${C.skyS}" stroke-width="14" stroke-linecap="round" fill="none"/>
    <g class="swing"><path d="M100 6 V170 M160 6 V170" stroke="${C.ink}" stroke-width="4"/><rect x="88" y="166" width="84" height="16" rx="8" fill="${C.blushS}" stroke="${C.ink}" stroke-width="4"/></g></g>
  <g class="prop" data-beat="2" opacity="0" transform="translate(1100 600)">
    <rect x="0" y="0" width="10" height="150" rx="4" fill="#E9C38A" stroke="${C.ink}" stroke-width="3"/><rect x="24" y="0" width="10" height="150" rx="4" fill="#E9C38A" stroke="${C.ink}" stroke-width="3"/><rect x="48" y="0" width="10" height="150" rx="4" fill="#E9C38A" stroke="${C.ink}" stroke-width="3"/>
    <rect x="-4" y="-8" width="66" height="8" rx="4" fill="${C.ink}"/>
    <g transform="translate(150 20) rotate(28)"><rect x="0" y="0" width="34" height="140" rx="14" fill="#E9C38A" stroke="${C.ink}" stroke-width="4"/><rect x="11" y="-50" width="12" height="56" rx="6" fill="${C.blushS}" stroke="${C.ink}" stroke-width="3"/></g>
    <circle cx="260" cy="60" r="16" fill="${C.blushS}" stroke="${C.ink}" stroke-width="3"/></g>
  <g class="prop" data-beat="3" opacity="0" transform="translate(1070 500)">
    <path d="M0 120 L150 10 L300 120 Z" fill="${C.blushS}" stroke="${C.ink}" stroke-width="5" stroke-linejoin="round"/>
    <rect x="24" y="116" width="252" height="164" rx="12" fill="#FFF6E6" stroke="${C.ink}" stroke-width="5"/>
    <rect x="56" y="150" width="80" height="70" rx="10" fill="#FFE68F" stroke="${C.ink}" stroke-width="4"/><rect x="176" y="170" width="64" height="110" rx="10" fill="${C.lilacS}" stroke="${C.ink}" stroke-width="4"/>
    <text x="96" y="196" text-anchor="middle" font-family="Gochi Hand, cursive" font-size="22" fill="${C.ink}">zzz</text></g>
  <g id="kidG" transform="translate(740 520)">
    <circle id="shield" cx="60" cy="130" r="0" fill="url(#shieldG)" stroke="${C.sunnyS}" stroke-width="6" stroke-dasharray="14 12"/>
    <g class="walker">${ART.kid({shirt:C.blushS,shorts:C.skyD,walk:true,cap:true}).replace(/<svg[^>]*>/,'').replace('</svg>','')}</g>
  </g>
</svg>`;
};

/* ---- gram tiles (illustrated stand-ins for Instagram posts) ---- */
ART.gramTiles = [
  {bg:C.sunny, fg:C.sunnyD, art:()=>ART.sunFace(), cap:'first day of school, SPF on'},
  {bg:C.mint, fg:C.mintD, art:()=>ART.jar(), cap:'bath, story, cloud mist'},
  {bg:C.blush, fg:C.blushD, art:()=>ART.kid({shirt:C.sunnyS,shorts:C.ink,hair:'bun'}), cap:'"I did it myself!"'},
  {bg:C.sky, fg:C.skyD, art:()=>ART.schoolbag('sunny'), cap:'packed: water, tiffin, sunscreen'},
  {bg:C.lilac, fg:C.lilacD, art:()=>ART.box(), cap:'unboxing the first glow kit'},
  {bg:C.sunny, fg:C.sunnyD, art:()=>ART.tube('blush','Blush &','Block'), cap:'teen-approved coral tint'},
  {bg:C.mint, fg:C.mintD, art:()=>ART.kid({shirt:C.lilacS,shorts:C.mintD,cap:true}), cap:'sports day, shield on'},
];
