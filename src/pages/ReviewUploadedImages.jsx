import React, { useEffect, useContext } from "react";
//import { Link } from "react-router-dom";
import { MyContext } from "../context/MyContext";
import axios from "axios";
//import "./ReviewUploadedImages.css";
import "bootstrap/dist/css/bootstrap.min.css";
import baseURL from "../config/api";


function ReviewUploadedImages() {
    const { state, dispatch } = useContext(MyContext);
    const { allUploads } = state;


  useEffect(() => {
    async function fetchUploadedImages() {
      try {
        const response = await axios.get(baseURL + `/images/alluploadedimages/pending`);
        //const response = await axios.get(baseURL + `/images/alluploadedimages/here comes STATUS`);
        dispatch({ type: "setAllUploads", payload: response.data });
        console.log(response.data )
      } catch (error) {
        console.error("Error fetching allUploads details:", error);
         
      }
    }

    fetchUploadedImages();
  }, []);


  // Clicking on approveImage, sets it's status to "approved" in the database.
  const approveImage = async (upload) => {

    try {
      const res = await fetch(baseURL + `/images/approve/${upload._id}`, {
        method: `PATCH`,
        headers: {
          "Content-Type": `application/json`,
        },
      });
      /* if (res.ok) {
        alert("Image approved successfully");
      } else {
        const errorData = await res.json(); 
        alert(`Error: ${errorData.message}`);
      } */
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }

  // Clicking on Deny an image, delete's it from the database.
  const denyImage = async (upload) => {

    try {
      const res = await fetch(baseURL + `/images/deny/${upload._id}`, {
        method: `DELETE`,
        headers: {
          "Content-Type": `application/json`,
        },
      });
      if (res.ok) {
        alert("Image denied and removed successfully");
      } else {
        const errorData = await res.json(); 
        alert(`Error: ${errorData.message}`);
      }
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div className="container-sm">
        {allUploads.length === 0 ? (
          <div style={{ minHeight:"13rem" }}> 
         <p className="text-center p-5 m-5 bg-dark text-white  " style={{ fontSize: ' 2rem' }}>
         You've reviewed all uploaded images. Check back later for more!
     </p>
     </div>
     
            ) : (
                <div className="row">
                    {allUploads.map(upload => (
                        <div className="col-md-4 mb-3" key={upload._id}>
                            <div className="card">
                                <img
                                    src={`${upload.imageURL}`}
                                    alt={upload.fileName}
                                    className="card-img-top"
                                    style={{ height: '300px', objectFit: 'cover' }}
                                />
                                <div className="card-body">
                                    <p className="card-text">Status: {upload.status}</p>
                                    <p className="card-text">Tags: {upload.tags}</p>
                                    <p className="card-text">Category: {upload.categories}</p>
                                    <button className="btn btn-success m-2" onClick={() => approveImage(upload)}>Approve</button>
                                    <button className="btn btn-danger m-2" onClick={() => denyImage(upload)}>Deny</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
    </div>
);
}

export default ReviewUploadedImages;