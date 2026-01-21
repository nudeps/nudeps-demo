(()=>{
let map = {
	"imports": {
		"cjs-browser-shim": "./client_modules/cjs-browser-shim@0.0.1/index.js",
		"lodash": "./client_modules/lodash@4.17.21/lodash.js",
		"nudeps-demo-lodash": "./index.js",
		"underscore": "./client_modules/underscore@1.13.7/modules/index-all.js",
		"underscore/package.json": "./client_modules/underscore@1.13.7/package.json"
	},
	"scopes": {}
};
let cS = document.currentScript;
if (!cS) {
	return console.error(`Import map injection script cannot be included as a module script. Please remove type="module".`);
}
else if (document.querySelector(`script[type=module]`)) {
	return console.error(`${cS.getAttribute("src")} must be included before any module scripts.`);
}

const mapUrl = cS.src;
const rebase = m => { for (let k in m) m[k] = new URL(m[k], mapUrl).href; return m; };
rebase(map.imports);
for (let scope in map.scopes) rebase(map.scopes[scope]);
cS.after(Object.assign(document.createElement("script"), { type: "importmap", textContent: JSON.stringify(map) }));

})();
