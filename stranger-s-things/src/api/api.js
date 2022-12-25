const API_URL = "https://strangers-things.herokuapp.com/api/2209-ftb-pt-web-pt/"

export async function registerUser({username, password}){
    try{
        const response = await fetch(`${API_URL}users/register`, {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                        body: JSON.stringify({
                                        user: {
                                            username,
                                            password
                                        }
                                    })
                                });
        const data = await response.json();
        //console.log(data);
        return data;
    } catch(e) {
        console.error(e);
    }
}

export async function loginUser({username, password}){
    try{
        const response = await fetch(`${API_URL}users/login`, {
                                    method: "POST",
                                    headers: {
                                        'Content-Type': 'application/json'
                                    },
                                    body: JSON.stringify({
                                        user: {
                                        username,
                                        password
                                        }
                                    })
                                });
        const data = await response.json();
        //console.log(data);
        return data;
    } catch(e) {
        console.error(e);
    }
}

export async function getProfile(token){
    try{
        const response = await fetch(`${API_URL}users/me`, {
                                    method: "GET",
                                    headers: {
                                        'Content-Type' : 'application/json',
                                        'Authorization' : `Bearer ${token}`
                                    }
                                });
        const data = await response.json();
        //console.log(data);
        return data;
    } catch(e) {
        console.error(e);
    }
}

export async function getPosts(token){
    try{
        const response = token? await fetch(`${API_URL}posts`,{
                                            method: "GET",
                                            headers:{
                                                'Content-Type' : 'application/json',
                                                'Authorization' : `Bearer ${token}`
                                            }
                                        })
                                :
                                await fetch(API_URL + 'posts');
        
        const data = await response.json();
        // console.log(data);
        return data;
    } catch(e) {
        console.error(e);
    }
}

export async function removePost(token, postID){
    try{
        const response = await fetch(`${API_URL}posts/${postID}`,{
                                    method: "DELETE",
                                    headers:{
                                        'Content-Type' : 'application/json',
                                        'Authorization' : `Bearer ${token}`
                                    }
                                })
        
        const data = await response.json();
        // console.log(data);
        return data;
    } catch(e) {
        console.error(e);
    }
}

export async function uploadPost(token, {title, description, price, location, willDeliver}){
    try{
        const response = await fetch(`${API_URL}posts`,{
                                    method: "POST",
                                    headers:{
                                        'Content-Type' : 'application/json',
                                        'Authorization' : `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                        post: {
                                            title,
                                            description,
                                            price,
                                            location,
                                            willDeliver
                                        }
                                    })
                                })
        
        const data = await response.json();
        // console.log(data);
        return data;
    } catch(e) {
        console.error(e);
    }
}

export async function sendMessage(token, content, postID){
    try{
        const response = await fetch(`${API_URL}posts/${postID}/messages`,{
                                    method: "POST",
                                    headers:{
                                        'Content-Type' : 'application/json',
                                        'Authorization' : `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                        message: {
                                            content
                                        }
                                    })
                                })
        
        const data = await response.json();
        // console.log(data);
        return data;
    } catch(e) {
        console.error(e);
    }
}

export async function editPost(token, postID, {editTitle, editDescription, editPrice, editLocation, editWillDeliver}){
    try{
        const response = await fetch(`${API_URL}posts/${postID}`,{
                                    method: "PATCH",
                                    headers:{
                                        'Content-Type' : 'application/json',
                                        'Authorization' : `Bearer ${token}`
                                    },
                                    body: JSON.stringify({
                                        post: {
                                            title:editTitle,
                                            description:editDescription,
                                            price:editPrice,
                                            location:editLocation,
                                            willDeliver:editWillDeliver
                                        }
                                    })
                                })
        
        const data = await response.json();
        // console.log(data);
        return data;
    } catch(e) {
        console.error(e);
    }
}