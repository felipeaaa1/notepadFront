import React from "react";
import './Text.css';

export default props =>
    <textarea 
        id={props.id}
        name={props.name || "default"} 
        cols={props.cols || "30"} 
        rows={props.rows || "10"} 
        onChange={props.onChange} 
        value={props.value} 
    ></textarea>;
