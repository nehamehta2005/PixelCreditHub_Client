/* we are not importing this code anywhere as it is not working */


import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { MyContext } from "../context/MyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import baseURL from "../config/api";
 

function LikeButton({ index, imageURL }) {
  const { state, dispatch } = useContext(MyContext);
  const { like } = state;
  const [iconColor, setIconColor] = useState("white");

  useEffect(() => {
    async function fetchInitialLikeState() {
      try {
        const response = await axios.get(`${baseURL}/images/likes`, {
          params: { imageURL: imageURL }
        });
        const initialLikes = response.data.likes || 0;
        setIconColor(initialLikes > 0 ? "red" : "white");
      } catch (error) {
        console.error("Error fetching initial likes:", error);
      }
    }
    fetchInitialLikeState();
  }, [imageURL]); // Fetch initial like state when imageURL changes

  const handleChange = async () => {
    try {
      const newAction = iconColor === "white" ? "increment" : "decrement";
      const response = await axios.post(`${baseURL}/images/updateLikes`, {
        imageURL: imageURL,
        action: newAction
      });

      const updatedLikes = response.data.likes || 0;
      setIconColor(updatedLikes > 0 ? "red" : "white");
      dispatch({ type: "SetLike", payload: updatedLikes });
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <button onClick={handleChange}>
      <FontAwesomeIcon icon={faHeart} style={{ color: iconColor }} />
    </button>
  );
}

export default LikeButton;
