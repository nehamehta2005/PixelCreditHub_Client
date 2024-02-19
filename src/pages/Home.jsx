import React, { useContext } from "react";
import { MyContext } from "../context/MyContext";
import SearchResult from "./SearchResult";
import LandingPage from "./LandingPage";

function Home() {
  //const [searchImage, setSearchImage] = useState("");
  const { state, dispatch } = useContext(MyContext);
  const { searchImage, searchQuery } = state;
  return (
    <div className="home">
      {searchImage.length === 0 && searchQuery !== "" ? (
        <SearchResult />
      ) : (
        <LandingPage />
      )}
    </div>
  );
}

export default Home;
