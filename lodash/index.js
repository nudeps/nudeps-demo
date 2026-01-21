import { require } from "cjs-browser-shim";

const _ = require("lodash");
const chunks = _.chunk(["a", "b", "c", "d"], 2);
console.log(chunks[0][1]); // Output: "b"
