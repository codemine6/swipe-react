import React, {useState, useEffect} from 'react'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import BottomNav from '../../components/BottomNav/BottomNav'
import UserItem from '../../components/UserItem/UserItem'
import PostItem from '../../components/PostItem/PostItem'
import styles from './Search.module.css'

const Search = () => {
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])
    const [result, setResult] = useState([])
    const [type, setType] = useState('user')

    const getSearch = (e) => {
        if (type === 'user') {
            const result = users.filter(user => user.username.toLowerCase().includes(e.target.value.toLowerCase()))
            setResult(result)
        } else {
            const result = posts.filter(post => post.text.toLowerCase().includes(e.target.value.toLowerCase()))
            setResult(result)
        }
    }

    useEffect(() => {
        const getData = async () => {
            const users = (await db.collection('users').get()).docs.map(doc => doc.data())
            const posts = (await db.collection('posts').get()).docs.map(doc => doc.data())
            setUsers(users)
            setPosts(posts)
        }
        getData()
    }, [])

    return (
        <>
            <Navbar/>
            <div className={styles.form}>
                <input placeholder="Search.." onChange={getSearch}/>
            </div>
            {type === 'user' ? <div className={styles.menu}>
                <span className={styles.active}>People</span>
                <span onClick={() => setType('post')}>Post</span>
            </div> : <div className={styles.menu}>
                <span onClick={() => setType('user')}>People</span>
                <span className={styles.active}>Post</span>
            </div>}

            {type === 'user' && <div>
                {result.map((user, i) => (
                    <UserItem user={user} key={i}/>
                ))}
            </div>}

            {type === 'post' && <div>
                {result.map((post, i) => {
                    const author = users.find(user => user.id === post.author)
                    return author && <PostItem post={post} author={author} key={i}/>
                })}
            </div>}
            <BottomNav/>
        </>
    )
}

export default Search