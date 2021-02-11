import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestList, setGuestList] = useState([]);

  const baseUrl = 'http://localhost:5000';

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  // get list from localhost
  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch(`${baseUrl}/`);
      const data = await response.json();
      console.log('data: ', data);
      setGuestList(data);
    };
    getGuests();
  }, []);
  console.log(guestList);

  async function handleSubmit() {
    // e.preventDefault();
    // create new guest
    const response = await fetch(`${baseUrl}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        attending: false,
      }),
    });

    const createdGuest = await response.json();

    const newGuestList = [...guestList, createdGuest];
    setGuestList(newGuestList);

    setFirstName('');
    setLastName('');
  }

  async function handleAttending(id, attending) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attending: attending ? false : true }),
    });
    const updatedGuest = await response.json();
    console.log(updatedGuest);

    const newGuestList = guestList.map(function (guest) {
      if (guest.id === updatedGuest.id) {
        guest.attending = updatedGuest.attending;
      }
      return guest;
    });

    setGuestList(newGuestList);
  }

  async function handleClickToRemove(id) {
    console.log('id: ', id);
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const removedGuest = await response.json();

    const newGuestList = guestList.filter(function (guest) {
      return guest.id !== removedGuest.id;
    });

    setGuestList(newGuestList);

    console.log(guestList);
    console.log(removedGuest);
  }

  return (
    <div>
      <h1>Hello!</h1>
      <div>
        <div>
          <h2>Guest List Manager</h2>

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
        </div>
      </div>
      <div>
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
          <tbody>
            {guestList.map((guest) => (
              <tr key={guest.id}>
                <td>{guest.firstName}</td>
                <td>{guest.lastName}</td>
                <td>
                  <input
                    type="checkbox"
                    id={guest.id}
                    onChange={() => {
                      handleAttending(guest.id, guest.attending);
                    }}
                    checked={guest.attending}
                  />
                </td>
                <td></td>
                <td>
                  <input
                    type="button"
                    id={guest.id}
                    onClick={() => handleClickToRemove(guest.id)}
                    value="Remove"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
