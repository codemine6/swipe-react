import React, {useState, useEffect} from 'react'
import {Camera, Close} from '../../components/Icons'
import styles from './PostForm.module.css'

const PostForm = (props) => {
    const [text, setText] = useState('')
    const [images, setImages] = useState([])

    const savePost = () => {
        if (!text) return
        props.onSubmit({text,images})
    }

    const addImage = (e) => {
        Array.from(e.target.files).map(image => {
            const reader = new FileReader()
            reader.readAsDataURL(image)
            return reader.onload = e => setImages(images => [...images, e.target.result])
        })
    }

    useEffect(() => {
        if (props.value?.text) {
            setText(props.value.text)
            setImages(props.value.images)
        }
    }, [props])

    return (
        <div className={styles.form}>
            <textarea placeholder="What do you think..?" value={text} onChange={e => setText(e.target.value)}/>
            <label htmlFor="image"><Camera/> Add Photo</label>
            <input id="image" type="file" accept="image/*" multiple onChange={addImage}/>
            <div className={styles.images}>
                {images.map((src, i) => (
                    <div key={i}>
                        <img src={src} alt={i}/>
                        <i onClick={() => setImages(images.filter(img => img !== src))}><Close/></i>
                    </div>
                ))}
            </div>
            <button onClick={savePost}>Save</button>
        </div>
    )
}

export default PostForm