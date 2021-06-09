import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//삭제해야될것
import Loading from './Components/loading/loading';

ReactDOM.render(
  <React.StrictMode>
    <Loading />
  </React.StrictMode>,
  document.getElementById('root')
);
