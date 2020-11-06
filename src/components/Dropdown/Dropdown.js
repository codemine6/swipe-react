import React from 'react'
import styles from './Dropdown.module.css'

const Dropdown = (props) => {
    const add = {
        top: props.top + 'rem'
    }

    return (
        <>
            {props.open && <>
                <div className={styles.more} style={add}>
                    {props.children}
                </div>
                <div className={styles.overlay} onClick={() => props.onClose()}/>
            </>}
        </>
    )
}

export default Dropdown