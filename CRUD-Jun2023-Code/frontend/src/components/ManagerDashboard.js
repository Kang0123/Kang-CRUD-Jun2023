import React, { Fragment, useState, useEffect } from 'react';

import CreateItem from "./CreateItem";
import ManagerMyItems from "./ManagerMyItems";

// Main dashboard as logged in inventory manager
const Dashboard = ({setAuth}) => {

    const [name, setName] = useState("");
    const [id, setId] = useState("");

    async function getUsername() {
        try {

            const response = await fetch("http://localhost:5000/dashboard", {method: "GET", headers: {token: localStorage.token}});

            const parseResponse = await response.json();

            setName(parseResponse[0].Username);
            setId(parseResponse[0].Id);
        } catch (error) {
            console.error(error.message);
        }
    };


    useEffect(() => {
        getUsername();
    }, []);


    const logout = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    };


    return (
        <Fragment>
            <h1 className = "text-center my-3"> {name}'s Main Dashboard </h1>
            <button className = "btn btn-primary" onClick = {e => logout(e)}>Log Out</button>
            <td><CreateItem id = {id} /></td>
            <a href = "/allItems"> All Items </a>

            <ManagerMyItems />
        </Fragment>
    );
};

export default Dashboard;