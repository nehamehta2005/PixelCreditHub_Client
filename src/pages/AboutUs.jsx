import React, { useContext, useEffect } from "react";
import axios from "axios";
import { MyContext } from "../context/MyContext";
import { Link } from "react-router-dom";
import "./AboutUs.css";
import baseURL from "../config/api";

  
function AboutUs() {
  const { state, dispatch } = useContext(MyContext);
  const { members } = state;
console.log(members);
  useEffect(() => {
    // Fetch member data from your backend API
    async function fetchMembers() {
      try {
        const response = await axios.get(`${baseURL}/members`);
        dispatch({ type: "setMembers", payload: response.data });
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    }

    fetchMembers();
  }, []);
  const handleImgRightClick = (e) => {
    if (e.button === 2) {
      e.preventDefault();
      // this function do not allow user to right click!
    }
  };

  return (
    <div className="aboutUsMainContainer">
      <div className="aboutUsContainer">
        <div className="aboutUsSubContainer">
          <h2 className="aboutUsTitel">About Us</h2>
          <p className="aboutUsPara">
            Welcome to PixelCreditHub, a collaborative effort by a team of
            passionate full-stack developers from DCI. What initially started as
            a final project submission has transformed into a dynamic platform
            facilitating the sharing, sale, and acquisition of captivating
            photography images. This initiative stemmed from our collective
            enthusiasm for photography and technology, propelling us to create a
            space where visual artistry converges with effortless accessibility.{" "}
          </p>
        </div>
        <div className="aboutUsSubContainer">
          <h3 className="aboutUsSubTitel">Our Goal</h3>
          <p className="aboutUsPara">
            Our goal is to create a vibrant community where photographers and
            enthusiasts can seamlessly exchange stunning visual content.
          </p>
        </div>
        <div className="aboutUsSubContainer">
          <h3 className="aboutUsSubTitel">Our 'Aha' Moment</h3>
          <p className="aboutUsPara">
            The spark for PixelCreditHub ignited when we realized the potential
            to empower photographers by providing a marketplace that simplifies
            the process of monetizing their art.
          </p>
        </div>
        <div className="aboutUsSubContainer">
          <h3 className="aboutUsSubTitel">What We Offer</h3>
          <p className="aboutUsPara">
            At PixelCreditHub, we offer a user-friendly platform for
            photographers to showcase their work, connect with a broader
            audience, and for buyers to discover and acquire exceptional images.
          </p>
        </div>
        <div className="aboutUsSubContainer">
          <h3 className="aboutUsSubTitel">Meet Our Team</h3>
          <ul className="aboutUsUl">
            {members.map((member, index) => (
            
              <li className="memberLink" key={index}>

                <div className="memberImgDiv">
                <Link
                  to={`/members/${member.name.toLowerCase()}`}
                  className="memberImgLink"
                >
                  <img
                    src={member.image}
                    alt={`${member.name} ${member.lastname}`}
                    className="memberImage"
                    
                     onContextMenu={handleImgRightClick}
                   
                  />
                  
                </Link>
                </div>


                <div className="memberNameLink">
                <Link
                  to={`/members/${member.name.toLowerCase()}`}
                  className="memberNameLink"
                >
                  {member.name} {member.lastname}
                </Link>
                </div>

              </li>
            ))}
          </ul>
        </div>
        <Link to="/">Go back to Home</Link>
      </div>
    </div>
  );
}

export default AboutUs;