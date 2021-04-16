import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/auth';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const Navbar: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  return (
    <>
      <Topbar handleDrawerToggle={handleDrawerToggle} />
      {user && (
        <Sidebar
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerClose={handleDrawerClose}
          mobileOpen={mobileOpen}
        />
      )}
    </>
  );
};

export default Navbar;
