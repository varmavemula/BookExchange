import React from 'react';

const Profile = () => {
  return (
    <div>
      <h1>Profile</h1>
      {/* Display user's profile information */}
      <div>
        <h2>Username: JohnDoe</h2>
        <p>Email: johndoe@example.com</p>
        <p>Location: New York, USA</p>
      </div>

      {/* Display user's current book exchange requests */}
      <div>
        <h2>Current Exchange Requests</h2>
        <ul>
          <li>Request 1: Book A for Book B</li>
          <li>Request 2: Book C for Book D</li>
          <li>Request 3: Book E for Book F</li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;