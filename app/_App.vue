 <template>
    <Aside></Aside>
    <Pins
      :pins="pins | filterByCategory category"
    ></Pins>
</template>

<script>
import { ipcRenderer } from 'electron'
import { filterByCategory } from './filters'

import Aside from './components/Aside.vue'
import Pins from './components/Pins.vue'


const storage = require('electron-json-storage');
let accessToken = 'ATzVPyziD2ApCc6L92uYkcECXfqDFFdl281qrJpDKkY7_gBEWwAAAAA';

export default {

    components: {
        Aside,
        Pins
    },

    data() {
      return {
        pins: {},
        category: ''
      }
    },

    filters: {
      filterByCategory: filterByCategory
    },

    created() {
      // 100 is max allowed by pinteres so we have to put them in a loop
      let url = `https://api.pinterest.com/v1/me/pins/?access_token=${accessToken}&fields=image,color,link,media,board,url&limit=100`;

      // check if the pins are set, otherwise fetch them from the API
      storage.get('pins', (error, data) => {
        if (error) throw error;

        if(data.pins) {
          // send background task. make sure to do the sync signaling before setting the vue object
          // this.$broadcast('set-sync-total', Object.keys(data.pins).length);
          // ipcRenderer.send('sync-start', data.pins);  
          this.pins = data.pins;
        } else {
          this.fetchAllPins(url)
        }
      });

      ipcRenderer.on('sync-done', (event, payload) => {
        // set a flag that the local image is created
        this.pins[payload.pin].cache = payload.path;
        console.log('sync done');
      })

      // this.fetchAllPins(url)
      // retrieve pins from API
        // this.$http.get(`https://api.pinterest.com/v1/me/pins/?access_token=${accessToken}&fields=image,color,link,media,url&limit=100`).then((response) => {

        //  // // display the placeholders
        //  this.pins = response.data;
        // })
    },

    methods: {

      fetchAllPins(url) {
        this.$http.get(url).then((response) => {
            response.data.data.forEach((pin) => {
              console.log(pin.id);
              this.pins[pin.id] = pin;
              // indicate the image has not been loaded offline yet
              this.pins[pin.id]['cache'] = false;
            })
            if (response.data.page.next) {
              this.fetchAllPins(response.data.page.next)
            } else {
              storage.set('pins', {pins: this.pins}, (error) => {
                if (error) throw error;

                
              });
            }
          })
      },

      categorySelect(id) {
        this.category = id;
      }
    },

    events: {
      'category-select': 'categorySelect'
    }
}
</script>

<style lang="sass">
*,
*:before,
*:after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

html {
    overflow: hidden;
    height: 100%;
}

body {
    height: 100%;
    overflow: auto;
}


.container {
    border: 1px solid red;
    display: flex;
}


</style>
