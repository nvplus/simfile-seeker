import React,  { useEffect, useState }  from "react";
import { PackViewer } from "../components";
import styled from "styled-components";
import axios from 'axios';

const Home = () => {
    const [packs, setPacks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/packs')
        .then(res => {
            setPacks(res.data);
            console.log(res.data);
            console.log(`Successfully retrieved ${res.data.length} pack(s)`);
        })
        .catch(err => console.log(err))
    }, []);

    const Heading = () => {
        const HeadingContainer = styled.div`
            margin: 20px auto;
            width: 100%;
            padding: 10px;
            color:white;
            
            
            text-align: center;

            .heading {
                color: #00D1FF;
                font-weight: 400;
                font-size: 30px;
            }

            .subheading {
                font-weight: 300;
                font-size: 15px;
            }

            a, a:link, a:visited, a:focus, a:hover, a:active {
                color: #0066FF;
                text-decoration: none !important;
            }
        `
        return (
            <HeadingContainer>
                <p className="heading">Download and share ITG simfiles here!</p>
                <p className="subheading">{`A central repository of ${packs.length} pad packs for In the Groove and Stepmania. Don’t know how to play? Get started `}<a target="_blank" href="https://nvplus.github.io/itg-guide/">here.</a></p>
            </HeadingContainer>
        )
    }

    return (
        <div>
            <Heading />
            <PackViewer packs={packs}/>
        </div>
    );
}

export default Home;