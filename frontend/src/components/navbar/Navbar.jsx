import { React } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import AddPackButton from '../buttons/AddPackButton';
import logo from "../../assets/icons/logo.png"
import { useSelector, useDispatch } from "react-redux";
import { login } from '../../redux/user';
import AuthService from '../../services/auth-service';
import RegisterAndLogin from "./RegisterAndLogin.jsx";

const Navbar = () => {
    const { loggedIn } = useSelector(state => state.login);
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
    return (
        <NavbarContainer>
            <NavList>
         
                <li><LogoContainer><Link to='/'><img src={logo} alt="Logo"/></Link></LogoContainer></li>

                <li>
                    <Link to='/about'><p>About</p></Link>
                </li>

                <li>
                    <Link to='/packs'><p>Random Pack</p></Link>
                </li>

                <li>
                    <RegisterAndLogin />
                </li>
   
                <li><Link to='/packs/add'><AddPackButton>Add a Pack</AddPackButton></Link></li>

            </NavList>
        </NavbarContainer>
    )
}

export default Navbar;