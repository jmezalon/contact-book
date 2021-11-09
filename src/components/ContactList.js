import ContactCard from './ContactCard'

function ContactList({ setPhoneNums, filterBy, url, phoneNumbers, onHandleDelete }) {

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
                filterBy={filterBy}
                onHandleDelete={onHandleDelete} 
                onHandleFavClick={handleFavClick}
                url={url} 
            />)}   
        </div>
    )
}

export default ContactList