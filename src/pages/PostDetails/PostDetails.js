import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Plus} from '../../components/Icons'
import Navbar from '../../components/Navbar/Navbar'
import PostItem from '../../components/PostItem/PostItem'
import CommentItem from '../../components/CommentItem/CommentItem'
import CommentForm from '../../components/CommentForm/CommentForm'
import styles from './PostDetails.module.css'

const PostDetails = (props) => {
    const {authState} = useContext(AuthContext)
    const [post, setPost] = useState({})
    const [author, setAuthor] = useState({})
    const [comments, setComments] = useState([])
    const [users, setUsers] = useState([])
    const [form, setForm] = useState(false)

    const sendCommend = (value) => {
        const data = {
            id: Date.now().toString(),
            sendTime: new Date(),
            senderId: authState.id,
            text: value
        }
        db.collection('posts').doc(post.id).collection('comments').doc(data.id).set(data)
        setForm(false)
    }

    useEffect(() => {
        const getData = async () => {
            const postId = props.match.params.id
            db.collection('posts').doc(postId).collection('comments').onSnapshot(res => {
                const comments = res.docs.map(doc => doc.data())
                setComments(comments)
            })
            const post = (await db.collection('posts').doc(postId).get()).data()
            const users = (await db.collection('users').get()).docs.map(doc => doc.data())
            setPost(post)
            setUsers(users)
            setAuthor(users.find(user => user.id === post.author))
        }
        getData()
    }, [props])

    return (
        <>
            <Navbar/>
            <div>
                {post.id && author.id && <PostItem post={post} author={author}/>}
            </div>
            {post.commentStatus === 'open' && <div className={styles.addComment}>
                <Plus/>
                <span onClick={() => setForm(!form)}>Write Comment</span>
            </div>}
            {users.length > 0 && <div>
                {comments.map((comment, i) => {
                    const sender = users.find(user => user.id === comment.senderId)
                    return <CommentItem comment={comment} sender={sender} key={i}/>
                })}
            </div>}
            {form && <CommentForm onSubmit={sendCommend} onClose={() => setForm(false)}/>}
        </>
    )
}

export default PostDetails