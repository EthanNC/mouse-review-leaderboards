import { combineReducers } from 'redux'
import voteReducer from './voteReducer'
import {firebaseReducer} from 'react-redux-firebase'
import {firestoreReducer} from 'redux-firestore'
import authReducer from './authReducer';

const rootReducer = combineReducers({
    vote:voteReducer,
    auth: authReducer,
    firebase: firebaseReducer,
    firestore: firestoreReducer
})

export default rootReducer;