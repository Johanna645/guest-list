import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';

const baseUrl = 'http://localhost:5000';

const response = await fetch(`${baseUrl}/`);
const allGuests = await response.json(); // aus gitHub documentation "to get all guests"

const response = await fetch(`${baseUrl}/`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ firstName: 'Karl', lastName: 'Horky' }),
});
const createdGuest = await response.json(); // aus gitHub documentation "creating a new guest"

const response = await fetch(`${baseUrl}/1`, {
  method: 'PATCH',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ attending: true }),
});
const updatedGuest = await response.json(); // aus gitHub documentation "updating a guest"

const response = await fetch(`${baseUrl}/1`, { method: 'DELETE' });
const deletedGuest = await response.json(); // aus gitHub documentation "deleting a guest"

useEffect(() => {
  async function fetchData() {
    const response = await fetch('http://localhost:5000');
    const data = await response.json();
    console.log(data);
    createGuest(data);
  }

  fetchData();
  // }, []); KEINE AHNUNG!!!! Muss ich mehrmals useEffect machen, oder wozu sind da so viele ähnliche zeilen auf die dokumentation?!

  function App() {
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [guestStatus, setGuestStatus] = useState('not attending');

    let guest = { firstName, lastName, guestStatus };
    let guestList = []; // aber die liste sollte ja durch localhost 5000 kommen, muss ich da noch was createn oder wohin speichere ich die guests?

    function handleFirstName(event) {
      setFirstName(event.target.value);
    }

    function handleLastName(event) {
      setLastName(event.target.value);
    }

    function handleGuestStatus(event) {
      setGuestStatus(event.target.value);
      // hier musste ich es aus 'not attending' zum 'attending' austauschen oder ist status doch am anfang false und hier dann wird es true gewechselt?! wie geht es mit einem checkbox
    }

    function createGuest() {
      guest = ({ firstName }, { lastName }, { guestStatus });
      // hier den object erstellen und auf die array hinzufügen, status automatisch 'not attending' (oder 'false'?) aber wie gehe ich rum mit der liste aus localhost 5000?!
      guestList.push(guest);
    }
    function deleteGuest(guest) {
      const index = guestList.findIndex();
      let deleted = guestList.splice(index, 1);
    }
    // hier die array durchlaufen und nach passenden namen suchen, und wenn gefunden, entfernen; ist findIndex das richtige und wie gebe ich die object da rein

    return (
      <div>
        <h1>Guest List</h1>
        <div>
          <p>First Name</p>
          <input type="text" value={firstName} onChange={handleFirstName} />
          <p>Last Name</p>
          <input type="text" value={lastName} onChange={handleLastName} />
          <button onClick={createGuest}>Add to guest list</button>

          <button value={guestStatus} onChange={handleGuestStatus}>
            Attending
          </button>
          {/* oder sollte es ein checkbox sein und onClick den status ändern?! */}
          <button onClick={deleteGuest}>Delete guest</button>
        </div>
      </div>
    );
  }

  export default App;
});
