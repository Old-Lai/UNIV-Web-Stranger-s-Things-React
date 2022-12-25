import { updatePosts } from './'
import { removePost, editPost } from '../api/api'
import MessageForm from './message'
import { useState } from 'react'

const IndividualPost = (props)=>{
    const {author,createdAt,description,location,price,title,willDeliver,_id} = props.post
    const isAuthor = props.isAuthor
    const updatedAt = createdAt
    const date = updatedAt.substring(0, updatedAt.indexOf('T')).split('-').reverse().join('/')
    const deliveryMethod = willDeliver?"Will ship to you":"Pickup only"

    const token = props.token
    const setStates = props.setStates
    const from = props.from

    const className = "post" + (isAuthor&&!from==='profile'?" isAuthor":"")

    const [anouncement, setAnouncement] = useState('')

    const [isEditing, setIsEditing] = useState(false)

    function doRemovePost(){
        removePost(token, _id)
        .then(()=>{ updatePosts(token, setStates, from) })
    }

    function NormalMode(){
        return(
            <div className="postDetails">
                <h2>{title}</h2>
                <h4>{description}</h4>
                <h5>location --- {location}</h5>
                <h5>Delivery method --- {deliveryMethod}</h5>
                <h5>Price --- {price}</h5>
                <h5>Posted By --- {author.username}</h5>
                <h6>last edited on --- {date}</h6>
            </div>  
        )
    }

    function EditMode(){
        const [editTitle, setEditTitle] = useState(title)
        const [editDescription, setEditDescription] = useState(description)
        const [editPice, setEditPrice] = useState(price)
        const [editLocation, setEditLocation] = useState(location)
        const [editWillDeliver, setEditWillDeliver] = useState(willDeliver)

        function submitEdit(e){
            e.preventDefault()
            if(!editTitle || !editDescription || !editPice){
                setAnouncement('Must enter something for title, description and price')
                const intervalID = setInterval(()=>{
                    setAnouncement('')
                    clearInterval(intervalID)
                },3000)
            } else {
                editPost(token, _id, {editTitle, editDescription, editPice, editLocation, editWillDeliver})
                .then(({success}) => {
                    if(success)
                    setAnouncement('update was successful')
                    const intervalID = setInterval(()=>{
                        setAnouncement('')
                        clearInterval(intervalID)
                    },3000)
                    updatePosts(token, setStates, from)
                    setIsEditing(false)
                })
            }
        }

        return(
            <div className="postDetails">
                <form id="editPostForm" onSubmit={submitEdit}>
                    <p>Title:</p>
                    <input 
                        type="text"
                        value={editTitle}
                        onChange={(e)=>setEditTitle(e.target.value)}
                    />
                    <p>Description:</p>
                    <input 
                        type="text"
                        value={editDescription}
                        onChange={(e)=>setEditDescription(e.target.value)}
                    />
                    <p>Price:</p>
                    <input 
                        type="text"
                        value={editPice}
                        onChange={(e)=>setEditPrice(e.target.value)}
                    />
                    <p>Location:</p>
                    <input 
                        type="text"
                        value={editLocation}
                        onChange={(e)=>setEditLocation(e.target.value)}
                    />
                    <p>Will Deliver:</p>
                    <input 
                    type="checkbox"
                    checked = {editWillDeliver}
                    onChange={(e)=>{
                        setEditWillDeliver(!editWillDeliver)
                    }}
                    />
                    
                </form>
                <button type="submit" form="editPostForm">Submit</button>
            </div>
        )
    }

    return(
        <section className={className}>
            {anouncement && <p>{anouncement}</p>}
            {!isEditing? <NormalMode/> : <EditMode/>}
            {!isEditing && isAuthor && <button onClick={()=>doRemovePost()}>&#10006;</button>}
            {!isEditing && isAuthor && <button onClick={()=>{setIsEditing(true)}}>&#x270E;</button>}
            {!isAuthor && <MessageForm token={token} postID={_id}/>}
        </section>
    )
}

export default IndividualPost