import React, { Suspense, useState } from 'react';
// import logo from './logo.svg';
import './App.scss';
// import { Button } from 'react-bootstrap';
import Header from './components/header';
import Login from './components/login';
import Register from './components/register';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './components/home';
import { useEffect, useContext } from 'react';
import i18n from './i18n';
import Loading from './components/loading';
import LocaleContext from './LocaleContext';
import { ThemeProvider } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import NotFound from './components/not-found';


function App() {


  const [locale, setLocale] = useState(i18n.language);

  i18n.on('languageChanged', (lng) => setLocale(i18n.language));

  // const params = window.location.pathname;

  // const [authUser,setAuthUser] = useState<string | null>(null)

 

  return (
    <div className="App">

      <LocaleContext.Provider value={{ locale }}>
        <Suspense fallback={<Loading />}>

          <Helmet htmlAttributes={{
            lang: locale,
            dir: locale === 'en' ? 'ltr' : 'rtl'
          }} />

          <ThemeProvider dir={locale === 'en' ? 'ltr' : 'rtl'}>


            {(  localStorage.getItem('authenticated')) ? <Header/> : ''}

            <BrowserRouter>

                  <Routes>

                    <Route path="/login" element={<Login />}> </Route>

                    <Route path="/register" element={<Register />}></Route>

                    <Route path="/" element={<Home />}> </Route>

                    <Route path="*" element={< NotFound />} />

                  </Routes>

            </BrowserRouter>

          </ThemeProvider>

        </Suspense>
      </LocaleContext.Provider>

    </div>
  )
}

export default App;
