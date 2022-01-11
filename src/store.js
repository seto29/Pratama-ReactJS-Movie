import { createStore } from 'redux'
import ls from 'local-storage'

const initialState = ls.get('ui-state-management')
  ? ls.get('ui-state-management')
  : {
      genres: [],
      sidebarShow: true,
      onlineStatus: 'success',
    }
const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      ls.set('ui-state-management', { ...state, ...rest })
      return { ...state, ...rest }
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
