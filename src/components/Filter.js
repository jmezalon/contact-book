import { useState } from "react";

function Filter({
  form,
  onhandleFilterChange,
  search,
  setForm,
  filterBy,
  setFav,
  onHandleSearchChange,
}) {
  const [selected, setSelected] = useState(false);

  function handleFavClick() {
    setFav("All");
    setSelected(!selected);
  }

  function handleAllClick() {
    setFav(true);
    setSelected(!selected);
  }

  return (
    <div className="filter-buttons">
      <div className="left-side">
        <button onClick={() => setForm(!form)}>
          {!form ? "Add Contact" : "Cancel"}
        </button>

        <label htmlFor="filter">By: </label>
        <select
          name="nameFilter"
          value={filterBy}
          onChange={onhandleFilterChange}
        >
          <option value="firstName">First Name</option>
          <option value="lastName">Last Name</option>
        </select>
        <input
          type="text"
          placeholder="Search contacts..."
          name={search}
          onChange={onHandleSearchChange}
          id="search-input"
        />
      </div>

      <div className="right-side">
        <button className={selected ? "selected" : ""} onClick={handleFavClick}>
          All
        </button>
        <button className={selected ? "" : "selected"} onClick={handleAllClick}>
          Favorites
        </button>
      </div>
    </div>
  );
}

export default Filter;
