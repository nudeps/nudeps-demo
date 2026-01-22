import { require } from "cjs-browser-shim";
import jQuery from "jquery";

const jQuery_1 = require("jquery1");

const $legacy = jQuery_1.noConflict(true);
const $ = jQuery.noConflict(true);

$("ul").html("jQuery works!".split(/\s+/g).map(word => `<li>${word}</li>`).join("\n"));
$("#count").text($legacy("ul > li").size());
