import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import DownloadButton from "../components/DownloadButton";
import baseURL from "../config/api";

function SearchResult() {
  const { state, dispatch } = useContext(MyContext);
  const { allUploads, searchQuery } = state;
  const [selectedImage, setSelectedImage] = useState(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get("query");
   
  useEffect(() => {
    async function fetchSearchedImages() {
      try {
        // console.log(query);
        const response = await axios.get(baseURL + `/images/alluploadedimages/approved/${query}`
        );
        dispatch({ type: "setAllUploads", payload: response.data });

        //console.log(response.data);
      } catch (error) {
        console.error("Error fetching allUploads details:", error);
      }
    }

    fetchSearchedImages();
  }, [query, dispatch]);

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
    <div className="container-sm bg-light min-vh-100 p-lg-5">
      <h2 className="text-center">Images which you are looking for</h2>
      {allUploads ? (
        <div className="row justify-content-center p-4">
          {allUploads.map((upload) => (
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
        <h3 className="text-center">No search results found :(</h3>
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

export default SearchResult;
