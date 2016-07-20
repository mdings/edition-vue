<template>
	<div class="editor" v-if="pin" :style="{backgroundColor: backgroundColor(pin.color)}" transition="fade-in" >
		<!-- <span class="editor__button button--close" @click="closeEditor">X</span> -->
		<div class="editor__scroller" @click="closeEditor">	
			<div>
				<img :src="pin.image.original.url">
			</div>
		</div>
		<Inspector :model="pin"></Inspector>
	</div>
</template>

<script>
	import Inspector from './Inspector.vue'

	export default {

		data() {
			return {
				pin: null
			}
		},

		components: {
			Inspector
		},

		methods: {
			showImage ($pin) {
				this.pin = $pin
			},

			closeEditor () {
				console.log('closing editor')
				this.pin = null
			},

			backgroundColor ($color) {
				if ($color) {
					const hex = $color.replace('#','');
	    			const r = parseInt(hex.substring(0,2), 16);
	    			const g = parseInt(hex.substring(2,4), 16);
	    			const b = parseInt(hex.substring(4,6), 16);
	    			const average = (r+g+b) / 3;
	    			// treshold to check if the color is white enough
					return (average > 245) ? $color : '#222';
				} else {
					return '#222';
				}
				
			},

			// http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
			// version 2
			shade ($color) {
				const percent = '-0.4';
				let f=parseInt($color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
				return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
			}
		},

		events: {
			'close-editor': 'closeEditor', 
			'show-image': 'showImage'
		}
	}
</script>

<style lang="sass" scoped>

	.editor {
		display: flex; 
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		// background-color: #222 !important;
		bottom: 0;

		&.fade-in-transition {
			opacity: 1;
			transition: opacity 250ms;
		}

		&.fade-in-enter,
		&.fade-in-leave {
			opacity: 0;
		}

	}

	.editor__scroller {
		overflow-y: scroll;
		flex-grow: 1;
		// display: flex;
    	// justify-content: center;
    	align-items: center; 
    	// min-height: calc(100vh - 50px);
		
		> div {
			// display: flex;
		 	min-height: calc(100vh - 50px);
    		
			img {
				display: block;  
				max-width: 100%; 
				transition: height 250ms;
				margin: 0 auto;
				height: auto; 
				
				.fit-vertical & {
					max-height: calc(100vh - 50px);
					object-fit: cover;	
				}
				
			}
		}
	}

	.editor__button {
		color: #fff;
		cursor: pointer;
		position: absolute;
		right: 20px;
		top: 20px;
		font-size: 30px;
		z-index: 5; 
	}
</style>