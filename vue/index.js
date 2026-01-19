import { createApp } from 'vue';

globalThis.app = createApp({
	data () {
		return { msg: "Vue works!" }
	},
}).mount(document.body);
