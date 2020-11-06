import React, {useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import BottomNav from '../../components/BottomNav/BottomNav'
import PostSettings from '../../components/PostSettings/PostSettings'
import PostForm from '../../components/PostForm/PostForm'
import styles from './CreatePost.module.css'

const CreatePost = (props) => {
    const {authState} = useContext(AuthContext)

    const createPost = (value) => {
        const data = {
            author: authState.id,
            commentStatus: 'open',
            creationTime: new Date(),
            id: Date.now().toString()+'-post',
            images: value.images,
            privacy: authState.settings.postPrivacy,
            text: value.text
        }
        db.collection('posts').doc(data.id).set(data)
        props.history.replace('/')
    }

    return (
        <>
            <Navbar/>
            <div className={styles.create}>
                <h4>Create new post</h4>
                <PostSettings/>
                <PostForm onSubmit={createPost}/>
            </div>
            <BottomNav/>
        </>
    )
}

export default CreatePost