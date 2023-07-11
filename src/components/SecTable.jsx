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
            style={{height : "400px"}}
            light = "true"
            scrollx= "true"
            hover> 

            <colgroup>
            <col className="view-info"></col>
            <col className="view-info"></col>
            <col className="expand"></col>
            <col className="expand"></col>
            <col className="expand"></col> 
            </colgroup>
            <thead >
            <tr > 
            <th className="view-info" ># </th>
            <th className = "view-info" >Action </th>
            <th className="expand">Company Name </th>
            <th className="expand"> Form Type</th>
            <th className="expand"> Filing Date</th>
            </tr>
            </thead>
            <tbody>
            {companies.map((item,index) => 
            <tr key = {index}>
                <td className="view-info"> {index+1} </td>
                { /* create next page when clicked */ }
                <td className="view-info" > <div id = {index} className = "info" onClick = {() => handlePopUp(item)} >View Info</div></td>
                
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