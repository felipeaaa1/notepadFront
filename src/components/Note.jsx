import React from "react";
import './Note.css';

export default function Note(props) {
    return (
        <li 
            onClick= {props.onClick}
            id = {props.id}
            className="note-item">
            {props.text || "Nota vazia"}
        </li>
    );
}
