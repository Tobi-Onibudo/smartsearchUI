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
        
            companies.length != 0 ?  <div className="table-container">
            <Table
            className = " infoTable fixed-header thead-light"
            style={{height : "400px"}}
            light = "true"
            scrollx= "true"
            hover> 

            <colgroup>
            <col className="numId"></col>
            <col className="view-info"></col>
            <col className="expand"></col>
            <col className="form-type"></col>
            <col className="filing-date"></col> 
            </colgroup>
            <thead >
            <tr > 
            <th className="numId" ># </th>
            <th className = "view-info" >Action </th>
            <th className="expand">Company Name </th>
            <th className="form-type"> Form Type</th>
            <th className="filing-date"> Filing Date</th>
            </tr>
            </thead>
            <tbody>
            {companies.map((item,index) => 
            <tr key = {index}>
                <td className="numId"> {index+1} </td>
                { /* create next page when clicked */ }
                <td className="view-info" > <div id = {index} className = "info" onClick = {() => handlePopUp(item)} >View Info</div></td>
                
                <td className="expand"> {item.companyName} </td>
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