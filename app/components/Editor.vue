<template>
	<div class="flex-panel flex-grow">
		<div id="editor"></div>
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

			this.$watch('active', this.updateContent)
			this.$nextTick(this.initEditor)
		},

		methods: {

			initEditor() {

				this.editor = new Editor('#editor')
				// this.editor.on('change', () => {

				// 	if(this.active) {

				// 		// this.active.content = this.editor.getTextForStorage()
				// 		// this.updateFile()
				// 	}
					
				// })
			},

			updateContent() {

				console.log('updating content')
				this.editor.setText(this.active.content)
			}
		},

		vuex: {
			getters: {
				active: state => state.active.file
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
		height: 100%;
		/*counter-reset: paragraph;*/
		
		

	}


	.hljs-emphasis {

		font-weight: bold
	}

	.editor__section {
		font-size: 18px;
		position: relative;
		text-shadow: 0 0 0 #000;
		color: transparent;
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