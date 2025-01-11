
const options={
    method:"",
    headers: {
        "Content-Type":"application/json"
    },
    body:{}
}
// const apiUrl='http://172.16.16.136:3000/messages/'
const apiUrl='https://szofti2chat-default-rtdb.europe-west1.firebasedatabase.app/messages.json'

document.getElementById('send').addEventListener("click", sendMessage)
const stage={}

function getMessages(){
    console.log("GetMessages")
    options.body={}
    options.method="GET"
    fetch(apiUrl).
        then((res)=>res.json()).
        then(messages=>{
            console.log(messages)
            stage.messages=[]
            for (const key in messages) {
                stage.messages.push(messages[key])
            }           
            render()
        })
}

function render(){
    const uzenetek=document.getElementById('messages')
    uzenetek.innerHTML=""
    for (const message of stage.messages) {
        const sor = document.createElement('div')
        sor.className="row"

        const user= document.createElement('div')
        user.className="col"
        user.innerHTML=message.user

        const uzi= document.createElement('div')
        uzi.className="col"
        uzi.innerHTML=message.message

        sor.appendChild(user)
        sor.appendChild(uzi)

        uzenetek.appendChild(sor)
    }
}

function sendMessage(){
    const uzi= document.getElementById('message').value
    document.getElementById('message').value=""
    const body={
        user:"Attila",
        message:uzi
    }
    options.body=JSON.stringify(body)
    options.method="POST"
    fetch(apiUrl,options).then((res)=>console.log("Üzi elküldve!"))
}

getMessages()

setInterval(getMessages, 2000)