const MessageEle = ()=>{
    return(
        <form className='messageForm' onSubmit={submitMessage}>
            <input type="text"></input>
            <button type="submit">Send Message</button>
        </form>
    )
}