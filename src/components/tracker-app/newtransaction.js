import React, { useContext } from 'react'
import { GlobalContext } from '../../context/globelContext';
import "./mainbox.css";
import { useForm } from 'react-hook-form';


export function Addtransection() {
    const { addTransaction } = useContext(GlobalContext);


    let formData = useForm();

    function addmytranscetion(formObject) {

        formObject["id"] = Math.round(Math.random() * 1000);
        if (formObject.amount[0] == "-") {
            formObject["type"] = "expense"
        } else {
            formObject["type"] = "incom"
        }

        addTransaction(formObject);
        formData.reset();

    }


    return <div className="trHistory">

        <div id="bb" >
            <span className="heading2">Add New Transection</span>
        </div>
        <form className="myform" onSubmit={formData.handleSubmit(addmytranscetion)}>
            <h4>Description</h4>
            <input type="text" className="input" {...formData.register('description', { required: true })} />
            {formData.formState.errors.description && <div className="error">Please Input Description</div>}
            <h4>Transection Amount</h4>
            <input type="number" placeholder='Enter "-" for expense || Enter "+" for incom  ' className="input" {...formData.register('amount', { required: true })} />
            {formData.formState.errors.amount && <div className="error">Please Input amount</div>}
            <button >Add Transection</button>
        </form>

    </div>
}