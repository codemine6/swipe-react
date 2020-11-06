import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import BottomNav from '../../components/BottomNav/BottomNav'
import ChatItem from '../../components/ChatItem/ChatItem'
import styles from './Chats.module.css'

const Chats = (props) => {
    const {authState} = useContext(AuthContext)
    const [users, setUsers] = useState()
    const [following, setFollowing] = useState()
    const [result, setResult] = useState()
    const [chats, setChats] = useState()

    const searchUser = (e) => {
        const result = following.filter(user => user.username.toLowerCase().includes(e.target.value.toLowerCase()))
        setResult(result)
    }

    const createChat = (receiverId) => {
        if (chats.some(chat => chat.group.some(user => user.id === receiverId))) {
            const chatId = chats.find(chat => chat.group.some(user => user.id === receiverId)).id
            props.history.push(`/chat/${chatId}`)
        } else {
            const data = {
                group: [
                    {id: authState.id, status: null},
                    {id: receiverId, status: null}
                ],
                id: Date.now().toString() + '-chat'
            }
            db.collection('chats').doc(data.id).set(data)
            props.history.push(`/chat/${data.id}`)
        }
    }

    useEffect(() => {
        if (!authState) return
        const getUsers = async () => {
            const users = (await db.collection('users').get()).docs.map(doc => doc.data())
            const following = (await db.collection('users').doc(authState.id).collection('following').get()).docs.map(doc => doc.data())
            setUsers(users)
            setFollowing(users.filter(user => following.some(foll => foll.id === user.id)))
            setResult(users.filter(user => following.some(foll => foll.id === user.id)))
        }
        const getChats = db.collection('chats').onSnapshot(res => {
            const chats = res.docs.map(doc => doc.data()).filter(chat => chat.group.some(user => user.id === authState.id))
            setChats(chats)
        })
        getUsers()

        return () => getChats()
    }, [authState])

    return (
        <>
            <Navbar/>
            <div className={styles.search}>
                <input placeholder="Search.." onChange={searchUser}/>
            </div>
            <div className={styles.users}>
                {result?.map((user, i) => (
                    <div onClick={() => createChat(user.id)} key={i}>
                        <img src={user.profilePhoto} alt=""/>
                        <p>{user.username}</p>
                    </div>
                ))}
            </div>
            <div className={styles.list}>
                <h3>Recent</h3>
                {users && chats?.map((chat, i) => {
                    const sender = users.find(user => user.id === chat.group.find(user => user.id !== authState.id).id)
                    return <ChatItem chat={chat} sender={sender} key={i}/>
                })}
            </div>
            <BottomNav/>
        </>
    )
}

export default Chats