// Original Canvas 2D flow field: no framework, network or GPU dependency.
export function createBackground(canvas, onChange = () => {}) {
  let ctx;
  try { ctx = canvas?.getContext('2d', {alpha:true}); } catch {}
  const media = window.matchMedia('(prefers-reduced-motion: reduce)');
  let paused=false, frame=0, last=0, time=0, width=1, height=1, disposed=false;
  const particles=Array.from({length:4300},(_,i)=>({
    u:((i*73)%4300)/4300, v:((i*137)%4297)/4297,
    size:i%17===0?2:1, alpha:.18+(i%11)/16
  }));
  const stopped=()=>paused||media.matches;
  function draw(){
    if(!ctx)return;
    ctx.clearRect(0,0,width,height);
    const scale=width<600?.9:1;
    for(const p of particles){
      const a=p.u*Math.PI*2+time*.045;
      const band=(p.v-.5)*2;
      const radius=.23+band*.037+Math.sin(a*3+time*.09)*.021;
      const x=width*(.67+Math.cos(a)*radius*1.75);
      const y=height*(.45+Math.sin(a)*radius*.8+band*.16+Math.sin(a*2-time*.07)*.085);
      const fade=Math.max(0,Math.min(1,(x/width-.12)*1.8));
      ctx.fillStyle=`rgba(207,201,177,${p.alpha*fade})`;
      ctx.fillRect(Math.round(x),Math.round(y),p.size*scale,p.size*scale);
    }
    canvas.dataset.frame=String(Math.round(time*1000));
  }
  function tick(now){
    frame=0;
    if(disposed||stopped()||document.hidden)return;
    if(now-last>=32){time+=Math.min((now-last)/1000,.05);last=now;draw();}
    frame=requestAnimationFrame(tick);
  }
  function sync(){
    if(frame)cancelAnimationFrame(frame);
    frame=0;last=performance.now();
    canvas.dataset.motion=stopped()?'paused':'running';
    onChange({paused:stopped(),reduced:media.matches});
    if(ctx&&!stopped()&&!document.hidden&&!disposed)frame=requestAnimationFrame(tick);
  }
  function resize(){
    width=window.innerWidth;height=Math.min(window.innerHeight,1050);
    const ratio=Math.min(window.devicePixelRatio||1,1.5);
    canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
    ctx?.setTransform(ratio,0,0,ratio,0,0);draw();
  }
  window.addEventListener('resize',resize,{passive:true});
  document.addEventListener('visibilitychange',sync);
  media.addEventListener('change',sync);
  resize();sync();
  return {
    setPaused(value){paused=Boolean(value);sync();},
    status(){return {paused:stopped(),reduced:media.matches};},
    dispose(){disposed=true;if(frame)cancelAnimationFrame(frame);window.removeEventListener('resize',resize);document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',sync);}
  };
}
