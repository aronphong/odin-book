import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import CommentForm from "./comments/CommentForm";
import CommentItem from "./comments/CommentItem";
import { addLike, removeLike, deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, name, text, user, avatar, likes, comments, date },
  liked,
  addLike,
  removeLike,
  deletePost,
}) => {
  const [like, setLike] = useState(liked);

  return (
    <div className='post'>
      <div>
        <Link to={`/post/${user}`}>
          <img className='img' src={avatar} alt='user avatar' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div className='post-text'>
        <p>{text}</p>
        <p className='post-date'>
          <Moment fromNow>{date}</Moment>
        </p>
      </div>

      <Fragment>
        <button
          type='button'
          className='btn'
          onClick={async (e) => {
            like ? await removeLike(_id) : await addLike(_id);
            setLike(!like);
          }}
        >
          <span>{like ? "Unlike" : "Like"}</span>
        </button>

        {/* @todo view last 3 comments only */}
        {!auth.loading && user === auth.user._id && (
          <button type='button' className='btn' onClick={() => deletePost(_id)}>
            Delete Post
          </button>
        )}
        {comments.map((comment) => (
          <CommentItem
            key={comment._id}
            className='btn'
            postId={_id}
            comment={comment}
          />
        ))}
        <CommentForm postId={_id} />
      </Fragment>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
