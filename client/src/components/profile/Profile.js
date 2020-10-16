import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getProfileById } from "../../actions/profile";

const Profile = ({ auth }) => {
  return (
    <Fragment>
      {auth.isAuthenticated &&
        auth.loading === false &&
        auth.user._id === Profile.user._id && (
          <Link to='/edit-profile' className='btn'>
            Edit Profile
          </Link>
        )}
    </Fragment>
  );
};

Profile.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(Profile);
