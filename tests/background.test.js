import test from 'node:test';
import assert from 'node:assert/strict';
import {createBackground} from '../src/background.js';
test('La animación respeta pausa, movimiento reducido y pestaña oculta',()=>{
  const listeners={},callbacks=new Map();let next=0;
  const media={matches:false,addEventListener:(k,fn)=>listeners['media:'+k]=fn,removeEventListener:(k)=>delete listeners['media:'+k]};
  const originals=Object.fromEntries(['window','document','requestAnimationFrame','cancelAnimationFrame'].map(k=>[k,Object.getOwnPropertyDescriptor(globalThis,k)]));
  const ctx={clearRect(){},fillRect(){},setTransform(){}};
  const canvas={dataset:{},getContext:()=>ctx};
  try{
    globalThis.window={innerWidth:390,innerHeight:800,devicePixelRatio:2,matchMedia:()=>media,addEventListener:(k,fn)=>listeners[k]=fn,removeEventListener:k=>delete listeners[k]};
    globalThis.document={hidden:false,addEventListener:(k,fn)=>listeners[k]=fn,removeEventListener:k=>delete listeners[k]};
    globalThis.requestAnimationFrame=fn=>{callbacks.set(++next,fn);return next;};
    globalThis.cancelAnimationFrame=id=>callbacks.delete(id);
    const controller=createBackground(canvas);
    assert.equal(callbacks.size,1);
    controller.setPaused(true);assert.equal(callbacks.size,0);assert.equal(canvas.dataset.motion,'paused');
    controller.setPaused(false);assert.equal(callbacks.size,1);
    media.matches=true;listeners['media:change']();assert.equal(callbacks.size,0);assert.equal(controller.status().reduced,true);
    controller.setPaused(false);assert.equal(callbacks.size,0);
    media.matches=false;listeners['media:change']();assert.equal(callbacks.size,1);
    document.hidden=true;listeners.visibilitychange();assert.equal(callbacks.size,0);
    document.hidden=false;listeners.visibilitychange();assert.equal(callbacks.size,1);
    const [id,fn]=callbacks.entries().next().value;callbacks.delete(id);fn(performance.now()+50);
    assert.ok(Number(canvas.dataset.frame)>0);assert.equal(callbacks.size,1);
    controller.dispose();assert.equal(callbacks.size,0);assert.equal(Object.keys(listeners).length,0);
  }finally{for(const [k,d] of Object.entries(originals)){if(d)Object.defineProperty(globalThis,k,d);else delete globalThis[k];}}
});
