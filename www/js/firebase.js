var config = 
{
    apiKey: "AIzaSyC5OT80Sjrc2XD66iNKFTHDJmLaSAXkAl0",
    authDomain: "onetracklist.firebaseapp.com",
    databaseURL: "https://onetracklist.firebaseio.com",
    projectId: "onetracklist",
    storageBucket: "onetracklist.appspot.com",
    messagingSenderId: "989610705870"
};
firebase.initializeApp(config);
console.log("ME CONECTÉ A FIREBASE");
const db = firebase.database();
const auth = firebase.auth();