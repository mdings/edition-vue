<template>
	<div class="pin">
		<img v-bind:src="img">
	</div>
</template>
<script>
import SmartCrop from 'smartcrop'

export default {

	props: ['board', 'img'],

	data() {
		return {
			backgroundImage: ''
		}
	},

	created() {
		// let img = new Image();
		// img.src = this.img;
		// img.onload = () => {
		// 	SmartCrop.crop(img, {minScale: .4, width: 500, height: 500}, (result) => {
		// 		let crop = result.topCrop
		// 		let canvas = document.createElement('canvas')
		// 		let ctx = canvas.getContext('2d')
		// 		canvas.width = 500
		// 		canvas.height = 500
		// 		ctx.drawImage(img, crop.x, crop.y, crop.width, crop.height, 0, 0, canvas.width, canvas.height);
		// 		this.backgroundImage = canvas.toDataURL();
		// 		canvas = null;
		// 	});
		// }
	},

	methods: {
	}

	
}
</script>
<style lang="sass">
.pin {
  float: left;
  width: (100/3)*1%;
  padding: 20px;
  
  &:nth-child(2n) {
    clear: left;
  }
  
  &:nth-child(2n+1){
    margin-right: 0;
  }

  img { 
  	display: block; 
  	object-fit: contain;
  	width: 100%;
  	height: 320px; 
  }
}
</style>