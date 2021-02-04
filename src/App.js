import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';

const [guest, setGuest] = useState();

useEffect(() => {
  async function fetchData() {
    const response = await fetch('https://');
  }
// no clue was ich hier machen soll.

function App() {
  return <div>
    <h1>Guest List</h1>


  </div>;
}

export default App;
