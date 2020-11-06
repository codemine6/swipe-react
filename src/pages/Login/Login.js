import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {auth} from '../../services/Firebase'
import Input from '../../components/Input/Input'
import styles from '../Register/Register.module.css'

const Login = (props) => {
    const {authState} = useContext(AuthContext)
    const [input, setInput] = useState({email: '', password: ''})
    const [error, setError] = useState()

    const handleLogin = () => {
        auth.signInWithEmailAndPassword(input.email, input.password)
        .catch(err => {
            setError(err.message)
        })
    }

    useEffect(() => {
        authState && props.history.replace('/')
    }, [authState, props])

    return (
        <div className={styles.auth}>
            <h1>Login</h1>
            <Input type="email" placeholder="Email" onChange={e => setInput({...input, email: e})}/>
            <Input type="password" placeholder="Password" onChange={e => setInput({...input, password: e})}/>
            <p>{error}</p>
            <button onClick={handleLogin}>Login</button>
            <span onClick={() => props.history.replace('/register')}>Register</span>
        </div>
    )
}

export default Login