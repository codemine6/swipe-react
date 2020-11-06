import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import PostItem from '../../components/PostItem/PostItem'

const Bookmarks = () => {
    const {authState} = useContext(AuthContext)
    const [users, setUsers] = useState([])
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const getData = async () => {
            const users = (await db.collection('users').get()).docs.map(doc => doc.data())
            const posts = (await db.collection('posts').get()).docs.map(doc => doc.data())
            const bookmarks = (await db.collection('users').doc(authState.id).collection('bookmarks').get()).docs.map(doc => doc.data())
            setUsers(users)
            setPosts(posts.filter(post => bookmarks.some(book => book.postId === post.id)))
        }
        authState && getData()
    }, [authState])

    return (
        <>
            <Navbar/>
            <div>
                {users.length > 0 && posts.length > 0 && posts.map((post, i) => {
                    const author = users.find(user => user.id === post.author)
                    return <PostItem post={post} author={author} key={i}/>
                })}
            </div>
        </>
    )
}

export default Bookmarks