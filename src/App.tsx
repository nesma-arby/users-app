import React, { Suspense, useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
// import { Button } from 'react-bootstrap';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import {BrowserRouter,Routes,Route,Link} from "react-router-dom";
import Home from './components/home';
import { useEffect } from 'react';
import i18n from './i18n';
import Loading from './components/loading';
import LocaleContext from './LocaleContext';
import { ThemeProvider } from 'react-bootstrap';
import { Helmet } from 'react-helmet';

function App() {

  const [locale, setLocale] = useState(i18n.language);

  i18n.on('languageChanged', (lng) => setLocale(i18n.language));

  
  return (


    <div className="App">

      <LocaleContext.Provider value={{locale}}>
      <Suspense fallback={<Loading />}>

      <Helmet htmlAttributes={{
          lang: locale,
          dir: locale === 'en' ? 'ltr' : 'rtl'
        }} />

<ThemeProvider dir={locale === 'en' ? 'ltr' : 'rtl'}>

            {localStorage.getItem('username') ? <Header /> : ''}

            <BrowserRouter>
            <div>

              {/* <ul>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul> */}

              <Routes>

                <Route  path="/" element={<Login />} > </Route>

                <Route path="/register" element={<Register />}></Route>

                <Route path="/home" element={<Home />}> </Route>

              </Routes>
            </div>
            </BrowserRouter>
</ThemeProvider>

      </Suspense>
      </LocaleContext.Provider>

    </div>
  );
}

export default App;
