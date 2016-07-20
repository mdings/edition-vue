<template>
	<div class="pins">
		<Pin v-for="pin in pins" 
			:img="pin.image.original.url"
			:board="pin.board.name"
		></Pin>
    </div>
</template>

<script>

import Pin from './Pin.vue'
// const Clusterize = require("vue-clusterize/clusterize")
// const ClusterizeRow = require("vue-clusterize/clusterize-row")

export default {


    components: {
    	Pin
    },

	ready() {

	},

	props: ['pins']


    

}
</script>

<style lang="sass">
.pins {
	margin-left: 250px;
	display: flex;
	flex-wrap: wrap;
	height: 100%;
	overflow: scroll;
}


</style>