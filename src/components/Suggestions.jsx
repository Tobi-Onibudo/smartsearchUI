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
    <div className="suggestions" >
         {suggs.map((sugg,index) => 
            <div key= {index} className="suggestion" onClick={() => props.setInput(sugg.companyName)}> 
             {sugg.companyName}     
            </div>
        )} 
    </div>
 );

}


export default Suggestions;