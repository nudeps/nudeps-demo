export default {
	overrides: {
		imports: {
			// Override is ./node_modules based, nudeps will transform it accordingly
			vue: './node_modules/vue/dist/vue.esm-browser.js',
		},
	},
}
