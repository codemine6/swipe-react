import React, {useState, useEffect, createContext} from 'react'
import {auth, db} from './Firebase'

const AuthContext = createContext()
export const AuthContextProvider = (props) => {
    const [authState, setAuthState] = useState()
    console.log(authState)

    useEffect(() => {
        auth.onAuthStateChanged(async auth => {
            if (auth) {
                db.collection('users').doc(auth.uid).onSnapshot(res => {
                    setAuthState(res.data())
                })
                localStorage.setItem('login', 'true')
            } else {
                setAuthState()
                localStorage.removeItem('login')
            }
        })
    }, [])

    return (
        <AuthContext.Provider value={{authState}}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthContext