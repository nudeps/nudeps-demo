{let map = {
	"imports": {
		"@floating-ui/core": "./client_modules/@floating-ui/core@1.7.3/dist/floating-ui.core.mjs",
		"@floating-ui/core/package.json": "./client_modules/@floating-ui/core@1.7.3/package.json",
		"@floating-ui/dom": "./client_modules/@floating-ui/dom@0.5.4/dist/floating-ui.dom.browser.min.mjs",
		"@floating-ui/dom/package.json": "./client_modules/@floating-ui/dom@0.5.4/package.json",
		"nudeps-demo": "./index.js",
		"vue": "./client_modules/vue@3.5.26/dist/vue.esm-browser.js",
		"vue/compiler-sfc": "./client_modules/vue@3.5.26/compiler-sfc/index.browser.mjs",
		"vue/jsx": "./client_modules/vue@3.5.26/jsx.d.ts",
		"vue/jsx-dev-runtime": "./client_modules/vue@3.5.26/jsx-runtime/index.mjs",
		"vue/jsx-runtime": "./client_modules/vue@3.5.26/jsx-runtime/index.mjs",
		"vue/package.json": "./client_modules/vue@3.5.26/package.json",
		"vue/server-renderer": "./client_modules/vue@3.5.26/server-renderer/index.mjs",
		"@vue/compiler-sfc": "./client_modules/@vue/compiler-sfc@3.5.26/dist/compiler-sfc.esm-browser.js",
		"@vue/runtime-dom": "./client_modules/@vue/runtime-dom@3.5.26/dist/runtime-dom.esm-bundler.js",
		"@vue/server-renderer": "./client_modules/@vue/server-renderer@3.5.26/dist/server-renderer.esm-bundler.js",
		"@vue/shared": "./client_modules/@vue/shared@3.5.26/dist/shared.esm-bundler.js",
		"@vue/runtime-core": "./client_modules/@vue/runtime-core@3.5.26/dist/runtime-core.esm-bundler.js",
		"@floating-ui/utils": "./client_modules/@floating-ui/utils@0.2.10/dist/floating-ui.utils.mjs",
		"@vue/reactivity": "./client_modules/@vue/reactivity@3.5.26/dist/reactivity.esm-bundler.js"
	},
	"scopes": {
		"./client_modules/@floating-ui/dom@0.5.4": {
			"@floating-ui/core": "./client_modules/@floating-ui/core@0.7.3/dist/floating-ui.core.browser.min.mjs"
		}
	}
};
(function injectMap (map, cS) {
	if (!cS) {
		console.error(`Import map injection script cannot be included as a module script. Please remove type="module".`);
	}
	else if (document.querySelector(`script[type=module]`)) {
		console.error(`${cS.getAttribute("src")} must be included before any module scripts.`);
	}
	else {
		const mapUrl = cS.src;
  		const rebase = m => { for (let k in m) m[k] = new URL(m[k], mapUrl).href; return m; };
		rebase(map.imports);
		for (let scope in map.scopes) {
			rebase(map.scopes[scope]);
		}
		cS.after(Object.assign(document.createElement("script"), { type: "importmap", textContent: JSON.stringify(map) }));
	}
})(map, document.currentScript)}