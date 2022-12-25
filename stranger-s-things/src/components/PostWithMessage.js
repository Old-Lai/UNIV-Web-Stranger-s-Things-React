import IndividualPost from "./individualPost"


const PostWithMessage = ({token, setStates, from, post, isAuthor, messages})=>{
    const filteredMessages = messages.filter(message=>post._id === message.post._id)
    function MessageEle({message}){
        return(
            <div className="message">
                <h3>{message.fromUser.username}:</h3>
                <h3>{message.content}</h3>
            </div>
        )
    }

    return(
        <section className="profilePosts">
            <IndividualPost token={token} setStates={setStates} from={from} post={post} isAuthor={isAuthor}/>
            <section className="message">
                <h2>Messages:</h2>
                {filteredMessages && filteredMessages.map(message=><MessageEle message={message} key={message._id}/>)}
            </section>
        </section>
    )
}

export default PostWithMessage