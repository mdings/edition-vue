<template>
  <div class="panel__resizer"></div>
</template>

<script>
  import {} from '../vuex/actions'
  let startX, startWidth

  export default {
    
    ready() {
      this.$el.addEventListener('mousedown', this.initDrag, false)
    },

    vuex: {
      actions: {
        // updateSettings
      }
    },

    methods: {
      initDrag(e) {
        startX = e.clientX;
        startWidth = parseInt(document.defaultView.getComputedStyle(this.$el.parentNode).width, 10)
        document.body.classList.add('is-resizing');
        document.documentElement.addEventListener('mousemove', this.doDrag, false)
        document.documentElement.addEventListener('mouseup', this.stopDrag, false)
      },

      doDrag(e) {
        this.$el.parentNode.style.width = (startWidth + e.clientX - startX) + 'px'
      },

      stopDrag(e) {
        document.body.classList.remove('is-resizing');
        document.documentElement.removeEventListener('mousemove', this.doDrag, false);    
        document.documentElement.removeEventListener('mouseup', this.stopDrag, false);
        this.updateSettings('toolbarWidth', this.$el.parentNode.style.width)
      }
    }

  }
</script>

<style lang="sass" scoped>
  .panel {
    &__resizer {
      position: absolute;
      top: 0;
      bottom: 0;
      right: -1px;
      width: 2px;
      background: transparent;
      cursor: col-resize;
    }  
    
    .is-resizing & {
      cursor: col-resize;
    }
  }
  
</style>