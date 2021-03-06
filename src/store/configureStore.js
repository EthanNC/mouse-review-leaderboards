import {createStore, applyMiddleware} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from './reducers/rootReducer'
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase'
import {reduxFirestore, getFirestore} from 'redux-firestore'
import thunk from 'redux-thunk'
import firebase from '../imports/firebase'


const rrfConfig = {
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true,
    updateProfileOnLogin: false
}

export const configureStore = (preloadedState) => {
    const middlewares = [thunk.withExtraArgument({getFirebase, getFirestore})];
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const storeEnhancers = [middlewareEnhancer]

    const composedEnhancer = composeWithDevTools(...storeEnhancers,
        reactReduxFirebase(firebase,rrfConfig),
        reduxFirestore(firebase),
        
        )

    const store = createStore(  
        rootReducer,
        preloadedState,
        composedEnhancer
    )
    return store;
}