<template>
	<div class="toolbar">
		<div class="title">Pinterest - {{title}}</div>
		<div class="toolbar__actions">
			<button class="btn btn--expanded" @click="showExpanded"></button>
			<button class="btn btn--squared" @click="showSquares"></button>
			<button class="btn btn--inspector" @click="toggleInspector"></button>
			<button class="btn btn--horizontal" @click="fitHorizontal"></button>
			<button class="btn btn--vertical" @click="fitVertical"></button>
		</div>
	</div>
</template>

<script>
	export default {

		data() {
			return {
				title: ''
			}
		},

		methods: {
			showExpanded () {
				const container = document.querySelector('main');
				container.classList.remove('is-square-pins')
				this.$dispatch('refresh-masonry')
			},

			showSquares () {
				const container = document.querySelector('main');
				container.classList.add('is-square-pins')
				this.$dispatch('refresh-masonry')
			},

			toggleInspector () {
				this.$dispatch('toggle-inspector')
			},

			fitHorizontal () {
				const container = document.querySelector('main');
				container.classList.remove('fit-vertical')
				container.classList.add('fit-horizontal')
			},

			fitVertical () {
				const container = document.querySelector('main');
				container.classList.remove('fit-horizontal')
				container.classList.add('fit-vertical')
			},

			setTitle ($id, $name) {
				this.title = $name;
			}
		},

		events: {
			'select-board': 'setTitle'
		}
	}
</script>

<style lang="sass" scoped>
	@import "../../css/mixins";
	
	.title {
		padding: 3px 15px;
		font-size: 14px;
		font-weight: 500;
		text-align: center;
	}

	.toolbar {
		z-index: 9;
		position: relative;  
		height: 50px;
		background: linear-gradient(rgba(235,235,235,1), rgba(235,235,235,1));
		box-shadow: inset 0px -1px rgba(150,150,150,1); 
	}

	.toolbar__actions {
		float: right;
		margin-right: 8px;
	}

	.btn {
		width: 20px;
		height: 20px;
		border: none;
		outline: 0;
		
		&--expanded {
			@include icon-before {
				content: '\f192'
			}
		}

		&--squared {
			@include icon-before {
				content: '\f111'
			}
		}

		&--inspector {
			@include icon-before {
				content: '\f129'
			}
		}

		&--horizontal {
			@include icon-before {
				content: '\f07e'
			}
		}

		&--vertical {
			@include icon-before {
				content: '\f07d'
			}
		}
	}

	
</style>