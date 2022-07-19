import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { UserProvider } from './context/UserContext';
import { DataProvider } from './context/DataContext';


ReactDOM.render(
  <React.StrictMode>
    <UserProvider>
      <DataProvider>
        
          <App />
       
      </DataProvider>

    </UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

