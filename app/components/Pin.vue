<template>
	<div class="pin elem" :style="{height: cHeight + 'px'}">
		<div class="pin__image" @click="showImage(pin)" @dragstart="drag(pin)" draggable="true">
			<img :data-src="pin.image['800x800'].url" data-width="{{pin.image['800x800'].width}}" data-height="{{pin.image['800x800'].height}}">
		</div>
	</div>
</template>

<script>
	import inViewport from 'in-viewport'

	export default {

		ready () {
			// const watcher = inViewport(this.$el, ($elm) => {
			// 	const $img = $elm.querySelector('img')
			// 	const src = $img.getAttribute('data-src')
			// 	$img.setAttribute('src', src)
			// 	$img.onload = () => {
			// 		$img.classList.add('fade-in')
			// 		watcher.dispose()
			// 	}
			// });
			const $img = this.$el.querySelector('img')
			const src = $img.getAttribute('data-src')
			const rand = new Date().getTime();
			$img.setAttribute('src', `${src}?time=${rand}`)
			$img.onload = () => {
				$img.classList.add('fade-in')
			}

		},

		props: ['pin'],

		methods: {
			showImage ($pin) {
				this.$dispatch('show-image', $pin);
			},

			drag ($pin) {
				event.dataTransfer.setData('id', $pin.id);
			}
		},

		computed: {
			cHeight() {
				// lazyload those bitches
				let ratio = this.pin.image['800x800'].width / 300;
				let height = this.pin.image['800x800'].height / ratio;

				return parseInt(height);
			}
		}
	}
</script>

<style lang="sass" scoped>

	$spacing: 8px;
	
	.pin {
		cursor: pointer;
		width: 300px;

		
		.is-square-pins & {
			height: 250px !important;
			
			img {
				object-fit: cover;
			}
		}
	}

	.pin__image {
		position: absolute;
		left: $spacing;
		right: $spacing;
		top: $spacing;
		bottom: $spacing;
		background: #111;
	}

	img {
		display: block; 
		width: 100%;
		height: 100%; 
		opacity: 0;
		transition: opacity 300ms ease-in;
		
		&.fade-in {
			opacity: 1;
		}
	}
</style>