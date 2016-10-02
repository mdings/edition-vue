<template>
  <li>
    <div :class="{'is-folder': isFolder,  'is-open': open}" @click="toggle()"></div>
    <span data-id="{{model.id}}"
      @contextmenu="openContextMenu(model)"
      contenteditable="false" 
      @click="setActive(model)"
      @drop="drop(group)" 
      @dragover="dragOver()" 
      @dragleave="dragLeave()"
      :class="{'is-active': active.group === model}">
      {{model.name}}
    </span>
    <ul v-show="open" v-if="isFolder">
      <group class="item" v-for="model in sortedData" :model="model"></group>
    </ul>
  </li>
</template>

<script>
  import _ from 'lodash'  
  import {setActiveGroup, updateGroup} from '../vuex/actions'

  export default {
    name: 'group',

    data: function () {
      return {
        open: false
      }
    },

    props: {
      model: Object
    },

    vuex: {
      getters: {
        library: state => state.library,
        active: state => state.active,
        files: state => state.files
      },
      actions: {
        setActiveGroup,
        updateGroup
        // setActiveGroup,
        // saveRecord
      }
    },

    computed: {
      isFolder() {
        return this.model.nodes && this.model.nodes.length
      },

      sortedData() {
        return _.orderBy(this.model.nodes, ['created'], ['desc']);
      }
    },

    created() {
    },

    methods: {
      setActive(model) {
        if (event.target.getAttribute('contenteditable') == "true") {
          event.stopPropagation()  
        }
        this.setActiveGroup(model)
      },

      drop() {
        const fileId = event.dataTransfer.getData('fileId')
        const group = event.srcElement.getAttribute('data-id')
        this.active.drag.group = group
        event.srcElement.removeAttribute('style')
      },

      dragOver() {
        const fileId = event.dataTransfer.getData('fileId');
        const fileGroup = event.dataTransfer.getData('fileGroup');
        const group = event.srcElement.getAttribute('data-id')

        if (group != fileGroup) {
          event.srcElement.style.backgroundColor = 'red'  
        }
        
        event.preventDefault()
      },

      dragLeave() {
        event.srcElement.removeAttribute('style')
      },

      toggle(model) {
        if (this.isFolder) {
          this.open = !this.open
        }
      },

      openContextMenu(model) {
        let e = event
        this.setActiveGroup(model)
        setTimeout(() => {
          this.$dispatch('open-context-menu', e, model)  
        }, 10)
        
      }

    }
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