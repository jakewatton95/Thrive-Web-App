import React from 'react'

const ContactCard = (props) => {
    return(
        <div className = "contact-card">
            <h3>Name: {props.contact.name}</h3>
            <p>Phone: {props.contact.phone} </p>
            <p>Email: {props.contact.email}</p>
        </div>
    )
    
}

export default ContactCard