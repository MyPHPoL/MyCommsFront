import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import ServerList from './ServerList';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export const servers = [
  {
    id: 'id-test',
    name: 'MyCommsFront',
    description: 'A React client powered by MyPHPoL',
    ownerId: 'ownerId-test'
  },
  {
    id: 'id-test2',
    name: 'server2',
    description: 'A React client powered by MyPHPoL',
    picture: 'https://cdn.7tv.app/emote/63eba1b7b482c20fd932a293/4x.png',
    ownerId: 'ownerId-test2'
  }
];

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ServerList servers={servers} ></ServerList>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
