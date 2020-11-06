import React, {useState, useEffect} from 'react'
import {Check, Edit} from '../../components/Icons'
import styles from './Editable.module.css'

const Editable = (props) => {
    const [value, setValue] = useState('')
    const [edit, setEdit] = useState(false)

    const saveValue = () => {
        if (props.children !== value) {
            props.onSubmit(value)
        }
    }

    useEffect(() => {
        props.children && setValue(props.children)
    }, [props])

    return (
        <div className={styles.editable}>
            <p>{value}</p>
            <i onClick={() => {setEdit(!edit); saveValue()}}>{edit ? <Check/> : <Edit/>}</i>
            {edit && <textarea value={value} onChange={e => setValue(e.target.value)} autoFocus spellCheck="false"/>}
        </div>
    )
}

export default Editable