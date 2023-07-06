import React from "react";
import "../Styles/Suggestions.css";
function Suggestions(props)
{
    let suggs = props.suggs;
    let setInput = props.setInput;
 return (
    <div className="suggestions" >
         {suggs.map((sugg,index) => 
            <div key= {index} className="suggestion" onClick={setInput(sugg.companyName)}> 
             {sugg.companyName}     
            </div>
        )} 
    </div>
 );

}


export default Suggestions;