import React from "react";
import "../App.css";
import * as CONSTS from "../utils/consts";
import * as PROFILE_SERVICE from "../services/profile";

export default function ProfilePage(props) {
  console.log("props", props);
  const [listOfCompanies, setListOfCompanies] = React.useState([]);

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

  return (
    <div>
      hello {props.user.username}
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
