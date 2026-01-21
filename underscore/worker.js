import { template } from 'underscore';

postMessage(template('Hello from <%= name %> in a worker!')({name: 'underscore'}));
