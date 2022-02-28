import React, {useEffect} from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import GlobalStyle from './globalStyles';
import { Packs, Home, About, AddPack } from "./routes";
import { Navbar } from "./components";
import styled from "styled-components";
import AuthService from "./services/auth-service";
import { useDispatch } from "react-redux";
import { login } from "./redux/user"

const AppContainer = styled.div`
  width: 60%;
  margin: auto;
`;


const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let token = localStorage.getItem('token');

    if (token) {
      AuthService.verifyToken(token).then(res => {
        dispatch(login(res.data))
      }).catch(() => {
        AuthService.logout();
      })
    }
  })

  return (
    <>
      <Router>
          <Navbar />
            <AppContainer>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About/>} />
                <Route path="/packs" element={<Packs/>} >
                  <Route path="add" element={<AddPack />} />
                </Route>
              </Routes>
            </AppContainer>
          <GlobalStyle />
      </Router>

    </>
  );
}

export default App;
