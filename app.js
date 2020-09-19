let userName = null

const setScroll = () => {
    // for alwoys set the scroll at the bottom
    const msgScroll = document.getElementById('messageContent')
    msgScroll.scrollTop = msgScroll.scrollHeight
}

const getUserName = () => {
    userName = document.getElementById('userName').value
    // localStorage.setItem('user')
    if (userName) {
        document.getElementById('backDrop').style.display = 'none'
        getFirebaseData()
        setScroll()
    }
    else {
        alert("Please enter your name first...")
    }
}

const getFirebaseData = () => {
    const messageList = document.getElementById('sendMessages')
    const fetchFirebaseData = [];

    let promise = new Promise((res, rej) => {
        firebase.database().ref('messages').on("child_added", (data) => {
            // console.log(data.val())
            if (data.val()) {
                // console.log(data.val())
                res(data.val())
                fetchFirebaseData.push(data.val())
            }
            else {
                rej()
            }
            // console.log(fetchFirebaseData.length)
            // console.log(messageList.childElementCount)
        })
    })

    // console.log(fetchFirebaseData)

    promise
        .then(() => {
            // console.log(fetchFirebaseData.length)
            // console.log(messageList.childElementCount)
            if ((fetchFirebaseData.length == 0 && messageList.childElementCount == 0) ||
                (fetchFirebaseData.length != 0 && messageList.childElementCount == 0)) {
                for (let i = 0; i < fetchFirebaseData.length; i++) {
                    var textUserName = `${fetchFirebaseData[i].user}`
                    var textUserMessage = `${fetchFirebaseData[i].message}`
                    // console.log(`${i}- ${fetchFirebaseData[i].user}: ${fetchFirebaseData[i].message} > if`)
                    // console.log(`-----------------------------`)
                    createdElement(textUserName, textUserMessage)
                    setScroll()
                }
            }
            else if (fetchFirebaseData.length != messageList.childElementCount) {
                for (let i = messageList.childElementCount; i < fetchFirebaseData.length; i++) {
                    var textUserName = `${fetchFirebaseData[i].user}`
                    var textUserMessage = `${fetchFirebaseData[i].message}`
                    // console.log(`${i}- ${fetchFirebaseData[i].user}: ${fetchFirebaseData[i].message} > else if`)
                    // console.log(`-----------------------------`)
                    createdElement(textUserName, textUserMessage)
                    setScroll()
                }
            }
            // console.log(fetchFirebaseData.length)
            // console.log(messageList.childElementCount)
        })
        .catch(error => {
            console.log(error)
        })
}

const messageSend = () => {
    // const userName = document.getElementById('userName').value
    // const userName = 'Dawood Shahid'
    const typedMessage = document.getElementById('messageText').value
    let messageDetail = {
        user: userName,
        message: typedMessage
    }
    if (typedMessage) {
        firebase.database().ref('messages').push(messageDetail)
        getFirebaseData() //must nucommit
        setScroll()
        document.getElementById('messageText').value = null
    }
    else {
        alert("Type message first")
    }
}


const createdElement = (textUserName, textUserMessage) => {
    // const userName = document.getElementById('userName').value
    // const userName = 'Dawood Shahid'
    // console.log(`${textUserName}: ${textUserMessage}`)
    const messageList = document.getElementById('sendMessages')
    const listItme = document.createElement('li')
    const userSpan = document.createElement('span')
    const listText = document.createTextNode(`: ${textUserMessage}`)
    if (userName === textUserName) {
        // console.log(`${userName} matched`)
        listItme.classList.add("messageSender")
    }
    userSpan.append(textUserName)
    listItme.appendChild(userSpan)
    listItme.append(listText)
    messageList.appendChild(listItme)
    setScroll()
}

setInterval(
    () => {
        const messageList = document.getElementById('sendMessages')
        if (messageList.childElementCount != 0) {
            getFirebaseData()
        }
    }, 1000
)