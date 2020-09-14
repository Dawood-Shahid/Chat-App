const setScroll = () => {
    // for alwoys set the scroll at the bottom
    const msgScroll = document.getElementById('messageContent')
    msgScroll.scrollTop = msgScroll.scrollHeight
}

const getUserName = () => {
    const userName = document.getElementById('userName').value
    if (userName) {
        document.getElementById('backDrop').style.display = 'none'
        getFirebaseData()
        setScroll()
    }
    else {
        alert("Please enter your name first...")
    }
}

const messageSend = () => {
    const userName = document.getElementById('userName').value
    // const userName = 'Azeem Shahid'
    const typedMessage = document.getElementById('messageText').value
    let messageDetail = {
        user: userName,
        message: typedMessage
    }
    if(typedMessage) {
        firebase.database().ref('messages').push(messageDetail)
        getFirebaseData() //must nucommit
        setScroll()
        document.getElementById('messageText').value = null
    }
    else {
        alert("Type message first")
    }
}

const getFirebaseData = () => {
    const messageList = document.getElementById('sendMessages')
    const fetchFirebaseData = [];

    let promise = new Promise((res, rej) => {
        firebase.database().ref('messages').on('child_added', (data) => {
            if (data.val()) {

                res(data.val())
                fetchFirebaseData.push(data.val())
            }
            else {
                rej('Error')
            }
        })
    })

    promise
        .then(() => {
            if ((fetchFirebaseData.length == 0 && messageList.childElementCount == 0) ||
                (fetchFirebaseData.length != 0 && messageList.childElementCount == 0)) {
                for (let i = 0; i < fetchFirebaseData.length; i++) {
                    var text = `${fetchFirebaseData[i].user}: ${fetchFirebaseData[i].message} `
                    createdElement(text)
                }
            }
            else if (fetchFirebaseData.length != messageList.childElementCount) {
                for (let i = fetchFirebaseData.length - 1; i < fetchFirebaseData.length; i++) {
                    var text = `${fetchFirebaseData[i].user}: ${fetchFirebaseData[i].message} `
                    createdElement(text)
                }
            }

        })
        .catch(error => {
            console.log(error)
        })
    setScroll()
}

const createdElement = (text) => {
    const messageList = document.getElementById('sendMessages')
    const listTime = document.createElement('li')
    const listText = document.createTextNode(text)
    listTime.appendChild(listText)
    messageList.appendChild(listTime)
    setScroll()
}
