import React, {useState} from "react";
import {Table } from 'reactstrap';
import "../Styles/SecTable.css";
import PopUp from "./PopUp.jsx";


function SecTable(props)
{
    const companies = props.companies;
    const [showPopUp, setPopUp] = useState(false);
    const [data,setData] = useState({});
    
    function handlePopUp(item)
    {
        setPopUp(!showPopUp);
        setData(item);
    }
    
    function closePopUp(state)
    {
        setPopUp(state);
    }

        return(
        
            companies.length != 0 ?  <div className="table-conatiner">
            <Table
            className = " infoTable fixed-header thead-light"
            style={{height : "200px"}}
            light = "true"
            scrollx= "true"
            hover> 
            <thead >
            <tr > 
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
                <td> <div  id = {index} className = "info" onClick = {() => handlePopUp(item)} >View Info</div></td>
                
                <td> {item.companyName} </td>
                <td> {item.formType}</td>
                <td> {item.filingDate} </td>


            </tr>
            
            )}
            </tbody>
            </Table>

            {showPopUp ? <PopUp company = {data} closePopUp= {closePopUp}/> : null}
            </div> : null
        );
    }



export default SecTable;