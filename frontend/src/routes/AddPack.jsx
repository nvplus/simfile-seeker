import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { FormControl, TextField, Button, MenuItem, Select, InputLabel, OutlinedInput } from '@mui/material'
import { TagNames } from "../components/tags/tagAttributes";

const AddPack = () => {
    const { register, handleSubmit } = useForm();
    const [tags, setTags] = useState([]);

    const tagsHandleChange = (e) => {
        const value = e.target.value;

        setTags(typeof value === 'string' ? value.split(',') : value,);

        console.log(tags);
    }
    
    const Container = styled.div`
        background-color: #424242;
        color:white;
        height: 100%;
        padding: 25px;
        margin-top: 10px;
    `

    const FormControlContainer = styled.div`
        background-color: white;
        margin-top: 10px;
        padding: 20px;
        height: 80%;
        overflow: auto;
    `

    const StyledTextField = styled(TextField) `
        width: 100%;

        && {
            margin: 10px 10px;
        }
    `
    const StyledSelect = styled(Select)`
        width: 100%;

        && {
            margin: 10px 10px;
        }
        
        legend {
            visibility: visible;
            position: relative;
            bottom: 4px;
        }
    `

    const FormInputs = styled.div`
        display: flex;
        flex-wrap: wrap;
        width: 100%;

        button {
            margin: 10px 10px;
        }
    `

    const handlePackSubmission = (data) => {
        data["tags"] = tags;
        
        axios.post("http://localhost:5000/packs/add", data)
        .then(res => {
            console.log(res.data);
            alert(res.data);

            // navigate to pack's page after this.
        })
        .catch(err => {
            alert(err);
            console.log(err);
        })
    }

    const handleError = (e) => console.log("error" + e);
    return (
        <Container>
            <h3>Add a Pack</h3>
            
            <FormControlContainer>
                <FormControl>
                    <FormInputs>
                        <StyledTextField {...register("title")} label="Title" required />
                        <StyledTextField {...register("author")} label="Author" required />
                        <StyledTextField {...register("description")} label="Description" required />
                        <StyledTextField {...register("banner_url")} label="Banner URL" required />
                        <StyledTextField {...register("download_url")} label="Download URL" required />

  
                 
                        <StyledSelect
                            value={tags}
                            onChange={e => tagsHandleChange(e)}               
                            label="Tags"
                            multiple
                            notched
                        >

                            {Object.keys(TagNames).map((name) => (
                                <MenuItem
                                    key={name}
                                    value={name}
                                    onClick={() => console.log(tags)}
                                    variant="outlined"
                                >
                                    {TagNames[name]}
                                </MenuItem>
                            ))}
                        </StyledSelect>

                        <Button type="submit" onClick={handleSubmit(handlePackSubmission, handleError)}>Submit</Button>
                    </FormInputs>
                </FormControl>
            </FormControlContainer>
        </Container>
    );
}

export default AddPack;