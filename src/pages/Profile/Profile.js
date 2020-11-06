import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Camera, Edit} from '../../components/Icons'
import Navbar from '../../components/Navbar/Navbar'
import BottomNav from '../../components/BottomNav/BottomNav'
import FollowCount from '../../components/FollowCount/FollowCount'
import PostItem from '../../components/PostItem/PostItem'
import styles from './Profile.module.css'

const Profile = (props) => {
    const {authState} = useContext(AuthContext)
    const [posts, setPosts] = useState([])
    const [menu, setMenu] = useState('info')

    const setPhoto = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = e => {
            db.collection('users').doc(authState.id).update({profilePhoto: e.target.result})
        }
    }

    useEffect(() => {
        const getData = async () => {
            const posts = (await db.collection('posts').where('author', '==', authState.id).get()).docs.map(doc => doc.data())
            setPosts(posts)
        }
        authState && getData()
    }, [authState])

    return (
        <>
            <Navbar/>
            <div className={styles.main}>
                <img src={authState?.profilePhoto} alt=""/>
                <h3>{authState?.username}</h3>
                <p>{authState?.bio}</p>
                <label htmlFor="photo"><Camera/></label>
                <input id="photo" type="file" onChange={setPhoto}/>
            </div>
            <FollowCount user={authState}/>

            <div className={styles.menu}>
                <span className={menu === 'post' ? styles.active : ''} onClick={() => setMenu('post')}>Post</span>
                <span className={menu === 'info' ? styles.active : ''} onClick={() => setMenu('info')}>Info</span>
            </div>

            {menu === 'post' && <div>
                {posts.map((post, i) => (
                    <PostItem post={post} author={authState} key={i}/>
                ))}
            </div>}
            {menu === 'photo' && <div></div>}
            {menu === 'info' && <div className={styles.info}>
                <span onClick={() => props.history.push('/edit-profile')}><Edit/> Edit Profile</span>
                <p>{authState?.email}</p>
                <p>{authState?.birthday}</p>
            </div>}
            <BottomNav/>
        </>
    )
}

export default Profile