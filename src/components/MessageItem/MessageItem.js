import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import Time from '../../components/Time'
import styles from './MessageItem.module.css'

const MessageItem = (props) => {
    const {authState} = useContext(AuthContext)
    const [show, setShow] = useState(false)

    useEffect(() => {
        authState && setShow(!props.message.hideFor.includes(authState.id))
    }, [authState, props])

    return show && (
        <>
            {props.message.senderId === authState.id ? <div className={styles.me}>
                {props.message.images.length > 0 && <img src={props.message.images[0]} alt=""/>}
                <p>{props.message.text}</p>
                <span>{Time(props.message.sendTime)}</span>
                {props.message.reader.length > 0 && <i>R</i>}
            </div> : <div className={styles.other}>
                {props.message.images.length > 0 && <img src={props.message.images[0]} alt=""/>}
                <p>{props.message.text}</p>
                <span>{Time(props.message.sendTime)}</span>
            </div>}
        </>
    )
}

export default MessageItem