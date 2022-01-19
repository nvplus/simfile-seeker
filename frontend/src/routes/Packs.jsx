import React from 'react';
import { Outlet } from 'react-router-dom';

const Packs = () => {
    return (
        <>
            <h1>Packs</h1>
            <Outlet />
        </>
        
    );
}

export default Packs;