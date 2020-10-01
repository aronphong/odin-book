import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../../actions/post";

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState("");
  return (
    <form
      className='comment-form'
      onSubmit={(e) => {
        e.preventDefault();
        addComment(postId, { text });
        setText("");
      }}
    >
      <textarea
        name='commentText'
        cols='30'
        rows='3'
        placeholder='Add a comment'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input type='submit' className='btn' value='Submit' />
    </form>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
