import React from 'react';
import styled from 'styled-components';

const AddPackButton = (props) => {
    const Button = styled.div`
        border-radius: 5px;
        text-decoration: none;
        color: white;
        height: 30px;
        width: 100px;
        background-color: #00D1FF;
        display: inline-flex;
        font-size: 14px;
        align-items: center;
        justify-content: center;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));

        img {
            height: 15px;
            width: 15px;
        }
        padding: 2px 5px;
        p {
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.15));
        }
    `

    return (
        <Button>
            <p>Add a Pack</p>
        </Button>
    )   
}

export default AddPackButton;