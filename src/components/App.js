import ContactList from "./ContactList";
import Form from "./Form";
import Filter from "./Filter";
import { useState, useEffect } from "react";
const Base_URL = "http://localhost:4000/contacts";

function App() {
  const [phoneNums, setPhoneNums] = useState([]);
  const [form, setForm] = useState(false);
  const [fav, setFav] = useState("All");
  const [filterBy, setFilterBy] = useState("firstName");
  const [search, setSearch] = useState("");
  let sortContact = phoneNums;
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    phoneNumber: "",
    email: "",
    favorite: false,
  });

  useEffect(() => {
    fetch(Base_URL)
      .then((r) => r.json())
      .then((contacts) => setPhoneNums(contacts));
  }, []);

  const displayFavs = phoneNums
    .filter((number) => {
      if (fav === "All") {
        return true;
      } else {
        return number.favorite === fav;
      }
    })
    .filter((contact) => {
      if (
        contact.firstName.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return true;
      } else if (
        contact.lastName.toLowerCase().includes(search.toLocaleLowerCase())
      ) {
        return true;
      }
      return false;
    });

  if (filterBy === "firstName") {
    sortContact = displayFavs.sort((a, b) => {
      let nameA = a.firstName.toUpperCase();
      let nameB = b.firstName.toUpperCase();
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    });
  } else if (filterBy === "lastName") {
    sortContact = displayFavs.sort((a, b) => {
      let nameA = a.lastName.toUpperCase();
      let nameB = b.lastName.toUpperCase();
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
      firstName: "",
      lastName: "",
      avatar: "",
      phoneNumber: "",
      email: "",
      favorite: false,
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
        onHandleSearchChange={handleSearchChange}
        onhandleFilterChange={handleFilterChange}
      />
      {form ? (
        <Form
          onHandleSubmit={handleSubmit}
          onHandleChange={handleChange}
          formData={formData}
        />
      ) : null}
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
