import { React } from 'react';
import styled from 'styled-components';
import { Link } from "react-router-dom";

const Navbar = () => {
    const NavbarContainer = styled.div`
        background-color: #8AA8A3;
        display:flex;
        position: sticky;
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

    return (
        <NavbarContainer>
            <NavList>
                <li>
                    <Link to='/'>Home</Link>
                </li>

                <li>
                    <Link to='/about'>About</Link>
                </li>

                <li>
                    <Link to='/packs'>Random Pack</Link>
                </li>
            </NavList>
        </NavbarContainer>
    )
}

export default Navbar;