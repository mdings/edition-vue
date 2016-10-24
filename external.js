const chokidar = require('chokidar');
const dirTree = require('directory-tree');

ipcRenderer.on('watch-directory', (event, payload) => {

    // var filteredTree = dirTree(payload, ['.jpg', '.png']);
    const filteredTree = dirTree(payload.slice(0, 1).toString(), ['.md']);

    ipcRenderer.send('watch-directory-done', {

        'state': 'folders',
        'records': [filteredTree]
    })

    // payload is an array of dirs
    const watcher = chokidar.watch(payload);
    watcher.on('change', (path) => {


    })

    watcher.on('unlink', (path) => {


    })
    
    watcher.on('add', (path) => {


    })
})