import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import styles from './FollowCount.module.css'

const FollowCount = (props) => {
    const {authState} = useContext(AuthContext)
    const [followers, setFollowers] = useState([])
    const [following, setFollowing] = useState([])
    const [follow, setFollow] = useState()

    const handleFollow = () => {
        const userData = {
            id: authState.id,
            timeFollow: new Date()
        }
        const myData = {
            id: props.user.id,
            timeFollow: new Date()
        }
        db.collection('users').doc(props.user.id).collection('followers').doc(userData.id).set(userData)
        db.collection('users').doc(authState.id).collection('following').doc(myData.id).set(myData)
        setFollow(true)
    }

    const handleUnfollow = () => {
        db.collection('users').doc(props.user.id).collection('followers').doc(authState.id).delete()
        db.collection('users').doc(authState.id).collection('following').doc(props.user.id).delete()
        setFollow(false)
    }

    useEffect(() => {
        const getData = async () => {
            db.collection('users').doc(props.user.id).collection('followers').onSnapshot(res => {
                const followers = res.docs.map(doc => doc.data())
                setFollowers(followers)
                setFollow(followers.some(follow => follow.id === authState.id))
            })
            const following = (await db.collection('users').doc(props.user.id).collection('following').get()).docs.map(doc => doc.data())
            setFollowing(following)
        }
        props.user && getData()
    }, [authState, props])

    return (
        <>
            {props.user !== authState && <div className={styles.follow}>
                {follow === true && <span onClick={handleUnfollow}>Unfollow</span>}
                {follow === false && <span onClick={handleFollow}>Follow</span>}
            </div>}
            <div className={styles.count}>
                <div>
                    <h4>{followers.length}</h4>
                    <p>Followers</p>
                </div>
                <div>
                    <h4>{following.length}</h4>
                    <p>Following</p>
                </div>
            </div>
        </>
    )
}

export default FollowCount