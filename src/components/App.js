import ContactList from './ContactList'
import Form from './Form'
import { useState, useEffect } from 'react'
const Base_URL = 'http://localhost:4000/contacts'

function App() {
  const [phoneNums, setPhoneNums] = useState([])
  const [form, setForm] = useState(false)
  const [fav, setFav] = useState('All')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    phoneNumber: "",
    email: "",
    favorite: false
  })

  useEffect(() => {
    fetch(Base_URL)
    .then(r => r.json())
    .then(contacts => setPhoneNums(contacts))
  }, [])

  const displayFavs = phoneNums.filter(number => {
    if(fav === "All") {
      return true
    } else {
      return number.favorite === fav
    }
  })

  function handleChange(e) {
    const key = e.target.name
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value 
    setFormData({...formData, [key]: value})
  }

  function handleSubmit(e) {
    e.preventDefault()

    fetch(Base_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(r => r.json())
    .then(newContact => setPhoneNums([newContact, ...phoneNums]))

		setFormData({
			name: "",
			firstName: "",
      lastName: "",
      avatar: "",
      phoneNumber: "",
      email: "",
      favorite: false
		})
		setForm(false)
  }

  function handleDelete(obj) {
    fetch(`${Base_URL}/${obj.id}`, {
      method: 'DELETE'
    })
    .then(r => r.json())
    const updatedArr = phoneNums.filter(num => num.id !== obj.id)
    setPhoneNums(updatedArr)
  }

  

  if(phoneNums.length === 0) {
    return <p>Loading...</p>
  }

  
  return (
    <div className="">
      <h1>My Contact-book Markup</h1>
      <div className="filter-buttons">
        <button onClick={()=>setForm(!form)}>{!form ? "Add Contact" : "Cancel"}</button>
        <div className="right-side">
          <button onClick={()=>setFav('All')}>All</button>
          <button onClick={()=>setFav(true)}>Favorites</button>
        </div>
      </div>
      {form ? <Form onHandleSubmit={handleSubmit} onHandleChange={handleChange} formData={formData} /> : null}
      <ContactList 
        url={Base_URL} 
        setPhoneNums={setPhoneNums} 
        onHandleDelete={handleDelete} 
        phoneNumbers={displayFavs} 
      />
    </div>
  );
}

export default App;
