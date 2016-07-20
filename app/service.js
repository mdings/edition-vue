// import { updateBoards } from './vuex/actions'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource);

const accessToken = 'AQZE086L5E6cTMoxMAlANM5737AyFFmVNReMsTdDLtxyksBBxAAAAAA'

export default class SyncService{

	constructor () {
	}

	syncBoards () {

	}


	fetchBoards () {
		const url = `https://api.pinterest.com/v1/me/boards/?access_token=${accessToken}`
		return this.fetch(url);
	}

	fetch ($url) {
		return Vue.http.get($url)
		.then((e) => {
			return e.data.data
		})
	}
}