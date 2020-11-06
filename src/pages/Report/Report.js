import React, {useState, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Report.module.css'

const Report = () => {
    const {authState} = useContext(AuthContext)
    const [input, setInput] = useState()

    const sendReport = () => {
        if (!input) return
        const data = {
            id: Date.now().toString(),
            message: input,
            senderId: authState.id,
            sendTime: new Date()
        }
        db.collection('reports').doc(data.id).set(data)
        setInput()
    }

    return (
        <>
            <Navbar/>
            <div className={styles.report}>
                <p>This application is still in the development process so there may be errors or bugs. If you find it please report it to us so it can be fixed immediately.</p>
                <textarea value={input ?? ''} placeholder="Your report.." onChange={e => setInput(e.target.value)}/>
                <button onClick={sendReport}>Send</button>
            </div>
        </>
    )
}

export default Report