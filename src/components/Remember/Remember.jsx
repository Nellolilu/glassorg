import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

export default function Remember(props) {
  const { companyId, user, setUser } = props;

  // NEED TO SEPERATE FROM NOT USER
  let userfollows;
  // INSTEAD OF A USESTATE JUST AN IF IN THE RETURN
  if (user) {
    userfollows = user.follows.some((e) => e._id === companyId);
  }

  // FUNCTION REMEMBER
  function doRemember() {
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
      // TODO HERE SEND ERRORMESSAGE : YOU NEED TO BE LOGGED IN
    }
    // CHECKING IF IS REMEMBERING
    if (user.follows.filter((e) => e._id === companyId).length < 1) {
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
          setUser(response.data.user);
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // DONT-REMEMBER FUNCTION
      axios
        .post(
          `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${companyId}${PATHS.FORGET}`,
          { user },
          {
            headers: { authorization: accessToken },
          }
        )
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }

  return (
    <div>
      {userfollows ? (
        <div>
          {" "}
          <button onClick={doRemember} className="btn">
            following
          </button>
          {/* THE TEST BREAKS THE CODE WHEN NOT LOGGED IN */}
          {/* <h6>check if its working for now: {user.follows.length}</h6>{" "} */}
        </div>
      ) : (
        <div>
          {" "}
          <button onClick={doRemember} className="btn">
            follow?
          </button>
          {/* THE TEST BREAKS THE CODE WHEN NOT LOGGED IN */}
          {/* <h6>check if its working for now: {user.follows.length}</h6>{" "} */}
        </div>
      )}
    </div>
  );
}
