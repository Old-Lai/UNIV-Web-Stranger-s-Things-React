import { useState } from "react"
import { sendMessage } from "../api/api"

const MessageForm = ({token, postID})=>{
    const [message, setMessage] = useState('')
    const [anouncement, setAnouncement] = useState('')

    function submitMessage(e){
        e.preventDefault()
        setAnouncement('Submitting......')
        sendMessage(token, message, postID)
        .then(({success}) => {
            if(success)
                setAnouncement('Message was successfully sent')
                const intervalID = setInterval(()=>{
                    setAnouncement('')
                    clearInterval(intervalID)
                },3000)
                setMessage('')
        }
        )
    }

    return(
        <form className='messageForm' onSubmit={submitMessage}>
            <input 
                type="text"
                value={message}
                onChange={(e)=>setMessage(e.target.value)}
            ></input>
            <button type="submit">Send Message</button>
            {anouncement && <p className="">{anouncement}</p>}
        </form>
    )
}

export default MessageForm