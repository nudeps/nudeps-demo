import { require } from "cjs-browser-shim";
import jquery4 from "jquery4";

const jquery1 = require("jquery1");

const $legacy = jquery1.noConflict(true);
const $ = jquery4.noConflict(true);

$("#count").text($legacy("#demos > li").size());
