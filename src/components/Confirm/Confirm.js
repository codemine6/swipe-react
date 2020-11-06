import React, {useState} from 'react'
import styles from './Confirm.module.css'

const Confirm = (props) => {
    const [show, setShow] = useState(false)

    const confirm = () => {
        setShow(false)
        props.onConfirm()
    }

    return (
        <>
            <p onClick={() => setShow(true)}>{props.children.props.children}</p>
            {show && <div className={styles.confirm}>
                <p>{props.title}</p>
                <span onClick={confirm}>Yes</span>
                <span onClick={() => setShow(false)}>No</span>
            </div>}
        </>
    )
}

export default Confirm