function ContactCard({ onHandleFavClick, url, card, onHandleDelete }) {
    
    function handleAddFav() {
        fetch(`${url}/${card.id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              favorite: !card.favorite
            })
        })
        .then(r => r.json())
        .then(fixContact => onHandleFavClick(fixContact))
    }

    return (
        <div className="contact-card">
            <h3>{card.firstName} {card.lastName}</h3>
            <img src={ card.avatar || "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg"} alt="contact-img" />
            <p>Phone: {card.phoneNumber}</p>
            <p>E-mail: {card.email}</p>
            <div className="bottom-button">
                <p onClick={handleAddFav} style={{cursor: "pointer"}} >{card.favorite ? "⭐" : "☆"}</p>
                <p onClick={() => onHandleDelete(card)} style={{color:"red", cursor: "pointer"}}>☒</p>
            </div>
        </div>
    )
}

export default ContactCard