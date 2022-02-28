import { PackCard } from './PackCard.jsx';
import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const PackViewer = (props) => {
    const [searchValue, setSearchValue] = useState("");
    const { user } = useSelector(state => state.user);

    const PackViewerContainer = styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        flex-wrap:  wrap;
        background-color: #424242;
        margin:auto;
        padding: 20px 10px;
    `
    return (
        <PackViewerContainer> 
            {props.packs.map(pack => <PackCard packData={pack} showDelete={user.user_class == "admin"} key={pack._id}/>)}
        </PackViewerContainer>
    )
}
export default PackViewer;