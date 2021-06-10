import React from "react";
import "../App.css";
import * as CONSTS from "../utils/consts";
import * as PROFILE_SERVICE from "../services/profile";
import UpdateProfile from "../components/Profile/UpdateProfile";
import UpdatePassword from "../components/Profile/UpdatePassword";
// import { Link } from "react-router-dom";

export default function ProfilePage(props) {
  console.log("props", props);
  const { user, authenticate } = props;
  const [listOfCompanies, setListOfCompanies] = React.useState([]);
  const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);
  const [displayUpdatePassword, setDisplayUpdatePassword] =
    React.useState(false);

  // RECEIVE USER INFO
  React.useEffect(() => {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }
    PROFILE_SERVICE.PROFILE(accessToken)
      .then((response) => {
        console.log(response);
        setListOfCompanies(response.data.ownedCompanies);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // TOGGLE UPDATING USER FUNCTIONS
  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }

  function passwordToggle() {
    setDisplayUpdatePassword(!displayUpdatePassword);
  }

  return (
    <div>
      hello {user.username}
      <div>
        <button onClick={profileToggle}>Update Profile</button>
        {/* {displayUpdateProfile ? <UpdateProfile /> : null} */}
        {displayUpdateProfile && (
          <UpdateProfile user={user} authenticate={authenticate} />
        )}

        <br />
        <button onClick={passwordToggle}>Update Password</button>
        {displayUpdatePassword ? (
          <UpdatePassword user={user} authenticate={authenticate} />
        ) : null}

        <br />
        <button>Delete Account</button>
      </div>
      <br />
      <div>this is your created company</div>
      {listOfCompanies.map((oneCompany) => {
        return (
          <div key={oneCompany._id}>
            {" "}
            <h4>{oneCompany.name}</h4>
            <p>{oneCompany.url}</p>
          </div>
        );
      })}
    </div>
  );
}
