<template>
	<div class="flex-panel flex-grow">
		<div id="editor"></div>
		<input type="button" v-on:click="saveContent()" value="save">
		<div class="zero-state" v-show="!active">
			Klik op een file om deze aan te passen.
			Of maak een nieuwe file aan.
		</div>
	</div>
</template>

<script>
	import Editor from 'editor'
	import {updateFile} from '../vuex/actions'

	let activeId

	export default {

		data() {
			return {
				markup: null
			}
		},

		ready() {

			this.$watch('activeFile', this.updateContent)
			this.$nextTick(this.initEditor)
		},

		methods: {

			initEditor() {

				this.editor = new Editor('#editor')

				this.editor.on('change', () => {
					
					// update the file if we change the first 
					// parts of the file
					var caret = this.editor.getCaret().start
					if (caret < 140) {

						this.saveContent()
					}
				})
			},

			saveContent() {

				this.activeFile.content = this.editor.getTextForStorage()
				this.updateFile(this.activeFile.id, this.activeFile)
			},

			updateContent() {

				this.editor.setText(this.activeFile.content)
			}
		},

		vuex: {
			getters: {
				activeFile: state => state.active.file
			},
			actions: {
				updateFile
				// saveContent
			}
		}
	}
</script>

<style lang="sass">
	
	.flex-grow {

		flex-grow: 1;
	}

	#editor {

		overflow: scroll;
		height: 90%;
		/*counter-reset: paragraph;*/
		
		

	}


	.hljs-emphasis {

		background-color: purple;
		color: #fff;
	}

	.editor__section {
		font-size: 18px;
		position: relative;
		/*text-shadow: 0 0 0 #000;*/
		/*color: transparent;*/
		padding: 0 50px;
			line-height: 32px;
			min-height: 32px;

			.hljs-section {

				font-weight: bold;
			}
		}

		#editor > div:not(:empty)::before {
			display: block;
			position: absolute;
			left: 0;
			/*counter-increment: paragraph;*/
			/*content: counter(paragraph);*/
		}
	
	/*#editor {

		min-width: 500px;
		border: 1px solid red;
		width: 100%;
		height: 100vh;

		& > div {
			min-height: 24px;
		}

		.hljs-section {

			font-weight: bold;
		}

		.hljs-emphasis {

			font-weight: bold;
		}
	}*/
	
	
</style>