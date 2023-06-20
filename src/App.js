import './App.css'
import axios from "axios";
import React, { useEffect, useState } from "react";

const App = () => {

  // http://localhost:3002/presons

  const [name, setName] = useState('')
  const [number, setNumber] = useState('')
  const [searchText, setSearchText] = useState('')
  const [persons, setPersons] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3002/persons")
      .then(res => setPersons(res.data))
  }, [])

  const addContact = (e) => {

    e.preventDefault()

    const newContact = {
      name: name,
      number: number
    }

    axios.post("http://localhost:3002/persons", newContact)
      .then(res => {
        setName('')
        setNumber('')
        setPersons(persons.concat(res.data))
      })
  }

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
      persons.map(person => {
        return (
          <div key={person.id} style={{ border: "2px solid khaki", margin: "10px 0" }}>
            <h2>Name: {person.name}</h2>
            <h2>Tel: {person.number}</h2>
          </div>
        )
      })}

    </div>
  );
}

export default App;
