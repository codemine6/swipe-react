import React, {useState, useEffect} from 'react'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import FollowCount from '../../components/FollowCount/FollowCount'
import PostItem from '../../components/PostItem/PostItem'
import styles from '../Profile/Profile.module.css'

const UserDetails = (props) => {
    const [user, setUser] = useState()
    const [posts, setPosts] = useState([])
    const [menu, setMenu] = useState('post')

    useEffect(() => {
        const getData = async () => {
            const id = props.match.params.id
            const user = (await db.collection('users').doc(id).get()).data()
            const posts = (await db.collection('posts').where('author', '==', id).where('privacy', '==', 'public').get()).docs.map(doc => doc.data())
            setUser(user)
            setPosts(posts)
        }
        getData()
    }, [props])

    return (
        <>
            <Navbar/>
            <div className={styles.main}>
                <img src={user?.profilePhoto} alt=""/>
                <h3>{user?.username}</h3>
                <p>{user?.bio}</p>
            </div>
            <FollowCount user={user}/>
            <div className={styles.menu}>
                <span className={menu === 'post' ? styles.active : ''} onClick={() => setMenu('post')}>Post</span>
                <span className={menu === 'info' ? styles.active : ''} onClick={() => setMenu('info')}>Info</span>
            </div>

            {menu === 'post' && user && <div>
                {posts.map((post, i) => (
                    <PostItem post={post} author={user} key={i}/>
                ))}
            </div>}

            {menu === 'info' && user && <div className={styles.info}>
                <p>{user.settings.showEmail && user.email}</p>
            </div>}
        </>
    )
}

export default UserDetails