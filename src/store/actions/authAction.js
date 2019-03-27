export const socialLogin = () => {
    return async (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
        try{
            let user = await firebase.auth().signInWithPopup(googleAuthProvider)
            dispatch({type:'LOGIN'})
            if(user.additionalUserInfo.isNewUser){
                await firestore.collection('users').doc(user.user.uid).set({
                    id:user.user.uid
                })
            }
            window.location.reload()
        }catch(error){
            console.log(error)
        }
    }
}


export const signOut = () => {
    return async (dispatch,getState,{getFirebase}) => {
        const firebase = getFirebase();
        try {
            await firebase.auth().signOut()
            window.location.reload()
        }catch(err) {
            console.log(err)
        }
    }
}