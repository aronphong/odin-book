import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deletePost } from "../../actions/post";

const PostItem = ({
  auth,
  post: { _id, name, text, user, avatar, likes, comments, date },
  deletePost,
}) => {
  return (
    <div className='post'>
      <div>
        <Link to={`/post/${user}`}>
          <img className='img' src={avatar} alt='user avatar' />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className='post-text'>{text}</p>
        <p className='post-date'>
          <Moment fromNow>{date}</Moment>
        </p>
      </div>

      <Fragment>
        <button type='button'>Like</button>
        <button type='button'>Unlike</button>
        {/* @todo view last 3 comments only */}
        <button type='button'>Comment</button>
        {!auth.loading && user === auth.user._id && (
          <button type='button' onClick={() => deletePost(_id)}>
            Delete Post
          </button>
        )}
      </Fragment>
    </div>
  );
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deletePost })(PostItem);
