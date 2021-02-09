import React from 'react';
import { useEffect, useState } from 'react';

export default function GuestManager() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attending, setAttending] = useState('false');
  const [guestList, setGuestList] = useState([]);
  const [guestID, setGuestID] = useState('0');

  const guest = {
    id: '0',
    firstName: '',
    lastName: '',
    attending: 'false',
  };

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  function handleGuestID() {
    const lastID = guestList.slice(-1)[0].guestID;
    const nextID = lastID + 1;
    setGuestID(nextID);
  }

  function handleSubmit(event) {
    event.preventDefault();

    async function createGuest() {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: guestID,
          firstName: firstName,
          lastName: lastName,
          attending: attending,
        }),
      });
      const createdGuest = await response.json();
    }
    createGuest();
  }

  return (
    <div>
      <h2>Guest List Manager</h2>
      <form onSubmit={handleSubmit}>
        <div>
          First name
          <br />
          <input
            type="text"
            name="firstName"
            value={firstName}
            onChange={handleFirstName}
          />
        </div>
        <div>
          Last name
          <br />
          <input
            type="text"
            name="lastName"
            value={lastName}
            onChange={handleLastName}
          />
        </div>
        <div>
          <input type="submit" value="Create guest" onClick={handleSubmit} />
        </div>
      </form>
    </div>
  );
}
