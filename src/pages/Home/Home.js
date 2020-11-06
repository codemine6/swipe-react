import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Plus} from '../../components/Icons'
import Navbar from '../../components/Navbar/Navbar'
import BottomNav from '../../components/BottomNav/BottomNav'
import StoryItem from '../../components/StoryItem/StoryItem'
import PostItem from '../../components/PostItem/PostItem'
import styles from './Home.module.css'

const Home = (props) => {
    const {authState} = useContext(AuthContext)
    const [users, setUsers] = useState()
    const [stories, setStories] = useState()
    const [posts, setPosts] = useState()

    useEffect(() => {
        !localStorage.getItem('login') && props.history.replace('/login')
        if (!authState) return
        const getData = async () => {
            const users = (await db.collection('users').get()).docs.map(doc => doc.data())
            const posts = (await db.collection('posts').where('privacy', '==', 'public').get()).docs.map(doc => doc.data())
            setUsers(users)
            setPosts(posts)
        }
        getData()
        const getStories = db.collection('stories').onSnapshot(async res => {
            const following = (await db.collection('users').doc(authState.id).collection('following').get()).docs.map(doc => doc.data())
            const stories = res.docs.map(doc => doc.data()).filter(story => following.some(foll => foll.id === story.author) || story.author === authState.id)
            setStories(stories)
            stories.map(async story => {
                const past = Date.now() - story.creationTime.toDate().getTime()
                if (past > 86400000) {
                    const reader = (await db.collection('stories').doc(story.id).collection('reader').get()).docs.map(doc => doc.id)
                    reader.map(id => {
                        db.collection('stories').doc(story.id).collection('reader').doc(id).delete()
                    })
                    db.collection('stories').doc(story.id).delete()
                }
            })
        })

        return () => getStories()
    }, [authState, props])

    return (
        <>
            <Navbar/>
            <div className={styles.stories}>
                <div className={styles.newStory} onClick={() => props.history.push('/create-story')}><Plus/></div>
                {users && stories.map((story, i) => {
                    const sender = users.find(user => user.id === story.author)
                    return <StoryItem story={story} sender={sender} key={i}/>
                })}
            </div>
            <div>
                {users && posts && posts.map((post, i) => {
                    const author = users.find(user => user.id === post.author)
                    return <PostItem post={post} author={author} key={i}/>
                })}
            </div>
            <BottomNav/>
        </>
    )
}

export default Home