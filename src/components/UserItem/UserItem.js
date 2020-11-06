import React from 'react'
import {withRouter} from 'react-router-dom'
import styles from './UserItem.module.css'

const UserItem = (props) => {
    return (
        <div className={styles.item} onClick={() => props.history.push(`/user/${props.user.id}`)}>
            <img src={props.user.profilePhoto} alt=""/>
            <h4>{props.user.username}</h4>
            <p>{props.user.bio}</p>
        </div>
    )
}

export default withRouter(UserItem)