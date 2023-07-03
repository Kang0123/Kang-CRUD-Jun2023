import React, {Fragment, useEffect, useState} from "react";

import ManagerSpecificItem from "./ManagerSpecificItem";

// Logged in inventory manager's personal items
const ManagerMyItems = ({setAuth}) => {

    const [items, setItems] = useState([]);

    const managerAllItems = async () => {
        try {

            const response = await fetch(`http://localhost:5000/managerMyItems`, {method: "GET", headers: {token: localStorage.token}});

            const jsonData = await response.json();

            setItems(jsonData);
        } catch (error) {
            console.error(error.message);
        }
    }


    useEffect(() => {
        managerAllItems();
    }, []);


    return <Fragment>
                <h2 className = "text-center mt-5">My Items</h2>

                <table class="table table-hover text-center mt-3">
                    <thead>
                        <tr>
                            <th>More Info</th>
                            <th>Item Name</th>
                            <th>Quantity</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {items.map(item =>  (
                            <tr key = {item.Id}>
                                <td><ManagerSpecificItem item = {item} /></td>
                                <td>{item["Item Name"]}</td>
                                <td>{item.Quantity}</td>
                                <td>{item.Description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Fragment>
};

export default ManagerMyItems;