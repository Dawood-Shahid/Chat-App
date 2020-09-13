const setScroll = () => {
    // for alwoys set the scroll at the bottom
    const msgScroll = document.getElementById('messageContent')
    msgScroll.scrollTop = msgScroll.scrollHeight
    // console.log(`set the scroll`)
}

let getUserName = () => {
    const userName = document.getElementById('userName').value
    if (userName) {
        document.getElementById('backDrop').style.display = 'none'
        // console.log(`getUserName -> ${userName}`)
        setScroll()
    }
    else {
        alert("Please enter your name first...")
    }
}


let messageSend = () => {
    // const userName = document.getElementById('userName').value
    const userName = 'Azeem Shahid'
    const typedMessage = document.getElementById('messageText').value
    
    let messageDetail = {
        user: userName,
        message: typedMessage
    }
    firebase.database().ref('messages').push(messageDetail)
    
    const messageList = document.getElementById('sendMessages')
    const listTime = document.createElement('li')

    let firebadeData = firebase.database().ref('messages').on('child_added', (data) => {
        // data.val()
        console.log(data.val())
    })
    

    listTime.append(`${userName}: ${typedMessage}`)
    messageList.appendChild(listTime)
    
    // console.log(`messageSend ${userName}`)
    // console.log(`messageSend ${typedMessage}`)
    
    
    setScroll()
    document.getElementById('messageText').value = null
}