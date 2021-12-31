import React from 'react'
import ContactCard from './ContactCard';
import { Link } from 'react-router-dom'; // we need to add brackets because link is not a default exported component, in case of defaault exported component there is no need to add braces

const ContactList = (props) => {
    console.log(props);

    const deleteContactHandler = (id) => {
        console.log(id);
        props.deleteContactHandler(id);
    }

    const renderContactList = props.contacts.map((contact) => {
       return (
           <ContactCard contact={contact} key={contact.id} deleteContactHandler={deleteContactHandler} />
       )
    })

    return (
        <div className='main'>
            <h2>
                Contact List
            </h2>
            <Link to="/add"><button className='ui blue right'>Add Contact</button></Link>
            <div className='ui search'>
               <div className='ui icon input'>
                  <input className='prompt' placeholder='Search Contacts' type="text" value={props.term} onChange={(e) => { props.searchKeyword(e.target.value) }} />
                  <i className='search icon' />
               </div>
            </div>
            <div className='u celled list'>{renderContactList.length > 0 ? renderContactList : "No Contacts Avialable"}</div>
        </div>
    )
}

export default ContactList
