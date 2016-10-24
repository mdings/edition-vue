<template>
	<main>
		<groups></groups>
		<folders></folders>
		<files></files>
		<editor></editor>	
	</main>
	
</template>

<script>
	import title from './components/Title.vue'
	import groups from './components/Groups.vue'
	import folders from './components/Folders.vue'
	import files from './components/Files.vue'
	import editor from './components/Editor.vue'
	// import Mousetrap from 'mousetrap'
	// import 'mousetrap/plugins/global-bind/mousetrap-global-bind'
	import {setState, createFile} from './vuex/actions'
	const ipc = require('electron').ipcRenderer;
	

	export default {

		created() {
			// keep track of (global) shortcuts
			// Mousetrap.bindGlobal('command+n', this.createFile)

			// listen for messages coming from the main process
			this.listen()
			// load initial app state from db
			this.loadApp()
		},

		vuex: {
			getters: {
			},
	    actions: {
	      // newFile,
	      // saveFile,
	      createFile,
	      setState,
	      // removeActive
	    }
	  },

	  methods: {
	  	loadApp() {
	  		ipc.send('load-records', {store: 'files'})
	  		ipc.send('load-records', {store: 'library'})
	  		ipc.send('load-records', {store: 'settings'})
	  	},

	  	listen() {
	  		ipc.on('load-records-done', (event, payload) => { this.setState(payload) })
			ipc.on('filter-records-done', (event, payload) => { this.setState(payload) })
			ipc.on('fuzzy-search-records-done', (event, payload) => { this.setState(payload) })
			ipc.on('watch-directory-done', (event, payload) => { this.setState(payload) })
	  	},

	  	clickApp() {
	  		this.$broadcast('global-app-click')
	  	}
	  },


		components: {
			title,
			groups,
			folders,
			files,
			editor
		}
	}
</script>

<style lang="sass">
	*,
	*:before,
	*:after {
		margin: 0;
		padding: 0;
		outline: 0;	
	}

	ul,
	li {
		list-style: none;
	}

	html,
	body {
		background: rgba(0, 0, 0, 0);
	}

	main {
		user-select: none;
		display: flex; 
		height: 100vh;
		overflow: hidden;
	}

	.flex-panel {
		padding: 0 15px;
		position: relative;
	}
</style> 