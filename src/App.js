import './App.css';
import React from 'react';
import { useEffect, useState } from 'react';
const axios = require('axios').default;

function App() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [guestStatus, setGuestStatus] = useState('not attending');
  const [{ guest }, setGuest] = useState('');
  const [[guestList], setGuestList] = useState('');

  function handleFirstName(event) {
    setFirstName(event.target.value);
  }

  function handleLastName(event) {
    setLastName(event.target.value);
  }

  // axios goes to localhost 5000 and gets what is in there and setState puts that data into guests array
  function getGuests() {
    axios
      .get('http://localhost:5000/')
      .then((response) => setGuestList({ guest: response.data }))
      .catch((errorResponse) => console.log(errorResponse));
  }

  // calls the backend ('localhost') to create a new guest using the first- and last name that have just been entered
  // after that, sets the state back to empty fields to signal the user that they can enter new data
  function handleSubmit(event) {
    event.preventDefault();

    axios
      .post('http://localhost:5000/', {
        firstName: setFirstName,
        lastName: setLastName,
      })
      .then(() => setGuest({ firstName: '', lastName: '' }))
      .catch((errorResponse) => console.log(errorResponse));
  }

  // called after first render; can be used to set up the component,
  // e.g., by reading data from an API - which we do with this.getGuests()
  // BUT here isn't render() so where does this belong to?
  function componentDidMount() {
    this.getGuests();
  }
  // axios sends changed status of attending to localhost 5000, id targeted at the end so that it knows which object to update
  function handleAttending(event) {
    const { id, checked } = event.target;

    axios
      .patch(`http://localhost:5000/${id}`, {
        attending: checked,
      })
      .then(() => this.getGuests());
  }

  // axios tells localhost 5000 to delete id-targeted guest
  // when done, read the updated list of guests from the server
  function handleClick(event) {
    const { id } = event.target;

    axios.delete(`http://localhost:5000/${id}`).then(() => getGuests());
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
        <input type="submit" value="Add guest" onClick={handleSubmit} />
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
          {/* <tbody>{guestList.map({ guest })}</tbody> ok this doesn't work*/}
        </table>
      </div>
    </div>
  );
}

export default App;
