<template>
    <div class="boards">
        <div v-for="board in boards.data" @click="selectCategory(board.id)">
            {{board.name}}
        </div>
    </div>
</template>

<script>
let accessToken = 'ATzVPyziD2ApCc6L92uYkcECXfqDFFdl281qrJpDKkY7_gBEWwAAAAA';

export default {

    created() {
        this.$http.get(`https://api.pinterest.com/v1/me/boards/?access_token=${accessToken}`).then((response) => {
            this.boards = response.data;
        })
    },

	render() {

	},

    data() {
        return {
            boards: []
        }
    },

    methods: {
        selectCategory(id) {
            console.log(id);
            this.$dispatch('category-select', id)
        }
    }

}
</script>

<style lang="sass">


</style>