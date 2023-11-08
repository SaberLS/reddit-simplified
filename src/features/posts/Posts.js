import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestPosts, 
         selectPosts, 
         selectLastName } from "./postsSlice";
import ShakaPlayer from 'shaka-player-react';
import 'shaka-player-react/dist/controls.css';
import { Box, Button as GrommetButton, Card } from 'grommet';
import PostCard from "./PostCard";
import { Image } from "grommet";

export default function User() {
    const dispatch = useDispatch();
    const lastPostName = useSelector(selectLastName);
    const posts = useSelector(selectPosts);

    return (
        <>
            <GrommetButton onClick={() => {
                    console.log("lastPostName :",lastPostName);
                    console.log("posts", posts);
                    dispatch(requestPosts(lastPostName))}} label='POSTS'/>
            <Box direction="column">{Object.keys(posts).map((post) => {
                if(posts[post].type === 'image'){
                    return (
                        <PostCard key={post} id={post} title={posts[post].title} content={<Image fit="cover" src={posts[post].url} />} />
                    )
                }else if(posts[post].type === 'hosted:video') {
                    return <Card name="Post" direction="column" justify="start" pad="xsmall" gap="none" margin={{"top": "medium"}} width="100%" key={post}>
                    <h3>{posts[post].title}</h3>\
                    <div style={{ margin: 'auto', height: 700, width: 400 }}>
                        <ShakaPlayer height={700} muted={true} loop={true} autoPlay src={posts[post].video} />
                    </div>
                </Card>
                }else if(posts[post].type === 'link'){
                    return <Card name="Post" direction="column" justify="start" pad="xsmall" gap="none" margin={{"top": "medium"}} width="100%" key={post}>
                    <h3>{posts[post].title}</h3>\
                    <a target="blank" href={posts[post].url}>{posts[post].url}</a>
                </Card>
                }
                return <Card name="Post" direction="column" justify="start" pad="xsmall" gap="none" margin={{"top": "medium"}} width="100%" key={post}>{posts[post].title}
                    {console.log("UNRECOGNIZED!!! :", posts[post])}
                    <p style={{color: 'red'}}>UNRECOGNIZED POST</p><a target="blank" href={`https://reddit.com${posts[post].redditLink}`}>{posts[post].redditLink}</a>    
                </Card>
            })
            }</Box>
        </>
    )
}