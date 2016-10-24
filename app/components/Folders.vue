<template>
    <div class="folders">
        <span>External folders</span>
        <div v-for="folder in folders">
            <folder class="folder" :model="folder"></folder>
        </div>
    </div>
</template>

<script>

    import folder from './Folder.vue'

  export default {

    data: function () {

        return {

        }
    },

    components: {

        folder
    },


    props: {
      model: Object
    },

    vuex: {
      getters: {
       
          folders: state => state.folders
      },
      actions: {
      }
    },

    computed: {
      isFolder() {
      },

      sortedData() {
      }
    },

    created() {
    },

    methods: {


    }
  }
</script>

<style lang="sass" scoped>
  
</style>