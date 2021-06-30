import React from "react";
import "../App.css";
import "./Profile.css";
import * as CONSTS from "../utils/consts";
import * as PATHS from "../utils/paths";
import * as PROFILE_SERVICE from "../services/profile";
import UpdateProfile from "../components/Profile/UpdateProfile";
// import UpdatePassword from "../components/Profile/UpdatePassword";
import LoadingComponent from "../components/Loading";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import RatingCalc from "../components/Trust-Rating/RatingCalc";
export default function ProfilePage(props) {
  const { user, authenticate } = props;
  console.log("p in p", props);
  const [listOfCompanies, setListOfCompanies] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [displayUpdateProfile, setDisplayUpdateProfile] = React.useState(false);
  // const [displayUpdatePassword, setDisplayUpdatePassword] =
  //   React.useState(false);
  const [followDisplay, setFollowDisplay] = React.useState(false);
  const [workchainDisplay, setWorkchainDisplay] = React.useState(false);

  // TOGGLE UPDATING USER FUNCTIONS
  function profileToggle() {
    setDisplayUpdateProfile(!displayUpdateProfile);
  }

  // function passwordToggle() {
  //   setDisplayUpdatePassword(!displayUpdatePassword);
  // }

  function followToggle() {
    setFollowDisplay(!followDisplay);
  }

  function workToggle() {
    setWorkchainDisplay(!workchainDisplay);
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

  // console.log(
  //   "check on workswith ",
  //   listOfCompanies.map((comp) => comp.workswith.map((el) => el.name))
  //   // listOfCompanies.map((comp) => comp.workswith)
  //   // NEEDS TO BE POPULATED TO SEE
  // );
  console.log(followDisplay);
  return (
    <div>
      <div className="profile-box">
        <div className="profile-box-left">
          <h1 className="name">Hi {user.username}!</h1>
          <div className="profile-btns">
            <div className="flex-updater">
              <button
                onClick={profileToggle}
                className={
                  !displayUpdateProfile ? "btn-gray" : "btn-active-gray"
                }
              >
                Update Profile
              </button>
              {displayUpdateProfile && (
                <UpdateProfile
                  user={user}
                  authenticate={authenticate}
                  setDisplayUpdateProfile={setDisplayUpdateProfile}
                  displayUpdateProfile={displayUpdateProfile}
                />
              )}
            </div>

            {/* <button onClick={passwordToggle} className="btn">
              Update Password
            </button>
            {displayUpdatePassword ? (
              <UpdatePassword
                user={user}
                authenticate={authenticate}
                displayUpdatePassword={displayUpdatePassword}
                setDisplayUpdatePassword={setDisplayUpdatePassword}
              />
            ) : null} */}
            <button className="btn-gray delete">Delete Account</button>
          </div>
          <br />
        </div>
        <div className="profile-box-rigth">
          {/* COMPANIES OWNED */}
          <div className="companies-container">
            {listOfCompanies.map((oneCompany) => {
              return (
                <div key={oneCompany._id} className="company-box">
                  {" "}
                  <img src={oneCompany.image} alt="company-logo" />
                  <p>{oneCompany.branch.branch}</p>
                  <Link to={`${PATHS.COMPANYROUTE}/${oneCompany._id}`}>
                    <h4>{oneCompany.name}</h4>
                  </Link>
                  <p>{oneCompany.adress}</p>
                  <div className="rating-box">
                    <p>
                      answered <br />
                      {Math.round((oneCompany.answers.length / 5) * 100)} %
                    </p>
                    <p>
                      proved <br />
                      {Math.round(
                        (oneCompany.answers.filter((el) => el.proof).length /
                          5) *
                          100
                      )}{" "}
                      %
                    </p>
                    <p>
                      trust-rated
                      <br />
                      <RatingCalc company={oneCompany} />
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="dash"></div>
      <div className="chain-box">
        <button
          onClick={followToggle}
          className={!followDisplay ? "btn-chain" : "btn-chain-active"}
        >
          {followDisplay ? (
            <h4>You follow:</h4>
          ) : (
            <h4> &gt; You follow {user.follows.length} companies</h4>
          )}
        </button>

        {/* FOLLOWS */}

        {followDisplay && (
          <div className="companies-container">
            {user.follows.map((oneCompany) => {
              return (
                <div key={oneCompany._id} className="company-box">
                  {" "}
                  <img src={oneCompany.image} alt="company-logo" />
                  <p>{oneCompany.branch.branch}</p>
                  <Link to={`${PATHS.COMPANYROUTE}/${oneCompany._id}`}>
                    <h4>{oneCompany.name}</h4>
                  </Link>
                  <p>{oneCompany.adress}</p>
                  {/* <div className="rating-box">
                    <p>
                      answered <br />
                      {Math.round((oneCompany.answers.length / 5) * 100)} %
                    </p>
                    {console.log(oneCompany)}
                    <p>
                      proved <br />
                      {Math.round(
                        (oneCompany.answers.filter((el) => el.proof).length /
                          5) *
                          100
                      )}{" "}
                      %
                    </p>
                    <p>
                      trust-rated
                      <br />
                      <RatingCalc company={oneCompany} />
                    </p>
                  </div> */}
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="dash"></div>

      <div className="chain-box">
        <button
          onClick={workToggle}
          className={!workchainDisplay ? "btn-chain" : "btn-chain-active"}
        >
          {workchainDisplay ? (
            <h4>You work with:</h4>
          ) : (
            <h4>
              {" "}
              &gt; You work with{" "}
              {listOfCompanies.map((comp) => comp.workswith.length)} companies
            </h4>
          )}
        </button>

        {/* WORKSWITH */}

        {workchainDisplay && (
          <div className="companies-container">
            {listOfCompanies.map((comp) =>
              comp.workswith.map((coworker) => {
                return (
                  <div key={coworker._id} className="company-box">
                    {" "}
                    <img src={coworker.image} alt="company-logo" />
                    <p>{coworker.branch.branch}</p>
                    <Link to={`${PATHS.COMPANYROUTE}/${coworker._id}`}>
                      <h4>{coworker.name}</h4>
                    </Link>
                    <p>{coworker.adress}</p>
                    {/* <div className="rating-box">
                      {console.log(coworker)}

                      <p>
                        answered <br />
                        {Math.round((coworker.answers.length / 5) * 100)} %
                      </p>
                      <p>
                        proved <br />
                        {Math.round(
                          (coworker.answers.filter((el) => el.proof).length /
                            5) *
                            100
                        )}{" "}
                        %
                      </p>
                      <p>
                        trust-rated
                        <br />
                        <RatingCalc company={coworker} />
                      </p>
                    </div> */}
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
      <div className="dash white"></div>

      <Footer />
    </div>
  );
}
