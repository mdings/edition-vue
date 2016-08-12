<template>
	<div id="activity">
		syncing image {{index}} of {{total}}
	</div>
</template>

<script>
import {ipcRenderer} from 'electron'

export default {

	created() {
		ipcRenderer.on('sync-done', (event, payload) => {
			this.index++;
		});
	},

	methods: {
		setSyncTotal(total) {
			this.total = total
		}
	},

	data() {
		return {
			total: 0,
			index: 0
		}
	},

	events: {
		'set-sync-total': 'setSyncTotal'
	}
}
</script>

<style lang="sass">
	#activity {
		background: red;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
	}
</style>