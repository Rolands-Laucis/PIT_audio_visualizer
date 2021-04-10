var msgCount = 10

function l(msg){
    if(msgCount > 0){
        console.log(msg)
        msgCount--
    }
}

function setlog(n){
    msgCount = n
}