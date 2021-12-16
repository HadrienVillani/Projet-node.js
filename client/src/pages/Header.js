import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <nav>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/profil'> Profil</Link>
        </li>
        <li>
          <Link to='/trending'>Trending</Link>
        </li>
        <li>
          <Link to='/connectForm'>Connexion</Link>
        </li>
      </nav>
    </div>
  );
};

export default Header;
