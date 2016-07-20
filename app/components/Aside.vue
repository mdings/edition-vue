<template>
	<aside>
		<ul id="boards">
			<li @click="selectBoard(-1, 'Most recent')">Most recent</li>
			<li v-for="board in boards" @drop="doDrop(board)" @dragover="allowDrop()" @dragleave="cancelDrop()" @click="selectBoard(board.id, board.name)">{{board.name}} ({{board.counts.pins}})</li>
		</ul>
	</aside>
</template>

<script>
	// @TODO: put this inside a settings thingie
	const accessToken = 'AQZE086L5E6cTMoxMAlANM5737AyFFmVNReMsTdDLtxyksBBxAAAAAA'
	

	export default {
		created () {
			const url = `https://api.pinterest.com/v1/me/boards/?access_token=${accessToken}&limit=100&fields=counts,privacy,reason,id,name,url`
			this.fetchBoards(url)
			this.subscribe()
		},

		data () {
			return {
				boards: []
			}
		},

		methods: {
			fetchBoards ($url) {
				this.$http.get($url).then((e) => {
					this.boards = e.data.data
				})
			},

			allowDrop () {
				event.srcElement.style.backgroundColor = 'red'
				event.preventDefault()
			},

			doDrop ($board) {
				event.preventDefault()
				const id = event.dataTransfer.getData('id');
				// console.log(`dropping pin ${id} to ${$board.id}`)
				const url = `https://api.pinterest.com/v1/pins/pin/?access_token=${accessToken}&fields=id,board`;
				this.$http.patch(url, {
					pin: id,
					board: $board.id
				}).then((e) => {
					console.log(e)
        		})
				event.srcElement.removeAttribute('style')
			},

			cancelDrop () {
				event.srcElement.removeAttribute('style')
			},

			subscribe () {
				setInterval(() => {
					this.fetchBoards(url)
				}, 2000 * 60 * 5) // check new boards every 5 minutes
			},

			selectBoard($id, $name) {
				const li = document.querySelector('.is-active')
				if (li) li.classList.remove('is-active')
				event.srcElement.classList.toggle('is-active')
				this.$dispatch('select-board', $id, $name)
			}
		}
	}

	// import SyncService from '../service'

	// export default {


	// 	created() {
	// 		const service = new SyncService()
	// 		service.syncBoards()
	// 	},

	// 	data() {
	// 		return {
	// 			boards: []
	// 		}
	// 	},

	// 	// vuex: {
	// 	// 	getters: {
	// 	// 		boards: state => state.boards
	// 	// 	}
	// 	// },

	// 	methods: {
	// 		selectBoard($id) {
	// 			this.$dispatch('select-board', $id);
	// 		},

	// 		takeScreenShot() {
	// 			let input = document.getElementById('screenshot-url');
	// 			console.log(input.value);
	// 		},

	// 		fetchBoards() {
	// 			this.$http.get(`https://api.pinterest.com/v1/me/boards/?access_token=${accessToken}`)
	// 				.then((e) => {
 //            			this.boards = e.data.data;
 //            			storage.get('settings', (error, settings) => {
	// 					  	if (error) throw error;

	// 					  	if (!('boardsImported' in settings)) {
	// 					  		console.log('im fetching boards')
	// 					  		// this.boards.forEach((board) => {
	// 	        //     				this.fetchBoard(board.id)
	// 	        //     			})

	// 	            			this.fetchRecent(`https://api.pinterest.com/v1/me/pins/?access_token=${accessToken}&limit=100&fields=id,counts,color,created_at,creator,image[800x800],link,media,metadata,original_link,url`);
	// 	            			// set the first import true
	// 	            			storage.set('settings', {boardsImported: true})
	// 					  	}
	// 					});

            			
            			
 //        		})
	// 		},

	// 		fetchBoard (id) {
	// 			this.$http.get(`https://api.pinterest.com/v1/boards/${id}/pins/?access_token=${accessToken}&fields=id,counts,color,created_at,creator,image[800x800],link,media,metadata,original_link,url`)
	// 				.then((e) => {
	// 					storage.set(`board-${id}`, e.data.data)
	// 				})
	// 		},

	// 		fetchRecent ($url) {
	// 			this.$http.get($url)
	// 			.then((e) => {
	// 				recent = Object.assign(recent, e.data.data);
	// 				console.log(recent)
	// 				if(e.data.page.next) {
	// 					this.fetchRecent(e.data.page.next)
	// 				} else {
	// 					storage.set(`board-recent`, recent)	
	// 				}
					
	// 			})
	// 		}
	// 	}
	// }

</script>

<style lang="sass">
	@import "../../css/mixins";
	
	aside {
		position: absolute;
		top: 50px;
		left: 0;
		bottom: 0;
	    background-color: #333;
	    color: #fff;
	    width: 250px;
	}

	#boards {
		font-size: 13px;
		list-style: none;
		margin: 25px 0 0;
		padding: 0;
		
		li {
			position: relative;
			cursor: pointer;
			margin: 0;
			padding: 8px 8px 8px 35px;
			display: block;
			
			&.is-active {
				background-color: #F38630;
			}

			@include icon-before {
				@extend %vertical-middle;
				content: '\f009';
				left: 10px;
				font-size: 16px;
			}

			&:first-child {
				@include icon-before {
					content: '\f017';
					font-size: 20px;
				}
			}
		}
		
	}
</style>