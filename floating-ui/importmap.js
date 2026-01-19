(()=>{
let map = {
	"imports": {
		"@floating-ui/core": "./client_modules/@floating-ui/core@1.7.3/dist/floating-ui.core.mjs",
		"@floating-ui/core/package.json": "./client_modules/@floating-ui/core@1.7.3/package.json",
		"@floating-ui/dom": "./client_modules/@floating-ui/dom@0.5.4/dist/floating-ui.dom.browser.min.mjs",
		"@floating-ui/dom/package.json": "./client_modules/@floating-ui/dom@0.5.4/package.json",
		"nudeps-demo-floating-ui": "./index.js",
		"@floating-ui/utils": "./client_modules/@floating-ui/utils@0.2.10/dist/floating-ui.utils.mjs"
	},
	"scopes": {
		"./client_modules/@floating-ui/dom@0.5.4": {
			"@floating-ui/core": "./client_modules/@floating-ui/core@0.7.3/dist/floating-ui.core.browser.min.mjs"
		}
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