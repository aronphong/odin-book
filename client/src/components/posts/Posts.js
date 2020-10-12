import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";

const Posts = ({ auth, getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  // @todo return spinner if loading
  return loading ? (
    <div>Loading...</div>
  ) : (
    <Fragment>
      <h1>Your Timeline</h1>

      <PostForm />
      <div className='posts'>
        {posts.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            liked={
              post.likes.filter((like) => like.user === auth.user._id).length >
              0
                ? true
                : false
            }
          />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  auth: PropTypes.object.isRequired,
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
