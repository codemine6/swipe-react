import * as Firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyA8f7BUi3iMN2Of-KCeCmXupzGWsQOcwF8',
    authDomain: 'swipe-8bbdc.firebaseapp.com',
    databaseURL: 'https://swipe-8bbdc.firebaseio.com',
    projectId: 'swipe-8bbdc',
    storageBucket: 'swipe-8bbdc.appspot.com',
    messagingSenderId: '681482501106',
    appId: '1:681482501106:web:d2d5a45be32cde5bd1096b'
}

Firebase.initializeApp(firebaseConfig)

export const auth = Firebase.auth()
export const db = Firebase.firestore()