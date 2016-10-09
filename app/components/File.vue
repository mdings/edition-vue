<template>
  <div class="file">
   {{title}}
  </div>
</template>

<script>
  import marked from 'marked'

  export default {
    props: ['model'],

    computed: {
      title() {
        // const markup = marked(this.model.content)
        // const string = markup.replace(/(<([^>]+)>)/ig,"").substr(0, 140);
        // return (string.length > 0) ? string : 'No title'
        return this.model.name
      }
    },

    vuex: {
      getters: {
        active: state => state.active
      }
    }

  }
</script>

<style lang="sass" scoped>
.file {
  min-height: 60px;
  border-bottom: 1px solid #f1f2f4;
}
</style>
