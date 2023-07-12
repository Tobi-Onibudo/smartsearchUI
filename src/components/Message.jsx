import React from "react";
import '../Styles/Message.css'

export default function  Message(props)
{
    return <div className="error">
       {props.text}
    </div>
}