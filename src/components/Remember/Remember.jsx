import React from "react";
import axios from "axios";
import * as PATHS from "../../utils/paths";
import * as CONSTS from "../../utils/consts";

export default function Remember(props) {
  const { companyId, user } = props;
  console.log("props", props);

  function doRemember() {
    console.log("you remember");
    const accessToken = localStorage.getItem(CONSTS.ACCESS_TOKEN);
    if (!accessToken) {
      return;
    }
    axios
      .post(
        `${CONSTS.SERVER_URL}${PATHS.COMPANYROUTE}/${companyId}${PATHS.REMEMBER}`,
        { user },
        {
          headers: { authorization: accessToken },
        }
      )
      .then((response) => {
        console.log("reaponse on post", response);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <button onClick={doRemember}>remember</button>
    </div>
  );
}
