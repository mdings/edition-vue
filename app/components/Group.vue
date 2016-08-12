<template>
  <li>
    <div :class="{'is-folder': isFolder,  'is-open': open}" @click="toggle()"></div>
    <span 
      contenteditable="editable" 
      @contextmenu="openContext(model)"
      @click="setActiveGroup(model)"
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
        editable: true,
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

      openContext(model) {
        this.$dispatch('open-context-menu', event.target, model)
      },

      renameGroup (event, model) {
        let elm = event.target
        elm.setAttribute('contenteditable', true)
        elm.focus()
        elm.addEventListener('keypress', (e) => {
          if (e.keyCode == 13 || e.keyCode == 10) {
            // set the new filename to the model and disable editing
            model.name = elm.textContent
            elm.setAttribute('contenteditable', false)
            // save the name-change to the db
            this.updateGroup()
            e.preventDefault()
          }
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import "../../css/mixins";

  ul {
    margin-left: 10px;
  }

  .is-active {
    background-color: #f2f3f2;
  }

  [contenteditable=true] {
    background: #fff
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