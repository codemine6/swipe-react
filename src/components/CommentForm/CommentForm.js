import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import {Close} from '../../components/Icons'
import styles from './CommentForm.module.css'

const CommentForm = (props) => {
    const [input, setInput] = useState('')

    const sendComment = () => {
        if (input === '') return
        props.onSubmit(input)
    }

    useEffect(() => {
        props.value && setInput(props.value.text)
    }, [props])

    return (
        <div className={styles.form}>
            <i onClick={() => props.onClose()}><Close/></i>
            <textarea placeholder="Your comment.." value={input} onChange={e => setInput(e.target.value)}/>
            <button onClick={sendComment}>Send</button>
        </div>
    )
}

export default withRouter(CommentForm)