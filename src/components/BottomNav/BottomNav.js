import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Home, Plus, Search, Message, User} from '../../components/Icons'
import styles from './BottomNav.module.css'

const BottomNav = (props) => {
    const {authState} = useContext(AuthContext)
    const [newCount, setNewCount] = useState(0)

    useEffect(() => {
        const get = async () => {
            const chats = (await db.collection('chats').get()).docs.map(doc => doc.data())
            chats.map(async chat => {
                const messages = (await db.collection('chats').doc(chat.id).collection('messages').get()).docs.map(doc => doc.data())
                const count = messages.filter(mes => !mes.reader.includes(authState.id) && mes.senderId !== authState.id).length
                setNewCount(n => n + count)
            })
        }
        authState && get()
    }, [authState])

    return (
        <div className={styles.nav}>
            <i className={props.location.pathname === '/' ? styles.active : ''} onClick={() => props.history.push('/')}><Home/></i>
            <i className={props.location.pathname === '/search' ? styles.active : ''} onClick={() => props.history.push('/search')}><Search/></i>
            <i className={props.location.pathname === '/create-post' ? styles.active : ''} onClick={() => props.history.push('/create-post')}><Plus/></i>
            <div>
                {newCount !== 0 && <span>{newCount}</span>}
                <i className={props.location.pathname === '/chats' ? styles.active : ''} onClick={() => props.history.push('/chats')}><Message/></i>
            </div>
            <i className={props.location.pathname === '/profile' ? styles.active : ''} onClick={() => props.history.push('/profile')}><User/></i>
        </div>
    )
}

export default withRouter(BottomNav)