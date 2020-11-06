import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Setting} from '../../components/Icons'
import Dropdown from '../../components/Dropdown/Dropdown'
import MessageItem from '../../components/MessageItem/MessageItem'
import MessageForm from '../../components/MessageForm/MessageForm'
import styles from './ChatDetails.module.css'

const ChatDetails = (props) => {
    const {authState} = useContext(AuthContext)
    const [messages, setMessages] = useState()
    const [user, setUser] = useState()
    const [group, setGroup] = useState()
    const [option, setOption] = useState(false)

    const deleteChat = () => {
        messages.map((message, i) => {
            if (message.hideFor.length === 0) {
                console.log('mee')
                db.collection('chats').doc(props.match.params.id).collection('messages').doc(message.id).update({hideFor: [authState.id]})
            } else {
                console.log('all')
                db.collection('chats').doc(props.match.params.id).collection('messages').doc(message.id).delete()
            }
        })
        setOption(false)
    }

    useEffect(() => {
        if (!authState) return
        const getGroup = db.collection('chats').doc(props.match.params.id).onSnapshot(res => {
            const group = res.data().group
            setGroup(group)
            console.log('get')
            const getUser = async () => {
                const user = (await db.collection('users').doc(group.find(user => user.id !== authState.id).id).get()).data()
                setUser(user)
            }
            !user && getUser()
        })
        const getMessages = db.collection('chats').doc(props.match.params.id).collection('messages').onSnapshot(res => {
            const messages = res.docs.map(doc => doc.data())
            setMessages(messages)
            messages.filter(message => message.senderId !== authState.id && !message.reader.includes(authState.id)).map(mess => {
                return db.collection('chats').doc(props.match.params.id).collection('messages').doc(mess.id).update({reader: [authState.id]})
            })
        })

        return () => {
            getGroup()
            getMessages()
        }
    }, [authState, props])

    return (
        <>
            <div className={styles.nav}>
                <img src={user?.profilePhoto} alt="" onClick={() => props.history.push(`/user/${user.id}`)}/>
                <h4>{user?.username}</h4>
                <p>{group?.find(user => user.id !== authState.id).status}</p>
                <i onClick={() => setOption(true)}><Setting/></i>
            </div>

            <Dropdown top={4} open={option} onClose={() => setOption(false)}>
                <p onClick={deleteChat}>Delete Chat</p>
            </Dropdown>

            <div className={styles.list}>
                {messages?.map((message, i) => (
                    <MessageItem message={message} key={i}/>
                ))}
            </div>
            <MessageForm group={group}/>
        </>
    )
}

export default ChatDetails