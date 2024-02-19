import { useNavigate } from "react-router-dom";
import React, { useContext, useRef } from "react";
import { MyContext } from "../context/MyContext";
import Button from "./Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./Search.css";

function Search() {
  const { state, dispatch } = useContext(MyContext);
  const { searchQuery } = state;
  const navigate = useNavigate();
  const searchInput = useRef(null);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleInputChange();
    }
  };

  const handleInputChange = () => {
    const inputQuery = searchInput.current.value;
    if (inputQuery === "") {
      console.log("Search query is empty.");
      return;
    }
    
    dispatch({ type: "SET_SEARCH_QUERY", payload: inputQuery });
    navigate(`/images/searchresults?query=${encodeURIComponent(inputQuery)}`);
    dispatch({ type: "SET_SEARCH_QUERY", payload: "" });
  };

  return (
    <div className="searchContainer">
      <div className="search">
        <input
          className="input-field"
          type="text"
          placeholder="Find an image..."
          ref={searchInput}
          onKeyDown={handleKeyPress}
          
        />
        <Button
          buttonText={<FontAwesomeIcon icon={faMagnifyingGlass} style={{color: "#ffffff",}} />}
          className="searchBTN"
          onClick={handleInputChange}
        />
      </div>
    </div>
  );
}

export default Search;
