<template>

    <li>
    <div :class="{'is-folder': isFolder,  'is-open': open}" @click="toggle()"></div>
    <span>
      {{model.name}}
    </span>
    <ul v-show="open" v-if="isFolder">
      <folder class="folder" v-for="model in model.children" :model="model"></folder>
    </ul>
  </li>
    
</template>

<script>

    export default {

        name: 'folder',

        computed: {

            isFolder() {

                return this.model.children && this.model.children.length
            },
        },

        data: function () {

            return {

                open: false
            }
        },

        created() {

        },

        methods: {

            toggle(model) {

                if (this.isFolder) {

                    this.open = !this.open
                }
            },
        },

         props: {
            model: Object
        },
    }

</script>

<style lang="sass" scoped>
  @import "../../css/mixins";

  ul {
    margin-left: 10px;
  }

  span {
    white-space: nowrap;
  }

  .is-active {
    background-color: #f2f3f2;
  }

  [contenteditable=true] {
    background: red;
    color: #fff;
  }

  .is-folder {
    display: inline-block;
    width: 0;
    height: 0;
    border-top: 4px solid transparent;
    border-bottom: 4px solid transparent;
    border-left: 4px solid #222;
    border-right: 4px solid transparent;
    
    &.is-open {
      border-top-color: #222;
      border-left-color: transparent;
    }
  }
</style>