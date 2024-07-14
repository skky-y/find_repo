import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import ApolloWrapper from './apollo/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  </React.StrictMode>,
);
