import {Table } from 'reactstrap';
import "../Styles/SecTable.css";
import { render } from '@testing-library/react';

function SecTable(props)
{
    const companies = props.companies;

    
        return(
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
                <td> <a href ={"https://localhost:7061/api/SmartSearch/Search/"+item.sec}>View Info</a></td>
                <td> {item.companyName} </td>
                <td> {item.formType}</td>
                <td> {item.filingDate} </td>
            </tr>
            
            )}
            </tbody>
            </Table>
        );
    }



export default SecTable;