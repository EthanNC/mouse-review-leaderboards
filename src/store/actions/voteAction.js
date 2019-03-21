export const upVote = (payload) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        let numberofVotes = 0
        try {
            const doc = await firestore.collection('count').doc(payload.toString())
            await doc.get().then(function (d) {
                if(d.exists){
                    numberofVotes = d.data().vote
                    console.log(numberofVotes) 
                }
            })
            await firestore.collection('count').doc(payload.toString()).set({
                vote: numberofVotes + 1
            })
        }
        catch(err)
        {
            console.log(err)
        }
    }
    // return{
    //     type: UP_VOTE,
    //     payload
    // }
}

export const downVote = (payload) =>{
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        let numberofVotes = 0
        try {
            const doc = await firestore.collection('count').doc(payload.toString())
            await doc.get().then(function (d) {
                if(Number.isInteger(d.data().vote)){
                    numberofVotes = d.data().vote 
                    console.log(numberofVotes)
                }
            })
           
            await firestore.collection('count').doc(payload.toString()).set({
                vote: numberofVotes - 1
    
            })
        }
        catch(err)
        {
            console.log(err)
        }
    }
}
