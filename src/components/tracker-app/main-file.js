import React, { useContext }  from 'react'
import { GlobalContext } from '../../context/globelContext';
import "./mainbox.css"
import { Transection } from "./transection";
import { Addtransection } from "./newtransaction";

export function Mytracker() {
  
    const {transactions}=useContext(GlobalContext);
   
    let incom = 0;
    let expense = 0;
    let totalBalance = 0 ;
    transactions.forEach((eachtransaction)=>{
        if(eachtransaction.type == "incom"){

            incom += +eachtransaction.amount;
        }else if(eachtransaction.type == "expense"){

            expense += +eachtransaction.amount;
        }
    })
  
    totalBalance = incom + expense;
    
    return <div className="control">


        <div className="mainDiv" >
            <h3 id="NAME">
                Expense Tracker by Umair Athar
            </h3>
            <span className="heading">CURRENT BALANCE</span>
            <h2 id="balance">${totalBalance}</h2>
            <div className="amount">
                <div className="income">
                    <span>INCOME</span>
                    <h3>{incom}</h3>
                   
                </div>
                <div className="expense">
                    <span>EXPENSE</span>
                    <h3>{Math.abs(expense)}</h3>
                  
                </div>
            </div>
            <div className="history">
                <Transection  ></Transection>
            </div>
            <div className="history">
                <Addtransection   ></Addtransection>
            </div> 
        </div> 
    </div>
}