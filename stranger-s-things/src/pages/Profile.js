import { getProfile } from "../api/api";
import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { PostWithMessage } from "../components";

const Profile = ()=>{
    const [isLoading, setIsLoading] = useState(false)
    const [username, setUsername] = useState(null)
    const [posts, setPosts] = useState([])
    const [messages, setMessages] = useState([])

    const {token} = useOutletContext();

    useEffect(()=>{
        setIsLoading(true)
        getProfile(token)
            .then(({data, error, success}) => {
                setUsername(data.username)
                //filter out non active posts
                setPosts(data.posts.filter(post=>post.active))
                //filter out non active messages
                setMessages(data.messages)
                setIsLoading(false)
            })
    },
    [setPosts, setMessages])

    return(
        <section className="profile">
            {isLoading && <h1>Loading.....</h1>}
            <div className="title">
                {!isLoading && <h1>{username}'s Profile:</h1>}
            </div>
            <div className="stats">
                {!isLoading && <h3>Number of Active Posts: {posts.length}</h3>}
                {!isLoading && <h3>Number of messages: {messages.filter(message=>posts.map(post=>post._id).includes(message.post._id)).length}</h3>}
            </div>
            <div className="posts">
                {!isLoading && <h1>Active Posts:</h1>}
                {!isLoading && posts && (posts.length === 0? 
                    <h1>no post</h1> : 
                    posts.map( post => {
                        const postMessages = messages.filter(message=>message.post._id === post._id)
                        return <PostWithMessage token={token} setStates={{setIsLoading, setPosts}} from="profile" post={post} isAuthor={true} messages={postMessages} key={post._id}/>
                    })
                )}
            </div>
        </section>
    )
}

export default Profile;