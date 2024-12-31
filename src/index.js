import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
//import App from './App';
import Notes from './main/Container';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <div className="container_notes">
      <h1>Notas</h1>
      <Notes />
    </div>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
