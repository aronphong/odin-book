import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Landing = (props) => {
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

Landing.propTypes = {};

export default Landing;
