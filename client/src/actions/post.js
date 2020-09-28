import axios from "axios";
import { setAlert } from "./alert";
import { ADD_POST, GET_POSTS, POST_ERROR } from "./types";

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

// Create a post
export const addPost = (formData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/posts", formData, config);

    dispatch({
      type: ADD_POST,
      payload: res.data,
    });

    dispatch(setAlert("Post Created"));
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

/*
  @todo
    Get friend's posts
    Delete a post
    Like a post
    Comment on a post
    Delete comment on a post
*/
