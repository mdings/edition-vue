const { remote, ipcRenderer } = require('electron');
const fs = require('fs');
const mkdirp = require('mkdirp');

let cropImageWidth = 600,
	cropImageHeight = 600

window.onload = () => {
	ipcRenderer.on('sync-start', (event, payload) => {
		let pins = payload
		Object.keys(pins).forEach((pin) => {
			let image = new Image();
			let canvas = document.createElement('canvas');
			let ctx = canvas.getContext('2d');
			let path = remote.app.getPath('userData');

			image.src = pins[pin].image.original.url;
			image.onload = () => {
				ctx.drawImage(image, 70, 20, 50, 50, 0, 0, 100, 100);
				image = null;
				// strip off the data: url prefix to get just the base64-encoded bytes
				let data = canvas.toDataURL().replace(/^data:image\/\w+;base64,/, '');
				let buffer = new Buffer(data, 'base64');
				// create the path if does not yet exist
				mkdirp(`${path}/Imagecache/`, (err) => {
					if (err) throw err;
					fs.writeFile(`${path}/Imagecache/${pins[pin].id}.jpg`, buffer, 'utf-8', (err) => {
						ipcRenderer.send('sync-done', {
							pin: pin,
							path: `${path}/Imagecache/${pins[pin].id}.jpg`
						});	
					});	
				});
			}
		})
	});
};