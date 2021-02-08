import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
// const axios = require('axios').default;

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attending, setAttending] = useState('false');
  const [guestList, setGuestList] = useState([]);
  const [guestID, setGuestID] = useState('0'); // or is this stupid now, how can i add the id to the guest otherwise

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  function handleGuestID() {
    const lastID = guestList.slice(-1)[0].guestID;
    const nextID = lastID + 1;
    setGuestID = nextID;
  }

  // to get all guests
  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch('http://localhost:5000');
      const allGuests = await response.json();
      setGuestList(allGuests);
    };
    getGuests();
  }, []);

  function handleSubmitGuest(event) {
    event.preventDefault();
  }

  function createGuest() {
    async function create() {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: guestID,
          firstName: firstName,
          lastName: lastName,
        }),
      });
      const createdGuest = await response.json();
    }
    create();
  }

  function updateGuest() {
    async function update() {
      const response = await fetch('http://localhost:5000', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ attending: true }),
      });
      const updatedGuest = await response.json();
    }
    update();
  }

  function removeGuest() {
    async function remove() {
      const response = await fetch(`http://localhost:5000/${guestID}`, {
        method: 'DELETE',
      });
      const removedGuest = await response.json();
    }
    remove();
  }

  return (
    <div>
      <h1>Guest List Manager</h1>
      <div>
        <p>First Name</p>
        <input type="text" value={firstName} onChange={handleFirstName} />
        <p>Last Name</p>
        <input type="text" value={lastName} onChange={handleLastName} />
        <br />
        <input type="submit" value="Add guest" onClick={handleSubmitGuest} />
        <br />
        <h1>Guest List</h1>
        <table>
          <thead>
            <tr>
              <th>First name</th>
              <th>Last name</th>
              <th>Attending</th>
              <th>Remove guest</th>
            </tr>
          </thead>
          <tbody>guestList comes here but how</tbody>
        </table>
      </div>
    </div>
  );
}
export default App;
