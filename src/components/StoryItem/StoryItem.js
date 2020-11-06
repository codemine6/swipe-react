import React from 'react'
import {withRouter} from 'react-router-dom'
import styles from './StoryItem.module.css'

const StoryItem = (props) => {
    return (
        <div className={styles.story} onClick={() => props.history.push(`/story/${props.story.id}`)}>
            <img src={props.story.image} alt=""/>
            <p>{props.sender.username}</p>
        </div>
    )
}

export default withRouter(StoryItem)