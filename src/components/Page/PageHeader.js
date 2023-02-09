import React, { useEffect, useState } from 'react';

import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
} from 'reactstrap';
import { useLocation } from 'react-router-dom';

import styles from './styles.module.scss';

import routes from '../../routes';

export default function PageHeader() {
  const location = useLocation(); 
  const [url, setUrl] = useState(null);

  useEffect(() => {
    setUrl(location.pathname);
  }, [location]);

  return(
    <Navbar className={styles['header__navbar__container']}>
      <NavbarBrand className={styles['header__navbar__brand']}>
        <h1> Brand </h1>
      </NavbarBrand>
      <Nav className={styles['header__navbar__tab-group__container']}>
        {
          routes.filter(item => item.name !== 'Error').map((item, index) => (
            <NavItem key={'NavItem ' + item.name + index}>
              <NavLink 
                active={url === item.path}
                className={
                  url === item.path ? (
                    styles['header__navbar__tab-group__tab-item--active']
                  ) : (
                    styles['header__navbar__tab-group__tab-item'] 
                  )}
                href={item.path} 
              > 
                {item.name} 
              </NavLink>
            </NavItem>
          ))
        }
      </Nav>
    </Navbar>
  );
}