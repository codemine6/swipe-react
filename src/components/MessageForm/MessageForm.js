import React, {useState, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Camera, Send} from '../../components/Icons'
import styles from './MessageForm.module.css'

const MessageForm = (props) => {
    const {authState} = useContext(AuthContext)
    const [text, setText] = useState('')
    const [images, setImages] = useState([])

    const sendMessage = () => {
        const data = {
            hideFor: [],
            id: Date.now().toString() + '-message',
            images: images,
            reader: [],
            senderId: authState.id,
            sendTime: new Date(),
            text: text
        }
        db.collection('chats').doc(props.match.params.id).collection('messages').doc(data.id).set(data)
        setText('')
        setImages([])
    }
    const changeImage = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = e => setImages([...images, e.target.result])
    }

    const onType = (type) => {
        if (type) {
            props.group.find(user => user.id === authState.id).status = 'Typing..'
        } else {
            props.group.find(user => user.id === authState.id).status = null
        }
        db.collection('chats').doc(props.match.params.id).update({group: props.group})
    }

    return (
        <div className={styles.form}>
            {images.length > 0 && <img src={images[0]} alt=""/>}
            <input id="image" type="file" onChange={changeImage}/>
            <textarea placeholder="Message.."
                value={text}
                onFocus={() => onType(true)}
                onBlur={() => onType(false)}
                onChange={e => setText(e.target.value)}
            />
            <label className={styles.camera} htmlFor="image"><Camera/></label>
            <i className={styles.send} onClick={sendMessage}><Send/></i>
        </div>
    )
}

export default withRouter(MessageForm)