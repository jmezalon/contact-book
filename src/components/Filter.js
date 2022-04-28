import { useState } from "react";

function Filter({
  form,
  onhandleFilterChange,
  search,
  setSearch,
  setForm,
  filterBy,
  setFav,
  onHandleSearchChange,
}) {
  const [selected, setSelected] = useState(true);

  function handleFavClick() {
    setSearch("");
    setFav("All");
    setSelected(true);
  }

  function handleAllClick() {
    setSearch("");
    setFav(true);
    setSelected(false);
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
          <option value="first_name">First Name</option>
          <option value="last_name">Last Name</option>
        </select>
        <input
          type="text"
          placeholder="Search contacts..."
          name={search}
          value={search}
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
