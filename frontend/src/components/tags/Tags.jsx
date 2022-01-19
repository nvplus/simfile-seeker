import React from 'react';
import styled from 'styled-components';
import getTagAttributes from './tagAttributes';


const Tags = (props) => {

    const TagsContainer = styled.ul`
        display: inline-flex;
        align-items: flex-start;
        list-style-type: none;
        padding: none !important;
    `

    const Tag = (props) => {
        const {name, colour} = getTagAttributes(props.tag);

        const TagContainer = styled.li`
            position: relative;
            left: -5px;
            border-radius: 10px;  
            margin: 5px 4px;
            text-decoration: none;
            font-size: 9px;
            width: 50px;
            height: 15px;
            padding: 3px;
            text-align: center;
            background-color: ${colour};
            color: white;
            vertical-align: middle;
            line-height: 15px;
            
            filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
        
            p {
                margin: auto;
                width: auto;        
            }
        `;

       return (
           <TagContainer>
               <p>{name}</p>
            </TagContainer>
       )
    }

    return (
        <TagsContainer>
            {props.tags.map(tag => <Tag tag={tag}/>)}
        </TagsContainer>
    );
}

export default Tags;