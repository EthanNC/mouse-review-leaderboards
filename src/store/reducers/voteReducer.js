import {UP_VOTE,DOWN_VOTE} from '../actions/actionTypes'
import Mice from './../../imports/mice'
const initialState = {
    count: new Array(Mice.length).fill(0)
}


const voteReducer = (state=initialState, action) => {
    const id = action.payload
    switch(action.type){
        case UP_VOTE:
            return{
            ...state, count: state.count[id] + 1
            }
        case DOWN_VOTE:
            return{
            ...state, count: state.count[id] - 1
            }
        default:
            return state
    }

}

export default voteReducer;