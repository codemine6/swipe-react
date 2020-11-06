import React from 'react'
import {withRouter} from 'react-router-dom'
import {auth} from '../../services/Firebase'
import styles from './Sidebar.module.css'

const Sidebar = (props) => {
    const handleRoute = (path) => {
        props.history.push(path)
        props.closeSidebar()
    }

    const handleLogout = () => {
        props.history.replace('/')
        auth.signOut()
    }

    return (
        <div id={styles.sidebar} className={props.open ? styles.open : null}>
            <div onClick={() => handleRoute('/')}>
                <p>Home</p>
            </div>
            <div onClick={() => handleRoute('/bookmarks')}>
                <p>Bookmarks</p>
            </div>
            <div onClick={() => handleRoute('/followers')}>
                <p>Followers</p>
            </div>
            <div onClick={() => handleRoute('/settings')}>
                <p>Settings</p>
            </div>
            <div onClick={() => handleRoute('/report')}>
                <p>Report</p>
            </div>
            <div onClick={handleLogout}>
                <p>Logout</p>
            </div>
        </div>
    )
}

export default withRouter(Sidebar)