import { React } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import AddPackButton from '../buttons/AddPackButton';
import logo from "../../assets/icons/logo.png"
import { useDispatch, useSelector } from "react-redux";
import RegisterAndLogin from "./RegisterAndLogin.jsx";
import { Button } from "@mui/material"
import AuthService from '../../services/auth-service';
import { logout } from "../../redux/user"

const Navbar = () => {
    const { loggedIn, user } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const NavbarContainer = styled.div`
        display: flex;
        margin-bottom: 20px;
        height: 70px;
        position: sticky;
        background-color: #8AA8A3;
    `

    const NavList = styled.ul`
        list-style-type: none;
        margin: auto;
        display: flex;
        align-content: center;
        justify-content: flex-start;
        width: 60%;

        p {
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
        }

        li {
            a, a:link, a:visited, a:focus, a:hover, a:active {
                color: white;
                text-decoration: none !important;
            }
            
            margin: auto 10px;
        }

        li:last-of-type {
            margin-left: auto;
            margin-right: 0;
        }
    `

    const LogoContainer = styled.li`
        img{
            height: 35px;
        }
    `

    const onLogout = () => {
        AuthService.logout();
        dispatch(logout());
        alert("Logged out.")
        window.location.reload();
    }

    return (
        <NavbarContainer>
            <NavList>
                <li><LogoContainer><Link to='/'><img src={logo} alt="Logo"/></Link></LogoContainer></li>
                {!loggedIn && <li><RegisterAndLogin /></li>}
                {loggedIn && <>
                    <li><p>Logged in as {user.username}</p></li>
                    <li><Button onClick={onLogout}>Logout</Button></li>
                    <li><Link to='/packs/add'><AddPackButton/></Link></li>
                </>}
               
            </NavList>
        </NavbarContainer>
    )
}

export default Navbar;