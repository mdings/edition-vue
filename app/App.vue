<template>
	<Toolbar></Toolbar>
	<Aside></Aside>
	<Pins></Pins>
</template>

<script>
	// import Bind from 'bind.js'
	// import Clusterize from 'clusterize.js'
	import $ from 'jquery'
	import { ipcRenderer } from 'electron'
	import Toolbar from './components/Toolbar.vue'
	import Aside from './components/Aside.vue'
	import Pins from './components/Pins.vue'
	

	export default {
		components: {
			Toolbar,
			Aside,
			Pins,
		},

	  	ready() {
	  		// show the most recent pins when opening
	  		document.querySelectorAll('li')[0].click()
	  		// let service = new SyncService();
	  		// this.boards = service.fetchBoards();
	  		// Retrieving the auth code
	  		// ipcRenderer.on('api-code', (e, code) => {
	  		// 	$.post(`https://api.pinterest.com/v1/oauth/token?grant_type=authorization_code&client_id=4839736519480585228&client_secret=4ac3803ea94d6d50b3143939d1cfef4f7f25db0c665e998166fb8108e306e261&code=${code}`, (response) => {
	  		// 		console.log(response)
	  		// 		})
	  		// })
	  	},

	  	methods: {
	  		selectBoard ($id, $name) {
	  			this.$broadcast('select-board', $id, $name)
	  		},

	  		refreshMasonry () {
	  			this.$broadcast('refresh-masonry')
	  		},

	  		toggleInspector () {
	  			this.$broadcast('toggle-inspector')
	  		},

	  		showImage ($pin) {
	  			this.$broadcast('show-image', $pin)
	  		}

	  	},

	  	events: {
	  		'select-board': 'selectBoard',
	  		'toggle-inspector': 'toggleInspector',
	  		'refresh-masonry': 'refreshMasonry',
	  		'show-image': 'showImage'
	  	}
	}
</script>

<style lang="sass">

html,
body {
	height: 100%;
	overflow: hidden;
	background-color: #222;
	font-family: sans-serif;
}

*,
*:before,
*:after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}

main {
}
</style> 