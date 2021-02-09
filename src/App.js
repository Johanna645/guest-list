import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [attending, setAttending] = useState('false');
  const [guestList, setGuestList] = useState([]);
  const [guestID, setGuestID] = useState('0');

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  // get list from localhost
  useEffect(() => {
    const getGuests = async () => {
      const response = await fetch('http://localhost:5000');
      const data = await response.json();
      setGuestList(data);
    };
    getGuests();
  }, []);
  console.log(guestList);

  function handleSubmit() {
    // e.preventDefault();

    // create new guest
    async function createGuest() {
      const response = await fetch('http://localhost:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName: firstName,
          lastName: lastName,
        }),
      });

      const createdGuest = await response.json();
    }

    createGuest();
    console.log(createGuest);
  }

  // function addCreatedGuest() {}
  function editGuest() {
    const lastID = guestList.slice(-1)[0].guestID;
    const nextID = lastID + 1;
    setGuestID(nextID);

    const newGuest = {
      id: { guestID },
      firstName: { firstName },
      lastName: { lastName },
      attending: { attending },
    };

    const newGuestList = [...guestList, newGuest];
    setGuestList(newGuestList);
  }
  // componentDidMount = getGuests;

  /* function handleAttending(event) {
      function updateGuestStatus() {
        async function update() {
          const response = await fetch(`http://localhost:5000'${guestID}`, {
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
    } */

  function handleClickToRemove() {
    async function removeGuest() {
      const response = await fetch(`http://localhost:5000/${guestID}`, {
        method: 'DELETE',
      });
      const removedGuest = await response.json();
      console.log(removedGuest);
    }
    removeGuest();
  }

  return (
    <div>
      <h1>Hello!</h1>
      <div>
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
              <input
                type="submit"
                value="Create guest"
                onClick={handleSubmit()}
              />
            </div>
          </form>
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
            {guestList.map((item) => (
              <tr key={item.guestID}>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>
                  <input
                    type="checkbox"
                    id={guestID}
                    onChange={(event) => {
                      setAttending(event.currentTarget.checked);
                    }}
                    checked={attending}
                  />
                </td>
                <td>{`${item.attending}`}</td>
                <td>
                  <input
                    type="button"
                    id={guestID}
                    onClick={handleClickToRemove}
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
