import { React } from "react";
import axios from 'axios';
import styled from 'styled-components';

const AddPack = () => {
    const Container = styled.div`
        background-color: #424242;
        height: 500px;
    `
    return (
        <Container>
            Add a Pack
        </Container>
    );
}

export default AddPack;