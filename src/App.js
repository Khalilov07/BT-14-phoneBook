import React, { useEffect, useState } from "react";
import './App.css'
import axios from "axios";
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';


const App = () => {

  // http://localhost:3002/presons

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [open, setOpen] = useState(false);

  const [searchText, setSearchText] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3002/persons")
      .then(res => setPersons(res.data))
  }, [])

  const checkName = () => {
    persons.some(person => person.name.toLowerCase() === name.toLowerCase())
    // true / false
  }

  const addContact = (e) => {

    e.preventDefault()

    if(checkName) {
      return alert("Такой контакт уже есть")
    }

    const newContact = {
      name: name,
      number: number
    }

    axios.post("http://localhost:3002/persons", newContact)
      .then(res => {
        setName('')
        setNumber('')
        setOpen(true)
        setPersons(persons.concat(res.data))
      })
  }

  // при добавление контакта должно выходить сообщение о том что контакт добавлен

  const filteredPersons = persons.filter(person => {
    return person.name.toLowerCase().includes(searchText.toLowerCase())

    // person.name - Это все имена в базе
    // name - Akram
    // если метод filter вернет false, то он не добавит не чего в переменную filteredPersons
  })

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // concat() - это метод массива который не работает с оригиналом, а работает с копией

  // persons - это состояние, setPersons - это функция которая изменяет наше состояние

  return (
    <div className="App">
      <h2>Контактная книга</h2>
      <form onSubmit={addContact}>

        <div>

          <input
            type="text"
            value={name}
            placeholder="Enter name..."
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="phone"
            value={number}
            placeholder="Enter phone-number..."
            onChange={(e) => setNumber(e.target.value)}
          />

          <input
            type="text"
            placeholder='Search...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

        </div>

        <div>
          <button type="submit">Add contact</button>
        </div>

      </form>

      {
        filteredPersons.map(person => {
          return (
            <div key={person.id} style={{ border: "2px solid khaki", margin: "10px 0" }}>
              <h2>Name: {person.name}</h2>
              <h2>Tel: {person.number}</h2>
            </div>
          )
        })}

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Контакт добавлен"
        action={action}
      />

    </div>
  );
}

export default App;
