import React, {useState, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Camera} from '../../components/Icons'
import Navbar from '../../components/Navbar/Navbar'
import styles from './CreateStory.module.css'

const CreateStory = (props) => {
    const {authState} = useContext(AuthContext)
    const [input, setInput] = useState({})

    const sendStory = () => {
        if (!input.text && !input.image) return
        const data = {
            author: authState.id,
            creationTime: new Date(),
            id: Date.now().toString() + '-story',
            image: input.image,
            text: input.text
        }
        db.collection('stories').doc(data.id).set(data)
        props.history.replace('/')
    }

    const setImage = (e) => {
        const reader = new FileReader()
        reader.readAsDataURL(e.target.files[0])
        reader.onload = e => setInput({...input, image: e.target.result})
    }

    return (
        <>
            <Navbar/>
            <div className={styles.create}>
                {input.image && <img src={input.image} alt=""/>}
                {!input.image && <label htmlFor="image"><Camera/></label>}
                <input id="image" type="file" onChange={setImage}/>
                <textarea placeholder="My story.." autoFocus spellCheck="false" onChange={e => setInput({...input, text: e.target.value})}/>
                <button onClick={sendStory}>Send Story</button>
            </div>
        </>
    )
}

export default CreateStory