import React, {Fragment, useEffect, useState} from "react";

// Get manager's specific item to view, edit, delete
const ManagerSpecificItem = ({item}) => {

    const [fullItem, updateItem] = useState([]);
    const [itemName, setItemName] = useState([]);
    const [quantity, setQuantity] = useState([]);
    const [description, setDescription] = useState([]);

    const pullSpecificItem = async () => {
        try {
            const response = await fetch(`http://localhost:5000/managerSpecificItem/${item.Id}`);
            const jsonData = await response.json();

            updateItem(jsonData);
            setItemName(jsonData["Item Name"]);
            setQuantity(jsonData.Quantity);
            setDescription(jsonData.Description);
        } catch (error) {
            console.error(error.message);
        }
    };

    const deleteItem = async (deleteId) => {
        try {
            const response = await fetch(`http://localhost:5000/deleteItem/${deleteId}`, {method: "Delete"});
            
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    };

    const saveEdits = async (updateId) => {
        try {
            const body = {itemName, quantity, description};
            const response = await fetch(`http://localhost:5000/editItem/${updateId}`, {
                method: "PUT", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    };


    useEffect(() => {
        pullSpecificItem();
    }, []);


    return  <Fragment>
                {/* Button to Open the Modal */}
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#id${fullItem.Id}`}>
                Select
                </button>

                {/* The Modal */}
                <div class="modal" id={`id${fullItem.Id}`}>
                    <div class="modal-dialog">
                        <div class="modal-content">

                            {/* Modal Header */}
                            <div class="modal-header">
                                <h4 class="modal-title">More Info/Edit</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            {/* Modal body */}
                            <div class="modal-body">
                                <label for = "name">Item Name: </label><span><input id = "name" type = "text" value = {itemName} onChange = {e => setItemName(e.target.value)}/></span>
                                <label for = "quantity">Quantity: </label><span><input id = "quantity" type = "number" value = {quantity} onChange = {e => setQuantity(e.target.value)}/></span>
                                <label for = "description">Description: </label><span><textarea rows = "5" cols = "40" id = "description" type = "text" value = {description} onChange = {e => setDescription(e.target.value)}/></span>
                            </div>

                            {/* Modal footer */}
                            <div class="modal-footer">
                                <button type="button" class="btn btn-primary" data-dismiss="modal" onClick = {() => saveEdits(fullItem.Id)}>Save</button>
                                <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-danger" data-dismiss="modal" onClick = {() => deleteItem(fullItem.Id)}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
};

export default ManagerSpecificItem;