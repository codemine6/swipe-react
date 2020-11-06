import React, {useContext} from 'react'
import AuthContext from '../../services/AuthContext'
import {db} from '../../services/Firebase'
import Editable from '../../components/Editable/Editable'
import Navbar from '../../components/Navbar/Navbar'
import styles from './EditProfile.module.css'

const EditProfile = () => {
    const {authState} = useContext(AuthContext)

    const setUsername = (value) => {
        db.collection('users').doc(authState.id).update({username: value})
    }

    const setBio = (value) => {
        db.collection('users').doc(authState.id).update({bio: value})
    }

    const setBithday = (e) => {
        db.collection('users').doc(authState.id).update({birthday: e.target.value})
    }

    const setGender = (e) => {
        db.collection('users').doc(authState.id).update({gender: e.target.value})
    }

    return (
        <>
            <Navbar/>
            <div className={styles.profile}>
                <h5>Username</h5>
                <Editable onSubmit={setUsername}>{authState?.username}</Editable>
                <h5>Bio</h5>
                <Editable onSubmit={setBio}>{authState?.bio}</Editable>
                <h5>Birthday</h5>
                <input type="date" value={authState?.birthday ?? '2020-01-01'} min="1970-01-01" max="2030-01-01" onChange={setBithday}/>
                <h5>Gender</h5>
                <label><input type="radio" name="gender" value="man" checked={authState?.gender === 'man'} onChange={setGender}/>Man</label>
                <label><input type="radio" name="gender" value="woman" checked={authState?.gender === 'woman'} onChange={setGender}/>Woman</label>
            </div>
        </>
    )
}

export default EditProfile