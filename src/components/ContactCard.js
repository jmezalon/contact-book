function ContactCard({ onHandleFavClick, filterBy, url, card, onHandleDelete }) {
    
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
            {filterBy=== "lastName" ? <h4><em>{card.lastName}</em> {card.firstName} </h4> : <h4>{card.firstName} {card.lastName}</h4>}
            <img src={ card.avatar || "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg"} alt="contact-img" />
            <p>Phone: {card.phoneNumber}</p>
            <p>E-mail: {card.email}</p>
            <div className="bottom-button">
                <p 
                    onClick={handleAddFav} 
                    id="fav-button"
                >
                    {card.favorite ? "⭐" : "☆"}
                </p>
                <p 
                    onClick={() => onHandleDelete(card)} id="del-button"
                >
                    ☒
                </p>
            </div>
        </div>
    )
}

export default ContactCard