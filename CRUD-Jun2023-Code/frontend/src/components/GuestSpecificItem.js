import React, {Fragment, useEffect, useState} from "react";

// View specific item that's not your's
const GuestSpecificItem = ({item}) => {

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


    useEffect(() => {
        pullSpecificItem();
    }, []);


    return <Fragment>
        {/* Button to Open Modal */}
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target={`#id${fullItem.Id}`}>
        Select
        </button>

        {/* Modal */}
        <div class="modal" id={`id${fullItem.Id}`}>
            <div class="modal-dialog">
                <div class="modal-content">

                    {/* Modal Header */}
                    <div class="modal-header">
                        <h4 class="modal-title">More Info</h4>
                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                    </div>

                    {/* Modal body */}
                    <div class="modal-body">
                        <label for = "name">Item Name: </label><span><input id = "name" type = "text" value = {itemName} disabled/></span>
                        <label for = "quantity">Quantity: </label><span><input id = "quantity" type = "number" value = {quantity} disabled/></span>
                        <label for = "description">Description: </label><span><textarea rows = "5" cols = "40" id = "description" type = "text" value = {description} disabled/></span>
                    </div>

                    {/* Modal footer */}
                    <div class="modal-footer">
                        <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
};

export default GuestSpecificItem;