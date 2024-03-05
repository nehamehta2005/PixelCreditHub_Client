import React from "react";
import axios from "axios";
import baseURL from "../config/api";

const DownloadButton = ({ fileName }) => {
  const handleDownloadClick = async () => {
    try {
      const response = await axios.get(
        baseURL + ` /images/singleimage/${fileName}`,
        { responseType: "blob" } // Set responseType to 'blob' for binary data
      );

      // Create a blob URL from the response data
      const blobUrl = URL.createObjectURL(new Blob([response.data]));

      // Create an <img> element to display the image
      const img = document.createElement("img");
      img.src = blobUrl;

      // Create a link element to trigger the download
      const link = document.createElement("a");
      link.href = blobUrl;
      link.setAttribute("download", `${fileName}.png`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button className="btn btn-dark mt-2" onClick={handleDownloadClick}>
      download image
    </button>
  );
};

export default DownloadButton;
