import { getPosts } from "../api/api"
import { getProfile } from "../api/api"

const updatePosts = (token, setStates, from)=>{
    const {setPosts, setIsLoading} = setStates
    setIsLoading(true)
    if(from === 'profile')
        getProfile(token)
        .then(({data, error, success}) => {
            if(success){
                setPosts(data.posts.filter(post=>post.active).reverse())
            }
            setIsLoading(false)
        })
    else 
        getPosts(token)
        .then(({data, error, success}) => {
            if(success){
                setPosts(data.posts.reverse())
            }
            setIsLoading(false)
        })
}

export default updatePosts