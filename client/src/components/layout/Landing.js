import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";

export const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/timeline' />;
  }
  return (
    <section className='landing'>
      <div>
        <div className='landing-inner'>
          <h1>Odin Book</h1>
          <p>Share, comment and like posts from your friends</p>
          <div className='buttons'>
            <Link to='/register'>Sign Up</Link>
            <Link to='/login'>Login</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
