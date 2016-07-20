<template>
	<main>
		<div class="pins">
			<button @click="checkNewPins">Check for new pins</button>
			<div class="pins__container">
				<pin :pin="pin" v-for="pin in pins">
					
				</pin>
			</div>
			<button @click="loadMore">Load more pins</button>
		</div>
		<Editor></Editor>
	</main>
</template>

<script>
	import Pin from './Pin.vue'
	import Editor from './Editor.vue'
	import Masonry from 'masonry-layout'
	

	// @TODO: store this in database
	let accessToken = 'AQZE086L5E6cTMoxMAlANM5737AyFFmVNReMsTdDLtxyksBBxAAAAAA'
	let msnry
	let drag = 0
	let mq
	let url

	module.exports = {

		data () {
			return {
				containerHeight: null,
				loadInProgress: false,
				pins: [],
				width: null,
				board: null,
				render: false // flag to indicate dom can be re-rendered
			}
		},

		components: {
			Pin,
			Editor
		},

		created () {
			// update masonry when the pins are changing
			this.$watch('pins', () => {
				this.$nextTick(() => {
					this.masonry()
					this.loadInProgress = false
				})
			})
		},

		ready () {

			// @TODO: Make sure to set the offset (800) to an integer that is always manageable
			// document.querySelector('.pins').addEventListener('scroll', (elm) => {
			// 	if ((elm.srcElement.scrollTop + elm.srcElement.clientHeight) > (this.containerHeight - 800)) {
			// 		if(this.loadInProgress === false) {
			// 			this.getRecentPins();
			// 		}
			// 	}
			// })

			// this.getRecentPins(url)

			// init media queries
			// mq = window.matchMedia('(min-width: 1100px)');
			// this.width = document.querySelector('.pins').clientWidth;
			// init drag and drop
			// const holder = document.querySelector('#scrollArea');
			// const body = document.querySelector('body');

			// holder.ondragenter = () => {
			// 	drag++
			// 	body.classList.add('on-drag-over')
			// };

			// holder.ondragover = () => {	
   //  			return false;
  	// 		};

  	// 		holder.ondragleave = holder.ondragend = () => {
  	// 			drag--
  	// 			if (drag == 0) body.classList.remove('on-drag-over')
   //  			return false;
  	// 		};
  			
  	// 		holder.ondrop = (e) => {
   //  			e.preventDefault();
   //  			const file = e.dataTransfer.files[0];
   //  			body.classList.remove('on-drag-over')
   //  			this.uploadImage(file.path);
   //  			drag = 0;
   //  			return false;
  	// 		};
		},

		methods: {
			checkNewPins () {
				this.$http.get(url).then((response) => {
					localforage.getItem(this.board, (err, data) => {
						let pins = data.pins
						let page = (data.page) ? data.page : null
						response.data.data.forEach((pin) => {
							if (pin.created_at > pins[0].created_at) {
								// add pin at the beginnen of the loop
								pins.unshift(pin)
							}
						})
						// save the updated array to the db
						localforage.setItem(this.board, {'pins': pins, 'page': page})

						if (pins > this.pins) {
							this.pins = pins
						}
					})
				})
			},


			loadMore () {
				localforage.getItem(this.board, (err, data) => {
					if (data.page) {
						this.getRecentPins(data.page)	
					} else {
						console.log('congrats, you reached the end of the internet')
					}
					
				})
			},

			getRecentPins ($url) {
				// freeze the lazyloader until done loading
				this.loadInProgress = true;

				localforage.getItem(this.board, (err, data) => {
					if (data) {
						if (data.pins.length > this.pins.length) {
							console.log(`loading ${data.pins.length} items from the store`)
							// first render the first 20
							this.pins = this.pins.concat(data.pins.slice(0, 20))

							// then dynamically append the rest up to 1000
							if (data.pins.length > 20) this.$nextTick(this.appendElements)
						} else {
							this.fetchPins($url)
						}
					} else {
						this.fetchPins($url)
					}
				})
			},

			fetchPins ($url) {

				this.$http.get($url).then((response) => {
					console.log(`fetching from the server`)

					// save to db
					let page = (response.data.page) ? response.data.page.next : null
					localforage.setItem(this.board, {'pins': this.pins, 'page': page})

					// append the pins to the object
					this.pins.push.apply(this.pins, response.data.data)					
				})
			},
			// boardFilter (pin) {
			// 	return this.board ? pin.board.id == this.board : true
			// },

			masonry () {
				console.log('reloading masonry')
				const container = document.querySelector('.pins__container');
				msnry = new Masonry(container, {
			  		itemSelector: '.pin',
			  		fitWidth: true,
			  		transitionDuration: '0.2s',
				})
				
				// store the height of the container
				this.containerHeight = container.clientHeight
			},

			appendElements() {
				localforage.getItem(this.board, (err, data) => {
					this.pins = this.pins.concat(data.pins.slice(20, 1000))
				})
			},


			selectBoard ($id, $name) {
				// reset the pins
				this.pins.length = 0

				// save the board $id
				this.board = ($id < 0) ? '000000' : $id;

				// if no board is specified, get the most recent pins
				// otherwise get the board specified
				if ($id < 0) {
					url = `https://api.pinterest.com/v1/me/pins/?access_token=${accessToken}&limit=100&fields=note,counts,link,board,created_at,color,image[800x800]`
				} else {
					url = `https://api.pinterest.com/v1/boards/${$id}/pins/?access_token=${accessToken}&limit=100&fields=note,counts,link,board,created_at,color,image[800x800]`
				}

				// fetch the pins from store or server
				this.getRecentPins(url)

				// go to top of page
				const container = document.querySelector('.pins');
				container.scrollTop = 0

				// close the editor if it's open
				this.$broadcast('close-editor')
			},

			uploadImage ($filePath) {
				const image = new Image()
				const canvas = document.createElement('canvas')
				const ctx = canvas.getContext('2d')
				image.src = $filePath;
				image.onload = () => {
					canvas.width = image.width;
					canvas.height = image.height;
					ctx.drawImage(image, 0, 0, image.width, image.height)
					const url = `https://api.pinterest.com/v1/pins/?access_token=${accessToken}`;
					this.$http.post(url, {
						board: this.board,
						note: '',
						image_base64: canvas.toDataURL()
					}).then((e) => {
						console.log(e)
	        		})
				}
			}
		},

		events: {
			'select-board': 'selectBoard',
			'refresh-masonry': 'masonry'
		}
	};
</script>

<style lang="sass">
	
	main {
		position: absolute;
		top: 50px;
		left: 250px;
		right: 0;
		bottom: 0;
		display: flex;  
	}

	.pins {
		flex-grow: 1;	
		overflow-y: scroll;
	}

	.pins__container {
		padding-top: 20px;
		margin: 0 auto;
	}

</style>