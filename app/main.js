import Vue from 'vue'
// import VueResource from 'vue-resource'
import store from './vuex/store'
import App from './App.vue'


// Vue.use(VueResource)

new Vue({
	  store,
  	el: 'body',
  	components: { App }
})
