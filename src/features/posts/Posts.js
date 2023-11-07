import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPosts, 
         selectPosts, 
         selectLastName } from "./postsSlice";

export default function User() {
    const dispatch = useDispatch();
    const lastPostName = useSelector(selectLastName);
    const posts = useSelector(selectPosts);
    

    return (
        <>
            <button onClick={() => {
                    console.log("lastPostName :",lastPostName);
                    console.log("posts", posts);
                    dispatch(requestPosts(lastPostName))}}>Posts</button>
            <ul>{Object.keys(posts).map((post) => {
                if(posts[post].type === 'image'){
                    return <li key={post}>
                        <h3>{posts[post].title}</h3>
                        <img src={posts[post].url} width='400px'></img>
                    </li>
                }else if(posts[post].type === 'hosted:video') {
                    return <li key={post}>
                    <h3>{posts[post].title}</h3>
                    <video  width='400px' controls>
                        <source src={posts[post].video} type="video/mp4"/>
                    </video>
                </li>
                }
                return <li key={post}>{posts[post].title}</li>
            })
            }</ul>
        </>
    )
}