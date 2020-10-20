import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProfileItem = ({ profile: { _id, name, avatar } }) => {
  return (
    <div className='profile'>
      <img className='round-img' src={avatar} alt='user avatar' />
      <div>
        <h1>{name}</h1>
        <Link to={`/profile/${_id}`} className='btn'>
          View Profile
        </Link>
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
