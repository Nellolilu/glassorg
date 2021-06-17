import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

export default function Remember(props) {
  const { companyId, user, setUser } = props;
  // console.log("props in remember", props);

  // MAKE A USESTATE FOR THE TOGGLE/ STYLING
  const [remember, setRemember] = React.useState(false);

  //TO DO SET UP AN INCLUDES INSTEAD OF FILTER

  // FUNCTION REMEMBER

  function doRemember() {
    setUser(user);
    // console.log("you remember");
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }
    // CHECKING IF IS REMEMEBERING
    console.log("this is your users follwlist length", user.follows.length);

    // GIVES ARRAY WITH ONLY THIS COMPANY
    // console.log("includes", user.follows.filter(e => e._id === companyId))
    // console.log(
    //   "not remembered yet?",
    //   user.follows.filter((e) => e._id === companyId).length < 1
    // );
    // THIS HAS TO BE RE WRITTEN _ UGLY AS HELL

    if (user.follows.filter((e) => e._id === companyId).length < 1) {
      console.log("user in add", user.follows);
      console.log("company in add", companyId);

      console.log(
        "before axios add",
        // user.follows.length
        user.follows.filter((e) => e._id === companyId).length < 1
      );
      // REMEMBER FUNCTION
      axios
        .post(
          `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${companyId}${PATHS.REMEMBER}`,
          { user },
          {
            headers: { authorization: accessToken },
          }
        )
        .then((response) => {
          console.log("response on succesfully rememberig", response);
          // console.log("set the new user", response.data.user);
          setUser(response.data.user);
          setRemember(!remember);
          console.log("state of the remember now", remember);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // DONT-REMEMBER FUNCTION
      // console.log("already remembered, plese delete");
      console.log("user in delete", user.follows);
      console.log("company in delete", companyId);

      console.log(
        "before axios delete",
        // user.follows.length
        user.follows.filter((e) => e._id === companyId).length < 1
      );
      axios
        .post(
          `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${companyId}${PATHS.FORGET}`,
          { user },
          {
            headers: { authorization: accessToken },
          }
        )
        .then((response) => {
          console.log("reaponse on successful delete", response);
          // console.log("set the new user", response.data.user);
          setUser(response.data.user);
          setRemember(remember);
          console.log("state of the remember now", remember);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div>
      <button onClick={doRemember}>remember</button>
      <h6>{user.follows.length}</h6>
    </div>
  );
}
