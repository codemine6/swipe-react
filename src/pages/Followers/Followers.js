import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import UserItem from '../../components/UserItem/UserItem'
import styles from './Followers.module.css'

const Followers = () => {
    const {authState} = useContext(AuthContext)
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [type, setType] = useState('followers')

    useEffect(() => {
        const getData = async () => {
            const users = await (await db.collection('users').get()).docs.map(doc => doc.data())
            const followers = await (await db.collection('users').doc(authState.id).collection('followers').get()).docs.map(doc => doc.data())
            const following = await (await db.collection('users').doc(authState.id).collection('following').get()).docs.map(doc => doc.data())
            setFollowers(users.filter(user => followers.some(follow => follow.id === user.id)))
            setFollowing(users.filter(user => following.some(follow => follow.id === user.id)))
        }
        authState && getData()
    }, [authState])

    return (
        <>
            <Navbar/>
            {type === 'followers' ? <div className={styles.menu}>
                <span className={styles.active}>Followers</span>
                <span onClick={() => setType('following')}>Following</span>
            </div> : <div className={styles.menu}>
                <span onClick={() => setType('followers')}>Followers</span>
                <span className={styles.active}>Following</span>
            </div>}

            <div>
                {type === 'followers' ? (
                    followers.map((follow, i) => (
                        <UserItem user={follow} key={i}/>
                    ))
                ) : (
                    following.map((follow, i) => (
                        <UserItem user={follow} key={i}/>
                    ))
                )}
            </div>
        </>
    )
}

export default Followers