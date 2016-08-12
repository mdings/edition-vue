<template>
	<div id="wrapper">
		<textarea id="editor"></textarea>
		<div id="toolbar">toolbar</div>
	</div>
</template>

<script>
	import CodeMirror from 'codemirror'
	import 'codemirror/mode/gfm/gfm'
	import {saveContent} from '../vuex/actions'

	let activeId
	// let cheerio = require('cheerio')

	export default {

		created() {
			this.$watch('active', this.updateContent)
			this.$nextTick(this.initCodeMirror)
		},

		methods: {
			initCodeMirror() {
				this.editor = CodeMirror.fromTextArea(document.getElementById('editor'), {
        	lineNumbers: true,
        	lineWrapping: true,
        	scrollbarStyle: 'null',
        	mode: 'gfm'
    		});

				this.editor.on('change', (e) => {
					this.active.content = this.editor.getValue()
					this.saveContent()
				});
			},

			updateContent() {
				// if (this.active.id != activeId) {
					this.editor.setValue(this.active.content)
					activeId = this.activeId	
				// }
			}
		},

		vuex: {
			getters: {
				active: state => state.active.file
			},
			actions: {
				saveContent
			}
		}
	}
</script>

<style lang="sass">
	
	#wrapper {
		display: flex; 
		flex-direction: column; 
		flex-grow: 1;
		height: calc(100vh - 23px);
		background-color: mix(#fff, #f6f6f6, 70%);
		
		.is-resizing & {
      cursor: col-resize;
    }
	}

	#toolbar {
		border-top: 1px solid mix(#000, #f6f6f6, 20%);
		align-items: flex-end;
		min-height: 30px; 
	}

	#editor {
		text-rendering: optimizeLegibility;
		// max-width: 600px; 
		width: 100%; 
		flex-grow: 1;
		position: relative;
		left: 50%;
		transform: translateX(-50%);
	}

	

</style>