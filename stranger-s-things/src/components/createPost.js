import { useState } from "react"
import { uploadPost } from "../api/api"
import { updatePosts } from "./"

const CreatePost = (props) => {
    const {title, setTitle,
        description, setDescription,
        price, setPrice,
        location, setLocation,
        willDeliver, setWillDeliver} = props.newPost
    const setStates = props.setStates
    const token = props.token
    const apiFunc = props.apiFunc

    const [anouncement, setAnouncement] = useState('Create Post:')

    function submitPost(e){
        e.preventDefault()
        if(!title || !description || !price){
            setAnouncement('Must enter something for title, description and price')
            const intervalID = setInterval(()=>{
                setAnouncement('Create Post:')
                clearInterval(intervalID)
            },3000)
        } else {
        uploadPost(token, {title,description,price,location,willDeliver})
        .then(() => updatePosts(token, setStates))
        }
    }
    
    return(
        <section className="createPost">
            <form id="postForm" onSubmit={submitPost}>
                <h4>{anouncement}</h4>
                <div className="title">
                    <p>Title</p>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={e=>setTitle(e.target.value)}
                    />
                </div>
                <div className="description">
                    <p>Description</p>
                    <input 
                        type="text" 
                        value={description} 
                        onChange={e=>setDescription(e.target.value)}
                    />
                </div>
                <div className="price">
                    <p>Price</p>
                    <input 
                        type="text" 
                        value={price} 
                        onChange={e=>setPrice(e.target.value)}
                    />
                </div>
                <div className="location">
                    <p>Location</p>
                    <input 
                        type="text" 
                        value={location} 
                        onChange={e=>setLocation(e.target.value)}
                    />
                </div>
                <div className="willDeliver">
                    <label>
                        <input 
                            type="checkbox"
                            checked={willDeliver}
                            onChange={e=>setWillDeliver(!willDeliver)}
                        />
                        Will deliver
                    </label>
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>
    )
}

export default CreatePost