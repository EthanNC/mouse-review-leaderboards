export const upVote = (payload) => {
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        const authorId = getState().firebase.auth.uid
        let numberofVotes = 0
        try {
            const doc = await firestore.collection('count').doc(payload.toString())
            await doc.get().then(function (d) {
                if(d.exists){
                    numberofVotes = d.data().vote 
                }
            })
            await firestore.collection('count').doc(payload.toString()).set({
                vote: numberofVotes + 1
            })
            await firestore.set(`count/${payload}/voterState/${authorId}`, {up:true, down:false})
        }
        catch(err)
        {
            console.log(err)
        }
    }
}

export const downVote = (payload) =>{
    return async (dispatch, getState, {getFirestore}) => {
        const firestore = getFirestore()
        const authorId = getState().firebase.auth.uid
        let numberofVotes = 0
        try {
            const doc = await firestore.collection('count').doc(payload.toString())
            await doc.get().then(function (d) {
                if(d.exists){
                    numberofVotes = d.data().vote 
                }
            })
           
            await firestore.collection('count').doc(payload.toString()).set({
                vote: numberofVotes - 1
    
            })
            await firestore.set(`count/${payload}/voterState/${authorId}`, {up:false, down:true})
        }
        catch(err)
        {
            console.log(err)
        }
    }
}
