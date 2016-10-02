<template>
    <div class="flex-panel">
        <div class="files">
            <div v-if="active.group">Showing files in {{active.group.name}} ({{filterData.length}})</div>
            <div v-if="!active.group">Showing all files ({{files.length}})</div>

            <div v-for="file in files" 
                class="file"
                @click="setActiveFile(file)" 
                :class="{'is-active': file == this.active.file}" 
                draggable="true" 
                @dragstart="drag(file)">
                {{file.name}}
            </div>
        </div>

        <resizer></resizer>

    </div>
</template>

<script>
    import resizer from './Resizer.vue'
    import file from './File.vue'
    import _ from 'lodash'
    import {setActiveFile} from '../vuex/actions'
  
    export default {

        ready() {

        },

        components: {
            resizer,
            file
        },

        vuex: {
            getters: {
                files: state => state.files,
                active: state => state.active
            },

            actions: {
                // newFile,
                setActiveFile,
                // setActiveDragFile
            }
        },

        computed: {
            filterData() {
                return this.files.filter((file) => {
                    if (this.active.group && this.active.group.ids) {
                        return this.active.group.ids.indexOf(file.group) > -1
                    } else {
                        return file
                    }
                })
            }
        },

        methods: {
            drag(file) {
                this.setActiveDragFile(file)
                event.dataTransfer.setData('fileId', file.id);
                event.dataTransfer.setData('fileGroup', file.group);
            }
        }

    }
</script>

<style lang="sass" scoped>

  .flex-panel {

    min-width: 200px;
  }

  .files {

      overflow-y: auto;
      height: 100%;
  }
 /*.files {
   width: 400px;
   height: 100vh;
   overflow: scroll;
 }

 .file {
   min-height: 60px;
   padding: 20px;
   border-bottom: 1px solid #f2f3f2;
 }

 .is-active {
   background-color: blue
 }*/
</style>