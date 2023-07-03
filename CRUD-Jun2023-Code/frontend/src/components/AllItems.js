import React, {Fragment, useEffect, useState} from "react";
import GuestSpecificItem from "./GuestSpecificItem";

// Retrieve all items
const AllItems = () => {

    const [items, setItems] = useState([]);

    const allItems = async () => {
        try {
            const response = await fetch("http://localhost:5000/allItems");
            const jsonData = await response.json();

            setItems(jsonData);

        } catch (error) {
            console.error(error.message);
        }
    }

    useEffect(() => {
        allItems();
    }, []);

    
    return <Fragment>
                <a href = "/dashboard"> Dashboard </a>

                <h1 className = "text-center mt-5">All Items</h1>

                <table class="table table-hover text-center mt-5">
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
                            <td><GuestSpecificItem item = {item} /></td>
                            <td>{item["Item Name"]}</td>
                            <td>{item.Quantity}</td>
                            <td>{item.Description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </Fragment>
};

export default AllItems;