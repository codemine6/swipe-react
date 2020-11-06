import React, {useContext} from 'react'
import {db} from '../../services/Firebase'
import AuthContext from '../../services/AuthContext'
import Navbar from '../../components/Navbar/Navbar'
import styles from './Settings.module.css'

const Settings = () => {
    const {authState} = useContext(AuthContext)

    const setShowEmail = (e) => {
        const data = authState.settings
        data.showEmail = e.target.checked
        db.collection('users').doc(authState.id).update({settings: data})
    }

    return (
        <>
            <Navbar/>
            <div className={styles.privacy}>
                <h4>Privacy</h4>
                <div>
                    <p>Allow people to see your email address.</p>
                    <input id="email" type="checkbox" checked={authState?.settings.showEmail ?? false} onChange={setShowEmail}/>
                    <label htmlFor="email"/>
                </div>
            </div>
        </>
    )
}

export default Settings