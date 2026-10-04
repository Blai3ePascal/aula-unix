import {run} from './shell.js';
self.onmessage=({data})=>{try{const {shell,command,input}=data;const result=run(shell,command,{input});if(Object.keys(shell.fs).length>1000||JSON.stringify(shell).length>750000)throw Error('El entorno supera el límite didáctico. Reinicia el entorno de esta pregunta.');self.postMessage({shell,result});}catch(e){self.postMessage({error:e.message});}};
