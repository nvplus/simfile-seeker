import { PackCard } from './PackCard.jsx';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const PackViewer = () => {
    const [searchValue, setSearchValue] = useState("");
    const [packs, setPacks] = useState([]);

    const PackViewerContainer = styled.div`
        display: flex;
        justify-content: center;
        width: 100%;
        flex-wrap:  wrap;
        background-color: #424242;
        margin:auto;
        padding: 20px 10px;
    `

    useEffect(() => {
        axios.get('http://localhost:5000/packs')
        .then(res => {
            setPacks(res.data);
            console.log(res.data);
            console.log(`Successfully retrieved ${res.data.length} pack(s)`);
        })
        .catch(err => console.log(err))
    }, []);

    return (
        <PackViewerContainer> 
                {packs.map(pack => <PackCard packData={pack} key={pack._id}/>)}
        </PackViewerContainer>
    )
}

export default PackViewer;