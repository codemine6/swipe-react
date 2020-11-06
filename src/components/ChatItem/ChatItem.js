import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Picture} from '../../components/Icons'
import styles from './ChatItem.module.css'

const ChatItem = (props) => {
    const {authState} = useContext(AuthContext)
    const [lastMessage, setLastMessage] = useState()
    const [newCount, setNewCount] = useState(0)
    const [read, setRead] = useState(false)

    useEffect(() => {
        const getMessages = db.collection('chats').doc(props.chat.id).collection('messages').onSnapshot(res => {
            const messages = res.docs.map(doc => doc.data())
            setLastMessage(messages[messages.length - 1])
            setNewCount(messages.filter(mess => !mess.reader.includes(authState.id) && mess.senderId !== authState.id).length)
            if (messages.length > 0) {
                messages[messages.length - 1].reader.length === 0 && setRead(false)
                messages[messages.length - 1].senderId === authState.id && setRead(true)
                messages[messages.length - 1].reader.includes(authState.id) && setRead(true)
            }
        })

        return () => getMessages()
    }, [authState, props])

    return lastMessage ? (
        <div className={styles.item} onClick={() => props.history.push(`/chat/${props.chat.id}`)}>
            <img src={props.sender.profilePhoto} alt=""/>
            <h4>{props.sender.username}</h4>
            {read ? <p>{lastMessage.text}</p> : <b>{lastMessage.text}</b>}
            {lastMessage.text === '' && lastMessage.images.length > 0 && <i><Picture/></i>}
            {newCount > 0 && <span>{newCount}</span>}
        </div>
    ) : ''
}

export default withRouter(ChatItem)