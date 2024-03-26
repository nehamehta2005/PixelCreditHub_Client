import React, { useState, useEffect, useContext } from "react";
import { MyContext } from "../context/MyContext";
import { useMatch } from "react-router-dom";
import axios from "axios";
import DownloadButton from "../components/DownloadButton";
import "bootstrap/dist/css/bootstrap.min.css";
import baseURL from "../config/api";

 

function CategoryResults() {
  const { state, dispatch } = useContext(MyContext);
  const { allUploads } = state;

  const match = useMatch("/categories/:selectedCategory");
  const selectedCategory = match?.params.selectedCategory;
   // Define selectedImage state and its setter function
   const [selectedImage, setSelectedImage] = useState(null);
  // Use state to store categoryImages
  const [categoryImages, setCategoryImages] = useState([]);

  useEffect(() => {
    async function fetchCategoryImages() {
      try {
        // Filter images based on the selected category
        const response = await axios.get(`${baseURL}/images/alluploadedimages/approved/${selectedCategory}`);
        const filteredImages = response.data;
  
        setCategoryImages(filteredImages);
  
        // Dispatch action to update categories in the context
        dispatch({ type: "SetCategories", payload: filteredImages });
      } catch (error) {
        console.error("Error fetching category images:", error);
      }
    }
  
    fetchCategoryImages();
  }, [selectedCategory, dispatch]);

  const handleImgClick = (upload) => {
    setSelectedImage(upload);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleImgRightClick = (e) => {
    if (e.button === 2) {
      e.preventDefault();
    }
  };

  return (
    <div className="container-sm p-3">
      <h2 className="text-center"> {selectedCategory.toUpperCase()}</h2>
      {allUploads ? (
        <div className="row justify-content-center p-4">
          {categoryImages.map((upload) => (
            <div key={upload._id} className="col-md-4 mb-4">
              <div className="card">
                <img
                  src={`${upload.imageURL}`}
                  alt={upload.fileName}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover" }}
                  onContextMenu={handleImgRightClick}
                />
                <div className="card-body">
                  <h5 className="card-title">{upload.tags.join(" ")}</h5>
                  {/*  <p className="card-text">Author: {upload.author}</p> */}
                  <button
                    className="btn btn-dark mt-2"
                    onClick={() => handleImgClick(upload)}
                  >
                    view Image
                  </button>
                  <DownloadButton fileName={upload.fileName} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h3 className="text-center">No search results found :\</h3>
      )}

      {selectedImage && (
        <div
          className="modal"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            position: "fixed",
            zIndex: 9999,
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
          }}
        >
          <div className="modal-content container-fluid">
            <div className="modal-body">
              <img
                src={selectedImage.imageURL}
                alt={selectedImage.fileName}
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  border: "px solid #ddd",
                  boxShadow: "inset 0 0 10px black",
                  borderRadius: "5px",
                }}
              />
              <button
                type="button"
                className="btn btn-dark mt-2 close p-0"
                aria-label="Close"
                onClick={handleCloseModal}
              >
                <h2 aria-hidden="true">&times;</h2>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default CategoryResults;
