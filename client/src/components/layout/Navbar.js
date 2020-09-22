import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <h1>
        <Link to='/'>Odin Book</Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
