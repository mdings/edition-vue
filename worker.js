const {remote,ipcRenderer} = require('electron')

const stores = {

	library: localforage.createInstance({name: 'library'}),
	files: localforage.createInstance({name: 'files'}),
	settings: localforage.createInstance({name: 'settings'})
}

var files = [];


window.onload = () => {

	/*
	** Loads all records
	*/

	ipcRenderer.on('load-records', (event, payload) => {

		// console.log('loading records')
		let iterator = payload.store
		let records = []

		stores[iterator].iterate((value, key, i) => {

			records.push(value)

		}, () => {

			if (iterator == 'files') {

				files = records	
			}

			ipcRenderer.send('load-records-done', {

				'state': iterator, 
				'records': records
			})
		})
	})

	/*
	** Creates a record
	*/

	ipcRenderer.on('create-record', (event, payload) => {

		console.log('creating record')
		let store = payload.store
		let id = payload.id
		let record = payload.record
		
		files.push(JSON.parse(record))
		stores[store].setItem(id, JSON.parse(record))
	})

	/*
	** Updates a record
	*/

	ipcRenderer.on('update-record', (event, payload) => {

		// console.log('updating record')
		// console.log(payload)
		const store = payload.store
		const id = payload.id
		const record = payload.record

		// update the cache as well
		files.forEach((file) => {

			if(file.id == id) {

				Object.assign(file, JSON.parse(record))
			}
		})

		stores[store].setItem(id, JSON.parse(record))
	})


	/*
	** Filters records inside a group
	*/

	ipcRenderer.on('filter-records', (event, payload) => {

		let records = files.filter((file, i) => {

			return payload.groups.includes(file.group)
			
		})

		ipcRenderer.send('filter-records-done', {

			'state': 'files',
			'records': records
		})
		
	})

}