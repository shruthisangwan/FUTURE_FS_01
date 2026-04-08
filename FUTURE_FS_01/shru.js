/* ── Cursor ── */
const cur=document.getElementById('cur');
const curR=document.getElementById('cur-r');
if(cur && curR){
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove',e=>{
    mx=e.clientX;my=e.clientY;
    cur.style.transform=`translate(${mx-5}px,${my-5}px)`;
  });
  (function anim(){
    rx+=(mx-rx)*.1;
    ry+=(my-ry)*.1;
    curR.style.transform=`translate(${rx-16}px,${ry-16}px)`;
    requestAnimationFrame(anim);
  })();
}

/* ── Hero Canvas ── */
(function(){
  const c=document.getElementById('bg-canvas');
  if(!c) return;
  const ctx=c.getContext('2d');
  let W,H;
  const pts=[];
  function resize(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;}
  resize();window.addEventListener('resize',resize);
  for(let i=0;i<80;i++) pts.push({x:Math.random()*1600,y:Math.random()*900,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35,r:Math.random()*1.4+.4});
  const cols=['rgba(124,92,252,','rgba(0,212,255,','rgba(180,255,107,'];
  function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach((p,i)=>{
      p.x+=p.vx;p.y+=p.vy;
      if(p.x<0||p.x>W)p.vx*=-1;
      if(p.y<0||p.y>H)p.vy*=-1;
      ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle=cols[i%3]+'0.8)';ctx.fill();
    });
    for(let i=0;i<pts.length;i++) for(let j=i+1;j<pts.length;j++){
      const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);
      if(d<110){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(124,92,252,${.12*(1-d/110)})`;ctx.lineWidth=.5;ctx.stroke();}
    }
    requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Contact Canvas ── */
(function(){
  const c=document.getElementById('contact-bg');
  if(!c) return;
  const ctx=c.getContext('2d');
  let W,H,t=0;
  function resize(){W=c.width=c.offsetWidth;H=c.height=c.offsetHeight;}
  resize();window.addEventListener('resize',resize);
  const cols=['rgba(124,92,252,','rgba(0,212,255,','rgba(180,255,107,'];
  function draw(){
    ctx.clearRect(0,0,W,H);
    for(let i=0;i<5;i++){
      const x=W/2+Math.cos(t*.25+i*1.26)*W*.3;
      const y=H/2+Math.sin(t*.18+i*1.26)*H*.35;
      const g=ctx.createRadialGradient(x,y,0,x,y,180);
      g.addColorStop(0,cols[i%3]+'0.07)');g.addColorStop(1,cols[i%3]+'0)');
      ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,180,0,Math.PI*2);ctx.fill();
    }
    t+=.01;requestAnimationFrame(draw);
  }
  draw();
})();

/* ── Scroll Reveal ── */
const obs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.classList.add('vis');
      if(e.target.classList.contains('sk-card')) e.target.classList.add('vis');
    }
  });
},{threshold:.14});
document.querySelectorAll('.reveal,.sk-card').forEach(el=>obs.observe(el));

/* ── Form ── */
function handleSend(e){
  e.preventDefault();
  const btn=e.target.querySelector('.btn-send');
  if(!btn) return;
  btn.textContent='Sent! ✓';btn.style.background='#b4ff6b';btn.style.color='#000';
  setTimeout(()=>{btn.textContent='Send Message ↗';btn.style.background='var(--accent)';btn.style.color='#fff';},3000);
}
