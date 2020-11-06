import React, {useState, useContext} from 'react'
import {withRouter} from 'react-router-dom'
import AuthContext from '../../services/AuthContext'
import Sidebar from '../Sidebar/Sidebar'
import {Bell, More} from '../../components/Icons'
import styles from './Navbar.module.css'

const Navbar = (props) => {
    const {authState} = useContext(AuthContext)
    const [toggle, setToggle] = useState(false)

    return (
        <>
            <nav className={styles.navbar}>
                <img src={authState?.profilePhoto} alt="" onClick={() => props.history.push('/profile')}/>
                <i className={styles.notification} onClick={() => props.history.push('/notification')}><Bell/></i>
                <i className={styles.more} onClick={() => setToggle(!toggle)}><More/></i>
            </nav>
            {toggle && <div className={styles.overlay} onClick={() => setToggle(false)}/>}
            <Sidebar open={toggle} closeSidebar={() => setToggle(false)}/>
        </>
    )
}

export default withRouter(Navbar)