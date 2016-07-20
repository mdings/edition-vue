<template>
	<div class="inspector">
		<div class="inspector__divider">
			<label>Description</label>
			<textarea placeholder="No description" v-model="model.note"></textarea>
			<a v-if="model.link" href="javascript:;" @click="openExternal(model.link)">Visit source</a>
			<div>{{model.image.original.width}} x  {{model.image.original.height}}</div>
			<div>{{readableDate(model.created_at)}}</div>
			<div>likes: {{model.counts.likes}}</div>
			<div>repins: {{model.counts.repins}}</div>
			<button class="btn btn--save" @click="savePin(model)">Save to Pinterest</button>
		</div>
	</div>
</template>

<script>
	const {shell} = require('electron')
	const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	const accessToken = 'AQZE086L5E6cTMoxMAlANM5737AyFFmVNReMsTdDLtxyksBBxAAAAAA'

	export default {	

		ready() {
			console.log(this.model.counts)
		},

		props: ['model'],

		computed: {

		},

		methods: {
			readableDate ($timestamp) {
				const date = new Date($timestamp)
				return `${monthNames[date.getMonth()]} ${date.getDay()} ${date.getFullYear()} @ ${date.getHours()}:${date.getMinutes()}`
			},

			toggleInspector () {
				const container = document.querySelector('main')
				container.classList.toggle('is-open')
				
			},

			openExternal ($url) {
				shell.openExternal($url)
				return false
			},

			savePin ($model) {
				const url = `https://api.pinterest.com/v1/pins/pin/?access_token=${accessToken}&fields=id,link,note,url`;
				this.$http.patch(url, {
					pin: $model.id,
					note: $model.note
				}).then((e) => {
					console.log(e)
        		})
			}
		},

		events: {
			'toggle-inspector': 'toggleInspector'
		}
	}
</script>

<style lang="sass" scoped>
	.inspector {
		box-shadow: inset 1px 0px #ccc;
		background-color: #ebebeb;
		width: 0;
		transform: translateX(100%);
		transition: all 150ms ease-out;
		
		.is-open & {
			transform: translateX(0%);
			width: 280px;
			flex-basis: auto;
		}
	}

	.inspector__divider {
		padding: 20px;
	}

	label {
		float: left;
	}

	textarea {
		outline: none;
		width: 240px; 
		height: 100px;
		padding: 5px;
		resize: none;
		border-radius: 3px;
		border: 1px solid darken(#ebebeb, 10%);
		display: block; 
	}

	.btn {
		cursor: pointer;
		background-color: #CC333F;
		padding: 10px;
		font-size: 15px;
		color: #f2f3f1;
		background-color: #F38630;
		outline: none;
		display: block;
		width: 100%;
		border: none; 
	}
</style>