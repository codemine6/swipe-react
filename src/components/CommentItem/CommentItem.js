import React, {useState, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {More} from '../../components/Icons'
import Time from '../../components/Time'
import Dropdown from '../Dropdown/Dropdown'
import Confirm from '../Confirm/Confirm'
import CommentForm from '../../components/CommentForm/CommentForm'
import styles from './CommentItem.module.css'

const CommentItem = (props) => {
    const {authState} = useContext(AuthContext)
    const [option, setOption] = useState(false)
    const [edit, setEdit] = useState(false)

    const editComment = () => {
        setOption(false)
        setEdit(true)
    }

    const sendComment = (value) => {
        const postId = props.match.params.id
        db.collection('posts').doc(postId).collection('comments').doc(props.comment.id).update({text: value})
        setEdit(false)
    }

    const deleteComment = () => {
        const postId = props.match.params.id
        const commentId = props.comment.id
        db.collection('posts').doc(postId).collection('comments').doc(commentId).delete()
        setOption(false)
    }

    return (
        <div id={styles.item}>
            <img src={props.sender.profilePhoto} alt=""/>
            <h4>{props.sender.username}</h4>
            <p id={styles.text}>{props.comment.text}</p>
            <span id={styles.time}>{Time(props.comment.sendTime)}</span>
            {authState.id === props.sender.id && <i className={styles.option} onClick={() => setOption(true)}><More/></i>}

            <Dropdown open={option} onClose={() => setOption(false)}>
                <p onClick={editComment}>Edit</p>
                <Confirm title="Are you sure to delete this comment ?" onConfirm={deleteComment}>
                    <p>Delete</p>
                </Confirm>
            </Dropdown>

            {edit && <CommentForm value={props.comment} onSubmit={sendComment} onClose={() => setEdit(false)}/>}
        </div>
    )
}

export default withRouter(CommentItem)