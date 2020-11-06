import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Like, LikeFilled, Message} from '../../components/Icons'
import styles from './PostAction.module.css'

const PostAction = (props) => {
    const {authState} = useContext(AuthContext)
    const [likeCount, setLikeCount] = useState(0)
    const [commentCount, setCommentCount] = useState(0)
    const [liked, setLiked] = useState(false)

    const likePost = () => {
        if (liked) {
            db.collection('posts').doc(props.post.id).collection('likes').doc(authState.id).delete()
        } else {
            db.collection('posts').doc(props.post.id).collection('likes').doc(authState.id).set({userId: authState.id})
        }
    }

    useEffect(() => {
        const getLikes = db.collection('posts').doc(props.post.id).collection('likes').onSnapshot(res => {
            const likes = res.docs.map(doc => doc.data())
            setLikeCount(likes.length)
            setLiked(likes.some(like => like.userId === authState.id))
        })
        const getComments = async () => {
            const comment = await (await db.collection('posts').doc(props.post.id).collection('comments').get()).docs
            setCommentCount(comment.length)
        }
        getComments()

        return () => getLikes()
    }, [authState, props])

    return (
        <div className={styles.action}>
            <i onClick={likePost}>{liked ? <LikeFilled/> : <Like/>}</i>
            <span>{likeCount}</span>
            <i className={styles.comment} onClick={() => props.history.push(`/post/${props.post.id}`)}><Message/></i>
            <span>{commentCount}</span>
        </div>
    )
}

export default withRouter(PostAction)