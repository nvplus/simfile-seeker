import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import GlobalStyle from './globalStyles';
import { Packs, Home } from "./routes";
import { Navbar } from "./components";
import styled from "styled-components";

const AppContainer = styled.div`
  width: 60%;
  margin: auto;
`;

const  App = () => {
  return (
    <>
      <Router>
          <Navbar />
          <AppContainer>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/packs" element={<Packs/>} />
            </Routes>
          </AppContainer>
          <GlobalStyle />
      </Router>
    </>
  );
}

export default App;
