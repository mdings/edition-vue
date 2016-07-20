import Vue from 'vue'
import Vuex from 'vuex'
import SyncService from '../service'

Vue.use(Vuex)

const service = new SyncService();

const state = {
  boards: [],
  activeBoard: {}
}

const mutations = {

  UPDATE_BOARDS (state) {
    console.log(state)
  },

  ADD_NOTE (state) {
    const newNote = {
      text: 'New note',
      favorite: false
    }
    state.notes.push(newNote)
    state.activeNote = newNote
  },

  EDIT_NOTE (state, text) {
    state.activeNote.text = text
  },

  DELETE_NOTE (state) {
    state.notes.$remove(state.activeNote)
    state.activeNote = state.notes[0]
  },

  TOGGLE_FAVORITE (state) {
    state.activeNote.favorite = !state.activeNote.favorite
  },

  SET_ACTIVE_NOTE (state, note) {
    state.activeNote = note
  }
}

export default new Vuex.Store({
  state,
  mutations
})