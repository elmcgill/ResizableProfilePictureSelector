import logo from './logo.svg';
import './App.css';

import {useState, useEffect} from 'react';
import { Modal } from './Modal';

function App() {

  const [toggled, setToggled] = useState(false);

  const change = () => {
    setToggled(() => {
      return !toggled;
    })
  }

  return (
    <div className="app">
      <button className="app-btn" onClick={change}>Click me</button>
      {toggled ? <Modal toggle={change} /> : <></>}
    </div>
  );
}

export default App;
