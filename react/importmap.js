(()=>{
let map = {
	"imports": {
		"cjs-browser-shim": "./client_modules/cjs-browser-shim/index.js",
		"react": "./client_modules/react@19.2.3/index.js",
		"react-dom": "./client_modules/react-dom@19.2.3/index.js",
		"react-dom/client": "./client_modules/react-dom@19.2.3/client.js",
		"react-dom/package.json": "./client_modules/react-dom@19.2.3/package.json",
		"react-dom/profiling": "./client_modules/react-dom@19.2.3/profiling.js",
		"react-dom/server": "./client_modules/react-dom@19.2.3/server.browser.js",
		"react-dom/server.browser": "./client_modules/react-dom@19.2.3/server.browser.js",
		"react-dom/server.bun": "./client_modules/react-dom@19.2.3/server.bun.js",
		"react-dom/server.edge": "./client_modules/react-dom@19.2.3/server.edge.js",
		"react-dom/server.node": "./client_modules/react-dom@19.2.3/server.node.js",
		"react-dom/static": "./client_modules/react-dom@19.2.3/static.browser.js",
		"react-dom/static.browser": "./client_modules/react-dom@19.2.3/static.browser.js",
		"react-dom/static.edge": "./client_modules/react-dom@19.2.3/static.edge.js",
		"react-dom/static.node": "./client_modules/react-dom@19.2.3/static.node.js",
		"react-dom/test-utils": "./client_modules/react-dom@19.2.3/test-utils.js",
		"react/compiler-runtime": "./client_modules/react@19.2.3/compiler-runtime.js",
		"react/jsx-dev-runtime": "./client_modules/react@19.2.3/jsx-dev-runtime.js",
		"react/jsx-runtime": "./client_modules/react@19.2.3/jsx-runtime.js",
		"react/package.json": "./client_modules/react@19.2.3/package.json",
		"scheduler": "./client_modules/scheduler@0.27.0/index.js"
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