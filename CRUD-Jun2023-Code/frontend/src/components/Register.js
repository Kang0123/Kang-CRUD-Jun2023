import React, { Fragment, useState } from 'react';
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Register as a new inventory manager
const Register = ({setAuth}) => {

    const [inputs, setInputs] = useState ({
        firstName: "", lastName: "", username: "", password: ""
    });

    const {firstName, lastName, username, password} = inputs;

    const onChange = (e) => {
        setInputs({...inputs, [e.target.name] : e.target.value});
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {

            const body = {firstName, lastName, username, password};
            const response = await fetch("http://localhost:5000/auth/register", {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)});

            const parseResponse = await response.json();

            localStorage.setItem("token", parseResponse.token);

            setAuth(true);
        } catch (error) {
            toast.error("Username already exists or not all fields were filled out");
            console.error(error.message);
        }
    };


    return (
        <Fragment>
            <h1 className = "text-center my-2">Register</h1>
            <form onSubmit = {onSubmitForm}>
                <label for = "firstName">First Name: </label><input id = "firstName" type = "firstName" name = "firstName" className = "form-control my-1" value = {firstName} onChange = {e => onChange(e)}/>
                <label for = "lastName">Last Name: </label><input id = "lastName" type = "lastName" name = "lastName" className = "form-control my-1" value = {lastName} onChange = {e => onChange(e)}/>
                <label for = "username">Username: </label><input id = "username" type = "username" name = "username" className = "form-control my-1" value = {username} onChange = {e => onChange(e)}/>
                <label for = "password">Password: </label><input id = "password" type = "password" name = "password" className = "form-control my-3" value = {password} onChange = {e => onChange(e)}/>
                <button className = "btn btn-success btn-block form-control my-2">Submit</button>
                <ToastContainer autoClose = {1000}/>
            </form>
            <Link to = "/login">Back to Login</Link>
        </Fragment>
    );
};

export default Register;