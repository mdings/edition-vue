import Vue from 'vue'
import Vuex from 'vuex'
import uniqid from 'uniqid'
import _ from 'lodash'

const ipc = require('electron').ipcRenderer;

Vue.use(Vuex)

const state = {
  settings: {},
  library: [],
  folders: [],
  files: [],
  active: {
    drag: null,
    group: null,
    file: null // might to rename this to 'editor' for consistency sake
  },
}

const mutations = {

  /* CRUD ACTIONS */
  CREATE_FILE (state) {
    let id = uniqid()
    
    const file = {
      id: id,
      group: state.active.group.id,
      type: 'file',
      name: 'Untitled.md' + _.random(1,50),
      created: new Date().getTime(),
      modified: new Date().getTime(),
      content: ''
    }

    state.files.push(file)

    ipc.send('create-record', {
      'store': 'files',
      'id': id,
      'record': JSON.stringify(file)
    })
  },

  CREATE_GROUP (state) {
    let id = uniqid()

    const group = {
      id: id,
      name: 'Group' + _.random(1,50),
      children: [],
      created: new Date().getTime(),
    }

    // If there's an active state then append it to there
    if(!state.active.group) {

      state.library.push(group)

    } else {

      state.active.group.children.push(group)

    }

    mutations.UPDATE_GROUP(state)
  },

  READ_FILE (state) {

  },

  READ_GROUP (state) {

  },

  UPDATE_FILE (state, id, record) {

    ipc.send('update-record', {
      'store': 'files',
      'id': id,
      'record': JSON.stringify(record)
    })
  },

  UPDATE_GROUP (state) {
    // @TODO: we might want to filter the saving of the object by id
    // to avoid having to save the full db over and over
    state.library.forEach((record) => {
      ipc.send('update-record', {
        'store': 'library', 
        'id': record.id, 
        'record': JSON.stringify(record)
      })
    })
  },

  DELETE_FILE (state) {

  },

  REMOVE_LOCAL_FILE (state, id) {

    state.files = state.files.filter((file) => {

      return file.id != id
    })
  },

  DELETE_GROUP (state) {

  },

  /* STATE MODIFIERS */
  SET_STATE (state, payload) {
    
    console.log(payload.records)
    state[payload.state] = payload.records
  },

  SET_ACTIVE_GROUP (state, group) {
    // get the ids recursively from the nested groups
    const getIds = (ids, node) => {
      ids.push(node.id)
      if (node.nodes && node.nodes.length) {
        node.nodes.forEach((node) => {
          getIds(ids, node)
        })
      }
    }
    let ids = []
    getIds(ids, group)
    console.log('filtering records')
    ipc.send('filter-records', {'groups': ids})
    state.active.group = group
  },

  RESET_ACTIVE_GROUP (state, type) {
    state.active.group = null
  },

  SET_ACTIVE_FILE (state, file) {
    state.active.file = file
  },






















  NEW_FILE (state) {
    let id = uniqid()
    
    const file = {
      id: id,
      group: state.active.group.ids[0],
      type: 'file',
      name: 'Untitled.md' + _.random(1,50),
      created: new Date().getTime(),
      modified: new Date().getTime(),
      content: ''
    }

    files.setItem(id, file)
    state.files.push(file)
  },

  NEW_GROUP (state) {
    let id = uniqid()

    const group = {
      id: id,
      type: 'group',
      name: 'Group' + _.random(1,50),
      nodes: [],
      created: new Date().getTime(),
    }

    // If there's an active state then append it to there
    if(!state.active) {
      state.library.push(group)
    } else {
      state.active.group.nodes.push(group)
    }

    // Save the state to library
    // @TODO: we might want to filter the saving of the object by id
    // to avoid having to save the full db over and over
    state.library.forEach((item) => {
      library.setItem(item.id, item)
    })
  },

  // SET_ACTIVE_GROUP (state, group) {
  //   // get the ids recursively from the groups
  //   const getIds = (ids, node) => {
  //     ids.push(node.id)
  //     if (node.nodes && node.nodes.length) {
  //       node.nodes.forEach((node) => {
  //         getIds(ids, node)
  //       })
  //     }
  //   }
  //   let ids = []
  //   getIds(ids, group)
  //   ipc.send('filter-records', {'groups': ids})
  //   state.active.group = group
  //   state.active.group.ids = ids
  // },

  // SET_STATE (state, payload) {
  //   state[payload.state] = payload.records
  // },

  // SET_ACTIVE_FILE (state, file) {
  //   state.active.file = file
  // },

  SET_ACTIVE_DRAG_FILE (state, file) {
    state.active.drag = file
  },

  RESET_ACTIVE (state, record) {
    state.active.group = null
  },

  REMOVE_ACTIVE (state) {
    // console.log(state.library)
    state.library.$remove(state.active)
  },

  SAVE_CONTENT (state) {
    files.setItem(state.active.file.id, state.active.file)
  },

  SAVE_RECORD (state, payload) {
    ipc.send('save-record', payload)
  },

  

  CLOSE_FILE (state, file) {
    if (!file.saved) {
      dialog.showMessageBox({
        type: 'question',
        buttons: ['cancel', 'ok'],
        title: 'Warning',
        message: 'This file has not been saved yet.',
        detail: 'Are you sure you want to close it?'
      }, (index) => {
        if (index == 1) {
           // remove the item from storage and then from UI
           files.removeItem(state.active.file.id, (err) => {
             if (!err) {
                state.files.$remove(file)    
                state.active.file = state.files[0]     
             }
          })
        }
      })
    } 
  },

  UPDATE_SETTINGS (state, key, value) {
    // update db
    settings.setItem(key, value)
    // update state
    state.settings[key] = value
  }
}

export default new Vuex.Store({
  state,
  mutations
})