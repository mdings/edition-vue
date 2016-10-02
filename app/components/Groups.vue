<template>
	<div class="flex-panel" :style="{width: settings.toolbarWidth}">
		<div class="groups">
			<span @click="resetActiveGroup()">On My Mac</span>
			<div v-for="item in sortedData">
				<group class="item" :model="item"></group>
			</div>
			<!-- <div v-for="file in library" @click="setActiveFile(file)" class="panel__file" :class="{'is-active': active === file}">
				{{file.type}}-{{file.name}}
				<span class="file__close" @click="closeFile(file)">x</span>
			</div> -->
		</div>
		<div class="actions">
			<button @click="createFile()">new file</button> 
			<button @click="createGroup()">new group</button>
		</div>
		<resizer></resizer>
</template>

<script>
	import resizer from './Resizer.vue'
	import group from './Group.vue'
	import _ from 'lodash'
	import {createGroup, createFile, updateGroup, resetActiveGroup} from '../vuex/actions'

	const {remote} = require('electron')
	const {Menu, MenuItem} = remote
	const menu = new Menu()	

	export default {

		components: {
			resizer,
			group
		},

		data() {
			return {
				contextMenuElm: null,
				contextMenuModel: null
			}
		},

		created () {
			// setup context menu
			const vm = this
			menu.append(new MenuItem({label: 'New group..', click() { vm.clickContextMenuOption('new-group')}}))
			menu.append(new MenuItem({type: 'separator'}))
			menu.append(new MenuItem({label: 'Rename..', click() { vm.renameFromContextMenu() }}))
		},

		vuex: {
			getters: {
				settings: state => state.settings,
				active: state => state.active,
				library: state => state.library,
				files: state => state.files
			},

			actions: {
				createGroup,
				createFile,
				updateGroup,
				resetActiveGroup
				// closeFile,
				// newFile,
				// newGroup,
				// newProject,
				// resetActive
			}
		},

		methods: {
			openContextMenu(event, model) {
				this.closeRename()
				this.contextMenuElm = event.target
				this.contextMenuModel = model
				// position the context-menu a bit to the right
				menu.popup(remote.getCurrentWindow(), event.clientX + 5, event.clientY, -1)
			},

			renameFromContextMenu() {
				this.contextMenuElm.setAttribute('contenteditable', true)
				this.contextMenuElm.focus()
				document.execCommand('selectAll', false, null)
				this.contextMenuElm.addEventListener('keypress', this.editName)
			},

			editName() {
				if (event.keyCode == 13) {
					event.preventDefault()
					this.closeRename()
				}
			},

			closeRename() {
				if (this.contextMenuElm && this.contextMenuModel) {
					// update the model name with the new value
					this.contextMenuModel.name = this.contextMenuElm.textContent
					// persist the group name to the db
					this.updateGroup()
					this.contextMenuElm.setAttribute('contenteditable', false)
					this.contextMenuElm.removeEventListener('keypress', this.editName)
					this.contextMenuElm = null
					this.contextMenuModel = null
				}
			}

			
		},

		events: {
			'open-context-menu': 'openContextMenu',
			'global-app-click': 'closeRename'
		},

		computed: {
			sortedData() {
				// first sort the array
				const data = _.orderBy(this.library, ['created'], ['desc']);
				// then convert array to objects, needed for tree view
				return data.reduce((o, v, i) => {
					o[i] = v;
  				return o;
				}, {})
			}
		}

	}
</script>

<style lang="sass" scoped>
	@import "../../css/mixins";
	
	.flex-panel {

		min-width: 200px;
	}

	/*.panel {
		display: flex;
		flex-direction: column; 
		flex-grow: 0;
		flex-shrink: 0;
		min-width: 100px; 
		max-width: 60vw;
		background: mix(#000, #f6f6f6, 10%);
		position: relative;
		
	}

	.panel__file {
		position: relative;
		font-size: 15px;
		padding: 7px 10px;
		white-space: nowrap;
		overflow: hidden;
		cursor: pointer;
		
		&:hover {
			.file__close {
				opacity: 1;
			}
		}
		
		&.is-active {
			background: mix(#000, #f6f6f6, 5%);
			color: #333;
		}
	}

	.file__close {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 3px;
		opacity: 0;
	}

	.files {
		flex: 1;
		max-height: calc(100vh - 53px); 
		overflow: scroll;
		border-right: 1px solid mix(#000, #f6f6f6, 20%);
	}

	.actions {
		border-top: 1px solid mix(#000, #f6f6f6, 20%);
		height: 30px;
		align-items: flex-end;
	}*/

</style>