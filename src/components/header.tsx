import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import LocaleContext from '../LocaleContext';
import i18n from '../i18n';

const Header = () => {

  const name = localStorage.getItem('username') || null;

  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);


  const handleLogOut = () =>{
    localStorage.removeItem('username');
    window.location.href = '/';
  }



  function changeLocale (lang:any) {
    if (locale !== lang) {
      i18n.changeLanguage(lang);
    }
  }

    return (
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"> {t('greeting')},{name} </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={locale === 'en' ? 'ms-auto' : 'me-auto'}>

            <Nav.Link onClick={handleLogOut}>{t('logout')}</Nav.Link>

            <NavDropdown title={t('language')} id="basic-nav-dropdown">

              <NavDropdown.Item onClick={() => changeLocale('ar')}>Ar</NavDropdown.Item>
        
              <NavDropdown.Divider />

              <NavDropdown.Item onClick={() => changeLocale('en')}>
                En
              </NavDropdown.Item>

            </NavDropdown>

          </Nav>
        </Navbar.Collapse>

      </Container>
    </Navbar>
    );
};

Header.propTypes = {
    
};

export default Header;