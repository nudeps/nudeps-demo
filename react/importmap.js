(()=>{
let map = {
	"imports": {
		"react": "./client_modules/react@19.2.3/index.js",
		"react/compiler-runtime": "./client_modules/react@19.2.3/compiler-runtime.js",
		"react/jsx-dev-runtime": "./client_modules/react@19.2.3/jsx-dev-runtime.js",
		"react/jsx-runtime": "./client_modules/react@19.2.3/jsx-runtime.js",
		"react/package.json": "./client_modules/react@19.2.3/package.json"
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


// CJS shim
let modules = {};

function resolve (specifier, parentURL = cS.src) {
	for (let s in map.imports) {
		if (specifier === s || specifier.startsWith(s + "/")) {
			specifier = specifier.replace(s, map.imports[s]);
			return new URL(specifier, parentURL).href;
		}
	}

	throw new Error(`Unknown specifier: ${specifier}`);
}

function require (specifier, parentURL) {
	let url = specifier;

	if (!url.startsWith(".") && !url.startsWith("https:")) {
		url = resolve(specifier, parentURL);
	}

	if (url in modules) {
		return modules[url];
	}

	// Sync XHR request
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send();

	if (xhr.status < 200 || xhr.status >= 400) {
		throw new Error(`require(): Failed to fetch ${url} (HTTP ${xhr.status})`);
	}

	// Check content type
	let contentType = xhr.getResponseHeader("Content-Type");
	if (contentType && contentType.includes("application/json")) {
		let json;
		try {
			json = JSON.parse(xhr.responseText);
		}
		catch (e) {
			return;
		}

		return (modules[url] = json);
	}

	let module = { exports: {} };
	let __filename = url;
	let __dirname = new URL(".", url).href;
	let process = globalThis.process ?? { env: { NODE_ENV: "production" } };

	// Cache early to support cycles (Node-like behavior)
	modules[url] = module.exports;

	let source = [xhr.responseText, `//# sourceURL=${url}`].join("\n");
	let localRequire = s => require(s, url);

	// Node-style wrapper: keep `exports`/`module` function-scoped so closures work.
	new Function("exports", "require", "module", "__filename", "__dirname", "process", source)(
		module.exports,
		localRequire,
		module,
		__filename,
		__dirname,
		process,
	);

	return (modules[url] = module.exports);
}

globalThis.require ??= specifier => require(specifier, cS.src);

})();