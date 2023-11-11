import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkType, makeGallery } from '../../utilities/postsSlice_utilities';


export const requestPosts = createAsyncThunk(
    'posts/requestPosts',
    async(lastName) => {
        let data = '';

        if(lastName === undefined){
            data = await fetch(`https://www.reddit.com/r/popular/top/.json?limit=1000`); 
        }else {
            data = await fetch(`https://www.reddit.com/r/popular/top/.json?limit=1000&after=${lastName}`); 
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
                    if(!child.data.post_hint){
                        console.log(child)
                    }
                    const type = checkType(child.data);
                    state.redditposts = {
                        ...state.redditposts,
                        [child.data.id]:{
                            id: child.data.id,
                            type: type,
                            video: (type === "hosted:video" || type === "rich:video" & child.data.secure_media) ? child.data.secure_media.reddit_video.dash_url: null,
                            galleryData: (type === "gallery") ? makeGallery(child.data.gallery_data.items): null,
                            thumbnail: child.data.thumbnail,
                            title: child.data.title,
                            author: child.data.author,
                            subreddit: child.data.subreddit_name_prefixed,
                            url: child.data.url,
                            redditLink: child.data.permalink
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