import axios from "axios";
import { GET_POSTS, POST_ERROR } from "./types";

// Get all posts
export const getPosts = () => async (dispatch) => {
  try {
    const res = await axios.get("/posts");

    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

// Get friend's posts
// Create a post
// Delete a post
// Like a post
// Comment on a post
// Delete comment on a post
