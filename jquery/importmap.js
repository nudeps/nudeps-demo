(()=>{
let map = {
	"imports": {
		"cjs-browser-shim": "./client_modules/cjs-browser-shim/index.js",
		"jquery1": "./client_modules/jquery1@1.12.4/dist/jquery.js",
		"jquery4": "./client_modules/jquery4@4.0.0/dist-module/jquery.module.js",
		"jquery4/factory": "./client_modules/jquery4@4.0.0/dist-module/jquery.factory.module.js",
		"jquery4/factory-slim": "./client_modules/jquery4@4.0.0/dist-module/jquery.factory.slim.module.js",
		"jquery4/slim": "./client_modules/jquery4@4.0.0/dist-module/jquery.slim.module.js"
	}
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
