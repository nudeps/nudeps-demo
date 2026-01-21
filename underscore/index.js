import { template } from 'underscore';

document.body.textContent = template('Hello from <%= name %>!')({name: 'underscore'});

const worker = new Worker("./worker.js", { type: 'module' });
worker.onerror = event => {
	console.error('Worker error', event);
};
worker.onmessage = event => {
	document.body.textContent = event.data;
};


