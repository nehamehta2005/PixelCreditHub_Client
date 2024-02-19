// SingleImagePage.js
import React from 'react';
import { useParams } from 'react-router-dom';

function SingleImagePage() {
  const { id } = useParams(); // Get the 'id' parameter from the URL

  // Fetch the image data using the 'id'

  return (
    <div>
      {/* Display the single image in a larger view */}
      <img src={`url_of_single_image_with_id_${id}`} alt="Single Image" />
      {/* Other details or actions related to the single image */}
    </div>
  );
}

export default SingleImagePage;
