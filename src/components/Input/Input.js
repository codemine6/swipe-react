import React, {useState} from 'react'
import {Eye, EyeInvisible} from '../Icons'
import styles from './Input.module.css'

const Input = (props) => {
    const [input, setInput] = useState()
    const [active, setActive] = useState(false)
    const [type, setType] = useState(props.type)

    const handleChange = (e) => {
        setInput(e.target.value)
        props.onChange(e.target.value)
    }

    return (
        <div className={styles.form}>
            <input
                className={active ? styles.active : null}
                type={type}
                value={input ?? ''}
                onFocus={() => setActive(true)}
                onBlur={() => !input && setActive(false)}
                onChange={handleChange}
            />
            {props.type === 'password' &&
                <>{type === 'password' ? <i onClick={() => setType('text')}><Eye/></i> : <i onClick={() => setType('password')}><EyeInvisible/></i>}</>
            }
            <label>{props.placeholder}</label>
        </div>
    )
}

export default Input