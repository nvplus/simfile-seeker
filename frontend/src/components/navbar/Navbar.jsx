import { React } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";
import AddPackButton from '../buttons/AddPackButton';
import logo from "../../assets/icons/logo.png"

const Navbar = () => {
    const NavbarContainer = styled.div`
        background-color: #8AA8A3;
        display:flex;
        position: sticky;
        align-items: center;
        margin-bottom: 20px;
    `

    const NavList = styled.ul`
        list-style-type: none;
        margin: auto;
        display: flex;

        li {
            a, a:link, a:visited, a:focus, a:hover, a:active {
                color: black;
                text-decoration: none !important;
            }
            
            margin: 10px 20px;
        }
    `

    const LogoContainer = styled.li`
        
        img{
            height: 20px;
        }
    `
    return (
        <NavbarContainer>
            <NavList>
                <LogoContainer>
                    
                    <Link to='/'><img src={logo} alt="Logo"/></Link>
                </LogoContainer>

                <li>
                    <Link to='/about'>About</Link>
                </li>

                <li>
                    <Link to='/packs'>Random Pack</Link>
                </li>

                <li>
                    <Link to='/packs/add'><AddPackButton>Add a Pack</AddPackButton></Link>
                </li>
            </NavList>
        </NavbarContainer>
    )
}

export default Navbar;