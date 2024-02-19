import React, { useContext } from "react";
import axios from "axios";
import { MyContext } from "../context/MyContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./UploadImage.css";
const backendURL = "http://localhost:5500";

const UploadImage = () => {
  const { state, dispatch } = useContext(MyContext);
  const { user, selectedFile, tags, categories } = state;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    dispatch({
      type: "SetSelectedFile",
      payload: file,
    });
  };

  const handleTagsChange = (e) => {
    const tagsValue = e.target.value;
    //console.log(tagsValue, "tagsss"); // Replace multiple spaces with single space and trim spaces
    dispatch({
      type: "SetTags",
      payload: tagsValue,
    });
  };

  const handleCategoryChange = (e) => {
    const categoryValue = e.target.value;
    dispatch({
      type: "SetCategories",
      payload: categoryValue,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedFile) {
      alert("Please select a file.");
      return;
    }
    if (!tags) {
      alert("Please tag your upload.");
      return;
    }
    if (!categories) {
      alert("Please give minimum one category to your upload.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("foo", selectedFile); // Use the same key that server expects ("foo")
      formData.append("tags", tags); // Append tags to formData
      formData.append("categories", categories); // Append categories to formData
      const response = await axios.post(
        `${backendURL}/images/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Server Response:", response.data);
      window.location.reload();
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div
      className="px-lg-5 container-fluid d-flex align-items-center justify-content-center "
      id="tns2-item2"
    >
      <div className="row gx-5">
        <div className="card-body p-5">
          <h2 className="w-100 text-center mb-5">PixelCreditHub</h2>
          {user && (
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="file"
                  accept="image/*"
                  name="Image"
                  id="ImageInput"
                  onChange={handleFileChange}
                />
              </div>
              <div className="mb-3">
                <input
                  name="tags"
                  type="text"
                  placeholder="Enter tags"
                  value={tags}
                  onChange={handleTagsChange}
                />
              </div>
              <div className="mb-3">
                <select
                  name="categories"
                  value={categories}
                  onChange={handleCategoryChange}
                  required
                >
                  <option value="" disabled>
                    Select category
                  </option>
                  <option value="animals">Animals | Wildlife</option>
                  <option value="nature">Nature</option>
                  <option value="interiors">Interiors</option>
                  <option value="abstract">Abstract</option>
                  <option value="illustrations">Illustrations</option>
                  <option value="food">Food & Drink</option>
                  {/* Add more options as needed */}
                </select>
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
