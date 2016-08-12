const {remote,ipcRenderer} = require('electron');

const stores = {
	library: localforage.createInstance({name: 'library'}),
	files: localforage.createInstance({name: 'files'}),
	settings: localforage.createInstance({name: 'settings'})
}

// keep a cached reference
let files = []

window.onload = () => {

	ipcRenderer.on('load-records', (event, payload) => {
		let iterator = payload.store
		let records = []

		stores[iterator].iterate((value, key, i) => {
			records.push(value)
		}, () => {
			// iteration done, cache the files and send signal to rendered process
			if (iterator == 'files') files = records
			ipcRenderer.send('load-records-done', {
				'state': iterator, 
				'records': records
			})
		})
	})

	ipcRenderer.on('create-record', (event, payload) => {
		let store = payload.store
		let id = payload.id
		let record = payload.record

		stores[store].setItem(id, JSON.parse(record))
	})

	ipcRenderer.on('update-record', (event, payload) => {
		let store = payload.store
		let id = payload.id
		let record = payload.record

		stores[store].setItem(id, JSON.parse(record))
	})

	ipcRenderer.on('filter-records', (event, payload) => {
		let records = files.filter((file) => {
			return payload.groups.indexOf(file.group) > -1
		})
		ipcRenderer.send('filter-records-done', {
			'state': 'files',
			'records': records
		})
	})

}