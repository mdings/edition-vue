<template>
	<!-- <title></title> -->
	<main>
		<groups></groups>
		<!-- <files></files> -->
		<!-- <editor></editor>	 -->
	</main>
	
</template>

<script>
	import title from './components/Title.vue'
	import groups from './components/Groups.vue'
	import files from './components/Files.vue'
	import editor from './components/Editor.vue'
	import Mousetrap from 'mousetrap'
	import 'mousetrap/plugins/global-bind/mousetrap-global-bind'
	import {setState} from './vuex/actions'
	const ipc = require('electron').ipcRenderer;
	const {remote} = require('electron')
	const {Menu, MenuItem} = remote
	const menu = new Menu()	

	export default {

		created() {
			// keep track of (global) shortcuts
			Mousetrap.bindGlobal('command+s', this.saveFile)
			Mousetrap.bindGlobal('command+n', this.newFile)
			
			// setup context menu
			// @TODO: place context menu in groups.vue
			const vm = this
			menu.append(new MenuItem({label: 'New group..', click() { vm.contextMenu('new-group')}}))
			menu.append(new MenuItem({type: 'separator'}))
			menu.append(new MenuItem({label: 'Rename..', click() { vm.contextMenu('rename')}}))

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
	  	},

	  	contextMenu(action) {
	  		this.$broadcast(`context-click-${action}`)
	  	},

	  	openContextMenu() {
	  		menu.popup(remote.getCurrentWindow())
	  	}
	  },

	  events: {
			'open-context-menu': 'openContextMenu'
		},

		components: {
			title,
			groups,
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
		height: 100%;
		overflow: hidden;
		background: rgba(0, 0, 0, 0);
	}

	main {
		user-select: none;
		display: flex; 
	}
</style> 