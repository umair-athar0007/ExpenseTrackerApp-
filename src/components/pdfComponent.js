import React from "react";
import "./pdf.css"
import { GlobalContext } from "../context/globelContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { Page, Text, Document, StyleSheet, View } from "@react-pdf/renderer";
import { Fragment } from "react";
import { PDFViewer } from '@react-pdf/renderer';
import { PDFDownloadLink } from '@react-pdf/renderer';




// zakballard


const styles = StyleSheet.create({
   
    pageNumber: {
        position: "absolute",
      
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
        margin: "25px",
        fontSize: 34,
        fontFamily: "sans-serif",
        minWidth: "400px",

    },
    page: {
        fontSize: 11,
        flexDirection: "column",
    },
    tableContainer: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderBottom: "1px solid #dddddd",
    },

    headdd: {
        width: "60%",
        padding: "12px",
        backgroundColor: "#009879",

        color: "#ffffff",
    },
    description: {
        width: "60%",
        padding: "12px",
        color: "black",
    },
    description2: {
        width: "60%",
        padding: "12px",
        color: "black",
        backgroundColor: "#f3f3f3",
    },
    total: {
        flexDirection: "row",
        alignItems: "center",
    },
    totalinm: {
        width: "80%",
        padding: "12px",
        fontSize: "15px",
        color: "red"
    },
    xyz: {
        width: "40%",
    },
    pdf: {
        width: "80%",
        height: "600px",
        margin:"auto",
        textAlign: "center"
    },
    Namehead: {
        width: "100%",
        textAlign: "center",
        fontSize: "20px",
        color: "#de1708",
        borderBottom: "2px solid black",
    },
});

// name heading row
const Namehead = () => (
    <View style={styles.row}>
        <Text style={styles.Namehead} >Expense Tracker App By  UMAIR ATHAR</Text>
    </View>
);

// table heading row
const TableHeader = () => (

    <View style={styles.row} >
        <Text style={styles.headdd}>Id</Text>
        <Text style={styles.headdd}>Amount</Text>
        <Text style={styles.headdd}>Description</Text>
        <Text style={styles.headdd}>Type</Text>

    </View>
);


// table inner row data
const TableRow = ({ transactions }) => {
    
    const rows = transactions.map((objecthistory) => (
        <View style={styles.row}  >
            <Text style={styles.description}>{objecthistory.id}</Text>
            <Text style={styles.description2}>{objecthistory.amount}</Text>
            <Text style={styles.description}>{objecthistory.description}</Text>
            <Text style={styles.description2}>{objecthistory.type}</Text>

        </View>
    ));
    return <Fragment>{rows}</Fragment>;
};

// table footer
const TableFooter = ({ transactions }) => {

    let incom = 0;
    let expense = 0;
    let totalBalance = 0;
    transactions.forEach((eachtransaction) => {

        if (eachtransaction.type === "incom") {

            incom += +eachtransaction.amount;
        } else if (eachtransaction.type === "expense") {

            expense += +eachtransaction.amount;
        }
    })
    totalBalance = incom + expense;

    return (
        <View style={styles.total} >
            <Text style={styles.totalinm}>{"Total Incom is " + incom}</Text>
            <Text style={styles.totalinm}>{"Total Expense is " + expense}</Text>
            <Text style={styles.totalinm}>{"Total Balance is " + totalBalance}</Text>
        </View>
    )



};

// all componet combined
const ItemsTable = ({ transactions }) => (
    <View style={styles.tableContainer} >
        <Namehead />
        <TableHeader />
        <TableRow transactions={transactions} />
        <TableFooter transactions={transactions} />
    </View>
);

// and finially integrate to pdf-viewer document format
const Table = ({ transactions }) => (
    <Document  >
        <Page size="LETTER" style={styles.page}>

            <ItemsTable transactions={transactions} />

        </Page>
    </Document>
);


// button to home page
export const Tbheader = () => {
    return <div className="main" >

        <li className="nav-item ">

            <Link className="homebtn" to={"/"} >Home</Link>

        </li>

    </div>
}

// pdf component return to app
function Allcompoent({ transactions }) {

    return <>

        <Table transactions={transactions} />
    </>
}

export function PdfComponent() {

    const { transactions } = useContext(GlobalContext);

    return <>

        <Tbheader />
        <br />
        <PDFDownloadLink document={<Allcompoent transactions={transactions} />} fileName="INCOMREPORT"   >
            {({ loading }) => (loading ? <button className='loadingBtn'> loading Document...</button> : <button className='loadingBtn'>Download</button>)}

        </PDFDownloadLink>

        <br />
        <br />
        <Fragment>
            <PDFViewer style={styles.pdf} >
                <Allcompoent transactions={transactions} />
            </PDFViewer>
        </Fragment>


    </>


}
