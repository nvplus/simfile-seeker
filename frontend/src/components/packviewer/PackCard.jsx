import React from 'react';
import styled from 'styled-components';
import Tags from '../tags/Tags';
import DownloadButton from '../buttons/DownloadButton';
import { Button } from "@mui/material";
import axios from "axios";

/**
 * A display card for a simfile pack.
 * @param {Object} packData  An object containing details of a pack. {author, title, description, banner_url, download_url, tags}
 */
export const PackCard = (props) => {
    const { packData, showDelete } = props;

    const handleDeleteButtonClick = () => {
        axios.delete(`http://localhost:5000/packs/${packData._id}`)
        .then(res => {
            alert(res.data);
            console.log(res.data);
        })
        .catch(e => {
            alert(e);
            console.log(e);
        })
    }

    const PackContainer = styled.div`
        width: 320px;
        height: 300px;
        background-color: white;
        margin: 15px;
        border-radius: 5px;

        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));

        img {
            width: 100%;
            border-radius: 4px;
        }
    `

    const TextContent = styled.div`
        margin: 5px 10px;
        padding: 6px;
        
        .title {
            font-size: 16px;
        }

        .uploaded {
            margin-top: 4px;
            font-size: 10px;

            a {
               text-decoration:none;
               color: blue;
            }
        }
    `

    const Description = styled.div`
        margin: 5px 0px;
        font-size: 11px;
        font-weight: 300;
        height: 40px;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
    `

    const DownloadButtonContainer = styled.div`
        display: flex;
        
        justify-content: space-between;
        align-items: center;
        filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    `
    return (
        <PackContainer>
            <a href={packData.download_url} target="_blank"><img src={packData.banner_url} /></a>
            <TextContent>
                <b className="title">{packData.title}</b>
                <p className="uploaded">Uploaded by <a href="/">{packData.author}</a></p>
                <Tags tags={packData.tags}/>
                <Description>{packData.description}</Description>
                <DownloadButtonContainer>
                    {showDelete && <Button color="error" onClick={handleDeleteButtonClick}>Delete</Button>}
                    <DownloadButton download_url={packData.download_url} />
                </DownloadButtonContainer>
            </TextContent>
        </PackContainer>
    )
}