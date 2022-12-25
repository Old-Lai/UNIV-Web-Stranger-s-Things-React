import { useState, useEffect } from "react";
import { useOutletContext } from "react-router";
import { IndividualPost, CreatePost, updatePosts } from "../components";

//demisherae
const Posts = ()=>{
    const [posts, setPosts] = useState([]);
    const {token} = useOutletContext();
    const [isLoading, setIsLoading] = useState(false);

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [willDeliver, setWillDeliver] = useState(false)

    useEffect(()=>{
        updatePosts(token, {setPosts, setIsLoading}, 'posts')
    },[])

    function searchForm(){
        return(
            <form id="searchForm">
                <input 
                    type=""
                />
            </form>
        )
    }

    return(
        <section>
            {isLoading && <h1>Loading....</h1>}
            {!isLoading && <h1>Stuff people stole from santa:</h1>}
            <section className="posts">
                {posts.map((post)=> <IndividualPost token={token} setStates={{setPosts,setIsLoading}} from='posts' post={post} isAuthor={post.isAuthor} key={post._id}/>)}
            </section>
            {token && <CreatePost token={token} setStates={{setPosts,setIsLoading}} newPost={{title,setTitle,description,setDescription,location,setLocation,price,setPrice,willDeliver,setWillDeliver}}/>}
            <section className="createPostGap"></section>
        </section>
    )
}

export default Posts