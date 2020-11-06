import React, {useState, useEffect, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Setting} from '../../components/Icons'
import Dropdown from '../../components/Dropdown/Dropdown'
import Time from '../../components/Time'
import styles from './StoryDetails.module.css'

const StoryDetails = (props) => {
    const {authState} = useContext(AuthContext)
    const [story, setStory] = useState({})
    const [author, setAuthor] = useState({})
    const [option, setOption] = useState(false)

    const deleteStory = () => {
        db.collection('stories').doc(story.id).delete()
        setOption(false)
        props.history.replace('/')
    }

    useEffect(() => {
        const getData = async () => {
            const story = (await db.collection('stories').doc(props.match.params.id).get()).data()
            const author = (await db.collection('users').doc(story.author).get()).data()
            setStory(story)
            setAuthor(author)
            db.collection('stories').doc(story.id).collection('reader').doc(authState.id).set({userId: authState.id})
        }
        authState && getData()
    }, [authState, props])

    return (
        <>
            <div className={styles.nav}>
                <img src={author.profilePhoto} alt=""/>
                <h4>{author.username}</h4>
                <p>{story.creationTime && Time(story.creationTime)}</p>
                {authState?.id === story.author && <i onClick={() => setOption(true)}><Setting/></i>}
            </div>
            <Dropdown top={4} open={option} onClose={() => setOption(false)}>
                <p onClick={deleteStory}>Delete Story</p>
            </Dropdown>
            <div className={styles.story}>
                <img src={story.image} alt=""/>
                <p>{story.text}</p>
            </div>
        </>
    )
}

export default StoryDetails