import ContactList from "./ContactList";
import Form from "./Form";
import Filter from "./Filter";
import { useState, useEffect } from "react";
const Base_URL = "https://contacts-book-w-express.herokuapp.com/contacts"; // production
// const Base_URL = "http://localhost:3333/contacts"; // development with postgresql
// const Base_URL = "http://localhost:4000/contacts"; // development with mock json server
// you can start mock json server with this comment: $ json-server --watch db.json --port 4000

function App() {
  const [phoneNums, setPhoneNums] = useState([]);
  const [form, setForm] = useState(false);
  const [fav, setFav] = useState("All");
  const [filterBy, setFilterBy] = useState("first_name");
  const [search, setSearch] = useState("");
  let sortContact = phoneNums;
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    avatar: "",
    phone_number: "",
    email: "",
    is_favorite: false,
  });

  useEffect(() => {
    fetch(Base_URL)
      .then((r) => r.json())
      .then((data) => {
        setPhoneNums(data);
      });
  }, []);

  const displayFavs =
    phoneNums &&
    phoneNums
      .filter((number) => {
        if (fav === "All") {
          return true;
        } else {
          return number.is_favorite === fav;
        }
      })
      .filter((contact) => {
        if (
          contact.first_name.toLowerCase().includes(search.toLocaleLowerCase())
        ) {
          return true;
        } else if (
          contact.last_name.toLowerCase().includes(search.toLocaleLowerCase())
        ) {
          return true;
        }
        return false;
      });

  if (filterBy === "first_name") {
    sortContact = displayFavs.sort((a, b) => {
      let nameA = a.first_name.toUpperCase();
      let nameB = b.first_name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  } else if (filterBy === "last_name") {
    sortContact = displayFavs.sort((a, b) => {
      let nameA = a.last_name.toUpperCase();
      let nameB = b.last_name.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  }

  function handleChange(e) {
    const key = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData({ ...formData, [key]: value });
  }

  function handleSearchChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    fetch(Base_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json())
      .then((newContact) => setPhoneNums([newContact, ...phoneNums]));

    setFormData({
      name: "",
      first_name: "",
      last_name: "",
      avatar: "",
      phone_number: "",
      email: "",
      is_favorite: false,
    });
    setForm(false);
  }

  function handleDelete(obj) {
    fetch(`${Base_URL}/${obj.id}`, {
      method: "DELETE",
    }).then((r) => r.json());
    const updatedArr = phoneNums.filter((num) => num.id !== obj.id);
    setPhoneNums(updatedArr);
  }

  function handleFilterChange(e) {
    setFilterBy(e.target.value);
  }

  if (phoneNums.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div className="">
      <h1>My Contact-book Markup</h1>
      <Filter
        form={form}
        fav={fav}
        setForm={setForm}
        filterBy={filterBy}
        setFav={setFav}
        search={search}
        setSearch={setSearch}
        onHandleSearchChange={handleSearchChange}
        onhandleFilterChange={handleFilterChange}
      />
      {form && (
        <Form
          onHandleSubmit={handleSubmit}
          onHandleChange={handleChange}
          formData={formData}
        />
      )}
      {displayFavs.length === 0 && search ? (
        <div id="no-result">No Results!</div>
      ) : (
        <ContactList
          url={Base_URL}
          setPhoneNums={setPhoneNums}
          onHandleDelete={handleDelete}
          phoneNumbers={sortContact}
          allContact={phoneNums}
          filterBy={filterBy}
        />
      )}
    </div>
  );
}

export default App;
