import React, {useState} from "react";
import {Table } from 'reactstrap';
import "../Styles/SecTable.css";
import PopUp from "./PopUp.jsx";


function SecTable(props)
{
    const companies = props.companies;
    const [showPopUp, setPopUp] = useState(false);
    
    function handlePopUp()
    {
        setPopUp(!showPopUp);
    }

        return(
            <div cl="table-conatiner">
            <Table
            id="infoTable"
            className = ".thead-light"
            light = "true"
            hover> 
            
            <thead id="heading">
            <tr id="heading"> 
            <th># </th>
            <th>Action</th>
            <th>Company Name </th>
            <th> Form Type</th>
            <th> Filing Date</th>
            </tr>
            </thead>
            <tbody>
            {companies.map((item,index) => 
            <tr key = {index}>
                <td> {index+1} </td>
                { /* create next page when clicked */ }
                <td> <div  className = "info" onClick = {handlePopUp} >View Info</div></td>
                {showPopUp ? <PopUp company = {item}/> : null}
                <td> {item.companyName} </td>
                <td> {item.formType}</td>
                <td> {item.filingDate} </td>
            </tr>
            
            )}
            </tbody>
            </Table>
            </div>
        );
    }



export default SecTable;