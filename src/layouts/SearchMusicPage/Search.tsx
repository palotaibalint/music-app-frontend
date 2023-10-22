import React, { useState } from "react";
import { Song } from "./Song";

function Search() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = () => {
    // Handle the search action here
    console.log("Search term:", searchTerm);
    // You can implement your search functionality here
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-6">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="input-group-append">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSearch}
              >
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <ul className="nav nav-pills flex-column primary-color">
        <Song />
        <Song />
        <Song />
        <Song />
        <Song />
      </ul>
    </div>
  );
}

export default Search;
