import { useState } from 'react';
import "./AdminPanel.css";
import { Link } from "react-router-dom";
function AdminPanel() {
  const [email, setEmail] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const deleteUserByEmail = async () => {
    try {
      const res = await fetch(`http://localhost:5500/users/delete/${email}`, {
        method: `DELETE`,
        headers: {
          'Content-Type': `application/json`,
        },
      });
      if (res.ok) {
        const deletedUser = await res.json();
        alert(`User with email ${email} deleted successfully`);
      } else {
        const errorData = await res.json(); 
        alert(`Error: ${errorData.message}`);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="adminPanel">
      <h2>ADMIN PANEL</h2>
      <div className="adminBg">
        <div className="adminOptions">
         <h4>REVIEW SUBMITTED</h4>
          <Link to="/reviewuploadedimages">
          <button id="review">Review uploaded images by Users</button>
          </Link>

          <label>
            <h4>DELETE USER</h4>
            Enter User Email:
            <input type="email" value={email} onChange={handleEmail} />
          </label>
          <button id="delete" onClick={deleteUserByEmail}>Delete User</button>
        </div>
      </div>
    </div>
  );
}

export default AdminPanel;