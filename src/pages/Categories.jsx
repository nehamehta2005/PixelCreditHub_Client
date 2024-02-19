import React , {useContext, useEffect, useMemo} from 'react'
import { MyContext } from '../context/MyContext';
import axios from "axios";
import { Link } from "react-router-dom";
import { shuffle } from "lodash";
import "./categoryStyle.css"

import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/react-splide/css';

const backendURL = `http://localhost:5500`;


function Categories() {
  const { state, dispatch } = useContext(MyContext);
  const { allUploads } = state;
// function for getting all approved uploads
  useEffect(() => {
    async function fetchUploadedImages() {
      try {
        //const response = await axios.get(`${backendURL}/images/alluploadedimages/pending`);
        const response = await axios.get(`${backendURL}/images/alluploadedimages/approved`);
        dispatch({ type: "setAllUploads", payload: response.data });
      } catch (error) {
        console.error("Error fetching allUploads details:", error);
         
      }
    }
     fetchUploadedImages();
  }, []);
/*   const getImageByCategory = () => {
    if (allUploads.length === 0) {
      // When it mounts and has checked 0 images so far
      return "alt.jpg";
    }
  } */
  const getRandomImageURLs = useMemo(() => {
    if (allUploads.length === 0) {
      return ["alt.png"];
    }
    const shuffledUploads = shuffle(allUploads.slice());
    return shuffledUploads.slice(0, 10).map((upload) => upload ? upload.imageURL : "alt.png");
  }, [allUploads]);

  const getRandomImageByCategoryURL = (category) => {
    const categoryUploads = allUploads.filter(
      (upload) => upload.categories.includes(category)
    );
    if (categoryUploads.length > 0) {
      const randomIndex = Math.floor(Math.random() * categoryUploads.length);
      return categoryUploads[randomIndex].imageURL;
    } else {
      return "alt.jpg"; // Default image if no uploads found for the category
    }
  };
  


 
  return (
    <div>
      {/* Spotlight Section */}
      <Splide options={ { rewind: true, height: "540px" } } aria-label="Hero Section">
      <SplideSlide>
      <div className="Spotlight s1" style={{ backgroundImage: `url('${getRandomImageURLs[0]}')` }}>
        <div className="leftSpot">
          <h1>"Embracing life's beauty, one snapshot at a time."</h1>
          <p className="mainP">It urges us to view life as a series of moments to be savored, much like taking snapshots to capture the essence of beauty around us. Each "snapshot" metaphorically represents a conscious effort to pause, observe, and appreciate the wonders that often escape our notice in the rush of daily life.</p>
          <p className="finalP"><strong>Explore Picture Wonderland</strong></p>
        </div>
      </div>
      </SplideSlide>
      <SplideSlide>
      <div className="Spotlight s2" style={{ backgroundImage: `url('${getRandomImageURLs[1]}')` }}>
        <div className="leftSpot">
          <h1>"Navigating the Symphony of Silence in a Noisy World."</h1>
          <p className="mainP">In the cacophony of modern existence, there exists a symphony of silence waiting to be heard. Much like an adept conductor, we must learn to navigate through the noise, discovering the harmonious pauses that compose the music of life. Embracing these silent interludes allows us to appreciate the beauty that thrives in the quiet corners of our existence.</p>
          <p className="finalP"><strong>Explore Picture Wonderland</strong></p>
        </div>
      </div>
      </SplideSlide>
      <SplideSlide>
      <div className="Spotlight s3" style={{ backgroundImage: `url('${getRandomImageURLs[2]}')` }}>
        <div className="leftSpot">
          <h1>"Weaving Dreams into the Fabric of Reality."</h1>
          <p className="mainP">Life is a loom, and with every action, we weave dreams into the fabric of reality. Just as a skilled artisan creates intricate patterns, we have the power to craft our own narrative by embracing creativity and imagination. Each choice, each endeavor, is a thread contributing to the tapestry of our existence, forming a masterpiece that reflects the beauty within our aspirations.</p>
          <p className="finalP"><strong>Explore Picture Wonderland</strong></p>
        </div>
      </div>
      </SplideSlide>
      <SplideSlide>
      <div className="Spotlight s4" style={{ backgroundImage: `url('${getRandomImageURLs[3]}')` }}>
        <div className="leftSpot">
          <h1>"Chasing Shadows, Embracing Light: A Dance with Life's Contrasts."</h1>
          <p className="mainP">Life is a dance between shadows and light, where contrasting elements intertwine to create a captivating rhythm. Just as a dancer embraces both the shadows and the spotlight, we too must navigate the complexities of existence. By acknowledging and appreciating the interplay of dark and light, we find the beauty in the delicate balance that shapes the contours of our journey.</p>
          <p className="finalP"><strong>Explore Picture Wonderland</strong></p>
        </div>
      </div>
      </SplideSlide>
      <SplideSlide>
      <div className="Spotlight s5" style={{ backgroundImage: `url('${getRandomImageURLs[4]}')` }}>
        <div className="leftSpot">
          <h1>"Echoes of Eternity: Capturing Timeless Moments."</h1>
          <p className="mainP">Time is a fleeting companion, yet within its grasp lie timeless moments waiting to be captured. Much like an artist immortalizes a scene on canvas, we can freeze these ephemeral instants through conscious presence and appreciation. By recognizing the echoes of eternity within the everyday, we unlock the door to a treasure trove of memories that transcend the constraints of time.</p>
          <p className="finalP"><strong>Explore Picture Wonderland</strong></p>
        </div>
      </div>
      </SplideSlide>
    </Splide>
      {/* Categories */}
      <h2 className="cats">Categories</h2>
      <div className="Categories"> 
        <Link to={`/categories/animals`}>
          <div  className="singleCat"  style={{
              backgroundImage: `url('${getRandomImageByCategoryURL("animals")}')`,
            }}>
            <h3>Animals | Wildlife</h3>
          </div>
        </Link>
        <Link to={`/categories/nature`}>
        <div className="singleCat" style={{
              backgroundImage: `url('${getRandomImageByCategoryURL("nature")}')`,
            }}>
          <h3>Nature</h3>
        </div>
        </Link>
        <Link to={`/categories/interiors`}>
        <div className="singleCat" style={{
              backgroundImage: `url('${getRandomImageByCategoryURL("interiors")}')`,
            }}>
          <h3>Interiors</h3>
        </div>
        </Link>
        <Link to={`/categories/abstract`}>
        <div className="singleCat" style={{
              backgroundImage: `url('${getRandomImageByCategoryURL("abstract")}')`,
            }}>
          <h3>Abstract</h3>
        </div>
        </Link>

        <Link to={`/categories/illustrations`}>
        <div className="singleCat" style={{
              backgroundImage: `url('${getRandomImageByCategoryURL("illustrations")}')`,
            }}>
          <h3>Illustrations</h3>
        </div>
        </Link>

        <Link to={`/categories/food`}>
        <div className="singleCat" style={{
              backgroundImage: `url('${getRandomImageByCategoryURL("food")}')`,
            }}>
          <h3>Food & Drink</h3>
        </div>
        </Link>
      </div>
    </div>
  )
}

export default Categories