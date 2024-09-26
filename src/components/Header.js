import React from 'react';
import { NavLink, Link } from 'react-router-dom';

const Header = () => {
  return(
  <>
  <header className="header-upper py-3">
    <div className="container-xxl">
      <div className="row">
        <div className="col-2">
          <h4>
            <Link className='text-white'>ExpenseTracker</Link>
          </h4>
        </div>
        <div className='col-5'></div>
      </div>
    </div>
  </header>
  </>
  );
};

export default Header;
