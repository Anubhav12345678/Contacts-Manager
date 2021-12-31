import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header';
import AddContact from './AddContact';
import ContactList from './ContactList';
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route,Link, Navigate } from 'react-router-dom';
import ContactDetails from './ContactDetails';
import api from '../api/contacts';

function App() {
  const [contacts,setContacts] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [searchResults,setSearchResults] = useState([]);

  const LOCAL_STORAGE_KEY = "contacts";

  const searchHandler = (value) => {
     console.log(value);
     setSearchTerm(value);
     if(searchTerm !== "") {
       const newContactsList = contacts.filter((contact) => {
         return Object.values(contact).join(" ").toLowerCase().includes(searchTerm.toLowerCase());
       });
       setSearchResults(newContactsList);
     } else {
       setSearchResults(contacts);
     }
  }

  //RetrieveContacts
  const retrieveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const addContactHandler = async (contact) => {
    
    const request = {
      id: uuidv4(),
      ...contact
    }

    const response = await api.post("/contacts",request);

     setContacts([...contacts,response.data]);
     return <Navigate to="/" />
  }

  const deleteContactHandler = async (id) => {
     await api.delete(`/contacts/${id}`);
     const filteredList = contacts.filter((contact) => {
       return contact.id !== id;
     })

     setContacts(filteredList);
  }

  useEffect(() => {
    const getAllContacts = async () => {
       const allContacts = await retrieveContacts();
       if(allContacts) setContacts(allContacts);
    }

    getAllContacts();
  },[])

  useEffect(() => {
     localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts) );
  }, [contacts])

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <Routes>
          <Route path="/" exact element={<ContactList contacts={searchTerm.length < 1 ? contacts : searchResults} deleteContactHandler={deleteContactHandler} term={searchTerm} searchKeyword={searchHandler} />} ></Route>
          <Route path="/add" element={<AddContact addContactHandler={addContactHandler} />} ></Route>
          <Route path="/contact/:id" element={<ContactDetails contacts={contacts} />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
