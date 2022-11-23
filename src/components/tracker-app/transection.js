import React, { useContext } from 'react'
import { GlobalContext } from '../../context/globelContext';
import "./mainbox.css";
import { useRef } from "react";
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';




export function Transection() {
    let formData = useForm();
    const { addTransaction } = useContext(GlobalContext);

    // function Editme(e) {

    // }
    const { delTransaction } = useContext(GlobalContext);
    const { updatetransaction } = useContext(GlobalContext);

    const { transactions } = useContext(GlobalContext);

    let color = useRef();

    function addmytranscetionN(formObject) {

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
            <span className="heading2">Transaction History</span>
        </div>

        {
            transactions.map((myobject) => {

                if (myobject.type == "expense") {

                    return <div>
                        <div ref={color} className="display sss">
                        <img src='remove.png' className="crossimg" onClick={() => delTransaction(myobject.id)} />

                            {/* <img src="cross.png" onClick={() => delTransaction(myobject.id)} className="crossimg" alt="" /> */}
                            <div className="description">
                                {myobject.description}

                            </div>
                            <div className="TrsAmount">
                                -${Math.abs(myobject.amount)}
                            </div>
                            <div className='Editbutton'>
                                <button onClick={() => {
                                    // formObject["id"] = Math.round(Math.random() * 1000);
                                    // if (formObject.amount[0] == "-") {
                                    //     formObject["type"] = "expense"
                                    // } else {
                                    //     formObject["type"] = "incom"
                                    // }

                                    // addTransaction(formObject);
                                    // formData.reset();
                                    let Newdescription = prompt("Enter New Description for " + myobject.type);

                                    let Newamount = +prompt("Enter New Value for " + myobject.type);
                                  
                                    if (isNaN(Newamount))  {
                                        return alert("Please Enter Amount in Numbers")
                                    }

                                    updatetransaction({ "description": Newdescription, "amount": Newamount, "id": myobject.id, })
                                }}>Edit Me</button>
                            </div>
                        </div>
                        {/* <div className='EditmeC'>
                            <form id="myform" onSubmit={formData.handleSubmit(addmytranscetionN)}>
                                <input type="text" className="input" {...formData.register('description', { required: true })} />
                                {formData.formState.errors.description && <div className="error">Please Input Description</div>}
                                <input type="number" placeholder='Enter "-" for expense || Enter "+" for incom  ' className="input" {...formData.register('amount', { required: true })} />
                                {formData.formState.errors.amount && <div className="error">Please Input amount</div>}
                                <button >Save</button>
                            </form>
                        </div> */}
                    </div>
                } else if (myobject.type == "incom") {
                    return <div>

                        <div ref={color} className="display yyy">
                          
                            <img src='remove.png' className="crossimg" onClick={() => delTransaction(myobject.id)} />
                            {/* <img src="cross.png"   alt="" /> */}
                            <div className="description">
                                {myobject.description}

                            </div>
                            <div className="TrsAmount">
                                +${myobject.amount}
                            </div>
                            <div className='Editbutton'>
                                <button onClick={() => {

                                    let Newdescription = prompt("Enter New Description for " + myobject.type);
                                    let Newamount = +prompt("Enter New Value for " + myobject.type);
                                  if(Newdescription == "" || Newamount == "" ){
                                    return alert("Please Enter Fields")
                                  }
                                  
                                    if (isNaN(Newamount)) {
                                        return alert("Please Enter Amount in Numbers")
                                    }

                                    updatetransaction({ "description": Newdescription, "amount": Newamount, "id": myobject.id, })
                                  

                                }}>Edit Me</button>
                            </div>
                        </div>
                        {/* <div className='EditmeC'>
                            <form className="myform Edit" onSubmit={formData.handleSubmit(addmytranscetionN)}>
                                <input type="text" className="input" {...formData.register('description', { required: true })} />
                                {formData.formState.errors.description && <div className="error">Please Input Description</div>}
                                <input type="number" placeholder='Enter "-" for expense || Enter "+" for incom  ' className="input" {...formData.register('amount', { required: true })} />
                                {formData.formState.errors.amount && <div className="error">Please Input amount</div>}
                                <button >Save</button>
                            </form>
                        </div> */}
                    </div>
                }
            })
        }
        {transactions.history != null || <div className='btndiv' > <Link className='reportButton' to={"/pdfcomponent"}>Print Report</Link> </div>}


    </div>

}