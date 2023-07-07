import React, { useState } from "react";
import "../Styles/Suggestions.css";

function Suggestions(props)
{
    let suggs = props.suggs;
  
    function handleInput(name)
    {
        props.setInput(name);
    }


 return (
    <div className="suggestions col-md-3" >
         {suggs.map((sugg,index) => 
            <a key= {index} className=" suggestion dropdown-item" onClick={() => props.setInput(sugg.companyName)}> 
             {sugg.companyName}     
            </a>
        )} 
    </div>
 );

}


export default Suggestions;