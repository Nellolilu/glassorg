import React from "react";
import "../App.css";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import * as PROFILE_SERVICE from "../services/profile";
import UpdateProfile from "../components/Profile/UpdateProfile";
import UpdatePassword from "../components/Profile/UpdatePassword";
import LoadingComponent from "../components/Loading";
import { Link } from "react-router-dom";

export default function ProfilePage(props) {
  const { user, authenticate } = props;
  console.log("p in p", props);
  const [listOfCompanies, setListOfCompanies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);
  const [displayUpdatePassword, setDisplayUpdatePassword] =
    React.useState(false);

  // TOGGLE UPDATING USER FUNCTIONS
  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }

  function passwordToggle() {
    setDisplayUpdatePassword(!displayUpdatePassword);
  }

  // RECEIVE USER INFO
  React.useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }
    PROFILE_SERVICE.PROFILE(accessToken)
      .then((response) => {
        console.log("response on getting Profile", response);
        setListOfCompanies(response.data.ownedCompanies);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <LoadingComponent />;
  }

  console.log(
    "check on workswith ",
    listOfCompanies.map((comp) => comp.workswith.map((el) => el.name))
    // listOfCompanies.map((comp) => comp.workswith)
    // NEEDS TO BE POPULATED TO SEE
  );

  return (
    <div>
      hello {user.username}
      <div>
        <button onClick={profileToggle}>Update Profile</button>
        {displayUpdateProfile && (
          <UpdateProfile
            user={user}
            authenticate={authenticate}
            setDisplayUpdateProfile={setDisplayUpdateProfile}
            displayUpdateProfile={displayUpdateProfile}
          />
        )}

        <br />
        <button onClick={passwordToggle}>Update Password</button>
        {displayUpdatePassword ? (
          <UpdatePassword
            user={user}
            authenticate={authenticate}
            displayUpdatePassword={displayUpdatePassword}
            setDisplayUpdatePassword={setDisplayUpdatePassword}
          />
        ) : null}

        <br />
        <button>Delete Account</button>
      </div>
      <br />
      {/* COMPANIES OWNED */}
      <div>this is your created company</div>
      {listOfCompanies.map((oneCompany) => {
        return (
          <div key={oneCompany._id}>
            {" "}
            <Link to={`${PATHS.COMPANYROUTE}/${oneCompany._id}`}>
              <h4>{oneCompany.name}</h4>
            </Link>
            <p>{oneCompany.url}</p>
            <p>answered:{oneCompany.answers.length}</p>
            <p>
              proofed:{" "}
              {oneCompany.answers.reduce((counter, obj) => {
                if (obj.proof) {
                  if (obj.proof.length > 0) return (counter += 1);
                }
                return counter;
              }, 0)}
            </p>
          </div>
        );
      })}
      {/* FOLLOWS */}
      <h4>THIS ARE THE ONES YOU FOLLOW</h4>
      {user.follows.map((oneCompany) => {
        return (
          <div key={oneCompany._id}>
            <Link to={`${PATHS.COMPANYROUTE}/${oneCompany._id}`}>
              <h4>{oneCompany.name}</h4>
            </Link>{" "}
          </div>
        );
      })}
      {/* WORKSWITH // SETUP FOR ONCE WORKWITH ALL WORKWITH */}
      <h4>THIS ARE THE ONES YOU WORKWITH</h4>
      {listOfCompanies.map((comp) =>
        comp.workswith.map((coworker) => {
          return <div key={coworker._id}>{coworker.name}</div>;
        })
      )}
    </div>
  );
}
