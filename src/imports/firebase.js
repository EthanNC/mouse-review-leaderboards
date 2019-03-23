import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

var config = {
    apiKey: "AIzaSyDxWLCOh366_Dkr9S-98rttXlzc0xPfjj4",
    authDomain: "mouse-review-leaderboard.firebaseapp.com",
    databaseURL: "https://mouse-review-leaderboard.firebaseio.com",
    projectId: "mouse-review-leaderboard",
    storageBucket: "mouse-review-leaderboard.appspot.com",
    messagingSenderId: "939301284511"
};
firebase.initializeApp(config);

export default firebase;
