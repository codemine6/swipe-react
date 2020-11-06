const Time = (props) => {
    if (!props.seconds) return 'A moment ago'
    let time
    const past = (Date.now() - props.toDate().getTime()) / 1000
    if (past < 60 ) {
        time = 'A moment ago'
    }
    else if (past < 3600) {
        time = Math.floor(past / 60) + ' minute ago'
    }
    else if (past < 86400) {
        time = Math.floor(past / 3600) + ' hour ago'
    }
    else if (past < 604800) {
        time = Math.floor(past / 86400) + ' day ago'
    }
    else {
        time = props.toDate().toString().substr(4,11)
    }
    return time
}

export default Time