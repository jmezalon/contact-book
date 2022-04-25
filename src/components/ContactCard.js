function ContactCard({
  onHandleFavClick,
  filterBy,
  url,
  card,
  onHandleDelete,
}) {
  function handleAddFav() {
    fetch(`${url}/${card.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        is_favorite: !card.is_favorite,
      }),
    })
      .then((r) => r.json())
      .then((fixContact) => onHandleFavClick(fixContact));
  }

  return (
    <div className="contact-card">
      {filterBy === "lastname" ? (
        <h4>
          {card.lastname}, <em>{card.firstname}</em>
        </h4>
      ) : (
        <h4>
          {card.firstname} {card.lastname}
        </h4>
      )}
      <img
        src={
          card.avatar ||
          "https://thumbs.dreamstime.com/b/default-avatar-profile-flat-icon-vector-contact-symbol-illustration-184752213.jpg"
        }
        alt="contact-img"
      />
      <p>Phone: {card.phonenumber}</p>
      <p>E-mail: {card.email}</p>
      <div className="bottom-button">
        <p onClick={handleAddFav} id="fav-button">
          {card.is_favorite ? "⭐" : "☆"}
        </p>
        <p onClick={() => onHandleDelete(card)} id="del-button">
          ☒
        </p>
      </div>
    </div>
  );
}

export default ContactCard;
