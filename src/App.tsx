import React, { Suspense, useState } from "react";
import "./App.scss";
import Header from "./components/header";
import Login from "./components/login";
import Register from "./components/register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/home";
import i18n from "./i18n";
import Loading from "./components/loading";
import LocaleContext from "./context/LocaleContext";
import { ThemeProvider } from "react-bootstrap";
import { Helmet } from "react-helmet";
import NotFound from "./components/not-found";
import authContext from "./context/authContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <SomeOtherComponent />
    </BrowserRouter>
  );
}

function SomeOtherComponent() {
  const navigate = useNavigate();
  const [locale, setLocale] = useState(i18n.language);
  i18n.on("languageChanged", (lng) => setLocale(i18n.language));
  const [authenticated, setAuthenticated] = useState(false);

  // for protecting Routes
  useEffect(() => {
    JSON.parse(localStorage.getItem("authenticated") || "{}") === true
      ? navigate("/")
      : navigate("/login");
  }, []);

  return (
    <div className="App">
      <authContext.Provider value={{ authenticated, setAuthenticated }}>
        {/* <div> user is {`${authenticated ? "" : "not"} authenticated`} </div> */}

        <LocaleContext.Provider value={{ locale }}>
          <Suspense fallback={<Loading />}>
            <Helmet
              htmlAttributes={{
                lang: locale,
                dir: locale === "en" ? "ltr" : "rtl",
              }}
            />

            <ThemeProvider dir={locale === "en" ? "ltr" : "rtl"}>
              <Header />

              <Routes>
                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route path="/" element={<Home />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
            </ThemeProvider>
          </Suspense>
        </LocaleContext.Provider>
      </authContext.Provider>
    </div>
  );
}

export default App;
