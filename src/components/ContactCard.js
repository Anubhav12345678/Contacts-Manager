import React from 'react'
import user from '../images/avatar.png'
import { Link } from 'react-router-dom';

const ContactCard = (props) => {
    const {id, name, email} = props.contact;
    return (
        <div className='item' style={{ display: "flex" }}>
              <img className='ui avatar image' src={user} alt='user' />
              <div className='content'>
                <Link to={{ pathname: `/contact/${id}`, query: props.contact }}>
                    <div className='header'>{name}</div>
                    <div>{email}</div>
                </Link>
              </div>
              <i onClick={() => props.deleteContactHandler(id)} className='trash alternate outline icon' style={{
                  color: "red",
                  marginLeft: "auto",
                  marginTop: "auto",
                  marginBottom: "auto",
                  fontSize: "20px",
                  cursor: "pointer"
              }}></i>
        </div>
    )
}

export default ContactCard
