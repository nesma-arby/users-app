import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import LocaleContext from '../LocaleContext';
import i18n from '../i18n';
import { useTranslation } from 'react-i18next';


const Header = (props:any) => {

  const name = localStorage.getItem('username') ;

  const { t } = useTranslation();
  const { locale } = useContext(LocaleContext);


 
  const handleLogOut = () =>{
    localStorage.removeItem('username');
    localStorage.removeItem('authenticated');
    window.location.href = '/login';
  }



  function changeLocale (lang:any) {
    if (locale !== lang) {
      i18n.changeLanguage(lang);
    }
  }

    return (
      <Navbar bg="light" expand="lg" data-cy='nav-bar'>

      <Container>
        
    {localStorage.getItem("authenticated") &&  
    <Navbar.Brand href="#home"> {t('greeting')},{name} </Navbar.Brand> }

     {localStorage.getItem("authenticated") &&
      <Nav.Link onClick={handleLogOut} style={{padding:'0 30px'}}>{t('logout')}</Nav.Link>}

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">

           <Nav className={locale === 'en' ? 'ms-auto' : 'me-auto'}>


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