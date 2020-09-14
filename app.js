const setScroll = () => {
    // for alwoys set the scroll at the bottom
    const msgScroll = document.getElementById('messageContent')
    msgScroll.scrollTop = msgScroll.scrollHeight
}

const getUserName = () => {
    const userName = document.getElementById('userName').value
    if (userName) {
        document.getElementById('backDrop').style.display = 'none'
        // console.log(`getUserName -> ${userName}`)
        getFirebaseData()
        setScroll()
    }
    else {
        alert("Please enter your name first...")
    }
}

const messageSend = () => {
    // const userName = document.getElementById('userName').value
    const userName = 'Azeem Shahid'
    const typedMessage = document.getElementById('messageText').value
    let messageDetail = {
        user: userName,
        message: typedMessage
    }
    firebase.database().ref('messages').push(messageDetail)
    // console.log(`messageSend ${userName}`)
    // console.log(`messageSend ${typedMessage}`)
    getFirebaseData() //must nucommit
    setScroll()
    document.getElementById('messageText').value = null
}

const getFirebaseData = () => {
    const messageList = document.getElementById('sendMessages')
    const listTime = document.createElement('li')
    const fetchFirebaseData = [];

    let promise = new Promise((res, rej) => {
        firebase.database().ref('messages').on('child_added', (data) => {
            if (data.val()) {

                res(data.val())
                console.log(data.val())
                fetchFirebaseData.push(data.val())
            }
            else {
                rej('Error')
            }
        })
    })

    promise
        .then(() => {
            setTimeout(() => {
                console.log(`----------------------`)
                console.log(fetchFirebaseData)
                console.log(`----------------------`)
                
                fetchFirebaseData.map((key) => {
                // console.log(key)
                    console.log(fetchFirebaseData[key] + " : " + fetchFirebaseData[key])
                })
                // console.log(fetchFirebaseData) //ok
                console.log(`======================`)
            }, 1500)
        })
        .catch(error => {
            alert(error)
        })



    // listTime.append(`${fetchFirebaseData['user']}: ${fetchFirebaseData['message']}`)
    // messageList.appendChild(listTime)


}