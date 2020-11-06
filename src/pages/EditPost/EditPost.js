import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import PostSettings from '../../components/PostSettings/PostSettings'
import PostForm from '../../components/PostForm/PostForm'
import styles from './EditPost.module.css'

const EditPost = (props) => {
    const {authState} = useContext(AuthContext)
    const [post, setPost] = useState({})

    const editPost = (value) => {
        const data = post
        data.images = value.images
        data.privacy = authState.settings.postPrivacy
        data.text = value.text

        db.collection('posts').doc(data.id).set(data)
        props.history.goBack()
    }

    useEffect(() => {
        const getData = async () => {
            const postId = props.match.params.id
            const post = await (await db.collection('posts').doc(postId).get()).data()
            setPost(post)
        }
        getData()
    }, [props])

    return (
        <>
            <Navbar/>
            <div className={styles.edit}>
                <h4>Edit Post</h4>
                <PostSettings/>
                <PostForm value={post} onSubmit={editPost}/>
            </div>
        </>
    )
}

export default EditPost