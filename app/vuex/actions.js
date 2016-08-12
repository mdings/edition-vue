export const createGroup = ({dispatch}) => {
  dispatch('CREATE_GROUP')
}

export const updateGroup = ({dispatch}) => {
  dispatch('UPDATE_GROUP')
}

export const setActiveGroup = ({dispatch}, payload) => {
  dispatch('SET_ACTIVE', 'group', payload)
}

export const resetActiveGroup = ({dispatch}) => {
  dispatch('RESET_ACTIVE', 'group')
}

export const setState = ({dispatch}, payload) => {
  dispatch('SET_STATE', payload)
}



// export const newFile = ({dispatch}) => {
//   dispatch('NEW_FILE')
// }

// export const newGroup = ({dispatch}) => {
//   dispatch('NEW_GROUP')
// }

// export const saveRecord = ({dispatch}, payload) => {
//   dispatch('SAVE_RECORD', payload)
// }

// export const newProject = ({dispatch}) => {
//   dispatch('NEW_PROJECT')
// }

// export const saveFile = ({dispatch}) => {
//   dispatch('SAVE_FILE')
// }

// export const setActiveGroup = ({dispatch}, group) => {
//   dispatch('SET_ACTIVE_GROUP', group)
// }

// export const setState = ({dispatch}, payload) => {
//   dispatch('SET_STATE', payload)
// }

// export const setActiveFile = ({dispatch}, file) => {
//   dispatch('SET_ACTIVE_FILE', file)
// }

// export const setActiveDragFile = ({dispatch}, file) => {
//   dispatch('SET_ACTIVE_DRAG_FILE', file)
// }

// export const saveContent = ({dispatch}) => {
//   dispatch('SAVE_CONTENT')
// }

// export const removeActive = ({dispatch}, file) => {
//   dispatch('REMOVE_ACTIVE', file)
// }

// export const resetActive = ({dispatch}) => {
//   dispatch('RESET_ACTIVE')
// }

// export const closeFile = ({dispatch}, file) => {
//   dispatch('CLOSE_FILE', file)
// }

// export const updateSettings = ({dispatch}, key, value) => {
//   dispatch('UPDATE_SETTINGS', key, value)
// }