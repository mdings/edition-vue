<template>
  <div class="title">
    Edition <span v-show="active.file.name">- {{active.file.name}}</span>
  </div>
  <!-- <div class="toolbar">
    <button class="button button--new-file" @click="newFile"></button>
  </div> -->
</template>

<script>
  import {newFile} from '../vuex/actions'

  export default {
    vuex: {
      getters: {
        active: state => state.active
      },
      actions: {
        newFile
      }
    }
  }
</script>

<style lang="sass">
@import "../../css/mixins";

.title {
  line-height: 22px;
  height: 22px;
  text-align: center;
  background: linear-gradient(#e6e4e7, #d6d4d7);
  border-bottom: 1px solid #c0bec1;
}

.toolbar {
  padding: 10px;
  background: #f1f2f1;
}

.button {
  @extend %button;
  @include icon-before {
    font-size: 15px;
    content: '\f044';
  }
}
</style>