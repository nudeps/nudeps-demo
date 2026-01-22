import { require } from "cjs-browser-shim";
import jQuery from "jquery";

const jQuery_1 = require("jquery1");

const $legacy = jQuery_1.noConflict(true);
const $ = jQuery.noConflict(true);

$("#count").text($legacy("#list > li").size());
