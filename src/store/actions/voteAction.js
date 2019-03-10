import {UP_VOTE,DOWN_VOTE} from './actionTypes'

export const upVote = (payload) => {
    return{
        type: UP_VOTE,
        payload
    }
}

export const downVote = (payload) =>{
    return {
        type: DOWN_VOTE,
        payload
    } 
}
