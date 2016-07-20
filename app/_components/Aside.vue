<template>
	<aside>
		<Boards></Boards>
		<Activity></Activity>
	</aside>
</template>

<script>
import Boards from './Boards.vue'
import Activity from './Activity.vue'

export default {

	components: {
		Boards,
		Activity
	}
}
</script>

<style lang="sass">
	aside {
		position: relative;
	    padding: 20px;
	    position: fixed;
	    height: 100%;
	    background-color: #333;
	    color: #fff;
	    width: 250px;
	}
</style>