import { type } from '@testing-library/user-event/dist/type';
import React, { createContext, useReducer } from 'react';
const initialState = {
    transactions: []
}
export const GlobalContext = createContext(initialState);



const AppReducer = (state, action) => {
    switch (action.type) {
        case 'DELETE_TRANSACTION':
            const othersD = state.transactions.filter((transaction) => {
                if (transaction.id !== action.payload) {
                    return transaction
                }
            })
            let previousincomD = 0;
            let previousexpenseD = 0;
            othersD.forEach((eachtransaction) => {
                if (eachtransaction.type == "incom") {
                    previousincomD += +eachtransaction.amount;
                } else if (eachtransaction.type == "expense") {

                    previousexpenseD += +eachtransaction.amount;
                }
            })

        
            if (previousincomD < Math.abs(previousexpenseD)) {
               
                alert("Transction Can Not be Deleted due to Low Balance")



            } else {

                return {
                    ...state,
                    transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
                }

            }
            return {
                ...state,

            }

        case 'UPDATE':
            const EditedELement = state.transactions.find((transaction) => {
                if (transaction.id == action.payload.id) {
                    return transaction
                }
            })
            const others = state.transactions.filter((transaction) => {
                if (transaction.id !== action.payload.id) {
                    return transaction
                }
            })

            let previousincom = 0;
            let previousexpense = 0;
            others.forEach((eachtransaction) => {
                if (eachtransaction.type == "incom") {
                    previousincom += +eachtransaction.amount;
                } else if (eachtransaction.type == "expense") {

                    previousexpense += +eachtransaction.amount;
                }
            })
            let Newexpense = Math.abs(+previousexpense) + Math.abs(+action.payload.amount)

            if (action.payload.amount < 0) {
                if (Newexpense > previousincom) {
                    alert("Low Balance")

                } else {

                    EditedELement["type"] = "expense"
                    EditedELement["description"] = action.payload.description
                    EditedELement["amount"] = action.payload.amount
                }

            } else {

                EditedELement["type"] = "incom"
                EditedELement["description"] = action.payload.description
                EditedELement["amount"] = action.payload.amount
            }



            return {
                ...state,

            }
        case 'ADD_TRANSACTION':
            if (action.payload.type == "expense") {
                let previousincom = 0;
                let previousexpense = 0;
                state.transactions.forEach((eachtransaction) => {
                    if (eachtransaction.type == "incom") {
                        previousincom += +eachtransaction.amount;
                    } else if (eachtransaction.type == "expense") {

                        previousexpense += +eachtransaction.amount;
                    }
                })
                let Newexpense = Math.abs(+previousexpense) + Math.abs(+action.payload.amount)
                if (Newexpense > previousincom) {
                    alert("Low Balance")

                } else {
                    return {
                        ...state,
                        transactions: [action.payload, ...state.transactions]
                    }
                }
            } else {

                return {
                    ...state,
                    transactions: [action.payload, ...state.transactions]
                }
            }
        default:
            return state;
    }

}

export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);



    function delTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        });
    }

    function addTransaction(transaction) {

        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }
    function updatetransaction(transaction) {

        dispatch({
            type: 'UPDATE',
            payload: transaction
        })
    }

    return (<>
        <GlobalContext.Provider value={
            {
                transactions: state.transactions,
                delTransaction,
                addTransaction,
                updatetransaction
            }
        }>
            {children}


        </GlobalContext.Provider>


    </>);

}