import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import axios from "axios";
import "./UserProfile.css";
import baseURL from "../config/api";
 
const UserProfile = () => {
  const { userid } = useParams();
 // console.log("UserId:", userid);

  const { state, dispatch } = useContext(MyContext);
  const { user, selectedFile } = state;

  const handleFileChange = async (e) => {
    e.preventDefault();
    const file = e.target.files[0];
    console.log("Selected File:", file);

    dispatch({
      type: "SetSelectedFile",
      payload: file,
    });

 
    try {
      const formData = new FormData();
      formData.append("profileImage", file); // Use the correct field name
      console.log(file);
      // Use Axios to send the file to the server
      const response = await axios.post(`${baseURL}/profile/update-image/${userid}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            // Add any other headers if necessary
          },
        }
      );
      window.location.reload();
      // Handle the response from the server
      console.log("Server Response:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  const handleDeleteProfileImage = async (e) => {
    console.log("geting in")
    try {
      console.log("got in")
      const response = await axios.post(`${baseURL}/profile/delete-image/${userid}`
      );
      window.location.reload();
      console.log("Profile image deleted successfully");
    } catch (error) {
      console.error("Error deleting profile image:", error);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile">
        {user && (
          <div className="user-info">
            <h2>{`Welcome, ${user.name}!`}</h2>
            <p>Email: {user.email}</p>

           

            <div>
              <input
                type="file"
                accept="image/*"
                name="profileImage"
                id="profileImageInput" // Add an id for the label to reference
                onChange={handleFileChange}
                style={{ display: "none" }} // Hide the original input
              />
              <label
                htmlFor="profileImageInput"
                className="custom-file-input-label"
              >
                Choose Image
              </label>
            </div>
            {user.profileImage && (
              <div>
                
                <img src={user.profileImageUrl} alt="Profile" className="profileImage" />
                <button onClick={handleDeleteProfileImage}>Delete Current Profile Image</button>
              </div>
            )}

          </div>


        )}

        {/*  <div className="upload-history">
          <h2>Upload History</h2>
          <div className="image-grid">
            {uploadHistory.map((upload) => (
              <div key={upload.id} className="image-item">
                <img
                  src={`path_to_your_image/${upload.fileName}`}
                  alt={upload.fileName}
                />
                <p>{upload.fileName}</p>
              </div>
            ))}
          </div>
        </div> */}

        {/* <div className="download-history">
          <h2>Download History</h2>
          <div className="image-grid">
            {downloadHistory.map((download) => (
              <div key={download.id} className="image-item">
                <img
                  src={`path_to_your_image/${download.fileName}`}
                  alt={download.fileName}
                />
                <p>{download.fileName}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default UserProfile;

/* export const uploadImages = async (req, res, next) => {
  try {
    const images = req.files.images.map(async (image) => {
      const img = new Image({
        user_id: req.user._id,
        image_url: `your_image_base_url/${Date.now()}_${image.name}`,
        status: "pending",
        data: image.data,
      });
      return await img.save();
    });

    await Promise.all(images);
    res.send("All images uploaded successfully!");
  } catch (error) {
    res.status(500).send("Error uploading images");
    next(error);
  }
}; */