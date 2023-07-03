import React, { Fragment, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Login as an inventory manager
const Login = ({setAuth}) => {

    const [inputs, setInputs] = useState ({
        username: "", password: ""
    });

    const {username, password} = inputs;

    const onChange = e => {
        setInputs ({...inputs, [e.target.name]: e.target.value})
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {

            const body = {username, password};
            const response = await fetch("http://localhost:5000/auth/login", { method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)});

            const parseResponse = await response.json();

            if (parseResponse.token) {
                localStorage.setItem("token", parseResponse.token);
                setAuth(true);
            } else {
                setAuth(false);
                toast.error(parseResponse);
            }
        } catch (error) {
            toast.error("Incorrect username and password");
            console.error(error.message);
        }
    };


    return (
        <Fragment>
            <h1 className = "text-center my-2">Login</h1>
            <form onSubmit = {onSubmitForm}>
                <label for = "username">Username: </label><input id = "username" type = "username" name = "username" className = "form-control my-1" value = {username} onChange = {e => onChange(e)}/>
                <label for = "password">Password: </label><input id = "password"  type = "password" name = "password" className = "form-control my-4" value = {password} onChange = {e => onChange(e)}/>
                <button className = "btn btn-success btn-block form-control my-2">Submit</button>
                <ToastContainer autoClose = {1000}/>
            </form>
            <a href = "/register">Register as New Manager</a>
            <a href = "/allItems">Continue as Guest</a>
        </Fragment>
    );
};

export default Login;