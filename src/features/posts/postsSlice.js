import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';



export const requestPosts = createAsyncThunk(
    'posts/requestPosts',
    async(lastName) => {


        let data = '';

        if(lastName === undefined){
            data = await fetch(`https://www.reddit.com/r/popular/top/.json`); 
        }else {
            data = await fetch(`https://www.reddit.com/r/popular/top/.json?after=${lastName}`); 
        }

        const result = await data.json();
        console.log(result);
        return result;
    }
)



export const postsSlice = createSlice({
    name: 'posts',
    initialState: {
        redditposts: {},
        lastPostName: '',
        requestingToken: false,
        failedToGetToken: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(requestPosts.pending, (state) => {
                state.requestingToken = true;
                state.failedToGetToken = false;
            })
            .addCase(requestPosts.fulfilled, (state, action) => {
                console.log('fulfilled');
                const { payload } = action;
                state.requestingToken = false;
                state.failedToGetToken = false;
                payload.data.children.forEach(child => {
                    console.log(child);
                    state.redditposts = {
                        ...state.redditposts,
                        [child.data.id]:{
                            id: child.data.id,
                            type: (child.data.post_hint) ? child.data.post_hint : null,
                            video: (child.data.secure_media) ? child.data.secure_media.reddit_video.fallback_url: null,
                            thumbnail: child.data.thumbnail,
                            //media: (child.data.post_hint) ? (child.data.post_hint === 'image'|| child.data.post_hint === 'link') ? child.data.url : child.data.media.reddit_video.fallback_url : undefined , //image, link, rich-video
                            title: child.data.title,
                            author: child.data.author,
                            subreddit: child.data.subreddit_name_prefixed,
                            url: child.data.url,
                            reddit_link: child.data.permalink
                        }
                    }
                });
                const lastChild = payload.data.children[payload.data.children.length - 1];
                console.log("last child :", lastChild);
                state.lastPostName = lastChild.data.name;
                console.log(state.post);
            })
            .addCase(requestPosts.rejected, (state) => {
                state.requestingToken = false;
                state.failedToGetToken = true;
            })

    }
})

export const selectLastName = (state) => state.posts.lastPostName;
export const selectPosts = (state) => state.posts.redditposts;






export default postsSlice.reducer;