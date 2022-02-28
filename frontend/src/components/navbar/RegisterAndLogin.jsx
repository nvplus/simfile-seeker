import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import styled from "styled-components";
import AuthService from '../../services/auth-service';
import { useForm } from "react-hook-form";
import { login } from "../../redux/user"
import { useDispatch } from "react-redux";

const RegisterAndLogin = () => {
    const [open, setOpen] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const { register, handleSubmit, reset } = useForm();

    const dispatch = useDispatch();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        reset();
    };

    const handleClickRegisterButton = () => {
        handleClickOpen();
        setIsRegister(true);
    }

    const handleClickLoginButton = () => {
        handleClickOpen();
        setIsRegister(false);
    }

    const StyledDialogContent = styled(DialogContent)`
        display: flex;
        flex-wrap: wrap;
    `

    const handleSubmitButton = async (data) => {
        const {email, password, username, avatar_url} = data;

        if (isRegister) {
            AuthService.register(email, password, username, avatar_url).then(res => {
                if (res.status === 200) {
                    handleClose();
                }
                else {
                    alert("error registering. im sorry...")
                }
            });
        }

        else {
            AuthService.login(email, password).then(res => {                
                if (res.data.auth) {
                    dispatch(login(res.data.result))
                    handleClose();
                    alert(`Logged in as ${res.data.result.username}`);
                    window.location.reload();
                }
                else {
                    alert("error logging in. im sorry...")
                }
            });
        }
    }

    const handleError = e => console.log(e);

    return (
        <div>
            <Button onClick={handleClickLoginButton}>Login</Button>
            <Button variant="contained" onClick={handleClickRegisterButton}>Register</Button>
            
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{isRegister ? "Register" : "Login"}</DialogTitle>

                <StyledDialogContent>
                    <TextField
                        label="Email Address"
                        {...register("email")}
                    />

                    <TextField
                        label="Password"
                        type="password"
                        {...register("password")}
                    />

                    {isRegister && <>
                        <TextField
                            label="Username"
                            {...register("username")}
                        />

                        <TextField
                            label="Avatar URL"
                            type="url"
                            {...register("avatar_url")}
                        />
                    </>}      
                </StyledDialogContent>

                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit(handleSubmitButton, handleError)}>Submit</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default RegisterAndLogin;