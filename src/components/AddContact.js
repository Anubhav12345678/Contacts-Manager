import React, { useState } from 'react'

const AddContact = (props) => {
    const [state, setstate] = useState({ name: "", email: "" })

    const add = (e) => {
       e.preventDefault();
       if( state.name === "" || state.email === "") {
           alert("Enter valid values");
           return;
       }
       console.log(props.addContactHandler(state));
       setstate({ name: "", email: "" });
       console.log(state.name, state.email);
       console.log(props);
    }

    return (
        <div className='ui main'>
            <h2>Add Contact</h2>
            <form className='ui form' onSubmit={add}>
               <div className='field'>
                <label>Name</label>
                <input type="text" name="name" placeholder='Enter your name' value={state.name} onChange={(e) => setstate({ ...state, name: e.target.value })} />
               </div>
               <div className='field'>
                <label>Email</label>
                <input type="text" name="email" placeholder='Enter your email' value={state.email} onChange={(e) => setstate({ ...state, email: e.target.value })} />
               </div>
               <button className='ui button blue'>Add</button>
            </form>
        </div>
    )
}

export default AddContact
