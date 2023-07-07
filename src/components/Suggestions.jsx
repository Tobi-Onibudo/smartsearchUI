import React, { useState } from "react";
import "../Styles/Suggestions.css";

function Suggestions(props)
{
    let suggs = props.suggs;
  
  


 return (
    <div className="suggestions " >
         {suggs.map((sugg,index) => 
            <a key= {index} className=" suggestion dropdown-item" onClick={() =>   props.setInput(sugg.companyName)}> 
             {sugg.companyName}     
            </a>
        )} 
    </div>
 );

}


export default Suggestions;