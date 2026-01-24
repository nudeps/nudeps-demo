import { require } from "cjs-browser-shim";

const _ = require("lodash");
const chunks = _.chunk(["Hello", "from", "Lodash"], 2);

document.body.textContent = chunks[1][0] + " works!";
