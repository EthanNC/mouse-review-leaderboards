import { combineReducers } from 'redux'
import voteReducer from './voteReducer'

const rootReducer = combineReducers({
    vote:voteReducer
})

export default rootReducer;