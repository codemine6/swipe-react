import React, {useState, useEffect, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {More} from '../../components/Icons'
import Confirm from '../../components/Confirm/Confirm'
import Dropdown from '../../components/Dropdown/Dropdown'
import styles from './PostOption.module.css'

const PostOption = (props) => {
    const {authState} = useContext(AuthContext)
    const [bookmarked, setBookmarked] = useState(false)
    const [open, setOpen] = useState(false)

    const deletePost = () => {
        db.collection('posts').doc(props.post.id).delete()
        setOpen(false)
        props.history.replace('/')
    }

    const changeBookmark = () => {
        if (bookmarked) {
            db.collection('users').doc(authState.id).collection('bookmarks').doc(props.post.id).delete()
        } else {
            const data = {
                postId: props.post.id,
                timeAdded: new Date()
            }
            db.collection('users').doc(authState.id).collection('bookmarks').doc(data.postId).set(data)
        }
        setOpen(false)
    }

    const changeComment = () => {
        if (props.post.commentStatus === 'open') {
            db.collection('posts').doc(props.post.id).update({commentStatus: 'close'})
        } else {
            db.collection('posts').doc(props.post.id).update({commentStatus: 'open'})
        }
        setOpen(false)
    }

    useEffect(() => {
        const getData = async () => {
            const bookmarks = (await db.collection('users').doc(authState.id).collection('bookmarks').get()).docs.map(doc => doc.data())
            setBookmarked(bookmarks.some(book => book.postId === props.post.id))
        }
        open === true && getData()
    }, [authState, props, open])

    return (
        <>
            <i className={styles.moreIcon} onClick={() => setOpen(true)}><More/></i>
            <Dropdown open={open} onClose={() => setOpen(false)}>
                <p onClick={changeBookmark}>{bookmarked ? 'Delete Bookmark' : 'Add Bookmark'}</p>

                {props.post.author === authState.id && <>
                    <p onClick={changeComment}>{props.post.commentStatus === 'open' ? 'Close Comment' : 'Open Comment'}</p>
                    <p onClick={() => props.history.push(`/edit/${props.post.id}`)}>Edit Post</p>
                    <Confirm title="Are you sure to delete this post ?" onConfirm={deletePost}>
                        <p>Delete Post</p>
                    </Confirm>
                </>}
            </Dropdown>
        </>
    )
}

export default withRouter(PostOption)