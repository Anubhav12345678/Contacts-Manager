import React from "react";
import user from "../images/avatar.png";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; 

const ContactDetails = (props) => {
  const { id } = useParams();
  const contact = props.contacts.filter((contact) => {
      return contact.id === id;
  })
  const { name,email } = contact[0];
  return (
    <div className="main">
      <div className="ui card centered">
        <div className="image">
          <img src={user} alt="user" />
        </div>
        <div className="content" style={{ textAlign: "center" }}>
          <div className="header">{name}</div>
          <div className="description">{email}</div>
        </div>
      </div>
      <div className="center-div" style={{ textAlign: "center" }}>
        <Link to="/">
          <button className="ui button blue center">
            Back to Contact List
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetails;
