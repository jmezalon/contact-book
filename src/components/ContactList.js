import ContactCard from './ContactCard'

function ContactList({ setPhoneNums, url, phoneNumbers, onHandleDelete }) {

    function handleFavClick(fixedContact) {
    
        const updatedArr = phoneNumbers.map(contact => {
            if (contact.id === fixedContact.id) {
              return  fixedContact 
            } else {
              return contact
            }
        })
        setPhoneNums(updatedArr)
      }

    return(
        <div className="contact-list-container">
            {phoneNumbers.map(phoneNum => <ContactCard 
                key={phoneNum.id}
                card={phoneNum} 
                onHandleDelete={onHandleDelete} 
                onHandleFavClick={handleFavClick}
                url={url} 
            />)}   
        </div>
    )
}

export default ContactList