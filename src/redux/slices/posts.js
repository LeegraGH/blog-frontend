import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axios";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
    const { data } = await axios.get('/posts');
    return data;
});

export const fetchTags = createAsyncThunk("/posts/fetchTags", async () => {
    const { data } = await axios.get('/posts/tags');
    return data;
});

export const fetchRemovePost = createAsyncThunk("/posts/fetchRemovePost", async (id) => {
    axios.delete(`/posts/${id}`);
});

const initialState = {
    posts: {
        items: [],
        status: "loading"
    },
    tags: {
        items: [],
        status: "loading"
    }
};

const postsSlice = createSlice({
    name: "posts",
    initialState,
    reducers: {},
    extraReducers: {
        [fetchPosts.pending]: (state, action) => {
            state.posts.items = [];
            state.posts.status = "loading"
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.items = action.payload;
            state.posts.status = "loaded";
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.items = [];
            state.posts.status = "error";
        },


        [fetchTags.pending]: (state, action) => {
            state.tags.items = [];
            state.tags.status = "loading"
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.items = action.payload;
            state.tags.status = "loaded";
        },
        [fetchTags.rejected]: (state) => {
            state.tags.items = [];
            state.tags.status = "error";
        },


        [fetchRemovePost.pending]: (state, action) => {
            state.posts.status = "loading"
        },
        [fetchRemovePost.fulfilled]: (state, action) => {
            state.posts.items = state.posts.items.filter(item => item._id !== action.meta.arg);
            state.posts.status = "loaded";
        },
        [fetchRemovePost.rejected]: (state) => {
            state.posts.status = "error";
        }
    }
})

export const postsReducer = postsSlice.reducer;