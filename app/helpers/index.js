let row = (data) => {
	let html = `<div class="row">`
	data.forEach((elm) => {
		html += `<div class="pin"><img src="${elm.image.original.url}"></div>`
		// html += `<div class="pin">${elm.id}</div>`
	})
	html +=  `</div>`
	return html
}

let columnize = (data, itemsPerRow) => {
	let store = [];
	for (let i=0; i<data.length; i=i+itemsPerRow) {
		let start = i
		let end = start + itemsPerRow
		store.push(row(data.slice(start,end)))	
	}
	return store
}

export {columnize};