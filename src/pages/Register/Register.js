import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {auth, db} from '../../services/Firebase'
import Input from '../../components/Input/Input'
import styles from './Register.module.css'

const Register = (props) => {
    const {authState} = useContext(AuthContext)
    const [input, setInput] = useState({email: '', password: ''})
    const [error, setError] = useState()

    const handleRegister = () => {
        auth.createUserWithEmailAndPassword(input.email, input.password).then(res => {
            const data = {
                bio: '',
                email: input.email,
                id: res.user.uid,
                prfilePhoto: 'https://bit.ly/2D9zDF4',
                registerTime: new Date(),
                settings: {
                    postPrivacy: 'public'
                },
                username: input.username,
            }
            db.collection('users').doc(res.user.uid).set(data)
        }).catch(err => {
            setError(err.message)
        })
    }

    useEffect(() => {
        authState && props.history.replace('/')
    }, [authState, props])

    return (
        <div className={styles.auth}>
            <h1>Register</h1>
            <Input type="text" placeholder="Username" onChange={e => setInput({...input, username: e})}/>
            <Input type="email" placeholder="Email" onChange={e => setInput({...input, email: e})}/>
            <Input type="password" placeholder="Password" onChange={e => setInput({...input, password: e})}/>
            <p>{error}</p>
            <button onClick={handleRegister}>Register</button>
            <span onClick={() => props.history.replace('/login')}>Login</span>
        </div>
    )
}

export default Register