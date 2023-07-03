import React, {Fragment, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Create new item
const CreateItem = (id) => {

    const userId = id.id;
    const [itemName, setItemName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");


    const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
            const body = {userId, itemName, description, quantity};
            console.log(body);
            const response = await fetch("http://localhost:5000/createItem", {
                method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)
            });

            toast.success("New item created");
            // console.log(response);
            window.location = "/";
        } catch (error) {
            console.error(error.message);
        }
    };


    return ( <Fragment>
                {/* Button to Open Modal */}
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target={"#newForm"}>
                Create Item
                </button>

                {/* Modal */}
                <div class="modal"id={"newForm"}>
                    <div class="modal-dialog">
                        <div class="modal-content">

                            {/* Modal Header */}
                            <div class="modal-header">
                                <h4 class="modal-title">Create Item</h4>
                                <button type="button" class="close" data-dismiss="modal">&times;</button>
                            </div>

                            {/*  Modal body */}
                            <form class="modal-body" onSubmit = {onSubmitForm}>
                                <label for = "name">Item Name: </label><span><input id = "name" type = "text" className = "form-control" value = {itemName} onChange = {e => setItemName(e.target.value)}></input></span>
                                <label for = "quantity">Quantity: </label><span><input id = "quantity" type = "number" className = "form-control" value = {quantity} onChange = {e => setQuantity(e.target.value)}></input></span>
                                <label for = "description">Description: </label><span><input id = "description" type = "text" className = "form-control" value = {description} onChange = {e => setDescription(e.target.value)}></input></span>
                                <button className = "btn btn-success mt-3">Add</button>
                                <ToastContainer autoClose = {1000}/>
                            </form>

                            {/* Modal footer */}
                            <div class="modal-footer">
                                <button type="button" class="btn btn-warning" data-dismiss="modal">Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
    )
};

export default CreateItem;