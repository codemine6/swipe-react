import React, {useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {Global, Lock} from '../../components/Icons'
import Time from '../../components/Time'
import PostOption from '../../components/PostOption/PostOption'
import PostAction from '../../components/PostAction/PostAction'
import styles from './PostItem.module.css'

const PostItem = (props) => {
    const {authState} = useContext(AuthContext)

    const hanldeUsername = () => {
        if (props.post.author !== authState.id) {
            props.history.push(`/user/${props.post.author}`)
        } else {
            props.history.push('/profile')
        }
    }

    return (
        <div className={styles.post}>
            <img className={styles.profile} src={props.author.profilePhoto} alt=""/>
            <h4 onClick={hanldeUsername}>{props.author.username}</h4>
            <span id={styles.time}>{Time(props.post.creationTime)}</span>
            <p className={styles.text}>{props.post.text}</p>
            <div className={styles.images}>
                {props.post.images.map((src, i) => (
                    <div className={styles.item} key={i}><img src={src} alt=""/></div>
                ))}
            </div>

            {props.post.author === authState.id && <i className={styles.privacy}>
                {props.post.privacy === 'public' && <Global/>}
                {props.post.privacy === 'private' && <Lock/>}
            </i>}

            <PostOption post={props.post}/>
            <PostAction post={props.post}/>
        </div>
    )
}

export default withRouter(PostItem)