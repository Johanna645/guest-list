import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
import trashcan from './picture/trashcan.jpg';

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

      setGuestList(data);
    };
    getGuests();
  }, []);

  async function handleSubmit() {
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

    const newGuestList = guestList.map(function (guest) {
      if (guest.id === updatedGuest.id) {
        guest.attending = updatedGuest.attending;
      }
      return guest;
    });

    setGuestList(newGuestList);
  }

  async function handleClickToRemove(id) {
    const response = await fetch(`${baseUrl}/${id}`, {
      method: 'DELETE',
    });
    const removedGuest = await response.json();

    const newGuestList = guestList.filter(function (guest) {
      return guest.id !== removedGuest.id;
    });

    setGuestList(newGuestList);
  }

  return (
    <div>
      <header className="App-header">
        <h2>
          The first rule of <strong>Fight Club</strong> is:
          <br />
          You do not talk about <strong>Fight Club</strong>.
          <br />
          The second rule of <strong>Fight Club</strong> is:
          <br />
          You do not talk about <strong>Fight Club</strong>.
        </h2>
      </header>

      <div>
        <section className="App-column">
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
              <br />
              <button type="submit" value="Add guest" onClick={handleSubmit}>
                Add guest
              </button>
            </div>
          </div>

          <div>
            <h1>Guest List</h1>
            <table className="App-table">
              <thead>
                <tr>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Attending</th>
                  <th>Trash guest</th>
                </tr>
              </thead>
              <tbody>
                {guestList.map((guest) => (
                  <tr key={guest.id}>
                    <td>{guest.firstName}</td>
                    <td>{guest.lastName}</td>
                    <td>
                      <button
                        type="checkbox"
                        id={guest.id}
                        onChange={() => {
                          handleAttending(guest.id, guest.attending);
                        }}
                        checked={guest.attending}
                      />
                    </td>

                    <td>
                      <button
                        type="image"
                        name="input-image"
                        src={trashcan}
                        alt="trashcan"
                        width="30"
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
        </section>
      </div>
    </div>
  );
}

export default App;
