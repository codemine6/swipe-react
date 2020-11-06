import React, {useState, useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import {Global, Lock, Setting} from '../../components/Icons'
import styles from './PostSettings.module.css'

const PostSettings = () => {
    const {authState} = useContext(AuthContext)
    const [open, setOpen] = useState(false)

    const privacyChange = (e) => {
        const data = authState.settings
        data.postPrivacy = e.target.value
        db.collection('users').doc(authState.id).update({settings: data})
    }

    return (
        <>
            <i className={styles.privacy}>{authState?.settings.postPrivacy === 'public' ? <Global/> : <Lock/>}</i>
            <i className={styles.settingIcon} onClick={() => setOpen(!open)}><Setting/></i>
            {open && <div className={styles.setting}>
                <div className={styles.privacy}>
                    <h4>Privacy</h4>
                    <label><input type="radio" name="privacy" value="public" checked={authState?.settings.postPrivacy === 'public'} onChange={privacyChange}/>Public</label>
                    <label><input type="radio" name="privacy" value="private" checked={authState?.settings.postPrivacy === 'private'} onChange={privacyChange}/>Private</label>
                </div>
            </div>}
        </>
    )
}

export default PostSettings